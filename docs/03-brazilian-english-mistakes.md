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

| Wrong → right | Trigger | Rule |
|---|---|---|
| I have 30 years → I am 30 (years old) | ter X anos | `BR.Age` |
| how many years do you have → how old are you | quantos anos você tem | Collocations |
| make a question → ask a question | fazer uma pergunta | Collocations |
| make homework → do homework | fazer o dever | Collocations |
| make exercises / make sport / practice sport → do exercise / play sports | fazer exercício, praticar esporte | Collocations |
| make a travel → take a trip | fazer uma viagem | Collocations |
| do a mistake → make a mistake | — | H (`DoMistake`) |
| lose time → waste time | perder tempo | Collocations |
| take a decision → make a decision | tomar uma decisão | Collocations |
| have sure → be sure | ter certeza | Collocations |
| have luck → be lucky | ter sorte | Collocations |
| I am with hunger / I have hunger → I am hungry | estar com fome | Collocations |
| put attention → pay attention | prestar atenção | Collocations |
| give a look → take a look | dar uma olhada | Collocations; H has `HaveTakeALook` for other forms |
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

Teaching lists: onlineteachersuk.com (51 false friends; 40 most common
mistakes), reallifeglobal.com (17 dangerous cognates), londonschool.com
("Brazinglish" parts 1–2), italki (7 common mistakes; 5 errors by
Portuguese speakers), heatherhughes.co.uk (advanced-level mistakes),
brazilusatranslations.com (802 verified false-friend pairs),
learn-portuguese.org, portuguesepedia.com, practiceportuguese.com,
blogs.transparent.com/portuguese, aje.com (editing tip on Portuguese
false cognates), speakingbrazilian.com, migaku.com, languagesnaps.com,
ai.glossika.com, internationalschooltutors.de (Portuguese speakers'
English), elon.io (false friends; capitalization), gymglish.com.

Academic: SciELO "top ten tips" for Brazilian authors writing in English
(https://www.scielo.br/j/clin/a/zcs47Q4bsW6yk7D86XQCVss/?lang=en); PMC
"concise writing for Portuguese speakers"
(https://pmc.ncbi.nlm.nih.gov/articles/PMC5175292/); Cambridge ELT
"Common English Errors – Portuguese" PDF
(https://www.cambridge.org/elt/blog/wp-content/uploads/2020/03/Portuguese.pdf);
Swan & Smith, *Learner English* (Portuguese chapter); Creelman, *The Top 85
Mistakes Brazilians Make in English*.

Machine-readable prior art: LanguageTool `false-friends.xml` (LGPL; 236
en→pt entries — consulted for coverage, not copied), vale-cli/Harper (a
Vale port of Harper's rules), Vale package library. No existing Vale style
for Portuguese-speaker errors was found.

Full URL list: see the research report summary in `06-roadmap.md`
("Research log").
