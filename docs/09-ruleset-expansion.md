# BR ruleset expansion plan

*Written 2026-09-18 by the Tech Lead. Drives the next series of `styles/BR/`
commits. `docs/03-brazilian-english-mistakes.md` stays the catalogue of record:
every item implemented here gets its row there in the same commit.*

## 1. Method

Sources reviewed for this plan (all listed in §9): the Portuguese chapter of
Swan & Smith *Learner English*; Brazilian learner-corpus work (Br-ICLE, the
USP multilingual learner corpus); the 177-entry Portuguese/English false-cognate
catalogue; Tecla SAP; ESL-teacher error lists written for Brazilians in both
languages (Portuguese-language lists encode the calques English-speaking
teachers don't notice); and the existing `docs/03` catalogue.

Two findings shape the plan:

1. **The biggest gap is verb calques**, not false friends. Brazilians build
   English sentences on Portuguese light verbs — *ter/estar com* (states),
   *dar* (give), *fazer* (make), *tirar* (take out), *ficar* (stay), *perder*
   (lose), *ganhar* (win), *passar* (pass). The current set covers a handful of
   *fazer* cases and age. These are high-frequency, unambiguous once anchored,
   and cheap to fix with a replacement.
2. **Prepositions and articles are the most frequent error classes** in every
   corpus study, and the current `Prepositions.yml` has 18 entries.

## 2. Current coverage

| Style | Entries | Type |
|---|---|---|
| Spelling | 161 | substitution |
| FalseFriendsWords | 87 | substitution (bare, suggestion) |
| FalseFriends | 70 | substitution (anchored, warning) |
| Register | 63 | substitution |
| Capitalization | 56 | existence |
| Uncountable | 32 | substitution |
| Collocations | 24 | substitution |
| Syntax | 19 | existence |
| Prepositions | 18 | substitution |
| Titles | 16 | substitution |
| WordOrder | 5 | existence |
| Numbers | 4 | existence |
| Age | 1 | existence |
| **Total** | **~556** | |

Target after this plan: **~1,300 entries across 22 styles**.

## 3. Rules for every item

- **Severity policy.** Anchored calque with one clear replacement → `warning`
  + `action: replace`. Bare suspicious word → `suggestion`. Misspelling that is
  not a real English word → `error`. Real-English-word misspelling (e.g.
  *especial*, *fate* for *fact*) → `warning`.
- **Harper first.** Before adding any grammar/spelling key, run the wrong
  sentence through `bin/pasqualina.mjs --tool harper`. If Harper already flags
  it with a correct suggestion, do not add it; record it as `H` in `docs/03`.
  Harper's `SpellCheck` catches most non-words, so `BR.Spelling` only takes
  (a) real English words used as misspellings and (b) non-words where Harper's
  first suggestion is wrong or absent.
- **Anchor, never bare, when the English is real.** *give a look* is safe;
  *give a ride* is real English. Every key in a substitution rule must be
  checked against the false-positive guards in `clean.txt` (§7).
- **Regex engine.** Vale keys are Go RE2 wrapped in `\b…\b`. `Syntax.yml`
  shows `(?<=…)` lookbehind works in `existence` tokens; do not assume it in
  substitution keys. Every new file must pass `bin/check-styles.mjs`
  (1024-char key limit — split long alternations).
- **Fixtures.** `test/fixtures/br/<Style>.txt`: one wrong sentence per key,
  every line must fire. Add legitimate-English near-misses to `clean.txt` for
  each anchored pattern in the same commit.
- **Performance.** `npm run bench` reports `vale warm p50` (≈215 ms today).
  Each commit message carries the number. If a commit raises it by more than
  10 %, split the alternation or move keys to a narrower anchor before landing.
- **Messages** name the Portuguese trigger in parentheses so the user learns
  the mapping: `"Use '%s' rather than '%s' (dar uma olhada → take a look)."`.
- **One style per commit.** A commit = the `.yml` (new or extended), its
  fixture, its `clean.txt` guards, and its `docs/03` rows. Cap ~40 keys per
  commit; a big style lands in two or three commits.
- **No comments in YAML beyond the file header** (what the style catches and
  the Portuguese source). Key-by-key comments are only allowed to record a
  false-positive that forced an unusual anchor.

## 4. Work items, in commit order

Highest value first. Each item names the file, rule type, level, a target
size, and enough example keys to start. Keys below are illustrative: extend Several illustrations deliberately exceed Vale's 1024-character key limit to enumerate candidates in one place; split those across two or three keys when implementing, and keep the negative-lookahead guard lists as `clean.txt` sentences rather than trying to reproduce them if Vale's engine rejects `(?!…)` in a substitution key.
the object lists the way `FalseFriends.yml` does, and check every one against
`clean.txt`.

### 4.0 Fix — `Spelling.yml` has `harass: harass`
The key is the correct spelling; the entry is a no-op that can only produce a
false report. Remove it. (Look for other keys equal to their value.)

### 4.1 NEW `States.yml` — *ter X* / *estar com X* → *be X* (substitution, warning)
Portuguese expresses states with *have* or *be with* + noun; English uses
*be* + adjective. Highest-frequency calque class after age (which `Age.yml`
already covers).

```
'(I|you|we|they) have (much |a lot of |so much |too much )?hunger': '$1 am/are hungry'
'(he|she|it) has (much |a lot of )?hunger': '$1 is hungry'
'(am|is|are|was|were) with hunger': '$1 hungry'
… same triads for: thirst→thirsty, sleep→sleepy, fear→afraid, shame→ashamed/embarrassed,
   hurry→in a hurry, luck→lucky, cold→cold, heat/hot→hot, envy→envious, jealousy→jealous,
   pity of→feel sorry for, headache→a headache, fever→a fever, flu→the flu, pain→in pain,
   doubt→a question, laziness→lazy / can't be bothered, will (to)→feel like
'(have|has|had) (all the |much |a lot of )?reason': '$1 … be right (ter razão)'
'(am|is|are|was|were) with (all the )?reason': '$1 right'
'(have|has|had) sure( that)?': 'be sure$2 (ter certeza)'
'with certainty': 'certainly / definitely (com certeza)'
'(have|has|had) care( with)?': 'be careful (ter cuidado)'
'(have|has|had) (much |a lot of |great )?difficulty to': '$1 difficulty -ing'
'(have|has|had) (much |a lot of )?facility (to|with|for|in)': 'find it easy to / have a knack for'
'(have|has|had) (the )?necessity (of|to)': 'need'
'(have|has|had) (no |the )?(condition|conditions) (to|of)': 'be able to / afford to (ter condições)'
'(there is|there''s|has|have) no how( to)?': 'there is no way$2 (não tem como)'
'(don''t|doesn''t|didn''t|not) have how to': 'have no way to / cannot'
'(take out|clear|remove|ask) (a |my |your |his |her |their |some |the )?doubts?': 'ask a question / clarify (tirar dúvida)'
'(any|some) doubts?\?': 'any questions?'
'(am|is|are|was|were) with (\d+) years( old)?': '$1 $2 (estar com X anos)'
'(did|made|make|makes|completed|complete|completes) (\d+) years( old)?': 'turned $2 (fazer X anos)'
'(I|you|we|they|he|she) (am|is|are|was|were) agree': '$1 agree (estar de acordo)'
```
Fixture: one line per key. `clean.txt` guards: *I have a doubt about the
contract* (legal sense), *she was with her sister*, *have a cold*, *I have
sleep apnea*, *with care*.

### 4.2 NEW `Give.yml` — *dar* calques (substitution, warning)
*Dar* is the most productive light verb in Portuguese; almost none of its
uses map to *give*.

```
'(give|gives|gave|giving|given) (a |one |another )?(look|looks)( at| in| on)?': 'take a look$4 (dar uma olhada)'
'(give|gives|gave|giving) (a |one )?(walk|stroll|turn)': 'go for a walk (dar uma volta)'
'(give|gives|gave|giving) (a |one )?jump (at|in|to|by)': 'stop by / drop by (dar um pulo)'
'(give|gives|gave|giving) (a |one |the first |the next )?steps?': 'take a step (dar um passo)'
'(give|gives|gave|giving) (a |one |some |much |a lot of )?(problem|problems)': 'cause trouble / act up (dar problema)'
'(give|gives|gave|giving) (an? |one )?(error|errors|bug|bugs)': 'throw an error / fail (dar erro)'
'(gave|gives|give|giving) (everything |all |it )?(wrong|certain|right|good|bad)': 'went wrong / worked (deu errado / deu certo)'
'(didn''t|did not|doesn''t|does not|won''t|will not) give (certain|right|wrong)': 'didn''t work out'
'(it |this |that )?(gives|gave|give|doesn''t give|does not give|didn''t give|did not give) to (do|see|make|go|know|understand|hear|notice|feel|tell|say|use|read|open|find|buy|get|have|be|finish|start|fix|solve|reach|enter|pass|stay|wait|come|arrive|help|answer|work|walk|drive|park|sleep|eat|drink|breathe|move|change|cancel|return|deliver|run|install|access|login|log in|download|upload|save|send|receive|print|copy|paste|test|check|confirm|schedule|book|pay|talk|speak|call|meet|visit|travel|live|study|learn|teach|play|watch|listen|imagine|believe|trust|count|measure|compare|explain)': 'it''s possible to $3 / you can $3 (dá para)'
'(it |this |that )?(gives|gave|give) (me |you |him |her |us |them )?(fear|hunger|sleep|thirst|laziness|anger|shame|pity|will|envy|headache|work|luck|bad luck|profit|loss|time)': 'makes me … / it was a hassle / brought luck (dar medo/sono/preguiça/…)'
'(give|gives|gave|giving) (a |one |some |much )?(time|break|pause|rest)': 'take a break (dar um tempo)'
'(give|gives|gave|giving) (a |one )?way( to| for)?': 'find a way / figure it out (dar um jeito)'
'(give|gives|gave|giving) (much |a lot of |too much |so much )?value (to|for)': 'value / appreciate (dar valor)'
'(give|gives|gave|giving) (a |one )?(class|classes|lessons?)( of| in| to)?': 'teach (dar aula)'
'(give|gives|gave|giving) (a |one )?(bronca|scold|scolding)': 'tell off / scold (dar bronca)'
'(gives|give|gave|giving) (myself|yourself|himself|herself|ourselves|themselves) (well|badly|bad|good)( with)?': 'get along$4 / do well (dar-se bem)'
'(give|gives|gave|giving) the faces?': 'show up (dar as caras)'
'(give|gives|gave|giving) (a |one )?(lift|carona)': 'give a ride / a lift'
'(give|gives|gave|giving) (some |a little |a bit of )?attention (to|for|at)': 'pay attention to (dar atenção)'
'(give|gives|gave|giving) (a |one )?(hint|tip) (that|to)': 'give a hint that / tip off'
```
`clean.txt` guards: *give a ride*, *give a hand*, *give a speech*, *give a
call*, *give me a break* (idiom, leave alone — anchor `break` to exclude
*me/us/him/her/them*), *give a shot*, *the door gives onto the garden*.

### 4.3 EXTEND `Collocations.yml` — *fazer / ganhar / perder / passar*
Existing: make a question/homework/exercise/travel/sport, lose time, how many
years. Add (all warning + replace):

```
make → have/throw/take/do:
  (make|made|making|makes) (a |one |the )?(party|parties|barbecue|bbq|churrasco)  → throw / have a party (fazer festa)
  … (a |the )?(surgery|operation)                       → have surgery (fazer cirurgia)
  … (a |an |the |some |blood )?(exam|exams|test|tests)   → take a test / have a test (fazer exame/prova)
  … (a |the )?(diet|regime)                              → go on a diet (fazer dieta)
  … (a |the |one )?(course|courses)                       → take a course (fazer curso)
  … (a |the |some |my |your )?(research|researches)       → do research (fazer pesquisa)
  … (a |the |my |your |his |her )?(work|works) (for|of|about) (school|the school|university|the course|the class) → do an assignment (fazer trabalho)
  … (a |one )?(favor|favour)                              → do a favor (fazer um favor)
  … (the |my |your )?(dishes|bed|laundry)                 → do the dishes / laundry (bed is fine — exclude)
  … (an? )?(interview|interviews) (with|to)              → do / give an interview (fazer entrevista)
  … (a |one )?(walk|hike|jog|run|swim)                    → go for a walk (fazer caminhada)
  … (physical |some )?(exercise|activity|activities)      → exercise / work out (already partly covered)
  … (a |one |the )?(photo|photos|picture|pictures)        → take a photo (fazer foto)
  … (a |one |the )?(visit|visits) (to|at|in)              → pay a visit / visit (fazer uma visita)
  … part of                                               → be part of (fazer parte de)
  … (much |a lot of |so much |too much )?(sense)          → real English — exclude
  … (a |the )?(lack)                                      → be missed (fazer falta) — see also 'make lack'
  … (a |one )?(question) (of|to)                          → insist on (fazer questão)  [distinct from make a question]
  … (\d+|many|several|few|two|three|five|ten) years (that|since)  → it's been N years since (faz N anos que)
  … (cold|hot|heat|sun|wind|good weather|bad weather)      → it's cold / hot (faz frio/calor)
  … company (to|for)                                      → keep company (fazer companhia)
  … (the |his |her |my |your |their )?will                → do what X wants (fazer a vontade)
  … (a |one |the )?(text|texts|article|articles|essay|report|summary|resume|résumé) → write (fazer um texto)
win → earn/gain/get:
  (win|wins|won|winning) (money|a salary|a good salary|\d+ (reais|dollars|euros) (a|per) (month|hour|year|week)) → earn (ganhar dinheiro)
  … (weight|kilos|\d+ kilos|\d+ kg)                        → gain / put on weight (ganhar peso)
  … (a |one |the |some )?(gift|gifts|present|presents)     → get / receive a gift (ganhar presente)
  … (time)                                                 → save time (ganhar tempo)
  … (a |one )?(baby|child|son|daughter)                    → have a baby (ganhar neném)
  … (my |your |his |her |their |our |the )?(life|living)   → make a living (ganhar a vida)
lose → miss/waste:
  (lose|loses|lost|losing) (the |a |my |our )?(bus|train|plane|flight|subway|metro|ferry|boat|ride|class|classes|lesson|meeting|appointment|deadline|chance|opportunity|beginning|start|call|show|episode|game|party|event|wedding|birthday|interview|exam|test|the moment|the time) → miss (perder)
  … (the |my |your |his |her |their )?(fear|shame|patience|hope|will|interest) → lose is fine — exclude
  … (weight)                                               → fine — exclude
pass → spend/go through:
  (pass|passes|passed|passing) (the |my |our |a |some |much |a lot of )?(time|day|days|night|nights|weekend|weekends|holidays|holiday|vacation|vacations|summer|winter|week|weeks|month|months|year|years|afternoon|morning|evening|hours) (in|at|with|on|doing|reading|watching|studying|working|playing|sleeping|traveling|travelling)?  → spend (passar tempo)
  … (bad|badly|well|good)                                  → feel sick / feel well (passar mal/bem)
  … (by|through) (a |some |many |several |much |hard |difficult |bad |tough )?(difficulty|difficulties|problems|hard times|situation|situations|moments|moment|phase|phases|crisis) → go through (passar por)
  … (a |the )?(cloth|rag|broom|iron|vacuum|mop) (on|in|at|over) → wipe / sweep / iron (passar pano)
  … (in|at|by) (the |a |my )?(market|supermarket|pharmacy|drugstore|bank|bakery|office|store|shop) → stop by (passar no mercado)
  … (the |a |some |my )?(cream|sunscreen|lotion|butter|makeup|make-up|lipstick|perfume|gel) → put on / apply (passar creme)
```

### 4.4 NEW `TakeOut.yml` — *tirar* calques (substitution, warning)
```
'(take|takes|took|taking) out (a |one |some |the |my |your |his |her |their |our )?(photo|photos|picture|pictures|selfie|selfies)': 'take a photo (tirar foto)'
'… out (a |one |some |the )?(copy|copies|xerox|print|printout)': 'make a copy (tirar cópia)'
'… out (the |my |your |his |her |their |our )?(shoes|clothes|jacket|coat|hat|glasses|shirt|pants|socks|sweater|cap|mask|ring|watch|earrings|makeup|make-up)': 'take off (tirar a roupa)'
'… out (my |our |your |his |her |their |a |some |the )?(vacation|vacations|holiday|holidays|day off|days off|leave|license|licence)': 'take vacation / take leave (tirar férias)'
'… out (the |a |my |his |her |their |your )?(driver''s license|driver license|driving license|passport|visa|document|documents|certificate|degree|diploma|ID|id)': 'get / obtain (tirar passaporte)'
'… out (first|second|third|last) place': 'come in first / finish first (tirar primeiro lugar)'
'… out (a |good |bad |great |high |low |the best |the worst |a \d+ |\d+ )?(grade|grades|note|notes|score|mark|marks) (in|on|at)': 'get a grade in (tirar nota)'
'… out (a |the |some |my |your )?(conclusion|conclusions)': 'draw a conclusion (tirar conclusão)'
'… out (the |a |some )?(delay|backlog)': 'catch up (tirar o atraso)'
'… out (a |some |the )?(time|moment|minutes|day|afternoon) (to|for)': 'set aside time to (tirar um tempo)'
'… out (a |one )?nap': 'take a nap'  # fine — exclude
'… out (the |a )?(table)': 'clear the table (tirar a mesa)'
'… out (sarro|onda) (of|with|from)': 'make fun of (tirar sarro)'
'… (my |your |his |her |their |our |the )?(doubt|doubts) (with|from|about)': 'ask about / clarify (tirar dúvida)'
'… out (of|from) (the )?letter': 'handle easily (tirar de letra)'
```
Guards: *take out the trash*, *take out a loan*, *take out insurance*, *take
out the enemy*, *take out to dinner*.

### 4.5 NEW `Stay.yml` — *ficar* calques (substitution, warning)
```
'(stay|stays|stayed|staying) (sick|ill|angry|mad|sad|happy|nervous|anxious|tired|old|rich|poor|famous|pregnant|ready|worried|scared|afraid|surprised|confused|crazy|red|pale|bored|late|hungry|thirsty|sleepy|drunk|lost|stuck|silent|quiet|calm|excited|upset|jealous|embarrassed|disappointed|impressed|interested|curious|better|worse|well|fine|good|bad|cold|hot|wet|dirty|clean|full|empty|blind|deaf|dizzy|weak|strong|fat|thin|bald|gray|grey|dark|clear|known|aware)': 'get / become $2 (ficar)'
'(stay|stays|stayed|staying) knowing( that| about| of)?': 'find out / hear (ficar sabendo)'
'(stay|stays|stayed|staying) with (the |a |some |my |your |his |her |their |our |this |that |these |those )?(change|money|book|keys|car|copy|receipt|ticket|file|files|document|documents|rest|remainder|leftovers|bag|umbrella|phone|charger|pen|notes)': 'keep $3 (ficar com)'
'(stay|stays|stayed|staying) with (a |the )?(headache|fever|flu|cold|cough|hunger|thirst|fear|shame|doubt|doubts|will|laziness|pity|anger|envy|jealousy)': 'get a headache / feel … (ficar com)'
'(stay|stays|stayed|staying) (in|at) (the |a )?(doubt|silence|foot|feet|standing|line|queue)': 'be unsure / stay silent / stand (ficar em dúvida / de pé)'
'(stay|stays|stayed|staying) (good|bad|nice|great|beautiful|ugly|cool|strange|weird|odd|expensive|cheap|big|small|tight|loose|long|short) (on|in|for|to) (you|me|him|her|us|them|the)': 'look / suit / fit (ficar bem em)'
'(stay|stays|stayed|staying) (of|to|for) (eye|eyes)( on| in)?': 'keep an eye on (ficar de olho)'
'(stay|stays|stayed|staying) (at|in) (the )?(peace|ease)': 'rest assured / relax (ficar em paz / à vontade)'
'(it |that |this )?(stays|stayed|stay) (at|in|for) (\d+|R\$)': 'it comes to / costs (ficar em)'
'(stay|stays|stayed|staying) (a |one |two |three )?(day|days|week|weeks|month|months|year|years|hour|hours|night|nights|time|while) without': 'go without (ficar sem)'
'(stay|stays|stayed|staying) without (money|food|water|light|power|electricity|internet|signal|battery|gas|fuel|air|breath|words|voice|sleep|patience|options|choice|time|job|work|nothing|anything)': 'run out of / be left without (ficar sem)'
```
Guards: *stay calm*, *stay quiet*, *stay put*, *stay healthy*, *stay with me*
(→ exclude pronouns from the *keep* pattern), *stay in bed*, *stay hydrated*.
Note *stay calm/quiet/still/healthy/safe/strong* are real English: keep them
out of the first list.

### 4.6 EXTEND `Prepositions.yml` — two commits (place/time, then verb+prep)
Harper already covers *arrive to*, *discuss about*, *since + duration*,
*good in*, *despite of*, *aware about* — verify each candidate with
`--tool harper` first.

**Commit A — place and time (Portuguese em/a/por → in/on/at):**
```
'(in|at) the (night|nights)'                                    → at night / in the evening
'(at|by) the (morning|afternoon|evening)'                        → in the $2
'in (this|that) (night|morning|afternoon|evening|week|month|year)' → tonight / this morning / this week
'in (christmas|easter|new year|carnival|carnaval|halloween)'     → at $2
'in the (bus|plane|airplane|train|ship|boat|bike|bicycle|motorcycle|subway|metro|tram|ferry)' → on the $2
'on the (picture|photo|photograph|image|painting|drawing|video|film|movie)' → in the $2
'in the (phone|telephone|cellphone|computer|screen|website|site|page|list|menu|map|wall|floor|ceiling|roof|table|shelf|first floor|second floor|third floor|ground floor|top floor|left|right|corner of the street)' → on the $2
'in the (top|bottom|end|beginning|start|side|edge|front|back) of the (page|list|street|road|table|screen|document|file|line|queue|hill|mountain|stairs|building|box|bottle|glass|pool|room|hall|garden|world|ranking|table)' → at the $1 of the $2 (with exceptions: in the middle/center/back of the room are fine — exclude middle/center)
'in (home|work|school|church|university|college|class|the class|the party|the meeting|the wedding|the concert|the airport|the station|the bus stop|the door|the desk|the window|the corner|the table|the beach|the sea|the lake|the office of|the hospital)' → at $1 (keep *in the hospital* — AmE; keep *in class*)
'(in|on) the (age|year) of (\d+|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)' → at the age of $3
'with (\d+) years( old)?( I| he| she| we| they| you)' → at $1$3 (com 20 anos)
'during (\d+|two|three|four|five|six|seven|eight|nine|ten|twenty|thirty|many|several|some|a few|a couple of) (seconds|minutes|hours|days|weeks|months|years|decades)' → for $1 $2 (durante)
'(for|since) (\d+|two|three|four|five|ten|twenty) (days|weeks|months|years) ago' → $1 $2 $3 ago (drop the preposition)
'(there is|there are|it has|has|have|it makes|makes|make) (\d+|two|three|four|five|ten|twenty|many|several|some) (days|weeks|months|years) (that|since|ago)' → $2 $3 ago / it has been $2 $3 since (há N anos / faz N anos)
'by (example|instance)'                                          → for example (por exemplo)
'by (the )?(other|one) side'                                     → on the other hand / on one hand (por outro lado)
'by (this|that|the same) (reason|motive)'                        → for this reason (por esta razão)
'by (the )?(first|second|third|last) time'                       → for the $2 time (pela primeira vez)
'by (the )?contrary'                                             → on the contrary (pelo contrário)
'by (the )?(moment|now|while)'                                   → for the moment / for now (por enquanto) — *by now* is real: anchor sentence-initial only or skip *now*
'by (the )?(luck|chance)'                                        → luckily (por sorte) — *by chance* is real: skip *chance*
'by (the )?(morning|afternoon|night|evening)'                    → in the $2 (pela manhã)
'(in|at) first place'                                            → first / in the first place (em primeiro lugar)
'in (the )?(principle|beginning of)'                             → at first / at the beginning of (a princípio / no início de)
'(at|in|to) the (final|end) of the (day|month|year|week|semester|course|class|meeting|game|movie|film|book|story|trip|day) ' → covered partly; Harper has AtTheEndOfTheDay — keep only what Harper misses
'(to|at) the (long|length) of'                                   → along / throughout (ao longo de)
'(at|to|by) the (less|least)'                                    → at least (pelo menos / ao menos)
'(in|at|no|to) the (maximum|minimum)'                            → at most / at least (no máximo / no mínimo)
'in the (truth|reality|practice|theory|real life|daily|day to day|day-to-day|routine)' → actually / in practice / in real life (na verdade / na prática)
'in (the )?(special|particular)'                                  → especially / in particular (em especial)
'(of|in) (this|that|the same|certain|any|which|what) (form|way|manner)' → this way / likewise / in a way / anyway / how (desta forma / de qualquer forma)
'of (sudden|repent)'                                             → suddenly (de repente)
'of (truth|fact|new|preference|agreement|nothing|principle)'     → really / in fact / again / preferably / agreed / you're welcome / at first (de verdade / de fato / de novo / de nada)
'(with|in) relation (with|to)'                                    → regarding / in relation to (com relação a)
'in what (refers|concerns|says respect) to'                       → as regards / as for (no que se refere a)
'(has|have|had|having) (nothing |something |anything |a lot |much |everything |all )?to see with' → have to do with (ter a ver com)
'(count|counts|counted|counting) (with|in)'                       → count on (contar com)
'(is|was|are|were|be) (not )?with (me|you|him|her|us|them)( anymore)?' → it's up to you / it's not my call (é com você) — ambiguous, suggestion level only
'leave (it |this |that )?with me'                                 → leave it to me (deixa comigo)
```

**Commit B — verb + preposition (Portuguese *de/em/a/com* transfers):**
```
'(participate|participates|participated|participating) (of|from)'          → participate in (participar de)
'(take|takes|took|taking) part (of|from)'                                  → take part in
'(need|needs|needed|needing) of'                                           → need (precisar de)
'(like|likes|liked|liking) of'                                             → like (gostar de)
'(remember|remembers|remembered|remembering|forget|forgets|forgot|forgetting) of' → remember / forget (lembrar de)
'(doubt|doubts|doubted) of'                                                → doubt (duvidar de)
'(divorced|divorce|separated|separate) (of|from) (him|her|my|his|her|their)' → divorced from (keep *from*: only flag *of*)
'(responsible|responsibility) (by|for by)'                                 → responsible for (responsável por)
'(interested|interest) (to|on) (\w+ing|the|a|an|this|that)'                → interested in
'(capable|incapable) (to|of to)'                                           → capable of (capaz de)
'(worried|excited|concerned|happy|angry|upset|nervous|anxious|curious|crazy|sad) (with|for) (about )?' → about (preocupado com / animado com) — careful: *happy with*, *angry with* are real; keep only worried/excited/concerned/curious/anxious with → about
'(according|accordance) (with|to with)'                                    → according to / in accordance with (de acordo com)
'(related|relation|relationship|linked|connected|associated|compared|similar|equal|identical|attached|married|opposed|referring|refer|refers|referred) (with|of|at)' → to/with per word (relacionado com → related to; similar a → similar to; casado com → married to; comparado com → compared to/with fine)
'(composed|formed|made up) by'                                             → composed of (composto por)
'(consist|consists|consisted|consisting) (in|of in)'                       → consist of (consistir em)
'(divided|split|separated|cut|translated|converted|transformed|turned|changed|broken|grouped|organized|organised|classified|sorted) (in|on) (\d+|two|three|four|five|six|several|many|small|smaller|equal|groups|parts|pieces|halves|categories|sections|chapters|english|portuguese|spanish|french|german|another|other|a new)' → into (dividido em / traduzido para)
'(focus|focused|focusing|concentrate|concentrated|concentrating|rely|relies|relied|relying|insist|insists|insisted|insisting|depend|depends|depended|depending|based|impact|impacts|impacted|influence|influences|influenced|bet|bets|betting|count|counts|counted) (in|of)' → on
'(invest|invests|invested|investing) (on|at)'                              → invest in
'(enter|enters|entered|entering|access|accesses|accessed|accessing|contact|contacts|contacted|contacting|approach|approached|reach|reached|call|called|calling|phone|phoned|answer|answered|attend|attended|visit|visited|discuss|discussed|mention|mentioned|comment|commented|explain|explained|obey|obeyed|marry|married|resemble|resembled) (to|with|in|about) (the|a|an|this|that|my|your|his|her|their|our|him|her|me|us|them|you|it)' → drop the preposition (entrar em / acessar a / contatar com / ligar para / explicar para) — split into two keys under 1024 chars; *explain to me* is real: exclude *explain … to*
'(listen|listens|listened|listening) (the|a|an|this|that|my|your|his|her|their|our|him|her|me|us|them|you|it|music|songs|radio|podcasts|the news)' → listen to
'(wait|waits|waited|waiting) (me|you|him|her|us|them|the bus|the train|the plane|a call|an answer|a reply|the result|the results|the answer|my turn|your turn)' → wait for
'(look|looks|looked|looking) (the|this|that|me|him|her|them|us|it|what|how|who|there|here|this one|that one)( |!|\.)' → look at (olha o)
'(search|searches|searched|searching|seek) (for )?(to|by)'                → search for / look for
'(said|say|says|saying|told|tell|tells|telling|asked|ask|asks|asking|showed|show|shows|showing|gave|give|gives|giving|sent|send|sends|sending|brought|bring|brings|bringing|explained|explain|explains|explaining|wrote|write|writes|writing|paid|pay|pays|paying|taught|teach|teaches|teaching|offered|offer|offers|offering|lent|lend|lends|lending|passed|pass|passes|passing|handed|hand|hands|handing) (it |this |that |the \w+ |a \w+ |my \w+ |your \w+ )?for (me|you|him|her|us|them|the \w+|my \w+|your \w+|his \w+|her \w+|their \w+|our \w+)' → to (disse para ele → said to him) — *pay for*, *ask for*, *send for*, *bring for* are real: restrict to said/told/explained/showed/wrote/taught/gave/lent/passed/handed/offered + for + person pronoun
'(same|equal) (that|of|than)'                                              → same as (o mesmo que)
'(prefer|prefers|preferred|preferring) (\w+ )?(than|that)'                → prefer … to (preferir … do que)
'(better|worse|bigger|smaller|higher|lower|more|less|fewer|greater|older|younger|longer|shorter|faster|slower|stronger|weaker|richer|poorer|cheaper|earlier|later|easier|harder|larger|wider|deeper|further|farther|rather) that (the|a|an|this|that|my|your|his|her|their|our|I|you|he|she|we|they|it|me|him|her|us|them|\d+|before|expected|usual|ever|yesterday|last)' → than (maior que → bigger than)
'(so|as) (\w+) (than|that) (the|a|an|this|that|my|your|his|her|their|our|I|you|he|she|we|they|it|me|him|her|us|them)' → as $2 as (tão … quanto)
'(for|in order) to (?:$)'                                                 → skip
'(go|goes|went|going|come|comes|came|coming|travel|travels|traveled|travelled|traveling|travelling|here|there|abroad|home|out|back) (to \w+ )?for (learn|see|meet|buy|get|do|make|have|find|teach|take|give|try|watch|eat|drink|enjoy|celebrate|participate|attend|improve|know|understand|discover|explore|live|stay|spend|earn|win|ask|answer|fix|solve|bring|deliver|sign|register|apply|open|close|finish|complete|be|say|tell|speak|write|read|send|receive|keep|put|create|develop|install|prepare|explain|confirm|cancel|remember|forget|decide|choose|share|save|lose|protect|join|leave|arrive|return|drive|fly|swim|cook|clean|wash|wear|discuss|analyze|analyse|compare|measure|evaluate|verify|ensure|reduce|increase|reach|achieve|obtain|produce|generate|manage|organize|organise|follow|wait|hope|wish|feel|think|hear|listen|avoid|prevent|become|pick|catch|check|test|show|present|perform|compete|relax|rest)\b' → to $3 (foi lá para estudar) — verbs that are also common nouns (work, study, play, help, visit, rest, sleep, fight, dance, walk, run, talk, love) are deliberately excluded
```

### 4.7 NEW `Complements.yml` — verb complementation calques (substitution, warning)
```
'(want|wants|wanted|need|needs|needed|would like|''d like|would prefer|let|lets|allow|allows|allowed|make|makes|made) that (I|you|he|she|it|we|they|the|my|your|his|her|their|our|someone|somebody|everyone|everybody|people|nobody|no one)' → want you to … (quero que você) — *suggest/recommend/require/ask/expect/prefer that* are correct English: never add them
'(must|can|could|may|might|should|would|will|shall|cannot|can''t|couldn''t|shouldn''t|wouldn''t|won''t|mustn''t) to (\w+)' → $1 $2 (check Harper first)
'(enjoy|enjoys|enjoyed|avoid|avoids|avoided|finish|finishes|finished|mind|minds|minded|consider|considers|considered|suggest|suggests|suggested|recommend|recommends|recommended|practice|practise|practices|practised|keep|keeps|kept|imagine|imagined|miss|misses|missed|deny|denied|risk|risked|delay|delayed|postpone|postponed|admit|admitted|appreciate|appreciated|can''t stand|couldn''t stand|can''t help|couldn''t help|give up|gave up|look forward to|looking forward to|be used to|am used to|is used to|are used to|get used to|got used to|feel like|felt like|it''s worth|it is worth|is worth|not worth|worth) to (\w+)' → $1 $2ing (gosto de fazer / vale a pena fazer)
'(stop|stops|stopped|stopping) to (\w+)' → suggestion only: *stopped to smoke* is real English with the other meaning
'(let|lets|made|make|makes|had|have|has|help|helps|helped|saw|see|sees|heard|hear|hears|watched|watch|felt|feel|noticed|notice) (me|you|him|her|us|them|it|the \w+|my \w+|your \w+|his \w+|her \w+|their \w+|our \w+) to (\w+)' → $1 $2 $3 (deixe-me fazer → let me do); *help me to* is fine — exclude *help*
'(instead|rather) to' → instead of (em vez de)
'(instead|rather) of to' → instead of
'(despite|in spite) of to' → despite -ing
'(is|are|was|were|be|been|being) (not )?(worth|worthwhile) (to|of)' → worth -ing
'(the |a |an )?(possibility|intention|habit|risk|fear|advantage|importance|necessity|purpose|cost|difficulty|experience|pleasure|idea|hope|way|method|means|manner|chance|opportunity|ability|capacity|responsibility|obligation|right|duty|need|desire|wish|plan|goal|dream|option|alternative|reason) (of|for) (to )?(\w+)ing' → already covered (Prepositions) — verify, extend the noun list there instead
'I (know|knows|knew|don''t know|do not know|didn''t know|did not know) (to|how) (swim|cook|drive|read|write|speak|play|sing|dance|draw|paint|code|program|ride|fix|use|make|do|say|explain|answer|solve|handle|manage|deal)' → know how to (sei nadar)
'(capable|able|incapable|unable) (to|of) (\w+)ing' → able to $3 / capable of $3ing
'(would|''d) like (that|to that)' → would like to
'(for|in order) (that|to that) (I|you|he|she|it|we|they) (can|could|may|might|will|would)' → so that (para que)
'(hope|hopes|hoped|expect|expects|expected|wait|waits|waited) (that )?(you|he|she|it|we|they|everyone|everybody|things|everything|all|it all) (goes|go|is|are|will|are going|is going|gets|get|ends|turns) (well|fine|ok|okay|good|right)' → hope it goes well (espero que dê certo) — *wait* → hope: 'I wait that' → 'I hope that'
'(I|we|you|they|he|she) (wait|waits|waited) (that|so)' → hope (esperar que)
'(thanks|thank) (to )?god' → thank God (graças a Deus)
'if god (wants|want|wills|will)' → God willing (se Deus quiser)
'(can|could) be(\.|!|,| that)' → maybe / it could be (pode ser) — sentence-initial only
'(logically|obviously|clearly|naturally),? (yes|no|that|it|this|I|we|you|they|he|she)' → suggestion: *logicamente* → of course
```

### 4.8 NEW `Articles.yml` — article calques (substitution + existence, warning)
```
'(in|to|from|of|about|visit|visited|visiting|love|loves|loved|live in|lives in|lived in|living in|go to|went to|going to|come from|came from|comes from|arrive in|arrived in|move to|moved to|back to|return to|returned to|travel to|traveled to|travelled to|left|leave|leaving) the (brazil|portugal|france|germany|italy|spain|argentina|chile|uruguay|paraguay|bolivia|peru|colombia|venezuela|mexico|canada|japan|china|india|russia|england|scotland|ireland|wales|europe|africa|asia|america|latin america|south america|north america|oceania|australia|angola|mozambique|cape verde|são paulo|rio de janeiro|rio|bahia|minas gerais|minas|paraná|santa catarina|rio grande do sul|pernambuco|ceará|goiás|brasília|salvador|recife|fortaleza|curitiba|porto alegre|belo horizonte|manaus|belém|florianópolis|natal|campinas|lisbon|london|paris|madrid|rome|berlin|new york|miami|boston|chicago|toronto|tokyo|sydney)' → $1 $2 (o Brasil → Brazil). Existence rule with `nonword` off; case-insensitive; keep *the United States/Netherlands/Philippines/UK/Amazon/Northeast* out.
'\bthe (my|your|his|her|their|our|its)\b'                                        → $1 (o meu → my)
'\b(a|an|one) (my|your|his|her|their|our) (friend|friends|colleague|colleagues|cousin|cousins|neighbor|neighbour|student|students|client|clients|customer|customers|teacher|teachers|professor|relative|relatives|uncle|aunt|brother|sister|book|books|idea|ideas|project|projects)' → a $3 of mine / one of my $3s (um amigo meu)
'\ball the (days|nights|mornings|afternoons|evenings|weeks|months|years|times|weekends|mondays|tuesdays|wednesdays|thursdays|fridays|saturdays|sundays|hours|minutes)\b' → every $1 (todos os dias)
'\ball the (world|people|persons)\b'                                               → everyone / the whole world (todo mundo)
'\b(in|of|around|across) all the world\b'                                         → all over the world / worldwide (no mundo todo)
'\bevery (days|weeks|months|years|times|mornings|nights)\b'                        → every $1 singular
'\bthe both( of)?\b'                                                              → both$1 (os dois)
'\b(in|on|at|during) the (last|past|next|coming|previous) (week|month|year|weekend|semester|summer|winter|spring|autumn|fall|monday|tuesday|wednesday|thursday|friday|saturday|sunday|time|christmas|easter|carnival|holiday|holidays|vacation|vacations)\b' → $2 $3 (na semana passada → last week); Prepositions already has *next* — move that key here
'\b(an|a) other\b'                                                               → another (check Harper AnAnother first)
'\b(others) (people|persons|things|countries|cities|places|options|ways|times|days|students|companies|languages|cultures|reasons|problems|questions|examples|ideas|projects|products|services|areas|types|kinds|forms|cases|situations|aspects|factors|elements|items|points|topics|subjects|activities|tasks|words|names|books|movies|films|songs|games|sports|teams|players|friends|colleagues|members|users|customers|clients|employees|workers)\b' → other $2 (outras pessoas)
'\bother (thing|day|time|person|option|way|question|one|example|problem|idea|place|reason|point|topic|subject|side|part|piece|word|name|book|movie|film|song|game|team|player|friend|colleague|member|user|customer|client|employee|worker|company|city|country|language|culture|case|situation|aspect|factor|element|item|activity|task|type|kind|form|level|version|model|approach|method|solution|alternative|possibility|chance|opportunity|moment|hour|minute|week|month|year)\b(?! of)' → another $1 / the other $1 (outra coisa) — existence, suggestion
'\bthe (\d+)\s?(%|percent|per cent)\b'                                            → $1$2 (os 80% → 80%)
'\bthe (half|double|triple|majority|most part|biggest part|major part|greater part|great part) of\b' → half of / twice / most of / a large part of (a metade de / o dobro de / a maior parte de)
'\b(the )?majority of the (times|cases|days|people|students|users|clients|customers|companies|countries|cities)\b' → most $2 (a maioria das vezes → most of the time)
'\bgo(es|ing|ne)? to the (school|church|work|bed|college|university|prison|jail|court|class|hospital|sea)\b' → go to $2 (BrE/AmE differ on hospital — suggestion)
'\b(in|at) the (home|bed)\b'                                                      → at home / in bed
'\b(which|what) is (your|his|her|their|our|my|the) (name|age|job|address|phone number|number|email|e-mail|nationality|problem|question|difference|reason|meaning|purpose|opinion|answer|solution|goal|objective|plan|idea|point|favorite|favourite|price|deadline|budget|priority|status|situation|role|function|next step|first step|best way|best option)\b' → only flag *which* (qual é → what is)
```

### 4.9 NEW `Agreement.yml` — number/person calques (existence + substitution)
Check Harper for each; it covers some subject–verb cases.
```
'\b(everybody|everyone|nobody|no one|somebody|someone|anybody|anyone|each one|each person|every person|every one of them) (are|were|have|do|don''t|like|want|need|think|say|go|know|live|work|feel|love|hate|believe)\b' → is / was / has / does … (todo mundo são)
'\bthe police (is|was|has|does|doesn''t|isn''t|wasn''t)\b'                            → the police are (a polícia é)
'\b(I|you|we|they) (am|is|are|was|were) (agree|disagree|understand|remember|forget|prefer|believe|think|hope|wish|know|like|need|want|mean)\b' → I agree (estou de acordo) — *am* + verb calque
'\b(persons)\b'                                                                    → people (pessoas) — suggestion; *persons* is legal register
'\b(childs|childrens|womans|womens|mans|mens|foots|tooths|mouses|sheeps|fishes|peoples|gooses|oxes|deers)\b' → check Harper SpellCheck first
'\b(hairs)\b(?! on| in)'                                                           → hair (cabelos) — suggestion
'\b(borned|borning|was born in the year of|is born in \d{4}|am born in \d{4}|are born in \d{4})\b' → was born (nasci)
'\b(I|you|we|they|he|she) (have|has) born\b'                                       → was/were born
'\b(it|he|she|this|that) (don''t|have|do|were|are)\b'                             → doesn''t / has / does / was / is — check Harper first, likely covered
'\b(there is|there''s) (many|several|two|three|four|five|six|ten|lots of|a lot of|some|few|a few|no|plenty of) (\w+s)\b' → there are (check Harper)
'\b(\d+|two|three|four|five|ten|twenty|thirty|forty|fifty|hundred|thousand|million) (year|month|week|day|hour|minute|kilometer|kilometre|meter|metre|kilo|dollar|real|euro|person|people|time|percent) (old|ago|later|long|tall|away|away from)\b' → plural noun (dois ano → two years); exclude *percent/people*
'\b(\d+|two|three|four|five|six|seven|eight|nine|ten)-(years|months|weeks|days|hours|minutes)-old\b' → $1-$2-old singular (Harper?)
```

### 4.10 NEW `Questions.yml` + EXTEND `Syntax.yml` — questions and negation (existence, suggestion)
Questions without an auxiliary are the single most recognizable Brazilian
sentence shape. Suggestion level, sentence-anchored:
```
'(?m)^(What|Where|When|Why|How|Who|Which|How much|How many|How long|How often) (you|he|she|they|we|I|it|people|your \w+|the \w+) (want|wants|need|needs|think|thinks|like|likes|say|says|do|does|go|goes|live|lives|work|works|know|knows|mean|means|have|has|feel|feels|prefer|prefers|use|uses|call|calls|make|makes|see|sees|come|comes|get|gets|take|takes|study|studies|speak|speaks|write|writes|read|reads|eat|eats|drink|drinks|sleep|sleeps|start|starts|finish|finishes|arrive|arrives|leave|leaves|cost|costs|happen|happens|look|looks|sound|sounds)\b' → add do/does/did (Como você fala)
'(?m)^(What|How) (means|is the meaning of|you say|do you say|is called|you call|do you call) ' → What does … mean / How do you say / What is it called (o que significa / como se diz / como se chama)
'(?m)^(You|He|She|They|We|It) (have|has|like|likes|want|wants|need|needs|know|knows|think|thinks|live|lives|work|works|speak|speaks|go|goes|went|did|do|does|saw|see|sees|are|is|was|were|can|could|will|would)\b[^.!?\n]{0,60}\?' → invert / add auxiliary (Você tem carro? → Do you have a car?) — existence, suggestion; *You are sure?* is colloquial: keep suggestion level
Negation (in Syntax.yml, existence, warning):
'\b(I|you|we|they|he|she|it) (no|not) (like|want|need|know|have|has|think|understand|remember|speak|see|go|work|live|eat|drink|sleep|can|could|will|would|should|must|am|is|are|was|were)\b' → don''t / doesn''t / didn''t (eu não sei → I don''t know) — check Harper
'\b(no|not) (is|are|was|were|has|have|had|can|could|will|would|should|must|do|does|did)\b(?! only| just| yet| even| always)' → isn''t … (não é → it isn''t) — sentence-medial only; guard *not only*, *not just*
'\b(don''t|doesn''t|didn''t|can''t|couldn''t|won''t|wouldn''t|haven''t|hasn''t|isn''t|aren''t|wasn''t|weren''t|never|nobody|no one) (\w+ )?(nothing|nobody|no one|nowhere|none|no more|never|neither)\b' → anything / anybody / anywhere / any / anymore (double negative — check Harper DoubleNegative first)
'\b(anymore|any more|no more) (I|you|we|they|he|she|it) (don''t|doesn''t|didn''t|can''t|won''t)\b' → I don''t … anymore (não mais)
```

### 4.11 NEW `Degree.yml` — comparatives, adverbs, intensifiers (substitution, warning)
Harper has `AdjectiveDoubleDegree` (*more prettier*). Check whether it covers
*more old*; if not:
```
'\b(more|most) (old|big|small|good|bad|easy|hard|happy|sad|cheap|fast|slow|young|high|low|long|short|strong|weak|rich|poor|hot|cold|large|tall|nice|late|early|near|far|simple|clean|dirty|safe|busy|funny|pretty|ugly|wide|deep|thin|fat|thick|light|heavy|quick|smart|cool|warm|wet|dry|soft|loud|quiet|brave|calm|wise|rude|kind|cute|fair|fresh|full|great|sure|true|tight|sweet|tough|wild|dark|bright|angry|hungry|healthy|wealthy|lucky|lovely|lonely|friendly|silly|noisy|lazy|crazy|tiny|shiny|empty|narrow|shallow|clever|gentle|humble|simple|little|few)\b' → $2er / $2est (mais velho → older)
'\b(very|so|really|too|quite|pretty) (good|bad) (at|in|with)? ?(speak|speaking|write|writing|cook|cooking|sing|singing|play|playing|drive|driving|dance|dancing|draw|drawing|teach|teaching|explain|explaining|do|doing)\b' → very well (fala muito bem)
'\b(speak|speaks|spoke|speaking|write|writes|wrote|writing|cook|cooks|cooked|cooking|sing|sings|sang|singing|play|plays|played|playing|drive|drives|drove|driving|dance|dances|danced|dancing|draw|draws|drew|drawing|did|do|does|doing|went|go|goes|going|work|works|worked|working|sleep|sleeps|slept|sleeping|eat|eats|ate|eating|feel|feels|felt|feeling|know|knows|knew|explain|explains|explained|understand|understands|understood|see|sees|saw|hear|hears|heard|read|reads|behave|behaves|behaved|perform|performs|performed|handle|handles|handled|manage|manages|managed|treat|treats|treated) (\w+ )?(very |so |really |pretty |quite )?good\b' → well (muito bem) — *feel good*, *look good*, *sound good*, *smell good*, *taste good* are real: exclude feel/look/sound/smell/taste
'\benough (good|big|old|strong|fast|smart|tall|rich|long|high|large|small|hot|cold|warm|close|near|far|early|late|easy|hard|clear|safe|clean|ready|mature|experienced|qualified|confident|comfortable|flexible|fit|healthy|stable|reliable|brave|patient|careful|serious|important|interesting|simple|complex|deep|wide|thick|thin|light|heavy|bright|dark|loud|quiet|sweet|salty|spicy|soft|firm|tight|loose|dry|wet|full|empty|cheap|expensive)\b' → $1 enough (bom o suficiente)
'\b(more|very|too|so|really) much (people|persons|things|friends|students|cars|houses|books|problems|questions|options|places|countries|times|days|years|hours|reasons|examples|words|ideas|projects|tasks|jobs|companies|users|clients|customers|employees|children|kids|men|women|dogs|cats|animals|trees|flowers|stars|photos|pictures|videos|songs|movies|films|games|apps|websites|emails|messages|calls|meetings|classes|courses|lessons|exams|tests|errors|bugs|issues|features|functions|methods|files|pages|lines|items|elements|parts|pieces|steps|ways|forms|types|kinds|levels|groups|teams|players|fans|followers|likes|comments|posts|tweets|shares|views|visits|sales|orders|products|services|shops|stores|restaurants|bars|hotels|beaches|parks|schools|universities|hospitals|churches|banks|buildings|rooms|floors|doors|windows|streets|roads|cities|states|regions|languages|cultures|religions|traditions|habits|rules|laws|taxes|fees|costs|prices|expenses|bills|debts|savings|investments|opportunities|chances|risks|dangers|threats|benefits|advantages|disadvantages|changes|differences|similarities|details|facts|data points|results|effects|consequences|events|activities|exercises|experiments|studies|papers|articles|reports|documents|contracts|agreements|deals|offers|proposals|plans|goals|dreams|wishes|hopes|fears|doubts|worries|concerns|complaints|requests|demands|needs|wants|desires|feelings|emotions|thoughts|memories|experiences|stories|lies|truths|secrets|mysteries|surprises|gifts|presents|prizes|awards|medals|trophies|points|goals|wins|losses|draws|matches|races|competitions|championships|tournaments)\b' → many / a lot of (muita gente → many people) — split under 1024 chars
'\b(many|so many|too many|how many) (money|time|water|food|work|information|advice|homework|traffic|weather|luck|fun|help|stuff|music|rice|milk|sugar|coffee|tea|paper|damage|furniture|equipment|knowledge|research|progress|news|evidence|bread|cheese|meat|fish|fruit|patience|energy|effort|attention|experience|pressure|stress|noise|space|room|air|light|sun|rain|snow|sand|salt|oil|gas|fuel|power|electricity|internet|wifi|signal|content|text|code|data|software|hardware|feedback|support|training|education|health|love|hate|anger|fear|hope|peace|freedom|justice|respect|trust|confidence|courage|honesty|beauty|nature|art|science|technology|history|culture|literature|poetry|grammar|vocabulary|slang|spam|mail|garbage|trash|clothing|jewelry|makeup|hair|skin|blood|sweat|pain|sleep|rest|silence|chaos|violence|poverty|wealth|unemployment|inflation|pollution|crime)\b' → much / a lot of (muito → much)
'\b(a |one )(big|great|large|huge|small|good|bad|certain|considerable|significant|enormous|high|low) (quantity|amount) of (people|persons|students|users|clients|customers|friends|cars|houses|books|problems|questions|options|places|times|days|years|hours|reasons|examples|words|ideas|projects|tasks|jobs|companies|employees|children|kids|men|women|animals|photos|videos|songs|movies|games|apps|emails|messages|calls|meetings|classes|errors|bugs|issues|features|files|pages|items|steps|ways|groups|teams|players|followers|comments|posts|views|sales|orders|products|shops|stores|restaurants|hotels|schools|hospitals|buildings|rooms|streets|cities|countries|languages|rules|laws|taxes|costs|prices|opportunities|risks|benefits|changes|differences|details|facts|results|events|activities|studies|papers|articles|reports|documents|contracts|offers|plans|goals|complaints|requests|feelings|memories|experiences|stories|gifts|prizes|points|goals|matches|competitions)\b' → a large number of / many (uma grande quantidade de)
'\b(in|at) the (actuality|present days|current days|nowadays)\b'                  → nowadays / today (na atualidade)
'\b(each|every) (time|day|year) more\b'                                            → more and more / increasingly (cada vez mais)
'\b(each|every) (time|day|year) (less|worse|better|bigger|smaller|faster|harder)\b' → less and less / better and better (cada vez menos)
'\b(the |my |your |his |her |their |our )?(last|latest) (version|release|update|news|episode|edition|model|post|video|album|book|movie|film|chapter|season|generation|trend|technology|fashion)\b' → suggestion: *o último* → latest (not last) — anchor to *last* only
'\b(definitively) (I|we|you|they|he|she|it|not|yes|no|the|this|that|a|an)\b'      → definitely (definitivamente)
'\b(specially) (in|for|when|because|if|the|this|that|those|these|now|today|during|after|before|at|on|with|among|between|since)\b' → especially (check Harper)
'\b(actually|nowadays|currently|today),? (in|at) (the )?(present|actuality|current)\b' → redundant — suggestion
'\b(yet) (I|you|we|they|he|she|it) (am|is|are|was|were|have|has|had|don''t|doesn''t|didn''t|can|can''t|could|couldn''t|will|won''t|would|wouldn''t|live|work|study|use|need|want|like|love|remember|think|believe)\b' → still (ainda)
'\b(I|you|we|they|he|she|it) (am|is|are|was|were) yet (here|there|at|in|on|working|studying|living|waiting|sleeping|alive|young|single|married|sick|tired|busy|angry|upset|sad|happy|the same|a)\b' → still (ainda está)
'\b(I|you|we|they|he|she|it) (didn''t|did not|haven''t|have not|hasn''t|has not) (\w+ )?(still)\b' → yet (ainda não)
'\bin (the )?first place,\b'                                                       → first / firstly — suggestion (em primeiro lugar)
'\b(at|in) the (same|exact same) (time|moment) (that|when|as)\b'                   → fine — exclude
'\b(one|1) time\b(?! (a|per|each|every|in|at|of|only|zone|slot|frame|limit|use|password|payment|fee|charge|offer|deal|thing|too many|and|or|when|I|you|we|they|he|she))' → once (uma vez); '\b(two|2) times\b' → twice (duas vezes) — suggestion, guarded
```

### 4.12 NEW `Relatives.yml` — relative pronouns and *que* (substitution, warning)
Portuguese *que* covers who/which/that/what; *qual* covers which/what.
```
'\b(book|books|car|cars|house|houses|thing|things|problem|problems|idea|ideas|movie|movies|film|films|song|songs|place|places|city|cities|country|countries|company|companies|project|projects|product|products|system|systems|method|methods|question|questions|answer|answers|word|words|sentence|sentences|text|texts|article|articles|paper|papers|study|studies|result|results|reason|reasons|way|ways|time|times|day|days|year|years|part|parts|piece|pieces|table|tables|chair|chairs|door|doors|window|windows|phone|phones|computer|computers|app|apps|website|websites|game|games|test|tests|exam|exams|class|classes|course|courses|lesson|lessons|meeting|meetings|trip|trips|party|parties|event|events|plan|plans|option|options|choice|choices|decision|decisions|change|changes|process|processes|story|stories|language|languages|name|names|number|numbers|price|prices|value|values|money|job|jobs|work|task|tasks|goal|goals|dream|dreams|life|world|market|business|team|teams|tool|tools|feature|features|function|functions|file|files|page|pages|line|lines|item|items|element|elements|step|steps|form|forms|type|types|kind|kinds|level|levels|group|groups|version|versions|model|models|approach|approaches|solution|solutions|alternative|alternatives|possibility|possibilities|chance|chances|opportunity|opportunities|moment|moments|hour|hours|minute|minutes|week|weeks|month|months) (who|whom|whose)\b' → that / which (o livro que → the book that) — split into two keys; exclude *whose* (real for things)
'\b(person|people|man|men|woman|women|boy|boys|girl|girls|guy|guys|friend|friends|colleague|colleagues|student|students|teacher|teachers|doctor|doctors|lawyer|lawyers|engineer|engineers|developer|developers|designer|designers|manager|managers|boss|bosses|professor|professors|child|children|kid|kids|baby|babies|mother|mothers|father|fathers|brother|brothers|sister|sisters|son|sons|daughter|daughters|husband|husbands|wife|wives|partner|partners|neighbor|neighbors|neighbour|neighbours|customer|customers|client|clients|user|users|employee|employees|worker|workers|player|players|author|authors|writer|writers|artist|artists|singer|singers|actor|actors|actress|actresses|director|directors|president|presidents|minister|ministers|politician|politicians|leader|leaders|expert|experts|specialist|specialists|scientist|scientists|researcher|researchers|candidate|candidates|applicant|applicants|winner|winners|owner|owners|driver|drivers|passenger|passengers|patient|patients|nurse|nurses|officer|officers|soldier|soldiers|farmer|farmers|cook|cooks|chef|chefs|waiter|waiters|waitress|guest|guests|visitor|visitors|tourist|tourists|foreigner|foreigners|stranger|strangers|someone|somebody|anyone|anybody|everyone|everybody|no one|nobody|one|ones|those|the ones) which\b' → who (a pessoa que → the person who)
'\b(all|everything|nothing|something|anything|the only thing|the thing|the same|that) what\b' → all that / everything that / what (tudo o que → everything that)
'\b(the|this|that|a|an|my|your|his|her|their|our) (\w+) what (I|you|he|she|it|we|they)\b' → that (o livro o que → the book that)
'\bin (the )?which (I|you|he|she|it|we|they) (live|lives|lived|work|works|worked|study|studies|studied|stay|stays|stayed|sleep|sleeps|slept|sit|sits|sat|eat|eats|ate|meet|meets|met|play|plays|played|grew up|was born|were born|are|is|was|were)\b' → where (em que → where) — suggestion
'\bthe (same|equal) (that|of|than|like)\b' → the same as (o mesmo que)
'\b(this|that|these|those) (kinds?|types?|sorts?) of (things|people|problems|questions|situations|cases|jobs|places|ideas|products|services|foods|movies|books|games|stuff|activities|work|behavior|behaviour|attitude|thinking|thing|person|problem|question|situation|case|job|place|idea|product|service|food|movie|book|game|activity)\b' → this kind of thing / these kinds of things — number agreement (esse tipo de coisas)
```

### 4.13 EXTEND `FalseFriends.yml` — anchored, from the 177-entry catalogue
Only anchored contexts where the Portuguese meaning is near-certain; ~45 keys.
```
'(anticipate|anticipates|anticipated|anticipating) (the |a |our |my |your |their )?(meeting|date|deadline|delivery|payment|release|launch|trip|flight|schedule|appointment|exam|event|wedding|party|start|departure|return|vacation|holidays|elections|election)' → bring forward / move up $3 (antecipar)
'(for|to) (your|his|her|their|our|my) appreciation'                         → for your review / consideration (para apreciação)
'(send|sent|submit|submitted|forward|forwarded) (it |this |the \w+ )?for appreciation' → for review
'(financial |good |bad |safe |risky |long-term |short-term |the best )?(application|applications) (in|on|of) (the stock market|stocks|shares|funds|savings|the bank|treasury|bonds|real estate|bitcoin|crypto)' → investment (aplicação financeira)
'(the |a |its |his |her |their )?argument of the (movie|film|book|novel|series|show|play|story|episode|game)' → plot (argumento)
'(assume|assumes|assumed|assuming) (the |my |your |his |her |their |our |an? )?(mistake|mistakes|error|errors|guilt|fault|blame)' → admit / own up to (assumir o erro)
'(court |judicial |the |a |an |my |his |her |their )?audience (with|in|at|before) (the )?(judge|court|justice|tribunal|hearing)' → hearing (audiência)
'(got|get|gets|getting|stayed|stay|stays|is|was|am|are|were|became|become) brave (with|at) (me|you|him|her|us|them|the|my|his|her|their)' → angry / mad with (ficou bravo)
'(for|to) (your|his|her|their|our|my|the customer''s|the client''s|the user''s) commodity' → convenience / comfort (comodidade)
'(have|has|had|got|got a|have a|has a|had a) (a |an |another |one |some |many |several |too many |no )?(compromise|compromises) (at|on|in|with|tomorrow|today|tonight|later|this|next)' → appointment / commitment (compromisso)
'(the |a |our |their |his |her )?conductor of the (car|bus|truck|taxi|van|vehicle|train|tram|motorcycle|bike)' → driver (condutor)
'(public |federal |state |municipal |the |a |this |that )?(contest|contests) (of|for) (the )?(police|bank|court|ministry|city hall|state|federal government|government|army|navy|public service|civil service|teacher|teachers|judge|judges|prosecutor|attorney|auditor|analyst|technician)' → civil service exam (concurso público)
'(do|does|did|doing|make|makes|made|making|study for|studying for|pass in|passed in|approved in) (a |the |this |that |my |his |her |their |public |federal |state )?(contest|contests)' → take / pass a civil service exam
'(federal|state|the|a) (deputy|deputies)( of| for| from)?'                     → congressman / representative (deputado) — suggestion
'(devolve|devolves|devolved|devolving) (the |a |my |your |his |her |their |our |this |that |it|them|him|her|me|us)' → return / give back (devolver)
'(mal|bad|badly|poorly|not|non|un)[- ]educated'                                → rude / ill-mannered (mal-educado)
'(has|have|had|got|with) no education'                                          → no manners — suggestion (sem educação)
'(the |an |its )?(emission|issuance|emitting) of (the |an? |your |his |her |their |our |my )?(invoice|invoices|receipt|receipts|passport|passports|ticket|tickets|certificate|certificates|document|documents|visa|visas|license|licence|card|cards|boarding pass|note|notes|bill|bills)' → issuing / issuance of (emissão de nota)
'(I |we |you |they |he |she )?equivocated'                                        → was / were mistaken (se equivocou)
'(the |in the |from the |to the |of the )?estate of (são paulo|rio|rio de janeiro|minas|minas gerais|bahia|paraná|santa catarina|rio grande do sul|pernambuco|ceará|goiás|espírito santo|pará|amazonas|maranhão|mato grosso|mato grosso do sul|paraíba|alagoas|sergipe|piauí|rondônia|acre|amapá|roraima|tocantins|distrito federal|new york|california|texas|florida)' → state (estado)
'(with|have|has|had|got|make|made|obtain|obtained|achieve|achieved|great|much|no|little|some) (great |much |little |some |no |a lot of |big )?exit\b(?! (door|sign|row|ramp|strategy|poll|polls|interview|code|the))' → success (êxito)
'(very|so|really|too|quite|pretty|how) expert\b'                                → smart / clever (esperto)
'(fabricate|fabricates|fabricated|fabricating) (cars|vehicles|parts|products|goods|shoes|clothes|clothing|furniture|toys|tools|machines|equipment|components|devices|phones|computers|chips|steel|paper|glass|plastic|cement|food|drinks|beer|wine|medicine|medicines|drugs|vaccines|weapons|planes|ships|bikes|bicycles)' → manufacture / make (fabricar)
'(go|goes|went|going|enter|entered|entering|finish|finished|finishing|start|started|starting|leave|left|leaving|attend|attended|attending|at|in|to|from|the|my|our|his|her|their|your) (the )?faculty\b(?! (of|member|members|meeting|staff|lounge|position|positions|advisor|adviser|senate|council|development))' → college / university (faculdade)
'(faculty) of (medicine|law|engineering|economics|architecture|pharmacy|dentistry|nursing|psychology|education|letters|arts|sciences|business|administration)' → school / college of $2
'(very|so|too|really|quite|a bit|kind of|sort of) fastidious'                    → tedious / boring (fastidioso)
'\bin fate\b'                                                                    → in fact (de fato)
'(the |a |an )?(hotel |guest |our |their |the )?hostages? (of|at|in) (the |this |that |our |a )?(hotel|hostel|inn|pousada|resort|house|home|party|wedding|apartment)' → guests (hóspedes)
'(make|makes|made|making|do|does|did|doing|open|opened|complete|completed|confirm|confirmed|pay|paid|cancel|cancelled|canceled) (the |my |your |his |her |their |our |an? )?(inscription|inscriptions) (for|to|in|at|on)' → registration / sign up for (inscrição)
'(the )?(inscriptions|inscription) (are|is|will be|were|was) (open|closed|available|free|until|from)' → registration (inscrições abertas)
'(inscription|inscriptions) (fee|fees|form|forms|period|deadline|link|page|process|number)' → registration $2
'(don''t|do not|didn''t|did not|can''t|cannot|couldn''t|could not|doesn''t|does not|not) intend (what|why|how|when|where|who|which|anything|nothing|it|this|that|him|her|you|me|us|them|the|a|an|my|your|his|her|their|our|english|portuguese|spanish|french)' → understand (não entendo)
'(a |the |one |two |some |another )?(jar|jars) (of|with|full of) (water|juice|milk|beer|wine|lemonade|iced tea|coffee|soda)' → pitcher / jug (jarra)
'(change|changed|changing|replace|replaced|replacing|burned|burnt|burned-out|burnt-out|broken|new|led|LED|60-watt|100-watt|energy-saving|fluorescent|halogen) (the |a |an |this |that |my |your )?(lamp|lamps)\b' → light bulb (lâmpada) — suggestion
'(large|larger|largest) (street|streets|avenue|avenues|road|roads|river|rivers|door|doors|shoulders|hips|smile|smiles|bed|beds|corridor|corridors|hallway|hallways|bridge|bridges|sidewalk|sidewalks|path|paths|gap|gaps|space|spaces|screen|screens)' → wide / broad (largo)
'(car |bike |bicycle |house |apartment |equipment |costume |boat |truck |van |dress |tuxedo |suit |the |a |for )?(location|locations) (of|for) (cars|bikes|bicycles|houses|apartments|equipment|costumes|boats|trucks|vans|dresses|tuxedos|suits|rooms|vehicles|scooters|motorcycles|tools|machines)' → rental (locação)
'(afternoon|evening|night|morning|small|quick|little|a little|the) lunch\b(?! break| time| hour| meeting| box| menu| special| ended| started| is| was)' → snack (lanche) — anchor to afternoon/evening/night/morning only
'(the |a |my |his |her |their |our )?media (of|in|at|for) (the )?(grades|notes|marks|scores|test|tests|exam|exams|class|semester|year|students|course|subject|subjects|matter|matters)' → average (média)
'(my |your |his |her |their |our |the |all the |all my |visit |visiting |visited |see |seeing |saw )?parents (and|or|,) (friends|neighbors|neighbours|cousins|uncles|aunts|relatives|family)' → relatives (parentes)
'(distant|far|close|near|all the|all my|all our|many|some|several|few|a few|other|my other|the other|remote) parents\b' → relatives
'(particular|particulars) (school|schools|teacher|teachers|tutor|tutors|class|classes|lesson|lessons|hospital|hospitals|clinic|clinics|company|companies|life|car|cars|property|properties|sector|college|colleges|university|universities|plane|jet|pool|beach|island|room|rooms|bathroom|office|driver|security|party|parties|investor|investors|bank|banks|initiative|health plan|insurance|pension|practice|institution|institutions|schooling|education|tuition|lessons)' → private $2 (particular)
'(fly|flies|flew|flying|make|makes|made|making|build|builds|built|building|paper|kite|string of the) (a |the |my |his |her |their |our |paper )?(pipe|pipes)\b' → kite (pipa)
'(call|called|calling|phone|phoned|ring|rang|contact|contacted|the) (the )?policy\b(?! (holder|holders|number|document|is|was|says|states|covers|requires|allows|prohibits|of|on|for|change|changes|update|updates|maker|makers|brief|paper|decision|decisions))' → police (polícia)
'(the |my |his |her |their |our )?policy (arrested|came|arrived|stopped|caught|found|searched|said|asked|took|shot|killed|beat|chased|station|stations|officer|officers|car|cars|department|departments|force|chief|commissioner|report|investigation|sirens|siren)' → police $2
'(the |a |an |this |that )?(pork|porks) (is|are|was|were) (an? )?(animal|animals|mammal|mammals|pet|pets|dirty|smart|intelligent|clean|cute|fat|big)' → pig / pigs (porco)
'(open|opens|opened|opening|close|closes|closed|closing|lock|locks|locked|locking|unlock|unlocked|knock|knocks|knocked|knocking|knock on|kick|kicked|slam|slammed|shut|paint|painted|fix|fixed|broke|break|broken|the front|the back|the kitchen|the bathroom|the bedroom|the car|the garage|the fridge|the main|the wooden|the glass|the sliding|the automatic|the entrance|the exit) (the )?(port|ports)\b(?! (of|number|numbers|forwarding|scan|\d))' → door (porta)
'(with|in) (my|your|his|her|their|our|its) (own |proper) (house|home|car|money|hands|words|eyes|business|company|room|way|time|name|family|life|style|rules|method|opinion|ideas|resources|means|effort|efforts|work|account|initiative|risk|responsibility|choice|decision|pace|rhythm|language|voice|body|head|mind|feet)' → own (próprio) — flag only *proper*
'(cake |cooking |food |soup |dish |the |a |my |grandma''s |mom''s |mother''s |family |traditional |secret |favorite |favourite |easy |simple |quick |new |old |brazilian )?(receipt|receipts) (of|for|with) (the |a |my |grandma''s |mom''s |this |that )?(cake|bread|soup|dish|dessert|pie|cookie|cookies|sauce|salad|rice|beans|chicken|fish|meat|pasta|pizza|lasagna|feijoada|brigadeiro|pudding|juice|smoothie|cocktail|drink)' → recipe (receita)
'(medical|doctor''s|the doctor''s|my|your|his|her|their|the) receipt (for|of|with) (the )?(medicine|medicines|medication|medications|drug|drugs|antibiotics|pills|remedy|remedies|treatment)' → prescription (receita médica)
'(reclaim|reclaims|reclaimed|reclaiming) (about|of|with|to|that|because|a lot|too much|all the time|always|constantly|again)' → complain (reclamar)
'(the |a |an |our |their )?service (is|was|starts|started|ends|ended|begins|began|finishes|finished) at (\d|noon|midnight|morning|night|eight|nine|ten|seven|six)' → work / my shift (o serviço)
'(go|goes|went|going|back|come|comes|came|coming|arrive|arrived|arriving|leave|left|leaving|return|returned|returning|walk|walked|drive|drove|be|am|is|are|was|were) (to|from|at|in) (the |my |his |her |their |our )?service\b(?! (station|desk|center|centre|counter|provider|providers|area|department|level|quality|charge|fee|contract|agreement|call|request|ticket))' → work (ir pro serviço)
'(was|were|is|are|being|be|been|am|got|get|gets|getting|acted|act|acts|acting|so|very|really|too) (very |so |really |too )?stupid (with|to|towards|toward) (me|you|him|her|us|them|the|my|his|her|their|our|people|customers|clients|everyone|everybody)' → rude (estúpido com)
'(can''t|cannot|couldn''t|could not|don''t|do not|doesn''t|does not|didn''t|did not|not|never) (\w+ )?support (him|her|it|this|that|them|these|those|the heat|the cold|the noise|the pain|the smell|the pressure|the situation|this situation|this anymore|it anymore|more|anymore|any longer|so much|such|being|seeing|hearing|working|living|waiting|people who|when|to see|to hear|the idea|the thought|my boss|my job|his voice|her voice|this guy|that guy|this man|that woman)' → stand / bear / put up with (não suporto)
'\b(supportable|insupportable|unsupportable)\b'                                → bearable / unbearable (suportável)
'(take|takes|took|taking|call|calls|called|calling|get|gets|got|getting|by|catch|catches|caught|catching|a|the|my) (a |the |my )?(tax|taxes)( driver| drivers| ride| stand| home| to the airport| to| back)' → taxi / cab (táxi)
'(I|we|you|they|he|she|let me|let''s|will|would|could|can|should|must|going to|gonna|want to|wanna|try to|have to|need to) (\w+ )?tent (to|again|it|this|that|one more time|once more|later|tomorrow|harder|my best)' → try (tentar)
'(have|has|had|with|got|caught|a |the |strong |dry |bad |persistent |chronic |my |his |her |their |cold and |fever and |flu and )(a |much |a lot of |some |strong |dry |bad |persistent |chronic )?(toss)\b' → cough (tosse)
'(traduce|traduces|traduced|traducing) (the|this|that|a|an|it|them|to|from|into|for|my|your|his|her|their|our|everything|all|what|text|texts|document|documents|book|books|article|articles|page|pages|sentence|sentences|word|words|phrase|phrases)' → translate (traduzir)
'\b(traduction|traductions|traductor|traductors)\b'                            → translation / translator (tradução / tradutor)
'(the |our |their |brazil''s |the team''s |a |new |former |head |football |soccer |national |the club''s |the national team''s )?trainer of (the |brazil|flamengo|corinthians|palmeiras|santos|são paulo|grêmio|internacional|cruzeiro|atlético|vasco|fluminense|botafogo|the national team|the team|the club|the selection|the seleção|the squad|the boys|the girls|the u-20|the under-20|the women''s team|the men''s team|barcelona|real madrid|manchester|liverpool|chelsea|arsenal|juventus|milan|bayern|psg)' → coach / manager (treinador)
'(magic|card|little|good|old|dirty|cheap|nice|simple|clever|smart|the|a|an|this|that|my|your|his|her|their|our|some|no|any|every|new|same) (\w+ )?(truck|trucks) (to|for|that|with|of|is|was|on|behind|up (my|his|her|their|its) sleeve)' → trick (truque) — anchor: exclude *truck driver/stop/load/route/company*
'(morning|afternoon|evening|night|day|work|working|double|first|second|third|extra|long|short|the|my|your|his|her|their|our|a|an|this|that|next|last|each|every|per|each|\d+-hour|\d+ hour|eight-hour|12-hour|twelve-hour) (\w+ )?(turn|turns) (of work|at work|at the hospital|at the factory|at the store|at the office|starts|started|ends|ended|begins|began|is from|was from|from \d)' → shift (turno)
'(the |my |your |his |her |their |our |an? )?unique (child|son|daughter|option|way|thing|problem|reason|solution|difference|question|goal|purpose|time|person|one|chance|hope|friend|brother|sister|job|source|exception|alternative|possibility|answer|road|route|path|exit|entrance|door|key|copy|version|example|case|rule|condition|requirement|criterion|criteria|obstacle|barrier|limit|limitation|concern|worry|doubt|complaint|regret|mistake|error|bug|issue|flaw|defect|risk|danger|threat|thing that|one who|person who|way to|thing to|reason to|reason why|difference is|problem is|thing is)' → only (único / única)
'(sanitary|toilet|the|a|my|our|the bathroom|the bathroom''s|clogged|blocked|broken|new|old|dirty|clean|flush the|unclog the|clean the) (\w+ )?(vase|vases)\b(?! (of|with|full of) (flowers|roses|tulips|water|plants))' → toilet / toilet bowl (vaso sanitário)
'(vase|vases) (of|with|for) (plants|a plant|the plant|my plants|herbs|flowers|roses|orchids|succulents|cactus|cacti|tomatoes|basil|mint|parsley)' → pot / flowerpot (vaso de plantas)
'\balias,\s'                                                                   → by the way, (aliás) — sentence-initial only
'(my|your|his|her|their|our|the|happy|happy \d+th|\d+th|\d+st|\d+nd|\d+rd|a|an|this|that|next|last|his \d+th|her \d+th|my \d+th|the \d+th|whose|celebrate|celebrated|celebrating|celebrates|for|on|at|before|after|during|since|until|kids|kid|children''s|child''s|baby''s|son''s|daughter''s|grandma''s|grandpa''s|mom''s|dad''s|mother''s|father''s|brother''s|sister''s|friend''s|boyfriend''s|girlfriend''s|dog''s|cat''s|surprise|the surprise|a surprise|cake|party|birthday) anniversary\b(?! (of|gift|present|celebration|dinner|trip|card|edition|date|party|cake|ring|weekend|sale|event|show|concert|game|match|tour|album|issue|release|special))' → birthday (aniversário) — suggestion; *wedding anniversary* real
'(the |a |an |your |his |her |their |our |my )?(salary|salaries|wage|wages|pay|payment) (pretension|pretensions|pretence|pretense)' → salary expectations (pretensão salarial)
'(what|which) (is|are|was) (your|his|her|their) (salary |salarial |pay )?(pretension|pretensions)' → salary expectations
'(am|is|are|was|were|be|being|been|got|get|gets|getting|arrived|arrive|arrives|arriving|will be|going to be|gonna be|always|so|very|really|too|a bit|a little|kind of|\d+ minutes|\d+ hours|\d+ min|five minutes|ten minutes|half an hour|an hour) (\w+ )?retarded\b' → late / delayed (atrasado)
'(the |a |an |our |their |my |your |his |her |some |big |small |long |short |slight |\d+-minute |\d+ minute |\d+-hour |\d+ hour |flight |train |bus |delivery |payment |project |schedule |shipping |order )?(retard|retards) (of|in|on|with|for|at|to|from|because|due|caused|was|is|will|has|had|have)' → delay (atraso)
'(I |we |you |they |he |she |everyone |everybody |people |the audience |the public |the crowd |my \w+ |his \w+ |her \w+ |their \w+ |our \w+ )?(was|were|am|is|are|be|being|been|got|get|gets|getting|left|leave|leaves|leaving|so|very|really|totally|completely|absolutely|quite|pretty|a bit|a little|kind of|still|just) (\w+ )?(chocked|choqued|choqed|shoqued)\b' → shocked (chocado)
'(the |a |an |our |their |my |your |his |her |online |virtual |video |remote |telephone |phone |conference |zoom |teams |google meet |weekly |daily |monthly |annual |yearly |quarterly |general |board |team |staff |family |parent |parents'' |parent-teacher |school |class |department |sales |marketing |kickoff |kick-off |status |planning |follow-up |follow up |emergency |urgent |important |long |short |quick |brief |next |last |first |final |another |one more |a new |the next |the last |the first |the final |this |that |today''s |tomorrow''s |yesterday''s |monday''s |tuesday''s |wednesday''s |thursday''s |friday''s |morning |afternoon |evening |night |\d+ ?(am|pm) |\d+:\d+ |\d+h )?(reunion|reunions) (with|at|about|on|in|for|of|tomorrow|today|tonight|yesterday|now|later|next|last|this|every|each|is|was|are|were|will|has|had|have|starts|started|ends|ended|begins|began|finishes|finished|room|rooms|link|invite|invitation|agenda|minutes|notes|schedule|time|call|calls)' → meeting (reunião) — *family reunion*, *class reunion*, *high school reunion* are real: exclude family/class/school/high school/college/alumni/annual reunion (of former …)
'(have|has|had|having|schedule|scheduled|scheduling|book|booked|booking|mark|marked|marking|make|made|making|go to|went to|going to|attend|attended|attending|miss|missed|missing|cancel|cancelled|canceled|cancelling|canceling|reschedule|rescheduled|my|your|his|her|their|our|the|a|an|next|last|first|another|medical|doctor''s|doctor|dentist|dental|dentist''s|pediatric|routine|follow-up|follow up|online|virtual|remote|video|phone|telephone|\d+ ?(am|pm)|\d+:\d+|\d+h|morning|afternoon|evening|today''s|tomorrow''s|yesterday''s) (\w+ )?(consultation|consultations) (with|at|in|for|tomorrow|today|tonight|yesterday|now|later|next|last|this|is|was|are|were|will|has|had|have|starts|started|ends|ended|room|rooms|time|schedule|fee|fees|price|prices|cost|costs)' → appointment (consulta) — *public consultation*, *consultation paper/process/period* are real: exclude public/stakeholder/free/legal/tax/paid
```
`clean.txt` guards: every *real* usage excluded above appears as a sentence.

### 4.14 EXTEND `FalseFriendsWords.yml` — bare words, suggestion level
Add (~40): adept, advertise(d/s/ing), alias, anniversary, anticipate(d/s),
appreciation, argument (plot), assume (as *take over*), audience, barracks,
baton, bond, brave, carton, commodity, compliment, compromise (as
*appointment*), conductor, confident (noun), contest, curse, dairy, deputy,
devolve(d/s), disgrace (has), diversion (has), editor (as *publisher*),
emission, equivocate(d), estate (as *state*), exit (as *success*), fabricate,
faculty, fastidious, fate, hostage, inscription(s), lamp, large, location (as
*rental*), notice (as *news*), pipe (as *kite*), policy (as *police*), pork
(as *pig*), port (as *door*), proper (as *own*), receipt (as *recipe*), reclaim
(as *complain*), retard/retarded, service (as *job*), stupid (as *rude*),
supportable/insupportable, tent (verb), toss (noun), traduce/traduction/
traductor, trainer (as *coach*), truck (as *trick*), turn (as *shift*), unique
(as *only*), vase (as *toilet*), vegetable (as *plant*), vest (as *clothes*),
reunion, consultation, chocked, pretension.
**Rule:** a word goes in only if `clean.txt` shows it does not fire on a
plain, common English sentence using the word correctly at suggestion level
being acceptable noise. *large*, *notice*, *policy*, *service*, *unique*,
*turn*, *proper*, *port*, *lamp* are far too common bare — keep those
anchored-only (4.13) and do not add here.

### 4.15 NEW `Brazilianisms.yml` — English words re-lexicalized in Brazil (substitution, warning)
Words that are English but mean something else in Brazilian usage, and
Portuguese words that Brazilians transliterate. Two commits.
```
'(go|goes|went|going|to|at|in|from|near|the|a|new|big|the new|the big|the nearest|the closest|the mall|every|this|that|our|my) (\w+ )?(shopping|shoppings)\b(?! (mall|malls|center|centers|centre|centres|cart|carts|list|lists|bag|bags|spree|trip|trips|online|experience|habits|day|days|season|for|around|there|here|with|is|was|at))' → mall / shopping center (shopping)
'(wear|wearing|wore|wears|rent|rented|renting|rents|in|with|a|an|the|my|his|black|white|blue|elegant|new|old) (\w+ )?smoking\b(?! (area|areas|room|rooms|section|sections|ban|bans|cessation|habit|habits|gun|guns|hot|weed|cigarettes|cigars|a|the|is|was|kills|causes|in|at|on|outside|inside|while|and|or|zone|zones|lounge|lounges|policy|policies|cabin|cabins|car|cars|jacket))' → tuxedo / dinner jacket (smoking)
'(buy|bought|buying|buys|get|got|getting|gets|change|changed|changing|changes|new|old|prepaid|pre-paid|postpaid|post-paid|my|your|his|her|their|our|the|a|an|another|second|phone|cellphone|cell phone|mobile|vivo|claro|tim|oi) (\w+ )?(chip|chips) (for|of|from|in|into|on|to|is|was|are|were|number|numbers|activation|store|stores|shop|shops)' → SIM card (chip)
'\b(pen ?drive|pen-drive|pendrives|pen drives)\b'                                  → USB stick / flash drive (pen drive)
'\b(data ?show|datashow)\b'                                                        → projector (datashow)
'\b(home ?office)\b(?! (space|spaces|desk|desks|chair|chairs|setup|setups|furniture|deduction|deductions|expenses|design|designs|ideas|decor|essentials|equipment|environment|environments|worker|workers))' → working from home / remote work (home office) — flag *in/doing/on home office*
'(in|doing|on|at|during|the|our|their|my|your|his|her|full|partial|100%|hybrid) home ?office\b'   → remote work / working from home
'(a |the |my |our |their |his |her |your |new |old |cheap |good |fast |slow |broken |gaming |work |company |school |dell |lenovo |hp |acer |asus |samsung |apple )?(notebook|notebooks) (computer|computers|with \d+ ?gb|with \d+ ?ram|with an? (intel|amd|ryzen|core|i\d|m\d)|battery|batteries|charger|chargers|screen|screens|keyboard|keyboards|is slow|is fast|is broken|crashed|froze|died|turns on|turn on|turned on|won''t turn on|boots|booted|doesn''t boot|processor|processors|ram|ssd|hd|hdd|memory|graphics|gpu|cpu|windows|linux|ubuntu|macos)' → laptop (notebook) — suggestion
'\b(go|goes|went|going|to|at|in|from|the|a|tickets? for|tickets? to|see|saw|seeing|watch|watched|watching|attend|attended|attending|after|before|during|last|next|this|that|tonight''s|tomorrow''s|yesterday''s|saturday''s|sunday''s|friday''s) (\w+ )?(show|shows) (of|by|from|with) (the )?(band|bands|singer|singers|artist|artists|group|groups|dj|djs|orchestra|rapper|rappers|musician|musicians|choir)\b' → concert (show) — suggestion, anchored on *show of/by + band/singer*; extend with well-known artist names only if the fixture needs them
'\b(a |the |this |that |my |your |his |her |their |our |new |good |great |bad |boring |favorite |favourite |netflix |hbo |amazon |disney |korean |brazilian |american |british |spanish |turkish |crime |comedy |drama |horror |sci-fi |fantasy |animated |documentary |teen |medical |police |legal |political |historical |romantic |mini |limited |web |tv |television |streaming |cable |anime )(\w+ )?(serie|series) (that|which|who|on|about|from|with|is|was|has|had|started|ended|premiered|aired|airs|released|coming|returning|renewed|cancelled|canceled|i|we|you|they|he|she)\b' → only flag *serie* (singular); *series* is correct
'\b(serie|series) (chapter|chapters)\b'                                            → episode (capítulo)
'\b(the |a |an |this |that |next |last |first |final |new |latest |previous |today''s |tonight''s |tomorrow''s |yesterday''s |each |every |one |two |three |four |five |all the |every single )?(\w+ )?(chapter|chapters) of (the |this |that |my |your |his |her |their |our |a |an |season \d+ of |the first season of |the last season of |the new season of |the final season of )?(series|serie|show|shows|soap|soap opera|soap operas|novela|novelas|telenovela|telenovelas|sitcom|sitcoms|anime|animes|cartoon|cartoons|drama|dramas|dorama|doramas|season|seasons|podcast|podcasts)\b' → episode (capítulo) — suggestion; a chapter of a *book* is right, which the noun list excludes
'\b(main|principal|secondary|central|title|lead|leading|the|a|an|this|that|my|your|his|her|their|our|favorite|favourite|new|famous|fictional|historical|animated|cartoon|comic|comic book|video game|book|novel|film|movie|series|tv|television|soap opera|novela|telenovela|anime|manga|disney|marvel|dc|pixar|these|those|two|three|several|many|some|all|both|other|another|each|every|female|male|child|children|kid|kids|young|old|evil|good|bad|villain|hero|tragic|comic|funny|serious|complex|major|minor|supporting|recurring|guest|background|named|unnamed|silent|player|non-player|npc|playable|hidden|secret|boss|enemy|ally|companion|sidekick|mentor|love interest|rival|antagonist|protagonist|narrator)\s+(\w+\s+)?(personage|personages)\b' → character (personagem)
'\b(an? |the |this |that |my |your |his |her |their |our |big |huge |giant |new |old |digital |led |electronic |illuminated |roadside |highway |road |street |city |downtown |advertising |political |campaign |election |commercial |company |brand |product |movie |film |concert |show |event |festival |sale |promotional |promo |rent an? |rent the |buy an? |buy the |put up an? |put up the |install an? |install the |see an? |see the |saw an? |saw the |pass by an? |pass by the |drive by an? |drive by the )(\w+ )?(outdoor|outdoors)\b(?! (activities|activity|adventure|adventures|area|areas|space|spaces|seating|dining|pool|pools|furniture|kitchen|kitchens|living|lighting|lights|light|gear|equipment|clothing|clothes|shoes|sports|sport|games|game|market|markets|concert|concerts|event|events|festival|festivals|wedding|weddings|party|parties|use|enthusiast|enthusiasts|education|school|schools|learning|classroom|classrooms|play|playground|playgrounds|recreation|advertising|advertisement|advertisements|ad|ads|media|signage|sign|signs|display|displays|billboard|billboards|screen|screens|camera|cameras|speaker|speakers|unit|units|shower|showers|toilet|toilets|bathroom|bathrooms|cat|cats|dog|dogs|pet|pets|plant|plants|garden|gardens|patio|patios|deck|decks|terrace|terraces|balcony|balconies|table|tables|chair|chairs|bench|benches|rug|rugs|mat|mats|heater|heaters|fireplace|fireplaces|grill|grills|oven|ovens|storage|shed|sheds|and|or|,|\.|!|\?))' → billboard (outdoor)
'\b(work|works|worked|working|career|job|jobs|degree|course|courses|studied|studies|studying|study|major|majored|majoring|graduated|graduate|graduating|agency|agencies|firm|firms|company|companies|professional|professionals|campaign|campaigns|department|departments|team|teams|manager|managers|director|directors|budget|budgets|industry|market|sector|world|business|strategy|strategies|piece|pieces|material|materials|photo|photos|photography|video|videos|shoot|shoots) (in|of|for|with|at|on) (the )?publicity\b(?! (stunt|stunts|tour|tours|campaign for the book|department of the publisher|shot|shots|still|stills|photo for the|rights|right))' → advertising (publicidade) — suggestion
'\b(the |a |an |our |their |my |your |his |her |internal |external |hr |human resources |company |corporate |public |open |closed |new |ongoing |current |recent |last |next |first |second |third |final |whole |entire |long |short |fast |slow |transparent |fair |unfair |rigorous |tough |hard |easy |simple |complex |multi-stage |two-stage |three-stage |online |remote |in-person |face-to-face )?(selective|selection|selective hiring|selective recruitment) (process|processes)\b' → hiring process / recruitment process (processo seletivo)
'\b(open|opened|opening|file|filed|filing|enter|entered|entering|move|moved|moving|start|started|starting|win|won|winning|lose|lost|losing|face|faced|facing|respond to|responded to|answer|answered|have|has|had|there is|there''s|there are|there was|a|an|the|this|that|my|your|his|her|their|our|another|new|ongoing|pending|labor|labour|civil|criminal|judicial|legal|court|divorce|custody|inheritance|tax|consumer|medical|malpractice|discrimination|harassment|defamation|fraud|corruption) (\w+ )?(process|processes) (against|versus|vs\.?|in the court|in court|in the justice|in justice|at the court|with the justice|for damages|for compensation|for defamation|for harassment|for discrimination|for fraud|for corruption|was filed|were filed|is pending|are pending|was dismissed|was won|was lost|is running|is ongoing|number \d|no\. \d|nº \d|n° \d)' → lawsuit / case (processo)
'\b(go|goes|went|going|take|takes|took|taking|taken|bring|brings|brought|appeal|appeals|appealed|resort|resorted|turn|turned|complain|complained|sue|sued|suing|in|at|by|from|to|through|before|the|brazilian|the brazilian|labor|labour|federal|state|electoral|military|civil|criminal) (\w+ )?(to the |in the |at the |by the |from the |through the |before the )justice\b(?! (system|systems|department|ministry|minister|secretary|league|society|movement|reform|reforms|for|of|is|was|will|would|must|should|delayed|denied|served|prevailed|done|be done|for all|and|or|,|\.|!|\?))' → court / the courts (a justiça)
'\b(hire|hired|hiring|call|called|calling|talk to|talked to|consult|consulted|need|needed|find|found|looking for|look for|get|got|see|saw|meet|met|pay|paid|ask|asked|be|become|became|am|is|are|was|were|work as|works as|worked as|study to be|studying to be|want to be|wanted to be) (an? |the |my |your |his |her |their |our |a good |a great |an expensive |a cheap |a famous |an experienced |a young |a labor |a labour |a criminal |a civil |a family |a divorce |a tax |a corporate |a business |a real estate |an immigration |a defense |a defence |a public |a private )?(advocate|advocates)\b(?! (for|of|against|that|this|these|those|the|a|an|his|her|their|our|my|your|its|policies|policy|reform|reforms|change|changes|rights|justice|peace|equality|freedom|democracy|animal|animals|children|women|patients|consumer|consumers|human|environmental|social|climate|health|mental|education|voting|gun|immigration|refugee|refugees|homeless|disability|veteran|veterans|victim|victims|survivor|survivors|community|and|or|,|\.|!|\?))' → lawyer (advogado)
'\b(during|after|before|until|till|outside|outside of|inside|within|throughout|in|at|by the end of|at the end of|past|beyond|normal|regular|business|office|working|work|extended|reduced|the|our|their|my|your|his|her|its|the company''s|the store''s|the bank''s|the office''s|the school''s|the clinic''s|the hospital''s|the court''s) (\w+ )?(expedient|expedients)\b(?! (means|measures|solution|solutions|way|ways|method|methods|to|for|of|and|or|,|\.|!|\?))' → business hours / working hours (expediente)
'\b(the |a |an |this |that |my |your |his |her |their |our |its |one |another |some |several |two |three |first |second |third |main |most |very |so |really |too |quite |pretty |extremely |highly |rather |somewhat |a bit |a little |kind of |sort of )?(principal) (reason|reasons|objective|objectives|goal|goals|purpose|purposes|problem|problems|idea|ideas|cause|causes|difference|differences|advantage|advantages|disadvantage|disadvantages|point|points|thing|things|function|functions|feature|features|character|characters|role|roles|topic|topics|subject|subjects|theme|themes|issue|issues|question|questions|concern|concerns|focus|source|sources|factor|factors|element|elements|component|components|part|parts|aspect|aspects|benefit|benefits|risk|risks|challenge|challenges|task|tasks|activity|activities|responsibility|responsibilities|job|jobs|street|streets|avenue|avenues|road|roads|entrance|entrances|door|doors|building|buildings|office|offices|city|cities|square|squares|dish|dishes|course|courses|meal|meals|ingredient|ingredients|product|products|service|services|market|markets|client|clients|customer|customers|competitor|competitors|supplier|suppliers|partner|partners|sponsor|sponsors|investor|investors|user|users|audience|target|targets|tool|tools|method|methods|technique|techniques|strategy|strategies|approach|approaches|principle|principles|rule|rules|requirement|requirements|criterion|criteria|indicator|indicators|metric|metrics|result|results|finding|findings|conclusion|conclusions|contribution|contributions|change|changes|trend|trends|event|events|moment|moments|date|dates|deadline|deadlines|milestone|milestones|stage|stages|phase|phases|step|steps|section|sections|chapter|chapters|page|pages|screen|screens|menu|menus|button|buttons|file|files|folder|folders|branch|branches|class|classes|module|modules|package|packages|library|libraries|framework|frameworks|language|languages|database|databases|table|tables|server|servers|domain|domains|window|windows|thread|threads|process|processes|loop|loops|variable|variables|argument|arguments|parameter|parameters|value|values|key|keys|node|nodes|path|paths|route|routes|endpoint|endpoints|api|apis)\b' → main (principal) — suggestion; *principal* is real English but Brazilians overuse it
'\b(polemic|polemical) (topic|topics|subject|subjects|issue|issues|question|questions|decision|decisions|figure|figures|person|people|player|players|politician|politicians|statement|statements|comment|comments|opinion|opinions|law|laws|bill|bills|project|projects|film|films|movie|movies|book|books|song|songs|video|videos|post|posts|tweet|tweets|interview|interviews|speech|speeches|case|cases|episode|episodes|scene|scenes|moment|moments|goal|goals|penalty|penalties|referee|referees|judge|judges|ruling|rulings|verdict|verdicts|measure|measures|policy|policies|reform|reforms|change|changes|proposal|proposals|plan|plans|choice|choices|move|moves|act|acts|gesture|gestures|remark|remarks|joke|jokes|ad|ads|campaign|campaigns|brand|brands|company|companies|character|characters|theme|themes|matter|matters|thing|things|point|points|debate|debates|discussion|discussions|celebrity|celebrities|influencer|influencers|youtuber|youtubers|streamer|streamers|artist|artists|singer|singers|actor|actors|actress|actresses|director|directors|writer|writers|author|authors|journalist|journalists|presenter|presenters|host|hosts|coach|coaches|manager|managers|president|presidents|minister|ministers|governor|governors|mayor|mayors|senator|senators|deputy|deputies|congressman|congresswoman)\b|\b(very|so|really|too|quite|pretty|extremely|highly|rather|somewhat|a bit|a little|kind of|sort of|most|more|less|the most|the least|is|was|are|were|be|being|been|became|become|becomes|remains|remained|seems|seemed|sounds|sounded|looks|looked|considered|called|deemed|labeled|labelled) (\w+ )?polemic\b' → controversial (polêmico)
'\b(thank you|thanks|grateful|thankful|appreciate|appreciated|we appreciate|i appreciate|count on|counting on|ask for|asking for|hope for|need|needs|needed|require|requires|required|request|requests|requested|expect|expects|expected|deserve|deserves|deserved|show|shows|showed|have|has|had|lack|lacks|lacked|without|with|for|of|full of|lots of|a lot of|much|more|less|some|no|little|great|deep|real|true|genuine|sincere|mutual|human|your|his|her|their|our|my|everyone''s|everybody''s|people''s|the reader''s|the customer''s|the client''s|the user''s|the team''s|the public''s|management''s|the company''s) (\w+ )?comprehension\b(?! (test|tests|question|questions|exercise|exercises|skill|skills|level|levels|strategy|strategies|ability|check|quiz|passage|task|score|of the text|of the passage|of the reading|of the material|of the content|of the subject|of the topic|of the concept|of the language|of english|of portuguese|of what|of how|of why|reading|listening|written|oral|verbal|textual|exam|assessment|section|instruction|teaching|learning|difficulty|difficulties|problem|problems|deficit|disorder|impairment|and|or|,|\.|!|\?))' → understanding (compreensão)
'\b(familiar) (problems|problem|reasons|reason|business|businesses|life|lives|relations|relationships|relationship|members|member|meeting|meetings|dinner|dinners|lunch|lunches|trip|trips|vacation|vacations|holiday|holidays|gathering|gatherings|reunion|reunions|party|parties|celebration|celebrations|event|events|issues|issue|matters|matter|affairs|ties|bonds|values|traditions|history|background|environment|atmosphere|home|house|car|budget|income|allowance|support|therapy|counseling|counselling|doctor|lawyer|law|court|planning|structure|unit|size|name|names|tree|photo|photos|album|portrait|recipe|recipes|farm|company|companies|firm|group|nucleus|core|circle|context|situation|conflict|conflicts|violence|drama|secret|secrets|obligations|duties|responsibilities|commitments|pressure|expectations|emergency|crisis|loss|death|illness|disease|medical history|health|wealth|fortune|inheritance|heritage|legacy|estate|property|land|assets)\b' → family (familiar → family) — *familiar* meaning *known* is real: anchored on nouns that take *family*
'\b(go|goes|went|going|to|at|in|from|near|next to|close to|in front of|behind|the|a|an|my|your|his|her|their|our|new|old|good|bad|great|cheap|expensive|nearest|closest|local|neighborhood|neighbourhood|24-hour|24h|women''s|crossfit|boxing|pilates|yoga|dance|jiu-jitsu|judo|karate|muay thai|swimming|climbing|bodybuilding|fitness|smart fit|smartfit|bluefit|bio ritmo|bodytech) (\w+ )?(academy|academies)\b(?! (award|awards|of|for|member|members|membership|graduate|graduates|student|students|teacher|teachers|professor|professors|program|programme|course|courses|class|classes|lecture|lectures|school|schools|preparatory|prep|military|naval|air force|police|fire|coast guard|and|or|,|\.|!|\?))' → gym (academia)
'\b(do|does|did|doing|done|make|makes|made|making|practice|practices|practiced|practicing|practise|practises|practised|practising|start|starts|started|starting|stop|stops|stopped|stopping|love|loves|loved|loving|like|likes|liked|liking|hate|hates|hated|hating|enjoy|enjoys|enjoyed|enjoying|prefer|prefers|preferred|preferring|recommend|recommends|recommended|recommending|teach|teaches|taught|teaching|learn|learns|learned|learnt|learning|heavy|light|intense|serious|daily|weekly|regular|some|much|a lot of|more|less|no|any|the|my|your|his|her|their|our|for|of|with|and|or|,|\.|!|\?) (\w+ )?(musculation|musculação)\b' → weight training / lifting (musculação)
'\b(my|your|his|her|their|our|a|an|the|new|old|good|great|expensive|cheap|hire|hired|hiring|hires|have|has|had|having|get|got|getting|gets|need|needs|needed|want|wants|wanted|find|found|look for|looking for|pay|paid|paying|with|without) (\w+ )?personal\b(?! (trainer|trainers|training|life|data|information|details|opinion|experience|reasons|reason|matter|matters|problem|problems|issue|issues|question|questions|choice|preference|preferences|taste|style|touch|space|belongings|items|things|stuff|property|use|growth|development|goal|goals|project|projects|brand|branding|website|blog|page|account|profile|email|phone|number|computer|laptop|device|assistant|shopper|chef|driver|doctor|physician|lawyer|attorney|banker|advisor|adviser|coach|stylist|organizer|organiser|secretary|bodyguard|guard|security|protection|safety|hygiene|care|grooming|appearance|attack|attacks|insult|insults|drama|crisis|tragedy|loss|struggle|journey|story|stories|history|narrative|essay|statement|letter|note|message|call|visit|favor|favour|request|invitation|guarantee|responsibility|liability|income|finance|finances|loan|debt|savings|budget|expense|expenses|tax|taxes|pension|insurance|record|records|file|files|document|documents|identification|id|identity|name|pronouns|boundaries|limit|limits|best|worst|and|or|,|\.|!|\?))' → personal trainer (personal)
'\b(the|a|an|our|their|brazil''s|flamengo''s|the team''s|the club''s|the national team''s|new|former|head|assistant|interim|first-team|youth|under-20|u-20|women''s|men''s) (\w+ )?(technical|technicals) (of|for) (the |brazil|the brazilian team|the national team|the team|the club|the squad|the seleção|flamengo|corinthians|palmeiras|santos|são paulo|grêmio|internacional|cruzeiro|atlético|vasco|fluminense|botafogo)\b' → coach / manager (técnico)
'\b(the|a|an|this|that|our|their|today''s|tonight''s|yesterday''s|the final''s|the derby''s|the video|the var|VAR|main|assistant|fourth|bad|good|terrible|awful|incompetent|corrupt|biased|unfair|fair|strict|lenient|experienced|controversial|polemic) (\w+ )?(judge|judges) (of the |of this |of that |of tonight''s |of today''s |of yesterday''s )?(game|games|match|matches|final|finals|derby|derbies|clássico|clássicos|semifinal|semifinals|quarterfinal|quarterfinals|playoff|playoffs|cup|championship|tournament|league|round|fixture|first leg|second leg|first half|second half|extra time|penalties|shootout)\b|\b(judge|judges) (whistled|whistles|blew the whistle|blows the whistle|gave a penalty|gives a penalty|gave a red card|gives a red card|gave a yellow card|gives a yellow card|showed a card|shows a card|sent off|sends off|sent him off|sent her off|booked|books|cautioned|disallowed|allowed the goal|called offside|called a foul|called a penalty|checked the var|went to the var|consulted the var|stopped the game|stopped the match|added \d+ minutes|ended the game|ended the match|started the game|started the match)\b' → referee (juiz)
'\b(I|we|you|they|he|she|everyone|everybody|people|fans|the fans|the crowd|the whole country|the whole stadium|my family|my friends|my parents|my dad|my mom|my brother|my sister|brazilians|the brazilians|all brazilians|most brazilians|who|those who|anyone who|everyone who|people who|fans who|kids who) (\w+ )?(twist|twists|twisted|twisting) (for|against|to)\b' → root for / support / cheer for (torcer por)
'\b(the|a|an|our|their|brazil''s|the team''s|the club''s|the national team''s|new|former|young|old|best|worst|top|main|star|starting|substitute|backup|reserve|left|right|central|centre|center|lone|second|false nine|false 9|number 9|number nine|brazilian|argentine|argentinian|french|english|spanish|portuguese|italian|german|dutch|uruguayan|colombian|nigerian|norwegian|polish|croatian|japanese|korean) (\w+ )?(attacker|attackers) (of|for|from|at|in|with|who|that|scored|scores|scoring|missed|misses|played|plays|signed|signs|joined|joins|left|leaves|was|were|is|are|has|have|had|will|would|can|could)\b' → striker / forward (atacante)
'\b(make|makes|made|making|do|does|did|doing|done) (a |an |one |two |three |four |five |the |his |her |their |our |my |your |another |one more |the first |the second |the last |the final |the winning |the equalizing |the opening |the only |a great |a beautiful |an amazing |a header |a penalty |a free-kick |a free kick |a corner |a long-range |a tap-in |a solo |a late |a last-minute |an early |a golden |an own )?(goal|goals|gol|gols)\b(?! (of|for|setting|planning|oriented|driven|focused|line|lines|post|posts|kick|kicks|area|keeper|scorer|difference|average|tally|drought|celebration))' → score a goal (fazer um gol)
'\b(my|your|his|her|their|our|the|which|the other|the best|the worst|the home|the away|brazilian|the brazilian|flamengo''s|corinthians''|palmeiras''|santos''|são paulo''s|grêmio''s|the club''s|the city''s|the school''s|the company''s) (\w+ )?(time|times) (won|wins|lost|loses|played|plays|scored|drew|draws|beat|beats|defeated|qualified|advanced|eliminated|relegated|promoted|signed|hired|fired|trained|is playing|are playing|was playing|were playing|will play|is winning|is losing|is leading|of football|of soccer|of basketball|of volleyball|of futsal|of handball|of rugby|of esports|of league of legends|of counter-strike|of valorant|of dota)\b' → team (time) — anchor to the verbs/of-phrases; *time* alone is untouchable
'\b(make|makes|made|making|do|does|did|doing|done|take|takes|took|taking|taken|have|has|had|having|study for|studied for|studying for|prepare for|prepared for|preparing for|pass|passed|passing|fail|failed|failing|the|a|an|this|that|my|your|his|her|their|our|next|last|first|second|final|math|maths|english|portuguese|history|geography|science|physics|chemistry|biology|spanish|literature|philosophy|written|oral|practical|multiple-choice|multiple choice|midterm|mid-term|monthly|bimonthly|surprise|mock|practice|entrance|admission|placement|proficiency|hard|difficult|tough|easy|long|short|big|important) (\w+ )?(proof|proofs) (of|in|on|at|for|about|tomorrow|today|yesterday|next|last|this|is|was|are|were|will|has|had|have|went|starts|started|ends|ended|day|days|week|date|time|schedule|period|results|result|grade|grades|score|scores|question|questions|answer|answers|sheet|paper|room|and|or|,|\.|!|\?)' → test / exam (prova)
'\b(good|bad|great|high|low|highest|lowest|best|worst|average|maximum|minimum|full|perfect|passing|failing|final|red|blue|math|maths|english|portuguese|history|science|physics|chemistry|biology|took|take|takes|got|get|gets|received|earned|scored|gave|gives|posted|released|improve|improved|raise|raised|lower|lowered|drop|dropped|calculate|calculated|average|averaged|round|rounded) (\w+ )?(note|notes) (in|on|at|for|of|from|was|were|is|are|went|dropped|fell|rose|improved|got|came|out|below|above|under|over|between|around|about|higher than|lower than|better than|worse than)\b' → grade / mark (nota) — suggestion; the grade-like context required on both sides keeps *note-taking*, *note to self*, *note of thanks* out
'\b(fiscal note|fiscal notes|nota fiscal|notas fiscais)\b' → receipt / invoice (nota fiscal)
'\b(a|an|one|two|three|four|five|ten|twenty|some|several|many|a few|no|any|the|this|that|these|those|my|your|his|her|their|our|new|old|fake|counterfeit|torn|folded|dirty|lost|found|stolen|counted|counting|count) (\w+ )?(note|notes) of (\d+|two|five|ten|twenty|fifty|one hundred|a hundred|hundred|two hundred|five hundred|a thousand|thousand) ?(reais|real|dollars|dollar|euros|euro|pounds|pound|pesos|peso|bucks|r\$|us\$|\$|€|£)\b' → a 50 bill / a fifty (nota de 50)
'\b(was|were|am|is|are|be|being|been|get|got|gets|getting|gotten|finally|just|already|still|not|never|also|even|almost|luckily|fortunately|unfortunately|eventually) (\w+ )?(approved|reproved|reprobated) (in|on|at|for|to|by) (the |this |that |my |your |his |her |their |our |a |an |all the |every |each |the first |the second |the last |the final |the entrance |the admission |math |maths |english |portuguese |history |science |physics |chemistry |biology |the written |the oral |the practical |the hard |the difficult )?(exam|exams|test|tests|proof|proofs|prova|provas|vestibular|enem|concurso|concursos|contest|contests|selection|selective process|interview|interviews|course|courses|class|classes|subject|subjects|discipline|disciplines|matter|matters|semester|year|grade|school|college|university|faculty|program|master|master''s|doctorate|phd|mba|residency|job|position|vacancy|opening|competition|audition|tryout|trial|driving test|driving exam|medical exam|psychological test|psychotechnical|aptitude test|bar exam|oab|toefl|ielts|celpe-bras|dele|delf|sat|gre|gmat)\b' → passed / failed (aprovado / reprovado)
```
The rest of the Brazilianisms (curriculum→résumé, vacancy→opening, formation→
education, graduation→undergraduate, master→master's, matter/discipline→
subject, faculty→college, monography→thesis, recreation→recess,
interval/pause→break, cup of water→glass, plate→dish, edifice→building,
condominium→HOA fees, porter→doorman, cover→penthouse, living→living room,
interior→countryside, quarter→block, trajectory/displacement/locomotion→
commute, conductor/pilot→driver, retard→delay) follow the same anchoring
recipe; put them in the second Brazilianisms commit with fixture lines and
guards for each.

### 4.16 EXTEND `Spelling.yml` — Portuguese-shaped spellings, two commits
Harper's `SpellCheck` already flags non-words, usually with a good first
suggestion. So the procedure is:

1. Run every candidate below through `bin/pasqualina.mjs --tool harper` in a
   short sentence.
2. Keep a candidate **only** if Harper is silent (the misspelling is a real
   English word, or Harper's dictionary accepts it) **or** Harper's first
   suggestion is not the intended word.
3. Everything Harper handles correctly is recorded in `docs/03` as `H` and
   not added.

Candidates, by mechanism (the *reason* a Brazilian writes it):

- **Real English words used as misspellings (Harper silent — highest value):**
  especial (special), estate (state), fate (fact), media (average — see 4.13),
  pression (pressure — not a word, check), proper (own), particular (private),
  actual (current), physic (physics), fisic, gripe (flu), notice (news), sinal
  (signal), exit (success), tent (try), toss (cough), curse (course), dairy
  (diary), lace (bow), lamp (bulb), port (door), pork (pig), grip (flu), vest
  (clothes), alias (by the way), fine (thin), gem (yolk), rim (kidney), quote
  (quota), range (creak), limp (clean), ladder (slope), dent (tooth), moisture
  (mixture), carton (card), bond (tram), camp (field), café (coffee), cigar
  (cigarette), collar (necklace), costume (custom), data (date), deputy
  (congressman), editor (publisher), fabric (factory), idiom (language), injury
  (insult), jar (pitcher), journal (newspaper), legend (subtitle), library
  (bookstore), lunch (snack), magazine (store), mayor (bigger), motel, novel
  (soap opera), office (trade), parent (relative), pasta (folder), physician
  (physicist), policy (police), prejudice (loss), pretend (intend), procure
  (look for), push (pull), realize (carry out), receipt (recipe), recipient
  (container), record (remember), requirement (request), resume (summary),
  retire (remove), scholar (school), senior (Mr.), sensible (sensitive),
  service (job), stranger (foreigner), support (stand), sympathetic (nice),
  tax (taxi), terrific (terrible), trainer (coach), truck (trick), turn
  (shift), unique (only), vase (toilet), vegetable (plant), vicious (addictive)
  — most of these are already false friends (4.13/4.14); the *spelling* commit
  takes only the ones that are letter-for-letter Portuguese: **especial,
  estate, fate, sinal, fisic, gripe, tent, toss, curse, dairy, alias**.
- **ph → f (Portuguese has no *ph*):** foto, fotos, fotograph, fotografy,
  telefone, microfone, farmacy, alfabet, atmosfere, emfasis, enfasis, enfatize,
  grafic, paragraf, geografy, biografy, trofy, elefant, orfan, catastrofe,
  metafor, asfalt, sofisticated, fase, frase, fenomenon, fisical, fisically,
  fisioterapy, filosofy, filosofer.
- **th → t:** teory, teoretical, tesis, metod, metodology, etics, etical,
  atlete, atletic, autor, autority, autentic, autorize, autorization, ritm,
  ritmo, rythm, termometer, termal, teater, teatre, catedral, catolic,
  sintom, sinfony, sinonim, sistem, sistematic, sintesis, sintetic, simbol,
  simbolic, terapy, terapist, hipotesis, hipothesis, matematic, aritmetic.
- **y → i, ch → qu/c, x → s:** stile, tipe, tipical, cicle, bicicle, recicle,
  analise, analisis, analize, analist, sintax, arquive, hierarquy, orquestra,
  quimical, caos, cronology, cronological, cristian, psicological,
  psicologist, psiquiatry, psiquiatrist, exibition, exaust, exausted.
- **es- prothesis (Portuguese adds *e* before s+consonant):** especific,
  especifically, especify, especialist, especialize, especies, espectator,
  espectacular, espirit, esport, estadium, estable, estrategy, estrategic,
  estructure, estructural, estatistic, estatistics, estandard, estress,
  estressed, estatus, espace, esquema, estupid, estation, estomach, estudent,
  estudy, estudio, estrange, estock, estimulate, estrict, estereotype,
  escultura, esposa, espontaneous.
- **Doubled consonants dropped:** confortable, unconfortable, confortably,
  departament, equipament, medicament, tratament, suficient, insuficient,
  apropriate, inapropriate, apear, apearance, aparence, acording, acompany,
  acompanied, acumulate, acuse, acurate, acomplish, adquisition, aquisition,
  oponent, opression, opose, arangement, arange, arive, arival, arogant,
  corect, corection, incorect, corelation, corespond, corupt, coruption,
  curent, curently, curency, curiculum, teritory, terible, teribly, terorism,
  terorist, mariage, maried, borow, narow, hury, wory, woried, planing,
  planed, runing, stoping, stoped, shoping, shiping, droped, geting, puting,
  siting, cuting, seting, biger, bigest, swiming, occured, transfered,
  comited, commited, admited, submited, permited, controled, controling,
  equiped, forgeten, forgoten, writen, hiden, suden, unforgetable, comitee,
  commitee, accomodate, millenium, milionaire, colective, colect, colector,
  colum, comand, coment, comented, comision, comon, comonly, sumary, sumarize,
  programing, programer, dilema, imense, imigrant, imigration, imune,
  imunity, imortal, imature, imoral, imersion, iminent, ilogical, iluminate,
  ilusion, inocent, inocence, anoying, anoyed, anex, aniversary, tunel,
  personel, questionaire, cigarete, balon, baloon, bulet, polution, polute,
  poluted, alow, alowed, alergy, alergic, aliance, colapse, folow, folowing,
  folowed, yelow, pilow, briliant, satelite, instal, instaled, instalation,
  usefull, beautifull, carefull, helpfull, wonderfull, gratefull, powerfull,
  successfull, sucessfull, peacefull, painfull, hopefull, thankfull, awfull.
- **Portuguese endings (-ção → -tion, -são → -sion, -mento → -ment, etc.):**
  explication, explicate, traduction, traductor, pression, presion,
  ilusion, colision, comission, sucession, funcionality, funcional, opcional,
  esencial, esence, aceptable, acept, exame, exibition, experiencia,
  experiense, experiance, existencia, preferance, diferance, referance,
  conferance, elegante, restaurante, importante (exists), interesant (exists),
  desenvolvimento, developement, managment, envolviment, involvment,
  promisse, compromisse, garantee, garanty, garantia, quarentine,
  propriety (for property), cience, cientific, cientist, concious,
  unconcious, subconcious, conciense, consciense, pacient, pacience,
  impacient, ansious, ansiety, sociaty, socity, univercity, universaty,
  seguridade, actividade, identidade, realidade, personalidade, cualidade,
  cuality, funtion, sinal, fulfill/fullfill (BrE fulfil is fine — skip).
- **Frequent generic misspellings Brazilians share with everyone (only if
  Harper's suggestion is wrong):** definetly, defenitely, seperate, separete,
  allready, allways, allmost, allso, altough, althought, trough (for
  through), throught, tought (for thought), toghether, togheter, wether (for
  whether), wheter, whith, beleive, belive, acheive, achive, achivement,
  feild, peice, freind, reciept, percieve, suceed, exced, excede, tommorow,
  tommorrow, wich (exists), witch (for which — anchor: `witch (is|are|was|one|means)`).

### 4.17 EXTEND `Uncountable.yml` and `Register.yml` — small
Uncountable: add *persons* (people), *hairs*, *works* (jobs), *travels* (a
trip — exists), *damages* (as damage), *jewelries*, *clothings*, *researches*
(exists), *homeworks* (exists), *accommodations* (BrE fine — skip), plus the
*a/an + uncountable* list gets: *a work*, *a research*, *a travel*, *a
money*, *a bread*, *a music*, *a news*.
Register: add *in the actuality*, *nowadays* overuse is fine — skip; add
*utilize* (exists), *effectuate*, *realize* (as carry out — 4.13), *verify*
(for *check*: "verify if" → check whether — suggestion), *inform* (for *tell*:
"inform me" → let me know — suggestion), *elaborate a* (for *draft/prepare*:
"elaborate a report" → prepare), *emit* (for *issue*), *solicit* (for
*request/ask*), *ample* (for *broad*), *diverse* (exists), *punctual* (for
*specific*: "a punctual problem" → an isolated/one-off problem), *eventual*
(4.13), *sanitary* (for *health*: "sanitary crisis" → health crisis; "sanitary
authorities" → health authorities), *social name* (preferred name), *civil
state* (marital status), *fiscal* (tax), *judicial* overuse — skip.

## 5. Fixtures and false-positive guards

- One fixture file per style: `test/fixtures/br/<Style>.txt`, one wrong
  sentence per key, in key order so a failing line points at its key.
- `clean.txt` grows with every commit. For each anchored pattern add the
  nearest *correct* English sentence that must not fire. Starter list for the
  new styles:
  *I have a doubt about the contract's validity.* *Give me a break.* *She gave
  a speech.* *He gave a ride to his neighbour.* *Take out the trash.* *They
  took out a loan.* *Stay calm and stay put.* *Stay with me.* *I went there
  for work.* *We had a family reunion.* *The public consultation ends Friday.*
  *He is an advocate for animal rights.* *Please assume the responsibility.*
  *I suggest that you leave.* *She stopped to smoke.* *The police are here.*
  *It's a two-year-old car.* *He is a fastidious editor.* *We anticipate
  strong demand.* *The principal reason is cost.* (suggestion only — allowed
  to fire.) *Open port 8080.* *The truck driver stopped.* *My turn.* *A unique
  opportunity.* *Note to self.* *The judge sentenced him.* *Passed the exam.*
  *The show was great.* *Chapter 3 of the book.* *Outdoor activities.*
  *Home office deduction.* *In the end, it worked.* *At night we sleep.*
- `br.test` semantics stay: every non-empty fixture line must fire its rule;
  `clean.txt` must fire nothing except `BR.FalseFriendsWords` (which is
  suggestion-level by design). If a new suggestion-level style needs the same
  exemption (e.g. `Brazilianisms` bare words), add it to the exemption list
  in the spec **in the same commit** and say why in the message.

## 6. Commit order and sizing

| # | Commit | Style | ~Keys |
|---|---|---|---|
| 1 | `styles: drop no-op spelling entries` | Spelling | −1 |
| 2 | `styles: add States (ter/estar com calques)` | States | 45 |
| 2b | `styles: extend States with article/noun-phrase and singles` | States, StatesPhrases | 33 |
| 3 | `styles: add Give (dar calques)` | Give | 25 |
| 4 | `styles: extend Collocations with make/win/lose/pass` | Collocations | 35 |
| 5 | `styles: add TakeOut (tirar calques)` | TakeOut | 15 |
| 6 | `styles: add Stay (ficar calques)` | Stay | 12 |
| 7 | `styles: extend Prepositions — place and time` | Prepositions | 35 |
| 8 | `styles: extend Prepositions — verb and adjective complements` | Prepositions | 30 |
| 9 | `styles: add Complements (verb complementation)` | Complements | 20 |
| 10 | `styles: add Articles` | Articles | 20 |
| 11 | `styles: add Agreement` | Agreement | 12 |
| 12 | `styles: add Questions and extend Syntax with negation` | Questions, Syntax | 10 |
| 13 | `styles: add Degree` | Degree | 20 |
| 14 | `styles: add Relatives` | Relatives | 8 |
| 15 | `styles: extend FalseFriends (anchored) — part 1` | FalseFriends | 25 |
| 16 | `styles: extend FalseFriends (anchored) — part 2` | FalseFriends | 25 |
| 17 | `styles: extend FalseFriendsWords` | FalseFriendsWords | 40 |
| 18 | `styles: add Brazilianisms — part 1` | Brazilianisms | 25 |
| 19 | `styles: add Brazilianisms — part 2` | Brazilianisms | 25 |
| 20 | `styles: extend Spelling — Harper-silent real words and ph/th/es-` | Spelling | ~80 |
| 21 | `styles: extend Spelling — doubled consonants and endings` | Spelling | ~120 |
| 22 | `styles: extend Uncountable and Register` | both | 25 |
| 23 | `docs: update catalogue and README for the expanded ruleset` | docs | — |

Total new keys ≈ 700 → ~1,250 overall. Each commit: `npm run check` green,
`bin/check-styles.mjs` OK, `vale warm p50` from `npm run bench` in the
message, `docs/03` rows added.

## 7. What is deliberately not in this plan

- Pronunciation-driven errors (*fink* for *think*, *-ed* as a syllable):
  invisible in text.
- Gendered pronouns for objects (*the car, he is red*): no reliable textual
  anchor.
- Harper-covered grammar (double comparatives, *arrive to*, *discuss about*,
  since+duration, article *an/a*, common typos): recorded as `H`, not
  duplicated.
- Vale `sequence` rules and Harper Weir packs: parked in `docs/06-roadmap.md`.
- PT-PT (European Portuguese) specifics (*constipado* = cold, *rapariga*,
  *telemóvel*): out of scope; this is a Brazilian ruleset.

## 8. Success criteria

- `bin/pasqualina.mjs` on the Phase 0 `sample.txt` reports the same issues
  (no regression), and on a new `test/fixtures/br/essay.txt` — a realistic
  300-word Brazilian-English essay written for this purpose — reports ≥ 25
  distinct BR rules with zero false positives on its corrected twin
  `essay-clean.txt`. That pair is commit 23's deliverable and becomes the
  integration spec for the whole style set.
- `vale warm p50` ≤ 1.5 × today's baseline after all commits.
- Every style has a fixture; `clean.txt` ≥ 150 lines.

## 9. Sources

- Swan, M. & Smith, B. (2001). *Learner English: A Teacher's Guide to
  Interference and Other Problems*, 2nd ed., Cambridge — chapter
  "Portuguese speakers".
- Tagnin, S. E. O. "A multilingual learner corpus in Brazil" (USP) —
  <https://ucrel.lancs.ac.uk/cl2003/tagnin.pdf>; Br-ICLE (ICLE v3,
  UCLouvain) — <https://corpora.uclouvain.be/cecl/icle/home>.
- "175+ Falsos Cognatos em Inglês" — <https://aprendafalaringles.com.br/falsos-cognatos/>
  (177-entry catalogue used for 4.13–4.14).
- Tecla SAP (Ulisses Wehby de Carvalho), *Guia Tecla SAP: Falsos Cognatos*
  (303 entries) — <https://www.teclasap.com.br/>.
- Hughes, H. "Top 10 mistakes that Portuguese speakers make in advanced
  English" — <https://heatherhughes.co.uk/top-10-mistakes-that-portuguese-speakers-make-in-advanced-english/>.
- London School of English, "From Brazilian to English, or how not to speak
  Brazinglish" — <https://www.londonschool.com/blog/from-brazilian-to-english-or-how-not-to-speak-brazinglish/>.
- italki, "7 Common Mistakes That Brazilians Make In English" —
  <https://www.italki.com/en/article/1073/7-common-mistakes-that-brazilians-make-in-english>.
- Fisk, Gazeta do Povo, LF Idiomas, Firetongues, Inglês 200h — Portuguese-
  language "erros comuns de brasileiros em inglês" lists (I have 30 years, I
  have a doubt, lost the bus, subject drop, make/do).
- Existing catalogue: `docs/03-brazilian-english-mistakes.md` and its source
  list.
