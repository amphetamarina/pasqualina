# Harper rules (harper.js 2.10.0, `getLintDescriptions()`)

Generated from harper.js; regenerate with `bin/harper-rules.mjs`. Rules with default `false` are opt-in.

| Rule | Default | Description |
|---|---|---|
| `ACoupleMore` | true | Corrects `a couple of more` to `a couple more`. |
| `ALittleOfPractice` | true | Corrects `a little of practice` to `a little practice` or `a bit of practice`. |
| `ALongTime` | true | Corrects `along time` to `a long time`. |
| `AMeansToAnEnd` | true | Corrects `a mean to an end` to `a means to an end` |
| `AOkHyphen` | true | Replaces the loose article-plus-abbreviation pairing with the standard hyphenated form whenever a linking verb describes readiness or approval. |
| `APart` | true | Finds and corrects common mistakes between 'a part' and 'apart' |
| `ASomeTime` | true | Removes the redundant/conflicting indefinite article `a` before `some` when followed by time expressions. |
| `AWaysToGo` | true | Corrects the idiom `a ways to go` when the indefinite article is missing. |
| `AWhile` | true | Enforces `awhile` after verbs and `a while` everywhere else. |
| `AWholeOther` | true | Corrects `a whole another`/`a whole 'nother` to `a whole other`. |
| `AccuseOf` | true | Corrects `accuse for` to `accuse of`. |
| `AdNauseam` | true | Corrects `as nauseam` to `ad nauseam`. |
| `Addicting` | true | Replaces `addicting` with `addictive` when used as an adjective. |
| `AdjectiveDoubleDegree` | true | Finds adjectives that are used as double degrees (e.g. `more prettier`). |
| `AdjectiveOfA` | true | This rule looks for sequences of words of the form `adjective of a`. |
| `Ado` | true | Corrects `adieu` to `ado`. |
| `AdvantageOf` | true | Corrects the missing preposition in the idiom `take advantage of` when `of` is dropped. |
| `AfterAWhile` | true | Corrects the missing article in `after while`, forming `after a while`. |
| `AfterAll` | true | Corrects `afterall` to `after all`. |
| `AfterLater` | true | Checks for the word `later` following `after [a period of time]`. |
| `AheadAnd` | true | Corrects `an` to `and` after `ahead`. |
| `Ajar` | true | Corrects `a jar` to `ajar`. |
| `Akimbo` | true | Corrects `a kimbo` to `akimbo`. |
| `Albeit` | true | Corrects this expression to the standard `albeit`. |
| `AllHellBreakLoose` | true | Corrects forms of `all hell breaks out` to `all hell breaks loose`. |
| `AllIntentsAndPurposes` | true | Finds and corrects common wrong forms of the phrase 'for all intents and purposes' / 'to all intents and purposes'. |
| `AllOfASudden` | true | Guides this expression toward the standard `all of a sudden`. |
| `AllReady` | true | Flags `all ready` when it precedes an adjective so the adverb `already` can take its place. |
| `AllThough` | true | Nobody means to write the two-word phrase `all though` when the single word `although` is intended. |
| `AllWellAndGood` | true | Corrects `all well in good` to `all well and good`. |
| `AllowTo` | true | Flags erroneous usage of `allow to` without a subject. |
| `Alongside` | true | Replaces the spaced form `along side` with `alongside`. |
| `AlzheimersDisease` | true | Fixes the common misnomer `old-timers' disease`, ensuring the correct medical term `Alzheimer’s disease` is used. |
| `AmInTheMorning` | true | Finds redundant am/pm indicators used together with time periods such as 'in the morning' or 'at night'. |
| `AmazonNames` | true | When referring to the various products of Amazon.com, make sure to treat them as a proper noun. |
| `Americas` | true | When referring to North, Central, and South America, make sure to treat them as a proper noun. |
| `AmountsFor` | true | Corrects `amounts for` to either `amounts to` or `accounts for` |
| `AnA` | true | A rule that looks for incorrect indefinite articles. For example, `this is an mule` would be flagged as incorrect. |
| `AnAnother` | true | Corrects `an another` and `a another`. |
| `AnalogAcousticBike` | false | Suggests more standard terms for `analog/analogue bike` and `acoustic bike`. |
| `AndIn` | true | Fixes the typo `an in` when it stands in for the conjunction `and in`, while avoiding common `in-...` noun phrases and a few attested exceptions. |
| `AndSuch` | true | Corrects `and the such` to `and such`. |
| `AndTheLike` | true | Corrects mistakes in `and the like` and `or the like`. |
| `AnotherAn` | true | Corrects `another an` to `another`. |
| `AnotherOnes` | true | Corrects `another ones`. |
| `AnotherThingComing` | true | Though `another think coming` is the original phrase, `another thing coming` is now more common. |
| `AnotherThings` | true | Corrects `another things`. |
| `AnotherThinkComing` | false | Though `another thing coming` is now more common, `another think coming` is the original phrase. |
| `Anybody` | true | Looks for incorrect spacing inside the closed compound `anybody`. |
| `Anyhow` | true | Looks for incorrect spacing inside the closed compound `anyhow`. |
| `Anywhere` | true | Looks for incorrect spacing inside the closed compound `anywhere`. |
| `ApartFrom` | true | Flags the misspelling `apart form` and suggests `apart from`. |
| `AppleNames` | true | When referring to Apple products and services, make sure to treat them as proper nouns. |
| `ArgumentToBeMade` | true | Corrects `argument to be said` to `argument to be made`. |
| `ArriveOnWeekday` | true | Keeps schedules explicit by preferring the familiar `arrive on Friday` pattern instead of a bare weekday. |
| `ArriveTo` | true | A linter skeleton for contributors to copy into `harper_core/src/linting/` and rename. |
| `AsComparedTo` | true | Corrects `as compare to` to `as compared to`. |
| `AsEvidentBy` | true | Corrects `evident by` to `evidenced by` in passive constructions where `evidence` is used as a verb. |
| `AsFarAsICanTell` | true | Expands an initialism. |
| `AsFarAsIKnow` | true | Expands an initialism. |
| `AsFarBackAs` | true | Corrects nonstandard `as early back as` to `as far back as`. |
| `AsFollows` | true | Corrects the phrase `as follow`, which is sometimes produced by overcorrection. While it appeared briefly in 19th-century English, it is now considered archaic; modern standard usage requires `as follows` regardless of number. |
| `AsHow` | true | Corrects `as how` to `as to how`. |
| `AsIfThough` | true | Corrects redundant `as if though`. |
| `AsIsWithAnything` | true | Flags the incorrect idiom blend `as is with anything` and suggests standard alternatives like `as with anything` or `as is the case with anything`. |
| `AsItHappens` | true | Corrects `as it so happens` to `as it happens`. |
| `AsLongAs` | true | Corrects `aslong as` and `as long that` to `as long as`. |
| `AsMuchAs` | true | Corrects `as much than` to `as much as`. |
| `AsOfCurrently` | true | Corrects `as of currently` to `currently` or `as of now`. |
| `AsOfLately` | true | Corrects `as of lately` to `lately` or `as of late`. |
| `AsOpposedTo` | true | Corrects `as oppose to` to `as opposed to`. |
| `AsSoonAsPossible` | true | Expands an initialism. |
| `AsToInterrogative` | true | Corrects `to` to `as to` between certain adjectives and `wh-words`. |
| `AskNoPreposition` | true | Identifies sequences like `ask to us` or `tell to him` and recommends removing the superfluous “to”. |
| `AspireTo` | true | Corrects `aspire for` to `aspire to`. |
| `AtAllCosts` | true | Corrects `at all cost` to `at all costs`. |
| `AtFaceValue` | true | Corrects nonstandard variants of `at face value`. |
| `AtLeasToLeast` | true | Fixes the frequent typo `at leas` when the intended expression is `at least`. |
| `AtLestToLeast` | true | Fixes the mistake `at lest` when the intended expression is `at least`. |
| `AtTheBestOfTimes` | true | Corrects `in the best of times` to `at the best of times`. |
| `AtTheEndOfTheDay` | true | Corrects `in the end of the day` to `at the end of the day`. |
| `AtTheExpenseOf` | true | The correct idiom is `at the expense of`, with singular `expense`. But retain `expanse` if this phrase refers to a wide area. |
| `AtTheVeryLeast` | true | Corrects `in the very least` to `at the very least`. |
| `Audible` | true | Corrects `hearable` to `audible`. |
| `Australia` | true | When referring to states, territories, and cities in Australia, make sure to treat them as a proper noun. |
| `AvoidAndAlso` | true | Reduces redundancy by replacing `and also` with `and`. |
| `AvoidContractions` | false | Suggests expanded forms for common contractions, such as `isn't` → `is not` and `we're` → `we are`. |
| `AvoidCurses` | true | Flags offensive language and offers various ways to censor or replace with euphemisms. |
| `AwaitFor` | true | Suggests using either `await` or `wait for` but not both, as they express the same meaning. |
| `AwareOf` | true | Corrects `aware about` to the standard `aware of`. |
| `AzureNames` | true | When referring to Azure cloud services, make sure to treat them as proper nouns. |
| `BackInTheDay` | true | This linter flags instances of the nonstandard phrase `back in the days`. The correct, more accepted form is `back in the day` |
| `BackhandedCompliment` | true | Corrects `backhand compliment` to `backhanded compliment`. |
| `Backplane` | true | Looks for incorrect spacing inside the closed compound `backplane`. |
| `BadRap` | true | Changes `bed rap` to the proper idiom `bad rap`. |
| `BanTogether` | true | Detects and corrects the common error of using `ban together` instead of the idiom `band together`, which means to unite or join forces. |
| `BareInMind` | true | Ensures the phrase `bear in mind` is used correctly instead of `bare in mind`. |
| `BarelyUn` | true | Flags using `barely` with a negative adjective starting with `un-` (`barely unusable`, etc.), which is a kind of double negative. |
| `BatedBreath` | true | Changes `baited breath` to the correct `bated breath`. |
| `BeAllowed` | true | Ensures the passive form uses `be allowed` after future negatives. |
| `BeBiased` | true | Detects incorrect use of 'be + verb' instead of `be + adjective`. |
| `BeConcerned` | true | Detects incorrect use of 'be + verb' instead of `be + adjective`. |
| `BePrejudiced` | true | Detects incorrect use of 'be + verb' instead of `be + adjective`. |
| `BeRightBack` | true | Expands an initialism. |
| `BeShocked` | true | Detects incorrect use of 'be + verb' instead of `be + adjective`. |
| `BeWorried` | true | Detects incorrect use of 'be + verb' instead of `be + adjective`. |
| `BeckAndCall` | true | Fixes `back and call` to `beck and call`. |
| `BeenThere` | true | Corrects the misspelling `bee there` to the proper phrase `been there`. |
| `Beforehand` | true | `Beforehand` functions as a fixed adverb meaning ‘in advance’; writing it as two words or with a hyphen is nonstandard and can jar readers. |
| `BehindTheScenes` | true | Corrects `behind the scene` to `behind the scenes`. |
| `BesideThePoint` | true | Corrects `besides the point` to `beside the point`. |
| `BestOfAllTime` | true | Checks for nonstandard `of all times` in superlatives instead of singular `time` |
| `BestRegards` | true | In valedictions, `best` expresses your highest regard—avoid the typo `beat regards`. |
| `BetterOffPhrase` | true | Rewrites `better of` to `better off` in common comparative phrasing. |
| `BetterOffServed` | true | Corrects `better off served` to `better off` or `better served`. |
| `BetterOffWith` | true | Corrects `better of with` to `better off with`. |
| `BewareOf` | true | The verb `beware` naturally pairs with `of` before the noun being warned about, so swap other prepositions for clarity. |
| `BlacklistWhitelist` | true | Normalize the two-word sequence `black list`/`white list` so it matches the established compound noun or verb. |
| `BlanketStatement` | true | Corrects common errors in the phrase `blanket statement`. |
| `BluRayHyphen` | true | Joins the two-word spelling of the optical disc format into the standard compound form. |
| `BoarderBorder` | true | Flags the eggcorn `boarder` (a lodger) where `border` (an edge/boundary) is intended. |
| `Bollocks` | true | Corrects `bullocks` to `bollocks` when the meaning is `nonsense`. |
| `BoringWords` | false | This rule looks for particularly boring or overused words. Using varied language is an easy way to keep a reader's attention. |
| `Bought` | true | Replaces the incorrect past-tense spelling `bough` with `bought` after subject pronouns. |
| `BrandBrandish` | true | Looks for `brandish` wrongly used when `brand` is intended. |
| `Brutality` | true | Suggests the more standard and common synonym `brutality`. |
| `BuiltIn` | true | English convention treats `built-in` as a single, attributive adjective—meaning something integrated from the outset—whereas other forms like `in built` are nonstandard and can feel awkward to readers. |
| `ByAccident` | true | Incorrect preposition: `by accident` is the idiomatic expression. |
| `ByOnesOwn` | true | Fixes incorrect phrases like `by my own` by suggesting `on my own` or `by myself`. |
| `ByTheBook` | true | Corrects `by the books` to `by the book`. |
| `ByTheWay` | true | Expands an initialism. |
| `Bypass` | true | Looks for incorrect spacing inside the closed compound `bypass`. |
| `CallItQuits` | true | Corrects wrong variants of the idiom 'call it quits'. |
| `CallThem` | true | Addresses the non-idiomatic phrases `call them as`. |
| `CanBeSeen` | true | Corrects `can be seem` to the proper phrase `can be seen`. |
| `Canada` | true | When referring to provinces, territories, and cities in Canada, make sure to treat them as a proper noun. |
| `Cant` | true | Suggests correcting `cant` to `can't`. |
| `CantWay` | true | Corrects `way` to `wait` in high-confidence contexts such as `can't way to` and `doesn't way for`. |
| `CapitalizeOn` | true | A collection of linters that can be run as one. |
| `CapitalizePersonalPronouns` | true | Forgetting to capitalize personal pronouns, like "I" or "I'm" is one of the most common errors. This rule helps with that. |
| `CaseInPoint` | true | Corrects `case and point` to `case in point`. |
| `CaseSensitive` | true | Ensures `case-sensitive` is correctly hyphenated. |
| `Catch22` | true | Corrects mistakenly using similar-sounding words in the idiom `catch 22`. |
| `CauseItIsBecause` | true | Normalizes informal `cause it is` to the standard subordinating form in explanatory clauses. |
| `CautionaryTale` | true | Corrects confusion between `tale` (story) and `tail` (appendage) in common phrases. |
| `CeaseTo` | true | Detects when `seize to` is likely a typo for `cease to`. |
| `Chalkboard` | true | Looks for incorrect spacing inside the closed compound `chalkboard`. |
| `ChampAtTheBit` | true | Corrects `chomp at the bit` to the idiom `champ at the bit`, which has an equestrian origin referring to the way an anxious horse grinds its teeth against the metal part of the bridle. |
| `ChangeTack` | true | Locates errors in the idioms `to change tack` and `change of tack` to convey the correct meaning of altering one's course or strategy. |
| `ChickenAndEgg` | true | Corrects wrong variants of the `chicken-and-egg` idiom. |
| `ChineseCommunistParty` | true | When referring to the political party, make sure to treat them as a proper noun. |
| `ChockFull` | true | Flags common soundalikes of "chock-full" and makes sure they're hyphenated. |
| `ClaimToFame` | true | Corrects `claim for fame` to the idiom `claim to fame`. |
| `ClicheAccent` | true | A collection of linters that can be run as one. |
| `ClickThroughRate` | true | Hyphenates the verb+preposition pair when it directly precedes rate-style nouns, mirroring how these terms are commonly styled in analytics writing. |
| `ClientOrServerSide` | true | Corrects extraneous apostrophe in `client's side` and `server's side`. |
| `CloseTightKnit` | true | Corrects `close-nit` and `tight-nit` to `close-knit` and `tight-knit`. |
| `CodeInWriteIn` | true | Corrects the wrong preposition `on` to `in` when referring to writing code. |
| `Codebase` | true | Looks for incorrect spacing inside the closed compound `codebase`. |
| `Codebases` | true | Looks for incorrect spacing inside the closed compound `codebases`. |
| `ColdModalTypo` | true | Rewrites `cold` to `could` when it appears in common subject-plus-verb modal contexts. |
| `Combinate` | true | Suggests replacing the nonstandard verb `combinate` with the standard `combine`. |
| `CommaFixes` | true | Fix common comma errors such as no space after, erroneous space before, etc., Asian commas instead of English commas, etc. |
| `CommitmentTo` | true | Corrects `commitment toward/towards` to `commitment to`. |
| `CompaniesProductsAndTrademarks` | true | Ensure proper capitalization of companies, products, and trademarks. |
| `ComplainAsNoun` | true | Corrects the use of `complain` as a noun. |
| `CompoundNouns` | true | Detects compound nouns split by a space and suggests merging them when both parts form a valid noun. |
| `CompoundSubjectI` | true | Promotes `I` in compound subjects headed by a possessive determiner. |
| `ComprisesOf` | true | `Comprises` already contains the notion of `of`, so following it with another `of` is redundant. |
| `CompulseToCompel` | true | Suggests replacing the obsolete or archaic verb `compulse` with the standard `compel`. |
| `CondenseAllThe` | true | Suggests removing `of` in `all of the` for a more concise phrase. |
| `Confident` | true | This linter detects instances where the noun `confidant` is incorrectly used in place of the adjective `confident`. `Confidant` refers to a trusted person, whereas `confident` describes certainty or self-assurance. The rule suggests replacing `confidant` with `confident` when used in an adjectival context. |
| `ConfirmThat` | true | Corrects `conform` typos to `confirm`. |
| `ConstituteAs` | true | Removes extraneous `as` after the verb `constitute`. |
| `ConvenientStore` | true | Attempts to detect when `convenient store` is mistake for `convenience store`. |
| `Copyright` | true | Corrects `copywrite` to `copyright`. `Copywrite` refers to writing copy, while `copyright` is the legal right to creative works. |
| `CorrectNumberSuffix` | true | When making quick edits, it is common for authors to change the value of a number without changing its suffix. This rule looks for these cases, for example: `2st`. |
| `Countries` | true | When referring to Countries, make sure to treat it as a proper noun. |
| `CoursingThroughVeins` | true | In English idioms, `to course` means to flow rapidly—so avoid the eggcorn `cursing through veins.` |
| `CraveFor` | true | There should be no `for` after the verb `crave`. |
| `CriteriaPhenomena` | true | The words “criteria” and “phenomena” are the plurals of “criterion” and “phenomenon”, respectively. They are often incorrectly used with the wrong number. |
| `CrossPlatform` | true | Unlike some compound modifiers, `cross-platform` should always be hyphenated. |
| `CureFor` | true | Flags `cure against` and prefers the standard `cure for` pairing. |
| `CuriousAbout` | true | Corrects `curious of` and `curious on` to `curious about`. |
| `CurrencyPlacement` | true | The location of currency symbols varies by country. The rule looks for and corrects improper positioning. |
| `CuttingAgeEggcorn` | true | Corrects the eggcorn `cutting age` or `cutting-age` to `cutting-edge` or `cutting edge`. |
| `Cybersec` | true | Expands the informal abbreviation `cybersec` to `cybersecurity`. |
| `Damages` | true | Checks for plural `damages` not in the context of a court case. |
| `DampSquib` | true | Corrects the eggcorn `damp squid` to `damp squib`, ensuring the intended meaning of a failed or underwhelming outcome. |
| `Dashes` | true | Writers often type `--` or `---` expecting their editor to convert them into proper dashes. Replace these sequences with the correct characters: use an en dash (–) for ranges or connections and an em dash (—) for a break in thought. |
| `DateBackFrom` | true | Corrects the blend of `date from` and `date back to` into the nonstandard `date back from`. |
| `DayAndAge` | true | Fixes wrong variants of the idiom `in this day and age`. |
| `DayOneNames` | true | Ensure proper capitalization of Day One and Day One Premium as brand names. |
| `Deadlift` | true | Looks for incorrect spacing inside the closed compound `deadlift`. |
| `DefiniteArticle` | true | The name of the word `the` is `definite article`. |
| `DegreesKelvin` | true | Corrects use of `degrees kelvin` to `kelvins`. |
| `DegreesKelvinSymbol` | true | Corrects use of `°K` to `K`. |
| `DenyOffer` | true | Corrects `deny` when used with `offer` to `decline` or `reject`. |
| `Desktop` | true | Looks for incorrect spacing inside the closed compound `desktop`. |
| `DespiteItIs` | true | Corrects `despite` being used with the wrong form of `is`. |
| `DespiteOf` | true | Corrects the misuse of `despite of` and suggests the proper alternatives `despite` or `in spite of`. |
| `Devops` | true | Looks for incorrect spacing inside the closed compound `devops`. |
| `DidPast` | true | Corrects past forms of verbs to their base form, when used together with "did". |
| `Didnt` | true | Corrects `dint` to `didn't` after subject pronouns. |
| `DigUnderTheHood` | true | Detects the mixed metaphor of `digging under the hood/bonnet`. |
| `DigestiveTract` | true | Corrects `digestive track` to `digestive tract`. |
| `DiscourseMarkers` | true | Flags sentences that begin with a discourse marker but omit the required following comma. |
| `Discuss` | true | Removes unnecessary `about` after `discuss`. |
| `DisjointPrefixes` | true | Looks for words with their prefixes written with a space or hyphen between instead of joined. |
| `DissembleDisassemble` | true | Tries to detect `dissemble` used instead of `disassemble` by mistake. |
| `DoIAdjective` | true | Swaps the helping verb `do` for `am` in `Do I <adjective>` questions so they use the correct linking verb. |
| `DoMistake` | true | Corrects `do a mistake` to `make a mistake`. |
| `DoNotWant` | true | In English, negation still requires the complete verb form (`want`), so avoid truncating it to `wan.` |
| `DoToDueTo` | true | Corrects the typo `do to` when it is intended to mean `due to` in causal phrases. |
| `DoesOrDose` | true | Tries to correct typos of `dose` to `does`. |
| `DontCan` | true | Corrects `don't can` to `can't` or `cannot`. |
| `DotInitialisms` | true | Ensures common initialisms (like "i.e.") are properly dot-separated. |
| `DoubleCheckHyphen` | true | Normalizes the common two-word form `double check` to `double-check`. |
| `DoubleClick` | true | Encourages hyphenating `double-click` and its inflections. |
| `DoubleEdgedSword` | true | Corrects variants of `double-edged sword`. |
| `DoubleModal` | true | Two modal verbs in a row are rarely grammatical; remove one of them. |
| `DoubleNegative` | true | Replaces the determiner `no` with `any` when it follows the auxiliary `didn't/did not` plus a main verb (e.g., have, need, want, make, take, get) so the clause contains only one negation. |
| `DueDiligence` | true | Corrects `do diligence` to `due diligence`. |
| `DuringAges` | true | The idiomatic duration is 'for ages', so swap the initial preposition whenever the words refer to a general span. |
| `EachAndEveryOne` | true | Corrects `each and everyone` to `each and every one`. |
| `EachOthersPossessive` | true | Rewrites `each others` to `each other's` when it modifies a following noun phrase. |
| `EagleEyed` | true | Treats the phrase as a compound modifier and replaces the space with a hyphen so it reads like one idea. |
| `EasyGoingCompoundAdjective` | true | Adds a hyphen in `easy going` when it directly describes a following noun. |
| `EggYolk` | true | Corrects the eggcorn `egg yoke`, replacing it with the standard culinary term `egg yolk`. |
| `EllipsisLength` | true | Make sure you have the correct number of dots in your ellipsis. |
| `ElsePossessive` | true | Detects missing apostrophes in phrases like `someone elses book` and suggests the correct possessive form `else’s`. |
| `EludedTo` | true | Corrects `eluded to` to `alluded to` in contexts referring to indirect references. |
| `EnMasse` | true | Detects variants like `on mass` or `in mass` and suggests `en masse`. |
| `EnRoute` | true | Detects variants like `on route` or `in route` and suggests `en route`. |
| `EnvironmentVariable` | true | A collection of linters that can be run as one. |
| `EverEvery` | true | Tries to correct typos of `every` instead of `ever`. |
| `EverPresent` | true | Corrects the missing hyphen in `ever present` to the compound adjective `ever-present`. |
| `EverPronounRelPronoun` | true | Removes unnecessary redundant relative pronoun after `whatever`, `whoever`, etc. |
| `EverSince` | true | Corrects `every since` to `ever since`. |
| `EveryOnceAndAgain` | true | Corrects `every once and again` to `every once in a while` or `once again`. |
| `EverySingleOneOf` | true | Detects missing `one` in the phrase 'every single one of'. |
| `EveryTime` | true | Corrects `everytime` to `every time`. |
| `Everybody` | true | Looks for incorrect spacing inside the closed compound `everybody`. |
| `Everyday` | true | This rule tries to sort out confusing the adjective `everyday` and the adverb `every day`. |
| `Everyone` | true | Looks for incorrect spacing inside the closed compound `everyone`. |
| `Everywhere` | true | Looks for incorrect spacing inside the closed compound `everywhere`. |
| `Excellent` | true | Provides a stronger word choice by replacing `very good` with `excellent` for clarity and emphasis. |
| `ExceptOf` | true | Corrects `except of` to `except for` or `exception of`. |
| `ExitedExcitedContext` | true | Changes `exited` to `excited` when the sentence indicates enthusiasm or anticipation. |
| `ExpandAlgorithm` | true | Expands the abbreviation `algo` to the full word `algorithm` for clarity. |
| `ExpandAlloc` | true | Expands the abbreviation `alloc` to the full word `allocate` or `allocation` for clarity. |
| `ExpandArgument` | true | Expands the abbreviation `arg` to the full word `argument` for clarity. |
| `ExpandBecause` | true | Expands the informal abbreviation `cuz` to the full word `because` for formality. |
| `ExpandConfiguration` | true | A collection of linters that can be run as one. |
| `ExpandControl` | true | Expands the informal abbreviation `ctrl` to the full word `control` for clarity. |
| `ExpandCoordinate` | true | Expands the abbreviation `coord` to the full word `coordinate` for clarity. |
| `ExpandDecl` | true | Expands the abbreviation `decl` to the full word `declaration` or `declarator` for clarity. |
| `ExpandDependencies` | true | Expands the abbreviation `deps` to the full word `dependencies` for clarity. |
| `ExpandDereference` | true | Expands the abbreviation `deref` to the full word `dereference` for clarity. |
| `ExpandDirectory` | true | Expands the abbreviation `dir` to the full word `directory` for clarity. |
| `ExpandFavourite` | true | Expands the abbreviations `fav` and `fave` to the full word `favorite` or `favourite` for clarity. |
| `ExpandForward` | true | Expands the abbreviation `fwd` to the full word `forward` for clarity. |
| `ExpandGovt` | true | Expands the abbreviation `govt` or `govt.` to the full word `government` for clarity. |
| `ExpandLegitimate` | true | Expands the abbreviation `legit` to the full word `legitimate` for clarity. |
| `ExpandMemoryShorthands` | true | Expands memory-related abbreviations (`B`, `kB`, `MB`, `GB`, `TB`, `PB`, `KiB`, `MiB`, `GiB`, `TiB`, `PiB`, etc.) to their full forms (`byte`, `kilobyte`, `megabyte`, `gigabyte`, `terabyte`, `petabyte`, `kibibyte`, `mebibyte`, `gibibyte`, `tebibyte`, `pebibyte`, etc.). |
| `ExpandMinimum` | true | Expands the abbreviation `min` to the full word `minimum` for clarity. |
| `ExpandNotification` | true | Expands the abbreviation `notif` to the full word `notification` for clarity. |
| `ExpandParameter` | true | Expands the abbreviation `param` to the full word `parameter` for clarity. |
| `ExpandPeople` | true | Expands the abbreviation `ppl` to the full word `people` for clarity. |
| `ExpandPerformance` | true | Expands the abbreviation `perf` to the full word `performance` for clarity. |
| `ExpandPointer` | true | Expands the abbreviation `ptr` to the full word `pointer` for clarity. |
| `ExpandPreference` | true | A collection of linters that can be run as one. |
| `ExpandPrevious` | true | Expands the abbreviation `prev` to the full word `previous` for clarity. |
| `ExpandStandardInputAndOutput` | true | Expands the abbreviations `stdin`, `stdout`, and `stderr` to the full words `standard input`, etc. for clarity. |
| `ExpandThough` | true | Expands the informal spelling `tho` to the standard word `though`. |
| `ExpandThrough` | true | Expands the informal spelling `thru` to the standard word `through`. |
| `ExpandTimeShorthands` | true | Expands time-related abbreviations (`hr`, `hrs`, `min`, `mins`, `sec`, `secs`, `ms`, `msec`, `msecs`) to their full forms (`hour`, `hours`, `minute`, `minutes`, `second`, `seconds`, `millisecond`, `milliseconds`). |
| `ExpandVulnerability` | true | Expands the abbreviation `vuln` to the full word `vulnerability` for clarity. |
| `ExpandWith` | true | Expands the abbreviation `w/` to the full word `with` for clarity. |
| `ExpandWithout` | true | Expands the abbreviation `w/o` to the full word `without` for clarity. |
| `Expat` | true | Corrects the mistake of writing `expat` as two words. |
| `Expatriate` | true | Fixes the misinterpretation of `expatriate`, ensuring the correct term is used for individuals residing abroad. |
| `ExplainLikeImFive` | true | Expands an initialism. |
| `ExplanationMark` | true | Corrects the eggcorn `explanation mark/point` to `exclamation mark/point`. |
| `ExtendOrExtent` | true | Corrects `extend` to `extent` when the context is a noun. |
| `FaceFirst` | true | Ensures `face first` is correctly hyphenated as `face-first` when used before `into`. |
| `FairBit` | true | Corrects malapropisms of `a fair bit`. |
| `FallBelow` | true | Flags redundant usage of `below` after fall distances. |
| `FarAndFewBetween` | true | Corrects `far and few between` to the standard idiom `few and far between`. |
| `FarBeIt` | true | Flags misuse of `far be it` and suggests using `from` when it is followed by `for` |
| `FascinatedBy` | true | Ensures the correct prepositions are used with `fascinated` (e.g., `fascinated by` or `fascinated with`). |
| `FastPaste` | true | Detects incorrect usage of `fast paste` or `fast-paste` and suggests `fast-paced` as the correct phrase. |
| `FatalOutcome` | true | Replaces `fatal outcome` with the more direct term `death` for conciseness. |
| `FedUpWith` | true | Corrects `fed up of` to `fed up with` in dialects other than British English. |
| `FeelFell` | true | Corrects some expressions using `fell` where `feel` is correct. |
| `FellowCoRedundancy` | true | Corrects redundant use of `fellow` with `co-`. |
| `FetalPosition` | true | Ensures the correct use of `fetal position`, avoiding confusion with `feeble position`, which is not a standard phrase. |
| `FewUnitsOfTimeAgo` | true | Corrects some expressions using `few` where `a few` is correct. |
| `FillerWords` | true | Removes filler words. |
| `FindFine` | true | Fixes the common typo where writers write `find` when they mean `fine`. |
| `FindOut` | true | Flags `find out` when a plain `find` is the better choice. |
| `FinishingTouches` | true | Corrects `finish touches` to `finishing touches`. |
| `FirstAidKit` | true | Detects when “kid” after “aid”, “starter”, “travel”, or “tool” should be “kit” (a set of supplies). |
| `FirstPersonModifierHyphen` | true | Adds a hyphen to ordinal-person modifiers when they directly describe a following noun. |
| `FishNorFowl` | true | Corrects `neither fish nor foul` and `neither fish nor bird` to `neither fish nor fowl`. |
| `FlauntForFlout` | true | Corrects `flaunt` to `flout` when used with rule-like nouns. |
| `FleshOutVsFullFledged` | true | Corrects mixing up `flesh out` and `full fledged`. |
| `FoamAtTheMouth` | true | Corrects the idiom `foam out the mouth` to the standard `foam at the mouth`. |
| `FondOn` | true | Flags `fond on` and suggests `found on` or `fond of`. |
| `FootInchMinuteSecondSymbols` | true | Corrects the use of typewriter-style apostrophes and quotes for measurements to Unicode prime and double prime symbols. |
| `FootTheBill` | true | Corrects `flip the bill` to `foot the bill`. |
| `ForALongTime` | true | Eliminates the incorrect merging in `for along time`. |
| `ForAWhile` | true | Corrects the missing article in `for while`, forming `for a while`. |
| `ForArgumentsSake` | true | Corrects `for argument sake` to `for argument's sake`. |
| `ForFreeOfCharge` | true | Corrects `for free of charge` to either `for free` or `free of charge`. |
| `ForNoun` | true | Corrects the archaic or mistaken `fro` to `for` when followed by a noun. |
| `ForSameReason` | true | A linter for detecting incorrect use of `reason` vs `reasons` in certain contexts. |
| `ForTheMostPart` | true | Corrects `for most part` to `for the most part`. |
| `ForTheNthTime` | true | Corrects missing `the` for occasions like `on third time` -> `on the third time`. |
| `ForWhatItsWorth` | true | Expands an initialism. |
| `ForYourInformation` | true | Expands an initialism. |
| `FormativeYears` | true | Flags the misuse of `formidable years` when `formative years` is likely intended. This rule distinguishes between the shaping of character (`formative`) and the inspiring of fear or awe (`formidable`). |
| `FreePredicate` | true | Helps swap in `free` when a linking verb is followed by the noun `fee`. |
| `FreeRein` | true | Ensures the correct use of `free rein`, avoiding confusion with `free reign`, which incorrectly suggests authority rather than freedom of action. |
| `Freezing` | true | Encourages vivid writing by suggesting `freezing` instead of weaker expressions like `very cold.` |
| `FriendOfMe` | true | Corrects wrong pronoun usage in constructions like `a friend of me`. |
| `FromTheGetGo` | true | Ensures `from the get-go` is correctly hyphenated, preserving the idiom’s meaning of ‘from the very beginning’. |
| `FullToTheBrim` | true | Corrects the wrong preposition in the idiom `full` or `filled to the brim`. |
| `Furthermore` | true | Looks for incorrect spacing inside the closed compound `furthermore`. |
| `GetPassGoPass` | true | Corrects `pass` to `past` after `get` and `go`. |
| `GetRidOf` | true | Corrects common misspellings of the idiom `get rid of`. |
| `GetUsedTo` | true | Corrects `used of` to `used to`. |
| `GildedAge` | true | If referring to the period of economic prosperity, the correct term is `Gilded Age`. |
| `GoMissing` | true | Corrects `become missing` to `go missing`. |
| `GoSoFarAsTo` | true | Flags 'go so far to' when it should be 'go so far as to' to express going beyond expectations |
| `GoToSleep` | true | Corrects `go into sleep` to `go to sleep`. |
| `GoToWar` | true | Replaces `go at war` with `go to war`. |
| `GoggleBrand` | true | Replaces the misspelling `goggle` when it is paired with a well-known Google service. |
| `GoingTo` | true | Corrects `gong to` to the intended phrase `going to`. |
| `GoodAt` | true | Checks for `good in` used instead of `good at` to describe proficiency with a skill. |
| `GoogleNames` | true | When referring to Google products and services, make sure to treat them as proper nouns. |
| `GrindToAHalt` | true | Corrects the idiom `grind to halt` to the standard `grind to a halt`. |
| `GuineaBissau` | true | Checks for the correct official name of the African country. |
| `HadOf` | true | Flags the unnecessary use of `of` after `had` and suggests the correct forms. |
| `HalfAnHour` | true | Fixes the eggcorn `half an our` to the accepted `half an hour`. |
| `Handful` | true | Keeps the palm-sized quantity expressed by `handful` as one word. |
| `HandfulOfMore` | true | A linter skeleton for contributors to copy into `harper_core/src/linting/` and rename. |
| `Haphazard` | true | Corrects the eggcorn `half hazard` to `haphazard`, which properly means lacking organization or being random. |
| `HaveAHardTime` | true | Corrects `have hard time` to `have a hard time`. |
| `HaveNegNoAny` | true | Rewrites `no` to `any` in clauses like `haven't done no X` so the sentence keeps a single clear negation. |
| `HavePassed` | true | Suggests `past` for `passed` in case a verb was intended. |
| `HavePronoun` | true | Flags questions that begin with `has` followed by a pronoun that requires `have`, such as `Has we …` or `Has I …`, and suggests the correct auxiliary. |
| `HaveTakeALook` | true | Corrects either `have a look` or `take a look` to the other, depending on the dialect. |
| `Hazzle` | true | A collection of linters that can be run as one. |
| `HeDos` | true | Corrects the misspelling `dos` after `he`, `she`, or `it`. |
| `HeartToHeard` | true | Corrects `heart` or `herd` to `heard` in common `have ... heard of/about` questions. |
| `Hedging` | true | Flags hedging language (e.g. `I would argue that`, `..., so to speak`, `to a certain degree`). |
| `HelloGreeting` | true | Encourages greeting someone with `hello` instead of the homophone `halo`. |
| `HelpedPast` | true | Corrects past forms of verbs to their base form, when used after "helped". |
| `Henceforth` | true | Looks for incorrect spacing inside the closed compound `henceforth`. |
| `Hereby` | true | `Here by` in some contexts should be `hereby` |
| `HiddenIn` | true | Corrects `hidden into` to `hidden in`. |
| `HitTheNailOnTheHead` | true | Corrects the eggcorn `hit the nail in the head` to the standard `hit the nail on the head`. |
| `Holidays` | true | When referring to holidays, make sure to treat them as a proper noun. |
| `HolyWar` | true | Corrects misspellings of `holy war`. |
| `HomeInOn` | true | Corrects `hone in on` to `home in on`. |
| `HopHope` | true | Handles common errors involving `hop` and `hope`. Ensures `hop` is used correctly in phrases like `hop on a bus` while correcting mistaken uses of `hope` in contexts where `hop` is expected. |
| `HowDoesCompared` | true | Corrects `how do/does/did X compared/compares to Y` to use `compare`. |
| `HowItLooksLike` | true | Corrects `how ... looks like` to `how ... looks` or `what ... looks like`. |
| `HowMach` | true | Swaps `how mach` or `how match` with the correct quantifier `how much`. |
| `HowTo` | true | Detects the omission of `to` in constructions like `how clone / how install` and suggests `how to …`. |
| `However` | true | Looks for incorrect spacing inside the closed compound `however`. |
| `HumanBeings` | true | Eliminates the incorrect possessive/plural usage like `human's beings` or `humans beings`. |
| `HumanLife` | true | Changes `human live` to `human life`. |
| `HungerPang` | true | Corrects `hunger pain` to `hunger pang`. |
| `HyphenateNumberDay` | true | Ensures a hyphen is used in `X-day` when it is part of a compound adjective, such as `4-day work week`. |
| `IAm` | true | Fixes the incorrect spacing in `I a m` to properly form `I am`. |
| `IAmAgreement` | true | Corrects `I are` to `I am`. |
| `IDo` | true | Corrects `I does` to `I do`. |
| `IDontKnow` | true | Expands an initialism. |
| `IfIRecallCorrectly` | true | Expands an initialism. |
| `IfIUnderstandCorrectly` | true | Expands an initialism. |
| `IfWouldve` | true | Corrects `if I would've done` etc. to `if I had done` etc. |
| `IfYouKnowYouKnow` | true | Expands an initialism. |
| `ImitateFrom` | true | After `imitate ...`, idiomatic phrasing points to the inspiration with `of` instead of `from`. |
| `ImplementIn` | true | Corrects nonstandard `implement into` to `implement in`. |
| `Impressed` | true | Corrects `impressed of` to `impressed by` or `impressed with`. |
| `InADifferentDirection` | true | Detects the incorrect use of the preposition `into` when describing a change in path, strategy, or orientation. A direction is abstract, requiring `in` rather than `into`. |
| `InAHurry` | true | Corrects `in hurry` to `in a hurry`. |
| `InAWhile` | true | Corrects the missing article in `in while`, forming `in a while`. |
| `InAnIdealWorld` | true | Corrects `in ideal world` to `in an ideal world`. |
| `InAnyWay` | true | Corrects ungrammatical `in anyway` to `in any way`. |
| `InCaseYouMissedIt` | true | Expands an initialism. |
| `InDemandInDepth` | true | Checks for `in-demand` and `in-depth` used as adjectives but not hyphenated. |
| `InDetail` | true | Corrects unidiomatic plural `in details` to `in detail`. |
| `InDueCourse` | true | Corrects `do` to `due` in the eggcorn `in do course`. |
| `InFavourOfDoing` | true | Corrects missing `of` in `in favor/favour of doing`, etc. |
| `InHindsight` | true | Corrects incorrect variants of `in hindsight` to the standard phrase. |
| `InLieuOf` | true | Corrects the misspelling `in lue of` to `in lieu of`. |
| `InMyHumbleOpinion` | true | Expands an initialism. |
| `InMyOpinion` | true | Expands an initialism. |
| `InNeedOf` | true | Corrects `in need for` to `in need of`. |
| `InOfItself` | true | Corrects nonstandard `in of itself` to standard `in itself` or `in and of itself`. |
| `InOnTheCards` | true | Corrects either `in the cards` or `on the cards` to the other, depending on the dialect. |
| `InRealLife` | true | Expands an initialism. |
| `InRetaliationTo` | true | Corrects `in retaliation to` to `in retaliation for` or `in response to`. |
| `InStock` | true | Corrects `on stock` to `in stock`. |
| `InThe` | true | Detects and corrects a spacing error where `in the` is mistakenly written as `int he`. Proper spacing is essential for readability and grammatical correctness in common phrases. |
| `InTheFirstPlace` | true | Corrects `at the first place` to `in the first place`. |
| `InTheGrandSchemeOfThings` | true | Corrects nonstandard variants of `in the grand scheme of things`. |
| `InTheSameVein` | true | Corrects wrong variants of `in the same vein`. |
| `InThisThatRegard` | true | Corrects `in this/that regards` to `in this/that regard`. |
| `InTimeFromNow` | true | Checks for redundant use of `in` before [period of time] together with `from now` after it. |
| `IncidentReport` | true | A collection of linters that can be run as one. |
| `IncludingButNotLimitedToPunctuation` | true | Adds the conventional commas around `including, but not limited to,` when used parenthetically. |
| `InflectedVerbAfterTo` | true | This rule looks for `to verb` where `verb` is not in the infinitive form. |
| `InflectionPoint` | true | Corrects `infliction point` to `inflection point`. |
| `Initiatively` | true | Corrects nonstandard `initiatively`. |
| `Insensitive` | true | Suggests the more standard and common synonym `insensitive`. |
| `Insofar` | true | Looks for incorrect spacing inside the closed compound `insofar`. |
| `InspiredBy` | true | Corrects `inspired from` to `inspired by`, as `by` is the standard preposition for indicating the source of inspiration. |
| `Instead` | true | Looks for incorrect spacing inside the closed compound `instead`. |
| `InsteadOf` | true | Corrects the archaic or mistaken separation `in stead of` to `instead of` in everyday usage. |
| `Insurmountable` | true | Suggests the more standard and common synonym `insurmountable`. |
| `Intact` | true | Looks for incorrect spacing inside the closed compound `intact`. |
| `InterestedIn` | true | Ensures the correct preposition is used with the word `interested` (e.g. `interested in`). |
| `IntroCueCommaBeforeThanks` | true | Normalizes the common refusal phrase by inserting the missing comma. |
| `InvestIn` | true | `Invest` is traditionally followed by 'in,' not `into.` |
| `IsBeenAuxSequence` | true | Rewrites `is been` to a standard perfect-passive form. |
| `IsKnownFor` | true | Typo: `known` is the correct past participle. |
| `ItCan` | true | Corrects the misspelling `It cam` to the proper phrase `It can`. |
| `ItLooksLikeThat` | true | Corrects `it looks like that` to just `it looks like`. |
| `ItTimeAuxiliary` | true | Fixes missing auxiliary usage in `it time to/for ...` patterns by inserting the contraction form. |
| `ItsContraction` | true | Detects places where the possessive `its` should be the contraction `it's`, including before verbs/clauses and before proper nouns after opinion verbs. |
| `ItsPossessive` | true | In English, possessive pronouns never take an apostrophe. Use `its` to show ownership (e.g. “its texture”) and avoid confusing it with `it's`, which always means “it is” or “it has.” |
| `Itself` | true | Looks for incorrect spacing inside the closed compound `itself`. |
| `IveGotTo` | true | Corrects the slip `I've go to` to the idiomatic `I've got to`. |
| `JawDropping` | true | Corrects `jar-dropping` to `jaw-dropping`, ensuring the intended meaning of something that causes amazement. |
| `JealousOf` | true | Encourages the standard preposition after `jealous`. |
| `JetpackNames` | true | Ensure proper capitalization of Jetpack-related terms. |
| `JohnsHopkins` | true | Recommends the proper spelling `Johns Hopkins`. |
| `JumpTheGun` | true | Detects incorrect usage of the `jump the gun` idiom. |
| `JustDeserts` | true | Ensures `just deserts` is used correctly, preserving its meaning of receiving an appropriate outcome for one's actions. |
| `Keystroke` | true | Looks for incorrect spacing inside the closed compound `keystroke`. |
| `Keystrokes` | true | Looks for incorrect spacing inside the closed compound `keystrokes`. |
| `KindOf` | true | Corrects `kinda of` to `kind of`. |
| `KindRegards` | true | Changes `kid regards` to `kind regards`. |
| `KindSortOf` | true | Flags `kind if` or `sort off` that stand before qualifiers so the filler `of` stays intact. |
| `KnowNothingVerb` | true | Fixes `no` to `know` in common `subject + no nothing` constructions. |
| `Koreas` | true | When referring to the nations, make sure to treat them as a proper noun. |
| `Laos` | true | When referring to provinces and cities in Laos, make sure to treat them as a proper noun. |
| `Laptop` | true | Looks for incorrect spacing inside the closed compound `laptop`. |
| `LastButNotLeast` | true | Corrects common errors in the phrase `last but not least`. |
| `LastDitch` | true | Corrects wrong variations of the idiomatic adjective `last-ditch`. |
| `LastNight` | true | Flags `yesterday night` and suggests the standard phrasing `last night`. |
| `LaughOfAt` | true | Warns when `laugh` takes `of` before a person or pronoun and nudges writers toward the conventional `at`. |
| `LayoutVerb` | true | Flags nonstandard verb forms of `layout` (like `layouted` and `layouting`) and suggests the standard English verb forms (`laid out` and `laying out`). |
| `LeadRiseTo` | true | Corrects `leads rise to` to `gives rise to`. |
| `LeaveToFor` | true | When describing travel plans that include a destination and a time frame, prefer `leave for a destination` instead of `leave to a destination`. |
| `LeavingInDroves` | true | Corrects `leaving in drones` to `leaving in droves`. |
| `LeftRightHand` | true | Ensures `left hand` and `right hand` are hyphenated when used as adjectives before a noun, such as in `left-hand side` or `right-hand corner`. |
| `LessWorse` | true | Suggests alternatives to `less/least worse/worst` for more standard, clearer comparisons. |
| `LetAlone` | true | Changes `let along` to `let alone`. |
| `LetMeKnow` | true | Expands an initialism. |
| `LetToDo` | true | Corrects extraneous `to` after `let`. |
| `LetsConfusion` | true | It's often hard to determine where the subject should go with the word `let`. This rule attempts to find common errors with redundancy and contractions that may lead to confusion for readers. |
| `LevelOfDetails` | true | Corrects `level of details` to `level of detail` or `levels of detail`. |
| `LikeAsIf` | true | Corrects redundant `like as if` to `like` or `as if`. |
| `LikeThePlague` | true | Corrects `like a plague` to `like the plague`. |
| `LikeTheresNoTomorrow` | true | Corrects `like no tomorrow` to `like there's no tomorrow`. |
| `LikelyHood` | true | Treat the split tokens as one compound word (`likelihood`) whenever the adjective `likely` precedes `hood`. |
| `Likewise` | true | Looks for incorrect spacing inside the closed compound `likewise`. |
| `LinesOfCode` | true | Corrects pluralizing the wrong noun in `lines of code`. |
| `LinkedList` | true | A collection of linters that can be run as one. |
| `LitotesDirectPositive` | true | Offers direct-positive alternatives when double negatives might feel heavy. |
| `LittleKnown` | true | A linter skeleton for contributors to copy into `harper_core/src/linting/` and rename. |
| `LongSentences` | true | This rule looks for run-on sentences, which can make your work harder to grok. |
| `LongTimeAgo` | true | Corrects the missing article `a` in the phrase `long time ago`. |
| `LookDownOnesNose` | true | Corrects `look one's nose down` to `look down one's nose` |
| `LookForwardTo` | true | Corrects `look forward for` to `look forward to`. |
| `LookInto` | true | Merges the split preposition when a look-verb is followed by a clause that starts with a question word. |
| `Lookalike` | true | Corrects `look-a-like` to `look alike` or `look-alike`. |
| `LookingForwardTo` | true | This rule identifies instances where the phrase `looking forward to` is followed by a base form verb instead of the required gerund (verb + `-ing` form). |
| `LooksLikes` | true | This rule turns `looks likes`, `looked likes`, and `looking likes` into the idiomatic `look ... like`. |
| `Lots` | true | A collection of linters that can be run as one. |
| `LowHangingFruit` | true | Corrects nonstandard variants of `low-hanging fruit`. |
| `MakeDoWith` | true | Corrects `make due` to `make do` when followed by `with`. |
| `MakeItSeem` | true | Corrects `make it seems` to `make it seem`. |
| `MakeSense` | true | Corrects `make senses` to `make sense`. |
| `MakeupCompoundNoun` | true | Finds determiner-led noun phrases where the split spelling appears and closes it. |
| `Malaysia` | true | When referring to the states of Malaysia and their capitals, make sure to treat them as a proper noun. |
| `ManagerialReins` | true | Corrects the eggcorn `managerial reigns` to the idiomatic `managerial reins`. |
| `MassExodus` | true | Corrects the eggcorn `max exodues` to the idiomatic `mass exodus`. |
| `MassNouns` | true | Detects mass nouns used as countable nouns. |
| `MayOfPronoun` | true | A collection of linters that can be run as one. |
| `MeansALotTo` | true | Corrects wrong variants of `means a lot for [someone]` to `means a lot to [someone]`. |
| `Meanwhile` | true | Looks for incorrect spacing inside the closed compound `meanwhile`. |
| `MercedesBenzHyphen` | true | Connect the separate words `Mercedes` and `Benz` whenever they appear together so the brand stays consistent with its official styling. |
| `MergeWords` | true | Accidentally inserting a space inside a word is common. This rule looks for valid words that are split by whitespace. |
| `MetaNames` | true | When referring to Meta products and services, make sure to treat them as proper nouns. |
| `MicrosoftNames` | true | When referring to Microsoft products and services, make sure to treat them as proper nouns. |
| `Middleware` | true | Looks for incorrect spacing inside the closed compound `middleware`. |
| `MissingDeterminer` | true | Detects likely missing determiners in common request phrases and offers to insert one where necessary. |
| `MissingPreposition` | true | Locates potentially missing prepositions. |
| `MissingTo` | true | Flags verbs and adjectives like `need`, `want`, or `ready` that are missing `to` before an infinitive. |
| `Misspell` | true | Ensures `misspell` and its inflected forms are written as a single word. |
| `Misunderstand` | true | Looks for incorrect spacing inside the closed compound `misunderstand`. |
| `Misunderstood` | true | Looks for incorrect spacing inside the closed compound `misunderstood`. |
| `Misuse` | true | Looks for incorrect spacing inside the closed compound `misuse`. |
| `Misused` | true | Looks for incorrect spacing inside the closed compound `misused`. |
| `MixedBag` | true | Corrects the eggcorn `mixed bad` to `mixed bag`. |
| `ModalBeAdjective` | true | Looks for `be` missing between a modal verb and adjective. |
| `ModalOf` | true | Detects `of` mistakenly used with `would`, `could`, `should`, etc. |
| `ModalSeem` | true | Detects modal verbs followed by `seen` before adjectives and suggests `seem` or `be`. |
| `Months` | true | Detects months written with a lowercase first letter. |
| `Monumentous` | true | Advises using `momentous` or `monumental` instead of `monumentous` for serious usage. |
| `MootPoint` | true | Corrects `mute` to `moot` in the phrase `moot point`. |
| `MoreAdjective` | false | Looks for comparative adjective constructions with `more` than could use inflected forms. |
| `MoreBetter` | true | Finds redundant paring of `more` or `most` with adjectives already in the comparative or superlative form. |
| `MoreThanMeetsTheEye` | true | Corrects nonstandard and less idiomatic variants of `more than meets the eye`. |
| `MoreThatLikely` | true | Corrects the common typo `more that likely` to `more than likely`. |
| `MostNumber` | true | Corrects `most number` and `most amount` |
| `MostOfTheTimes` | true | Corrects `a lot of the times` and `most of the times` to use singular `time`. |
| `Multicore` | true | Looks for incorrect spacing inside the closed compound `multicore`. |
| `Multimedia` | true | Looks for incorrect spacing inside the closed compound `multimedia`. |
| `MultipleFrequencyAdverbs` | true | Looks for adjacent adverbs of frequency, which will be either redundant or contradictory. |
| `MultipleSequentialPronouns` | true | When editing work to change point of view (i.e. first-person or third-person) it is common to add pronouns while neglecting to remove old ones. This rule catches cases where you have multiple disparate pronouns in sequence. |
| `Multithreading` | true | Looks for incorrect spacing inside the closed compound `multithreading`. |
| `MyHouse` | true | Fixes the typo `mu house` to `my house`. |
| `Myself` | true | Looks for incorrect spacing inside the closed compound `myself`. |
| `NailInCoffin` | true | Corrects `nail on the coffin` to `nail in the coffin` |
| `NailOnTheHead` | true | Replaces hat/had/hit/hid in the idiom `nail on the head` with `head`. |
| `NakedEye` | true | Corrects the wrong preposition used instead of `to`, `with`, or `by` the naked eye. |
| `NationalCapitals` | true | When referring to national capitals, make sure to treat it as a proper noun. |
| `NeedHelp` | true | Changes `ned help` to the correct `need help`. |
| `NeedToNoun` | true | Flags `need to` when it is immediately followed by a noun, which usually means the infinitive verb is missing. |
| `NeitherHereNorThere` | true | A collection of linters that can be run as one. |
| `NerveRacking` | true | Corrects common misspellings and missing hyphen in `nerve-racking`. |
| `NervousWreck` | true | Suggests using `nervous wreck` when referring to a person's emotional state. |
| `NeverMind` | true | Expands an initialism. |
| `NoFrenchSpaces` | true | Stops users from accidentally inserting French spaces. |
| `NoHarmNoFoul` | true | Corrects nonstandard variants of the idiom `no harm, no foul`. |
| `NoLonger` | true | Corrects `not longer` when it should be `no longer`. |
| `NoLongerPronoun` | true | Detects incorrect word order where `no longer` incorrectly precedes a subject pronoun. |
| `NoMatchFor` | true | No match for |
| `NoOxfordComma` | false | The Oxford comma is one of the more controversial rules in common use today. Enabling this lint checks that there is no comma before `and`, `or` or `nor` when listing out more than two ideas. |
| `NobelPeacePrize` | true | Corrects the frequent typos that swap the Nobel/Peace/Prize spelling when people mention the prize. |
| `Nobody` | true | Looks for incorrect spacing inside the closed compound `nobody`. |
| `NominalWants` | true | Ensures you use the correct `want` / `wants` after a nominal. |
| `Nonetheless` | true | Looks for incorrect spacing inside the closed compound `nonetheless`. |
| `NorModalPronoun` | true | Corrects the order of the pronoun and modal verb after `nor`. |
| `NotBeAfterNot` | true | Removes the redundant linking verb that sneaks in between `not` and the predicate after a conjugated `be`. |
| `NotForLackOf` | true | Replaces `not without a lack of` with `not for lack of`. |
| `NotIn` | true | Replaces `no in` with `not in`. |
| `NotLongAfter` | true | A collection of linters that can be run as one. |
| `NotOnly` | true | Corrects `no only` to `not only` before forms of `to be`. |
| `NotOnlyInversion` | true | Corrects `not only it is` to `not only is it` |
| `NotTo` | true | Corrects `no to` to `not to`, ensuring proper negation. |
| `NotablePlaces` | true | Ensure proper capitalization of notable places that are significant regional centers, travel destinations, or have international importance. |
| `Nothing` | true | Looks for incorrect spacing inside the closed compound `nothing`. |
| `Notwithstanding` | true | Looks for incorrect spacing inside the closed compound `notwithstanding`. |
| `NounVerbConfusion` | true | Handles common confusions between related nouns and verbs (e.g., 'advice/advise', 'breath/breathe') |
| `NowKnownAs` | true | Corrects `now know as` to `now known as` for proper grammar. |
| `NowWay` | true | Corrects `now way` to `no way` in high-confidence contexts while avoiding comparative contexts like `now way too`. |
| `Nowadays` | true | Corrects common misspellings of `nowadays`. |
| `Nowhere` | true | Looks for incorrect spacing inside the closed compound `nowhere`. |
| `NumberSuffixCapitalization` | true | You should never capitalize number suffixes. |
| `NumericRangeEnDash` | true | Replaces hyphens and em dashes with en dashes in isolated numeric ranges such as `12–14`. |
| `ObsessPreposition` | true | Ensures valid prepositions are used with `obsess` |
| `OceansAndSeas` | true | When referring to the world's oceans and seas, ensure they are treated as proper nouns. |
| `OfCourse` | true | Corrects common mistaken forms of `of course`, including `of curse`, `off course`, and `ofcourse`, while ignoring valid phrases like `kind of curse`. |
| `OffLimits` | true | Corrects `off-limit` to `off-limits`. |
| `OffTheCuff` | true | Ensures `off-the-cuff` is correctly hyphenated. |
| `OhMyGod` | true | Expands an initialism. |
| `OkToOkay` | true | Corrects `ok` to `okay`. |
| `OldWivesTale` | true | Corrects `old wise tale` to `old wives' tale`, preserving the phrase’s meaning as an unfounded traditional belief. |
| `OldestInTheBook` | true | Detects the idiom `oldest X in the books`, which should use singular `book`. |
| `OnFirstGlance` | true | The standard idiom starts with `at` for quick appraisals, so swap the preposition to keep the phrase idiomatic. |
| `OnFloor` | true | This rule identifies incorrect uses of the prepositions `in` or `at` when referring to locations inside a building and recommends using `on the floor` instead. |
| `OnSecondThought` | true | Replaces the nonstandard `on second though` with the common idiom `on second thought` to indicate reconsideration. |
| `OnTheFence` | true | A linter skeleton for contributors to copy into `harper_core/src/linting/` and rename. |
| `OnTheOtherHand` | true | Expands an initialism. |
| `OnTheSpurOfTheMoment` | true | Ensures the correct use of `on the spur of the moment`, avoiding nonstandard variations. |
| `OnTopOf` | true | Corrects `ontop of` and `in top of` to `on top of`. |
| `OnceInAWhile` | true | Corrects two common malapropisms of `once in a while`. |
| `OnceOrTwice` | true | Detects the mistaken phrase `once a twice` and suggests `once or twice`. |
| `OneAndTheSame` | true | This linter flags instances of the nonstandard phrase `one in the same`. The correct, more accepted form is `one and the same` |
| `OneFellSwoop` | true | Corrects `one foul swoop` to `one fell swoop`, preserving the phrase’s original meaning of sudden and complete action. |
| `OneHanded` | true | Treat 'one handed' and 'two handed' as single adjectives before nouns so the measurement stays attached to 'handed'. |
| `OneOfTheSingular` | true | Corrects 'one of the [singular]' to 'one of the [plural]' |
| `OnesOwnAccord` | true | Detects incorrect usage of `on one's own accord` and suggests `of one's own accord`. |
| `OnesSelf` | true | Corrects the generic reflexive pronoun `one's self` to `oneself`. |
| `OpenCompounds` | true | Corrects compound words that should be written as two words. |
| `OpenTheLight` | true | Corrects using `open` instead of `turn on` or `switch on` |
| `OperatingSystem` | true | Ensures `operating system` is used correctly instead of `operative system`. |
| `OrthographicConsistency` | true | Ensures word casing matches the dictionary's canonical orthography. |
| `OughtToBe` | true | Detects the mistaken `out to be` and suggests `ought to be`, while ignoring legitimate phrasal-verb uses such as `turn out to be` and `make it out to be`. |
| `OutOfDate` | true | Ensures that the phrase `out of date` is written with a hyphen as `out-of-date` when used as a compound adjective. |
| `OutOfSync` | true | Corrects `out of sink` to `out of sync` or `out of synch`. |
| `OutOfTheWindow` | true | A linter for the idiom `out (of) the window`. |
| `OverPlus` | true | Detected redundant use of `over` and `plus` used together to bracket a number. |
| `Overall` | true | Looks for incorrect spacing inside the closed compound `overall`. |
| `Overclocking` | true | Looks for incorrect spacing inside the closed compound `overclocking`. |
| `Overload` | true | Looks for incorrect spacing inside the closed compound `overload`. |
| `Overnight` | true | Looks for incorrect spacing inside the closed compound `overnight`. |
| `OvertimeCompoundNoun` | true | Finds job-hours contexts where the split form appears and joins it into the standard compound. |
| `OxfordComma` | true | The Oxford comma is one of the more controversial rules in common use today. Enabling this lint checks that there is a comma before `and`, `or`, or `nor` when listing out more than two ideas. |
| `Oxymorons` | true | Flags oxymoronic phrases (e.g. `amateur expert`, `increasingly less`, etc.). |
| `PaleByComparison` | true | A linter skeleton for contributors to copy into `harper_core/src/linting/` and rename. |
| `PartsOfSpeech` | true | Corrects pluralizing the wrong noun in `part of speech`. |
| `PassersBy` | true | Corrects `passerbys` and `passer-bys` to `passersby` or `passers-by`. |
| `PassionateAbout` | true | Corrects `passtionate of` to `passionate about`. |
| `PasswordProtectedHyphen` | true | Keeps the compound adjective together before nouns like folders, files, or web pages so the dependency between them is clear. |
| `PayForPrice` | true | Corrects extraneous `for` when used of charges, fees, prices, etc. |
| `Payed` | true | Corrects `payed` to `paid` and `overpayed` to `overpaid`. |
| `PeaceOfMind` | true | Corrects `piece of mind` to `peace of mind`. |
| `PedalToTheMetal` | true | Corrects the eggcorn `pedal to the medal` to the standard idiom `pedal to the metal`, meaning to accelerate at full speed. |
| `PeekBehindTheCurtain` | true | Corrects `peak behind the curtain` to `peek behind the curtain`. |
| `PerSe` | true | Corrects common misspellings of `per se`. |
| `PhrasalVerbAsCompoundNoun` | true | This rule looks for phrasal verbs written as compound nouns. |
| `Piggyback` | true | Corrects the eggcorn `piggy bag` to `piggyback`, which is the proper term for riding on someone’s back or using an existing system. |
| `PiqueInterest` | true | Detects incorrect usage of `peak` or `peek` when the intended word is `pique`, as in the phrase `you've peaked my interest`. |
| `PlayAFactor` | true | Corrects `play a factor` to `play a part` or `be a factor`. |
| `PleasRequestVerb` | true | Fixes the typo `pleas` when it appears as a request cue before common action verbs. |
| `PleaseTakeALook` | true | Expands an initialism. |
| `PluralDecades` | true | Flags plural decades erroneously using an apostrophe before the `s` |
| `PluralWrongWordOfPhrase` | true | Corrects noun phrases that pluralize the last noun instead of the main noun. |
| `PocketCastsNames` | true | Ensure proper capitalization of Pocket Casts and Pocket Casts Plus as brand names. |
| `PointsOfView` | true | Corrects pluralizing the wrong noun in `point of view`. |
| `PortAuPrince` | true | Checks for the correct official name of the capital of Haiti. |
| `PortoNovo` | true | Checks for the correct official name of the capital of Benin. |
| `PossessiveNoun` | false | Use an apostrophe and `s` to form a noun’s possessive. |
| `PossessiveYour` | true | The possessive form of `you` is more likely before nouns. |
| `PostItNoteHyphen` | true | Standardizes the sticky-note product phrase by joining the first two words. |
| `Postpone` | true | Looks for incorrect spacing inside the closed compound `postpone`. |
| `PrayingMantis` | true | Corrects `preying mantis` to `praying mantis`, ensuring accurate reference to the insect’s characteristic pose. |
| `PreferPleaded` | true | Prefer `pleaded` over `pled`. |
| `PreferPled` | false | Prefer `pled` over `pleaded`. |
| `PreferSneaked` | true | Prefer `sneaked` over `snuck`. |
| `PreferSnuck` | false | Prefer `snuck` over `sneaked`. |
| `PrincipleToPrincipalRoleNoun` | true | Fixes `principle` to `principal` when it appears as an adjective before common role, goal, and priority nouns (for example, `my principle job`). |
| `ProgressiveNeedsBe` | true | Detects the ungrammatical patterns `<pronoun> have …ing` (e.g., `I have …ing`) and `<pronoun>'ve …ing` (e.g., `I've …ing`) and suggests either the present progressive (e.g., `I'm/We're/You're/They're …`) or the present perfect progressive (e.g., `I/We/You/They have been …` or `I've/We've/You've/They've been …`). |
| `PronounAre` | true | Spots the letter `r` used in place of `are` or `you're` after plural first- or second-person pronouns. |
| `PronounContraction` | true | Choosing when to contract pronouns is a challenging art. This rule looks for faults. |
| `PronounInflectionBe` | true | Checks subject–verb agreement for the verb `be`. Third-person singular pronouns (`he`, `she`, `it`) require the singular form `is`, while the plural pronoun `they` takes `are`. The linter flags mismatches such as `He are` or `They is` and offers the correct concord. |
| `PronounKnew` | true | Detects when “new” following a pronoun (optionally with an adverb) is a typo for the past tense “knew.” |
| `PronounVerbAgreement` | true | Ensures pronouns agree with their verbs. |
| `Proofread` | true | Looks for incorrect spacing inside the closed compound `proofread`. |
| `ProperNouns` | true | Ensure proper capitalization of proper nouns. |
| `Provocate` | true | Corrects the misspelling `provocate` to `provoke`. |
| `QuantifierNeedsOf` | true | Detects missing `of` after the quantifier “a couple” when it precedes a plural noun |
| `QuantifierNumeralConflict` | true | Detects quantifier-numeral conflicts |
| `QuiteMany` | true | Corrects `quite many` to `quite a few`, which is the more natural and idiomatic phrase in standard English. `Quite many` is considered nonstandard usage. |
| `QuiteQuiet` | true | Helps distinguish between ‘quiet’ (making ‘little noise’) and ‘quite’ (meaning ‘rather’). |
| `QuoteSpacing` | true | Checks that quotation marks are preceded or succeeded by whitespace. |
| `RainbowColoredHyphen` | true | When rainbow-colored or cream-colored describe a noun, replace the space between the color words with a hyphen to keep the modifier cohesive. |
| `RallyToReally` | true | Catches the typo where `rally` sneaks into `be + ...ing` constructions, including common contractions. |
| `RapidFire` | true | Checks to ensure writers hyphenate `rapid-fire`. |
| `ReadsAndWrites` | true | Corrects inconsistent noun or verb forms when `read` and `write` are paired. |
| `RealTrouper` | true | Ensures the correct use of `real trouper`, distinguishing it from `trooper`, which refers to a soldier or police officer. |
| `Really` | true | Expands an initialism. |
| `ReasonForDoing` | true | Corrects `reason of doing` to `reason for doing` etc. |
| `RedundantAcronyms` | true | Identifies redundant acronyms where the last word repeats the last letter's meaning (e.g., `ATM machine` → `ATM` or `automated teller machine`). |
| `RedundantAdditiveAdverbs` | true | Detects redundant additive adverbs. |
| `RedundantFirsts` | true | Looks for redundant use of `first` with verbs that already imply order. |
| `RedundantIIRC` | true | Flags redundant use of 'if' or 'correctly' with `IIRC`, since `IIRC` already stands for 'if I recall correctly'. |
| `RedundantPretty` | true | `Pretty` is redundant when modifying `decent`. Use `decent` alone. |
| `RedundantProgressiveComparative` | true | Detects redundant comparatives like `increasingly more` and `increasingly less`. |
| `RedundantSelf` | true | Detects redundant use of `self-` prefixes with reflexive pronouns (e.g., `self-host it themselves`). |
| `RedundantSuperlatives` | true | Simplifies redundant double positives like `most optimal` to the base form. |
| `RedundantThat` | true | There is rarely a situation where `that that` cannot be condensed into a single token. |
| `Regardless` | true | Looks for incorrect spacing inside the closed compound `regardless`. |
| `RegimenRegiment` | true | Corrects mistaken use of `regiment` (military unit) when `regimen` (routine) was intended. |
| `Regionalisms` | true | Regionalisms |
| `RegularIrregulars` | true | Replaces wrong regular inflections of words with their correct irregular forms. |
| `RelayOnForRely` | true | Corrects the frequent typo where `relay` is used in place of `rely` in the phrase `relay on`. |
| `RepeatedWords` | true | This rule looks for repetitions of words that are not homographs. |
| `Respond` | true | Flags uses of the noun `response` where the verb `respond` is needed after an auxiliary. |
| `ResponsibilityFor` | true | Corrects `take/assume/claim responsibility of` to `take/assume/claim responsibility for`. |
| `ReverseEngineer` | true | Corrects `reversed engineer` to `reverse engineer`. |
| `RifeWith` | true | Corrects `ripe with` to `rife with`, preserving the phrase’s meaning of being filled with something, often undesirable. |
| `RightClick` | true | Hyphenates right-click style mouse commands. |
| `RiseTheQuestion` | true | Corrects `rise the question` to `raise the question`. |
| `RiseTheRanks` | true | Corrects the nonstandard phrase `rise the ranks` to the standard `rise through the ranks` or `rise from the ranks` |
| `RoadMap` | true | Detects when `roadmap` is used instead of `road map`, prompting the correct spacing. |
| `RollerSkated` | true | Encourages hyphenating the past tense of `roller-skate`. |
| `RulesOfThumb` | true | Corrects pluralizing the wrong noun in `rule of thumb`. |
| `RunIntoProblemsOrTrouble` | true | Corrects `running into` `problems` or `trouble` with wrong article, singular, or plural forms. |
| `SafeToSave` | true | Detects `safe` (adjective) when `save` (verb) is intended after modal verbs like `could` or `should`. |
| `SameAs` | true | Corrects the incorrect phrase `same then` to the standard `same as`. |
| `SaveToSafe` | true | Corrects `save to <verb>` to `safe to <verb>` after a form of `be`. |
| `ScantilyClad` | true | Fixes `scandally clad` to `scantily clad`, ensuring clarity in describing minimal attire. |
| `ScapeGoat` | true | Corrects `scape goat` to `scapegoat`, which is the proper term for a person blamed for others' failures. |
| `SeamToSeem` | true | Corrects `seam` to `seem` when used as a verb meaning `to appear` or `to give the impression`. |
| `SendAnEmailTo` | true | Replaces the verbose phrase `send an email to` with the concise verb `email`. |
| `SentenceCapitalization` | true | The opening word of a sentence should almost always be capitalized. |
| `ShootOneselfInTheFoot` | true | Corrects nonstandard variants of 'shoot oneself in the foot'. |
| `Shortcoming` | true | Looks for incorrect spacing inside the closed compound `shortcoming`. |
| `Shortcomings` | true | Looks for incorrect spacing inside the closed compound `shortcomings`. |
| `ShowCase` | true | Corrects `show case` to `showcase`. |
| `ShutdownVerb` | true | Keeps `shutdown` as a noun when it stands alone but swaps it for the phrasal verb `shut down` whenever an auxiliary precedes it. |
| `SideTangent` | true | Corrects redundant `side tangent` and `side tangents` to more concise alternatives. |
| `SimilarLike` | true | The adjective 'similar' pairs with the preposition 'to', so never follow it with 'like'. |
| `SimpleGrammatical` | true | Corrects `simply grammatical` to `simple grammatical` for proper adjective usage. |
| `SimplePastToPastParticiple` | true | Corrects simple past tense verbs to past participle after auxiliary verbs like "have" or "be". |
| `SinceDuration` | true | Detects the use of 'since' with a duration instead of a point in time. |
| `SingleBe` | true | Removes adjacent duplicate inflections of `be`, including contracted forms followed by another `be` verb. |
| `SlipperySlope` | true | Corrects `slippy slope` to `slippery slope`. |
| `SneakPeekPreview` | true | Corrects the common phrase-level confusion where `peak` is used instead of `peek` after `sneak`. |
| `SneakingSuspicion` | true | Changes `sneaky suspicion` to `sneaking suspicion`. |
| `SomeOfThe` | true | Quantity words such as `some` normally take `of` before a definite article. Including `of` signals that you mean a subset of a larger set, preventing a momentary stumble in comprehension. |
| `SomeWithoutArticle` | true | Detects the redundant article in front of `some` and suggests more natural phrasing. |
| `Somebody` | true | Looks for incorrect spacing inside the closed compound `somebody`. |
| `SomebodyElses` | true | Corrects `somebody else's` when the `'s` is in the wrong place. |
| `Somehow` | true | Looks for incorrect spacing inside the closed compound `somehow`. |
| `Someone` | true | Looks for incorrect spacing inside the closed compound `someone`. |
| `SomethingIs` | true | Flags forms like `somethings` before progressive verbs and suggests using `something's` or `something is`. |
| `SomewhatSomething` | true | Flags the phrase `somewhat of a` in favor of `something of a`, which can be considered more traditional. |
| `Somewhere` | true | Looks for incorrect spacing inside the closed compound `somewhere`. |
| `SoonToBe` | true | Hyphenates `soon-to-be` when it appears before a noun. |
| `SoonerOrLater` | true | Fixes the improper phrase `sooner than later` by suggesting standard alternatives. |
| `SoughtAfter` | true | Correct `sort after` to `sought after` |
| `Spaces` | true | Words should be separated by at most one space. |
| `SpecialAttention` | true | Changes `spacial attention` to `special attention`. |
| `SpellCheck` | true | Looks and provides corrections for misspelled words. |
| `SpelledNumbers` | false | Most style guides recommend that you spell out numbers less than ten. |
| `SpinalChord` | true | The words `spinal`, `vocal`, `umbilical`, and `electrical` are followed by `cord`, so replace accidental `chord`/`chords`. |
| `SplitWords` | true | Finds missing spaces in improper compound words. |
| `Starving` | true | Encourages vivid writing by suggesting `starving` instead of weaker expressions like `very hungry.` |
| `StateOfTheArt` | true | Detects incorrect usage of `state of art` and suggests `state of the art` as the correct phrase. |
| `StatuteOfLimitations` | true | Corrects `statue of limitations` to `statute of limitations`. |
| `Straightforward` | true | Looks for incorrect spacing inside the closed compound `straightforward`. |
| `StrikeChord` | true | The phrase about resonating with someone is spelled with a chord, not a cord, so fix the typo and keep the idiom intact. |
| `StrikeOfGenius` | true | Detects incorrect usage of `strike of genius` and suggests `stroke of genius` as the correct phrase. |
| `StrikeOfLuck` | true | Detects incorrect usage of `strike of luck` and suggests `stroke of luck` as the correct phrase. |
| `SubjectPronoun` | true | Fixes sentences that start with `me and X` by putting the proper noun first and using `I`. |
| `SubjunctiveWasToWere` | true | Ensures proper use of the subjunctive mood in counterfactual conditional statements starting with `if only` or `I wish`. |
| `SufficeItToSay` | true | Corrects `suffice to say` to `suffice it to say`. |
| `SupposedTo` | true | Fixes `suppose to` to the correct `supposed to`. |
| `Surreality` | true | Suggests changing `surrealness` to the more standard `surreality`. |
| `TakeALookTo` | true | Corrects `take a look to`/`have a look to` to correctly use `at`. |
| `TakeCareOf` | true | Corrects `take care about` to `take care of`. |
| `TakeControlOf` | true | Corrects `take control over` to `take control of`. |
| `TakeItPersonally` | true | Corrects `take it personal` to `take it personally`. |
| `TakeMedicine` | true | Encourages pairing medicine-related nouns with verbs like `take` or `swallow` instead of `eat`. |
| `TakePrideIn` | true | Corrects `take pride of` to `take pride in`. |
| `TalkToYouLater` | true | Expands an initialism. |
| `Tenfold` | true | Looks for incorrect spacing inside the closed compound `tenfold`. |
| `ThanksALot` | true | Corrects the missing article in `thanks lot`, forming `thanks a lot`. |
| `ThatChallenged` | true | Corrects `the challenged` to `that challenged` for proper relative clause usage. |
| `ThatThan` | true | Corrects the typo `that` to `than` in comparisons. |
| `ThatThis` | true | Fixes `the this` to the correct phrase `that this`. |
| `ThatWhich` | true | Repeating the word "that" is often redundant. The phrase `that which` is easier to read. |
| `The` | true | Fixes especially common misspellings of the word `the` |
| `TheAnother` | true | Corrects `the another`. |
| `TheDifferenceBetween` | true | Corrects `the different(s) between to `the difference between`. |
| `TheEntiretyOf` | true | Corrects `the entire of` to `the entirety of`. |
| `TheHowWhy` | true | Removes the extra `the` from expressions like `the how`, skipping `how to` and `who's who`. |
| `TheLastDays` | true | Corrects `in the last days` to `in the last few days` and related errors. |
| `TheMy` | true | Flags the definite article used together with a possessive. |
| `ThePointFor` | true | Corrects `the point for` to `the point of` |
| `TheProperNounPossessive` | true | Checks for redundant `the` before possessive proper noun such as `The London's population`. |
| `TheTheToThatThe` | true | Corrects `the the` to `that the` or to a single `the`. |
| `TheWhetherWeather` | true | Fixes the common mix-up where `whether` is used after `the` when the weather noun is intended. |
| `TheirToThere` | true | Corrects `their` when the intended meaning is `there`. |
| `TheirToTheyre` | true | Corrects `their` when the intended meaning is `they're`. |
| `ThenThan` | true | Corrects mixing up `then` and `than`. |
| `There` | true | Looks for incorrect spacing inside the closed compound `there`. |
| `ThereAfterCompound` | true | Normalizes split `there after` to the closed form in adverbial contexts. |
| `ThereIsAgreement` | true | Checks for `is there` and its variants agreeing with singular vs plural subjects |
| `ThereMissingIsClause` | true | Inserts `is` in common subordinate clauses like `if there a ...` where the copula is omitted. |
| `ThereOwn` | true | Corrects `there own`, `they're own`, and `theyre own` to `their own`. |
| `ThereToTheir` | true | Corrects `there` when the intended meaning is `their`. |
| `Therefore` | true | Looks for incorrect spacing inside the closed compound `therefore`. |
| `Theres` | true | Replaces the mistaken possessive `their's` before a determiner with the contraction `there's`. |
| `Thereupon` | true | Looks for incorrect spacing inside the closed compound `thereupon`. |
| `ThesesThese` | true | Corrects the common misspelling of `these` as `theses`. |
| `TheyToThem` | true | Converts `they` to `them` whenever the pronoun serves as an object after common prepositions or actions that take direct objects. |
| `TheyreConfusions` | true | Detects apostrophe and locative edge cases that are awkward to model with standard contraction checks. |
| `TheyreToTheir` | true | Corrects `they're` when the intended meaning is `their`. |
| `ThieveNoun` | true | Fixes accidental `thieve` in noun phrases where singular `thief` is intended. |
| `ThingThink` | true | Corrects the typo `thing` when it should be `think`. |
| `ThinkKnowOff` | true | Fixes the common preposition mix-up after verbs like `know` and `think` in phrases such as `know off` and `thought off` when a following token indicates the intended meaning is `of`. |
| `ThisTypeOfThing` | true | Checks that the parts of `this/these type(s) of thing(s)` agree in grammatical number |
| `ThoughThought` | true | Corrects `though` when it's a typo for `thought`. |
| `ThoughtProcess` | true | Changes `though process` to `thought process`. |
| `ThreatenVerb` | true | Normalize `threat` to `threaten` when it is used after modals (or their contractions) because the noun form is being mistaken for a verb. |
| `ThriveOn` | true | Corrects `thrive off` and `thrive off of` to `thrive on`. |
| `ThrowAway` | true | Finds the typo `through away` and suggests `throw away` or `threw away` instead. |
| `ThrowBabyWithBathwater` | true | Corrects wrong or nonstandard variants of the idiom 'to throw the baby out with the bathwater' |
| `ThrowRubbish` | true | Checks for throwing rubbish rather than throwing it away. |
| `TickingTimeClock` | true | Corrects `ticking time clock` to `ticking time bomb` for idiomatic urgency or `ticking clock` otherwise. |
| `TillDate` | true | Corrects the Indian English `till date` to `to date` when Indian English is not the selected dialect. |
| `ToAdverb` | true | Flags duplicated `to` around certain adverbs (e.g. `to never to`) and offers fixes that keep only one `to`. |
| `ToBackOut` | true | Treats `to backout` as a mistyped infinitive and prefers the two-word verb. |
| `ToBeHonest` | true | Expands an initialism. |
| `ToDoHyphen` | true | Ensures `to-do` is correctly hyphenated. |
| `ToGreatLengths` | true | Corrects `through great lengths` to `to great lengths`. |
| `ToLoseTooLoose` | true | Corrects mixing up `to` with `too` and `lose` with `loose`. |
| `ToSomeDegree` | true | Corrects `in some degree` to `to some degree`, meaning to a certain extent. |
| `ToTheMannerBorn` | true | Corrects `to the manor born` to `to the manner born`, ensuring the intended meaning of being naturally suited to a way of life. |
| `ToTo` | true | Corrects the typo `to to` by either removing the duplication or changing it to `to do`. |
| `ToTooIdioms` | true | Corrects `to` used instead of `too`. |
| `ToTwoToo` | true | Corrects homophone confusion between `to` and `too`. |
| `ToWorryAbout` | true | Fixes incorrect use of `to worried about`. |
| `TomorrowPossessiveModifier` | true | Flags `tomorrows` in attributive contexts and suggests the possessive form instead. |
| `TongueInCheek` | true | Corrects the idiom when `and` replaces the needed preposition. |
| `TooTo` | true | Corrects `too` used instead of `to`. |
| `ToteTout` | true | Flags places where `tote` and `tout` may be confused. |
| `Touristic` | true | Suggests replacing the uncommon word `touristic` with `tourist`, `tourism`, and/or `touristy`. |
| `Towards` | true | Removes redundant `to` before `towards`. |
| `TransposedSpace` | true | Looks for a space one character too early or too late between words. |
| `TrialAndError` | true | Corrects `trail` to `trial` in `trial and error`. |
| `TrueToWord` | true | Normalizes phrasing around `true to <possessive>` so it follows the conventional `true to one's word`. |
| `TruthToTheFact` | true | Flags the redundant phrase `truth to the fact`. |
| `TryOnesHandAt` | true | Corrects `try one's hands at` to `try one's hand at`. |
| `TryOnesLuck` | true | Corrects `try out one’s luck` to `try one’s luck` |
| `TuffEnough` | true | The adjective `tough` pairs with words like `enough` or `like`, so correct the common typo `tuff` in those constructions. |
| `TumblrNames` | true | Ensure proper capitalization of Tumblr-related terms. |
| `TurnItOff` | true | Fixes the mistake in the phrase `turn it off`. |
| `USUniversities` | true | Ensure proper capitalization of major universities in the United States. |
| `UnclosedQuotes` | true | Quotation marks should always be closed. Unpaired quotation marks are a hallmark of sloppy work. |
| `Underclock` | true | Looks for incorrect spacing inside the closed compound `underclock`. |
| `UnderneathOf` | true | Corrects `underneath of`. |
| `UnitedOrganizations` | true | When referring to national or international organizations, make sure to treat them as a proper noun. |
| `Unless` | true | Corrects `unless if`. |
| `UpdatePlaceNames` | true | This rule looks for deprecated place names and offers to update them. |
| `Upset` | true | Looks for incorrect spacing inside the closed compound `upset`. |
| `Upward` | true | Looks for incorrect spacing inside the closed compound `upward`. |
| `UseEllipsisCharacter` | true | Replaces three-period ellipses with the single Unicode ellipsis character. |
| `UseTitleCase` | true | Prompts you to use title case in relevant headings. |
| `UseToUsedTo` | true | Corrects `use to` to `used to` when meaning accustomed to (after forms of `be` or `get`). |
| `VerbToAdjective` | true | Looks for article-led gerund noun phrases like `a fully accounting of`, where an adjective is more likely than an adverb. |
| `VerseAsVerb` | true | Corrects the nonstandard use of `verse` as a verb (from `versus`) to standard alternatives. |
| `VeryKnown` | true | `very well-known` (or `well-known`) is the standard way to describe something widely recognized, so we flag the uncommon `very known` word pair. |
| `VeryLess` | true | Corrects adverbs of degree (`too`, `very`, etc.) used with `less` mostly in the writing of native German speakers.` |
| `VeryMuchSo` | true | `Very much` already intensifies the verb, so the trailing `so` is redundant. `Very much so` only reads correctly when the `so` refers back to something earlier, as in the reply `Yes, very much so.` |
| `VeryUnique` | true | Flags phrases like `very unique`, `pretty unique`, etc., and suggests using `unique` alone or a more precise adjective such as `special`, `rare`, or `unusual`. |
| `ViceVersa` | true | Recommends writing ‘vice versa’ without hyphens. |
| `ViciousCircle` | true | Corrects and standardizes common errors and variants of `vicious/virtuous circle`. |
| `ViciousCircleOrCycle` | false | Corrects common errors in `vicious/virtuous circle/cycle`. |
| `ViciousCycle` | false | Corrects and standardizes common errors and variants of `vicious/virtuous cycle`. |
| `WaistWaste` | true | Corrects misspelling `waste` (careless use) as `waist` (body part). |
| `WantBe` | true | Detects incorrect usage of `want be` and suggests `won't be` or `want to be` based on context. |
| `WasAloud` | true | Ensures `was aloud` and `were aloud` are corrected to `was allowed` or `were allowed` when referring to permission. |
| `WasComprisedOf` | true | Rewrites the fixed phrase `was comprised of` to a more widely accepted form. |
| `WaveFunction` | true | Identifies the mistake of merging `wave` and `function` into one word. In quantum mechanics, a `wave function` (written as two words) describes the mathematical function that represents the quantum state of a particle or system. Correct usage is crucial for clear and accurate scientific communication. |
| `WayTooAdjective` | true | Replaces the preposition `to` with the adverb `too` after `way` when followed by an adjective (e.g. `way too fast`) |
| `WebScraping` | true | Corrects `scrapping` the web to `scraping`. |
| `WellBeing` | true | Ensures `well-being` is correctly hyphenated. |
| `WellEducated` | true | Replaces `good-educated` with the accepted compound `well-educated`. |
| `WellKept` | true | Flags `highly-kept` and recommends `well-kept` as an alternative. |
| `WereWhere` | true | Detects mixing up `were` and `where`. |
| `Whereas` | true | The Whereas rule is designed to identify instances where the phrase `where as` is used in text and suggests replacing it with the single word `whereas`. |
| `Whereupon` | true | Looks for incorrect spacing inside the closed compound `whereupon`. |
| `WhetYourAppetite` | true | Ensures `whet your appetite` is used correctly, distinguishing it from the incorrect `wet` variation. |
| `WholeEntire` | true | Corrects the redundancy in `whole entire` to `whole` or `entire`. |
| `WhomSubjectOfVerb` | true | Detects whom and its variants used as the subject of a verb instead of who. |
| `WidelyAccepted` | true | Flags `wide accepted`, `wide acceptable`, or `wide used` and recommends switching `wide` to the adverb `widely`. |
| `Widespread` | true | Looks for incorrect spacing inside the closed compound `widespread`. |
| `WillContain` | true | Incorrect verb form: `will` should be followed by the base form `contain`. |
| `WillNonLemma` | true | Flags wrong verb forms after `will` or `shall` |
| `WinPrize` | true | Catches the mix-up between `price`/`prise` and `prize` after the verb `win`. |
| `WishCould` | true | Checks for `can` being used after `wish` when it should be `could`. |
| `WithOpenArms` | true | Corrects wrong variants of the idiom `welcome/greet with open arms`. |
| `Without` | true | Looks for incorrect spacing inside the closed compound `without`. |
| `WithoutOut` | true | When writers accidentally type `without out`, Harper can collapse the two words back into the single preposition. |
| `WokVerbTypo` | true | Flags likely typo cases where `wok` appears where the verb `work` is expected. |
| `WordPressDotcom` | true | Ensures correct capitalization of WordPress.com. This rule verifies that the official stylization of WordPress.com is used when referring to the hosting provider. |
| `Worldwide` | true | Looks for incorrect spacing inside the closed compound `worldwide`. |
| `WorseOrWorst` | true | Corrects `worse` and `worst` used in contexts where the other belongs. |
| `WorstCaseScenario` | true | Corrects `worst-case scenario` when the hyphen is missing or `worse` is used instead of `worst`. |
| `WorthToDo` | true | Corrects `worth to` + a verb to `worth` + the gerund of the verb. |
| `Worthwhile` | true | Looks for incorrect spacing inside the closed compound `worthwhile`. |
| `WouldNeverHave` | true | Corrects `would/could have never` to `never would/could have`. |
| `WreakHavoc` | true | Corrects the eggcorn `wreck havoc` to `wreak havoc`, which is the proper term for causing chaos or destruction. |
| `WrongApostrophe` | true | Corrects semicolons, acute accents, and backticks typed instead of apostrophes. |
| `WrongNegative` | true | If an unknown word looks like it might be a negative word, suggests correct words that are in the dictionary. |
| `WroteToRote` | true | Corrects `by wrote` to `by rote`. |
| `WroughtIron` | true | `Wrought iron` is low-carbon, malleable iron used for decorative work; variants like `rod iron` or `rot iron` are phonetic misspellings that may confuse readers. |
| `YeaToYeah` | true | Corrects `yea` to `yeah`. |
| `YehToYeah` | true | Corrects `yeh` to `yeah`. |
| `YourOutClauseAgreement` | true | Corrects `your` when it appears where a subject-plus-verb contraction is intended before `out` and a following preposition. |
| `YourPredicateAdjective` | true | Catches cases where a predicate adjective follows `your`, `yr`, `ur`, or `ya` and suggests the proper contraction so the sentence states how someone is feeling or behaving. |
| `Yourself` | true | Looks for incorrect spacing inside the closed compound `yourself`, while skipping hyphenated `self-...` compounds. |
