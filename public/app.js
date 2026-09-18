// Page behavior: persistence, backdrop/issue rendering, fixes, and the
// check-as-you-type loop. Talks to POST /api/lint. Moved verbatim out of
// index.html (Phase 3 commit 10); the highlight sweep lives in backdrop.js.
import { buildBackdropHtml } from "./backdrop.js";

(() => {
  const $ = (s) => document.querySelector(s);
  const text = $("#text"), backdrop = $("#backdrop"), issuesEl = $("#issues"), status = $("#status");
  const auto = $("#auto"), checkBtn = $("#check");
  /** @typedef {import("../src/issues.mjs").Issue & { id: number }} PageIssue */
  /** @type {PageIssue[]} */
  let issues = [];
  /** @type {number | null} */
  let activeId = null, lastText = null;
  /** @type {ReturnType<typeof setTimeout> | null} */
  let timer = null;
  /** @type {AbortController | null} */
  let inflight = null;
  /** @type {Record<string, number> | null} */
  let lastMeta = null;

  // ---- persistence (per browser; nothing leaves the machine)
  try {
    text.value = localStorage.getItem("pasqualina.text") ?? "";
    auto.checked = (localStorage.getItem("pasqualina.auto") ?? "1") === "1";
  } catch { // localStorage unavailable (private mode); defaults are fine
  }
  const save = () => { try {
    localStorage.setItem("pasqualina.text", text.value);
    localStorage.setItem("pasqualina.auto", auto.checked ? "1" : "0");
  } catch { // persistence is best-effort
  } };

  const esc = (s) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

  // ---- highlight backdrop: issues can overlap, so the cut-and-sweep
  // algorithm is in backdrop.js; the DOM sync stays here
  function renderBackdrop() {
    backdrop.innerHTML = buildBackdropHtml(text.value, issues, activeId) + "\n"; // trailing newline keeps heights in sync
    backdrop.scrollTop = text.scrollTop;
  }
  text.addEventListener("scroll", () => { backdrop.scrollTop = text.scrollTop; backdrop.scrollLeft = text.scrollLeft; });

  // ---- issues panel
  function renderIssues(meta) {
    if (!issues.length) {
      issuesEl.innerHTML = `<div class="empty">${lastText === null ? "Nothing checked yet." : "No issues found."}</div>`;
      return;
    }
    const counts = meta ?? {};
    let html = `<p class="summary"><span><span class="tool harper">harper</span> ${counts.harper ?? 0}</span><span><span class="tool vale">vale</span> ${counts.vale ?? 0}</span></p>`;
    for (const i of issues) {
      const fixes = i.suggestions.map((s, n) =>
        `<button class="fix" data-id="${i.id}" data-n="${n}">${s === "" ? "remove" : esc(s)}</button>`).join("");
      const link = i.link ? ` <a href="${esc(i.link)}" target="_blank" rel="noopener">more</a>` : "";
      html += `<div class="issue ${i.severity}${i.id === activeId ? " active" : ""}" data-id="${i.id}">
        <div class="meta"><span class="tool ${i.tool}">${i.tool}</span><span>${esc(i.rule)}</span><span>· line ${i.line}</span></div>
        <div class="msg">${esc(i.message)}${link}</div>
        <span class="matched">${esc(i.matched)}</span> ${fixes}
      </div>`;
    }
    issuesEl.innerHTML = html;
  }
  issuesEl.addEventListener("click", (e) => {
    const fix = e.target.closest(".fix");
    if (fix) { applyFix(Number(fix.dataset.id), Number(fix.dataset.n)); return; }
    const card = e.target.closest(".issue");
    if (card) focusIssue(Number(card.dataset.id));
  });
  function focusIssue(id) {
    const i = issues.find((x) => x.id === id); if (!i) return;
    activeId = id;
    text.focus(); text.setSelectionRange(i.start, i.end);
    renderBackdrop(); renderIssues(lastMeta);
    issuesEl.querySelector(`.issue[data-id="${id}"]`)?.scrollIntoView({ block: "nearest" });
    // scroll the textarea so the selection is visible: mirror the mark's offset
    const m = backdrop.querySelector("mark.active");
    if (m) text.scrollTop = Math.max(0, m.offsetTop - text.clientHeight / 2);
  }
  function applyFix(id, n) {
    const i = issues.find((x) => x.id === id); if (!i) return;
    const rep = i.suggestions[n];
    text.setRangeText(rep, i.start, i.end, "end");
    const delta = rep.length - (i.end - i.start);
    issues = issues.filter((x) => x.id !== id && !(x.start < i.end && x.end > i.start))
      .map((x) => x.start >= i.end ? { ...x, start: x.start + delta, end: x.end + delta } : x);
    activeId = null; save(); renderBackdrop(); renderIssues(lastMeta); schedule();
  }

  // caret movement highlights the issue under the caret
  function syncActiveToCaret() {
    const pos = text.selectionStart;
    const hit = issues.find((i) => i.start <= pos && pos <= i.end);
    const id = hit ? hit.id : null;
    if (id !== activeId) { activeId = id; renderBackdrop(); renderIssues(lastMeta);
      if (id !== null) issuesEl.querySelector(`.issue[data-id="${id}"]`)?.scrollIntoView({ block: "nearest" }); }
  }
  text.addEventListener("click", syncActiveToCaret);
  text.addEventListener("keyup", (e) => { if (e.key.startsWith("Arrow") || e.key === "Home" || e.key === "End") syncActiveToCaret(); });

  // ---- linting
  function clearFor(value) {
    issues = []; lastText = value; lastMeta = null;
    renderBackdrop(); renderIssues();
    status.textContent = "idle";
  }

  async function fetchLint(text, signal) {
    const r = await fetch("/api/lint", { method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ text }), signal });
    const data = await r.json();
    if (!r.ok) throw new Error(data.error ?? r.statusText);
    return data;
  }

  function renderResult(value, data) {
    issues = data.issues.map((i, n) => ({ ...i, id: n }));
    lastText = value; lastMeta = data.counts; activeId = null;
    renderBackdrop(); renderIssues(data.counts);
    status.textContent = `${issues.length} issue${issues.length === 1 ? "" : "s"} · ${data.ms} ms`;
  }

  async function check() {
    const value = text.value;
    if (inflight) inflight.abort();
    if (!value.trim()) { clearFor(value); return; }
    const ctrl = new AbortController(); inflight = ctrl;
    status.textContent = "checking…"; checkBtn.disabled = true;
    try {
      const data = await fetchLint(value, ctrl.signal);
      if (text.value !== value) return; // typed meanwhile; a new check is scheduled
      renderResult(value, data);
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") return;
      status.textContent = "error: " + (e instanceof Error ? e.message : String(e));
    } finally { if (inflight === ctrl) { inflight = null; checkBtn.disabled = false; } }
  }
  function schedule() {
    if (timer !== null) clearTimeout(timer);
    if (!auto.checked) return;
    timer = setTimeout(check, 700);
  }
  text.addEventListener("input", () => {
    // keep highlights roughly in place while typing: drop the ones that
    // no longer match their text, shift is not tracked (a fresh check follows)
    const v = text.value;
    issues = issues.filter((i) => v.slice(i.start, i.end) === i.matched);
    renderBackdrop(); save(); schedule();
  });
  auto.addEventListener("change", () => { save(); if (auto.checked) schedule(); });
  checkBtn.addEventListener("click", check);
  document.addEventListener("keydown", (e) => { if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); check(); } });

  renderBackdrop();
  if (text.value.trim()) check();
})();
