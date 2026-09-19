# Common English mistakes by Brazilian Portuguese speakers

*Compiled 2026-09-16 from the sources listed at the end. This catalogue
drives the `BR` Vale style in `styles/BR/`; the "Rule" column says which
file implements each item, or why it is left to Harper or skipped.*

How to read: **wrong → right** (Portuguese trigger). `H` = Harper 2.3.0
already flags it (verified by running `harper-cli`), so Vale stays quiet.
`—` = not implemented; reasons in the notes.

## 1. False friends (falsos cognatos)

Two Vale rules: `BR.FalseFriends` (pattern-anchored, warning, replacement
offered) and `BR.FalseFriendsWords` (bare word, suggestion, only for words
uncommon enough that a flag is cheap). Everyday English words such as
*data, record, support, office, turn, mark, policy, college, library,
parents, notice, large, expert, realize* are only flagged in a context
that pins the Portuguese meaning, never bare.

| Wrong → right | Trigger | Rule |
|---|---|---|
| pretend → intend, plan | pretender | FalseFriends (`pretend to <verb>`), Words |
| actually → currently | atualmente | FalseFriends (`actually I live…`) |
| actual → current | atual | FalseFriends (`the actual version`) |
| assist → watch, attend | assistir | FalseFriends (`assist a lecture`), Collocations (`assist to`), Words |
| attend → answer (phone), serve (customer) | atender | FalseFriends |
| parents → relatives | parentes | — (everyday word) |
| push → pull | puxar | — (no textual context) |
| library → bookstore | livraria | — (everyday word) |
| college → school | colégio | FalseFriends (`private college`, `college uniform`) |
| fabric → factory | fábrica | FalseFriends (`car fabric`, `fabric workers`), Words |
| exquisite → weird | esquisito | FalseFriends (`so exquisite`), Words |
| eventually → occasionally | eventualmente | Words |
| lunch → snack | lanche | — |
| novel → soap opera | novela | FalseFriends (`watch the novel`) |
| prejudice → loss, damage | prejuízo | FalseFriends (`financial prejudice`, `caused prejudice`), Words |
| sympathetic → nice | simpático | Words |
| compromise → appointment, commitment | compromisso | — |
| resume → summary | resumo | FalseFriends (`resume of the`, `make a resume`), Words |
| notice → news | notícia | FalseFriends (`good notices about`) |
| support → stand, tolerate | suportar | — |
| costume → habit, custom | costume | Words |
| expert → smart | esperto | — |
| large → wide | largo | — |
| tax → fee, rate | taxa | — |
| realize → carry out, hold | realizar | FalseFriends (`realize a meeting`) |
| sensible → sensitive | sensível | Words |
| exit → success | êxito | — |
| data → date | data | — |
| comprehensive → understanding | compreensivo | Words |
| injury → insult | injúria | Words |
| legend → subtitle, caption | legenda | FalseFriends (`with legends`), Words |
| office → trade, craft | ofício | — |
| pasta → folder | pasta | Words |
| record → remember | recordar | FalseFriends (`I don't record his name`) |
| lecture → reading | leitura | Words |
| mascara → mask | máscara | Words |
| policy → police | polícia | — |
| requirement → request, form | requerimento | — |
| stranger → foreigner, foreign | estrangeiro | FalseFriends (`stranger company`), Words |
| cigar → cigarette | cigarro | Words |
| collar → necklace | colar | Words |
| diversion → fun | diversão | Words |
| enroll → stall | enrolar | — |
| grip → flu | gripe | Words |
| ingenuity / ingenuous → naivety / naive | ingenuidade | Words |
| jar → pitcher | jarra | — |
| particular → private | particular | FalseFriends (`particular school`) |
| scholar → school (adj.) | escolar | FalseFriends (`scholar bus`), Words |
| physician → physicist | físico | FalseFriends (`famous physician`), Words |
| mayor → bigger | maior | Words |
| tenant → lieutenant | tenente | FalseFriends (`tenant colonel`), Words |
| argument → plot | argumento | — |
| intend → understand | entender | FalseFriends (`I don't intend what`) |
| balcony → counter | balcão | Words |
| cafeteria → coffee shop | cafeteria | Words |
| casualty → coincidence | casualidade | Words |
| convict → convinced | convicto | Words |
| deception → disappointment | decepção | Words |
| discussion → argument | discussão | — |
| educated → polite | educado | — |
| engross → thicken | engrossar | Words |
| genial → brilliant | genial | Words |
| graduation → degree | graduação | — |
| idiom → language | idioma | Words |
| journal → newspaper | jornal | Words |
| lace → bow, ribbon | laço | Words |
| luxury → lust | luxúria | Words |
| parcel → installment | parcela | Words |
| preservative → condom | preservativo | Words |
| procure → look for | procurar | Words |
| retire → withdraw | retirar | Words |
| sort → luck | sorte | FalseFriends (`good sort`, `have sort`) |
| silicon → silicone | silicone | FalseFriends (`silicon implants`), Words |
| spectacles → show | espetáculo | Words |
| terrific → terrible | terrível | Words |
| vicious → addicted | viciado | Words |
| ultimately → lately | ultimamente | Words |
| agenda → planner | agenda | — |
| anthem → antenna | antena | Words |
| apology → defence | apologia | Words |
| apparel → appliance | aparelho | Words |
| alumnus → student | aluno | Words |
| amass → crush | amassar | Words |
| constipated → having a cold | constipado | Words |
| conceit → concept | conceito | Words |
| beef → steak | bife | Words |
| brave → angry | bravo | Words |
| cargo → position, job | cargo | Words |
| chef / patron → boss | chefe / patrão | Words |
| disgrace → misfortune | desgraça | Words |
| dent → tooth | dente | Words |
| hospice → asylum | hospício | Words |
| recipient → container | recipiente | Words |
| refrigerant → soft drink | refrigerante | Words |
| coroner → colonel | coronel | Words |
| fiscal → inspector | fiscal | Words |
| hazard → bad luck | azar | Words |
| moisture → mixture | mistura | Words |
| propaganda → advertising | propaganda | FalseFriends (`a beer propaganda`, `make propaganda`), Words |
| excited → thrilled (excited sounds sexual to Brazilians; the reverse trap) | excitado | Words |
| notorious → well-known | notório | Words |
| motel → hotel (a "motel" is a love hotel in Brazil) | motel | Words |
| lose → miss (bus, class, deadline) | perder | FalseFriends (`lost the bus`) |
| win → earn (money) / gain (weight) | ganhar | FalseFriends |
| borrow → lend | emprestar | FalseFriends (`borrow me`) |
| make a course → take a course | fazer um curso | FalseFriends |
| make a party → throw a party | fazer uma festa | FalseFriends |
| know → meet / have been to | conhecer | — (needs semantics) |
| bring/take, remember/remind, say/tell, fun/funny, history/story, trip/travel, job/work, house/home | one Portuguese word for two | — (say/tell partly in Collocations) |

## 2. Grammar calques

*`BR.States` / `BR.StatesPhrases`: Harper was silent on all 46 State
candidates and all 18 extra/past-state candidates, tested 2026-09-18 with
harper.js 2.10.0.*

| Wrong → right | Trigger | Rule |
|---|---|---|
| I have 30 years → I am 30 (years old) | ter X anos | `BR.Age` |
| how many years do you have → how old are you | quantos anos você tem | Collocations |
| make a question → ask a question | fazer uma pergunta | Collocations |
| make a party → throw/have a party; make a surgery → have surgery; make an exam → take an exam; make a course → take a course; make research → do research; make a favor → do a favor; make the dishes → do the dishes; make a diet → go on a diet; make a walk → go for a walk; make a photo → take a photo; make a visit → pay a visit; make part of → be part of; make cold → it is cold; make a text → write a text | fazer festa/cirurgia/prova/curso/pesquisa/favor/louça/dieta/caminhada/foto/visita/parte/frio/texto | `BR.Collocations` |
| win money → earn; win weight → gain; win a gift → get; win time → save; win a baby → have a baby; win a living → make a living | ganhar dinheiro/peso/presente/tempo/neném/a vida | `BR.Collocations` |
| win experience → gain; win a discount → get | ganhar experiência/desconto | `BR.Collocations` |
| take out a photo → take a photo; take out clothes → take off; take out a passport → get; take out a grade → get; take out a copy → make; take out a conclusion → draw; take out a nap → take a nap; take out a vacation → take | tirar foto/roupa/passaporte/nota/cópia/conclusão/soneca/férias | `BR.TakeOut` |
| take out first place → come in first; take out the delay → catch up; take out time → set aside time; take out the table → clear; tirar sarro → make fun of; tirar de letra → handle easily | tirar primeiro lugar/atraso/tempo/mesa/sarro/de letra | `BR.TakeOutPhrases` (existence) |
| stay with the change → keep the change | ficar com | `BR.Stay` |
| stay knowing → find out; stay with a headache → get a headache; stay in doubt → be unsure; stay good on you → look good on you; stay of eye → keep an eye; stay at peace → rest assured; stays at 50 → it comes to; stay two days without → go without; stay without money → run out of | ficar sabendo/com/em dúvida/bem/de olho/em paz/em/sem | `BR.StayPhrases` (existence) |
| pass the weekend/time doing → spend; passed bad/well → felt sick/well; pass through difficulties → go through; pass at the market → stop by; pass cream → put on; pass a cloth → wipe/sweep | passar o tempo/fim de semana/mal/por/no mercado/creme/pano | `BR.Collocations` / `BR.CollocationsPhrases` (existence) |
| want that he goes → want him to go; how many years do you have → how old are you; make lack → be missed; make a question of → insist on; make N years that → it has been N years; make will → do what he wants; make an interview → do an interview; make a work for school → do an assignment; make company → keep company | quero que ele vá / quantos anos você tem / fazer falta / fazer questão / faz N anos / fazer a vontade / fazer uma entrevista / fazer um trabalho / fazer companhia | `BR.CollocationsPhrases` (existence; rephrase) |
| make homework → do homework | fazer o dever | Collocations |
| make exercises / make sport / practice sport → do exercise / play sports | fazer exercício, praticar esporte | Collocations |
| make a travel → take a trip | fazer uma viagem | Collocations |
| do a mistake → make a mistake | — | H (`DoMistake`) |
| lose time → waste time | perder tempo | Collocations |
| take a decision → make a decision | tomar uma decisão | Collocations |
| have sure → be sure | ter certeza | `BR.States` |
| have headache → have a headache | estar com dor de cabeça | `BR.States` |
| have fever → have a fever | estar com febre | `BR.States` |
| have flu → have the flu | estar com gripe | `BR.States` |
| have/be with pain → be in pain | estar com dor | `BR.States` |
| have reason → be right | ter razão | `BR.States` |
| have care → be careful | ter cuidado | `BR.States` |
| have laziness → be lazy | ter preguiça | `BR.States` |
| be agree → agree | estar de acordo | `BR.States` |
| be with N years → be N years old | estar com N anos | `BR.States` |
| any doubts? → any questions? | alguma dúvida? | `BR.States` |
| with certainty → definitely | com certeza | `BR.States` |
| there is no how → there is no way | não tem como | `BR.States` |
| have pity of → feel sorry for; have will to → feel like; have difficulty to; have facility; have necessity; have no conditions to; be with headache/fever/flu; don't have how to; take out/clear/ask doubts; have doubts; did N years | ter pena, ter vontade, ter dificuldade/facilidade/necessidade, ter condições, estar com X, não ter como, tirar dúvida, fazer N anos | `BR.StatesPhrases` (existence; rephrase) |
| have luck / be with luck → be lucky | ter sorte / estar com sorte | `BR.States` |
| have/be with hunger → be hungry | ter fome / estar com fome | `BR.States` |
| have/be with thirst → be thirsty | ter sede / estar com sede | `BR.States` |
| have/be with sleep → be sleepy | ter sono / estar com sono | `BR.States` |
| have/be with fear → be afraid | ter medo / estar com medo | `BR.States` |
| have/be with shame → be ashamed | ter vergonha / estar com vergonha | `BR.States` |
| have/be with hurry → be in a hurry | ter pressa / estar com pressa | `BR.States` |
| have/be with cold → be cold | ter frio / estar com frio | `BR.States` |
| have/be with heat → be hot | ter calor / estar com calor | `BR.States` |
| have/be with envy → be envious | ter inveja / estar com inveja | `BR.States` |
| have/be with jealousy → be jealous | ter ciúme / estar com ciúme | `BR.States` |
| have/be with anger → be angry | ter raiva / estar com raiva | `BR.States` |
| have/be with rage → be furious | ter raiva (intensa) | `BR.States` |
| have/be with nausea → be nauseous | ter náusea / estar com náusea | `BR.States` |
| have/be with dizziness → be dizzy | ter tontura / estar com tontura | `BR.States` |
| have/be with sleepiness → be sleepy | ter sonolência | `BR.States` |
| I had X → I was X; we/you/they had X → were X | ter/estar com (past) | `BR.States` |
| put attention → pay attention | prestar atenção | Collocations |
| give a look → take a look | dar uma olhada | `BR.Give`; H has `HaveTakeALook` for other forms |
| give an error → throw an error | dar erro | `BR.Give` |
| give a step → take a step | dar um passo | `BR.Give` |
| give a walk/jump/problems/wrong/time/way/bronca; give me fear; give-se bem; give the faces | dar uma volta/pulo/problema/errado/tempo/jeito/bronca/medo/se bem/as caras | `BR.GivePhrases` (existence; rephrase) |
| close/open the light, TV, computer → turn off/on | fechar/abrir | Collocations; H (`OpenTheLight`) did not fire on "close" in 2.3.0 |
| say me → tell me; tell to me → tell me | dizer para mim | Collocations |
| explain me → explain to me | explicar-me | Collocations |
| I want that you come → I want you to come | quero que você venha | Collocations |
| I think that yes/no → I think so / I don't think so | acho que sim | Collocations |
| I have a doubt → I have a question | ter uma dúvida | Collocations |
| I am agree → I agree | estou de acordo | H (`IAmAgreement`; note: did **not** fire on "I am agree with you" in 2.3.0 — see roadmap) |
| depend of → depend on | depender de | Prepositions |
| it's depend → it depends | — | Prepositions |
| married with → married to | casado com | Prepositions |
| discuss about → discuss | discutir sobre | H (`Discuss`) |
| enter in → enter | entrar em | Prepositions |
| answer to the question → answer the question | responder à pergunta | Prepositions (verb forms only; "the answer to the question" is correct) |
| arrive to → arrive at/in | chegar a | H (`ArriveTo`) |
| in the internet / in the TV → on the | na internet, na TV | Prepositions |
| in Monday → on Monday | na segunda | Prepositions |
| in the next week → next week | na próxima semana | Prepositions |
| in the night → at night; at the morning → in the morning; in Christmas → at Christmas; in the bus → on the bus; on the picture → in the picture; in the phone → on the phone; in home → at home; in the age of 20 → at the age of 20; during three days → for three days; by example → for example; by the other side → on the other hand; by this reason → for this reason; by the first time → for the first time; by the contrary → on the contrary; at the least → at least; of sudden → suddenly; count with → count on; have to see with → have to do with | em/na/por… (lugar e tempo) | Prepositions |
| the possibility to do → the possibility of doing (silent-e verbs fixed: of solving/making/writing, not 'solveing') | possibilidade de fazer | Prepositions |
| since 3 years → for 3 years | há 3 anos | H (`SinceDuration`) |
| think in you → think about you | pensar em | Prepositions |
| dream with → dream about | sonhar com | Prepositions |
| different of → different from | diferente de | Prepositions ("different than/to" are fine) |
| go to home → go home | ir para casa | Prepositions |
| in this moment → right now | neste momento | Prepositions |
| in the end of the day → at the end of the day | no final do dia | Prepositions |
| possibility to do → possibility of doing | possibilidade de fazer | Prepositions |
| good in math → good at math | bom em | H (`GoodAt`) |
| interested to → interested in | interessado em | — ("interested to know" is acceptable) |
| Is raining / Is important → It is… | Portuguese drops "it" | Syntax |
| Have many people / Exist many → There are | tem/existe | Syntax |
| the people is → people are | o povo é | Syntax |
| I born in → I was born in | nasci | Syntax |
| the life is beautiful → life is beautiful | a vida é | Syntax (article before abstract noun at sentence start) |
| the most of → most of | a maioria de | Syntax |
| more easy → easier; more better | mais fácil | H (`MoreAdjective`, `AdjectiveDoubleDegree`) |
| lowercase i → I | Portuguese "eu" | H (`CapitalizePersonalPronouns`) |
| informations, advices, furnitures, homeworks, equipments, feedbacks, softwares, knowledges, luggages, musics, breads, staffs, evidences, trainings → singular | countable in Portuguese | `BR.Uncountable` (H only says "spelling"/"split words") |
| an information / an advice → some / a piece of | — | Uncountable |
| the news are → the news is | — | Uncountable |
| persons → people | pessoas | Uncountable |
| double negatives, missing do-support, tag "isn't it?" for everything, must to, mind to help, looks as | various | — (Harper has some; not attempted) |

## 3. Spelling shaped by Portuguese

Mechanisms: Portuguese has no doubled consonants except *rr/ss* (adress,
comunication, recomend, oportunity, acomodation, profesional, necesary,
aparently, excelent, inteligent, milion, aproximately, diferent, comitment,
goverment*); *-ável → -able* (responsable), *-ência → -ence/-ance*
confusion (existance, independant); *ph/ch/th/y → f/c/t/i* (fisics,
quimistry, tecnology, arquitecture, caracter, cronic, psicology); direct
cognate spelling (exemple, exercice, apartament, litterature, adquire,
sinal, avaliation for evaluation, profissional); no native *w* (riting,
wensday). All in `BR.Spelling` (suggestion level, so Harper's SpellCheck
keeps the primary say; Vale adds the direct fix and the reason).

## 4. Numbers, dates, capitalization, honorifics

| Item | Rule |
|---|---|
| decimal comma `3,5` → `3.5`; thousands point `1.500.000` → `1,500,000`; `12/03/2026` ambiguous → name the month; `R$ 50` | `BR.Numbers` (suggestion) |
| lowercase days, months, languages, nationalities, religions, Brazil/Portugal | `BR.Capitalization` (warning; case-sensitive tokens) |
| Sr./Sra./Srta./Dra. → Mr./Mrs./Ms./Dr.; Dear Sirs → Dear Sir or Madam; Prezados, Atenciosamente, Att., Abraços, Obrigado left in English text; kkkk / rs → haha | `BR.Titles` |

## 5. Register

Portuguese formal writing is elaborate; English prefers plain verbs.
`BR.Register` (suggestion): utilize → use, necessitate → need, diverse
(diversos) → several, "it is important to highlight that" → note that,
"with the objective of" → to, "in order to" → to, "the majority of" →
most, "make an analysis" → analyze, "give information" → inform, "in a
first moment" → at first, "in this sense", "in the sequence", "I come to
inform", "in attention to", "through of", "by means of", "in relation to".

## 6. Word order

`BR.WordOrder` (suggestion): "Always I wake up" → I always wake up; "I
like very much this" → I like this very much; "a person very intelligent"
→ a very intelligent person; "the car red" → the red car; "more two days"
→ two more days.

## What is deliberately not covered

- Words whose misuse needs meaning, not surface form: *know/meet*,
  *bring/take*, *remember/remind*, *much/many*, *few/little*, *he/she*
  slips, comma before "that", passive overuse.
- Anything Harper 2.3.0 already reports (see `H` above). If Harper is
  upgraded, re-run `test/fixtures/calques` style checks (the sentences in
  `docs/01-harper.md`) and delete Vale rules that became redundant.
- `Vale.Spelling` is off; Harper spell-checks.

## Sources

### ESL teaching lists

- [Online Teachers UK — 51 English–Portuguese false friends](https://onlineteachersuk.com/false-friends-english-portuguese/)
- [Online Teachers UK — 40 most common mistakes Portuguese speakers make](https://onlineteachersuk.com/40-most-common-mistakes-english-portuguese/)
- [RealLife English — the 17 most dangerous Brazilian false-cognate errors](https://reallifeglobal.com/the-17-most-dangerous-brazilian-false-cognate-errors-in-english/)
- [London School — "Brazinglish", part 1](https://www.londonschool.com/blog/from-brazilian-to-english-or-how-not-to-speak-brazinglish/)
- [London School — "Brazinglish", part 2](https://www.londonschool.com/blog/from-brazinglish-to-english-part-2/)
- [italki — 7 common mistakes Brazilians make in English](https://www.italki.com/en/article/1073/7-common-mistakes-that-brazilians-make-in-english)
- [italki — 5 common English errors made by Portuguese speakers](https://www.italki.com/en/article/1228/5-common-english-errors-made-by-portuguese-speakers)
- [Heather Hughes — top 10 mistakes Portuguese speakers make in advanced English](https://heatherhughes.co.uk/top-10-mistakes-that-portuguese-speakers-make-in-advanced-english/)
- [Brazil USA Translations — 802 verified Portuguese–English false-friend pairs](https://brazilusatranslations.com/tools/portuguese-english-false-friends/)
- [Learn Portuguese — false friends Portuguese/English](https://learn-portuguese.org/false-friends-portuguese-english)
- [Portuguesepedia — English–Portuguese false friends](https://portuguesepedia.com/english-portuguese-false-friends/)
- [Practice Portuguese — false cognates](https://www.practiceportuguese.com/learning-notes/false-cognates/)
- [Transparent Language — false friends in Portuguese and English](https://blogs.transparent.com/portuguese/false-friends-in-portuguese-and-english/)
- [AJE — editing tip: Portuguese–English false cognates](https://www.aje.com/arc/editing-tip-portuguese-english-false-cognates)
- [Speaking Brazilian — false friends Portuguese/English](https://www.speakingbrazilian.com/false-friends-portuguese-english/)
- [Migaku — Portuguese false friends](https://migaku.com/blog/language-fun/portuguese-false-friends)
- [Language Snaps — false friends for Brazilian Portuguese speakers](https://languagesnaps.com/english/learning-tips-esl/false-friends-brazilian-portuguese/)
- [Glossika — false friends between Portuguese and English](https://ai.glossika.com/blog/false-friends-between-portuguese-and-english)
- [International School Tutors — English for Portuguese speakers](https://www.internationalschooltutors.de/English/advice/language/differences/portuguese.html)
- [elon.io — false friends with English](https://elon.io/grammar/portuguese-brazil/errors/false-friends-english)
- [elon.io — capitalization rules](https://elon.io/grammar/portuguese-brazil/spelling/capitalization-rules)
- [Gymglish — 10 grammar mistakes Portuguese speakers make in English](https://blog.gymglish.com/2021/06/29/10-grammar-mistakes-english-portuguese-make)

### Academic and reference

- [SciELO — top ten tips for Brazilian authors writing in English](https://www.scielo.br/j/clin/a/zcs47Q4bsW6yk7D86XQCVss/?lang=en)
- [PMC — concise writing in English for Portuguese speakers](https://pmc.ncbi.nlm.nih.gov/articles/PMC5175292/)
- [Cambridge ELT — "Common English Errors: Portuguese" (PDF)](https://www.cambridge.org/elt/blog/wp-content/uploads/2020/03/Portuguese.pdf)
- Swan & Smith, *Learner English* (Portuguese chapter). Cambridge University Press.
- Creelman, *The Top 85 Mistakes Brazilians Make in English*.

### Machine-readable prior art

- [LanguageTool `false-friends.xml`](https://github.com/languagetool-org/languagetool/blob/master/languagetool-core/src/main/resources/org/languagetool/rules/false-friends.xml) — LGPL; 236 en→pt entries. Consulted for coverage, not copied.
- [vale-cli/Harper](https://github.com/vale-cli/Harper) — a Vale port of Harper's rules.
- [Vale package library](https://github.com/vale-cli/packages) — no existing style for Portuguese-speaker errors was found.

The same URLs, plus the Harper and Vale documentation pages, are listed in
the research log of `06-roadmap.md`.
