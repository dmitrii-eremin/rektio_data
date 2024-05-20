/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const database = [
  {
    "search_term": "tahtoa",
    "translation": "TAHTOA (verbi, transit)",
    "cases": [
      "tahtoa + V 1. inf"
    ],
    "examples": [
      "Tahdon oppia suomea.",
      "Hän tahtoi lähteä kotiin."
    ]
  },
  {
    "search_term": "taipumus",
    "translation": "TAIPUMUS (subst)",
    "cases": [
      "taipumus + N ill",
      "taipumus + N tra",
      "taipumus + V 1. inf"
    ],
    "examples": [
      "Hänellä on selvästi taipumuksia urheiluun.",
      "Hänellä on taipumuksia balettitanssijaksi.",
      "Asioilla on taipumus järjestyä tavalla tai toisella.",
      "Minulla on taipumus lihoa (= lihon helposti)."
    ]
  },
  {
    "search_term": "taipuvainen",
    "translation": "TAIPUVAINEN (adj)",
    "cases": [
      "taipuvainen + N ill",
      "taipuvainen + V -mAAn"
    ],
    "examples": [
      "Hän on taipuvainen liioitteluun.",
      "Olen taipuvainen lihomaan.",
      "Hän on taipuvainen liioittelemaan asioita."
    ]
  },
  {
    "search_term": "taistella",
    "translation": "TAISTELLA (verbi, transit)",
    "cases": [
      "taistella + N ela",
      "taistella + N gen + puolesta",
      "taistella + N par + vastaan"
    ],
    "examples": [
      "Sotilaat taistelivat voitosta.",
      "Joukkue taisteli Suomen mestaruudesta.",
      "Taistelemme vapauden puolesta.",
      "Hän taistelee vakavaa sairautta vastaan.",
      "He taistelivat mestaruudesta naapurijoukkuetta vastaan."
    ]
  },
  {
    "search_term": "taistelu",
    "translation": "TAISTELU (subst)",
    "cases": [
      "taistelu + N ela",
      "taistelu + N gen + puolesta",
      "taistelu + N par + vastaan"
    ],
    "examples": [
      "Elämä oli taistelua jokapäiväisestä leivästä.",
      "Taistelu rauhan puolesta jatkuu.",
      "Taistelu huumeita vastaan tuntuu toivottomalta."
    ]
  },
  {
    "search_term": "taitaa",
    "translation": "TAITAA (verbi, transit)",
    "cases": [
      "taitaa + V 1. inf"
    ],
    "examples": [
      "Taidan ostaa (= luultavasti ostan) auton.",
      "Hän on tainnut jo lähteä kotiin."
    ]
  },
  {
    "search_term": "taitava",
    "translation": "TAITAVA (adj)",
    "cases": [
      "taitava + V -mAAn"
    ],
    "examples": [
      "Hän on taitava tekemään ruokaa."
    ]
  },
  {
    "search_term": "taito",
    "translation": "TAITO (subst)",
    "cases": [
      "taito + V 1. inf"
    ],
    "examples": [
      "Kadehdin Liisan taitoa saada kaikki hyvälle tuulelle.",
      "Hänellä on taito kertoa asiat selkeästi."
    ]
  },
  {
    "search_term": "tajuta",
    "translation": "TAJUTA (verbi, transit)",
    "cases": [
      "tajuta + V 1. inf",
      "tajuta + että-lause"
    ],
    "examples": [
      "Tajusin (= ymmärsin) olla hiljaa.",
      "Etkö tajua, että asia on vakava?"
    ]
  },
  {
    "search_term": "tallentaa",
    "translation": "TALLENTAA (verbi, transit)",
    "cases": [
      "tallentaa + N ill/all"
    ],
    "examples": [
      "Opiskelijoiden henkilötiedot on tallennettu rekisteriin.",
      "Roope on tallentanut kaikki Bond-filmit videolle.",
      "Tallensin konsertin nauhaan / nauhalle."
    ]
  },
  {
    "search_term": "tallettaa",
    "translation": "TALLETTAA (verbi, transit)",
    "cases": [
      "tallettaa + V ill/all"
    ],
    "examples": [
      "Talletan rahat heti pankkiin.",
      "Talletin tililleni tuhat markkaa."
    ]
  },
  {
    "search_term": "tapa",
    "translation": "TAPA (subst)",
    "cases": [
      "tapa + V 1. inf"
    ],
    "examples": [
      "Minulla on tapana polttaa yksi savuke ruoan jälkeen.",
      "En pidä hänen tavastaan arvostella muita ihmisiä."
    ]
  },
  {
    "search_term": "tapahtua",
    "translation": "TAPAHTUA (verbi, intransit)",
    "cases": [
      "tapahtua + N ine/ade",
      "tapahtua + N all"
    ],
    "examples": [
      "Mitä kotimaassa on tapahtunut?",
      "Maan ilmapiirissä on tapahtunut selvä muutos parempaan.",
      "Mitä ihmettä tuolla kadulla tapahtuu?",
      "Olet kalpea, mitä sinulle on tapahtunut?",
      "Onneksi lapsille ei tapahtunut mitään vahinkoa."
    ]
  },
  {
    "search_term": "tapella",
    "translation": "TAPELLA (verbi, intransit)",
    "cases": [
      "tapella + N ela"
    ],
    "examples": [
      "Pojat tappelivat pallosta. Mistä te taas tappelette?"
    ]
  },
  {
    "search_term": "tarjoilla",
    "translation": "TARJOILLA (verbi, transit)",
    "cases": [
      "tarjoilla + N ill/all"
    ],
    "examples": [
      "Baarissa on itsepalvelu, siellä ei tarjoilla pöytiin.",
      "Naisille tarjoillaan ensin, sitten vasta miehille."
    ]
  },
  {
    "search_term": "tarjota",
    "translation": "TARJOTA (verbi, transit)",
    "cases": [
      "tarjota + N ill/all",
      "tarjota + N ela"
    ],
    "examples": [
      "Täällä ei tarjota pöytiin, täällä on itsepalvelu.",
      "Hän tarjosi minulle ihanan päivällisen Ritzissä.",
      "Televisio ei tarjoa lapsille juuri mitään.",
      "Tarjosin talosta puoli miljoonaa.",
      "Mitä tästä autosta tarjotaan?"
    ]
  },
  {
    "search_term": "tarkistaa",
    "translation": "TARKISTAA (verbi, transit)",
    "cases": [
      "tarkistaa + N ela/abl"
    ],
    "examples": [
      "Tarkista sanakirjasta sanan oikeinkirjoitus.",
      "Tarkistakaa kurssin aika opinto-oppaasta tai sihteeriltä.",
      "Tarkista tästä!"
    ]
  },
  {
    "search_term": "tarkka",
    "translation": "TARKKA (adj)",
    "cases": [
      "tarkka + N ela",
      "tarkka + V -mAAn"
    ],
    "examples": [
      "Firma on hyvin tarkka tuotteensa laadusta.",
      "Kissat ovat tarkkoja siisteydestään.",
      "Hän on hyvin tarkka rahoistaan.",
      "Hän on tarkka huomaamaan pienetkin virheet."
    ]
  },
  {
    "search_term": "tarkkailla",
    "translation": "TARKKAILLA (verbi, transit)",
    "cases": [
      "tarkkailla + O par"
    ],
    "examples": [
      "YK:n joukot tarkkailevat tilannetta.",
      "Poliisi tarkkailee liikennettä."
    ]
  },
  {
    "search_term": "tarkoittaa",
    "translation": "TARKOITTAA (verbi, transit)",
    "cases": [
      "tarkoittaa + O par",
      "tarkoittaa + V 1. inf",
      "tarkoittaa + että-lause"
    ],
    "examples": [
      "Mitä sinä tarkoitat?",
      "Anna anteeksi. En tarkoittanut mitään pahaa.",
      "Englannin sana ‘car* tarkoittaa (= merkitsee) autoa.",
      "Anteeksi, en tarkoittanut (= halunnut) loukata.",
      "Tarkoitatko, että minä olen tyhmä?"
    ]
  },
  {
    "search_term": "tarkoitus",
    "translation": "TARKOITUS (subst)",
    "cases": [
      "tarkoitus + V 1. inf"
    ],
    "examples": [
      "Musiikin tarkoitus on viihdyttää.",
      "Oli tarkoitus (= aikomus) lähteä ulos.",
      "Anteeksi, ei ollut tarkoitus loukata."
    ]
  },
  {
    "search_term": "tarttua",
    "translation": "TARTTUA (verbi, intransit)",
    "cases": [
      "tarttua + N ill"
    ],
    "examples": [
      "Virus tarttuu herkästi lapsiin ja vanhuksiin.",
      "Tupakansavu tarttuu vaatteisiin.",
      "Tartu tilaisuuteen!",
      "Huom! Hän tarttui (= otti) minua kädestä."
    ]
  },
  {
    "search_term": "tarve",
    "translation": "TARVE (subst)",
    "cases": [
      "tarve + V 1. inf"
    ],
    "examples": [
      "Ei ole tarvetta ostaa uutta autoa.",
      "Hänellä on tarve miellyttää kaikkia."
    ]
  },
  {
    "search_term": "tarvita",
    "translation": "TARVITA (verbi, transit)",
    "cases": [
      "tarvita + N ill",
      "N gen + ei tarvitse + V 1. inf",
      "ei tarvitse + V 1. inf"
    ],
    "examples": [
      "Tarvitsemme rahaa autoon.",
      "Mihin te tätä tarvitsette?",
      "Meidän ei tarvitse lähteä vielä.",
      "Eikö sinun tarvinnut hankkia viisumia?",
      "Hänen ei tarvinnut maksaa sakkoa.",
      "Tätä ei tarvitse tehdä tänään.",
      "Laskua ei tarvinnut maksaa heti."
    ]
  },
  {
    "search_term": "tavata",
    "translation": "TAVATA (verbi, transit)",
    "cases": [
      "tavata + N ine/ade"
    ],
    "examples": [
      "Tapasin hänet Englannissa.",
      "Tavataanko asemalla huomenna klo 18?"
    ]
  },
  {
    "search_term": "teettää",
    "translation": "TEETTÄÄ (verbi, transit)",
    "cases": [
      "teettää + N ela"
    ],
    "examples": [
      "Teetin kankaasta takin.",
      "Teettäkää tästä valokuvasta suurennos!"
    ]
  },
  {
    "search_term": "tehdä",
    "translation": "TEHDÄ (verbi, transit)",
    "cases": [
      "tehdä + N ela",
      "tehdä + O + N ill/all",
      "tehdä + O + N tra"
    ],
    "examples": [
      "Olenko nyt tehnyt asian teille selväksi?",
      "Mitä aiot tehdä tuosta kankaasta?",
      "Teen tästä takin Veeralle.",
      "Tein saunaan uuden penkin.",
      "Isä teki pihalle keinun.",
      "Tein ruoan valmiiksi.",
      "Hän teki minut onnelliseksi."
    ]
  },
  {
    "search_term": "tehostaa",
    "translation": "TEHOSTAA (verbi, transit)",
    "cases": [
      "tehostaa + O par"
    ],
    "examples": [
      "Romanttinen musiikki tehosti tunnelmaa.",
      "Poliisi tehostaa valvontaa."
    ]
  },
  {
    "search_term": "tehota",
    "translation": "TEHOTA (verbi, intransit)",
    "cases": [
      "tehota + N ill"
    ],
    "examples": [
      "Antibiootti ei tehoa tähän tautiin.",
      "Tehoaisiko tämä pesuaine kahvitahroihin?",
      "Järkipuhekaan ei tehoa häneen."
    ]
  },
  {
    "search_term": "teititella",
    "translation": "TEITITELLA (verbi, transit)",
    "cases": [
      "teititellä + O par"
    ],
    "examples": [
      "Minä teitittelen aina vanhempaa ihmistä, jota en tunne.",
      "Hän teititteli minua."
    ]
  },
  {
    "search_term": "tervehtiä",
    "translation": "TERVEHTIÄ (verbi, transit)",
    "cases": [
      "tervehtiä + O par"
    ],
    "examples": [
      "Hän tervehtii minua aina.",
      "He tervehtivät toisiaan."
    ]
  },
  {
    "search_term": "teoria",
    "translation": "TEORIA (subst)",
    "cases": [
      "teoria + N ela"
    ],
    "examples": [
      "Kuka esitti ensimmäisenä teorian lajien synnystä?",
      "Artikkelissa on mielenkiintoisia teorioita Suomen asuttamisesta."
    ]
  },
  {
    "search_term": "tie",
    "translation": "TIE (subst)",
    "cases": [
      "tie + N ill/all",
      "tie + N ela/abl"
    ],
    "examples": [
      "Onko tämä lyhin tie kaupunkiin?",
      "Voisitteko neuvoa minulle tien Kauppatorille?",
      "Tie vuoren huipulle oli pitkä ja mutkikas.",
      "Tie kaupungista vuoren huipulle oli mutkainen."
    ]
  },
  {
    "search_term": "tiedottaa",
    "translation": "TIEDOTTAA (verbi, transit)",
    "cases": [
      "tiedottaa + N ela"
    ],
    "examples": [
      "Asiasta tiedotetaan ensi viikolla."
    ]
  },
  {
    "search_term": "tiedustella",
    "translation": "TIEDUSTELLA (verbi, transit)",
    "cases": [
      "tiedustella + O par",
      "tiedustella + N ela/abl"
    ],
    "examples": [
      "Oletko jo tiedustellut matkan hintaa?",
      "Voitte tiedustella asiaa viikon kuluttua.",
      "Tiedustele hintaa matkatoimistosta!",
      "Tiedustelin asiaa sihteeriltä."
    ]
  },
  {
    "search_term": "tietää",
    "translation": "TIETÄÄ (verbi, transit)",
    "cases": [
      "tietää + N ela",
      "tietää + että-lause"
    ],
    "examples": [
      "Saimme tiedon Kaukon kuolemasta vasta viime viikolla.",
      "Tiedän asiasta jotakin.",
      "Mistä sinä sen tiedät? Luitko lehdestä?",
      "Tiedän, että Paavo on kotona."
    ]
  },
  {
    "search_term": "tieto",
    "translation": "TIETO (subst)",
    "cases": [
      "tieto + N ela"
    ],
    "examples": [
      "Minulla ei ole mitään tietoa tästä asiasta.",
      "En tiennyt, että Elsa on muuttanut ulkomaille.",
      "Saimme tilaisuuden käydä savusaunassa."
    ]
  },
  {
    "search_term": "tilaisuus",
    "translation": "TILAISUUS (subst)",
    "cases": [
      "tilaisuus + V 1. inf"
    ],
    "examples": [
      "Nyt teillä on tilaisuus sanoa oma mielipiteenne asiasta."
    ]
  },
  {
    "search_term": "tilata",
    "translation": "TILATA (verbi, transit)",
    "cases": [
      "tilata + N ill/all",
      "tilata + N ela/abl"
    ],
    "examples": [
      "Tilasimme kaksi pitsaa kotiin.",
      "Tilaan taksin lentokentälle.",
      "Voitte tilata tiput matkatoimistosta.",
      "Taksin voi tilata asemalta."
    ]
  },
  {
    "search_term": "todeta",
    "translation": "TODETA (verbi, transit)",
    "cases": [
      "todeta + O + N tra",
      "todeta + että-lause"
    ],
    "examples": [
      "Lääkäri totesi miehen kuolleeksi.",
      "Totesin tehtävän liian vaikeaksi.",
      "Puheenjohtaja totesi, että kaikki olivat paikalla.",
      "Totesimme, että konetta ei voi korjata."
    ]
  },
  {
    "search_term": "todistaa",
    "translation": "TODISTAA (verbi, transit)",
    "cases": [
      "todistaa + O + N tra",
      "todistaa + että-lause"
    ],
    "examples": [
      "Hän todisti väitteen vääräksi.",
      "Voitteko todistaa nimikirjoituksen oikeaksi?",
      "Voitko todistaa, että olen väärässä?"
    ]
  },
  {
    "search_term": "todiste",
    "translation": "TODISTE (subst)",
    "cases": [
      "todiste + N ela"
    ],
    "examples": [
      "Runokirja on todiste kirjailijan lahjakkuudesta.",
      "Poliisilla on selvät todisteet rikoksesta."
    ]
  },
  {
    "search_term": "todistus",
    "translation": "TODISTUS (subst)",
    "cases": [
      "todistus + N ela"
    ],
    "examples": [
      "Saatte todistuksen kurssista.",
      "Tarvitsen todistuksen suomen kielen taidosta.",
      "Myös: kurssitodistus, kielitaitotodistus"
    ]
  },
  {
    "search_term": "toipua",
    "translation": "TOIPUA (verbi, intransit)",
    "cases": [
      "toipua + N ela"
    ],
    "examples": [
      "Hän toipui sairaudesta nopeasti.",
      "Hän ei ole vielä toipunut surustaan."
    ]
  },
  {
    "search_term": "toive",
    "translation": "TOIVE (subst)",
    "cases": [
      "toive + N ela",
      "toive + V 1. inf"
    ],
    "examples": [
      "Toive rauhasta tuntuu turhalta, isoisän paranemisesta ei ole toiveita.",
      "Hänen suurin toiveensa saada lottovoitto toteutui.",
      "Hänellä on toiveita päästä työhön."
    ]
  },
  {
    "search_term": "toivo",
    "translation": "TOIVO (subst)",
    "cases": [
      "toivo + N ela",
      "toivo + V 1. inf"
    ],
    "examples": [
      "Rauhasta ei ole toivoakaan.",
      "Toivo sodan loppumisesta osoittautui turhaksi.",
      "Lääkäri ei antanut toivoa paranemisesta.",
      "Minulla on toivoa saada apuraha."
    ]
  },
  {
    "search_term": "toivoa",
    "translation": "TOIVOA (verbi, transit)",
    "cases": [
      "toivoa + O par",
      "toivoa + että-lause"
    ],
    "examples": [
      "Ville toivoo polkupyörää joululahjaksi.",
      "Toivotaan parasta, kyllä kaikki varmaan menee hyvin.",
      "Ville toivoo, että hän saisi polkupyörän lahjaksi."
    ]
  },
  {
    "search_term": "toivottaa",
    "translation": "TOIVOTTAA (verbi, transit)",
    "cases": [
      "toivottaa + O par",
      "toivottaa + N all"
    ],
    "examples": [
      "Toivotan teille onnea ja menestystä.",
      "Toivotimme heille hyvää matkaa.",
      "Toivotan työllesi menestystä."
    ]
  },
  {
    "search_term": "totella",
    "translation": "TOTELLA (verbi, transit) — слушаться",
    "cases": [
      "totella + O par"
    ],
    "examples": [
      "Tottele minua!"
    ]
  },
  {
    "search_term": "tottua",
    "translation": "TOTTUA (verbi, intransit) — привыкнуть",
    "cases": [
      "tottua + N ill",
      "tottua + V -mAAn"
    ],
    "examples": [
      "Oletko jo tottunut suomalaiseen ruokaan?",
      "Olen tottunut Suomen talveen: lumeen ja pakkaseen.",
      "Olen tottunut nousemaan joka aamu kello 6.",
      "Totuin polttamaan tupakkaa armeijassa."
    ]
  },
  {
    "search_term": "totuttaa",
    "translation": "TOTUTTAA (verbi, transit) — приучить",
    "cases": [
      "totuttaa + N ill",
      "totuttaa + O + V -mAAn"
    ],
    "examples": [
      "Vuosi Suomessa on totuttanut minut lumeen ja pakkaseen.",
      "Hän totutti minut nousemaan aikaisin aamulla."
    ]
  },
  {
    "search_term": "tuhlata",
    "translation": "TUHLATA (verbi, transit) — потратить",
    "cases": [
      "tuhlata + N ill"
    ],
    "examples": [
      "Leena tuhlasi rahansa vaatteisiin.",
      "Älä tuhlaa aikaasi tuollaiseen!"
    ]
  },
  {
    "search_term": "tuijottaa",
    "translation": "TUIJOTTAA (verbi, transit) — глазеть",
    "cases": [
      "tuijottaa + O par"
    ],
    "examples": [
      "Joku mies tuijotti minua metrossa koko matkan.",
      "Kalervo ei tee muuta kuin tuijottaa televisiota kaiket illat."
    ]
  },
  {
    "search_term": "tukea",
    "translation": "TUKEA (verbi, transit) — поддерживать",
    "cases": [
      "tukea + O par"
    ],
    "examples": [
      "Vanhemmat tukivat lasta kaikessa.",
      "Tutkimustulos tukee väitettä."
    ]
  },
  {
    "search_term": "tulla",
    "translation": "TULLA (verbi, intransit)",
    "cases": [
      "tulla + N ela/abl",
      "tulla + N ill/all",
      "tulla + V -mAAn",
      "tulla + V -mAstA",
      "tulla + N ela",
      "tulla + N tra — стать (каким-либо)",
      "tulla toimeen + N gen + kanssa",
      "tulla toimeen + N ade",
      "N gen + tulee + V 1. inf"
    ],
    "examples": [
      "Tuiin eilen Lontoosta.",
      "Hän tulee Tampereetta huomenna.",
      "Milloin tulet Helsinkiin?",
      "Tulkaa joskus meille Tampereelle.",
      "Tulkaa meille syömään.",
      "Tule tähän istumaan!",
      "Johtaja tulee syömästä klo 13.",
      "Mikosta tuli lääkäri.",
      "Tuleeko tästä mitään?",
      "Tästä ei tule mitään.",
      "Tulin iloiseksi, kun Jussi soitti. — Я обрадовался, когда Юсси позвонил.",
      "Ilma on tullut kylmäksi. — Погода стала холодной.",
      "Helena tulee toimeen kaikkien ihmisten kanssa.",
      "Suomessa tulee toimeen (= pärjää) englannilla. — В Финляндии можно справиться с помощью английского языка.",
      "Tuletko toimeen sadalla markalla päivässä? — Ты обходишься стами марками в день?",
      "Teidän tulee (= täytyy) hankkia oleskelulupa.",
      "Ruoan tulisi olla monipuolista."
    ]
  },
  {
    "search_term": "tunnistaa",
    "translation": "TUNNISTAA (verbi, transit) — узнать, опознать",
    "cases": [
      "tunnistaa + N ela",
      "tunnistaa + N tra"
    ],
    "examples": [
      "Tunnistin hänet äänestä.",
      "Ruumis tunnistettiin keväällä kadonneeksi mieheksi. — Труп опознали как весной пропавшего мужчину."
    ]
  },
  {
    "search_term": "tuntea",
    "translation": "TUNTEA (verbi, transit) — чувствовать",
    "cases": [
      "tuntea + O par + N par + kohtaan",
      "tuntea itse(nsä) + N tra",
      "tuntea + A + ela — узнать кого-то по какому-то признаку"
    ],
    "examples": [
      "Tunnen sympatiaa häntä kohtaan.",
      "Kaikki tunsivat sääliä heitä kohtaan.",
      "Tunnen itseni jo aivan terveeksi.",
      "Mikko tunsi itsensä ihan hölmöksi.",
      "Tunsin hänet äänesta. — Я узнал его по голосу."
    ]
  },
  {
    "search_term": "tuntua",
    "translation": "TUNTUA (verbi, intransit)",
    "cases": [
      "tuntua + N abl"
    ],
    "examples": [
      "Miltä tämä tehtävä tuntuu?",
      "Tehtävä tuntui hyvin vaikealta.",
      "Hän tuntuu mukavatta ihmiseltä.",
      "Tuntuu siltä, että kohta alkaa sataa."
    ]
  },
  {
    "search_term": "tuoda",
    "translation": "TUODA (verbi, transit)",
    "cases": [
      "tuoda + N ill/all",
      "tuoda + N ela/ab",
      "ltuoda + V -mAAn"
    ],
    "examples": [
      "Hän toi minut kotiin.",
      "Kalevi toi minut asemalle autolla.",
      "Tuo jäätelöä kaupasta!",
      "Tuokaa jäätelöä kioskilta!"
    ]
  },
  {
    "search_term": "tuoksua",
    "translation": "TUOKSUA (verbi, intransit)",
    "cases": [
      "tuoksua + abl/all"
    ],
    "examples": [
      "Isä toi lapset koulusta kotiin syömään.",
      "Miltä tämä tuoksuu?",
      "Ruusut tuoksuvat hyvältä.",
      "Mille se tuoksuu?",
      "Se tuoksuu mintulle."
    ]
  },
  {
    "search_term": "tuomio",
    "translation": "TUOMIO (subst)",
    "cases": [
      "tuomio + N ela"
    ],
    "examples": [
      "Mies sai tuomion raiskauksesta."
    ]
  },
  {
    "search_term": "tuomita",
    "translation": "TUOMITA (verbi, transit)",
    "cases": [
      "tuomita + N ela",
      "tuomita + N ill",
      "tuomita + O + V -mAAn"
    ],
    "examples": [
      "Hänet tuomittiin raiskauksesta.",
      "Mies tuomittiin vankilaan kuudeksi vuodeksi.",
      "Hänet tuomittiin sakkoihin.",
      "Nainen tuomittiin maksamaan 3 000 markkaa sakkoa."
    ]
  },
  {
    "search_term": "turhautua",
    "translation": "TURHAUTUA (verbi, intransit)",
    "cases": [
      "turhautua + N ill",
      "turhautua + V -mAAn"
    ],
    "examples": [
      "Olen turhautunut byrokratiaan.",
      "Markus turhautui työhönsä ja vaihtoi alaa.",
      "Olen turhautunut tekemään samaa työtä päivästä toiseen."
    ]
  },
  {
    "search_term": "turvautua",
    "translation": "TURVAUTUA (verbi, intransit)",
    "cases": [
      "turvautua + N ill"
    ],
    "examples": [
      "Hän turvautui asiantuntijan apuun.",
      "Älä turvaudu väkivaltaan!"
    ]
  },
  {
    "search_term": "tutustua",
    "translation": "TUTUSTUA (verbi, intransit)",
    "cases": [
      "tutustua + N ill"
    ],
    "examples": [
      "Liisa tutustui Jussiin Roomassa. En ole tutustunut asiaan."
    ]
  },
  {
    "search_term": "tykätä",
    "translation": "TYKÄTÄ (verbi, transit)",
    "cases": [
      "tykätä + N ela",
      "tykätä + V 1. inf"
    ],
    "examples": [
      "Millaisesta musiikista hän tykkää?",
      "Tykkäätkö sinä saunasta?",
      "En tykkää uimisesta.",
      "Huom! Mitä tykkäät (= mitä mieltä olet) tästä?",
      "En tykkää uida.",
      "Tykkään käydä saunassa.",
      "Lapsena tykkäsin hiihtää."
    ]
  },
  {
    "search_term": "tyydyttää",
    "translation": "TYYDYTTÄÄ (verbi, transit)",
    "cases": [
      "tyydyttää + O par"
    ],
    "examples": [
      "Tyydyttääkö tämä ratkaisu teitä?",
      "Selitys ei tyydytä minua.",
      "Tuo on hyvin tyypillistä sinulle.",
      "Väitetään, että empaattisuus on tyypillistä naisille."
    ]
  },
  {
    "search_term": "tyypillinen",
    "translation": "TYYPILLINEN (adj)",
    "cases": [
      "tyypillinen + N ali"
    ],
    "examples": [
      "Ahdasmielisyys oli viktoriaaniselle ajalle tyypillinen piirre."
    ]
  },
  {
    "search_term": "tyytymättömyys",
    "translation": "TYYTYMÄTTÖMYYS (subst)",
    "cases": [
      "tyytymättömyys + N ill"
    ],
    "examples": [
      "Tyytymättömyys poliitikkoihin on lisääntynyt.",
      "Hän ilmaisi tyytymättömyytensä päätökseen."
    ]
  },
  {
    "search_term": "tyytymätön",
    "translation": "TYYTYMÄTÖN (adj)",
    "cases": [
      "tyytymätön + N ill"
    ],
    "examples": [
      "Olin tyytymätön tentin tulokseen."
    ]
  },
  {
    "search_term": "tyytyväinen",
    "translation": "TYYTYVÄINEN (adj)",
    "cases": [
      "tyytyväinen + N ill"
    ],
    "examples": [
      "He olivat tyytymättömiä tuomarin päätökseen.",
      "Ville oli tyytyväinen ratkaisuun.",
      "He olivat tyytyväisiä häneen."
    ]
  },
  {
    "search_term": "tyytyväisyys",
    "translation": "TYYTYVÄISYYS (subst)",
    "cases": [
      "tyytyväisyys + N par + kohtaan"
    ],
    "examples": [
      "Tyytyväisyys hallitusta kohtaan on hieman lisääntynyt."
    ]
  },
  {
    "search_term": "tyytyä",
    "translation": "TYYTYÄ (verbi, intransit)",
    "cases": [
      "tyytyä + N ill"
    ],
    "examples": [
      "Tyydymme tähän päätökseen.",
      "Hän tyytyi kohtaloonsa.",
      "Vaatimaton ihminen tyytyy vähään."
    ]
  },
  {
    "search_term": "työntää",
    "translation": "TYÖNTÄÄ (verbi, transit)",
    "cases": [
      "työntää + N ill/all"
    ],
    "examples": [
      "Työnsin tavarat kaappiin.",
      "Työnnä nämä vaatekaapin ylimmälle hyllylle!"
    ]
  },
  {
    "search_term": "tähdentää",
    "translation": "TÄHDENTÄÄ (verbi, transit)",
    "cases": [
      "tähdentää + O par"
    ],
    "examples": [
      "Haluaisin tähdentää tätä asiaa.",
      "Hän tähdensi sitä, että asia on tärkeä."
    ]
  },
  {
    "search_term": "täristä",
    "translation": "TÄRISTÄ (verbi, intransit)",
    "cases": [
      "täristä + N ela"
    ],
    "examples": [
      "Poika tärisi kylmästä.",
      "Kaija tärisi jännityksestä."
    ]
  },
  {
    "search_term": "täynnä",
    "translation": "TÄYNNÄ (adj)",
    "cases": [
      "täynnä + N par"
    ],
    "examples": [
      "Bussi oli aivan täynnä ihmisiä.",
      "Jääkaappi on täynnä ruokaa."
    ]
  },
  {
    "search_term": "täytyä",
    "translation": "TÄYTYÄ (verbi, transit)",
    "cases": [
      "N gen + täytyy + V 1. inf",
      "täytyy + V 1. inf"
    ],
    "examples": [
      "Minun täytyy lähteä kotiin.",
      "Täytyykö meidän hankkia viisumi?",
      "Kirjoituksen olisi täytynyt olla valmis jo eilen.",
      "Ikkuna täytyy pestä. Talot täytyi maalata.",
      "Nyt täytyy lähteä, kello on paljon."
    ]
  },
  {
    "search_term": "törmätä",
    "translation": "TÖRMÄTÄ (verbi, intransit)",
    "cases": [
      "törmätä + N ill"
    ],
    "examples": [
      "Auto törmäsi puuhun.",
      "Törmäsin häneen sattumalta kadulla."
    ]
  },
  {
    "search_term": "aavistus",
    "translation": "AAVISTUS (subst) — представление (о чем-либо)",
    "cases": [
      "aavistus + N ela"
    ],
    "examples": [
      "Hänellä oli heikko aavistus taudin laadusta.",
      "Minulla ei ole aavistustakaan siitä asiasta."
    ]
  },
  {
    "search_term": "ahdistaa",
    "translation": "AHDISTAA (verbi, transit) — давить (морально), страшить",
    "cases": [
      "ahdistaa + O par",
      "ahdistaa + V 1. inf"
    ],
    "examples": [
      "Huominen tentti ahdistaa minua.",
      "Opiskelijaa ahdisti (= pelotti) mennä tenttiin."
    ]
  },
  {
    "search_term": "ahdistua",
    "translation": "AHDISTUA (verbi, intransit) — падать духом, чувствовать страх",
    "cases": [
      "ahdistua + N ela"
    ],
    "examples": [
      "Liisa ahdistuu ylitöistä.",
      "Opiskelija ahdistui tentistä."
    ]
  },
  {
    "search_term": "ahdistunut",
    "translation": "AHDISTUNUT (adj) — удрученный",
    "cases": [
      "ahdistunut + N ela"
    ],
    "examples": [
      "He ovat hyvin ahdistuneita jatkuvasta työttömyydestä."
    ]
  },
  {
    "search_term": "ahkera",
    "translation": "AHKERA (adj) — старательный, прилежный",
    "cases": [
      "ahkera + V -mAAn"
    ],
    "examples": [
      "Auli on ahkera lukemaan."
    ]
  },
  {
    "search_term": "aihe",
    "translation": "AIHE (subst) — причина, основание (для чего-то)",
    "cases": [
      "aihe + N ill",
      "aihe + V 1. inf."
    ],
    "examples": [
      "Hän sai hyvän aiheen (= syyn) palata asiaan.",
      "Onko meillä aihetta kokoontua ensi viikolla?",
      "Teillä ei ole mitään aihetta valittaa.",
      "Minulla on jo aihe esitelmään.",
      "Meillä oli paljon aihetta iloon.",
      "Minun mielestäni ei ole mitään aihetta valitukseen.",
      "Myös: esitelmän, kirjoituksen, valituksen aihe"
    ]
  },
  {
    "search_term": "aiheuttaa",
    "translation": "AIHEUTTAA (verbi, transit) — вызывать, доставлять (проблемы), причинять",
    "cases": [
      "aiheuttaa + N ali"
    ],
    "examples": [
      "Tämä aiheuttaa meille paljon työtä.",
      "Sota aiheutti kansalle paljon surua ja kärsimystä.",
      "Tämä aiheuttaa sihteerille ison ongelman. — Это вызовет большую проблему для секретаря."
    ]
  },
  {
    "search_term": "aiheutua",
    "translation": "AIHEUTUA (verbi, intransit) — вызываться, причиняться",
    "cases": [
      "aiheutua + N ela"
    ],
    "examples": [
      "Tästä aiheutuu meille paljon työtä.",
      "Työttömyydesta aiheutuu monenlaisia ongelmia."
    ]
  },
  {
    "search_term": "aika",
    "translation": "AIKA (subst) — время, пора",
    "cases": [
      "aika + V 1. inf"
    ],
    "examples": [
      "Nyt on aika lähteä.",
      "AIKAANSAADA — достичь, добиться = SAADA AIKAAN",
      "A",
      "Kilpailijat saivat aikaan uuden ennätyksen.",
      "Sihteerin erehdys sai aikaan paniikin."
    ]
  },
  {
    "search_term": "aikoa",
    "translation": "AIKOA (verbi, transit) — собираться, намереваться",
    "cases": [
      "aikoa + V 1. inf",
      "aikoa + tra"
    ],
    "examples": [
      "Minä aion matkustaa Lappiin.",
      "Aioin juuri lähteä ulos, kun puhelin soi.",
      "Matti aikoo lääkäriksi. — Матти собирается стать врачом."
    ]
  },
  {
    "search_term": "aikomus",
    "translation": "AIKOMUS (subst) — намерение",
    "cases": [
      "aikomus + V 1. inf",
      "ajaa + P",
      "ajaa + ade",
      "ajaa + N"
    ],
    "examples": [
      "Minulla on aikomus (= tarkoitus) ostaa tietokone.",
      "Henrillä oli aikomus lähteä ulkomaille.",
      "AJAA — вести (машину), бриться",
      "Pekka ajaa autoa. — Пекка ведет машину.",
      "Pekka ajaa autolla. — Пекка едет на машине.",
      "Pekka ajaa parran aamuisin. — Пекка бреется по утрам."
    ]
  },
  {
    "search_term": "ajatella",
    "translation": "AJATELLA (verbi, transit) — думать",
    "cases": [
      "ajatella + O par",
      "ajatella + N ela",
      "ajatella + V1. inf",
      "ajatella + että-lause"
    ],
    "examples": [
      "Liisa ajattelee Jussia.",
      "Hän ajatteli asiaa kauan.",
      "Pessimisti ajattelee aina pahinta.",
      "Mitä ajattelet (= mitä mieltä olet) Liisasta?",
      "En tiedä, mitä ajattelisin tästä asiasta.",
      "Hän ajattetee jokaisesta ihmisestä hyvää (että jokainen ihminen on hyvä).",
      "Ajattelin (= suunnittelin) mennä elokuviin.",
      "He ovat ajatelleet muuttaa Riihimäelle.",
      "Ajattelin, että hän on sairas.",
      "Oletko ajatellut, että siitä voi tulla ongelmia?"
    ]
  },
  {
    "search_term": "ajatus",
    "translation": "AJATUS (subst) — мысль",
    "cases": [
      "ajatus + N ela",
      "ajatus + V 1. inf"
    ],
    "examples": [
      "Ajatus lähteä maalle oli hyvä.",
      "Ajatus lentomatkasta hermostutti häntä.",
      "Onko sinulla joitakin ajatuksia (= mielipiteitä) tästä asiasta?"
    ]
  },
  {
    "search_term": "alentaa",
    "translation": "ALENTAA (verbi, transit) — снизить, удешевить, понизить (в должности)",
    "cases": [
      "alentaa + O par",
      "alentaa + N ill",
      "alentaa + N tra"
    ],
    "examples": [
      "Kauppa alentaa tavaran hintaa 10 euroa. (= Tavara maksaa 10 euroa vähemmän.) Infiaatio alentaa rahan arvoa.",
      "Liike alentaa hinnan 25 euroon. (= Tavara maksaa nyt 25 euroa.)",
      "He alensivat liput viiteenkymmeneen markkaan.",
      "Hänet alennettiin apulaisjohtajaksi."
    ]
  },
  {
    "search_term": "alentua",
    "translation": "ALENTUA (verbi, intransit) — унизиться",
    "cases": [
      "alentua + V -mAAn"
    ],
    "examples": [
      "En voi alentua tekemään niin. Hän alentui pyytämään anteeksi.",
      "Seisoimme sillalla, kun juna meni meidän alitsemme."
    ]
  },
  {
    "search_term": "alistaa",
    "translation": "ALISTAA (verbi, transit) — подчинить, покорить",
    "cases": [
      "alistaa + N Hl",
      "alistua + N ill",
      "alistua + V -mAAn"
    ],
    "examples": [
      "En voi alistaa häntä siihen.",
      "Presidentti yritti alistaa hallituksen valtaansa.",
      "Sotilaat alistettiin kovaan kuriin.",
      "ALISTUA (verbt, intransit) — подчиниться, покориться",
      "Pekka alistui Liisan tahtoon. Hän alistui kohtaloonsa.",
      "Kansa alistui tekemään niin kuin kuningas käski. Ja niin minä alistuin tiskaamaan."
    ]
  },
  {
    "search_term": "alkaa",
    "translation": "ALKAA (verbi, transit) — начинать",
    "cases": [
      "alkaa + V 1. inf"
    ],
    "examples": [
      "Aurinko alkaa paistaa. — Солнце начинает светить.",
      "Alan opiskella filosofiaa syksyllä. — Я начну изучать философию осенью.",
      "Aloin sihteeriksi. — Я начал работать секретарем.",
      "ALLEKIRJOITTAA — подписать"
    ]
  },
  {
    "search_term": "allekirjoittaa",
    "translation": "allekirjoittaa (verbi, transit.) + N gen",
    "cases": [],
    "examples": [
      "Allekirjoitan sopimuksen. — Я подпишу договор."
    ]
  },
  {
    "search_term": "allerginen",
    "translation": "ALLERGINEN (adj) — аллергичный",
    "cases": [
      "allerginen + N ali"
    ],
    "examples": [
      "Potilas on allerginen penisilliinille. Olen vähän allerginen pölylle."
    ]
  },
  {
    "search_term": "aloittaa",
    "translation": "ALOITTAA (verbi, transit) — начать",
    "cases": [
      "aloittaa + V -minen"
    ],
    "examples": [
      "Kannattaa aloittaa ajoissa tenttiin lukeminen. — Стоит начать вовремя подготовку к экзамену.",
      "Aloitan suomen kielen opiskelemisen syyskuussa."
    ]
  },
  {
    "search_term": "altistaa",
    "translation": "ALTISTAA (verbi, transit) — подвергать",
    "cases": [
      "altistaa + N ali"
    ],
    "examples": [
      "Filmiä ei saa altistaa valolle."
    ]
  },
  {
    "search_term": "altistua",
    "translation": "ALTISTUA (verbi, intransit) — подвергаться",
    "cases": [
      "altistua + N ali."
    ],
    "examples": [
      "Vanhus ei saa altistua influenssalle."
    ]
  },
  {
    "search_term": "ampua",
    "translation": "AMPUA (verbi, transit.) — стрелять",
    "cases": [
      "ampua + N gen / O P"
    ],
    "examples": [
      "Ammuin karhun. — Я застрелил медведя. (когда дополнение в генетиве — застрели убил)",
      "Poliisi ampui rikollista. — Полицейский ранил преступника. (когда дополнение в партитиве — ранил, подстрелил)"
    ]
  },
  {
    "search_term": "ankara",
    "translation": "ANKARA (adj) — строгий (к кому-либо)",
    "cases": [
      "ankara + N ali",
      "ankara + N par + kohtaan"
    ],
    "examples": [
      "Ala ole niin ankara minulle!",
      "Isä oli kovin ankara poikaa kohtaan."
    ]
  },
  {
    "search_term": "anoa",
    "translation": "ANOA (verbi, transit) — просить, умолять",
    "cases": [
      "anoa + O par",
      "anoa + V -mAAn",
      "ansaita + O P"
    ],
    "examples": [
      "Anon apua sinulta.",
      "Vanki anoi armoa.",
      "Anoin häntä lopettamaan.",
      "ANSAITA — зарабатывать, заслужить",
      "Tiina ansaitsee rahaa työllä. — Тиина зарабатывает деньги трудом.",
      "En ole ansainnut näin suurta suosiota. — Я не заслужил такой большой популярности."
    ]
  },
  {
    "search_term": "antaa",
    "translation": "ANTAA (verbi, transit) antaa + N ill/all — дать",
    "cases": [
      "antaa + N gen + V 1. inf"
    ],
    "examples": [
      "Han antaa rahaa hyväntekeväisyyteen.",
      "Annoin hänelle sanakirjan.",
      "Annoin hänen puhua.",
      "Hoitaja on antanut lasten mennä ulos. En antanut lapsen ostaa lisää suklaata. Miksi et anna minun puhua?"
    ]
  },
  {
    "search_term": "antelias",
    "translation": "ANTELIAS (adj) — щедрый",
    "cases": [
      "antelias + N alf",
      "antelias + N par + kohtaan"
    ],
    "examples": [
      "Isoisä oli aina antelias meille. Hän on antelias lapsia kohtaan."
    ]
  },
  {
    "search_term": "apu",
    "translation": "APU (subst) — помощь",
    "cases": [
      "apu + N ifl"
    ],
    "examples": [
      "Oli vaikea löytää apua ongelmaan. Saitko apua sairauteesi?"
    ]
  },
  {
    "search_term": "apuraha",
    "translation": "APURAHA (subst) — грант, стипендия",
    "cases": [
      "apuraha + N par + varten"
    ],
    "examples": [
      "Hän sai apurahan näyttelyä varten.",
      "Urheilija sai apurahan uikomailia harjoittefua varten.",
      "Apuraha uutta tutkimusta varten tulee vasta ensi vuonna.",
      "Myös: tutkimusapuraha, taiteilija-apuraha"
    ]
  },
  {
    "search_term": "arka",
    "translation": "ARKA (adj) — робкий",
    "cases": [
      "arka + V -mAAn"
    ],
    "examples": [
      "Anneli on arka (= ujo) kysymään. )",
      "Kim on arka puhumaan suomea."
    ]
  },
  {
    "search_term": "arvoinen",
    "translation": "ARVOINEN (adj) — стоимостью, стоить того",
    "cases": [
      "N gen + arvoinen"
    ],
    "examples": [
      "Tämä kello on saman arvoinen kuin tuo.",
      "Voittakaa tuhannen markan arvoinen laivamatka!",
      "Onko asia sen arvoinen, että siitä kannattaa riidellä?"
    ]
  },
  {
    "search_term": "arvostaa",
    "translation": "ARVOSTAA (verbi, transit) — ценить",
    "cases": [
      "arvostaa + O par"
    ],
    "examples": [
      "Arvostan häntä suuresti."
    ]
  },
  {
    "search_term": "arvostelu",
    "translation": "ARVOSTELU (subst) — критика",
    "cases": [
      "arvostelu + N ela"
    ],
    "examples": [
      "Lehdessä oli arvostelu konsertista.",
      "Myös: musiikkiarvostelu, kirja-arvostelu"
    ]
  },
  {
    "search_term": "asenne",
    "translation": "ASENNE (subst) — отношение (к чему-либо)",
    "cases": [
      "asenne + N ill",
      "asenne + N par + kohtaan"
    ],
    "examples": [
      "Millainen asenne hänellä on tähän asiaan?",
      "Suomalaisten asenne luonnonsuojeluun on hyvin myönteinen.",
      "Ihmisten asenne työhön on muuttunut.",
      "Aleksin asenne työn tekemiseen on kielteinen.",
      "Liisan asenne Jussia kohtaan on muuttunut.",
      "Hänen asenteensa politiikkaa kohtaan on hyvin kielteinen."
    ]
  },
  {
    "search_term": "asennoitua",
    "translation": "ASENNOITUA (verbi, intransit)",
    "cases": [
      "asennoitua + N ill"
    ],
    "examples": [
      "Hän asennoituu myönteisesti kaikkeen uuteen.",
      "Pääministeri asennoitui kielteisesti ehdotukseen."
    ]
  },
  {
    "search_term": "asentaa",
    "translation": "ASENTAA (verbi, transit) — установить",
    "cases": [
      "asentaa + N ill"
    ],
    "examples": [
      "Hän asentaa autoon uuden käsijarrun.",
      "Taloon asennetaan sähkölämmitys."
    ]
  },
  {
    "search_term": "asettaa",
    "translation": "ASETTAA (verbi, transit) — поставить",
    "cases": [
      "asettaa + N ill/all"
    ],
    "examples": [
      "Asetin astiat kaappiin. Hän asetti lasit ylähyllylle.",
      "Sihteeri asetti kokouspaperit järjestykseen."
    ]
  },
  {
    "search_term": "asettua",
    "translation": "ASETTUA (verbi, intransit)",
    "cases": [
      "asettua + N ill/all",
      "asettua + V -maan"
    ],
    "examples": [
      "Asettukaa riviin! Juhlayleisö asettui paikoilleen.",
      "Hän asettuu aina istumaan eturiviin.",
      "Asetuin jonoon odottamaan vuoroani."
    ]
  },
  {
    "search_term": "astua",
    "translation": "ASTUA (verbi, intransit) astua + N ela/abl — войти, шагнуть",
    "cases": [
      "astua + N ill/all"
    ],
    "examples": [
      "Hän astui olohuoneesta eteiseen.",
      "Ovesta sisään astui vieras mies.",
      "Pysäkiltä astui bussiin vielä kolme matkustajaa.",
      "Hän astui huoneeseen. Astuin bussiin takaovesta.",
      "Älä astu vesilätäkköön!",
      "Konduktööri astui asema Ia jturille."
    ]
  },
  {
    "search_term": "asua",
    "translation": "ASUA (verbi, intransit) — жить, проживать",
    "cases": [
      "asua + N ine/ade"
    ],
    "examples": [
      "Me asumme Helsingissä.",
      "Virtaset asuvat Vantaalla.",
      "Asumme talvet kaupungissa ja kesät maalla."
    ]
  },
  {
    "search_term": "auttaa",
    "translation": "AUTTAA (verbi, transit) — помогать",
    "cases": [
      "auttaa + O par",
      "auttaa + N ine",
      "auttaa + N ill",
      "auttaa + V -mAAn"
    ],
    "examples": [
      "Hän auttoi minua eilen. Voinko minä auttaa teitä?",
      "Voitko auttaa minua tässä työssä?",
      "Hän auttoi minua kakun leipomisessa.",
      "Aspiriini auttaa päänsärkyyn.",
      "Hän auttoi minua leipomaan leipää."
    ]
  },
  {
    "search_term": "avata",
    "translation": "AVATA (verbi, trans.) — открывать",
    "cases": [
      "N + miltä(abl)"
    ],
    "examples": [
      "Avatkaa kirja sivulta kuusi. — Откройте книгу на странице 6."
    ]
  },
  {
    "search_term": "avoin",
    "translation": "AVOIN (adj) — открытый",
    "cases": [
      "avoin + N all",
      "avoin + N par + kohtaan"
    ],
    "examples": [
      "Hän on avoin uusille ideoille.",
      "Hän on aina ollut hyvin avoin minua kohtaan."
    ]
  },
  {
    "search_term": "avomielinen",
    "translation": "AVOMIELINEN (adj)",
    "cases": [
      "avomielinen + N par + kohtaan"
    ],
    "examples": [
      "Olen ollut avomielinen häntä kohtaan.",
      "Hän on avomielinen kaikkia kohtaaan."
    ]
  },
  {
    "search_term": "avustaa",
    "translation": "AVUSTAA (verbi, transit) — оказывать помощь",
    "cases": [
      "avustaa + O par"
    ],
    "examples": [
      "Ruotsi avusti Suomea sodan aikana."
    ]
  },
  {
    "search_term": "maalata",
    "translation": "MAALATA (verbi, transit) — покрасить",
    "cases": [
      "maalata + N tra"
    ],
    "examples": [
      "Minkäväriseksi he maalasivat talonsa?",
      "Maalaamme talon keltaiseksi."
    ]
  },
  {
    "search_term": "maata",
    "translation": "MAATA (verbi, intransit) — лежать",
    "cases": [
      "maata + N ine/ade",
      "maata + V -mAssA"
    ],
    "examples": [
      "Lauri makasi sairaana sängyssä.",
      "Merja makaa rannalla aurinkoa ottamassa.",
      "Mies makaa olohuoneen sohvalla katsomassa televisiota."
    ]
  },
  {
    "search_term": "mahdollinen",
    "translation": "MAHDOLLINEN (adj) — возможный",
    "cases": [
      "mahdollinen + V 1. inf",
      "mahdollinen + N ali"
    ],
    "examples": [
      "Onko siellä mahdollista uida?",
      "Kaikki oli mahdollista hänelle.",
      "Yrittävälle kaikki on mahdollista."
    ]
  },
  {
    "search_term": "mahdollisuus",
    "translation": "MAHDOLLISUUS (subst) — возможность",
    "cases": [
      "mahdollisuus + V 1. inf",
      "mahdollisuus + N ill"
    ],
    "examples": [
      "Kesällä on mahdollisuus uida ja ottaa aurinkoa.",
      "Saimme mahdollisuuden tavata vanhoja ystäviä.",
      "Kaikilla ei ole mahdollisuutta työntekoon."
    ]
  },
  {
    "search_term": "mahdoton",
    "translation": "MAHDOTON (adj)",
    "cases": [
      "mahdoton + V 1. inf"
    ],
    "examples": [
      "Onko sinun mahdotonta ymmärtää tätä?",
      "Tätä on mahdotonta käsittää.",
      "Huom! Hän on mahdoton (= kova, ahkera) tekemään töitä."
    ]
  },
  {
    "search_term": "mahtaa",
    "translation": "MAHTAA (verbi, intransit)",
    "cases": [
      "mahtaa + N ali",
      "mahtaa + V 1, inf"
    ],
    "examples": [
      "En mahda (= voi tehdä) mitään tälle asialle.",
      "Kukaan ei mahda hänelle mitään, hän on aivan mahdoton.",
      "Mahdatko ymmärtää (= ymmärrätköhän), mitä olet tehnyt?",
      "Hän mahtaa olla (= on varmaankin) rikas mies."
    ]
  },
  {
    "search_term": "mahtua",
    "translation": "MAHTUA (verbi, intransit)",
    "cases": [
      "mahtua + N ill/all",
      "mahtua + V -mAAn"
    ],
    "examples": [
      "Kuinka monta henkeä mahtuu yhteen bussiin?",
      "Parvekkeelle mahtuu hyvin kaksi tuolia ja pieni pöytä.",
      "Mahtuuko tähän pöytään syömään?",
      "Kaikki eivät mahdu istumaan, tuoleja ei ole tarpeeksi."
    ]
  },
  {
    "search_term": "mainita",
    "translation": "MAINITA (verbi, transit)",
    "cases": [
      "mainita + N all",
      "mainita + N ela"
    ],
    "examples": [
      "Voisitko mainita meille yhden esimerkin asiasta?",
      "Mainitse asiasta myös hänelle!"
    ]
  },
  {
    "search_term": "maininta",
    "translation": "MAININTA (subst)",
    "cases": [
      "maininta + N ela"
    ],
    "examples": [
      "Lehdessä oli vain yksi maininta tapauksesta.",
      "Kirjassa ei ole yhtään mainintaa hänestä.",
      "Asiasta on lyhyt maininta sivulla 125."
    ]
  },
  {
    "search_term": "mainos",
    "translation": "MAINOS (subst)",
    "cases": [
      "mainos + N ela"
    ],
    "examples": [
      "Mainos esityksestä julkaistiin sanomalehden etusivulla.",
      "Huom! tupakkamainos, alkoholi mainos, automainos"
    ]
  },
  {
    "search_term": "mainostaa",
    "translation": "MAINOSTAA (verbi, transit)",
    "cases": [
      "mainostaa + O par",
      "mainostaa + H ine/ade",
      "mainostaa + N tra"
    ],
    "examples": [
      "Saako tupakkaa mainostaa televisiossa?",
      "Elokuvaa on mainostettu joka lehdessä.",
      "Sitä mainostetaan lehdissä ja televisiossa.",
      "Autoa mainostetaan lehden etusivulla.",
      "Pesukonetta mainostetaan tehokkaaksi."
    ]
  },
  {
    "search_term": "maistaa",
    "translation": "MAISTAA (verbi, transit)",
    "cases": [
      "maistaa + O par"
    ],
    "examples": [
      "Oletko maistanut mämmiä?",
      "Maistakaa kakkua, olkaa hyvä!"
    ]
  },
  {
    "search_term": "maistua",
    "translation": "MAISTUA (verbi, intransit) — 1) иметь вкус 2) нравиться (о еде)",
    "cases": [
      "maistua + N abi/ali"
    ],
    "examples": [
      "Miltä se maistuu?",
      "Yskänlääke maistuu pahalta.",
      "Mille se maistuu?",
      "Siirappi maistuu makealle.",
      "Lapsille maistui jäätelö ja limsa."
    ]
  },
  {
    "search_term": "majoittaa",
    "translation": "MAJOITTAA (verbi, transit)",
    "cases": [
      "majoittaa + N ill/all"
    ],
    "examples": [
      "Opiskelijat majoitetaan retkeilymajaan.",
      "Meidät majoitettiin leirintäalueelle."
    ]
  },
  {
    "search_term": "maksaa",
    "translation": "MAKSAA (verbi, transit)",
    "cases": [
      "maksaa + N ill/all",
      "maksaa + N ela",
      "maksaa + N ade"
    ],
    "examples": [
      "Maksoin laskun pankkiin.",
      "Maksoitko liput Liisalle?",
      "Paljonko maksat vuokraa asunnostasi?",
      "Maksoit autosta aivan liikaa.",
      "Maksatteko käteisellä vai luottokortilla?",
      "Älä maksa pahaa pahalla!"
    ]
  },
  {
    "search_term": "maksu",
    "translation": "MAKSU (subst)",
    "cases": [
      "maksu + N ela"
    ],
    "examples": [
      "Maksu tehdystä työstä oli liian pieni."
    ]
  },
  {
    "search_term": "malttaa",
    "translation": "MALTTAA (verbi, transit)",
    "cases": [
      "malttaa + V 1. inf"
    ],
    "examples": [
      "En malta enää odottaa.",
      "Lähden pois.",
      "Lapsi malttoi istua hiljaa vain pari minuuttia."
    ]
  },
  {
    "search_term": "masentaa",
    "translation": "MASENTAA (verbi, transit)",
    "cases": [
      "masentaa + O par"
    ],
    "examples": [
      "Millaiset asiat masentavat sinua?",
      "Sateinen sää masensi häntä."
    ]
  },
  {
    "search_term": "masentua",
    "translation": "MASENTUA (verbi, intransit)",
    "cases": [
      "masentua + N ela"
    ],
    "examples": [
      "Minä en masennu pikkuasioista.",
      "Minä en vähästä masennu.",
      "Kirjailija masentui huonoista arvosteluista.",
      "Mistä sinä olet masentunut?",
      "Kalevi oli masentunut huonosta arvosanasta."
    ]
  },
  {
    "search_term": "matka",
    "translation": "MATKA (subst)",
    "cases": [
      "matka + N ill/all",
      "matka + N ela/all"
    ],
    "examples": [
      "Me kaikki olimme hyvin masentuneita asiasta.",
      "Matka Tallinnaan kestää laivalla noin neljä tuntia.",
      "Kuinka kauan junamatka Tampereelle kestää?"
    ]
  },
  {
    "search_term": "masentunut",
    "translation": "MASENTUNUT (adj)",
    "cases": [
      "masentunut + N ela"
    ],
    "examples": [
      "Matka Helsingistä Tallinnaan kestää noin neljä tuntia.",
      "Matka Tampereelta Helsinkiin kestää kaksi tuntia.",
      "Myös: kotimatka, työmatka, Tallinnan-matka"
    ]
  },
  {
    "search_term": "matkia",
    "translation": "MATKIA (verbi, transit)",
    "cases": [
      "matkia + O par"
    ],
    "examples": [
      "Matti matkii Jussia kaikessa.",
      "Kalle osaa matkia hyvin lintujen ääniä."
    ]
  },
  {
    "search_term": "matkustella",
    "translation": "MATKUSTELLA (verbi, intransit)",
    "cases": [
      "matkustella + N ine/ade"
    ],
    "examples": [
      "Tänä kesänä aiomme matkustella kotimaassa.",
      "Hän matkusteli maailmalla pari vuotta."
    ]
  },
  {
    "search_term": "meinata",
    "translation": "MEINATA (verbi, transit)",
    "cases": [
      "meinata + V 1. inf",
      "menestyä + N ine/ade"
    ],
    "examples": [
      "Mitä sinä meinaat (= aiot) tehdä tänään?",
      "Meinasin mennä eilen ulos, mutta jäinkin kotiin, koska satoi.",
      "Meinasin kaatua (= melkein kaaduin), koska tie oli niin liukas.",
      "MENESTYÄ {verbi, intransit)",
      "Hän on menestynyt hyvin elämässään.",
      "Suomen joukkue ei menestynyt kilpailussa.",
      "Sakari on menestynyt loistavasti urallaan.",
      "Tähän päivään mennessä olemme saaneet vain 60 vastausta."
    ]
  },
  {
    "search_term": "mennä",
    "translation": "MENNÄ (verbi, intransit)",
    "cases": [
      "mennä + N ill/all",
      "mennä + N ela/abl",
      "mennä + V -mAAn"
    ],
    "examples": [
      "Menemme teatteriin huomenna.",
      "Meneeko tämä bussi Kontulaan?",
      "Mennään maalle!",
      "Ruokaan menee (= kuluu) paljon rahaa.",
      "Tähän työhön menee paljon aikaa.",
      "Menimme teatterista taksilla kotiin.",
      "Torilta menin kahvilaan.",
      "Palkasta menee (= kuluu) puolet veroihin.",
      "Hän meni kirjastoon lukemaan.",
      "Mennäänkö syömään jotakin?"
    ]
  },
  {
    "search_term": "merkitys",
    "translation": "MERKITYS (subst)",
    "cases": [
      "merkitys + N ali"
    ],
    "examples": [
      "Asialla ei ole mitään merkitystä minulle.",
      "Paperin viennillä on suuri merkitys maan kansantaloudelle."
    ]
  },
  {
    "search_term": "merkitä",
    "translation": "MERKITÄ (verbi, transit)",
    "cases": [
      "merkitä + O par",
      "merkitä + N all"
    ],
    "examples": [
      "Mitä tämä merkitsee (= tarkoittaa)?",
      "Englannin sana ‘car’ merkitsee autoa.",
      "Mielipiteesi ei merkitse minulle mitään (= ei ole tärkeä).",
      "Ystävät merkitsevät minulle hyvin paljon."
    ]
  },
  {
    "search_term": "merkki",
    "translation": "MERKKI (subst)",
    "cases": [
      "merkki + N ela"
    ],
    "examples": [
      "Kuume on yleensä merkki tulehduksesta.",
      "Vielä ei näy merkkiäkään keväästä.",
      "Lumen sulaminen on ensimmäinen merkki kevään alkamisesta."
    ]
  },
  {
    "search_term": "mielikuva",
    "translation": "MIELIKUVA (subst)",
    "cases": [
      "mielikuva + N ela"
    ],
    "examples": [
      "Minulla oli aivan väärä mielikuva Suomesta.",
      "Millainen mielikuva sinulla on tästä asiasta?"
    ]
  },
  {
    "search_term": "mielipide",
    "translation": "MIELIPIDE (subst)",
    "cases": [
      "mielipide + N ela",
      "mielissä(än) + N ela"
    ],
    "examples": [
      "Mikä on sinun mielipiteesi tästä televisio-ohjelmasta?",
      "Hänellä on hyvin negatiivinen mielipide asiasta.",
      "MIELISSÄ(ÄN) (adv)",
      "Olin mielissäni lahjasta."
    ]
  },
  {
    "search_term": "mieli",
    "translation": "MIELI (subst)",
    "cases": [
      "olla mieltä + N ela"
    ],
    "examples": [
      "Tästä asiasta olen sinun kanssasi aivan samaa mieltä.",
      "Mitä mieltä te olette tästä asiasta?",
      "Hän on eri mieltä kaikesta.",
      "Isoäiti oli mielissään kukista, jotka annoin hänelle."
    ]
  },
  {
    "search_term": "miellyttää",
    "translation": "MIELLYTTÄÄ (verbi, transit)",
    "cases": [
      "miellyttää + O par"
    ],
    "examples": [
      "Miellyttääkö tämä sinua?",
      "Ehdotus ei miellyttänyt kaikkia."
    ]
  },
  {
    "search_term": "miettiä",
    "translation": "MIETTIÄ (verbi, transit)",
    "cases": [
      "miettiä + O par"
    ],
    "examples": [
      "Mietin asiaa koko illan.",
      "Mitä sinä nyt mietit?"
    ]
  },
  {
    "search_term": "moittia",
    "translation": "MOITTIA (verbi, transit)",
    "cases": [
      "moittia + O par",
      "moittia + N ela",
      "moittia + N tra"
    ],
    "examples": [
      "Opettaja moitti poikaa.",
      "Miksi minua aina moititaan?",
      "Opettaja moitti poikaa huonosta käytöksestä.",
      "Hän moitti minua huolimattomuudesta.",
      "Hän moitti minua laiskaksi."
    ]
  },
  {
    "search_term": "motivaatio",
    "translation": "MOTIVAATIO (subst)",
    "cases": [
      "motivaatio + V 1. inf"
    ],
    "examples": [
      "Minulla ei ole mitään motivaatiota opiskella suomea."
    ]
  },
  {
    "search_term": "motivoida",
    "translation": "MOTIVOIDA (verbi, transit)",
    "cases": [
      "motivoida + N ill",
      "motivoida + V -mAAn"
    ],
    "examples": [
      "Huono palkka ei motivoi työntekoon.",
      "Huono palkka ei motivoi työntekijöitä tekemään ylitöitä.",
      "Voitto kisoissa motivoi joukkueen harjoittelemaan enemmän."
    ]
  },
  {
    "search_term": "muistaa",
    "translation": "MUISTAA (verbi, transit)",
    "cases": [
      "muistaa + V 1. inf",
      "muistaa + että-lause"
    ],
    "examples": [
      "Muista ottaa sanakirja mukaan!",
      "Muistitko ostaa maitoa?",
      "Muistan, että sanoit näin eilen.",
      "Etkö muista, että Virtaset tulevat kylään huomenna?"
    ]
  },
  {
    "search_term": "muistella",
    "translation": "MUISTELLA (verbi, transit)",
    "cases": [
      "muistella + O par"
    ],
    "examples": [
      "Muistelen usein sitä kesää.",
      "Muistele minua hyvällä, älä pahalla!"
    ]
  },
  {
    "search_term": "muisto",
    "translation": "MUISTO (subst)",
    "cases": [
      "muisto + N ela/abl"
    ],
    "examples": [
      "Minulle jäi kaunis muisto isoisästäni.",
      "Minulla on kivoja muistoja Suomesta.",
      "Tämä taulu on muisto (= muistoesine) Suomesta.",
      "Tämä sormus on muisto isoäidiltäni."
    ]
  },
  {
    "search_term": "muistuttaa",
    "translation": "MUISTUTTAA (verbi, transit)",
    "cases": [
      "muistuttaa + O par",
      "muistuttaa + N ela"
    ],
    "examples": [
      "Muistuta minua tästä ensi viikolla!",
      "Poika muistuttaa isäänsä (= on melko samanlainen kuin isänsä).",
      "Muistutatko minua tästä asiasta huomenna?"
    ]
  },
  {
    "search_term": "muistutus",
    "translation": "MUISTUTUS (subst)",
    "cases": [
      "muistutus + N ela"
    ],
    "examples": [
      "Poika sai muistutuksen huonosta käytöksestä."
    ]
  },
  {
    "search_term": "muutella",
    "translation": "MUUTELLA (verbi, transit)",
    "cases": [
      "muutella + O par"
    ],
    "examples": [
      "Olen muutellut tekstiä jonkin verran.",
      "Kaisa muuttelee huonekalujen paikkaa jatkuvasti."
    ]
  },
  {
    "search_term": "muutos",
    "translation": "MUUTOS (subst)",
    "cases": [
      "muutos + N ill",
      "muutos + N ine"
    ],
    "examples": [
      "Teen vietä joitakin muutoksia tähän tekstiin.",
      "Päätökseen ei voi hakea muutosta.",
      "Muutos parempaan tapahtui vähitellen.",
      "Otsonikato on saanut aikaan muutoksia maapallon ilmastossa."
    ]
  },
  {
    "search_term": "muuttaa",
    "translation": "MUUTTAA (verbi, transit)",
    "cases": [
      "muuttaa + N ill/ali",
      "muuttaa + N ela/abl",
      "muuttaa + O + N tra"
    ],
    "examples": [
      "Muutin (= siirsin) sohvan toiseen huoneeseen.",
      "Muutin Suomeen viisi vuotta sitten.",
      "Miksi te muutatte maalle?",
      "Milloin muutit pois Vaasasta?",
      "Muutimme maalta kaupunkiin.",
      "Muutimme varaston työhuoneeksi.",
      "Puisto muutettiin parkkipaikaksi.",
      "Noita muutti prinssin sammakoksi."
    ]
  },
  {
    "search_term": "muuttua",
    "translation": "MUUTTUA (verbi, intransit)",
    "cases": [
      "muuttua + N tra",
      "muuttua + N ela"
    ],
    "examples": [
      "Sää on muuttunut kylmäksi ja sateiseksi.",
      "Taivas muuttui äkkiä pilviseksi. Liisa on muuttunut ihan omituiseksi.",
      "Sää muuttui yhtäkkiä aurinkoisesta pilviseksi."
    ]
  },
  {
    "search_term": "myydä",
    "translation": "MYYDÄ (verbi, transit)",
    "cases": [
      "myydä + N ill/all",
      "myydä + N ine/ade",
      "myöhässä + N ela/abl"
    ],
    "examples": [
      "Aion myydä vanhat tenttikirjani antikvariaattiin.",
      "Janne myi Samulille vanhan televisionsa.",
      "Tässä kioskissa myydään ulkomaisia lehtiä.",
      "Vanhoja vaatteita myydään kirpputorilla.",
      "Myin vanhan autoni tuhannella markalla.",
      "MYÖHÄSSÄ (adv)",
      "Bussi on taas myöhässä aikataulusta.",
      "Hän on aina puoli tuntia myöhässä kurssilta."
    ]
  },
  {
    "search_term": "myöhästyä",
    "translation": "MYÖHÄSTYÄ (verbi, intransit)",
    "cases": [
      "myöhästyä + N ela/abl"
    ],
    "examples": [
      "Myöhästyin bussista.",
      "Oppitunnilta ei saa myöhästyä."
    ]
  },
  {
    "search_term": "myöntyä",
    "translation": "MYÖNTYÄ (verbi, intransit)",
    "cases": [
      "myöntyä + N ill",
      "myöntyä + V -mAAn"
    ],
    "examples": [
      "Johtaja myöntyi pyyntöön.",
      "Myönnyimme lopulta vaatimuksiin.",
      "Johtaja myöntyi antamaan minulle lomaa."
    ]
  },
  {
    "search_term": "myöntää",
    "translation": "MYÖNTÄÄ (verbi, transit)",
    "cases": [
      "myöntää + N ill/all",
      "myöntää + että-lause"
    ],
    "examples": [
      "Tutkimukseen myönnettiin vain pieni summa rahaa.",
      "Hänelle myönnettiin tuhannen markan stipendi.",
      "Myönnän, että olit oikeassa.",
      "Hän myönsi, että minä olin oikeassa."
    ]
  },
  {
    "search_term": "myötätunto",
    "translation": "MYÖTÄTUNTO (subst)",
    "cases": [
      "myötätunto + N par + kohtaan"
    ],
    "examples": [
      "Myötätunto sodan uhreja kohtaan on suuri.",
      "Tein sen myötätunnosta heitä kohtaan."
    ]
  },
  {
    "search_term": "määrätä",
    "translation": "MÄÄRÄTÄ (verbi, transit)",
    "cases": [
      "määrätä + O + V -mAAn",
      "määrätä + O + N tra"
    ],
    "examples": [
      "Opettaja määräsi pojan kirjoittamaan tekstin uudelleen.",
      "Meidät määrättiin auttamaan heitä.",
      "Päätoimittaja määräsi Jussin lehden kirjeenvaihtajaksi Roomaan."
    ]
  },
  {
    "search_term": "määräys",
    "translation": "MÄÄRÄYS (subst)",
    "cases": [
      "määräys + N ela",
      "määräys + V 1. inf"
    ],
    "examples": [
      "Meillä on tarkat määräykset tästä asiasta.",
      "Saimme määräyksen poistua maasta.",
      "Minulle annettiin määräys maksaa lasku heti."
    ]
  },
  {
    "search_term": "lahjoa",
    "translation": "LAHJOA (verbi, transit)",
    "cases": [
      "lahjoa + V -mAAn"
    ],
    "examples": [
      "Kalle lahjoi pikkusiskon tiskaamaan puolestaan."
    ]
  },
  {
    "search_term": "lahjoittaa",
    "translation": "LAHJOITTAA (verbi, transit)",
    "cases": [
      "lahjoittaa + N ill/all"
    ],
    "examples": [
      "He lahjoittivat suuren summan rahaa hyväntekeväisyyteen.",
      "Vanhemmat lahjoittivat pojalle talonsa."
    ]
  },
  {
    "search_term": "lahjoitus",
    "translation": "LAHJOITUS (subst)",
    "cases": [
      "lahjoitus + N ill/all"
    ],
    "examples": [
      "Hän antoi lahjoituksen keräykseen.",
      "Äiti Teresa sai lahjoituksen orpokodille."
    ]
  },
  {
    "search_term": "laina",
    "translation": "LAINA (subst)",
    "cases": [
      "laina + N ill",
      "laina + N ela"
    ],
    "examples": [
      "Otin lainaa autoon.",
      "Saimme lainaa asunnon ostoon.",
      "Pyysin isältä lainaa auton ostamiseen.",
      "Asunnosta on lainaa vielä 100 000 markkaa.",
      "Myös: opintolaina, asuntolaina"
    ]
  },
  {
    "search_term": "lainata",
    "translation": "LAINATA (verbi, transit)",
    "cases": [
      "lainata + N ela/abl",
      "lainata + N ali",
      "lainata + N ill"
    ],
    "examples": [
      "Lainasimme rahaa pankista.",
      "Lainasin kirjan kirjastosta.",
      "Pekka lainasi rahaa Liisalta.",
      "Liisa lainasi rahaa Pekalle.",
      "Lainaatko minulle sata markkaa?",
      "Lainasimme rahaa asunnon remonttiin."
    ]
  },
  {
    "search_term": "lainaus",
    "translation": "LAINAUS (subst)",
    "cases": [
      "lainaus + N ela/abl"
    ],
    "examples": [
      "Kirjassa on lainauksia (= sitaatteja) Aleksis Kiven romaanista.",
      "Kirjassa on monta lainausta Aleksis Kiveltä.",
      "Huom! kirjojen lainaus = kirjojen lainaaminen"
    ]
  },
  {
    "search_term": "laiska",
    "translation": "LAISKA (adj)",
    "cases": [
      "laiska + V -mAAn"
    ],
    "examples": [
      "Poika on laiska tekemään kotitehtäviä."
    ]
  },
  {
    "search_term": "lajitella",
    "translation": "LAJITELLA (verbi, transit)",
    "cases": [
      "lajitella + N ill"
    ],
    "examples": [
      "Hän lajitteli kirjat kahteen pinoon.",
      "Lajittelin paidat värin mukaan punaisiin ja vihreisiin."
    ]
  },
  {
    "search_term": "lakata",
    "translation": "LAKATA (verbi, intransit)",
    "cases": [
      "lakata + V -mAstA"
    ],
    "examples": [
      "Lakkaa huutamasta!",
      "Milloin lakkaat polttamasta tupakkaa?"
    ]
  },
  {
    "search_term": "laskea",
    "translation": "LASKEA (verbi, transit)",
    "cases": [
      "laskea + N ill/all"
    ],
    "examples": [
      "Hän laski ankkurin veteen.",
      "Hän laski kukat haudalle.",
      "Aurinko laskee länteen.",
      "Hinnat ovat laskeneet vuoden 1992 tasolle.",
      "Janne-poika osaa jo laskea kymmeneen."
    ]
  },
  {
    "search_term": "laskeutua",
    "translation": "LASKEUTUA (verbi, intransit)",
    "cases": [
      "laskeutua + N ill/all"
    ],
    "examples": [
      "Lentokone laskeutui maahan.",
      "Lentokone laskeutuu kentälle.",
      "Helikopteri laskeutui katolle."
    ]
  },
  {
    "search_term": "lasku",
    "translation": "LASKU (subst)",
    "cases": [
      "lasku + N ela"
    ],
    "examples": [
      "Sain laskun television korjauksesta.",
      "Mies kirjoitti laskun sähkötöistä ja lähetti sen asiakkaalle.",
      "Myös: sähkölasku, puhelinlasku, vesilasku"
    ]
  },
  {
    "search_term": "laskuttaa",
    "translation": "LASKUTTAA (verbi, transit)",
    "cases": [
      "laskuttaa + O par",
      "laskuttaa + N ela"
    ],
    "examples": [
      "Firma laskuttaa asiakkaita tavaran kotiinkuljetuksesta.",
      "Me emme laskuta erikseen kotiinkuljetuksesta."
    ]
  },
  {
    "search_term": "laulaa",
    "translation": "LAULAA (verbi, transit)",
    "cases": [
      "laulaa + N all",
      "laulaa + N ela"
    ],
    "examples": [
      "Laula minulle jotakin.",
      "Hän laulaa onnettomasta rakkaudesta.",
      "Hän lauloi ilosta (= koska oli iloinen)."
    ]
  },
  {
    "search_term": "lausunto",
    "translation": "LAUSUNTO (subst)",
    "cases": [
      "lausunto + N ela"
    ],
    "examples": [
      "Professori antoi kirjallisen lausunnon tutkielmasta.",
      "Todistajanlausunto tapauksesta ratkaisi asian.",
      "Huom! asiantuntijanlausunto, lääkärinlausunto"
    ]
  },
  {
    "search_term": "leikata",
    "translation": "LEIKATA (verbi, transit)",
    "cases": [
      "leikata + N tra",
      "leikata + N ill"
    ],
    "examples": [
      "Leikkasin tukan lyhyeksi.",
      "Hän leikkasi makkaran ohuiksi siivuiksi.",
      "Leikkaa leipä viipaleiksi!",
      "Liha leikataan kapeiksi suikaleiksi.",
      "Ville leikkasi haavan sormeensa.",
      "Leikkaa paperi kahteen osaan!"
    ]
  },
  {
    "search_term": "leikkiä",
    "translation": "LEIKKIÄ (verbi, transit)",
    "cases": [
      "leikkiä + O par",
      "leikkiä + N ade"
    ],
    "examples": [
      "Lapset leikkivät kotia.",
      "Pojat leikkivät rosvoa ja poliisia.",
      "Maija leikkii Paavon kanssa autoilla.",
      "Minna ei leiki enää nukeilla."
    ]
  },
  {
    "search_term": "lelliä",
    "translation": "LELLIÄ (verbi, transit)",
    "cases": [
      "lelliä + O par"
    ],
    "examples": [
      "Mummo lellii lapsenlapsiaan."
    ]
  },
  {
    "search_term": "lepuuttaa",
    "translation": "LEPUUTTAA (verbi, transit)",
    "cases": [
      "lepuuttaa + O par"
    ],
    "examples": [
      "Miksi opettaja lellii tyttöjä?",
      "Istutaan tähän, haluan lepuuttaa jalkojani."
    ]
  },
  {
    "search_term": "leuhkia",
    "translation": "LEUHKIA (verbi, intransit)",
    "cases": [
      "leuhkia + N ade"
    ],
    "examples": [
      "Hän leuhkii uudella autollaan."
    ]
  },
  {
    "search_term": "leveillä",
    "translation": "LEVEILLÄ (verbi, intransit)",
    "cases": [
      "leveillä + N ade"
    ],
    "examples": [
      "Hän leveilee (= kerskailee) rahoillaan."
    ]
  },
  {
    "search_term": "levittää",
    "translation": "LEVITTÄÄ (verbi, transit)",
    "cases": [
      "levittää + N ill/all",
      "levittää + O par"
    ],
    "examples": [
      "Levitä aurinkoöljyä myös selkään ja hartioihin!",
      "Samuli levitti voita leiväUe.",
      "Hän levitti liinan pöydälle.",
      "Kärpäset levittävät tauteja, esimerkiksi malariaa. ‘",
      "Hän levittää väärää tietoa asiasta."
    ]
  },
  {
    "search_term": "levitä",
    "translation": "LEVITÄ (verbi, intransit)",
    "cases": [
      "levitä + N ill/all",
      "levitä + N ela/abl"
    ],
    "examples": [
      "Epidemia on levännyt myös Suomeen.",
      "Asutus levisi pohjoiseen.",
      "Parvekkeelle levisi jostakin hirveä tupakansavu.",
      "Asutus levisi etelästä pohjoiseen.",
      "Aids leviää mantereelta toiselle.",
      "Keittiöstä leviää ihana pullantuoksu joka huoneeseen."
    ]
  },
  {
    "search_term": "lieventää",
    "translation": "LIEVENTÄÄ (verbi, transit)",
    "cases": [
      "lieventää + O par"
    ],
    "examples": [
      "Rangaistusta lievennettiin.",
      "Opettaja lievensi arvosteluasteikkoa, koska koe oli liian vaikea."
    ]
  },
  {
    "search_term": "lievittää",
    "translation": "LIEVITTÄÄ (verbi, transit)",
    "cases": [
      "lievittää + O par",
      "liikaa + N par"
    ],
    "examples": [
      "Aspiriini lievittää päänsärkyä.",
      "Mikä voi lievittää masennusta?",
      "LIIKAA (LIIAN PALJON) (adv)",
      "Tässä sopassa on liikaa suolaa.",
      "Minulla ei koskaan ole liikaa rahaa.",
      "Teet liikaa työtä.",
      "Opettaja antoi meille liian paljon harjoituksia."
    ]
  },
  {
    "search_term": "liikauttaa",
    "translation": "LIIKAUTTAA (verbi, transit)",
    "cases": [
      "liikauttaa + O par"
    ],
    "examples": [
      "Merja liikautti päätänsä juuri kun otin valokuvan.",
      "Minua asia ei liikauttanut tippaakaan."
    ]
  },
  {
    "search_term": "liikutella",
    "translation": "LIIKUTELLA (verbi, transit)",
    "cases": [
      "liikutella + O par"
    ],
    "examples": [
      "Mies liikutteli jalkojaan hermostuneena.",
      "Tuuli liikuttelee puiden oksia."
    ]
  },
  {
    "search_term": "liikuttaa",
    "translation": "LIIKUTTAA (verbi, transit)",
    "cases": [
      "liikuttaa + O par"
    ],
    "examples": [
      "Lapsi liikutti käsiään koko ajan.",
      "Tapaus liikutti meitä kovasti.",
      "Tämä asia ei liikuta minua yhtään."
    ]
  },
  {
    "search_term": "liikuttua",
    "translation": "LIIKUTTUA (verbi, intransit)",
    "cases": [
      "liikuttua + N ela"
    ],
    "examples": [
      "Äiti liikuttui lahjasta.",
      "Olin hyvin liikuttunut hänen ystävällisistä sanoistaan."
    ]
  },
  {
    "search_term": "liimata",
    "translation": "LIIMATA (verbi, transit)",
    "cases": [
      "liimata + N ill/all"
    ],
    "examples": [
      "Liimasin valokuvat kansioon.",
      "Liimaa tuo kuva pahville!"
    ]
  },
  {
    "search_term": "liioitella",
    "translation": "LIIOITELLA (verbi, transit)",
    "cases": [
      "liioitella + O par"
    ],
    "examples": [
      "Nyt sinä kyllä liioittelet asiaa.",
      "Hän liioitteli ongelmaansa."
    ]
  },
  {
    "search_term": "liittoutua",
    "translation": "LIITTOUTUA (verbi, intransit)",
    "cases": [
      "liittoutua + N gen + kanssa",
      "liittoutua + N par + vastaan"
    ],
    "examples": [
      "Maa liittoutui naapurimaan kanssa.",
      "Pojat liittoutuivat tyttöjä vastaan."
    ]
  },
  {
    "search_term": "liittyä",
    "translation": "LIITTYÄ (verbi, intransit)",
    "cases": [
      "liittyä + N ill"
    ],
    "examples": [
      "Suomi liittyi Euroopan unioniin vuonna 1995.",
      "Tuo ei liity (= kuulu) tähän asiaan millään tavalla."
    ]
  },
  {
    "search_term": "liittää",
    "translation": "LIITTÄÄ (verbi, transit)",
    "cases": [
      "liittää + N ill"
    ],
    "examples": [
      "Suomi liitettiin Venäjään vuonna 1809.",
      "Liittäkää hakemukseen todistus suomen kielen taidostanne!"
    ]
  },
  {
    "search_term": "lippu",
    "translation": "LIPPU (subst)",
    "cases": [
      "lippu + N ill/all"
    ],
    "examples": [
      "Ostimme liput konserttiin.",
      "Mistä voin ostaa lipun Jalkapallo-otteluun?",
      "Ostaisin yhden lipun Rovaniemen yöjunaan.",
      "Meillä on lippuja vain ensimmäiselle riville.",
      "Myös: bussilippu, junalippu, teatterilippu, elokuvalippu"
    ]
  },
  {
    "search_term": "lista",
    "translation": "LISTA (subst)",
    "cases": [
      "lista + N ela"
    ],
    "examples": [
      "Tein listan tavaroista, joita tarvitsen matkalla.",
      "Saitko jo listan kurssin osanottajista?",
      "Tässä on lista juristeista, jotka voivat auttaa sinua.",
      "Myös: ostoslista, osanottajalista"
    ]
  },
  {
    "search_term": "lisätä",
    "translation": "LISÄTÄ (verbi, transit)",
    "cases": [
      "lisätä + N ill",
      "lisää + N par"
    ],
    "examples": [
      "Taikinaan lisätään sokeria.",
      "Lisää hiiva ja suola lämpimään veteen!",
      "Haluatko lisätä (= sanoa lisäksi) jotakin tähän asiaan?",
      "LISÄÄ (adv)",
      "Tarvitsen lisää rahaa.",
      "Otatko lisää kahvia?",
      "Olen saanut lisää tietoa asiasta.",
      "Tarvitsen lisää postimerkkejä."
    ]
  },
  {
    "search_term": "lohduttaa",
    "translation": "LOHDUTTAA (verbi, transit)",
    "cases": [
      "lohduttaa + O par"
    ],
    "examples": [
      "Äiti lohdutti itkevää lasta.",
      "Miten minä voisin lohduttaa sinua?"
    ]
  },
  {
    "search_term": "lojaali",
    "translation": "LOJAALI (adj)",
    "cases": [
      "lojaali + N par + kohtaan",
      "lojaali + N all"
    ],
    "examples": [
      "Hän on aina lojaali ystäviään kohtaan.",
      "Yritän olla lojaali työtovereitani kohtaan.",
      "Hän pysyi lojaalina puolueelle."
    ]
  },
  {
    "search_term": "lopettaa",
    "translation": "LOPETTAA (verbi, transit) — закончить",
    "cases": [
      "lopettaa + V -minen"
    ],
    "examples": [
      "Lopettaisit jo tuon typerän elokuvan katsomisen! — Закончил бы ты уже смотреть этот глупый фильм.",
      "Hän lopetti tupakan polttamisen.",
      "Ville yrittää lopettaa karkkien syömisen.",
      "Возможна и партитивная форма:",
      "On vaikea lopettaa lukemista. — Трудно закончить (перестать) читать."
    ]
  },
  {
    "search_term": "loppua",
    "translation": "LOPPUA (verbi, intransit) — кончиться, закончиться",
    "cases": [
      "loppua + N ill",
      "loppua + N ela/abl"
    ],
    "examples": [
      "Tämä loppuu nyt tähän.",
      "Kurssi loppuu kappaleeseen 15.",
      "Sana ‘nainen’ loppuu konsonanttiin.",
      "Kaivosta loppui vesi. Minulta loppui kärsivällisyys."
    ]
  },
  {
    "search_term": "loput",
    "translation": "LOPUT (subst)",
    "cases": [
      "loput + N ela"
    ],
    "examples": [
      "Käännän loput tästä tekstistä myöhemmin.",
      "Annoin loput rahoista Maaritille."
    ]
  },
  {
    "search_term": "loukata",
    "translation": "LOUKATA (verbi, transit)",
    "cases": [
      "loukata + N ill",
      "loukata + O par"
    ],
    "examples": [
      "Hän loukkasi päänsä pöydänkulmaan.",
      "Miehen sanat loukkasivat minua.",
      "Toivottavasti en loukannut sinua."
    ]
  },
  {
    "search_term": "loukkaantua",
    "translation": "LOUKKAANTUA (verbi, intransit) — 1) получить ранение (пораниться) 2) обидеться",
    "cases": [
      "loukkaantua + N ine/ade",
      "loukkaantua + N ill",
      "loukkaantua + N ela",
      "loukkaantua + N all"
    ],
    "examples": [
      "Kaksi ihmistä loukkaantui vakavasti junaonnettomuudessa Kukaan ei loukkaantunut tulipalossa.",
      "Jalkapallokentällä loukkaantui kymmeniä ihmisiä.",
      "Mies loukkaantui vakavasti päähänsä.",
      "Hän loukkaantui miehen sanoista. Hän loukkaantui siitä, että mies valehteli.",
      "Hän loukkaantui minulle."
    ]
  },
  {
    "search_term": "loukkaantunut",
    "translation": "LOUKKAANTUNUT (adj) — обиженный",
    "cases": [
      "loukkaantunut + N all — на кого",
      "loukkaantunut + N ela — из-за чего"
    ],
    "examples": [
      "Olen hyvin loukkaantunut siitä, että sinä valehtelit minulle. — Я очень обижен на то, что ты соврала мне.",
      "En tiedä, mistä he ovat loukkaantuneita. — Я не знаю, на что они обижены.",
      "He olivat hyvin loukkaantuneita naapureilleen. — Они были очень обижены на своих соседей."
    ]
  },
  {
    "search_term": "loukkaus",
    "translation": "LOUKKAUS (subst) — оскорбление",
    "cases": [
      "loukkaus + N par + kohtaan"
    ],
    "examples": [
      "Tuo on loukkaus meitä kaikkia kohtaan."
    ]
  },
  {
    "search_term": "luennoida",
    "translation": "LUENNOIDA (verbi, intransit)",
    "cases": [
      "luennoida + N ela",
      "luennoida + N all"
    ],
    "examples": [
      "Mistä hän luennoi?",
      "Hän luennoi yliopistossa teatteritaiteesta.",
      "Professori luennoi meille 1800-luvun kirjallisuudesta."
    ]
  },
  {
    "search_term": "luento",
    "translation": "LUENTO (subst)",
    "cases": [
      "luento + N ela"
    ],
    "examples": [
      "Perjantaina meillä on luento nykytaiteesta.",
      "Luento 1800-luvun suomalaisesta kirjallisuudesta on peruutettu."
    ]
  },
  {
    "search_term": "luettelo",
    "translation": "LUETTELO (subst)",
    "cases": [
      "luettelo + N ela"
    ],
    "examples": [
      "Voisinko saada luettelon kurssin kaikista osanottajista?",
      "Huom! lähdeluettelo, jäsenluettelo"
    ]
  },
  {
    "search_term": "lukea",
    "translation": "LUKEA (verbi, transit)",
    "cases": [
      "lukea + N ela",
      "lukea + N ill"
    ],
    "examples": [
      "Luin uutisen lehdestä.",
      "Hänet luetaan (kuuluvaksi) modemisteihin."
    ]
  },
  {
    "search_term": "lukea",
    "translation": "LUKEA (verbi, intransit)",
    "cases": [
      "lukea + N ine/ade"
    ],
    "examples": [
      "Ovessa lukee (= on teksti): Pääsy kielletty!",
      "Mitä tuossa kyltissä lukee?",
      "Huomasitko mitä lehden etusivulla luki?"
    ]
  },
  {
    "search_term": "lukeutua",
    "translation": "LUKEUTUA (verbi, intransit)",
    "cases": [
      "lukeutua + N ill"
    ],
    "examples": [
      "Taiteilijana hän lukeutuu ekspressionisteihin.",
      "Lukeudun ääri vasemmistoon.",
      "Teidän luonanne on aina hauskaa."
    ]
  },
  {
    "search_term": "luonnehtia",
    "translation": "LUONNEHTIA (verbi, transit)",
    "cases": [
      "luonnehtia + O par + N tra"
    ],
    "examples": [
      "Neuvotteluja luonnehdittiin onnistuneiksi.",
      "He luonnehtivat tilannetta hyvin vakavaksi.",
      "Huom! Miten (= millä tavalla) luonnehtisitte häntä?"
    ]
  },
  {
    "search_term": "luopua",
    "translation": "LUOPUA (verbi, intransit)",
    "cases": [
      "luopua + N ela",
      "luopua + V -mAstA"
    ],
    "examples": [
      "Mies ei halua luopua vanhasta takistaan.",
      "Luovuin ajatuksesta.",
      "Älä luovu toivosta!",
      "Älä luovu yrittämästä!"
    ]
  },
  {
    "search_term": "luottaa",
    "translation": "LUOTTAA (verbi, intransit)",
    "cases": [
      "luottaa + N ill"
    ],
    "examples": [
      "En voi luottaa sinuun enää.",
      "Luotan siihen, että kaikki sujuu hyvin.",
      "Olen menettänyt luottamukseni sinuun",
      "Kansalaisten luottamus poliitikkoihin on vähentynyt."
    ]
  },
  {
    "search_term": "luottamus",
    "translation": "LUOTTAMUS (subst)",
    "cases": [
      "luottamus + N ill",
      "luottamus + N par + kohtaan"
    ],
    "examples": [
      "Luottamus hallituksen toimintaa kohtaan ei ole lisääntynyt."
    ]
  },
  {
    "search_term": "luovuttaa",
    "translation": "LUOVUTTAA (verbi, transit)",
    "cases": [
      "luovuttaa + N all"
    ],
    "examples": [
      "Palkinto luovutettiin voittajalle.",
      "Voittaja luovutti palkintorahat lastensairaalalle.",
      "Sodan jälkeen alue luovutettiin naapurimaalle."
    ]
  },
  {
    "search_term": "lupa",
    "translation": "LUPA (subst)",
    "cases": [
      "lupa + V 1. inf",
      "lupa + N ill"
    ],
    "examples": [
      "Ville sai äidiltä luvan ostaa suklaata.",
      "Minulla ei ole lupaa tehdä tätä."
    ]
  },
  {
    "search_term": "lupaus",
    "translation": "LUPAUS (subst)",
    "cases": [
      "lupaus + N ela",
      "lupaus + V 1. inf"
    ],
    "examples": [
      "Siihen teillä ei ole lupaa.",
      "Lupaus paremmasta palkasta ilahdutti työntekijöitä.",
      "En uskonut Lassen lupauksiin parantaa tapansa."
    ]
  },
  {
    "search_term": "luulla",
    "translation": "LUULLA (verbi, transit)",
    "cases": [
      "luulla + että-lause",
      "luulla + O par + N tra"
    ],
    "examples": [
      "Luulen, että Liisa on jo kotona.",
      "Luulin, että he ovat amerikkalaisia.",
      "Luulin häntä mukavaksi mieheksi.",
      "Luulimme heitä amerikkalaisiksi, mutta he ovatkin englantilaisia."
    ]
  },
  {
    "search_term": "luvata",
    "translation": "LUVATA (verbi, transit)",
    "cases": [
      "luvata + N ali",
      "luvata + V 1. inf",
      "luvata + että-lause"
    ],
    "examples": [
      "Johtaja lupasi minulle lisää paikkaa.",
      "Lupaan tulla ajoissa. Hän lupasi tehdä parhaansa.",
      "Lupaan sinulle, että tulen."
    ]
  },
  {
    "search_term": "lähennellä",
    "translation": "LÄHENNELLÄ (verbi, transit)",
    "cases": [
      "lähennellä + O par"
    ],
    "examples": [
      "Mies yritti lähennellä Kaisaa ravintolassa.",
      "Hän lähentelee jo viittäkymmentä (= on melkein 50-vuotias).",
      "Kello lähentelee yhtätoista."
    ]
  },
  {
    "search_term": "lähestyä",
    "translation": "LÄHESTYÄ (verbi, transit)",
    "cases": [
      "lähestyä + O par"
    ],
    "examples": [
      "Kone lähestyy Helsinki-Vantaan lentokenttää.",
      "Laiva lähestyy satamaa, kohta olemme perillä.",
      "Helena on hyvin sulkeutunut ihminen. Häntä on vaikea lähestyä."
    ]
  },
  {
    "search_term": "lyödä",
    "translation": "LYÖDÄ (verbi, transit)",
    "cases": [
      "lyödä + O par",
      "lyödä + N ill/all"
    ],
    "examples": [
      "Kalle löi Villeä.",
      "Älä lyö minua!",
      "Hän löi miestä päähän.",
      "Hän löi minua poskelle."
    ]
  },
  {
    "search_term": "lähete",
    "translation": "LÄHETE (subst)",
    "cases": [
      "lähete + N ill/all"
    ],
    "examples": [
      "Lääkäri antoi minulle lähetteen laboratorioon.",
      "Sain lähetteen tarkempiin tutkimuksiin.",
      "Sain lääkäriltä lähetteen korvaklinikalle.",
      "Kirjoitan teille lähetteen gynekologille."
    ]
  },
  {
    "search_term": "lähettää",
    "translation": "LÄHETTÄÄ (verbi, transit)",
    "cases": [
      "lähettää + N ill/all",
      "lähettää + N ela/abl",
      "lähettää + O + V -mAAn"
    ],
    "examples": [
      "Lähetän tämän kirjeen Amerikkaan.",
      "Äiti lähetti minulle vähän rahaa.",
      "Mari lähetti minulle Espanjasta monta kirjettä.",
      "Lähetin lomamatkalta postikortteja kaikille ystävilleni.",
      "Lähetin Liisan kauppaan ostamaan ruokaa.",
      "Hän lähetti minut hakemaan ruokaa kaupasta."
    ]
  },
  {
    "search_term": "lähteä",
    "translation": "LÄHTEÄ (verbi, intransit)",
    "cases": [
      "lähteä + N ill/all",
      "lähteä + N ela/abl",
      "lähteä + V -mAAn"
    ],
    "examples": [
      "Ossi lähtee Lontooseen.",
      "Lähden huomenna lomalle.",
      "Milloin lähdet Suomesta? Lähdin torilta vasta iltapäivällä.",
      "Lähdetkö pelaamaan tennistä?",
      "Lomaile lähtö tuntui mukavalta."
    ]
  },
  {
    "search_term": "lähtö",
    "translation": "LÄHTÖ (subst)",
    "cases": [
      "lähtö + N ill/all",
      "lähtö + N ela/abl"
    ],
    "examples": [
      "Lentokoneen lähtö Ateenasta viivästyi.",
      "Lapsuudenkodista lähtö tuntui pelottavalta.",
      "Lähtö maalta kaupunkiin harmitti.",
      "Työhön lähtö tuntuu vaikealta maanantaisin.",
      "Matkaan lähtö viivästyi.",
      "Lentokoneen lähtö Ateenaan oli kaksi tuntia myöhässä.",
      "Eläkkeelle lähtö pelotti häntä."
    ]
  },
  {
    "search_term": "lääke",
    "translation": "LÄÄKE (subst)",
    "cases": [
      "lääke + N ill",
      "lääke + N par + vastaan"
    ],
    "examples": [
      "Onko aspiriini paras lääke päänsärkyyn?",
      "Aidsiin ei vielä ole keksitty lääkettä.",
      "Mikä olisi hyvä lääke aidsia vastaan (= aidsiin)?",
      "Myös: yskänlääke, särkylääke"
    ]
  },
  {
    "search_term": "löytyä",
    "translation": "LÖYTYÄ (verbi, intransit)",
    "cases": [
      "löytyä + N ela/abl"
    ],
    "examples": [
      "Tekstistä löytyi monta virhettä.",
      "Lompakko löytyi kadulta."
    ]
  },
  {
    "search_term": "löytää",
    "translation": "LÖYTÄÄ (verbi, transit)",
    "cases": [
      "löytää + N ela/abl",
      "löytää + N ill/all"
    ],
    "examples": [
      "Löysin tekstistä pari virhettä.",
      "Pojat löysivät lompakon kadulta.",
      "Löydätkö nyt kotiin yksin?",
      "Löysimme torille helposti."
    ]
  },
  {
    "search_term": "yhdistyä",
    "translation": "YHDISTYÄ (verbi, intransit)",
    "cases": [
      "yhdistyä + N tra"
    ],
    "examples": [
      "Maat yhdistyivät yhtenäiseksi valtioksi.",
      "Kaksi pankkia yhdistyi yhdeksi suureksi liikepankiksi.",
      "Tässä kohdassa kaksi puroa yhdistyy pieneksi joeksi."
    ]
  },
  {
    "search_term": "yhdistää",
    "translation": "YHDISTÄÄ (verbi, transit)",
    "cases": [
      "yhdistää + N ill/all"
    ],
    "examples": [
      "Silta yhdistää saaren mantereeseen.",
      "Kappale A yhdistetään kappaleeseen B.",
      "Keskus yhdistää puhelun neuvontatoimistoon.",
      "Hetkinen, yhdistän (puhelun) johtajalle.",
      "Otamme teihin yhteyttä lähipäivinä.",
      "Ottakaa yhteys lääkäriin! Saitko yhteyden häneen? Yhteydet sota-alueelle ovat poikki."
    ]
  },
  {
    "search_term": "yhteys",
    "translation": "YHTEYS (subst)",
    "cases": [
      "yhteys + N ill/all",
      "yhteys + N ela/abl"
    ],
    "examples": [
      "Yhteydet Helsingistä ovat tilapäisesti poikki.",
      "Tampereelta on suora junayhteys Helsinkiin."
    ]
  },
  {
    "search_term": "yhtyä",
    "translation": "YHTYÄ (verbi, intransit)",
    "cases": [
      "yhtyä + N ill"
    ],
    "examples": [
      "Yhdyn edelliseen puhujaan (= olen samaa mieltä kuin hän).",
      "Kaikki yhtyivät puheenjohtajan mielipiteeseen."
    ]
  },
  {
    "search_term": "yksimielinen",
    "translation": "YKSIMIELINEN (adj)",
    "cases": [
      "yksimielinen + N ela"
    ],
    "examples": [
      "Kaikki olivat yksimielisiä asiasta."
    ]
  },
  {
    "search_term": "ylentää",
    "translation": "YLENTÄÄ (verbi, transit)",
    "cases": [
      "ylentää + O + N tra"
    ],
    "examples": [
      "Johtokunta ylensi Maire Salon yhtiön pääjohtajaksi.",
      "Hänet on ylennetty kenraaliksi."
    ]
  },
  {
    "search_term": "ylettyä",
    "translation": "YLETTYÄ (verbi, intransit)",
    "cases": [
      "ylettyä + N ill/all",
      "ylettyä + V -maan"
    ],
    "examples": [
      "Olen liian lyhyt, en ylety yläkaappiin.",
      "Yletytkö ylähyllylle?",
      "Hame ylettyy nilkkoihin.",
      "Vesi on niin matalaa, että jalat ylettyvät pohjaan.",
      "Yletytkö ottamaan kirjan tuolta hyllyltä?",
      "Tarvitsen tikapuut, en ylety vaihtamaan kattolamppua."
    ]
  },
  {
    "search_term": "yletä",
    "translation": "YLETÄ (verbi, intransit)",
    "cases": [
      "yletä + N tra",
      "yletä + N ine/ade"
    ],
    "examples": [
      "Hän yleni armeijassa kenraaliksi.",
      "Miksi naiset eivät ylene pääjohtajaksi niin usein kuin miehet?",
      "Hän yleni nopeasti urallaan.",
      "Hän on ylennyt firmassa jo apulaisjohtajaksi."
    ]
  },
  {
    "search_term": "yliherkkä",
    "translation": "YLIHERKKÄ (adj)",
    "cases": [
      "yliherkkä + N all"
    ],
    "examples": [
      "Hän on yliherkkä {= allerginen) kissoille."
    ]
  },
  {
    "search_term": "ylistää",
    "translation": "YLISTÄÄ (verbi, transit)",
    "cases": [
      "ylistää + O par"
    ],
    "examples": [
      "Elokuvaa on ylistetty joka lehdessä.",
      "Hänen kauneuttaan ylistettiin kaikkialla.",
      "Kaikki ylistävät kirjailijan uutta teosta."
    ]
  },
  {
    "search_term": "yllyke",
    "translation": "YLLYKE (subst)",
    "cases": [
      "yllyke + V 1. inf",
      "yllyke + N ill"
    ],
    "examples": [
      "Apurahasta sain yllykkeen jatkaa opintojani.",
      "Tapaus antoi minulle yllykkeen kirjoittaa kirja.",
      "Apuraha oli hyvä yllyke opiskeluun.",
      "Taloudelliset vaikeudet olivat yllykkeenä rikokseen."
    ]
  },
  {
    "search_term": "yllyttää",
    "translation": "YLLYTTÄÄ (verbi, transit)",
    "cases": [
      "yllyttää + N ill",
      "yllyttää + V -mAAn"
    ],
    "examples": [
      "Hän yllytti työläiset kapinaan. Yllytätkö sinä minua rikokseen?",
      "Hän yllytti meidät opiskelemaan suomea. Yllytätkö sinä minua tekemään rikoksen?"
    ]
  },
  {
    "search_term": "ylläpitää",
    "translation": "YLLÄPITÄÄ (PITAA YLLÄ) (verbi, transit)",
    "cases": [
      "ylläpitää + O par"
    ],
    "examples": [
      "Poliisin tehtävä on ylläpitää / pitää yllä järjestystä.",
      "Yritimme ylläpitää toivoa, vaikka kaikki näytti toivottomalta."
    ]
  },
  {
    "search_term": "yllättyä",
    "translation": "YLLÄTTYÄ (verbi, intransit)",
    "cases": [
      "yllättyä + N ela"
    ],
    "examples": [
      "Yllätyin iloisesti Jussin puhelinsoitosta.",
      "Äiti yllättyi lasten lahjasta."
    ]
  },
  {
    "search_term": "yllättää",
    "translation": "YLLÄTTÄÄ (verbi, transit)",
    "cases": [
      "yllättää + N ade",
      "yllättää + V -mAIIA"
    ],
    "examples": [
      "Jussi yllätti minut iloisesti puhelinsoitolla.",
      "Hän yllätti minut kukkakimpulla.",
      "Lapset yllättivät äidin leipomalla hänelle kakun."
    ]
  },
  {
    "search_term": "ylpeillä",
    "translation": "YLPEILLÄ (verbi, intransit)",
    "cases": [
      "ylpeillä + N ela"
    ],
    "examples": [
      "Hän ylpeili hyvästä todistuksestaan.",
      "Tuollaisesta saavutuksesta voi ylpeillä."
    ]
  },
  {
    "search_term": "ylpeä",
    "translation": "YLPEÄ (adj)",
    "cases": [
      "ylpeä + N ela"
    ],
    "examples": [
      "Noin hyvästä todistuksesta kannattaa olla ylpeä.",
      "Vanhemmat olivat ylpeitä lapsensa menestyksestä."
    ]
  },
  {
    "search_term": "ymmärtää",
    "translation": "YMMÄRTÄÄ (verbi, transit)",
    "cases": [
      "ymmärtää + O par",
      "ymmärtää + V 1. inf",
      "ymmärtää + että-lause"
    ],
    "examples": [
      "Hän ymmärtää suomea erittäin hyvin.",
      "Ymmärrättekö minua (= mitä minä sanon)?",
      "Ymmärsin olla hiljaa.",
      "Ymmärrän hyvin, että olet väsynyt."
    ]
  },
  {
    "search_term": "yrittää",
    "translation": "YRITTÄÄ (verbi, transit)",
    "cases": [
      "yrittää + V 1. inf"
    ],
    "examples": [
      "Yritän tehdä työni niin hyvin kuin mahdollista.",
      "Yritä lopettaa tupakanpoltto!Tämä on jo toinen yritys ratkaista asia.",
      "Kaikki yritykseni lopettaa tupakoiminen ovat epäonnistuneet."
    ]
  },
  {
    "search_term": "yskittää",
    "translation": "YSKITTÄÄ (verbi, transit)",
    "cases": [
      "yskittää + O par"
    ],
    "examples": [
      "Minua yskittää.",
      "Yskittääkö tupakansavu teitä?"
    ]
  },
  {
    "search_term": "ystävällinen",
    "translation": "YSTÄVÄLLINEN (adj)",
    "cases": [
      "ystävällinen + N ali",
      "ystävällinen + N par + kohtaan"
    ],
    "examples": [
      "Hän on aina ystävällinen kaikille.",
      "He olivat hyvin ystävällisiä meitä kohtaan."
    ]
  },
  {
    "search_term": "yöpyä",
    "translation": "YÖPYÄ (verbi, intransit)",
    "cases": [
      "yöpyä + N ine/ade"
    ],
    "examples": [
      "Yövyimme teltassa."
    ]
  },
  {
    "search_term": "yritys",
    "translation": "YRITYS (subst)",
    "cases": [
      "yritys + V 1. inf"
    ],
    "examples": [
      "Voimme yöpyä leirintäalueella."
    ]
  },
  {
    "search_term": "uhata",
    "translation": "UHATA (verbi, transit) — угрожать",
    "cases": [
      "uhata + O par",
      "uhata + N ade",
      "uhata + V 1. inf"
    ],
    "examples": [
      "Mies on uhannut lähteä kotoa monta kertaa.",
      "Onko häntä uhattu?",
      "Poikaa uhkasi ankara rangaistus.",
      "He uhkasivat miestä puukolla.",
      "Poikaa uhattiin ankaralla rangaistuksella.",
      "Hän uhkasi tappaa minut."
    ]
  },
  {
    "search_term": "uhka",
    "translation": "UHKA (subst) — угроза",
    "cases": [
      "N gen + uhka",
      "uhka + N all"
    ],
    "examples": [
      "Sodan uhka tuntuu pelottavalta.",
      "Ankaran rangaistuksen uhka voi vähentää rikollisuutta.",
      "Luonnon saastuminen on vakava uhka koko maapallolle."
    ]
  },
  {
    "search_term": "uhkaus",
    "translation": "UHKAUS (subst) — угрозы, «угрожание»",
    "cases": [
      "uhkaus + N ela",
      "uhkaus + V 1. inf"
    ],
    "examples": [
      "Maija vain nauroi miehen uhkauksille lähteä kotoa.",
      "Poika sai uhkauksen ankarasta rangaistuksesta.",
      "Hänen uhkauksiinsa tehdä itsemurha ei suhtauduttu vakavasti.",
      "Työntekijät esittivät uhkauksen lakon aloittamisesta."
    ]
  },
  {
    "search_term": "uhmata",
    "translation": "UHMATA (verbi, transit)",
    "cases": [
      "uhmata + O par"
    ],
    "examples": [
      "He uhmasivat vaaraa ja jatkoivat matkaansa.",
      "Poika uhmaa vanhempiaan ja tekee mitä itse tahtoo."
    ]
  },
  {
    "search_term": "uhrata",
    "translation": "UHRATA (verbi, transit) — жертвовать",
    "cases": [
      "uhrata + N ill/all"
    ],
    "examples": [
      "Tähän työhön en uhraa enää aikaa.",
      "Marja uhrasi koko lomansa työntekoon.",
      "Hän on uhrannut nuoruutensa kilpaurheilulle.",
      "Jumalille uhrattiin lampaita ja muuta ruokaa."
    ]
  },
  {
    "search_term": "uhrautua",
    "translation": "UHRAUTUA (verbi, intransit) — посвятить себя, пожертвовать собой",
    "cases": [
      "uhrautua + N gen + puolesta/hyväksi",
      "uhrautua + V -mAAn"
    ],
    "examples": [
      "Vanhemmat uhrautuivat lastensa puolesta / hyväksi.",
      "Hyvä on, minä uhraudun pesemään ikkunat, jos sinä et viitsi.",
      "Hannes uhrautui maksamaan Kaarinan laskun."
    ]
  },
  {
    "search_term": "ujo",
    "translation": "UJO (adj) — робость, застенчивость",
    "cases": [
      "ujo + V -mAAn"
    ],
    "examples": [
      "Olen liian ujo puhumaan julkisesti."
    ]
  },
  {
    "search_term": "ujostella",
    "translation": "UJOSTELLA (verbi, transit) — стесняться",
    "cases": [
      "ujostella + O par"
    ],
    "examples": [
      "Lapsi ujosteli joulupukkia.",
      "Ujosteletteko te minua?"
    ]
  },
  {
    "search_term": "ujostuttaa",
    "translation": "UJOSTUTTAA (verbi, transit) — вызывать робость, заставлять робеть",
    "cases": [
      "ujostuttaa + O par"
    ],
    "examples": [
      "Minua alkoi ujostuttaa: en uskaltanut sanoa mitään.",
      "Poikaa ujostutti niin, ettei hän saanut sanaa suustaan."
    ]
  },
  {
    "search_term": "ulottua",
    "translation": "ULOTTUA (verbi, intransit) — достигать до",
    "cases": [
      "ulottua + N ill/all",
      "ulottua + N ela/abl"
    ],
    "examples": [
      "Verhot ulottuvat lattiaan.",
      "Hannan pitkät hiukset ulottuvat vyötärölle.",
      "Verhot ulottuvat katosta lattiaan.",
      "Jono ulottui ovelta lippuluukulle asti.",
      "Päätöksen vaikutukset ulottuvat kauas tulevaisuuteen."
    ]
  },
  {
    "search_term": "uneksia",
    "translation": "UNEKSIA (verbi, transit) — мечтать, грезить",
    "cases": [
      "uneksia + N ela",
      "uneksia + että-lause"
    ],
    "examples": [
      "Maija uneksii lottovoitosta.",
      "Maailmanympärimatkasta voin vain uneksia.",
      "Maija uneksii, että hän saisi joskus lottovoiton."
    ]
  },
  {
    "search_term": "unelma",
    "translation": "UNELMA (subst) — мечта",
    "cases": [
      "unelma + N ela"
    ],
    "examples": [
      "Kaikilla meillä on unelma onnellisesta tulevaisuudesta.",
      "Helenan unelma kivasta miehestä ja kolmesta lapsesta toteutui."
    ]
  },
  {
    "search_term": "unelmoida",
    "translation": "UNELMOIDA (verbi, transit) — мечтать",
    "cases": [
      "unelmoida + N ela",
      "unelmoida + että-lause"
    ],
    "examples": [
      "Liisa unelmoi rikkaasta miehestä.",
      "Mistä sinä unelmoit?",
      "Liisa unelmoi, että saisi rikkaan miehen."
    ]
  },
  {
    "search_term": "unohtaa",
    "translation": "UNOHTAA (verbi, transit) — забыть",
    "cases": [
      "unohtaa + N ill/all",
      "unohtaa + V 1. inf"
    ],
    "examples": [
      "Unohdin lompakon kotiin/torille.",
      "Unohdin avaimen eteisen pöydälle.",
      "Unohditko taas maksaa laskun ajoissa?",
      "Älä unohda ostaa myös maitoa!"
    ]
  },
  {
    "search_term": "unohtua",
    "translation": "UNOHTUA (verbi, intransit) — быть забытым, остаться забытым",
    "cases": [
      "unohtua + N ill/all",
      "unohtua + N abl",
      "unohtua + V -mAAn"
    ],
    "examples": [
      "Lompakko unohtui kotiin.",
      "Avain unohtui eteisen pöydälle.",
      "Matkustajilta unohtuu bussiin kaikenlaisia tavaroita.",
      "Unohtuiko sinulta jotakin?",
      "Unohduin katselemaan televisiota ja myöhästyin kurssilta."
    ]
  },
  {
    "search_term": "upota",
    "translation": "UPOTA (verbi, intransit)",
    "cases": [
      "upota + N ill"
    ],
    "examples": [
      "Laiva upposi meren pohjaan.",
      "Autoon uppoaa (= kuluu) kauhean paljon rahaa."
    ]
  },
  {
    "search_term": "upottaa",
    "translation": "UPOTTAA (verbi, transit)",
    "cases": [
      "upottaa + N ill"
    ],
    "examples": [
      "Jätetynnyrit upotettiin mereen.",
      "Jeppe upotti surunsa viinaan.",
      "Ville istui kirjaansa uppoutuneena, eikä kuullut ovikellon soittoa."
    ]
  },
  {
    "search_term": "uppoutunut",
    "translation": "UPPOUTUNUT (adj)",
    "cases": [
      "uppoutunut + N ill"
    ],
    "examples": [
      "Hän on niin uppoutunut työhönsä, ettei näe eikä kuule mitään muuta."
    ]
  },
  {
    "search_term": "uskaltaa",
    "translation": "USKALTAA (verbi, transit) — осмелиться",
    "cases": [
      "uskaltaa + V 1. inf"
    ],
    "examples": [
      "Uskallatko häiritä häntä?",
      "Kaisa uskalsi kävellä pimeän metsän läpi."
    ]
  },
  {
    "search_term": "uskoa",
    "translation": "USKOA (verbi, transit) — верить",
    "cases": [
      "uskoa + N ill",
      "uskoa + O par",
      "uskoa + etta-lause"
    ],
    "examples": [
      "Usko (= tottele) nyt minua ja mene pois!",
      "Hän uskoo, että kaikki järjestyy.",
      "Uskotko, että Pekka puhui totta?",
      "Matilda uskoo joulupukkiin (= etta joulupukki on olemassa).",
      "Uskotteko te ufoihin?",
      "Hän uskoo omiin kykyihinsä.",
      "Hän uskoo Jumalaan.",
      "Elias ei usko (= luota) lääkäreihin.",
      "Minä en usko sitä.",
      "Uskon sinua (= että puhut totta, että olet oikeassa).",
      "Liisa uskoo aina Pekkaa, vaikka Pekka sanoisi mitä tahansa."
    ]
  },
  {
    "search_term": "uskollinen",
    "translation": "USKOLLINEN (adj) — верный, преданный",
    "cases": [
      "uskollinen + N all"
    ],
    "examples": [
      "Hän on uskollinen vaimolleen.",
      "He olivat uskollisia johtajalleen.",
      "Olen uskollinen periaatteilleni."
    ]
  },
  {
    "search_term": "usko",
    "translation": "USKO (subst) — вера",
    "cases": [
      "usko + N ill"
    ],
    "examples": [
      "Usko Jumalaan auttoi häntä.",
      "Hänellä on luja usko omiin kykyihinsä.",
      "Usko sodan loppumiseen tuntuu epärealistiselta."
    ]
  },
  {
    "search_term": "uskoton",
    "translation": "USKOTON (adj)",
    "cases": [
      "uskoton + N all"
    ],
    "examples": [
      "Liisa oli uskoton Pekalle.",
      "Mies on ollut uskoton vaimolleen jo monta vuotta."
    ]
  },
  {
    "search_term": "uskoutua",
    "translation": "USKOUTUA (verbi, intransit) — довериться",
    "cases": [
      "uskoutua + N all"
    ],
    "examples": [
      "Minulle voit uskoutua, en kerro kenellekään."
    ]
  },
  {
    "search_term": "uudistaa",
    "translation": "UUDISTAA (verbi, trans.) — реформировать",
    "cases": [
      "uudistta + P"
    ],
    "examples": [
      "Hallitus uudistaa lakeja. — Правительство реформирует законы."
    ]
  },
  {
    "search_term": "uutinen",
    "translation": "UUTINEN (subst) — новость",
    "cases": [
      "uutinen + N ela/abl"
    ],
    "examples": [
      "Uutinen onnettomuudesta järkytti kaikkia.",
      "Oletko kuullut uutisia kotimaasta?",
      "Hetken kuluttua kuulemme uutisia maailmalta."
    ]
  },
  {
    "search_term": "kaataa",
    "translation": "KAATAA (verbi, transit)",
    "cases": [
      "kaataa + N ela/abl",
      "kaataa + N ill/all"
    ],
    "examples": [
      "Matti kaatoi marjoja korista.",
      "Lapsi kaatoi puuron lautaselta lattialle.",
      "He kaatoivat kaksi koivua pihalta.",
      "Hän kaatoi marjat kuppiin.",
      "Kaadoin vahingossa viiniä pöytäliinalle.",
      "Kaadatko minulle lisää kahvia."
    ]
  },
  {
    "search_term": "kaatua",
    "translation": "KAATUA (verbi, intransit)",
    "cases": [
      "kaatua + N ill/all",
      "kaatua + N ine/ade"
    ],
    "examples": [
      "Puu kaatui maahan myrskyssä.",
      "Pelaaja kaatui kentälle.",
      "Vanhus kaatui keittiössä.",
      "Herra Mononen kaatui portaissa.",
      "Hän kaatui kadulla ja loukkasi jalkansa."
    ]
  },
  {
    "search_term": "kadehtia",
    "translation": "KADEHTIA (verbi, transit)",
    "cases": [
      "kadehtia + O par",
      "kadehtia + N ela"
    ],
    "examples": [
      "Kuka kadehtii Liisaa? Kadehdin hyvää laskutaitoasi.",
      "Mistä sinä kadehdit häntä?",
      "Kadehdin Liisaa lottovoitosta.",
      "Kadehdin sinua siitä, että puhut niin hyvin ranskaa."
    ]
  },
  {
    "search_term": "kadota",
    "translation": "KADOTA (verbi, intransit)",
    "cases": [
      "kadota + N ill/all",
      "kadota + N ela/abl"
    ],
    "examples": [
      "Hiihtäjä katosi metsään.",
      "Mihin hän nyt katosi?",
      "Jänis katosi pellolle.",
      "Lompakosta oli kadonnut 100 markkaa.",
      "Pöydältä oli kadonnut lompakko.",
      "Minulta katosi kello uimahallissa."
    ]
  },
  {
    "search_term": "kadottaa",
    "translation": "KADOTTAA (verbi, transit)",
    "cases": [
      "kadottaa + N ill",
      "kadottaa + N ine/ade"
    ],
    "examples": [
      "Kadotin lompakkoni bussiin. (= Lompakko jäi bussiin.)",
      "Olen kadottanut silmälasini johonkin.",
      "Kadotin passini Roomassa. (= Olin Roomassa, kun passi katosi.)",
      "Hän kadotti silmälasinsa lomamatkalla."
    ]
  },
  {
    "search_term": "kaduttaa",
    "translation": "KADUTTAA (verbi, transit)",
    "cases": [
      "kaduttaa + O par"
    ],
    "examples": [
      "Minua kaduttaa se, että menin sinne."
    ]
  },
  {
    "search_term": "kaipailla",
    "translation": "KAIPAILLA (verbi, transit)",
    "cases": [
      "kaipailla + O par"
    ],
    "examples": [
      "Sinua on kaipailtu (= kyselty, etsitty) jo monta tuntia.",
      "Joku kaipailee Paulaa puhelimessa."
    ]
  },
  {
    "search_term": "kaipaus",
    "translation": "KAIPAUS (KAIPUU) (subst)",
    "cases": [
      "kaipaus + N ill/all"
    ],
    "examples": [
      "Kaipaus kotiin sai hänet tilaamaan matkaliput.",
      "Hänellä on suuri kaipaus takaisin Suomeen.",
      "Kaipuuni Venäjälle on suurimmillaan kesäisin."
    ]
  },
  {
    "search_term": "kaivata",
    "translation": "KAIVATA (verbi, transit)",
    "cases": [
      "kaivata + O par",
      "kaivata + N ill/all"
    ],
    "examples": [
      "Kaipaan sinua.",
      "Kaipaan rauhaa ja hiljaisuutta. Eniten kaipaan sukulaisiani ja ystäviäni.",
      "Mitä sinä kaipaat eniten kotimaastasi?",
      "Hän kaipasi takaisin Suomeen.",
      "Aslak kaipaa Rovaniemelle."
    ]
  },
  {
    "search_term": "kallistaa",
    "translation": "KALLISTAA (verbi, transit)",
    "cases": [
      "kallistaa + O par"
    ],
    "examples": [
      "Potilas kallisti päätään, kun lääkäri tutki korvaa.",
      "Vero kallistaa bensiinin hintaa monta prosenttia."
    ]
  },
  {
    "search_term": "kannattaa",
    "translation": "KANNATTAA (verbi, transit)",
    "cases": [
      "N gen + kannattaa + V 1. inf",
      "kannattaa + V 1. inf",
      "kannattaa + O par"
    ],
    "examples": [
      "Teidän kannattaa ostaa se kirja.",
      "Kallen kannattaa lähteä ajoissa kotoa.",
      "Tupakanpoltto kannattaa lopettaa.",
      "Aina kannattaa yrittää.",
      "Me kannatamme Liisaa.",
      "Me kannatamme Liisan valitsemista puheenjohtajaksi.",
      "Mitä puoluetta sinä kannatit viime vaaleissa?",
      "Ehdotusta kannatetaan.",
      "Kannatan asiaa."
    ]
  },
  {
    "search_term": "kannella",
    "translation": "KANNELLA (verbi, intransit)",
    "cases": [
      "kannella + N ela",
      "kannella + N all"
    ],
    "examples": [
      "Tästä asiasta ei saa kannella (= ei saa kertoa) isälle.",
      "Hän on kannellut sinusta.",
      "Oppilaat kantelivat Elsasta opettajalle.",
      "Pikkuveli kanteli äidille siskon tupakanpoltosta."
    ]
  },
  {
    "search_term": "kannustaa",
    "translation": "KANNUSTAA (verbi, transit)",
    "cases": [
      "kannustaa + O par",
      "kannustaa + V -mAAn"
    ],
    "examples": [
      "Professori kannusti opiskelijaa monin tavoin.",
      "Hyvä todistus kannusti häntä jatkamaan opintojaan."
    ]
  },
  {
    "search_term": "karata",
    "translation": "KARATA (verbi, intransit)",
    "cases": [
      "karata + N ela/abl",
      "karata + N ill/all"
    ],
    "examples": [
      "Hän karkasi vankilasta.",
      "Poliisilta on karannut koira.",
      "Orava karkasi puuhun.",
      "Kissa on karannut katolle.",
      "Hän karkasi ulkomaille."
    ]
  },
  {
    "search_term": "karkottaa",
    "translation": "KARKOTTAA (verbi, transit)",
    "cases": [
      "karkottaa + N ela/abl",
      "karkottaa + N ill/all"
    ],
    "examples": [
      "Hänet karkotettiin kotimaastaan.",
      "Heidät karkotetaan rajalta.",
      "Miehet karkotettiin takaisin kotimaahansa.",
      "Meidät oli karkotettu Venäjälle."
    ]
  },
  {
    "search_term": "karsia",
    "translation": "KARSIA (verbi, transit)",
    "cases": [
      "karsia + N ela"
    ],
    "examples": [
      "Karsin kuusesta oksat.",
      "Kilpailusta karsitaan neljä viimeistä juoksijaa.",
      "Pyrkijöistä karsittiin kymmenen parasta kurssille."
    ]
  },
  {
    "search_term": "karttaa",
    "translation": "KARTTAA (verbi, transit)",
    "cases": [
      "karttaa + O par"
    ],
    "examples": [
      "Hän karttaa minua eikä vastaa edes puhelimeen.",
      "Jukka karttaa julkisuutta.",
      "He karttavat työntekoa."
    ]
  },
  {
    "search_term": "karttua",
    "translation": "KARTTUA (verbi, intransit)",
    "cases": [
      "karttua + N ill/all"
    ],
    "examples": [
      "Matkakirjaan karttui aineistoa monesta maasta.",
      "Pankkitilille karttui rahaa lähes 5 000 markkaa."
    ]
  },
  {
    "search_term": "kasata",
    "translation": "KASATA (verbi, transit)",
    "cases": [
      "kasata + N ill/all"
    ],
    "examples": [
      "Kasasin vaatteet pinoon ja vein ne pesukoneeseen.",
      "Kasasimme vanhat valokuvat pöydälle ja aloimme katsella niitä."
    ]
  },
  {
    "search_term": "kastaa",
    "translation": "KASTAA (verbi, transit)",
    "cases": [
      "kastaa + N ill",
      "kastaa + N tra"
    ],
    "examples": [
      "Kastan usein näkkileipää teehen.",
      "En uskalla kastaa jalkaani jääkylmään veteen.",
      "Pappi kastoi (= antoi nimen, risti) lapsen Villeksi."
    ]
  },
  {
    "search_term": "kasvaa",
    "translation": "KASVAA (verbi, intransit)",
    "cases": [
      "kasvaa + N tra",
      "kasvaa + N ela"
    ],
    "examples": [
      "Tukka kasvoi nopeasti pitkäksi.",
      "Puu on kasvanut liian korkeaksi.",
      "Lapset kasvoivat aikuisiksi.",
      "Pienestä siemenestä kasvoi korkea puu.",
      "Hänestä kasvoi komea mies."
    ]
  },
  {
    "search_term": "kateellinen",
    "translation": "KATEELLINEN (adj)",
    "cases": [
      "kateellinen + N all",
      "kateellinen + N ela"
    ],
    "examples": [
      "Hän on kateellinen kaikille ihmisille.",
      "Simo oli kateellinen Lasselle voitosta.",
      "Hän on kateellinen kaikille kaikesta."
    ]
  },
  {
    "search_term": "kateus",
    "translation": "KATEUS (subst)",
    "cases": [
      "kateus + N par + kohtaan"
    ],
    "examples": [
      "Simon kateus Lassea kohtaan on turhaa."
    ]
  },
  {
    "search_term": "katsella",
    "translation": "KATSELLA (verbi, transit)",
    "cases": [
      "katsella + O par"
    ],
    "examples": [
      "Katselin televisiota koko illan.",
      "Katselin kuuta ja ajattelin Seppoa."
    ]
  },
  {
    "search_term": "katsoa",
    "translation": "KATSOA (verbi, transit)",
    "cases": [
      "katsoa + O par",
      "katsoa + N ill",
      "katsoa + N ela/abl"
    ],
    "examples": [
      "Katsoitko sinä televisiota eilen?",
      "Katsokaa tätä taulua!",
      "Hän katsoi veteen ja näki paljon pikkukaloja.",
      "Liisa katsoi Pekkaa silmiin.",
      "Katso sana sanakirjasta!",
      "Voin katsoa osoitteen puhelinluettelosta.",
      "Katsoin ulos ikkunasta ja näin Kallen kadulla.",
      "Katso vastaus seuraavalta sivulta!"
    ]
  },
  {
    "search_term": "katua",
    "translation": "KATUA (verbi, transit)",
    "cases": [
      "katua + O par",
      "katua + että-lause"
    ],
    "examples": [
      "Kadun asiaa kovasti.",
      "Kaduimme päätöstä jäädä kotiin.",
      "Kadun sitä, että olin niin laiska silloin.",
      "Hän katui lähtemistään.",
      "Kadun, että menin sinne."
    ]
  },
  {
    "search_term": "kauhistella",
    "translation": "KAUHISTELLA (verbi, transit)",
    "cases": [
      "kauhistella + O par"
    ],
    "examples": [
      "Asiakas kauhisteli uutta hintaa.",
      "Murhaa kauhisteltiin vielä monta vuotta jälkeenpäin."
    ]
  },
  {
    "search_term": "kauhistua",
    "translation": "KAUHISTUA (verbi, transit)",
    "cases": [
      "kauhistua + N ela",
      "kauhistua + O par"
    ],
    "examples": [
      "Katri kauhistui pornokuvista.",
      "He kauhistuivat uutisesta niin etteivät voineet nukkua.",
      "Kauhistuin sitä, että minun täytyykin mennä sinne yksin.",
      "Olimme kauhistuneita miehen käytöksestä.",
      "Olen kauhistunut pelkästä ajatuksesta, että hän tulee tänne."
    ]
  },
  {
    "search_term": "kauhistunut",
    "translation": "KAUHISTUNUT (adj)",
    "cases": [],
    "examples": [
      "kauhistunut N ela",
      "Hän on kauhistunut siitä, että hänen täytyy muuttaa pois."
    ]
  },
  {
    "search_term": "kauhistuttaa",
    "translation": "KAUHISTUTTAA (verbi, transit)",
    "cases": [
      "kauhistuttaa + O par",
      "kauhistuttaa + V 1. inf",
      "kauhistuttaa + että-lause"
    ],
    "examples": [
      "Minua kauhistutti ajatus matkustaa sinne yksin.",
      "Uutinen kauhistutti kaikkia ihmisiä.",
      "Häntä kauhistutti kertoa totuus.",
      "Häntä kauhistutti, että hän oli kadottanut passinsa."
    ]
  },
  {
    "search_term": "kehdata",
    "translation": "KEHDATA (verbi, transit)",
    "cases": [
      "kehdata + V 1. inf."
    ],
    "examples": [
      "Kehtaatko sinä sanoa sen hänelle?",
      "Kuinka sinä kehtasit käyttäytyä niin rumasti?"
    ]
  },
  {
    "search_term": "kehittyä",
    "translation": "KEHITTYÄ (verbi, intransit)",
    "cases": [
      "kehittyä + N ela",
      "kehittyä + N tra"
    ],
    "examples": [
      "Pojasta kehittyi komea mies.",
      "Hänestä on kehittynyt loistava pianisti.",
      "Hän kehittyi hyväksi taiteilijaksi."
    ]
  },
  {
    "search_term": "kehittää",
    "translation": "KEHITTÄÄ (verbi, transit) — проявлять (слово из времен, когда не было цифровых камер)",
    "cases": [
      "kehittää + N ela"
    ],
    "examples": [
      "Valokuvaamo kehitti kuvasta suurennoksen."
    ]
  },
  {
    "search_term": "kehottaa",
    "translation": "KEHOTTAA (verbi, transit)",
    "cases": [
      "kehottaa + O par + V -mAAn"
    ],
    "examples": [
      "Kehotin Ninaa hakemaan stipendiä.",
      "Lääkäri kehotti minua lepäämään.",
      "Opettaja kehotti meitä harjoittelemaan enemmän.",
      "Liikennepoliisi kehotti heitä varomaan liukasta keliä."
    ]
  },
  {
    "search_term": "kehotus",
    "translation": "KEHOTUS (subst)",
    "cases": [
      "kehotus + V 1. inf"
    ],
    "examples": [
      "Kehotus olla varovainen ei ollut turha.",
      "Saimme kehotuksen maksaa laskut heti."
    ]
  },
  {
    "search_term": "kehua",
    "translation": "KEHUA (verbi, transit)",
    "cases": [
      "kehua + O par",
      "kehua + N ela",
      "kehua + N tra"
    ],
    "examples": [
      "Hän kehui sinua kovasti.",
      "Musiikkiarvostelija kehui konserttia.",
      "Isä kehui poikaa hyvästä työstä.",
      "Hän kehui näytelmää hyväksi.",
      "Pirkko kehui Mattia loistavaksi kokiksi."
    ]
  },
  {
    "search_term": "keino",
    "translation": "KEINO (subst)",
    "cases": [
      "keino + V 1. inf"
    ],
    "examples": [
      "Tämä on hyvä keino auttaa Eeroa."
    ]
  },
  {
    "search_term": "keinuttaa",
    "translation": "KEINUTTAA (verbi, transit)",
    "cases": [
      "keinuttaa + O par"
    ],
    "examples": [
      "Tuuli keinutti laivaa.",
      "Mummo keinuttaa vauvaa sylissään."
    ]
  },
  {
    "search_term": "kellua",
    "translation": "KELLUA (verbi, intransit)",
    "cases": [
      "kellua + N ine/ade"
    ],
    "examples": [
      "Kelluin vedessä kauan.",
      "Keiton pinnalla kellui rasvaa."
    ]
  },
  {
    "search_term": "kelvata",
    "translation": "KELVATA (verbi, intransit)",
    "cases": [
      "kelvata + N ill/all"
    ],
    "examples": [
      "Tämä ei kelpaa mihinkään.",
      "Nuo vanhat kengät kelpaavat hyvin sateeseen.",
      "Tämä sohva kelpaa kierrätykseen.",
      "Huono tyo ei kelvannut opettajalle."
    ]
  },
  {
    "search_term": "keritä",
    "translation": "KERITÄ (verbi, intransit)",
    "cases": [
      "keritä + 1. inf/-mAAn"
    ],
    "examples": [
      "Kerkiatkö tulla huomenna?",
      "Kerkiän tulemaan teille vasta illalla.",
      "En kerinnyt saada tätä valmiiksi.",
      "He kerkisivat saamaan postin jo aamulla."
    ]
  },
  {
    "search_term": "kerskailla",
    "translation": "KERSKAILLA (verbi, intransit)",
    "cases": [
      "kerskailla + N ade"
    ],
    "examples": [
      "Roope kerskailee (= ylpeilee, leuhkii) rahoillaan."
    ]
  },
  {
    "search_term": "kertomus",
    "translation": "KERTOMUS (subst)",
    "cases": [
      "kertomus + N ela"
    ],
    "examples": [
      "Susannan kertomus matkasta oli kiinnostava.",
      "Tuntevatko kaikki kertomuksen Punahilkasta?"
    ]
  },
  {
    "search_term": "kertoa",
    "translation": "KERTOA (verbi, transit)",
    "cases": [
      "kertoa + N ela",
      "kertoa + N all"
    ],
    "examples": [
      "Kerro meille Liisasta!",
      "Kertokaa minulle jotakin kotimaastanne!",
      "Mikko-setä kertoi Afrikan eläimistä.",
      "Saanko kertoa teille pari vitsiä?"
    ]
  },
  {
    "search_term": "kertyä",
    "translation": "KERTYÄ (verbi, intransit)",
    "cases": [
      "kertyä + N ill/all"
    ],
    "examples": [
      "Kassaan kertyi rahaa yli tuhat markkaa.",
      "Tilaisuuteen kertyi paljon opiskelijoita.",
      "Taivaalle kertyi pilviä."
    ]
  },
  {
    "search_term": "kerätä",
    "translation": "KERÄTÄ (verbi, transit)",
    "cases": [
      "kerätä + N ela/abl",
      "kerätä + N ill/all"
    ],
    "examples": [
      "Keräsimme marjat maasta.",
      "Risto kerää roskat lattialta.",
      "Kerätkää lehdet pöydältä ja viekää ne pois!",
      "Keräsin postimerkit laatikkoon.",
      "Antti keräsi paperit lattialta pöydälle."
    ]
  },
  {
    "search_term": "kerääntyä",
    "translation": "KERÄÄNTYÄ (verbi, intransit)",
    "cases": [
      "kerääntyä + N ill/all",
      "kerääntyä + V -maan"
    ],
    "examples": [
      "Juhlayleisö kerääntyi saliin.",
      "Nuoriso kerääntyy perjantaisin asematie.",
      "Urheilijat kerääntyivät stadionille harjoittelemaan.",
      "Nuoret kerääntyivät kadulle osoittamaan mieltään."
    ]
  },
  {
    "search_term": "keskittyä",
    "translation": "KESKITTYÄ (verbi, intransit)",
    "cases": [
      "keskittyä + N ill/all"
    ],
    "examples": [
      "Maija osaa keskittyä tehtäviin hyvin.",
      "Valta on keskittynyt pääkaupunkiin.",
      "Talousasiat ovat keskittyneet hallitukselle."
    ]
  },
  {
    "search_term": "keskittää",
    "translation": "KESKITTÄÄ (verbi, transit)",
    "cases": [
      "keskittää + N ill/all"
    ],
    "examples": [
      "Olemme keskittäneet ostoksemme yhteen tavarataloon.",
      "Yliopisto keskittää informaation neuvontatoimistoon.",
      "Liikennevalvonta on keskitetty poliiseille."
    ]
  },
  {
    "search_term": "keskustelu",
    "translation": "KESKUSTELU (subst)",
    "cases": [
      "keskustelu + N ela"
    ],
    "examples": [
      "Haluaisin keskustella kanssanne tästä asiasta."
    ]
  },
  {
    "search_term": "keskustella",
    "translation": "KESKUSTELLA (verbi, intransit)",
    "cases": [
      "keskustella + N ela"
    ],
    "examples": [
      "Keskustelu asiasta jatkuu.",
      "Keskustelu kokouksen järjestämisestä oli vilkasta."
    ]
  },
  {
    "search_term": "kiduttaa",
    "translation": "KIDUTTAA (verbi, transit)",
    "cases": [
      "kiduttaa + O par"
    ],
    "examples": [
      "Vankia kidutettiin sodan aikana.",
      "On parempi tappaa kala heti kuin kiduttaa sitä."
    ]
  },
  {
    "search_term": "kielletty",
    "translation": "KIELLETTY (adj)",
    "cases": [
      "kielletty + N abl"
    ],
    "examples": [
      "Pasi menee katsomaan lapsilta kiellettyä elokuvaa.",
      "Alle 16-vuotiailta kielletyt filmit ovat liian väkivaltaisia."
    ]
  },
  {
    "search_term": "kieltäytyä",
    "translation": "KIELTÄYTYÄ (verbi, intransit)",
    "cases": [
      "kieltäytyä + N ela",
      "kieltäytyä + V -mAstA"
    ],
    "examples": [
      "On vaikea kieltäytyä tästä asiasta.",
      "Kaija kieltäytyi tarjouksesta.",
      "Kieltäydyn syömästä mämmiä.",
      "Hän kieltäytyi tekemästä ylitöitä.",
      "Asiakas kieltäytyi maksamasta."
    ]
  },
  {
    "search_term": "kieltää",
    "translation": "KIELTÄÄ (verbi, transit)",
    "cases": [
      "kieltää + O par + V -mAstA",
      "kieltää + N abl"
    ],
    "examples": [
      "Kielsin häntä lähtemästä matkalle.",
      "Pankki kielsi heitä ostamasta uutta taloa.",
      "Hän kielsi minua polttamasta tupakkaa.",
      "Lääkäri kielsi minulta tupakanpolton."
    ]
  },
  {
    "search_term": "kiidättää",
    "translation": "KIIDÄTTÄÄ (verbi, transit)",
    "cases": [
      "kiidättää + ill/all"
    ],
    "examples": [
      "Ambulanssi kiidätti hänet sairaalaan.",
      "Matkustajat kiidätettiin lentokentälle."
    ]
  },
  {
    "search_term": "kiihottaa",
    "translation": "KIIHOTTAA (verbi, transit)",
    "cases": [
      "kiihottaa + O par"
    ],
    "examples": [
      "Hyvä kirja kiihottaa mielikuvitusta.",
      "Valkosipulin tuoksu kiihottaa ruokahalua."
    ]
  },
  {
    "search_term": "kiihtyä",
    "translation": "KIIHTYÄ (verbi, intransit)",
    "cases": [
      "kiihtyä + N ela",
      "kiihtyä + N all"
    ],
    "examples": [
      "Mistä sinä nyt noin kiihdyit?",
      "Minä kiihdyn usein ihan turhasta.",
      "Hän kiihtyi minulle jostakin."
    ]
  },
  {
    "search_term": "kiinnittää",
    "translation": "KIINNITTÄÄ (verbi, transit)",
    "cases": [
      "kiinnittää + N ill"
    ],
    "examples": [
      "Kiinnitimme veneen köydellä laituriin.",
      "Kiinnitin heti huomiota häneen.",
      "Yleisö kiinnitti katseensa laulajaan."
    ]
  },
  {
    "search_term": "kiinnostaa",
    "translation": "KIINNOSTAA (verbi, transit)",
    "cases": [
      "kiinnostaa + O par",
      "kiinnostaa + V 1. inf"
    ],
    "examples": [
      "Asia kiinnostaa minua.",
      "Kiinnostaisiko sinua lähteä teatteriin?",
      "Minua kiinnostaa tietää, kuinka tentissä kävi."
    ]
  },
  {
    "search_term": "kiinnostua",
    "translation": "KIINNOSTUA (verbi, intransit)",
    "cases": [
      "kiinnostua + N ela",
      "kiinnostua + V -mAAn"
    ],
    "examples": [
      "Hän kiinnostui heti asiasta.",
      "Kiinnostuin jo nuorena klassisesta musiikista.",
      "Hän on kiinnostunut auton korjaamisesta.",
      "Tuula kiinnostui tutkimaan tähtiä jo lapsena.",
      "Utelias ihminen on kiinnostunut kaikesta.",
      "Joel on jo kiinnostunut tytöistä.",
      "He olivat hyvin kiinnostuneita näyttelystä.",
      "Olisimme kiinnostuneita näkemään taiteilijan uuden näyttelyn."
    ]
  },
  {
    "search_term": "kiinnostunut",
    "translation": "KIINNOSTUNUT (adj)",
    "cases": [
      "kiinnostunut + N ela",
      "kiinnostunut + V -mAAn"
    ],
    "examples": [
      "Olen kiinnostunut tietämään, kuinka tentissä kävi."
    ]
  },
  {
    "search_term": "kiinnostus",
    "translation": "KIINNOSTUS (subst)",
    "cases": [
      "kiinnostus + N ill",
      "kiinnostus + N par + kohtaan"
    ],
    "examples": [
      "Kiinnostus matematiikkaan on kasvanut.",
      "Kiinnostus matematiikkaa kohtaan on kasvanut."
    ]
  },
  {
    "search_term": "kiintyä",
    "translation": "KIINTYÄ (verbi, intransit)",
    "cases": [
      "kiintyä + N ill"
    ],
    "examples": [
      "Kiinnyimme kissaan heti.",
      "Kiinnyin häneen jo, kun hän oli ensimmäisen kerran Suomessa."
    ]
  },
  {
    "search_term": "kiintynyt",
    "translation": "KIINTYNYT (adj)",
    "cases": [
      "kiintynyt + N ill"
    ],
    "examples": [
      "Leena on kiintynyt Lauriin.",
      "He ovat kovin kiintyneitä toisiinsa."
    ]
  },
  {
    "search_term": "kiire",
    "translation": "KIIRE (subst)",
    "cases": [
      "kiire + N ill/all",
      "kiire + V 1. inf"
    ],
    "examples": [
      "Mihin sinulla on kiire?",
      "Hänellä oli kiire bussiin.",
      "Kello on jo paljon, nyt on kiire asemalle.",
      "Minulla on kiire saada tämä valmiiksi huomiseksi."
    ]
  },
  {
    "search_term": "kiista",
    "translation": "KIISTA (subst)",
    "cases": [
      "kiista + N ela"
    ],
    "examples": [
      "Heillä on aina kiistaa (= kinaa) rahasta.",
      "Vanhemmille tuli kiistaa lasten kasvatuksesta."
    ]
  },
  {
    "search_term": "kiistellä",
    "translation": "KIISTELLÄ (verbi, intransit)",
    "cases": [
      "kiistellä + N ela"
    ],
    "examples": [
      "Me kiistelemme (= kinastelemme) kaikista asioista."
    ]
  },
  {
    "search_term": "kiitollinen",
    "translation": "KIITOLLINEN (adj)",
    "cases": [
      "kiitollinen + N ela",
      "kiitollinen + N all"
    ],
    "examples": [
      "Olen kiitollinen kaikesta avusta.",
      "Olen aina kiitollinen sinulle.",
      "Hän oli kiitollinen minulle hyvästä neuvosta."
    ]
  },
  {
    "search_term": "kiitos",
    "translation": "KIITOS (subst)",
    "cases": [
      "kiitos + N ela"
    ],
    "examples": [
      "Kiitos ruuasta!",
      "Kutes, kahvista ia hyvästä seurasta!",
      "Kiitos viimeisestä!"
    ]
  },
  {
    "search_term": "kiittää",
    "translation": "KIITTÄÄ (verbi, transit)",
    "cases": [
      "kiittää + O par",
      "kiittää + N ela"
    ],
    "examples": [
      "Kiitän sinua lämpimästi.",
      "He kiittivät ruuasta. Kiitän teitä kaikesta."
    ]
  },
  {
    "search_term": "kiivetä",
    "translation": "KIIVETÄ (verbi, intransit)",
    "cases": [
      "kiivetä + N ill/all"
    ],
    "examples": [
      "Kissa kiipesi puuhun.",
      "Talonmiehen täytyi kiivetä katolle."
    ]
  },
  {
    "search_term": "kiljua",
    "translation": "KILJUA (verbi, intransit)",
    "cases": [
      "kiljua + N ela"
    ],
    "examples": [
      "Lapset kiljuivat riemusta sirkuksessa.",
      "Potilas kiljui tuskasta."
    ]
  },
  {
    "search_term": "kilpailla",
    "translation": "KILPAILLA (verbi, intransit)",
    "cases": [
      "kilpailla + N ela"
    ],
    "examples": [
      "Kaikki kilpailivat ensimmäisestä palkinnosta."
    ]
  },
  {
    "search_term": "kilpailu",
    "translation": "KILPAILU (subst)",
    "cases": [
      "kilpailu + N ela"
    ],
    "examples": [
      "Voisimme järjestää kilpailun siitä asiasta.",
      "Kilpailu voitosta oli kova."
    ]
  },
  {
    "search_term": "kina",
    "translation": "KINA (subst)",
    "cases": [
      "kina + N ela"
    ],
    "examples": [
      "Meille tuli kinaa hinnasta."
    ]
  },
  {
    "search_term": "kinastella",
    "translation": "KINASTELLA (verbi, intransit)",
    "cases": [
      "kinastella + N ela"
    ],
    "examples": [
      "Mistä te taas kinastelette?",
      "Me kinastelimme hinnasta.",
      "He kinastelevat siitä, kumpi on oikeassa."
    ]
  },
  {
    "search_term": "kirje",
    "translation": "KIRJE (subst)",
    "cases": [
      "kirje + N ill/all",
      "kirje + N ela/abl"
    ],
    "examples": [
      "Mitä maksaa kirje Italiaan?",
      "Kirje Venäjälle maksaa muutaman markan.",
      "Onko tuo kirje Marialle vai Tinolle?",
      "Pöydällä on kirje Espanjasta.",
      "Kirje Mallorcalta viipyi 2 viikkoa.",
      "Posti toi kirjeen Fernandolta."
    ]
  },
  {
    "search_term": "kirjoittaa",
    "translation": "KIRJOITTAA (verbi, transit)",
    "cases": [
      "kirjoittaa + N ill/all",
      "kirjoittaa + N ela"
    ],
    "examples": [
      "Kirjoitin asiasta lehteen.",
      "Kirjoittakaa minulle pian!",
      "Kirjoitin Annelle kirjeen viime viikolla.",
      "Kirjoitan sinulle asiasta ensi viikolla.",
      "Aleksis Kivi kirjoitti maalaiselämästä."
    ]
  },
  {
    "search_term": "kirjoitus",
    "translation": "KIRJOITUS (subst)",
    "cases": [
      "kirjoitus + N ela"
    ],
    "examples": [
      "Oletko nähnyt kirjoituksen hänestä lehdessä?",
      "Kirjoituksia siitä asiasta näkee silloin tällöin."
    ]
  },
  {
    "search_term": "kirkua",
    "translation": "KIRKUA (verbi, intransit)",
    "cases": [
      "kirkua + N ela"
    ],
    "examples": [
      "Katsojat kirkuivat kauhusta elokuvateatterissa.",
      "Kiruin pelosta, kun näin käärmeen."
    ]
  },
  {
    "search_term": "kiukutella",
    "translation": "KIUKUTELLA (verbi, intransit)",
    "cases": [
      "kiukutella + ela"
    ],
    "examples": [
      "Mistä sinä nyt taas kiukuttelet?",
      "Veera kiukuttelee viikkorahasta, se on hänestä liian pieni."
    ]
  },
  {
    "search_term": "kiukuttaa",
    "translation": "KIUKUTTAA (verbi, transit)",
    "cases": [
      "kiukuttaa + O par"
    ],
    "examples": [
      "Kiukuttaako sinua joku asia?",
      "Maanantaiaamut kiukuttavat minua."
    ]
  },
  {
    "search_term": "kiusata",
    "translation": "KIUSATA (verbi, transit)",
    "cases": [
      "kiusata + O par"
    ],
    "examples": [
      "He kiusaavat häntä aina.",
      "Pojat kiusasivat tyttöjä pihalla."
    ]
  },
  {
    "search_term": "kiusaus",
    "translation": "KIUSAUS (subst)",
    "cases": [
      "kiusaus + V 1. inf"
    ],
    "examples": [
      "Minulla oli suuri kiusaus kertoa hänelle totuus."
    ]
  },
  {
    "search_term": "kiva",
    "translation": "KIVA (adj)",
    "cases": [
      "kiva + V 1. inf"
    ],
    "examples": [
      "Kiva nähdä sinua pitkästä aikaa!",
      "Minusta on kiva oppia uusia kieliä."
    ]
  },
  {
    "search_term": "koettaa",
    "translation": "KOETTAA (verbi, transit)",
    "cases": [
      "koettaa + O par",
      "koettaa + V 1. inf"
    ],
    "examples": [
      "Koeta tuota patteria, se on ihan kylmä!",
      "Voinko koettaa (= sovittaa) tätä punaista hametta?",
      "Koeta päällesi tätä takkia!",
      "Koeta (= yritä) tehdä jotakin!",
      "Koetin olla niin kuin en huomaisi mitään."
    ]
  },
  {
    "search_term": "kohdata",
    "translation": "KOHDATA (verbi, transit)",
    "cases": [
      "kohdata + N ine/ade"
    ],
    "examples": [
      "Kohtasimme sattumalta toisemme Pariisissa.",
      "Kohtasin hänet kadulla."
    ]
  },
  {
    "search_term": "kohdella",
    "translation": "KOHDELLA (verbi, transit)",
    "cases": [
      "kohdella + O par"
    ],
    "examples": [
      "Kauppias kohtelee asiakkaita hyvin.",
      "Kohteleeko hän koiraa huonosti?",
      "Minua kohdeltiin hyvin.",
      "Opettaja kohtelee kaikkia oppilaita samalla tavalla.",
      "Filmi parani loppua kohden.",
      "Käännyin ääntä kohden."
    ]
  },
  {
    "search_term": "kohdistaa",
    "translation": "KOHDISTAA (verbi, transit)",
    "cases": [
      "kohdistaa + N ill/all"
    ],
    "examples": [
      "Hän kohdisti katseensa minuun.",
      "Pappi kohdisti sanansa nuorille."
    ]
  },
  {
    "search_term": "kohdistua",
    "translation": "KOHDISTUA (verbi, intransit)",
    "cases": [
      "kohdistua + N ill"
    ],
    "examples": [
      "Huomio kohdistui heti presidenttiin.",
      "Kaikki katseet kohdistuivat minuun."
    ]
  },
  {
    "search_term": "kokeilla",
    "translation": "KOKEILLA (verbi, transit)",
    "cases": [
      "kokeilla + O par"
    ],
    "examples": [
      "Kokeilimme uutta metodia.",
      "Kokeile (= sovita) tätä takkia."
    ]
  },
  {
    "search_term": "kokematon",
    "translation": "KOKEMATON (adj)",
    "cases": [
      "kokematon + V -mAAn"
    ],
    "examples": [
      "Hän on liian kokematon tutkimaan tätä asiaa."
    ]
  },
  {
    "search_term": "kokemus",
    "translation": "KOKEMUS (subst)",
    "cases": [
      "kokemus + N ela"
    ],
    "examples": [
      "Onko teillä aikaisempaa kokemusta tästä työstä?",
      "Millaisia kokemuksia heillä on tietokoneen käytöstä?",
      "Hänellä oli vain hyviä kokemuksia matkustamisesta."
    ]
  },
  {
    "search_term": "kokoinen",
    "translation": "KOKOINEN (adj)",
    "cases": [
      "N gen + kokoinen"
    ],
    "examples": [
      "Hän on saman kokoinen kuin Leena.",
      "Helsingin kokoisessa kaupungissa tarvitaan monta bussilinjaa.",
      "Huom! isokokoinen, pienikokoinen"
    ]
  },
  {
    "search_term": "kokoontua",
    "translation": "KOKOONTUA (verbi, intransit)",
    "cases": [
      "kokoontua + N ill/all",
      "kokoontua + V -mAAn"
    ],
    "examples": [
      "Koululaiset kokoontuivat juhlasaliin.",
      "Ihmiset kokoontuvat aamulla pysäkille.",
      "He kokoontuivat olohuoneeseen katsomaan televisiota."
    ]
  },
  {
    "search_term": "komentaa",
    "translation": "KOMENTAA (verbi, transit)",
    "cases": [
      "komentaa + N ill/all",
      "komentaa + V -mAAn"
    ],
    "examples": [
      "Kuningas komensi miehet sotaan.",
      "Komennan koiran pihalle.",
      "Äiti komensi lapset nukkumaan."
    ]
  },
  {
    "search_term": "kommentoida",
    "translation": "KOMMENTOIDA (verbi, transit)",
    "cases": [
      "kommentoida + O par"
    ],
    "examples": [
      "Helsingin Sanomat kommentoi asiaa etusivulla."
    ]
  },
  {
    "search_term": "kommentti",
    "translation": "KOMMENTTI (subst)",
    "cases": [
      "kommentti + N ill"
    ],
    "examples": [
      "Mikä on kommenttinne tähän asiaan, herra presidentti?"
    ]
  },
  {
    "search_term": "kompastua",
    "translation": "KOMPASTUA (verbi, intransit)",
    "cases": [
      "kompastua + N iii",
      "kompastua + N ine/ade"
    ],
    "examples": [
      "Hän kompastui kiveen.",
      "Älä kompastu kynnykseen!",
      "Kompastuin eiien rappusissa.",
      "Urheilija kompastui kentällä."
    ]
  },
  {
    "search_term": "kontakti",
    "translation": "KONTAKTI (subst)",
    "cases": [
      "kontakti + N iii",
      "kontakti + N gen + kanssa"
    ],
    "examples": [
      "En saanut minkäänlaista kontaktia häneen.",
      "Yliopistolla on kontakteja monien muiden korkeakoulujen kanssa.",
      "On vaikea päästä kontaktiin hänen kanssaan."
    ]
  },
  {
    "search_term": "koostua",
    "translation": "KOOSTUA (verbi, intransit)",
    "cases": [
      "koostua + N ela"
    ],
    "examples": [
      "Lause koostuu sanoista.",
      "Hallitus koostuu ministereistä."
    ]
  },
  {
    "search_term": "koota",
    "translation": "KOOTA (verbi, transit)",
    "cases": [
      "koota + N ill/all",
      "koota + N ela/abl"
    ],
    "examples": [
      "Antti kokosi kalat ämpäriin.",
      "Kokosin paperit laukkuun.",
      "Lapset kokosivat lelut laatikkoon.",
      "Kootkaa tavarat hyllylle!",
      "Timo on koonnut astiat tiskipöydälle.",
      "Pääministeri kokosi hallituksen eri puolueista.",
      "Kokosin paperit pöydältä ja panin ne salkkuun."
    ]
  },
  {
    "search_term": "koputtaa",
    "translation": "KOPUTTAA (verbi, transit)",
    "cases": [
      "koputtaa + O par",
      "koputtaa + N ill"
    ],
    "examples": [
      "Taikauskoinen ihminen koputtaa puuta kolme kertaa.",
      "Joulupukki koputti oveen.",
      "Kuka koputtaa ikkunaan?"
    ]
  },
  {
    "search_term": "koristella",
    "translation": "KORISTELLA (verbi, transit)",
    "cases": [
      "koristella + N ade"
    ],
    "examples": [
      "Me koristelimme kuusen kynttilöillä.",
      "Irmeli koristeli huoneen ilmapalloilla ja serpentiineillä."
    ]
  },
  {
    "search_term": "korjaus",
    "translation": "KORJAUS (subst)",
    "cases": [
      "korjaus + N ill"
    ],
    "examples": [
      "Hän teki pieniä korjauksia tekstiin."
    ]
  },
  {
    "search_term": "korkuinen",
    "translation": "KORKUINEN (adj)",
    "cases": [
      "N gen + korkuinen"
    ],
    "examples": [
      "Koivu on nyt talon korkuinen.",
      "Meillä on melkein sinun korkuisesi aita.",
      "Pöytä on sopivan korkuinen."
    ]
  },
  {
    "search_term": "korostaa",
    "translation": "KOROSTAA (verbi, transit)",
    "cases": [
      "korostaa + O par"
    ],
    "examples": [
      "Hän korosti asiaa vielä kerran.",
      "Asian tärkeyttä ei voi liiaksi korostaa.",
      "Vihreä puku korostaa silmiesi väriä."
    ]
  },
  {
    "search_term": "korvata",
    "translation": "KORVATA (verbi, transit)",
    "cases": [
      "korvata + N ade"
    ],
    "examples": [
      "Saat korvata voin margariinilta.",
      "Millä te korvaatte tämän?",
      "Tätä ei voi korvata rahalla."
    ]
  },
  {
    "search_term": "korvaus",
    "translation": "KORVAUS (subst)",
    "cases": [
      "korvaus + N ela"
    ],
    "examples": [
      "He odottavat korvausta tulipalosta.",
      "Oletko saanut korvauksen vahingosta?"
    ]
  },
  {
    "search_term": "kosia",
    "translation": "KOSIA (verbi, transit)",
    "cases": [
      "kosia + O par"
    ],
    "examples": [
      "Liisa kosi Pekkaa, vai kosiko Pekka Liisaa?"
    ]
  },
  {
    "search_term": "koskea",
    "translation": "KOSKEA (verbi, transit) — трогать, тронуть, коснуться, касаться ( то числе фигурально)",
    "cases": [
      "koskea + O par — коснуться чего-либо",
      "koskea + N ill — дотронуться до чего-либо"
    ],
    "examples": [
      "Koskeeko tämä sinua jollakin tavalla? — Касается ли это тебя каким-либо образом?",
      "Mitä asia koskee?",
      "Kysymys koski budjettia.",
      "Esineisiin ei saa koskea! Älä koske minuun!",
      "Vatsaan koskee (= vatsa on kipeä).",
      "Mihin hampaaseen sinua koskee? — Какой зуб у тебя болит?"
    ]
  },
  {
    "search_term": "koskettaa",
    "translation": "KOSKETTAA (verbi, transit)",
    "cases": [
      "koskettaa + O par"
    ],
    "examples": [
      "Lopulta lentokone kosketti maata.",
      "Asia koskettaa meitä kaikkia."
    ]
  },
  {
    "search_term": "kostaa",
    "translation": "KOSTAA (verbi, transit)",
    "cases": [
      "kostaa + N all"
    ],
    "examples": [
      "Kyllä minä vielä kostan sinulle!",
      "Kullervo kosti emännälle pahan teon."
    ]
  },
  {
    "search_term": "kotiutua",
    "translation": "KOTIUTUA (verbi, intransit)",
    "cases": [
      "kotiutua + N ill/all",
      "kotiutua + N ela/abl"
    ],
    "examples": [
      "Olen kotiutunut hyvin Suomeen.",
      "Kuinka olette kotiutuneet uuteen asuntoon?",
      "Hän kotiutui nopeasti Vantaalle.",
      "Saara on jo kotiutunut sairaalasta.",
      "Antero kotiutuu armeijasta ensi kuussa.",
      "He kotiutuivat matkalta viime viikonloppuna."
    ]
  },
  {
    "search_term": "kouluttaa",
    "translation": "KOULUTTAA (verbi, transit)",
    "cases": [
      "kouluttaa + N ill",
      "kouluttaa + N tra",
      "kouluttaa + N ela"
    ],
    "examples": [
      "Mihin ammattiin tämä oppilaitos kouluttaa?",
      "Markkinointikurssi kouluttaa myyntityöhön.",
      "Poliisiopisto koulutti Pekan poliisiksi.",
      "Isä koulutti molemmat lapsensa lääkäriksi.",
      "Me koulutimme tytöstä maisterin."
    ]
  },
  {
    "search_term": "kova",
    "translation": "KOVA (adj)",
    "cases": [
      "kova + V -mAAn"
    ],
    "examples": [
      "Kalle on kova lukemaan {= lukee paljon) kirjoja.",
      "Hän on kova tanssimaan (= käy usein tanssimassa)."
    ]
  },
  {
    "search_term": "kritiikki",
    "translation": "KRITIIKKI (subst)",
    "cases": [
      "kritiikki + N par + kohtaan"
    ],
    "examples": [
      "Hän esitti kritiikkiä suunnitelmaa kohtaan.",
      "Johtajaa kohtaan on lausuttu ankaraa kritiikkiä."
    ]
  },
  {
    "search_term": "kritisoida",
    "translation": "KRITISOIDA (KRITIKOIDA) (verbi, transit)",
    "cases": [
      "kritisoida + O par"
    ],
    "examples": [
      "Lehdet ovat kritisoineet häntä.",
      "Hänen toimintaansa on kritisoitu ankarasti."
    ]
  },
  {
    "search_term": "kruunata",
    "translation": "KRUUNATA (verbi, transit)",
    "cases": [
      "kruunata + N tra"
    ],
    "examples": [
      "Kansa kruunasi hänet kuninkaaksi vuonna 1520."
    ]
  },
  {
    "search_term": "kuitti",
    "translation": "KUITTI (subst)",
    "cases": [
      "kuitti + N ela"
    ],
    "examples": [
      "Asiakas sai kuitin ostoksesta.",
      "Antoiko hän kuitin maksusta?",
      "He vaativat kuitin kirjoista."
    ]
  },
  {
    "search_term": "kuiskata",
    "translation": "KUISKATA (verbi, transit)",
    "cases": [
      "kuiskata + N all"
    ],
    "examples": [
      "Hän kuiskasi minulle salaisuuden."
    ]
  },
  {
    "search_term": "kulua",
    "translation": "KULUA (verbi, intransit)",
    "cases": [
      "kulua + N ill",
      "kulua + N ela",
      "kuluttaa + N ill"
    ],
    "examples": [
      "Ruokaan kuluu liian paljon rahaa.",
      "Suurin osa ajasta kului odottamiseen. Puolet palkasta kuluu vuokraan.",
      "Ullan syntymäpäivästä on jo kulunut kolme viikkoa.",
      "KULUTTAA {verbi, transit)",
      "Hän kuluttaa kaikki rahansa vaatteisiin.",
      "Me kulutamme paljon aikaa television katselemiseen."
    ]
  },
  {
    "search_term": "kummastella",
    "translation": "KUMMASTELLA (verbi, transit)",
    "cases": [
      "kummastella + O par"
    ],
    "examples": [
      "Kaikki kummastelivat uutta kampaustani.",
      "Monet ovat kummastelleet samaa asiaa."
    ]
  },
  {
    "search_term": "kummastua",
    "translation": "KUMMASTUA (verbi, intransit)",
    "cases": [
      "kummastua + N ela"
    ],
    "examples": [
      "Mistä sinä olet noin kummastunut?",
      "Hän kummastui kysymyksestä kovasti."
    ]
  },
  {
    "search_term": "kunnia",
    "translation": "KUNNIA (subst)",
    "cases": [
      "kunnia + N ela"
    ],
    "examples": [
      "Kunnia työstä kuuluu meille kaikille."
    ]
  },
  {
    "search_term": "kunnioittaa",
    "translation": "KUNNIOITTAA (verbi, transit)",
    "cases": [
      "kunnioittaa + O par",
      "kunnioittaa + N ess"
    ],
    "examples": [
      "Me kunnioitamme häntä.",
      "Kansalaisten pitää kunnioittaa lakia.",
      "Kunnioitan hänen mielipidettään.",
      "Kunnioitan häntä äitinä suuresti.",
      "Kunnioitamme presidenttiä ihmisenä ja johtajana."
    ]
  },
  {
    "search_term": "kuolla",
    "translation": "KUOLLA (verbi, intransit)",
    "cases": [
      "kuolla + N ill"
    ],
    "examples": [
      "Hän kuoli syöpään.",
      "Isä kuoli tuberkuloosiin.",
      "Ystäväni on kuollut aidsiin."
    ]
  },
  {
    "search_term": "kurkistaa",
    "translation": "KURKISTAA (verbi, intransit)",
    "cases": [
      "kurkistaa + N ela/abl",
      "kurkistaa + N ill/all"
    ],
    "examples": [
      "Äiti kurkisti ikkunasta.",
      "Tyttö kurkisti parvekkeelta alas.",
      "Hän kurkisti huoneeseen. Kurkistin pihalle."
    ]
  },
  {
    "search_term": "kutittaa",
    "translation": "KUTITTAA (verbi, transit)",
    "cases": [
      "kutittaa + O par",
      "kutittaa + N ela"
    ],
    "examples": [
      "Silmiäni kutittaa.",
      "Tukkani on likainen ja päänahkaa kutittaa.",
      "Hän kutitti minua jalkapohjasta.",
      "Ei saa kutittaa kainalosta!"
    ]
  },
  {
    "search_term": "kutsu",
    "translation": "KUTSU (subst)",
    "cases": [
      "kutsu + ill/all"
    ],
    "examples": [
      "Sain kutsun Liisan juhliin.",
      "Oletko saanut kutsun Heikin syntymäpäiville?"
    ]
  },
  {
    "search_term": "kutsua",
    "translation": "KUTSUA (verbi, transit)",
    "cases": [
      "kutsua + N ill/all",
      "kutsua + N tra",
      "kutsua + O par + N tra",
      "kutsua + V -mAAn"
    ],
    "examples": [
      "Haluaisin kutsua sinut teatteriin.",
      "Salmiset kutsuivat meidät kylään.",
      "Haluaisimme kutsua sinut päivälliselle.",
      "He kutsuivat minut heille viikonloppuna.",
      "Kutsuimme Elisan meille jouluvieraaksi.",
      "Presidentti kutsuttiin tilaisuuteen juhlapuhujaksi.",
      "Kutsun kissaani Misseksi.",
      "Liisaa on aina kutsuttu Lissuksi.",
      "Hän kutsui meidät syömään kello 12.",
      "Yliopisto kutsui tutkijan puhumaan ekologiasta."
    ]
  },
  {
    "search_term": "kuulla",
    "translation": "KUULLA (verbi, transit)",
    "cases": [
      "kuulla + N ela/abl",
      "kuulla + että-lause"
    ],
    "examples": [
      "Kuulimme uutisen radiosta.",
      "Hän kuuli sen TV-uutisista.",
      "Kuulin onnettomuudesta vasta illalla.",
      "Oletko kuullut hänestä mitään viime aikoina?",
      "En ole kuullut Maijasta mitään pitkään aikaan.",
      "Keneltä kuulit uutisen?",
      "Kuulin sen Karilta.",
      "Kuulin, että hän on sairastunut.",
      "He eivät kuulleet, että puhelin soi.",
      "Oletko kuullut, että Nancy on mennyt naimisiin?"
    ]
  },
  {
    "search_term": "kuulostaa",
    "translation": "KUULOSTAA (verbi, intransit)",
    "cases": [
      "kuulostaa + N abl"
    ],
    "examples": [
      "Miltä tämä kuulostaa?",
      "Se kuulostaa mukavalta.",
      "Idea kuulosti hyvältä."
    ]
  },
  {
    "search_term": "kuulua",
    "translation": "KUULUA (verbi, intransit)",
    "cases": [
      "kuulua + N ill/all",
      "kuulua + N ela/abl"
    ],
    "examples": [
      "Nämä tavarat kuuluvat tuohon kaappiin.",
      "Mihin nämä kirjat kuuluvat?",
      "Nämä lasit kuuluvat ylähyllylle.",
      "He kuuluvat samaan puolueeseen.",
      "Mitä kotiin kuuluu?",
      "Mitä sinulle kuuluu?",
      "Elsalle kuuluu pelkkää hyvää.",
      "Tämä ei kuulu sinulle!",
      "Onko heistä kuulunut mitään?",
      "Kadulta kuuluu kovaa meteliä."
    ]
  },
  {
    "search_term": "kuunnella",
    "translation": "KUUNNELLA (verbi, transit)",
    "cases": [
      "kuunnella + O par"
    ],
    "examples": [
      "Kuuntele minua!",
      "Hän kuuntelee radiota aina aamulla."
    ]
  },
  {
    "search_term": "kuulustella",
    "translation": "KUULUSTELLA (verbi, transit)",
    "cases": [
      "kuulustella + O par"
    ],
    "examples": [
      "Poliisi kuulusteli minua koko yön.",
      "Oikeus kuulusteli kahta todistajaa.",
      "Äiti kuulusteli pojan englannin läksyä."
    ]
  },
  {
    "search_term": "kuva",
    "translation": "KUVA (subst)",
    "cases": [
      "kuva + N ela"
    ],
    "examples": [
      "Lehdessä oli kuva hotellista.",
      "Myös: hotellin kuva."
    ]
  },
  {
    "search_term": "kuvitella",
    "translation": "KUVITELLA (verbi, transit)",
    "cases": [
      "kuvitella + että-lause",
      "kuvitella + O + N tra"
    ],
    "examples": [
      "Kuvittelin, että täällä olisi ihan erilaista.",
      "Kuvittelin Suomen ihan erilaiseksi."
    ]
  },
  {
    "search_term": "kyetä",
    "translation": "KYETÄ (verbi, intransit) — мочь, быть способным (делать что-то)",
    "cases": [
      "kyetä + N ill",
      "kyetä + V -mAAn"
    ],
    "examples": [
      "Kykeneekö hän tähän työhön?",
      "Kyllä hän kykenee tekemään sen.",
      "Lapset eivät kyenneet heräämään aikaisin. — Дети не способны (не могут) просыпаться рано."
    ]
  },
  {
    "search_term": "kyky",
    "translation": "KYKY (subst)",
    "cases": [
      "kyky + N ill",
      "kyky + V 1. inf"
    ],
    "examples": [
      "Sinulla on kyky teoreettiseen ajatteluun.",
      "Kaijalla on tarvittavat kyvyt tähän työhön.",
      "Hänellä on kyky saada ihmiset iloisiksi."
    ]
  },
  {
    "search_term": "kyllästynyt",
    "translation": "KYLLÄSTYNYT (adj)",
    "cases": [
      "kyllästynyt + N ill"
    ],
    "examples": [
      "Olen kyllästynyt vanhoihin suomalaisiin elokuviin.",
      "Lapset ovat kyllästyneitä kaurapuuroon."
    ]
  },
  {
    "search_term": "kyllästyttää",
    "translation": "KYLLÄSTYTTÄÄ (verbi, transit)",
    "cases": [
      "kyllästyttää + O par",
      "kyllästyttää + V 1. inf"
    ],
    "examples": [
      "Mikon jutut kyllästyttävät meitä.",
      "Minua kyllästyttää kuunnella hänen juttujaan.",
      "Petteriä kyllästyttää syödä aina perunoita."
    ]
  },
  {
    "search_term": "kyllästyä",
    "translation": "KYLLÄSTYÄ (verbi, intransit)",
    "cases": [
      "kyllästyä + N ill",
      "kyllästyä + V -mAAn"
    ],
    "examples": [
      "Kyllästyin koulussa matematiikkaan.",
      "Hän kyllästyi minuun nopeasti.",
      "Kyllästyimme odottamiseen.",
      "Olen kyllästynyt odottamaan.",
      "Oskari on kyllästynyt opiskelemaan.",
      "Lapset kyllästyivät istumaan paikoillaan."
    ]
  },
  {
    "search_term": "kyse",
    "translation": "KYSE (subst)",
    "cases": [
      "kyse + N ela"
    ],
    "examples": [
      "Nyt on kyse sinusta.",
      "On kyse vaikeasta ongelmasta.",
      "Silloin oli kyse elämästä ja kuolemasta."
    ]
  },
  {
    "search_term": "kysellä",
    "translation": "KYSELLÄ (verbi, transit)",
    "cases": [
      "kysellä + O par",
      "kysellä + N ela/abl"
    ],
    "examples": [
      "Voit kysellä hintoja monesta kaupasta.",
      "Turistit kyselevät heiltä paljon asioita.",
      "Minulta kysellään sitä asiaa usein.",
      "Meiltä kysellään kaikenlaista."
    ]
  },
  {
    "search_term": "kysyä",
    "translation": "KYSYÄ (verbi, transit)",
    "cases": [
      "kysyä + O par",
      "kysyä + N ela/abl"
    ],
    "examples": [
      "Kysyin neuvoa lääkäriltä.",
      "Voinko kysyä yhtä asiaa?",
      "Onko joku kysynyt minua?",
      "Sinua kysytään puhelimessa.",
      "Mistä voin kysyä asiaa?",
      "Kysy asiaa toimistosta!",
      "Opettajalta voi aina kysyä.",
      "Kysy minulta ensin!"
    ]
  },
  {
    "search_term": "kytkeä",
    "translation": "KYTKEÄ (verbi, transit)",
    "cases": [
      "kytkeä + N ill"
    ],
    "examples": [
      "Hän kytki koiran puuhun.",
      "Minun on vaikea kytkeä näitä kahta asiaa toisiinsa."
    ]
  },
  {
    "search_term": "kärsiä",
    "translation": "KÄRSIÄ (verbi, intransit)",
    "cases": [
      "kärsiä + N ela"
    ],
    "examples": [
      "Mirja kärsii migreenistä.",
      "Maa kärsii kuivuudesta.",
      "Monet kärsivät tupakansavusta."
    ]
  },
  {
    "search_term": "käsitys",
    "translation": "KÄSITYS (subst)",
    "cases": [
      "käsitys + N ela"
    ],
    "examples": [
      "Millainen käsitys sinulla on tästä asiasta?",
      "Meillä on hyvä käsitys hänestä."
    ]
  },
  {
    "search_term": "käskeä",
    "translation": "KÄSKEÄ (verbi, transit)",
    "cases": [
      "käskeä + N gen + V 1. inf",
      "käskeä + O par + V -mAAn",
      "käskeä + N ill/all"
    ],
    "examples": [
      "Käskin hänen mennä ulos.",
      "Käskin häntä menemään ulos.",
      "Hän käskee Mattia lähtemään pois heti.",
      "Hän käski minut huoneeseen. Poliisi käski miehen pihalle.",
      "Johtaja käski meidät puheilleen."
    ]
  },
  {
    "search_term": "käsky",
    "translation": "KÄSKY (subst)",
    "cases": [
      "käsky + V 1. inf"
    ],
    "examples": [
      "He saivat käskyn lähteä."
    ]
  },
  {
    "search_term": "kätkeä",
    "translation": "KÄTKEÄ (verbi, transit)",
    "cases": [
      "kätkeä + N ill/all"
    ],
    "examples": [
      "Varas kätki tavarat metsään.",
      "Koira kätki luun naapurin puutarhaan.",
      "Mihin olet kätkenyt avaimen?",
      "Aseita oli kätketty pihalle."
    ]
  },
  {
    "search_term": "käydä",
    "translation": "KÄYDÄ (verbi, intransit)",
    "cases": [
      "käydä + N ine/ade",
      "käydä + V -mAssA"
    ],
    "examples": [
      "Minä voin käydä kaupassa tänään.",
      "Kävin viikonloppuna Turussa.",
      "Oletko käynyt Imatralla?",
      "Me käymme sunnuntaina kesämökillä.",
      "Käy ostamassa jäätelöä!",
      "Kävisitkö hakemassa postin?",
      "Huom! Käykää istumaan!"
    ]
  },
  {
    "search_term": "käydä",
    "translation": "KÄYDÄ (verbi, transit)",
    "cases": [
      "käydä + O par"
    ],
    "examples": [
      "Mohammed käy koulua Maunulassa.",
      "Suomi käy kauppaa Ison-Britannian kanssa.",
      "Balkanilla käytiin sotaa monta vuotta."
    ]
  },
  {
    "search_term": "käynti",
    "translation": "KÄYNTI (subst)",
    "cases": [
      "käynti + N ine/ade"
    ],
    "examples": [
      "Saunassa käynti virkisti minua.",
      "Matkaan sisältyy käynti Valkeakoskella."
    ]
  },
  {
    "search_term": "käyttää",
    "translation": "KÄYTTÄÄ (verbi, transit)",
    "cases": [
      "käyttää + O par",
      "käyttää + N ess",
      "käyttää + N ill"
    ],
    "examples": [
      "Käytä haarukkaa ja veistä kun syöt!",
      "Käytän pesukonetta melkein joka päivä.",
      "Käytätkö piilolaseja?",
      "Liisa käyttää juomalasia kukkamaljakkona.",
      "Käytin sanakirjaa apuna työssäni.",
      "Mihin sinä käytät rahasi?",
      "Käytän sen ruokaan ja vaatteisiin."
    ]
  },
  {
    "search_term": "käännös",
    "translation": "KÄÄNNÖS (subst)",
    "cases": [
      "käännös + N ela",
      "käännös + N"
    ],
    "examples": [
      "Tässä on tekstin käännös suomesta ruotsiin.",
      "Kuka tekee käännöksiä venäjästä suomeen?",
      "Hän tekee käännöksiä bulgarian kielestä saksaan.",
      "Minä teen käännöksiä englannista kiinaan."
    ]
  },
  {
    "search_term": "kääntyä",
    "translation": "KÄÄNTYÄ (verbi, intransit)",
    "cases": [
      "kääntyä + M ill/all",
      "kääntyä + N ela/abl",
      "kääntyä + N gen + puoleen"
    ],
    "examples": [
      "Auto kääntyi pihaan.",
      "Raitiovaunu kääntyy Mannerheimintielle.",
      "Ambulanssi kääntyi sivukadulle.",
      "Käänny seuraavasta kadunkulmasta oikealle!",
      "Vauva kääntyi vatsalleen.",
      "Bussi kääntyi Munkkiniemestä keskustaan päin.",
      "Käännyimme moottoritieltä Tapiolaan.",
      "Voitte kääntyä Liisan puoleen tässäkin asiassa."
    ]
  },
  {
    "search_term": "kääntää",
    "translation": "KÄÄNTÄÄ (verbi, transit)",
    "cases": [
      "kääntää + N tra/ill",
      "kääntää + N ela"
    ],
    "examples": [
      "Voitko kääntää tämän lauseen espanjaksi.",
      "Tulkki käänsi kysymyksen englanniksi.",
      "Onko Seitsemän veljestä käännetty saksaksi?",
      "Hän kääntää runoja ranskasta suomeen.",
      "Kuka osaa kääntää suomesta latinaan?",
      "Huom! Mille kielelle teksti on käännetty?",
      "Teksti on käännetty espanjan kielelle.",
      "Kalevala on käännetty monelle kielelle."
    ]
  },
  {
    "search_term": "raha",
    "translation": "RAHA (subst) — деньги",
    "cases": [
      "raha + N ill",
      "raha + V 1. inf",
      "raivoissa(an) + N ela"
    ],
    "examples": [
      "Minulla ei ole rahaa tähän.",
      "Onko teillä tasaraha bussilippuun?",
      "Miehellä ei ollut rahaa ostaa edes bussilippua.",
      "RAIVOISSA(AN) (adv)",
      "Olin aivan raivoissani hänen käytöksestään.",
      "Mistä sinä nyt noin raivoissasi olet?"
    ]
  },
  {
    "search_term": "raivostua",
    "translation": "RAIVOSTUA (verbi, intransit)",
    "cases": [
      "raivostua + N ali",
      "raivostua + N ela"
    ],
    "examples": [
      "En tiedä, miksi hän raivostui minulle.",
      "Mistä sinä tuolla tavalla raivostuit?",
      "Raivostuin siitä, että sinä taas myöhästyit."
    ]
  },
  {
    "search_term": "raivostunut",
    "translation": "RAIVOSTUNUT (adj)",
    "cases": [
      "raivostunut + N ela"
    ],
    "examples": [
      "Olin raivostunut hänen käytöksestään.",
      "Olimme aivan raivostuneita asiasta."
    ]
  },
  {
    "search_term": "raivostuttaa",
    "translation": "RAIVOSTUTTAA (verbi, transit)",
    "cases": [
      "raivostuttaa + O par",
      "raivostuttaa + V t. inf"
    ],
    "examples": [
      "Oppilaiden käytös raivostutti opettajaa.",
      "Minua raivostuttaa istua sisällä kauniina kesäpäivänä."
    ]
  },
  {
    "search_term": "rajoittaa",
    "translation": "RAJOITTAA (verbi, transit)",
    "cases": [
      "rajoittaa + O par",
      "rajoittaa + N ill"
    ],
    "examples": [
      "Yritän rajoittaa {= vähentää) tupakanpolttoani.",
      "Maat yrittävät rajoittaa ydinaseiden määrää.",
      "Puheenvuorojen kesto on rajoitettu viiteen minuuttiin."
    ]
  },
  {
    "search_term": "rajoittua",
    "translation": "RAJOITTUA (verbi, intransit)",
    "cases": [
      "rajoittua + N ill"
    ],
    "examples": [
      "Tontti rajoittuu metsään.",
      "Harrin harrastukset rajoittuvat television katseluun ja oluen juontiin."
    ]
  },
  {
    "search_term": "rakastaa",
    "translation": "RAKASTAA (verbi, transit)",
    "cases": [
      "rakastaa + O par",
      "rakastaa + V -minen"
    ],
    "examples": [
      "Minä rakastan sinua.",
      "Anton rakastaa klassista musiikkia.",
      "Rakastan kirjojen lukemista.",
      "Heikki rakastaa pianon soittamista."
    ]
  },
  {
    "search_term": "rakastua",
    "translation": "RAKASTUA (verbi, intransit)",
    "cases": [
      "rakastua + N ill"
    ],
    "examples": [
      "Janne rakastui Liisaan jo nuorena.",
      "Olen rakastunut tähän maahan."
    ]
  },
  {
    "search_term": "rakkaus",
    "translation": "RAKKAUS (subst)",
    "cases": [
      "rakkaus + N ill",
      "rakkaus + N par + kohtaan"
    ],
    "examples": [
      "Tauluista näkyy taiteilijan rakkaus luontoon.",
      "Vanhempien rakkaus lapseen on suuri.",
      "Vanhempien rakkaus lasta kohtaan ei koskaan lopu."
    ]
  },
  {
    "search_term": "rakentaa",
    "translation": "RAKENTAA (verbi, transit)",
    "cases": [
      "rakentaa + N ill/all"
    ],
    "examples": [
      "He rakensivat talon Helsinkiin.",
      "Rakennamme saunan kalliolle."
    ]
  },
  {
    "search_term": "rangaista",
    "translation": "RANGAISTA (verbi, transit)",
    "cases": [
      "rangaista + O par",
      "rangaista + N ela"
    ],
    "examples": [
      "Opettaja rankaisi meitä.",
      "Hän rankaisi meitä huolimattomuudesta."
    ]
  },
  {
    "search_term": "rangaistus",
    "translation": "RANGAISTUS (subst)",
    "cases": [
      "rangaistus + N ela"
    ],
    "examples": [
      "Mies sai ankaran rangaistuksen murhasta.",
      "Rangaistus rikoksesta oli viisi vuotta vankeutta."
    ]
  },
  {
    "search_term": "rasittaa",
    "translation": "RASITTAA (verbi, transit)",
    "cases": [
      "rasittaa + O par",
      "rasittaa + N ade",
      "rasittaa + V 1. inf"
    ],
    "examples": [
      "Television katselu rasittaa silmiä.",
      "Seisominen rasittaa selkää ja jalkoja.",
      "Minua rasittaa (= harmittaa) se, että sinä olet aina myöhässä.",
      "Älä rasita itseäsi tällä asialla. Lasse ei rasita itseään liialla työllä.",
      "Minua rasittaa (= harmittaa) istua sisällä kauniina kesäpäivänä."
    ]
  },
  {
    "search_term": "rasittua",
    "translation": "RASITTUA (verbi, intransit)",
    "cases": [
      "rasittua + N ela"
    ],
    "examples": [
      "Silmäni rasittuvat television katselusta.",
      "Jalat rasittuvat seisomisesta."
    ]
  },
  {
    "search_term": "rasittunut",
    "translation": "RASITTUNUT (adj)",
    "cases": [
      "rasittunut + N ela"
    ],
    "examples": [
      "Isoäiti ja isoisä olivat hyvin rasittuneita pitkästä matkasta."
    ]
  },
  {
    "search_term": "ratkaisu",
    "translation": "RATKAISU (subst)",
    "cases": [
      "ratkaisu + N ill"
    ],
    "examples": [
      "Ratkaisu tähän ongelmaan on aivan yksinkertainen."
    ]
  },
  {
    "search_term": "ravistaa",
    "translation": "RAVISTAA (verbi, transit)",
    "cases": [
      "ravistaa + O par"
    ],
    "examples": [
      "Lääkepulloa täytyy ravistaa.",
      "Hän ravisti päätään ja sanoi: En halua!"
    ]
  },
  {
    "search_term": "reagoida",
    "translation": "REAGOIDA (verbi, intransit)",
    "cases": [
      "reagoida + N ill"
    ],
    "examples": [
      "Iho reagoi herkästi auringonvaloon.",
      "Miten hän reagoi asiaan?"
    ]
  },
  {
    "search_term": "reaktio",
    "translation": "REAKTIO (subst)",
    "cases": [
      "reaktio + N ill"
    ],
    "examples": [
      "Hänen reaktionsa asiaan oli hämmästyttävä."
    ]
  },
  {
    "search_term": "rehellinen",
    "translation": "REHELLINEN (adj)",
    "cases": [
      "rehellinen + N all",
      "rehellinen + N par + kohtaan"
    ],
    "examples": [
      "Oletko nyt aivan rehellinen minulle?",
      "Et ole ollut oikein rehellinen minua kohtaan."
    ]
  },
  {
    "search_term": "repiä",
    "translation": "REPIÄ (verbi, transit)",
    "cases": [
      "repiä + N tra",
      "repiä + O par + N ela"
    ],
    "examples": [
      "Kalle repi Maijua tukasta.",
      "Mies repi minua hihasta.",
      "Saara repi valokuvan pieniksi palasiksi."
    ]
  },
  {
    "search_term": "riidellä",
    "translation": "RIIDELLÄ (verbi, intransit)",
    "cases": [
      "riidellä + N ela"
    ],
    "examples": [
      "He riitelevät aina rahasta.",
      "Lapset riitelivät leluista.",
      "Jussi ja Leena riitelivät siitä, kumpi pesee astiat."
    ]
  },
  {
    "search_term": "riippua",
    "translation": "RIIPPUA (verbi, intransit)",
    "cases": [
      "riippua + N ela",
      "riippua + N ine/ade"
    ],
    "examples": [
      "Riippuu ilmasta, lähdemmekö ulos.",
      "Asia riippuu sinusta.",
      "Veron maarä nippuu tuloista.",
      "Ei tämä asia rahasta riipu.",
      "Takki riippuu (= roikkuu) naulassa.",
      "Vaatteet riippuvat narulla kuivumassa."
    ]
  },
  {
    "search_term": "riippumaton",
    "translation": "RIIPPUMATON (adj)",
    "cases": [
      "riippumaton + N ela"
    ],
    "examples": [
      "Poika halusi olla riippumaton vanhemmistaan."
    ]
  },
  {
    "search_term": "riippuvainen",
    "translation": "RIIPPUVAINEN (adj)",
    "cases": [
      "riippuvainen + N ela"
    ],
    "examples": [
      "Olen itsenäinen ihminen, en ole kenestäkään riippuvainen.",
      "Narkomaanit ovat riippuvaisia huumeista."
    ]
  },
  {
    "search_term": "riistää",
    "translation": "RIISTÄÄ (verbi, transit)",
    "cases": [
      "riistää + N ela/abl"
    ],
    "examples": [
      "Poliisi riisti aseen miehen kädestä.",
      "Häneltä riistettiin koko omaisuus."
    ]
  },
  {
    "search_term": "riita",
    "translation": "RIITA (subst)",
    "cases": [
      "riita + N ela"
    ],
    "examples": [
      "Meillä on aina riitaa rahasta.",
      "Asiasta syntyi kova riita."
    ]
  },
  {
    "search_term": "riittää",
    "translation": "RIITTÄÄ (verbi, intransit) — быть достаточным",
    "cases": [
      "riittää + ill/all",
      "riittää + V -mAAn"
    ],
    "examples": [
      "Sata markkaa ei riitä ruokaan. — Ста марок недостаточно на еду.",
      "Kyllä se minulle riittää.",
      "Aikaa riitti myös ystävien tapaamiseen.",
      "Se riitti selittämään asian.",
      "Riittääkö raha tekemään ihmisen onnelliseksi?"
    ]
  },
  {
    "search_term": "rikkoa",
    "translation": "RIKKOA (verbi, transit)",
    "cases": [
      "rikkoa + N tra",
      "rikkoa + N ela"
    ],
    "examples": [
      "Raija rikkoi kukkamaljakon sirpaleiksi.",
      "Kivi rikkoi ikkunan säpäleiksi.",
      "Hän rikkoi talosta kaikki ikkunat.",
      "Autosta oli rikottu tuulilasi ja takavalot."
    ]
  },
  {
    "search_term": "ripustaa",
    "translation": "RIPUSTAA (verbi, transit)",
    "cases": [
      "ripustaa + N ill/all"
    ],
    "examples": [
      "Ripustin verhot ikkunaan.",
      "Ripusta taulu eteisen seinälle!"
    ]
  },
  {
    "search_term": "ristiä",
    "translation": "RISTIÄ (verbi, transit)",
    "cases": [
      "ristiä + N tra"
    ],
    "examples": [
      "Poika ristittiin (= kastettiin) Viljamiksi.",
      "Ihmiset ristivät (= nimittivät) uuden talon heti Makkarataloksi."
    ]
  },
  {
    "search_term": "rohjeta",
    "translation": "ROHJETA (verbi, transit)",
    "cases": [
      "rohjeta + V 1. inf"
    ],
    "examples": [
      "Rohkenetko väittää vastaan?",
      "En rohjennut sanoa mitään."
    ]
  },
  {
    "search_term": "rohkaista",
    "translation": "ROHKAISTA (verbi, transit) — подбодрить",
    "cases": [
      "rohkaista + O par + V -mAAn"
    ],
    "examples": [
      "Opettaja rohkaisi meitä puhumaan suomea."
    ]
  },
  {
    "search_term": "rohkeus",
    "translation": "ROHKEUS (subst) — смелость",
    "cases": [
      "rohkeus + V 1. inf"
    ],
    "examples": [
      "Vanhemmat rohkaisivat tyttöä opiskelemaan.",
      "Minulla ei ollut rohkeutta väittää vastaan."
    ]
  },
  {
    "search_term": "roikkua",
    "translation": "ROIKKUA (verbi, intransit) — болтаться, висеть",
    "cases": [
      "roikkua + N ine/ade"
    ],
    "examples": [
      "Takki roikkuu (= riippuu) naulakossa.",
      "Vaatteet roikkuivat narulla koko viikon."
    ]
  },
  {
    "search_term": "rukoilla",
    "translation": "RUKOILLA (verbi, transit) — 1) молиться 2) молить 3) умолять",
    "cases": [
      "rukoilla + O par",
      "rukoilla + V -mAAn"
    ],
    "examples": [
      "Kirkoissa rukoillaan Jumalaa.",
      "Mies rukoili armoa.",
      "Rukoilin (= pyysin kovasti) miestä jättämään minut rauhaan.",
      "Rukoilen sinua tulemaan kerrankin ajoissa."
    ]
  },
  {
    "search_term": "ruveta",
    "translation": "RUVETA (verbi, intransit) — начать",
    "cases": [
      "ruveta + V -mAAn",
      "ruveta + N tra"
    ],
    "examples": [
      "Aterian jälkeen Pekka rupesi tiskaamaan. — После еды Пекка начал мыть посуду.",
      "Hän rupesi tekemään harjoituksia.",
      "Kaarlo on ruvennut opiskelemaan japania.",
      "Kotirouvaksi en rupea ikinä!",
      "Mitä jos rupeaisit vaikkapa opettajaksi."
    ]
  },
  {
    "search_term": "ryhtyä",
    "translation": "RYHTYÄ (verbi, intransit) — начинать",
    "cases": [
      "ryhtyä + V -mAAn",
      "ryhtyä + N ill",
      "ryhtyä + N tra — начать работать кем-то"
    ],
    "examples": [
      "Ryhdyin tekemään kotitehtäviä. — Я начал делать домашние задания.",
      "Liisa taas ryhtyi lukemaan lapsille iltasatua. — Лииса опять начала читать детям вечернюю сказку.",
      "Hän ryhtyi opiskelemaan matematiikkaa.   — Он начал учить математику.",
      "Neuvotteluihin ryhdytään viikon kuluttua. — Переговоры начнут через неделю.",
      "Matti ryhtyi työntekoon jo aamulla.",
      "Sakari muutti maalle ja ryhtyi maanviljelijäksi. — Сакари переехал в деревню (сельскую метность) и начала работатать земледельцем."
    ]
  },
  {
    "search_term": "rynnätä",
    "translation": "RYNNÄTÄ (verbi, intransit)",
    "cases": [
      "rynnätä + N ill/all",
      "rynnätä + N ela/abl",
      "rynnätä + V -mAAn"
    ],
    "examples": [
      "Mies ryntäsi huoneeseen.",
      "Hän ryntäsi kadulle.",
      "Mies ryntäsi ulos huoneesta.",
      "Hän ryntäsi pihalta kadulle.",
      "Hän ryntäsi hakemaan apua."
    ]
  },
  {
    "search_term": "rääkätä",
    "translation": "RÄÄKÄTÄ (verbi, transit)",
    "cases": [
      "rääkätä + O par"
    ],
    "examples": [
      "Pojat rääkkäsivät kissaa.",
      "He rääkkäävät koiraa."
    ]
  },
  {
    "search_term": "saada",
    "translation": "SAADA (verbi, transit)",
    "cases": [
      "saada + V 1. inf",
      "saada + O + V -mAAn"
    ],
    "examples": [
      "Saatte mennä kotiin.",
      "Saisinko kysyä yhtä asiaa?",
      "Sain Kalevin tekemään kaikki kotityöt.",
      "Yritä saada Ville suostumaan asiaan!",
      "Liikuttava elokuva sai katsojat itkemään."
    ]
  },
  {
    "search_term": "saapua",
    "translation": "SAAPUA (verbi, intransit)",
    "cases": [
      "saapua + N ela/abl",
      "saapua + N ill/all",
      "saapua + V -mAAn"
    ],
    "examples": [
      "Milloin Kaisa saapuu Kreikasta?",
      "He saapuvat matkalta ensi viikon lauantaina.",
      "Lentokone saapuu Helsinkiin kello 20.45.",
      "Juna saapuu Tampereelle kello 11.00.",
      "Milloin hän saapuu Suomeen esiintymään?",
      "Professori Ping Pekingistä saapuu pitämään luentoja yliopistoon."
    ]
  },
  {
    "search_term": "saattaa",
    "translation": "SAATTAA (verbi, transit)",
    "cases": [
      "saattaa + N ill/all",
      "saattaa + V 1. inf"
    ],
    "examples": [
      "Saanko saattaa sinut kotiin?",
      "Jussi saattoi Leenan asemalle.",
      "Hän saattaa tulla (= ehkä tulee) illalla."
    ]
  },
  {
    "search_term": "sairastaa",
    "translation": "SAIRASTAA (verbi, transit)",
    "cases": [
      "sairastaa + O par"
    ],
    "examples": [
      "Hän sairastaa reumaa.",
      "Sairastatteko astmaa?"
    ]
  },
  {
    "search_term": "sairastua",
    "translation": "SAIRASTUA (verbi, intransit)",
    "cases": [
      "sairastua + N ill"
    ],
    "examples": []
  },
  {
    "search_term": "sallia",
    "translation": "SALLIA (verbi, transit)",
    "cases": [
      "sallia + N gen + V 1. inf"
    ],
    "examples": [
      "Koko perhe sairastui flunssaan Lapissa. Sairastuin vatsatautiin lomallani.",
      "Sallin teidän mennä.",
      "Sallitteko minun sanoa yhden asian?"
    ]
  },
  {
    "search_term": "sallittu",
    "translation": "SALLITTU (adj)",
    "cases": [
      "sallittu + N all"
    ],
    "examples": [
      "Tämä elokuva ei ole lapsille sallittu.",
      "Juhla on sallittu kaikenikäisille.",
      "Sano kaikille terveisiä!",
      "Minähän sanoin tämän sinulle jo eilen, etkö muista?",
      "En osaa sanoa mitään siitä asiasta."
    ]
  },
  {
    "search_term": "sanoa",
    "translation": "SANOA (verbi, transit)",
    "cases": [
      "sanoa + N all",
      "sanoa + N ela",
      "sanoa + O par + N tra"
    ],
    "examples": [
      "Mitä sinä sanot (= mitä mieltä olet) tästä asiasta?",
      "Hän sanoi minua hölmöksi. Elinaa sanotaan Elluksi."
    ]
  },
  {
    "search_term": "sanottava",
    "translation": "SANOTTAVA (subst) — что-нибудь сказать",
    "cases": [
      "sanottava + N ill"
    ],
    "examples": [
      "Onko sinulla jotain sanottavaa (= lisättävää) tähän asiaan?"
    ]
  },
  {
    "search_term": "sattua",
    "translation": "SATTUA (verbi, intransit) * еще один глагол, который может быть как переходным, так и непереходным",
    "cases": [
      "sattua + V -mAAn",
      "sattua + N ill/all"
    ],
    "examples": [
      "Satutko tietämään (= tiedätkö sattumalta), missä Liisa on?",
      "Satuin huomaamaan uutisen lehdestä. Sattuisiko sinulla olemaan yhtään rahaa?",
      "Satuimme (= tulimme sattumalta) samaan junaan. Onneksi poliisit sattuivat paikalle."
    ]
  },
  {
    "search_term": "sattua",
    "translation": "SATTUA (verbi, transit)",
    "cases": [
      "sattua + O par",
      "sattua + N ill"
    ],
    "examples": [
      "Minua sattuu (= koskee) vatsaan.",
      "Mihin sinua sattuu, selkäänkö?",
      "Sattuiko sinuun?"
    ]
  },
  {
    "search_term": "satuttaa",
    "translation": "SATUTTAA (verbi, transit)",
    "cases": [
      "satuttaa + N ill"
    ],
    "examples": [
      "Satutin pääni pöydänkulmaan."
    ]
  },
  {
    "search_term": "seisoa",
    "translation": "SEISOA (verbi, intransit)",
    "cases": [
      "seisoa + N ine/ade",
      "seisoa + V -mAssA"
    ],
    "examples": [
      "Auto seisoi tallissa koko talven. Miehet seisoivat kadulla.",
      "He seisovat pysäkillä odottamassa bussia."
    ]
  },
  {
    "search_term": "sekaantua",
    "translation": "SEKAANTUA (verbi, intransit)",
    "cases": [
      "sekaantua + N ill"
    ],
    "examples": [
      "Hän sekaantuu (= puuttuu) aina joka asiaan. Älä sekaannu tähän asiaan!",
      "Ministeri on sekaantunut (= sotkeutunut) seksiskandaaliin."
    ]
  },
  {
    "search_term": "sekoittaa",
    "translation": "SEKOITTAA (verbi, transit)",
    "cases": [
      "sekoittaa + N ill"
    ],
    "examples": [
      "Sekoita jauhot ensin maitoon.",
      "Hän sekoitti minut Kalleen (= luuli minua Kalleksi)."
    ]
  },
  {
    "search_term": "selittää",
    "translation": "SELITTÄÄ (verbi, transit)",
    "cases": [
      "selittää + N all"
    ],
    "examples": [
      "Hän selitti asian meille hyvin yksinkertaisesti."
    ]
  },
  {
    "search_term": "selitys",
    "translation": "SELITYS (subst) selitys + N ill",
    "cases": [
      "selitys + N ela"
    ],
    "examples": [
      "Onko sinulla mitään selitystä tähän asiaan?",
      "Tapaukseen ei ole saatu selitystä.",
      "Tarkempi selitys asiasta annetaan ensi viikolla."
    ]
  },
  {
    "search_term": "selostus",
    "translation": "SELOSTUS (subst)",
    "cases": [
      "selostus + N ela",
      "selvillä + N ela"
    ],
    "examples": [
      "Mies antoi kirjallisen selostuksen tapauksesta.",
      "Kaikki kuuntelivat radioselostusta jalkapallo-ottelusta.",
      "SELVILLÄ (adv) SELVILLE",
      "Olen erittäin hyvin selvillä tilanteesta.",
      "Taudin aiheuttajasta ei ole päästy selville.",
      "Talon rakenne käy selville oheisesta kaavakuvasta."
    ]
  },
  {
    "search_term": "selvitys",
    "translation": "SELVITYS (subst)",
    "cases": [
      "selvitys + N ela"
    ],
    "examples": [
      "Poliisi on antanut selvityksen tapauksesta.",
      "Hakemuksessa on oltava selvitys aikaisemmista opinnoista."
    ]
  },
  {
    "search_term": "selvitä",
    "translation": "SELVITÄ (verbi, intransit)",
    "cases": [
      "selvitä + N ela",
      "selvätä + N ade"
    ],
    "examples": [
      "He selvisivät onnettomuudesta hengissä.",
      "Selvisin tentistä juuri ja juuri — sain yhden pisteen.",
      "En ole vieläkään selvinnyt (= toipunut) järkytyksestä.",
      "Rakenne selviää (= käy selville) viereisestä kuvasta.",
      "Näin pienellä palkalla en selviä laskuista.",
      "Joka maassa selviää (= tulee toimeen, pärjää) englannilla.",
      "Sanna selvisi syytteestä sakoilla."
    ]
  },
  {
    "search_term": "selviytyä",
    "translation": "SELVIYTYÄ (verbi, intransit)",
    "cases": [
      "selviytyä + N ela"
    ],
    "examples": [
      "Selviydyin (= selvisin) tehtävästä hyvin.",
      "Selviydytkö työstä viikossa?"
    ]
  },
  {
    "search_term": "selvä",
    "translation": "SELVÄ (adj)",
    "cases": [
      "selvä + N ela"
    ],
    "examples": [
      "Älä minulta kysy, ota itse selvää asiasta!",
      "Hänen puheestaan ei saa mitään selvää."
    ]
  },
  {
    "search_term": "seurata",
    "translation": "SEURATA (verbi, transit)",
    "cases": [
      "seurata + O par",
      "seurata + N ela"
    ],
    "examples": [
      "Seuratkaa tuota autoa!",
      "Mies seurasi naista kotiin.",
      "En jaksanut seurata (= kuunnella) luentoa.",
      "Rikosta seuraa rangaistus.",
      "Tuosta ei kyllä voi seurata mitään hyvää.",
      "Liisan huolimattomuudesta oli ikävät seuraukset: talo paloi."
    ]
  },
  {
    "search_term": "seuraus",
    "translation": "SEURAUS (subst)",
    "cases": [
      "seuraus + N ela"
    ],
    "examples": [
      "Työttömyydestä voi olla seurauksena vakava masennus."
    ]
  },
  {
    "search_term": "seurustella",
    "translation": "SEURUSTELLA (verbi, intransit)",
    "cases": [
      "seurustella + N gen + kanssa"
    ],
    "examples": [
      "Martti seurusteli Ullan kanssa viisi vuotta.",
      "He eivät seurustele (= eivät ole tekemisissä) naapureiden kanssa."
    ]
  },
  {
    "search_term": "sietää",
    "translation": "SIETÄÄ (verbi, transit)",
    "cases": [
      "sietää + O par",
      "sietää + V 1. inf"
    ],
    "examples": [
      "Kaktus sietää (= kestää) hyvin kuivuutta.",
      "Vatsani ei siedä maitoa.",
      "En voi sietää sinua!",
      "Asiaa sietää (= kannattaa) harkita."
    ]
  },
  {
    "search_term": "siirtyä",
    "translation": "SIIRTYÄ (verbi, intransit)",
    "cases": [
      "siirtyä + N ill/all",
      "siirtyä + N ela/abl",
      "siirtyä + V -mAAn"
    ],
    "examples": [
      "Siirtykää ensimmäiseen kerrokseen!",
      "Siirrytään toiseen asiaan! Siirryimme pihalle jatkamaan juhlia.",
      "Siirryimme olohuoneesta pihalle.",
      "Siirryttiin asiasta toiseen.",
      "Alkoi sataa, joten siirryimme pihalta sisälle.",
      "Siirryimme jatkamaan juhlia sisälle."
    ]
  },
  {
    "search_term": "siirtää",
    "translation": "SIIRTÄÄ (verbi, transit)",
    "cases": [
      "siirtää + N ill/all",
      "siirtää + N ela/abl"
    ],
    "examples": [
      "Siirsimme pöydän keittiöön.",
      "Eteisen tuolit siirretään kesäksi parvekkeelle.",
      "Siirsimme pöydän olohuoneesta keittiöön.",
      "Syksyllä siirrämme tuolit parvekkeelta eteiseen."
    ]
  },
  {
    "search_term": "sijaita",
    "translation": "SIJAITA (verbi, intransit)",
    "cases": [
      "sijaita + N inn/ade"
    ],
    "examples": [
      "Taidemuseo sijaitsee (= on) Turussa.",
      "Helsinki sijaitsee Suomenlahden rannalla."
    ]
  },
  {
    "search_term": "sijoittaa",
    "translation": "SIJOITTAA (verbi, transit)",
    "cases": [
      "sijoittaa + N ill/all"
    ],
    "examples": [
      "Heidät sijoitettiin Suomeen.",
      "Pakolaiset sijoitettiin aluksi Vantaalle.",
      "Hän sijoitti rahansa osakkeihln."
    ]
  },
  {
    "search_term": "silittää",
    "translation": "SILITTÄÄ (verbi, transit)",
    "cases": [
      "silittää + O par"
    ],
    "examples": [
      "Maija silitti (= paijasi) kissaa.",
      "Äiti silitti pojan päätä."
    ]
  },
  {
    "search_term": "sinutella",
    "translation": "SINUTELLA (verbi, transit)",
    "cases": [
      "sinutella + O par"
    ],
    "examples": [
      "Voiko opettajaa sinutella?",
      "Sinuttelitteko te professoria?"
    ]
  },
  {
    "search_term": "sisältyä",
    "translation": "SISÄLTYÄ (verbi, intransit)",
    "cases": [
      "sisältyä + N ill"
    ],
    "examples": [
      "Sisältyykö hotellihuoneen hintaan myös aamiainen?"
    ]
  },
  {
    "search_term": "sitoa",
    "translation": "SITOA (verbi, transit)",
    "cases": [
      "sitoa + N ill"
    ],
    "examples": [
      "Sido naru puuhun!",
      "Äiti sitoi rusetin Jonnan hiuksiin."
    ]
  },
  {
    "search_term": "sitoutua",
    "translation": "SITOUTUA (verbi, intransit)",
    "cases": [
      "sitoutua + N ill",
      "sitoutua + V -mAAn"
    ],
    "examples": [
      "En ole sitoutunut mihinkään puolueeseen.",
      "Sitouduin maksamaan Kalevin velat.",
      "En voi sitoutua tekemään tätä työtä kuukaudessa.",
      "Johtaja antoi siunauksen suunnitelmalleni (= hyväksyi suunnitelmani)."
    ]
  },
  {
    "search_term": "siunaus",
    "translation": "SIUNAUS (subst) — благословение",
    "cases": [
      "siunaus + N ali"
    ],
    "examples": [
      "Vanhemmat antoivat siunauksensa avioliitolle."
    ]
  },
  {
    "search_term": "sivellä",
    "translation": "SIVELLÄ (verbi, transit)",
    "cases": [
      "sivellä + O par",
      "sivellä + N ill/ali"
    ],
    "examples": [
      "Äiti siveli (= silitti) pojan päätä.",
      "Sivele (= levitä) rasvaa poskiin!",
      "Sivelin voita leivälle."
    ]
  },
  {
    "search_term": "soittaa",
    "translation": "SOITTAA (verbi, transit)",
    "cases": [
      "soittaa + O par",
      "soittaa + N ill/all"
    ],
    "examples": [
      "Osaan soittaa pianoa ja huilua.",
      "Joku soittaa ovikelloa.",
      "Janne soitti teatteriin ja tilasi liput.",
      "Soita minulle huomenna."
    ]
  },
  {
    "search_term": "sopeutua",
    "translation": "SOPEUTUA (verbi, intransit)",
    "cases": [
      "sopeutua + N ill"
    ],
    "examples": [
      "Yritä sopeutua tilanteeseen!",
      "John sopeutui Suomen talveen yllättävän hyvin."
    ]
  },
  {
    "search_term": "sopia",
    "translation": "SOPIA (verbi, transit)",
    "cases": [
      "sopia + N ill/all",
      "sopia + N tra",
      "sopia + N ela",
      "N gen + sopii + V 1. inf",
      "sopii + V 1. inf",
      "sopia + että-lause"
    ],
    "examples": [
      "Astiaan sopii (= mahtuu) kaksi litraa.",
      "Neljän hengen autoon ei sovi viittä ihmistä. Keltainen väri sopii (= on hyvä) sinulle hyvin.",
      "Nuo verhot ovat liian vaaleat, ne eivät sovi tähän huoneeseen.",
      "Liisa sopii hyvin lentoemännäksi. Tämä kirja sopii vaikkapa joululahjaksi. Palkaksi sovittiin 50 mk/tunti.",
      "Sovimme asiasta eilen.",
      "Ostan tämän, jos hinnasta sovitaan.",
      "Sopisiko teidän tulla huomenna uudestaan?",
      "Juhliin ei sovi tulla farkuissa.",
      "Sopiiko sinulle, että tapaamme ensi viikon tiistaina?",
      "Sovittiin, että jokainen ottaa mukaan omat eväät."
    ]
  },
  {
    "search_term": "sopimus",
    "translation": "SOPIMUS (subst)",
    "cases": [
      "sopimus + N ela"
    ],
    "examples": [
      "Teimme sopimuksen asiasta eilen.",
      "Maat eivät päässeet sopimukseen tulitauosta.",
      "Myös: vuokrasopimus, rauhansopimus"
    ]
  },
  {
    "search_term": "sopiva",
    "translation": "SOPIVA (adj)",
    "cases": [
      "sopiva + N ill/all"
    ],
    "examples": [
      "Ostin myös pukuun sopivan paidan.",
      "Onko tuo lapsille sopivaa luettavaa?",
      "Tuollainen käytös ei ole sopivaa nuorille."
    ]
  },
  {
    "search_term": "sota",
    "translation": "SOTA (subst)",
    "cases": [
      "sota + N par + vastaan"
    ],
    "examples": [
      "Sota huumeita vastaan jatkuu.",
      "Maa on sodassa naapurimaita vastaan.",
      "Järjestö käy sotaa rasismia vastaan."
    ]
  },
  {
    "search_term": "sotia",
    "translation": "SOTIA (verbi, intransit)",
    "cases": [
      "sotia + N par + vastaan",
      "sotia + N gen + puolesta"
    ],
    "examples": [
      "He sotivat (= käyvät sotaa) naapurimaata vastaan.",
      "He sotivat isänmaan puolesta."
    ]
  },
  {
    "search_term": "sotkea",
    "translation": "SOTKEA (verbi, transit)",
    "cases": [
      "sotkea + N ill"
    ],
    "examples": [
      "Älä sotke minua tähän asiaan! Tämä asia ei kuulu minulle.",
      "Nyt sinä sotket (= sekoitat) Latvian Liettuaan.",
      "SOTKEUTUA (SOTKEENTUA)"
    ]
  },
  {
    "search_term": "",
    "translation": "(verbi, intransit)",
    "cases": [
      "sotkeutua + N ill"
    ],
    "examples": [
      "Mihin skandaaliin hän on sotkeutunut?",
      "Ulla sotkeutuu (= puuttuu) aina muiden ihmisten asioihin."
    ]
  },
  {
    "search_term": "soveltaa",
    "translation": "SOVELTAA (verbi, transit)",
    "cases": [
      "soveltaa + N ill"
    ],
    "examples": [
      "Teoriaa ei vielä ole sovellettu käytäntöön.",
      "Lakia ei voi soveltaa tähän tapaukseen."
    ]
  },
  {
    "search_term": "soveltua",
    "translation": "SOVELTUA (verbi, intransit)",
    "cases": [
      "soveltua + N ill"
    ],
    "examples": [
      "Tämä maali ei sovellu (= sovi) ulkoseinien maalaamiseer"
    ]
  },
  {
    "search_term": "sovittaa",
    "translation": "SOVITTAA (verbi, transit)",
    "cases": [
      "sovittaa + O par"
    ],
    "examples": [
      "Sovitin takkia ja huomasin, että se oli liian iso.",
      "Saisinko sovittaa näitä kenkiä?"
    ]
  },
  {
    "search_term": "stipendi",
    "translation": "STIPENDI (subst)",
    "cases": [
      "stipendi + N par + varten"
    ],
    "examples": [
      "Sain stipendin ulkomailla opiskelua varten."
    ]
  },
  {
    "search_term": "suhde",
    "translation": "SUHDE (subst)",
    "cases": [
      "suhde + N il!"
    ],
    "examples": [
      "Suhteeni häneen on täysin platoninen.",
      "Meillä on hyvät suhteet naapureihin.",
      "Millaiset ovat Suomen suhteet naapurimaihin?"
    ]
  },
  {
    "search_term": "suhtautua",
    "translation": "SUHTAUTUA (verbi, intransit)",
    "cases": [
      "suhtautua + N ill"
    ],
    "examples": [
      "Miten hän suhtautuu teihin?",
      "Hän suhtautui minuun hyvin ystävällisesti."
    ]
  },
  {
    "search_term": "suhtautuminen",
    "translation": "SUHTAUTUMINEN (subst)",
    "cases": [
      "suhtautuminen + N ill"
    ],
    "examples": [
      "Sinun suhtautumisesi tähän asiaan on vähän lapsellinen.",
      "Kriitikoiden suhtautuminen teokseen oli negatiivinen."
    ]
  },
  {
    "search_term": "suojata",
    "translation": "SUOJATA (verbi, transit) — защищать",
    "cases": [
      "suojata + N abi",
      "suojata + O par + V -mAstA"
    ],
    "examples": [
      "Katos suojaa meidät sateelta.",
      "Aurinkovoide suojaa ihoa palamiselta.",
      "Kondomi suojaa aidsilta.",
      "Sateenvarjo suojasi meitä kastumasta.",
      "Voide suojaa ihoa palamasta auringossa."
    ]
  },
  {
    "search_term": "suojautua",
    "translation": "SUOJAUTUA (verbi, intransit)",
    "cases": [
      "suojautua + N abl",
      "suojautua + V -mAlla"
    ],
    "examples": [
      "Miten voin suojautua pakkaselta?",
      "Kylmältä voi suojautua panemalla lämpimät vaatteet päälle."
    ]
  },
  {
    "search_term": "suojella",
    "translation": "SUOJELLA (verbi, transit)",
    "cases": [
      "suojella + O par",
      "suojella + N abl"
    ],
    "examples": [
      "Äiti suojelee lasta.",
      "Luontoa täytyy suojella.",
      "Hän suojelee lasta vaaroilta."
    ]
  },
  {
    "search_term": "suosia",
    "translation": "SUOSIA (verbi, transit)",
    "cases": [
      "suosia + O par"
    ],
    "examples": [
      "Sää suosi meitä viikonloppuna: aurinko paistoi koko ajan.",
      "Katariina Suuri suosi tieteitä ja taiteita.",
      "Suosikaa kotimaista teollisuutta!"
    ]
  },
  {
    "search_term": "suositella",
    "translation": "SUOSITELLA (verbi, transit)",
    "cases": [
      "suositella + O par",
      "suositella + N ill/all",
      "suositella + N tra",
      "suositella + että-lause"
    ],
    "examples": [
      "Suosittelen sinulle suomen kielen intensiivikurssia.",
      "Lääkäri suositteli minulle lepoa.",
      "Haen apurahaa. Voisitteko suositella minua?",
      "Hän suositteli Liisaa tähän työhön.",
      "Hanna suositteli tätä ravintolaa minulle.",
      "Suosittelimme häntä puheenjohtajaksi.",
      "Professori suositteli opiskelijaa apurahan saajaksi.",
      "Suosittelen, että menet suomen kielen intensiivikurssille."
    ]
  },
  {
    "search_term": "suostua",
    "translation": "SUOSTUA (verbi, intransit)",
    "cases": [
      "suostua + N ill",
      "suostua + V -mAAn"
    ],
    "examples": [
      "Hän suostui pyyntöön.",
      "Kaikki suostuivat Kalevin ehdotukseen.",
      "En suostu menemään sinne yksin.",
      "Emma ei suostunut syömään puuroa."
    ]
  },
  {
    "search_term": "suostutella",
    "translation": "SUOSTUTELLA (verbi, transit)",
    "cases": [
      "suostutella + O + V -mAAn"
    ],
    "examples": [
      "Suostuttelin hänet tulemaan mukaan.",
      "Äiti suostuttelee lasta syömään puuroa."
    ]
  },
  {
    "search_term": "surettaa",
    "translation": "SURETTAA (verbi, transit)",
    "cases": [
      "surettaa + O par"
    ],
    "examples": [
      "Surettaako tämä asia sinua?",
      "Kaisaa suretti se, että Lasse ei tuilut mukaan."
    ]
  },
  {
    "search_term": "surra",
    "translation": "SURRA (verbi, transit)",
    "cases": [
      "surra + O par"
    ],
    "examples": [
      "Surin kissan kuolemaa kauan.",
      "Omaiset surevat vainajaa.",
      "Älä nyt enää sure sitä asiaa!"
    ]
  },
  {
    "search_term": "surullinen",
    "translation": "SURULLINEN (adj)",
    "cases": [
      "surullinen + N ela",
      "surullinen + N gen + takia"
    ],
    "examples": [
      "Tulin surulliseksi kirjeestäsi.",
      "Olen surullinen siitä, että Pekka sairastui.",
      "Olen surullinen Liisan takia."
    ]
  },
  {
    "search_term": "suudella",
    "translation": "SUUDELLA (verbi, transit)",
    "cases": [
      "suudella + O par",
      "suudella + N ali"
    ],
    "examples": [
      "Hän suuteli minua.",
      "Hän suuteli minua ensin poskelle ja sitten suoraan suulle."
    ]
  },
  {
    "search_term": "suunnata",
    "translation": "SUUNNATA (verbi, transit)",
    "cases": [
      "suunnata + N ill/all"
    ],
    "examples": [
      "He suuntasivat matkansa Lappiin, Utsjoelle.",
      "Suunnatkaa katseenne tulevaisuuteen!",
      "Ohjelma on suunnattu lähinnä teini-ikäisille katsojille."
    ]
  },
  {
    "search_term": "suunnitella",
    "translation": "SUUNNITELLA (verbi, transit)",
    "cases": [
      "suunnitella + O par",
      "suunnitella + V 1. inf"
    ],
    "examples": [
      "Lomamatkaa on kiva suunnitella.",
      "Asunnon ostamista suunniteltiin pitkään.",
      "Olen suunnitellut (- harkinnut) tätä jo kauan.",
      "Suunnittelin (= aioin) lähteä torille."
    ]
  },
  {
    "search_term": "suunnitelma",
    "translation": "SUUNNITELMA (subst)",
    "cases": [
      "suunnitelma + N gen + varalle"
    ],
    "examples": [
      "Mitä suunnitelmia sinulla on tulevaisuuden varalle?",
      "Teimme suunnitelmia kesäloman varalle.",
      "Myös: lomasuunnitelma, tutkimussuunnitelma"
    ]
  },
  {
    "search_term": "suuttua",
    "translation": "SUUTTUA (verbi, intransit)",
    "cases": [
      "suuttua + N ali",
      "suuttua + N ela"
    ],
    "examples": [
      "En ymmärrä, miksi hän suuttui minulle.",
      "Lauri suuttui Merjalle, mutta leppyi onneksi nopeasti.",
      "Mistä hän suuttui?",
      "Hän suuttui minulle siitä, että olin myöhässä.",
      "Älä nyt leikistä suutu!",
      "Vähemmästäkin voi suuttua."
    ]
  },
  {
    "search_term": "suuttunut",
    "translation": "SUUTTUNUT (adj)",
    "cases": [
      "suuttunut + ill/all",
      "suuttunut + N ela"
    ],
    "examples": [
      "Olen suuttunut siitä, mitä sinä sanoit eilen.",
      "Paavo ei puhu minulle enää. Hän on suuttunut minuun.",
      "Lauri ei voi olla kenellekään suuttuneena kauan.",
      "Oletko vieläkin suuttunut minulle / minuun?",
      "Mistä sinä noin suuttunut olet?"
    ]
  },
  {
    "search_term": "suututtaa",
    "translation": "SUUTUTTAA (verbi, transit)",
    "cases": [
      "suututtaa + O par"
    ],
    "examples": [
      "Tämä asia suututtaa minua.",
      "Häntä suututti se, että olin myöhässä."
    ]
  },
  {
    "search_term": "symboli",
    "translation": "SYMBOLI (subst)",
    "cases": [
      "N gen + symboli"
    ],
    "examples": [
      "Pöllö on viisauden tai tyhmyyden symboli.",
      "Valkoinen kyyhky on rauhan symboli."
    ]
  },
  {
    "search_term": "sympatia",
    "translation": "SYMPATIA (subst)",
    "cases": [
      "sympatia + N par + kohtaan"
    ],
    "examples": [
      "Sympatia sodan uhreja kohtaan ei lopu.",
      "Tunnemme suurta sympatiaa kaikkia kohtaan."
    ]
  },
  {
    "search_term": "syntyä",
    "translation": "SYNTYÄ (verbi, intransit)",
    "cases": [
      "syntyä + N ine/ade",
      "syntyä + N ill/all",
      "syntyä + N ela"
    ],
    "examples": [
      "Olen syntynyt Helsingissä.",
      "Vantaalla syntyi viime vuonna yli 200 lasta.",
      "Perheeseen syntyi kolme poikaa. Kolmen pojan jälkeen Virtasille syntyi tyttö.",
      "Puheenjohtajan ehdotuksesta syntyi kiivas riita.",
      "Syntyykö (= tuleeko) tästä koskaan mitään?"
    ]
  },
  {
    "search_term": "syrjiä",
    "translation": "SYRJIÄ (verbi, transit)",
    "cases": [
      "syrjiä + O par",
      "syrjiä + N ine"
    ],
    "examples": [
      "Miksi minua aina syrjitään?",
      "Syrjitäänkö naisia työelämässä?",
      "Naisia syrjitään työelämässä.",
      "Taiteilijaa syrjittiin apurahan jakamisessa."
    ]
  },
  {
    "search_term": "syttyä",
    "translation": "SYTTYÄ (verbi, intransit)",
    "cases": [
      "syttyä + N ill/all"
    ],
    "examples": [
      "Valot syttyivät käytävään.",
      "Tähdet syttyvät taivaalle."
    ]
  },
  {
    "search_term": "sytyttää",
    "translation": "SYTYTTÄÄ (verbi, transit)",
    "cases": [
      "sytyttää + N ill/all"
    ],
    "examples": [
      "Naapuri sytytti valot käytävään.",
      "Kuistille sytytettiin valot."
    ]
  },
  {
    "search_term": "syventyä",
    "translation": "SYVENTYÄ (verbi, intransit)",
    "cases": [
      "syventyä + N ill",
      "syventyä + V -mAAn"
    ],
    "examples": [
      "Poika syventyi kirjaan.",
      "En jaksa nyt syventyä tähän asiaan.",
      "Niina oli syventynyt lukemaan eikä kuullut ovikellon ääntä.",
      "Syvennyin kirjoittamaan ja unohdin kaiken muun."
    ]
  },
  {
    "search_term": "syy",
    "translation": "SYY (subst)",
    "cases": [
      "syy + N ill",
      "syy + V 1. inf"
    ],
    "examples": [
      "Oliko sinulla jokin syy tehdä tuolla tavalla?",
      "Teillä ei ole mitään syytä valittaa.",
      "Syytä onnettomuuteen ei vielä tiedetä.",
      "Syynä murhaan oli ilmeisesti mustasukkaisuus.",
      "Ei ole mitään syytä huoleen.",
      "Myös: onnettomuuden syy, murhan syy"
    ]
  },
  {
    "search_term": "syyllinen",
    "translation": "SYYLLINEN (adj)",
    "cases": [
      "syyllinen + N ill"
    ],
    "examples": [
      "Miestä epäillään syylliseksi pankkiryöstöön.",
      "Hovimestari oli syyllinen murhaan.",
      "Pojat olivat syyllisiä varkauteen."
    ]
  },
  {
    "search_term": "syyllistyä",
    "translation": "SYYLLISTYÄ (verbi, intransit)",
    "cases": [
      "syyllistyä + N ill"
    ],
    "examples": [
      "Minä en ole koskaan syyllistynyt valehteluun.",
      "Olemme kaikki joskus syyllistyneet liioitteluun."
    ]
  },
  {
    "search_term": "syyte",
    "translation": "SYYTE (subst)",
    "cases": [
      "syyte + N ela"
    ],
    "examples": [
      "Mies sai syytteen raiskauksesta.",
      "Nainen joutui syytteeseen petoksesta.",
      "Syytteet varkaudesta olivat vääriä."
    ]
  },
  {
    "search_term": "syyttää",
    "translation": "SYYTTÄÄ (verbi, transit)",
    "cases": [
      "syyttää + O par",
      "syyttää + N ela",
      "syyttää + N tra"
    ],
    "examples": [
      "Miksi sinä syytät minua?",
      "Mistä sinä syytät minua? Tuomari syytti miestä varkaudesta. Heitä syytettiin huolimattomuudesta.",
      "Hän syytti minua huolimattomaksi.",
      "Syytätkö minua valehtelijaksi?"
    ]
  },
  {
    "search_term": "syytön",
    "translation": "SYYTÖN (adj)",
    "cases": [
      "syytön + N ill"
    ],
    "examples": [
      "Mies oli syytön murhaan.",
      "Me olemme täysin syyttömiä asiaan."
    ]
  },
  {
    "search_term": "syytös",
    "translation": "SYYTÖS (subst)",
    "cases": [
      "syytös + N ela"
    ],
    "examples": [
      "Syytös murhasta oli väärä.",
      "Syytökset huolimattomuudesta olivat epäoikeudenmukaisia."
    ]
  },
  {
    "search_term": "säikähtää",
    "translation": "SÄIKÄHTÄÄ (verbi, transit)",
    "cases": [
      "säikähtää + O par",
      "säikähtää + N ela"
    ],
    "examples": [
      "Kissa säikähti kovaa ääntä.",
      "Säikähdin pihalta kuuluvaa pamausta.",
      "Mistä sinä tuolla tavalla säikähdit?",
      "Minä en vähästä säikähdä."
    ]
  },
  {
    "search_term": "säilyttää",
    "translation": "SÄILYTTÄÄ (verbi, transit)",
    "cases": [
      "säilyttää + N ine/ade"
    ],
    "examples": [
      "Rahat kannattaa säilyttää pankissa, ei sukanvarressa.",
      "Säilytän arvokkaat kristallilasit ylähyllyllä."
    ]
  },
  {
    "search_term": "säilyä",
    "translation": "SÄILYÄ (verbi, intransit)",
    "cases": [
      "säilyä + N ine/ade",
      "säilyä + N ess",
      "säilyä + V -mAttA"
    ],
    "examples": [
      "Maito säilyy jääkaapissa noin viikon.",
      "Perunat säilyvät kellarissa kevääseen asti. Hedelmät säilyvät tuoreina jääkaapin alahyllyllä.",
      "Maito säilyy tuoreena kylmässä.",
      "Marjat säilyvät pakastettuina monta kuukautta.",
      "Maito säilyy jääkaapissa pilaantumatta monta päivää."
    ]
  },
  {
    "search_term": "särkeä",
    "translation": "SÄRKEÄ (verbi, transit)",
    "cases": [
      "särkeä + O par",
      "särkeä + N tra"
    ],
    "examples": [
      "Särkeekö päätäsi? Ota aspiriini!",
      "Hammastani on särkenyt koko päivän.",
      "Särjin (= rikoin) peilin kappaleiksi."
    ]
  },
  {
    "search_term": "sääliä",
    "translation": "SÄÄLIÄ (verbi, transit) — жалеть, пожалеть",
    "cases": [
      "sääliä + O par"
    ],
    "examples": [
      "Säälin kissaa niin, että päästin sen sisään sateesta.",
      "Säälikää meitä!"
    ]
  },
  {
    "search_term": "säästää",
    "translation": "SÄÄSTÄÄ (verbi, transit)",
    "cases": [
      "säästää + N ill/all",
      "säästää + N par + varten",
      "säästää + N ine"
    ],
    "examples": [
      "Säästämme rahaa omaan asuntoon.",
      "Isoäiti säästi vanhat valokuvat lapsenlapsilleen.",
      "Säästä vähän sitä kakkua minullekin!",
      "Säästän rahaa asuntoa varten.",
      "Säästän monta sataa markkaa matkakuluissa, kun kävelen töihin.",
      "Voin säästää vain ruoassa."
    ]
  },
  {
    "search_term": "säästyä",
    "translation": "SÄÄSTYÄ (verbi, intransit)",
    "cases": [
      "säästyä + N ela/abl"
    ],
    "examples": [
      "Palkasta ei säästy (= jää) penniäkään.",
      "Lähes koko kylä paloi, vain yksi talo säästyi tulipalolta."
    ]
  },
  {
    "search_term": "jakaa",
    "translation": "JAKAA (verbi, transit) — разделить, раздать",
    "cases": [
      "jakaa + N ill/tra",
      "jakaa + N all"
    ],
    "examples": [
      "Minä jaoin oppilaat kahteen ryhmään / kahdeksi ryhmäksi.",
      "Maa jaettiin viiteen lääniin / viideksi lääniksi.",
      "Opettaja jakaa paperit oppilaille.",
      "Jaan karamellit lapsille.",
      "Jaoitko tehtävät jo heille?"
    ]
  },
  {
    "search_term": "jakautua",
    "translation": "JAKAUTUA (JAKAANTUA) (verbi, intransit) — разделиться",
    "cases": [
      "jakautua + N ill/tra"
    ],
    "examples": [
      "Solu on jakautunut kahteen osaan.",
      "Kurssilaiset jakautuivat kahdeksi ryhmäksi."
    ]
  },
  {
    "search_term": "jaksaa",
    "translation": "JAKSAA (verbi, transit) — мочь",
    "cases": [
      "jaksaa + V 1. inf"
    ],
    "examples": [
      "Jaksatko kantaa tämän painavan kassin?",
      "Minä en jaksa nousta vielä."
    ]
  },
  {
    "search_term": "jankuttaa",
    "translation": "JANKUTTAA (verbi, transit)",
    "cases": [
      "jankuttaa + O par",
      "jankuttaa + N ela"
    ],
    "examples": [
      "Hän jankuttaa samaa asiaa koko ajan.",
      "Hän jankuttaa (= nalkuttaa) minulle joka asiasta."
    ]
  },
  {
    "search_term": "janottaa",
    "translation": "JANOTTAA (verbi, transit) — вызывать жажду",
    "cases": [
      "janottaa + O par"
    ],
    "examples": [
      "Minua janottaa.",
      "Ihmisiä ja kameleitakin janottaa Saharassa.",
      "Silli janottaa meitä."
    ]
  },
  {
    "search_term": "jatkaa",
    "translation": "JATKAA (verbi, transit) — продолжать",
    "cases": [
      "jatkaa + O par",
      "jatkaa + V -minen"
    ],
    "examples": [
      "Jatkamme kurssia ensi vuonna.",
      "Tätä tietä on jatkettu monta kilometriä.",
      "Jatkan opiskelemista.",
      "Herätyskello soi mutta minä vain jatkoin nukkumista."
    ]
  },
  {
    "search_term": "jatkua",
    "translation": "JATKUA (verbi, intransit) — продолжаться",
    "cases": [
      "jatkua + N ill/all",
      "jatkua + N ela/abl"
    ],
    "examples": [
      "Matka jatkuu Hämeenlinnaan ja Tampereelle.",
      "Kurssi jatkuu kello kahdeksaan.",
      "Matka jatkui Oulusta Rovaniemelle.",
      "Rovaniemeltä matka jatkui Inariin.",
      "Sairasloma jatkuu tiistaista sunnuntaihin."
    ]
  },
  {
    "search_term": "johdattaa",
    "translation": "JOHDATTAA (verbi, transit) — провести",
    "cases": [
      "johdattaa + N ill/all"
    ],
    "examples": [
      "Puheenjohtaja johdatti meidät heti asiaan.",
      "Hän johdatti laulajan lavalle."
    ]
  },
  {
    "search_term": "johtaa",
    "translation": "JOHTAA (verbi, transit) — вести (куда), привести (к чему), править",
    "cases": [
      "johtaa + N ill/all",
      "johtaa + N ela/abi"
    ],
    "examples": [
      "Polku johti taloon.",
      "Tuusulantie johtaa lentokentälle.",
      "Miehen mustasukkaisuus johti avioeroon.",
      "Tämä tie johtaa Vaasasta Seinäjoelle.",
      "Vesi johdetaan tänne Pyhäjärvestä.",
      "Kuningas johtaa maata kuninkaanlinnasta.",
      "Tie johtaa vuorelta alas laaksoon."
    ]
  },
  {
    "search_term": "johtua",
    "translation": "JOHTUA (verbi, intransit) — происходить из чего-то",
    "cases": [
      "johtua + N ela"
    ],
    "examples": [
      "Tämä johtuu ilmasta.",
      "Mistä luonnon saastuminen johtuu?"
    ]
  },
  {
    "search_term": "jonottaa",
    "translation": "JONOTTAA (verbi, transit) — стоять в очереди",
    "cases": [
      "jonottaa + O par",
      "jonottaa + N ine/ade",
      "jonottaa + N ill/all"
    ],
    "examples": [
      "Jonotin lippua kaksi tuntia.",
      "Teatterin aulassa oli hyvä jonottaa.",
      "Jussi jonotti ovella kauan.",
      "Tavaratalon ieipätiskiliä pitää aina jonottaa.",
      "Meidän piti jonottaa ravintolaan puoli tuntia.",
      "Jonotimme myös elokuviin.",
      "Autot jonottivat parkkipaikalle pitkän aikaa."
    ]
  },
  {
    "search_term": "joukko",
    "translation": "JOUKKO (subst) — группа (кого-то)",
    "cases": [
      "joukko + N par"
    ],
    "examples": [
      "Joukko turisteja seisoi kadulla.",
      "Näin joukon opiskelijoita Senaatintorilla."
    ]
  },
  {
    "search_term": "joutaa",
    "translation": "JOUTAA (verbi, intransit) — успевать, иметь время",
    "cases": [
      "joutaa + V -mAAn"
    ],
    "examples": [
      "Joudatko (= ehditkö) tulemaan meille illalla?"
    ]
  },
  {
    "search_term": "joutua",
    "translation": "JOUTUA (verbi, intransit) — угодить, попасть куда-либо (без желания), придется (сделать)",
    "cases": [
      "joutua + N ill/all",
      "joutua + V -mAAn"
    ],
    "examples": [
      "Lauri on joutunut sairaalaan. — Лаури попал в больницу.",
      "He joutuivat pahaan auto-onnettomuuteen lomallaan.",
      "Hän joutuu leikkaukseen ensi viikolla. Matkustajat joutuivat autiolle saarelle.",
      "Kukaan ei joutunut uusimaan tenttiään. — Никому не пришлось пересдавать экзамен.",
      "Joudun lähtemään kotiin jo kello 15.",
      "Hän joutuu tekemään ylitöitä."
    ]
  },
  {
    "search_term": "juhlia",
    "translation": "JUHLIA (verbi, transit) — праздновать",
    "cases": [
      "juhlia + O par"
    ],
    "examples": [
      "Me juhlimme hääpäiväämme kesäkuussa.",
      "He juhlivat voittajaa Kaivopuistossa."
    ]
  },
  {
    "search_term": "julistaa",
    "translation": "JULISTAA (verbi, transit) — провозгласить, объявить",
    "cases": [
      "julistaa + N tra"
    ],
    "examples": [
      "Suomi julistettiin itsenäiseksi vuonna 1917.",
      "Virka on julistettu haettavaksi."
    ]
  },
  {
    "search_term": "julkaista",
    "translation": "JULKAISTA (verbi, transit) — опубликовать",
    "cases": [
      "julkaista + N ine/ade"
    ],
    "examples": [
      "Uutinen julkaistiin lehdessä.",
      "Osto- ja myynti-ilmoitukset julkaistaan takasivulla."
    ]
  },
  {
    "search_term": "jutella",
    "translation": "JUTELLA (verbi, intransit) — побеседовать",
    "cases": [
      "jutella + N ela"
    ],
    "examples": [
      "Minun täytyy jutella asiasta Eilan kanssa.",
      "Mistä te juttelette?"
    ]
  },
  {
    "search_term": "jututtaa",
    "translation": "JUTUTTAA (verbi, transit)",
    "cases": [
      "jututtaa + O par"
    ],
    "examples": [
      "Jututin häntä koko bussimatkan.",
      "Hän jututtaa aina naapuriaan pihalla."
    ]
  },
  {
    "search_term": "juuttua",
    "translation": "JUUTTUA (verbi, intransit) — застрять",
    "cases": [
      "juuttua + N ill"
    ],
    "examples": [
      "Laiva juuttui jäihin.",
      "Juutuimme siihen kysymykseen pitkäksi aikaa."
    ]
  },
  {
    "search_term": "jäljitellä",
    "translation": "JÄLJITELLÄ (verbi, transit) — подражать",
    "cases": [
      "jäljitellä + O par"
    ],
    "examples": [
      "Hän jäljittelee aina isää.",
      "Suunnittelija on jäljiteiiyt vanhaa mallia."
    ]
  },
  {
    "search_term": "jännittää",
    "translation": "JÄNNITTÄÄ (verbi, transit) — «напрягать», вызывать напряжение",
    "cases": [
      "jännittää + O par"
    ],
    "examples": [
      "jännittää -h V 1. inf",
      "Minua jännittää aina lentokoneessa.",
      "Häntä jännittää esiintyminen.",
      "Hän jännittää esiintymistä.",
      "Häntä jännittää mennä sinne uudelleen.",
      "Jännittääkö sinua puhua niin monen ihmisen edessä?"
    ]
  },
  {
    "search_term": "järjestellä",
    "translation": "JÄRJESTELLÄ (verbi, transit) — организовывать",
    "cases": [
      "järjestellä + O par"
    ],
    "examples": [
      "Kuka järjestelee tätä asiaa?"
    ]
  },
  {
    "search_term": "järjestää",
    "translation": "JÄRJESTÄÄ (verbi, transit) — привести в порядок, расставить, организовать",
    "cases": [
      "järjestää + N ill/all"
    ],
    "examples": [
      "Voitko järjestää nämä paperit mappiin?",
      "Jaana järjesti astiat kaappiin.",
      "Kirjastonhoitaja järjesti kirjat oikeille hyllyille.",
      "Hän järjestää (= hankkii) meille liput."
    ]
  },
  {
    "search_term": "järkyttynyt",
    "translation": "JÄRKYTTYNYT (adj) — потрясенный",
    "cases": [
      "järkyttynyt + N ela"
    ],
    "examples": [
      "Mistä sinä olet noin järkyttynyt?",
      "Kaikki olivat aivan järkyttyneitä uutisesta."
    ]
  },
  {
    "search_term": "järkyttyä",
    "translation": "JÄRKYTTYÄ (verbi, intransit) — быть потрясенным",
    "cases": [
      "järkyttyä + N eia"
    ],
    "examples": [
      "Järkytyin onnettomuudesta.",
      "Mistä te niin järkytyitte?"
    ]
  },
  {
    "search_term": "järkyttää",
    "translation": "JÄRKYTTÄÄ (verbi, transit) — потрясти",
    "cases": [
      "järkyttää + O par"
    ],
    "examples": [
      "Asia järkytti minua.",
      "Uutinen järkytti meitä kaikkia.",
      "Firenzen tulvat järkyttivät italialaisia."
    ]
  },
  {
    "search_term": "jättää",
    "translation": "JÄTTÄÄ (verbi, transit) — оставить",
    "cases": [
      "jättää + N ill/all",
      "jättää + N tra",
      "jättää + V -mAAn",
      "jättää + V -mAttA",
      "jäädä + N ill/all",
      "jäädä + N tra",
      "jäädä + N ela/abl",
      "jäädä + N ine/ade",
      "jäädä + V -mAAn",
      "jäädä + V -mAttA"
    ],
    "examples": [
      "Jätin kirjat kotiin.",
      "Jätimme matkalaukut asemalle.",
      "Muistitko jättää avaimen Harrille?",
      "Jätetään Liisa lapsenvahdiksi.",
      "Jätän vaikean työn viimeiseksi.",
      "Hän jätti koiran meille pariksi tunniksi.",
      "Jätin Sannan pihalle leikkimään.",
      "Jätän sinut tekemään töitäsi.",
      "Asiakas jätti maksamatta.",
      "Jätin työn tekemättä.",
      "JÄÄDÄ {verbi, intransit) — остаться",
      "Jäätkö sinä Suomeen?",
      "Aion jäädä Pariisiin.",
      "Kirja jäi kotiin.",
      "Lompakko jäi pöydälle.",
      "Ravintolavaunu jää Tampereelle.",
      "Jäin maalle koko viikonlopuksi.",
      "Jäätkö koko vuodeksi Suomeen?",
      "Hän jäi toiseksi kilpailussa.",
      "Kuka jäi viimeiseksi?",
      "Asia jäi Hennan huoleksi.",
      "Minä jäin pois kokouksesta.",
      "Jaan bussista seuraavalla pysäkillä.",
      "He jäivät pois kurssilta.",
      "Huom! Hän jäi junasta (= hän ei ehtinyt junaan).",
      "Jäätkö pois junasta Puistolassa?",
      "Kuka jää pois seuraavalla asemalla?",
      "He jäivät vielä pihalle leikkimään.",
      "Työ jäi tekemättä.",
      "Voi, maito jäi ostamatta!"
    ]
  },
  {
    "search_term": "idea",
    "translation": "IDEA (subst)",
    "cases": [
      "idea + N ill"
    ],
    "examples": [
      "Sain idean tähän kurssilta.",
      "Hän oli saanut idean kirjeen kirjoittamiseen Irmalta.",
      "Kaupunginjohtaja antoi idean konsertin pitämiseen."
    ]
  },
  {
    "search_term": "ihailla",
    "translation": "IHAILLA (verbi, transit)",
    "cases": [
      "ihailla + O par"
    ],
    "examples": [
      "Minä ihailen häntä.",
      "He ihailevat kovasti Marttia."
    ]
  },
  {
    "search_term": "ihastua",
    "translation": "IHASTUA (verbi, intransit)",
    "cases": [
      "ihastua + N ill",
      "ihastua + N ela"
    ],
    "examples": [
      "Ihastuin Liisaan jo koulussa. Li ihastuu varmasti Suomeen",
      "Ihastuin lahjasta, jonka sain."
    ]
  },
  {
    "search_term": "ihastunut",
    "translation": "IHASTUNUT (adj)",
    "cases": [
      "ihastunut + N ill"
    ],
    "examples": [
      "Pekka on ihastunut Liisaan.",
      "Turistit ovat ihastuneita Lappiin.",
      "Emme ole kovin ihastuneita häneen."
    ]
  },
  {
    "search_term": "ihmetellä",
    "translation": "IHMETELLÄ (verbi, transit)",
    "cases": [
      "ihmetellä + O par",
      "ihmetellä + että-lause"
    ],
    "examples": [
      "Ihmettelen asiaa kovasti.",
      "Opettaja ihmetteli, että osasin asian niin hyvin."
    ]
  },
  {
    "search_term": "ikäinen",
    "translation": "IKÄINEN (adj)",
    "cases": [
      "N gen + ikäinen"
    ],
    "examples": [
      "Minkä ikäinen hän on?",
      "Hän on vasta kolmen (vuoden) ikäinen.",
      "Sinä olet minun ikäiseni."
    ]
  },
  {
    "search_term": "ikävä",
    "translation": "IKÄVÄ (subst)",
    "cases": [
      "ikävä + N par",
      "ikävä + N ill/all"
    ],
    "examples": [
      "Minulla on ikävä sinua.",
      "Akikolla on ikävä Japania.",
      "Akikolla on ikävä Japaniin (= Akiko haluaa matkustaa Japaniin).",
      "Väinöllä on ikävä Tampereelle."
    ]
  },
  {
    "search_term": "ikävöidä",
    "translation": "IKÄVÖIDÄ (verbi, transit)",
    "cases": [
      "ikävöidä + O par",
      "ikävöidä + N ill/all"
    ],
    "examples": [
      "Kirsti ikävöi Villeä.",
      "Minä ikävöin sinua.",
      "Hän ikävöi jatkuvasti kotiin, kun hän on ulkomailla.",
      "Tanja ikävöi Venäjälle."
    ]
  },
  {
    "search_term": "ilahduttaa",
    "translation": "ILAHDUTTAA (verbi, transit)",
    "cases": [
      "ilahduttaa + O par"
    ],
    "examples": [
      "Hän ilahdutti minua kauniilla ruusulla.",
      "Heikin kaunis kirje ilahdutti Railia."
    ]
  },
  {
    "search_term": "ilahtua",
    "translation": "ILAHTUA (verbi, intransit)",
    "cases": [
      "ilahtua + N ela"
    ],
    "examples": [
      "Ilahduin ruususta kovasti."
    ]
  },
  {
    "search_term": "ilkeä",
    "translation": "ILKEÄ (adj)",
    "cases": [
      "ilkeä + ali",
      "ilkeä + N par + kohtaan"
    ],
    "examples": [
      "Ilse oli ilkeä Hannalle.",
      "Älä ole ilkeä minulle!",
      "Lapset olivat ilkeitä toisilleen.",
      "Anteeksi, että olin ilkeä sinua kohtaan.",
      "Hän on aina ilkeä meitä kohtaan."
    ]
  },
  {
    "search_term": "ilmestyä",
    "translation": "ILMESTYÄ (verbi, intransit)",
    "cases": [
      "ilmestyä + N ill/all",
      "ilmestyä + N ela/abl"
    ],
    "examples": [
      "Mies ilmestyi yhtäkkiä huoneeseen.",
      "Taivaalle ilmestyi tähti.",
      "Mistä sinä siihen ilmestyit?",
      "Häneltä on ilmestynyt jo toinen runokirja."
    ]
  },
  {
    "search_term": "ilmoittaa",
    "translation": "ILMOITTAA (verbi, transit)",
    "cases": [
      "ilmoittaa + ine/ade",
      "ilmoittaa + M ill/all",
      "ilmoittaa + N ela"
    ],
    "examples": [
      "Vanhuksen katoamisesta ilmoitettiin radiossa.",
      "Liike ilmoittaa alennusmyynnistä lehden etusivulla.",
      "Ilmoittakaa asia toimistoon!",
      "Onko hänelle jo ilmoitettu uusi vastaanottoaika?",
      "Asiasta on ilmoitettu jo heille.",
      "Sihteeri ilmoitti oppilaille kurssin peruuntumisesta."
    ]
  },
  {
    "search_term": "ilmoitus",
    "translation": "ILMOITUS (subst)",
    "cases": [
      "ilmoitus + N ela"
    ],
    "examples": [
      "Ilmoitus kokouksesta on huomisessa lehdessä.",
      "Mies teki ilmoituksen varkaudesta."
    ]
  },
  {
    "search_term": "ilo",
    "translation": "ILO (subst)",
    "cases": [
      "ilo + N ela"
    ],
    "examples": [
      "Minulla on paljon iloa siskoni lapsista.",
      "Mitä iloa meillä on rahasta, jos terveys puuttuu?",
      "Olin hyvin iloinen kirjeestä."
    ]
  },
  {
    "search_term": "iloinen",
    "translation": "ILOINEN (adj)",
    "cases": [
      "iloinen + N ela"
    ],
    "examples": [
      "Sihteeri oli iloinen palkankorotuksesta."
    ]
  },
  {
    "search_term": "iloita",
    "translation": "ILOITA (verbi, intransit)",
    "cases": [
      "iloita + N ela"
    ],
    "examples": [
      "Poika iloitsi uudesta polkupyörästä.",
      "Vanhemmat iloitsivat tyttären kotiintulosta."
    ]
  },
  {
    "search_term": "ilostua",
    "translation": "ILOSTUA (verbi, intransit)",
    "cases": [
      "ilostua + N ela"
    ],
    "examples": [
      "Ilostuin Andrean kortista kovasti.",
      "Ilostuitko Pekan soitosta?"
    ]
  },
  {
    "search_term": "imarrella",
    "translation": "IMARRELLA (verbi, transit)",
    "cases": [
      "imarrella + O par"
    ],
    "examples": [
      "Kauniit sanat imartelivat Liisaa.",
      "Hän halusi imarrella minua."
    ]
  },
  {
    "search_term": "imeytyä",
    "translation": "IMEYTYÄ (verbi, intransit)",
    "cases": [
      "imeytyä + N ill"
    ],
    "examples": [
      "Voide imeytyy ihoon.",
      "Vesi imeytyy maahan nopeasti."
    ]
  },
  {
    "search_term": "imeä",
    "translation": "IMEÄ (verbi, transit)",
    "cases": [
      "imeä + O par",
      "imeä + N ela"
    ],
    "examples": [
      "Lapsi imee ensin tuttia ja sitten peukaloa.",
      "Vauva imee maitoa tuttipullosta."
    ]
  },
  {
    "search_term": "inhota",
    "translation": "INHOTA (verbi, transit)",
    "cases": [
      "inhota + O par",
      "inhota + V -minen"
    ],
    "examples": [
      "He inhoavat varmasti minua.",
      "Inhoan käärmeitä.",
      "Hän inhoaa maksalaatikkoa.",
      "Ilmari inhoaa siivoamista.",
      "Inhoan syksyn saapumista ja sateen alkamista.",
      "Hän inhoaa bussilla matkustamista."
    ]
  },
  {
    "search_term": "inhottaa",
    "translation": "INHOTTAA (verbi, transit)",
    "cases": [
      "inhottaa + O par",
      "inhottaa + V 1. inf"
    ],
    "examples": [
      "Käärmeet inhottavat minua.",
      "Kalan perkaaminen inhottaa Saria.",
      "Minua inhottaa mennä sinne.",
      "Häntä inhotti panna mato koukkuun.",
      "Sirkkaa inhotti kertoa totuus."
    ]
  },
  {
    "search_term": "innokas",
    "translation": "INNOKAS (adj)",
    "cases": [
      "innokas + V -mAAn"
    ],
    "examples": [
      "Kuka on innokas lähtemään elokuviin?",
      "Emme ole kovin innokkaita tulemaan mukaan."
    ]
  },
  {
    "search_term": "innostaa",
    "translation": "INNOSTAA (verbi, transit)",
    "cases": [
      "innostaa + O par",
      "innostaa + O + V -mAAn"
    ],
    "examples": [
      "Isoäiti innosti (= kannusti) minua aina.",
      "Opettaja innosti minua opiskelemaan ahkerasti.",
      "Rooman matka innosti häntä tutustumaan italialaiseen taiteeseen.",
      "Hän innosti minut menemään sinne ja siellä olikin ihan mukavaa."
    ]
  },
  {
    "search_term": "innostua",
    "translation": "INNOSTUA (verbi, intransit)",
    "cases": [
      "innostua + N ela",
      "innostua + N ill",
      "innostua + V-mAAn"
    ],
    "examples": [
      "Innostuimme asiasta.",
      "Aleksis innostuu aina kaikesta uudesta.",
      "Kuinka saisimme hänet innostumaan asiaan?",
      "Innostuin urheiluun jo lapsena.",
      "Hän ei helposti innostuu työntekoon.",
      "Innostuin ostamaan liian monta kirjaa."
    ]
  },
  {
    "search_term": "innostunut",
    "translation": "INNOSTUNUT (adj)",
    "cases": [
      "innostunut + N ela",
      "innostua + N ill"
    ],
    "examples": [
      "Lapset ovat innostuneita urheiluun.",
      "Onko sinulla mitään intoa siivota tänään?",
      "Hän on innostunut urheilusta.",
      "He olivat innostuneita joulusta."
    ]
  },
  {
    "search_term": "innostus",
    "translation": "INNOSTUS (subst)",
    "cases": [
      "innostus + N ilJ",
      "innostus + V 1. inf"
    ],
    "examples": [
      "Erikin innostus musiikkiin teki hänestä pianistin.",
      "Sarin innostus auton ajamiseen on suuri.",
      "Sarin innostus ajaa autoa on suuri.",
      "Pojan innostus saavuttaa uusi ennätys kasvoi koko ajan."
    ]
  },
  {
    "search_term": "into",
    "translation": "INTO (subst)",
    "cases": [
      "into + N ill",
      "into + V 1. inf"
    ],
    "examples": [
      "Hänellä on kova into tähän työhön.",
      "Jarilla on kova into jalkapallon pelaamiseen."
    ]
  },
  {
    "search_term": "investoida",
    "translation": "INVESTOIDA (verbi, transit)",
    "cases": [
      "investoida + N ill"
    ],
    "examples": [
      "Hän investoi (= sijoitti) paljon rahaa tehtaaseen viime vuonna."
    ]
  },
  {
    "search_term": "irrota",
    "translation": "IRROTA (verbi, intransit)",
    "cases": [
      "irrota + N ela/abl"
    ],
    "examples": [
      "Takista irtosi nappi.",
      "Vene irtosi laiturista.",
      "Häneltä ei irronnut sanaakaan."
    ]
  },
  {
    "search_term": "irrottaa",
    "translation": "IRROTTAA (verbi, transit)",
    "cases": [
      "irrottaa + N ela/abl",
      "irti + N ela"
    ],
    "examples": [
      "Irrotimme veneen laiturista.",
      "Hän irrotti seinältä mainoksen.",
      "IRTI (adv)",
      "Nappi on irti takista.",
      "Puhelin on irti seinästä.",
      "Ota ilo irti elämästä!"
    ]
  },
  {
    "search_term": "iskeä",
    "translation": "ISKEÄ (verbi, transit)",
    "cases": [
      "iskeä + N ill"
    ],
    "examples": [
      "Hän iski naulan seinään.",
      "Varas iski miestä pullolla päähän.",
      "Poliisi iski nyrkillä ikkunaan."
    ]
  },
  {
    "search_term": "istua",
    "translation": "ISTUA (verbi, intransit)",
    "cases": [
      "istua + N ine/ade",
      "istua + N ill/all",
      "istua + V -mAssA"
    ],
    "examples": [
      "Kuljettaja istuu jo bussissa.",
      "Liisa istuu sohvalla ja syö suklaata.",
      "Istuin nojatuoliin television ääreen.",
      "Hän istui tuolille ja alkoi itkeä.",
      "Istuin kirjastossa lukemassa koko päivän.",
      "He istuvat televisiota katsomassa."
    ]
  },
  {
    "search_term": "istuttaa",
    "translation": "ISTUTTAA (verbi, transit)",
    "cases": [
      "istuttaa + N ill/all"
    ],
    "examples": [
      "Ahoset istuttavat ruusuja puutarhaan.",
      "Istutin viime kesänä kesämökille omenapuun."
    ]
  },
  {
    "search_term": "istuutua",
    "translation": "ISTUUTUA (verbi, intransit)",
    "cases": [
      "istuutua + N ill/all"
    ],
    "examples": [
      "Istuuduin nojatuoliin.",
      "Vanhukset istuutuivat puistonpenkille lepäämään."
    ]
  },
  {
    "search_term": "itkettää",
    "translation": "ITKETTÄÄ (verbi, transit)",
    "cases": [
      "itkettää + O par"
    ],
    "examples": [
      "Taas Pekkaa itkettää.",
      "Mikä sinua itkettää?"
    ]
  },
  {
    "search_term": "itkeä",
    "translation": "ITKEÄ (verbi, transit)",
    "cases": [
      "itkeä + O par",
      "itkeä + N ela"
    ],
    "examples": [
      "Hän itki kuollutta koiraa kauan.",
      "Mitä sinä itket?"
    ]
  },
  {
    "search_term": "edellyttää",
    "translation": "EDELLYTTÄÄ (verbi, transit) — предусматривать",
    "cases": [
      "edellyttää + O par",
      "edellyttää + N abi"
    ],
    "examples": [
      "Kurssi edellyttää hyvää laskutaitoa. — Курсы предусматривают хорошего умения считать.",
      "Työnhakijalta edellytetään ruotsin kielen taitoa",
      "Kurssi edellyttää opiskelijalta hyviä perustiedot."
    ]
  },
  {
    "search_term": "edellytys",
    "translation": "EDELLYTYS (subst) — предпосылка (для чего-либо)",
    "cases": [
      "edellytys + N ill/all",
      "edellytys + N tra",
      "edellytys + V 1. inf"
    ],
    "examples": [
      "Ainoa edellytys virkaan on hyvä suomen kielen Tatu Hänellä on hyvät edellytykset tähän työhön.",
      "Liisan edellytykset tietokonealalle ovat loistavat.",
      "Leenalla on hyvät edellytykset lentoemännäksi.",
      "Tutkijalla on hyvät edellytykset saada apuraha. Minulla ei ole mitään edellytyksiä onnistua."
    ]
  },
  {
    "search_term": "edeltää",
    "translation": "EDELTÄÄ (verbi, transit) edeltää + O par — предшествовать",
    "cases": [],
    "examples": [
      "Sadetta edelsi kova tuuli.",
      "Jatkokurssia edeltää alkeiskurssi.",
      "Sotaa edelsi pitkä rauhan aika."
    ]
  },
  {
    "search_term": "edistää",
    "translation": "EDISTÄÄ (verbi, transit) — способствовать",
    "cases": [
      "edistää + O par"
    ],
    "examples": [
      "Voinko edistää asiaa jollakin tavalla?",
      "Hyvä muisti edistää oppimista."
    ]
  },
  {
    "search_term": "edustaa",
    "translation": "EDUSTAA (verbi, transit) — представлять (быть представителем)",
    "cases": [
      "edustaa + O par",
      "edustaa + N ine/ade"
    ],
    "examples": [
      "Mitä firmaa te edustatte?",
      "Ulkoministeri edusti Suomea hyvin.",
      "Rehtori edustaa yliopistoa neuvottelussa.",
      "Hän edustaa Saksaa EU-parlamentissa. Kuka edustaa Suomea Pariisissa? Hän edustaa meitä Venäjällä."
    ]
  },
  {
    "search_term": "ehdottaa",
    "translation": "EHDOTTAA (verbi, transit) — предлагать",
    "cases": [
      "ehdottaa + O par",
      "ehdottaa + N tra",
      "ehdottaa + N ill/all",
      "ehdottaa + että-lause"
    ],
    "examples": [
      "Tuula ehdottaa Timoa.",
      "Ehdotan Timoa puheenjohtajaksi.",
      "Hän ehdotti virkaan maisteri Mäkelää. Ehdotan teille pitkää lomaa. Voitte ehdottaa asiaa hänelle.",
      "Ehdotan, että odotamme vielä viisi minuuttia. Hän ehdotti, että menisimme elokuviin."
    ]
  },
  {
    "search_term": "ehdotus",
    "translation": "EHDOTUS (subst) — предложение",
    "cases": [
      "ehdotus + N ela"
    ],
    "examples": [
      "Ehdotus apurahan saajista oli onnistunut.",
      "Hyväksyimme ehdotuksen uuden kurssin järjestämisestä."
    ]
  },
  {
    "search_term": "ehtiä",
    "translation": "EHTIÄ (verbi, intransit) — успеть",
    "cases": [
      "ehtiä + N ill/all",
      "ehtiä + V 1. inf/-mAAn (то есть могут быть оба инфинитива)"
    ],
    "examples": [
      "Ehdin bussiin viime hetkellä. Te ehditte vielä kurssille.",
      "Ehtisitkö laatia referaatin jo huomiseksi? — Ты успеешь составить реферат уже к завтра?",
      "Ehditkö tulla illalla?",
      "En ehdi odottaa.",
      "Ehditkö syömään?",
      "Ehdin tulemaan tiistaina",
      "Hän ehti matkustamaan paljon Suomessa."
    ]
  },
  {
    "search_term": "eläytyä",
    "translation": "ELÄYTYÄ (verbi, intransit) — вжиться (в роль)",
    "cases": [
      "eläytyä + N ill"
    ],
    "examples": [
      "Hän eläytyi hyvin Macbethin osaan.",
      "Empaattinen ihminen osaa eläytyä toisten tunteisiin."
    ]
  },
  {
    "search_term": "elää",
    "translation": "ELÄÄ (verbi, intransit) — жить",
    "cases": [
      "elää + N ine/ade"
    ],
    "examples": [
      "Olen elänyt koko ikäni samalla paikkakunnalla Suomessa.",
      "Kilpikonnia elää vedessä ja maalla."
    ]
  },
  {
    "search_term": "ennakkoluulo",
    "translation": "ENNAKKOLUULO (subst) — предрассудок",
    "cases": [
      "ennakkoluulo + N par + kohtaan"
    ],
    "examples": [
      "Millaisia ennakkoluuloja teillä on uutta opettajaa kohtaan.",
      "Heillä on paljon ennakkoluuloja meitä kohtaan."
    ]
  },
  {
    "search_term": "ennättää",
    "translation": "ENNÄTTÄÄ (verbi, intransit) — успевать, успеть",
    "cases": [
      "ennättää + N ill/all",
      "ennättää + V 1. inf/-mAAn"
    ],
    "examples": [
      "Ennätitkö (= ehditkö) junaan eilen?",
      "Eeva ennättää moneen paikkaan samana päivänä.",
      "Hän ennätti kurssille ajoissa.",
      "En ennättänyt saada työtä valmiiksi.",
      "Hän on ennättänyt tekemään paljon elämässään."
    ]
  },
  {
    "search_term": "epäillä",
    "translation": "EPÄILLÄ (verbi, transit) — подозревать",
    "cases": [
      "epäillä + O par",
      "epäillä + N ela epäillä + N tra",
      "epäillä + että-lause"
    ],
    "examples": [
      "Poliisi epäilee häntä.",
      "Lääkäri epäili astmaa.",
      "He epäilevät häntä jostakin rikoksesta.",
      "Miestä epäillään syylliseksi varkauteen.",
      "Epäilimme, että hänelle oli sattunut jotakin. Epäilen, että tämä työ epäonnistuu."
    ]
  },
  {
    "search_term": "epäilys",
    "translation": "EPÄILYS (EPÄILY) (subst)",
    "cases": [
      "epäilys + N ela"
    ],
    "examples": [
      "Poliisin epäilys murhasta oli oikea.",
      "Hänellä on omat epäilyksensä asiasta."
    ]
  },
  {
    "search_term": "epäluulo",
    "translation": "EPÄLUULO (subst)",
    "cases": [
      "epäluulo + N par + kohtaan"
    ],
    "examples": [
      "Epäluulot kassanhoitajaa kohtaan kasvoivat."
    ]
  },
  {
    "search_term": "epäonnistua",
    "translation": "EPÄONNISTUA (verbi, intransit) — терпеть неудачу, потерпеть неудачу, «провалиться»",
    "cases": [
      "epäonnistua + N ine"
    ],
    "examples": [
      "Epäonnistuin tentissä.",
      "He epäonnistuvat tuossa työssä varmasti.",
      "Maalarit epäonnistuivat maalaamisessa."
    ]
  },
  {
    "search_term": "epäröidä",
    "translation": "EPÄRÖIDÄ (verbi, transit) — сомневаться, колебаться",
    "cases": [
      "epäröidä + V 1. inf"
    ],
    "examples": [
      "Hän epäröi mennä johtajan puheille.",
      "En epäröinyt hetkeäkään lähteä uudelle matkalle."
    ]
  },
  {
    "search_term": "epävarma",
    "translation": "EPÄVARMA (adj) — неуверенный",
    "cases": [
      "epävarma + N ela"
    ],
    "examples": [
      "Hän on vieläkin epävarma asiasta."
    ]
  },
  {
    "search_term": "erehtyä",
    "translation": "EREHTYÄ (verbi, intransit) — ошибаться, ошибиться",
    "cases": [
      "erehtyä + N ine",
      "erehtyä + N ela",
      "erehtyä + V -mAAn"
    ],
    "examples": [
      "Erehdyin tässä asiassa.",
      "Asiakas erehtyi ovesta ja astui johtajan huoneeseen.",
      "Erehdyin menemään väärään huoneeseen."
    ]
  },
  {
    "search_term": "erikoistua",
    "translation": "ERIKOISTUA (verbi, intransit) — специализироваться",
    "cases": [
      "erikoistua + N ill",
      "erikoistua + N tra",
      "erikoistua + V -mAAn"
    ],
    "examples": [
      "Tohtori Veitsi on erikoistunut kirurgiaan.",
      "Hän on erikoistunut Ranskan historiaan.",
      "Tehdas on erikoistunut saunakiukaiden valmistamiseen.",
      "Aion erikoistua lastenlääkäriksi.",
      "Tehdas on erikoistunut valmistamaan saunakiukaita."
    ]
  },
  {
    "search_term": "ero",
    "translation": "ERO (subst) — развод, разлука, разница",
    "cases": [
      "ero + N ela"
    ],
    "examples": [
      "Ero vaimosta masensi häntä.",
      "Ero ystävistä tuntui ikävältä."
    ]
  },
  {
    "search_term": "erota",
    "translation": "EROTA (verbi, intransit) — увольняться, уволиться",
    "cases": [
      "erota + N ela",
      "erota + N ine/ade"
    ],
    "examples": [
      "Esko erosi työstä viime kuussa.",
      "Hän erosi kirkosta ja on nyt siviili rekisterissä.",
      "Hän erosi miehestään (= otti avioeron) viime vuonna.",
      "Suomessa vuodenajat eroavat toisistaan paljon (= ovat hyvin erilaisia).",
      "Erosimme eteisessä.",
      "Liisa ja Jussi erosivat Oulun asemalla."
    ]
  },
  {
    "search_term": "erottaa",
    "translation": "EROTTAA (verbi, transit) — увольнять, уволить",
    "cases": [
      "erottaa + N ela"
    ],
    "examples": [
      "Rehtori erotti oppilaan koulusta. Hänet erotettiin puolueesta.",
      "Virpi ja Varpu ovat identtiset kaksoset, heitä on vaikea erottaa toisistaan (= tietää kumpi on kumpi)."
    ]
  },
  {
    "search_term": "erottua",
    "translation": "EROTTUA (verbi, intransit) — выделяться",
    "cases": [
      "erottua + N ela"
    ],
    "examples": [
      "Hän erottui joukosta heti.",
      "Ruskea erottuu mustasta huonosti.",
      "Raidat tuskin erottuvat kankaasta."
    ]
  },
  {
    "search_term": "esiintyä",
    "translation": "ESIINTYÄ (verbi, intransit) — выступать, выступить",
    "cases": [
      "esiintyä + N ine/ade"
    ],
    "examples": [
      "Hän esiintyy tänä iltana televisiossa.",
      "Suomen paras rock-orkesteri esiintyy tanssilavalla viikonloppuna."
    ]
  },
  {
    "search_term": "esimerkki",
    "translation": "ESIMERKKI (subst) — пример",
    "cases": [
      "esimerkki + N ela"
    ],
    "examples": [
      "Tämä on hyvä esimerkki siitä asiasta."
    ]
  },
  {
    "search_term": "esitellä",
    "translation": "ESITELLÄ (verbi, transit) — представить (познакомить)",
    "cases": [
      "esitellä + N ali"
    ],
    "examples": [
      "Voitko esitellä ystäväsi minulle?",
      "Esittelin suunnitelman johtajalle."
    ]
  },
  {
    "search_term": "estää",
    "translation": "ESTÄÄ (verbi, transit) — препятствовать, мешать",
    "cases": [
      "estää + O par + V -mAstA"
    ],
    "examples": [
      "Sade esti minua menemästä ulos.",
      "Aita ei estänyt koiraa juoksemasta kadulle.",
      "Biodent-aine estää hampaita tummumasta."
    ]
  },
  {
    "search_term": "etevä",
    "translation": "ETEVÄ (adj) — способный, продвинутый (в чем-либо)",
    "cases": [
      "etevä + N ine",
      "etevä + V -mAAn"
    ],
    "examples": [
      "He ovat eteviä suunnitelmien laatimisessa.",
      "Maija on etevä matematiikassa.",
      "Eeva on etevä laskemaan."
    ]
  },
  {
    "search_term": "etsiä",
    "translation": "ETSIÄ (verbi, transit) — искать",
    "cases": [
      "etsiä + O par",
      "etsiä + N ela/abl"
    ],
    "examples": [
      "Mitä sinä etsit?",
      "Etsin Tarjan takkia. Ketä te etsitte? Etsin rouva Koivistoa.",
      "Etsin kirjaa kaapista.",
      "Hän etsi pukua kaikista kaupoista.",
      "Elli etsi neulaa lattialta."
    ]
  },
  {
    "search_term": "etu",
    "translation": "ETU (subst) — выгода",
    "cases": [
      "etu + N ela",
      "etu + N ali"
    ],
    "examples": [
      "Uudesta tiestä oli etua meille.",
      "Devalvaatiosta oli paljon etua pankille.",
      "Mitä etua tästä voi olla?",
      "Kaupasta oli paljon etua heille."
    ]
  },
  {
    "search_term": "evakuoida",
    "translation": "EVAKUOIDA (verbi, transit) — эвакуировать",
    "cases": [
      "evakuoida + V ela/abl",
      "evakuoida + V ill/all"
    ],
    "examples": [
      "Maasta on evakuoitu paljon naisia ja lapsia.",
      "Kylän asukkaat evakuoitiin naapurimaahan sodan aikana.",
      "Heidät evakuoitiin Tampereelle."
    ]
  },
  {
    "search_term": "paeta",
    "translation": "PAETA (verbi, transit) — бежать, убегать",
    "cases": [
      "paeta + O par",
      "paeta + N ela/abl",
      "paeta + N ill/all"
    ],
    "examples": [
      "Mies pakeni poliisia kolme päivää.",
      "Älä yritä paeta vastuuta!",
      "He joutuivat pakenemaan kotimaastaan.",
      "Tästä vankilasta on vaikea paeta.",
      "Mies pakeni rikospaikalta.",
      "He pakenivat vihollista naapurimaahan.",
      "Mies pakeni takapihalle ja sieltä läheiseen metsään."
    ]
  },
  {
    "search_term": "paheksua",
    "translation": "PAHEKSUA (verbi, transit)",
    "cases": [
      "paheksua + O par"
    ],
    "examples": [
      "Ministerin käytöstä paheksuttiin.",
      "Tupakanpolttoa paheksutaan aika yleisesti."
    ]
  },
  {
    "search_term": "pahentaa",
    "translation": "PAHENTAA (verbi, transit)",
    "cases": [
      "pahentaa + O par",
      "pahoilla(an) + N ela"
    ],
    "examples": [
      "Istumatyö pahentaa Seijan selkäkipua.",
      "Käytöksesi vain pahensi asiaa.",
      "PAHOILLA(AN) (adv) PAHOILLE(EN)",
      "Olen pahoillani erehdyksestänl.",
      "Hän oli pahoillaan siitä, että oli tehnyt virheen.",
      "Tulin kovin pahoilleni hänen sanoistaan."
    ]
  },
  {
    "search_term": "paijata",
    "translation": "PAIJATA (verbi, transit)",
    "cases": [
      "paijata + O par"
    ],
    "examples": [
      "Ville paijaa kissaa.",
      "Äiti paijasi hellästi pojan päätä."
    ]
  },
  {
    "search_term": "painaa",
    "translation": "PAINAA (verbi, transit)",
    "cases": [
      "painaa + N ill/all",
      "painaa + O par"
    ],
    "examples": [
      "Lapsi painoi nenänsä ikkunaan.",
      "Paina kansi varovasti paikoilleen!",
      "Hän painoi katseensa maahan {= katsoi alaspäin).",
      "Paina tämä mieleesi (= muista tämä)!",
      "Kirja on painettu uusiopaperille.",
      "Raskas reppu painaa olkapäätä ja hartioita.",
      "Rahahuolet painavat mieltäni."
    ]
  },
  {
    "search_term": "painostaa",
    "translation": "PAINOSTAA (verbi, transit)",
    "cases": [
      "painostaa + O + V -mAAn"
    ],
    "examples": [
      "Johtokunta painosti miehen eroamaan.",
      "Ministeri painostettiin lähtemään hallituksesta.",
      "Hän yritti painostaa minua myymään auton halvalla."
    ]
  },
  {
    "search_term": "painostus",
    "translation": "PAINOSTUS (subst)",
    "cases": [
      "painostus + N par + kohtaan"
    ],
    "examples": [
      "Painostus heitä kohtaan on lisääntynyt."
    ]
  },
  {
    "search_term": "painottaa",
    "translation": "PAINOTTAA (verbi, transit)",
    "cases": [
      "painottaa + O par"
    ],
    "examples": [
      "Kielenopetuksessa painotetaan erityisesti puhekieltä.",
      "Haluan painottaa seuraavia asioita."
    ]
  },
  {
    "search_term": "painottua",
    "translation": "PAINOTTUA (verbi, intransit)",
    "cases": [
      "painottua + N iii"
    ],
    "examples": [
      "Kurssi painottuu puhekielen opetukseen.",
      "Budjetti painottuu työttömyyden hoitoon."
    ]
  },
  {
    "search_term": "painua",
    "translation": "PAINUA (verbi, intransit)",
    "cases": [
      "painua + N ill/all"
    ],
    "examples": [
      "Kivi painui pohjaan. Painu (= mene) helvettiin!",
      "Painukaa pihalle huutamaan!"
    ]
  },
  {
    "search_term": "pakata",
    "translation": "PAKATA (verbi, transit)",
    "cases": [
      "pakata + N ill"
    ],
    "examples": [
      "Pakkasin tavarat matkalaukkuun.",
      "Pakkaa nuo vanhat vaatteet laatikkoon ja vie ne kellariin!"
    ]
  },
  {
    "search_term": "pakko",
    "translation": "PAKKO (subst)",
    "cases": [
      "N gen + on pakko + V 1. inf",
      "on pakko + V 1. inf"
    ],
    "examples": [
      "Sinun on pakko muistaa tämä asia.",
      "Oliko teidän pakko tehdä tuolla tavalla?",
      "Työn on pakko olla valmis huomenna.",
      "Harjoitusten on pakko olla valmiita huomenna.",
      "Työ on pakko saada valmiiksi huomiseen mennessä.",
      "Harjoitukset on pakko tehdä huomiseksi."
    ]
  },
  {
    "search_term": "pako",
    "translation": "PAKO (subst)",
    "cases": [
      "pako + N ela/abl",
      "pako + N ill/all"
    ],
    "examples": [
      "Pako vankilasta huomattiin vasta tunnin kuluttua.",
      "Pako onnettomuuspaikalta pahensi asiaa.",
      "Pako maalta kaupunkiin oli yleistä 1960-luvulla.",
      "Pako toiselle puolelle maailmaa tuntui pelottavalta.",
      "Pako mielikuvitusmaailmaan on pakoa todellisuudesta."
    ]
  },
  {
    "search_term": "pakottaa",
    "translation": "PAKOTTAA (verbi, transit)",
    "cases": [
      "pakottaa + N ill/all",
      "pakottaa + O + V -mAAn"
    ],
    "examples": [
      "Isä pakotti pojan kouluun.",
      "Älä pakota minua tähän!",
      "Lapset pakotettiin kasvimaalle kitkemään rikkaruohoja.",
      "Pakotatko sinä lapsen syömään lautasen tyhjäksi?",
      "Hän pakotti minut tekemään kaikki kotityöt."
    ]
  },
  {
    "search_term": "palauttaa",
    "translation": "PALAUTTAA (verbi, transit)",
    "cases": [
      "palauttaa + N ill/all"
    ],
    "examples": [
      "Kirjat täytyy palauttaa kirjastoon kuukauden kuluttua.",
      "Poliisi palautti varastetun auton oikealle omistajalle."
    ]
  },
  {
    "search_term": "palata",
    "translation": "PALATA (verbi, intransit)",
    "cases": [
      "palata + N ela/abl",
      "palata + N ill/all",
      "palata + V -mAAn",
      "paljon + N par"
    ],
    "examples": [
      "He palaavat Lontoosta ensi viikolla.",
      "Palasimme maalta kaupunkiin loman jälkeen.",
      "Milloin Heli palaa Suomeen?",
      "Hän on palannut kotiseudulle.",
      "Palataan asiaan huomenna!",
      "Harri palasi kotimaahan opiskelemaan.",
      "PALJON (adv)",
      "Ostimme paljon ruokaa ja juomaa.",
      "Minulla on paljon kirjoja ja CD-levyjä.",
      "Torilla oli paljon ihmisiä."
    ]
  },
  {
    "search_term": "palkata",
    "translation": "PALKATA (verbi, transit)",
    "cases": [
      "palkata + V -mAAn"
    ],
    "examples": [
      "Minut on palkattu tänne auttamaan teitä.",
      "Palkkasin miehen pesemään ikkunat."
    ]
  },
  {
    "search_term": "palkinto",
    "translation": "PALKINTO (subst) — премия",
    "cases": [
      "palkinto + N ela"
    ],
    "examples": [
      "Hän sai palkinnon runoteoksestaan.",
      "Palkinto annettiin kirjailijan koko tuotannosta."
    ]
  },
  {
    "search_term": "palkita",
    "translation": "PALKITA (verbi, transit)",
    "cases": [
      "palkita + N ela"
    ],
    "examples": [
      "Hänet palkittiin hyvästä työstä.",
      "Ahkeruudesta palkitaan.",
      "Opettaja palkitsi pojat hyvästä yrityksestä."
    ]
  },
  {
    "search_term": "palkka",
    "translation": "PALKKA (subst)",
    "cases": [
      "palkka + N ela"
    ],
    "examples": [
      "Palkka vastuullisesta työstä ei ollut kovin suuri.",
      "Palkka ylityöstä maksetaan kaksinkertaisena."
    ]
  },
  {
    "search_term": "paloitella",
    "translation": "PALOITELLA (verbi, transit)",
    "cases": [
      "paloitella + N tra"
    ],
    "examples": [
      "Paloittele liha isoiksi kuutioiksi!",
      "Ostin broilerin, joka oli valmiiksi paloiteltu."
    ]
  },
  {
    "search_term": "paluu",
    "translation": "PALUU (subst)",
    "cases": [
      "paluu + N ill/all",
      "paluu + N ela/abl"
    ],
    "examples": [
      "Paluu Lontoosta Helsinkiin kesti kolme tuntia.",
      "Lomalta paluu tuntui ikävältä.",
      "Paluu kotimaahan tuntui ihanalta.",
      "Kirjailija kertoi paluustaan Venäjälle.",
      "Paluu kotiseudulle tuntui mukavalta."
    ]
  },
  {
    "search_term": "palvella",
    "translation": "PALVELLA (verbi, transit)",
    "cases": [
      "palvella + O par"
    ],
    "examples": [
      "Myyjä palveli minua ystävällisesti.",
      "Tässä pankissa palvellaan asiakkaita hyvin.",
      "Kuinka voin palvella teitä?"
    ]
  },
  {
    "search_term": "palvoa",
    "translation": "PALVOA (verbi, transit)",
    "cases": [
      "palvoa + O par",
      "paneutua + N ill"
    ],
    "examples": [
      "Esi-isät palvoivat aurinkoa.",
      "Matti palvoo Liisaa.",
      "PANEUTUA {verbi, intransit)",
      "En jaksa paneutua yksityiskohtiin.",
      "Mirja paneutui asiaan huolellisesti."
    ]
  },
  {
    "search_term": "panna",
    "translation": "PANNA (verbi, transit)",
    "cases": [
      "panna + N ill/all",
      "panna + N ela/abl",
      "panna + O + V -mAAn"
    ],
    "examples": [
      "Mihin olet pannut sanakirjan?",
      "Panin kirjat kassiin. Pane tyynyt sohvalle!",
      "Pane saappaat jalkaan, hattu päähän ja käsineet käteen!",
      "Sirkka panee (= siirtää) kirjat kassista hyllylle.",
      "Panisitko nuo kupit tuolta pöydältä kaappiin?",
      "Isä pani lapset nukkumaan.",
      "Äiti pani (= pakotti) pojan siivoamaan huoneen.",
      "Opettaja pani meidät tekemään kielioppiharjoituksia.",
      "Tapaus pani minut ajattelemaan asiaa uudestaan."
    ]
  },
  {
    "search_term": "parantua",
    "translation": "PARANTUA (PARATA) (verbi, intransit)",
    "cases": [
      "parantua + N ela"
    ],
    "examples": [
      "Oletko jo parantunut flunssasta?",
      "Voiko tästä taudista parantua?",
      "Hän on parantunut vaikeasta sairaudesta.",
      "Flunssasta paranee (parantuu) muutamassa päivässä.",
      "Asia ei puhumisesta parane."
    ]
  },
  {
    "search_term": "parkkeerata",
    "translation": "PARKKEERATA (verbi, transit)",
    "cases": [
      "parkkeerata + N ill/all"
    ],
    "examples": [
      "Saako tähän paikkaan parkkeerata (= pysäköidä)?",
      "Hän parkkeerasi auton takapihalle."
    ]
  },
  {
    "search_term": "parodia",
    "translation": "PARODIA (subst)",
    "cases": [
      "parodia + N ela"
    ],
    "examples": [
      "Elokuva on mainio parodia kuninkaallisesta perheestä."
    ]
  },
  {
    "search_term": "parodioida",
    "translation": "PARODIOIDA (verbi, transit) — пародировать",
    "cases": [
      "parodioida + O par"
    ],
    "examples": [
      "Kirjailija parodioi kansallisrunoilijan tyyliä."
    ]
  },
  {
    "search_term": "pelastaa",
    "translation": "PELASTAA (verbi, transit) — спасать, спасти",
    "cases": [
      "pelastaa + N ela",
      "pelastaa + O + V -mAstA"
    ],
    "examples": [
      "Kaikki viisi miestä pelastettiin palavasta talosta.",
      "Tilanne oli vaikea, mutta Sakari pelasti minut pulasta.",
      "Hän pelasti miehen joutumasta vaikeuksiin.",
      "Jaana pelasti meidät eksymästä metsään.",
      "Kissa pelastettiin hukkumasta."
    ]
  },
  {
    "search_term": "pelastua",
    "translation": "PELASTUA (verbi, intransit) — спасаться, спастись",
    "cases": [
      "pelastua + N ela",
      "pelastua + V -mAstA"
    ],
    "examples": [
      "Miehet pelastuivat palavasta talosta.",
      "Matkustajat pelastuivat onnettomuudesta ilman vakavia vammoja.",
      "Mies pelastui joutumasta vankilaan."
    ]
  },
  {
    "search_term": "pelata",
    "translation": "PELATA (verbi, transit) — играть",
    "cases": [
      "pelata + O par",
      "pelata + N ine/ade"
    ],
    "examples": [
      "Presidentti pelaa golfia.",
      "Pelaamme usein korttia, esimerkiksi bridgeä.",
      "Pojat pelaavat pesäpalloa Kaisaniemessä.",
      "He pelasivat jalkapalloa pihalla."
    ]
  },
  {
    "search_term": "pelotella",
    "translation": "PELOTELLA (verbi, transit) — запугивать",
    "cases": [
      "pelotella + O par",
      "pelotella + N ade"
    ],
    "examples": [
      "Pojat yrittivät pelotella tyttöjä.",
      "Minua on turha pelotella.",
      "Yritätkö pelotella minua tuollaisilla uhkauksilla?",
      "Pojat yrittivät pelotella tyttöjä kummitusjutuilla."
    ]
  },
  {
    "search_term": "pelottaa",
    "translation": "PELOTTAA (verbi, transit) — пугать, наводить страх",
    "cases": [
      "pelottaa + O par",
      "pelottaa + V 1. inf"
    ],
    "examples": [
      "Ukonilma pelottaa minua. Mikä sinua pelottaa?",
      "Minua pelottaa mennä kellariin.",
      "Liisaa pelotti lähteä yksin kotiin yöllä."
    ]
  },
  {
    "search_term": "pelästyä",
    "translation": "PELÄSTYÄ (verbi, transit) — пугаться, испугаться",
    "cases": [
      "pelästyä + O par",
      "pelästyä + N ela"
    ],
    "examples": [
      "Marjatta pelästyi pihalta kuuluvaa outoa ääntä.",
      "Kaikki pelästyivät kovaa huutoa.",
      "Pelästyin lääkärin varoituksista ja lopetin tupakanpolton.",
      "Minä en miehen uhkailuista pelästynyt."
    ]
  },
  {
    "search_term": "pelätä",
    "translation": "PELÄTÄ (verbi, transit) — бояться, страшиться",
    "cases": [
      "pelätä + O par",
      "pelätä + V 1. inf"
    ],
    "examples": [
      "Minä pelkään pimeää.",
      "Pikku-Elsa pelkäsi joulupukkia.",
      "Pelkäsin mennä pimeään kellariin.",
      "Maija pelkää jäädä yksin kotiin."
    ]
  },
  {
    "search_term": "perehtyä",
    "translation": "PEREHTYÄ (verbi, intransit) — ознакомиться",
    "cases": [
      "perehtyä + N ill"
    ],
    "examples": [
      "En ole vielä ehtinyt perehtyä asiaan.",
      "Perehdyin tapaukseen hyvin perinpohjaisesti.",
      "Kurssilla perehdytään sanojen taivuttamiseen."
    ]
  },
  {
    "search_term": "periä",
    "translation": "PERIÄ (verbi, transit) — наследовать, унаследовать",
    "cases": [
      "periä + N abi",
      "periä + N ela"
    ],
    "examples": [
      "Lasse peri talon vanhemmiltaan.",
      "Heli on perinyt kiharan tukkansa äidiltään.",
      "Pankki perii (= ottaa) lainasta korkoa 12 %.",
      "Kotiinkuljetuksesta ei peritä eri maksua."
    ]
  },
  {
    "search_term": "perustaa",
    "translation": "PERUSTAA (verbi, transit) — основывать, основать",
    "cases": [
      "perustaa + N ill/all"
    ],
    "examples": [
      "Helsinkiin on perustettu uusi lukio.",
      "Vantaalle perustetaan uusia kouluja."
    ]
  },
  {
    "search_term": "peruste",
    "translation": "PERUSTE (subst) — основание",
    "cases": [
      "peruste + N ill/all"
    ],
    "examples": [
      "Korvauksen saamiseen ei ole mitään perustetta.",
      "Onko sinulla yhtään perustetta väitteellesi?",
      "Myös: arvostelun peruste, veron peruste"
    ]
  },
  {
    "search_term": "perustua",
    "translation": "PERUSTUA (verbi, intransit) — основываться",
    "cases": [
      "perustua + N ill"
    ],
    "examples": [
      "Näytelmä perustuu tositapahtumiin.",
      "Elokuva perustuu Victor Hugon romaaniin Kurjat.",
      "Mihin väitteesi oikeastaan perustuu?"
    ]
  },
  {
    "search_term": "petkuttaa",
    "translation": "PETKUTTAA (verbi, transit) — обманывать, обмануть",
    "cases": [
      "petkuttaa + O par",
      "petkuttaa + N ine"
    ],
    "examples": [
      "Mies petkutti meitä.",
      "Tulemme parin tunnin perästä (= kuluttua).",
      "Hän petkutti minua asuntokaupassa.",
      "Ralph yritti petkuttaa meitä korttipelissä."
    ]
  },
  {
    "search_term": "pettynyt",
    "translation": "PETTYNYT (adj) — разочарованный",
    "cases": [
      "pettynyt + N ill"
    ],
    "examples": [
      "Olen hyvin pettynyt häneen.",
      "Lapset olivat pettyneitä lahjoihinsa."
    ]
  },
  {
    "search_term": "pettyä",
    "translation": "PETTYÄ (verbi, intransit) — разочаровываться, разочароваться",
    "cases": [
      "pettyä + N ill"
    ],
    "examples": [
      "Petyin häneen.",
      "Lapset pettyivät lahjoihinsa."
    ]
  },
  {
    "search_term": "pettää",
    "translation": "PETTÄÄ (verbi, transit) — обманывать, обмануть",
    "cases": [
      "pettää + O par",
      "pettää + N ine"
    ],
    "examples": [
      "Myyjä petti minua.",
      "Mies on pettänyt vaimoaan jo vuosia.",
      "Petämme itseämme helposti.",
      "Älä petä itseäsi!",
      "Hän petti minua asuntokaupassa."
    ]
  },
  {
    "search_term": "piileskellä",
    "translation": "PIILESKELLÄ (verbi, transit) — прятаться, скрываться",
    "cases": [
      "piileskellä + O par",
      "piileskellä + N ine/ade"
    ],
    "examples": [
      "Mies piileskeli poliisia metsässä.",
      "Vankikarkuri piileskeli metsässä kaksi vuorokautta.",
      "Kissa piileskeli pihalla eikä tullut sisään.",
      "Mies oli metsässä piilossa poliisia.",
      "Kissa meni kaapin taakse koiraa piiloon."
    ]
  },
  {
    "search_term": "piilossa",
    "translation": "PIILOSSA (subst) PIILOON",
    "cases": [
      "piilossa + N par",
      "piilossa + N abi"
    ],
    "examples": [
      "Keksit ovat ylähyllyllä piilossa lapsilta.",
      "Panin karkit piiloon pojilta."
    ]
  },
  {
    "search_term": "piilottaa",
    "translation": "PIILOTTAA (verbi, transit) — прятать",
    "cases": [
      "piilottaa + N ill/all",
      "piilottaa + N abi"
    ],
    "examples": [
      "Piilotin rahat laatikkoon.",
      "Jaana piilotti avaimen ylähyllylle.",
      "Äiti piilotti joululahjat lapsilta.",
      "Vaimo yritti piilottaa olutpullot mieheltään."
    ]
  },
  {
    "search_term": "piiloutua",
    "translation": "PIILOUTUA (verbi, intransit) — прятаться, спрятаться",
    "cases": [
      "piiloutua + N ill/all",
      "piiloutua + N abi"
    ],
    "examples": [
      "Ryöstäjä piiloutui metsään.",
      "Kissa piiloutui laatikon pohjalle.",
      "Greta Garbo piiloutui julkisuudelta."
    ]
  },
  {
    "search_term": "piirtää",
    "translation": "PIIRTÄÄ (verbi, transit) — рисовать, нарисовать",
    "cases": [
      "piirtää + N ill/all"
    ],
    "examples": [
      "Hän piirsi sydämen kuvan hiekkaan.",
      "Väinö piirtää kuvia paperille."
    ]
  },
  {
    "search_term": "pila",
    "translation": "PILA (subst)",
    "cases": [
      "tehdä pilaa + N ela"
    ],
    "examples": [
      "Hän tekee minusta pilaa.",
      "Elokuva tekee pilaa poliitikoista."
    ]
  },
  {
    "search_term": "pilailla",
    "translation": "PILAILLA (verbi, intransit)",
    "cases": [
      "pilailla + N ela"
    ],
    "examples": [
      "Älä pilaile vakavista asioista!",
      "Hän pilailee aina kaikesta."
    ]
  },
  {
    "search_term": "pilkata",
    "translation": "PILKATA (verbi, transit)",
    "cases": [
      "pilkata + O par"
    ],
    "examples": [
      "Pojat pilkkasivat tyttöjä.",
      "Pilkkaatko sinä minua?",
      "Ohjelmassa pilkataan hallitusta."
    ]
  },
  {
    "search_term": "pilkka",
    "translation": "PILKKA (subst)",
    "cases": [
      "tehdä pilkkaa + N ela"
    ],
    "examples": [
      "Hän teki pilkkaa minusta.",
      "Ohjelma tekee pilkkaa poliitikoista."
    ]
  },
  {
    "search_term": "pilkkoa",
    "translation": "PILKKOA (verbi, transit)",
    "cases": [
      "pilkkoa + N tra",
      "pilkkoa + N iii"
    ],
    "examples": [
      "Pilko omenat ja kurkku pieniksi paloiksi!",
      "Pilkoin omenat ja kurkut salaattiin."
    ]
  },
  {
    "search_term": "pinota",
    "translation": "PINOTA (verbi, transit)",
    "cases": [
      "pinota + N ill/all"
    ],
    "examples": [
      "Pinoaisitko nuo lakanat kaappiin.",
      "Emma pinosi lautaset tiskipöydälle."
    ]
  },
  {
    "search_term": "piristyä",
    "translation": "PIRISTYÄ (verbi, intransit)",
    "cases": [
      "piristyä + N ela"
    ],
    "examples": [
      "Mari piristyi matkasta kovasti.",
      "Piristyin kahvista niin, etten saanut yöllä unta."
    ]
  },
  {
    "search_term": "piristää",
    "translation": "PIRISTÄÄ (verbi, transit)",
    "cases": [
      "piristää + O par"
    ],
    "examples": [
      "Matka piristi Maria kovasti.",
      "Kahvi piristää minua."
    ]
  },
  {
    "search_term": "pistäytyä",
    "translation": "PISTÄYTYÄ (verbi, intransit)",
    "cases": [
      "pistäytyä + N ine/ade",
      "pistäytyä + V -mAssA"
    ],
    "examples": [
      "Odota vähän, pistäydyn {= käyn) nopeasti kaupassa!",
      "Pistäytykää meillä jonakin päivänä!",
      "Pistäydyin työn jälkeen torilla ostamassa kalaa.",
      "Ampiainen pisti Jonnaa poskeen.",
      "Hyttynen pisti minua käsivarteen."
    ]
  },
  {
    "search_term": "pistaa",
    "translation": "PISTAA (verbi, transit)",
    "cases": [
      "pistää + N ill",
      "pistää + N ill/all"
    ],
    "examples": [
      "Pistän (= panen) tavarat kaappiin.",
      "Pistä kirjat hyllylle!"
    ]
  },
  {
    "search_term": "pituinen",
    "translation": "PITUINEN (adj) N",
    "cases": [
      "gen + pituinen"
    ],
    "examples": [
      "Artikkeli on noin viiden sivun pituinen.",
      "Pekka on saman pituinen kuin minä."
    ]
  },
  {
    "search_term": "pitää",
    "translation": "PITÄÄ (verbi, intransit)",
    "cases": [
      "pitää + N ela",
      "pitää + V -minen"
    ],
    "examples": [
      "Pidän (= tykkään) Liisasta.",
      "Pidin filmistä hyvin paljon.",
      "Huom! Mitä pidit (= mitä mieltä olit) filmistä?",
      "Pidätkö ruoan tekemisestä?",
      "En pidä television katselemisesta.",
      "En pidä hiihtämisestä.",
      "Liisa pitää Jussia mukavana miehenä (= Liisasta Jussi on mukava mies).",
      "Kaikki pitivät ehdotusta hyvänä."
    ]
  },
  {
    "search_term": "pitää",
    "translation": "PITÄÄ (verbi, transit)",
    "cases": [
      "pitää + O par + N ess",
      "N gen + pitää + V 1. inf",
      "pitää + V 1. inf"
    ],
    "examples": [
      "Minun pitää (= täytyy) nyt lähteä.",
      "Teidän pitäisi ostaa parempi sanakirja.",
      "Pitääkö käännöksen olla valmis jo huomenna?",
      "Minun piti juuri lähteä (= olin lähdössä) kun puhelin soi.",
      "Tämä harjoitus pitää tehdä huomiseksi.",
      "Ikkunat olisi pitänyt pestä jo viime viikolla."
    ]
  },
  {
    "search_term": "pohtia",
    "translation": "POHTIA (verbi, transit)",
    "cases": [
      "pohtia + O par"
    ],
    "examples": [
      "Pohdin asiaa kauan ennen kuin tein päätökseni.",
      "He pohtivat ongelmaa pari päivää."
    ]
  },
  {
    "search_term": "poiketa",
    "translation": "POIKETA (verbi, intransit)",
    "cases": [
      "poiketa + N ela/abl",
      "poiketa + N ine/ade",
      "poiketa + V -mAssA"
    ],
    "examples": [
      "Laiva poikkesi suunnasta ja ajoi karille.",
      "Lentokone joutui poikkeamaan reitiltään huonon sään vuoksi.",
      "Tästä määräyksestä voidaan poiketa vain erityistapauksessa.",
      "Poikkean (= pistäydyn, käyn) kaupassa kotimatkalla.",
      "Risteilijä poikkeaa monessa satamassa.",
      "Poiketkaa meillä kun tulette kaupunkiin!",
      "Poikkesin sairaalassa katsomassa isoäitiäni.",
      "Poikkesimme pubissa juomassa yhdet oluet."
    ]
  },
  {
    "search_term": "poikkeus",
    "translation": "POIKKEUS (subst)",
    "cases": [
      "poikkeus + N ela"
    ],
    "examples": [
      "Tämä on ainoa poikkeus säännöstä.",
      "Määräyksestä ei voida tehdä poikkeuksia."
    ]
  },
  {
    "search_term": "poistaa",
    "translation": "POISTAA (verbi, transit)",
    "cases": [
      "poistaa + N ela/abl"
    ],
    "examples": [
      "Mikä aine poistaa kahvitahran puserosta?",
      "Mies poistettiin ravintolasta.",
      "Poliisi poisti humalaisen paikalta."
    ]
  },
  {
    "search_term": "poistua",
    "translation": "POISTUA (verbi, intransit)",
    "cases": [
      "poistua + N ela/abl"
    ],
    "examples": [
      "Hän poistui huoneesta sanomatta sanaakaan.",
      "Juoksija poistui kentältä väsyneenä."
    ]
  },
  {
    "search_term": "pommittaa",
    "translation": "POMMITTAA (verbi, transit)",
    "cases": [
      "pommittaa + O par"
    ],
    "examples": [
      "Kaupunkia on pommitettu koko yö.",
      "Oppositio pommitti hallitusta syytöksillään."
    ]
  },
  {
    "search_term": "prosentti",
    "translation": "PROSENTTI (subst)",
    "cases": [
      "prosentti + N ela",
      "prosentti + N par"
    ],
    "examples": [
      "Vain viisi prosenttia (5 %) suomalaisista kannatti asiaa."
    ]
  },
  {
    "search_term": "protesti",
    "translation": "PROTESTI (subst)",
    "cases": [
      "protesti + N par + vastaan"
    ],
    "examples": [
      "Juustossa on noin 40 prosenttia rasvaa ja 3 prosenttia suolaa.",
      "Mielenosoitus oli protesti rasismia vastaan."
    ]
  },
  {
    "search_term": "protestoida",
    "translation": "PROTESTOIDA (verbi, transit)",
    "cases": [
      "protestoida + N par + vastaan"
    ],
    "examples": [
      "Mielenosoittajat protestoivat rasismia vastaan.",
      "Hän protestoi tuomarin päätöstä vastaan."
    ]
  },
  {
    "search_term": "pudota",
    "translation": "PUDOTA (verbi, intransit)",
    "cases": [
      "pudota + N ill/ail",
      "pudota + N ela/abl"
    ],
    "examples": [
      "Mies putosi veteen.",
      "Lasi putosi lattialle.",
      "Mies putosi veneestä.",
      "Lasi putosi pöydältä lattialle."
    ]
  },
  {
    "search_term": "pudottaa",
    "translation": "PUDOTTAA (verbi, transit)",
    "cases": [
      "pudottaa + N ill/all",
      "pudottaa + N ela/abl"
    ],
    "examples": [
      "Pudotin kirjeen postilaatikkoon.",
      "Hän pudotti lasin lattialle.",
      "Kalle pudotti avaimet kädestään eteisen pöydälle.",
      "Lapsi pudotti vahingossa lasin pöydältä lattialle."
    ]
  },
  {
    "search_term": "puhaltaa",
    "translation": "PUHALTAA (verbi, transit)",
    "cases": [
      "puhaltaa + N ill"
    ],
    "examples": [
      "Äiti puhalsi lapsen sormeen.",
      "Puhaltakaa tähän alkometriin, sanoi poliisi.",
      "Erotuomari puhalsi pilliin.",
      "Älä puhalla tupakansavua silmiini!"
    ]
  },
  {
    "search_term": "puhdistaa",
    "translation": "PUHDISTAA (verbi, transit)",
    "cases": [
      "puhdistaa + N ela"
    ],
    "examples": [
      "Puhdista kengät kurasta ulkona!",
      "Miten voin puhdistaa silkkipuseron kahvitahroista?",
      "Puhdistitko leivänpaahtimen leivänmuruista?"
    ]
  },
  {
    "search_term": "puhjeta",
    "translation": "PUHJETA (verbi, intransit)",
    "cases": [
      "puhjeta + N ill/all",
      "puhjeta + N ela"
    ],
    "examples": [
      "Lehdet puhkesivat puihin.",
      "Ihoon puhkesi näppylöitä.",
      "Lapselle puhkesi paha allergia.",
      "Autosta puhkesi rengas.",
      "Polkupyörästä puhkesi kumi."
    ]
  },
  {
    "search_term": "puhua",
    "translation": "PUHUA (verbi, transit)",
    "cases": [
      "puhua + O par",
      "puhua + N ela",
      "puhua + N ali"
    ],
    "examples": [
      "Te puhutte suomea oikein hyvin.",
      "Hän puhuu Turun murretta.",
      "Puhu aina totta!",
      "Mistä te puhutte?",
      "He puhuivat politiikasta koko illan.",
      "Me olemme jo puhuneet tästä asiasta.",
      "Puhuitko jo asiasta Liisalle?"
    ]
  },
  {
    "search_term": "pukeutua",
    "translation": "PUKEUTUA (verbi, intransit) — одеваться",
    "cases": [
      "pukeutua + N ill"
    ],
    "examples": [
      "Herrasmies pukeutuu pukuun. — Джентельмен одевается в костюм."
    ]
  },
  {
    "search_term": "pula",
    "translation": "PULA (subst)",
    "cases": [
      "pula + N ela"
    ],
    "examples": [
      "Nyt on pula kaikesta: asunnosta, rahasta ja ruoasta.",
      "Työpaikoista on kova pula.",
      "Myös: rahapula, asuntopula"
    ]
  },
  {
    "search_term": "punastua",
    "translation": "PUNASTUA (verbi, intransit)",
    "cases": [
      "punastua + N ela"
    ],
    "examples": [
      "Pikku-Maija punastui häpeästä.",
      "Sannan kasvot punastuivat harmista.Kirjoitatko tämän kirjeen minun puolestani?"
    ]
  },
  {
    "search_term": "puolet",
    "translation": "PUOLET (subst)",
    "cases": [
      "puolet + N ela",
      "puolet + N par"
    ],
    "examples": [
      "Noin puolet opiskelijoista tuli tenttiin.",
      "Puolet omaisuudesta kuuluu minulle.",
      "Drinkissä on puolet votkaa, puolet puolukkamehua."
    ]
  },
  {
    "search_term": "puoli",
    "translation": "PUOLI (subst) — половина",
    "cases": [
      "puoli + N par"
    ],
    "examples": [
      "Odotin bussia puoli tuntia.",
      "Heidi ja Heikki asuivat Lontoossa puoli vuotta.",
      "Huom! Kello on puoli viisi."
    ]
  },
  {
    "search_term": "puoltaa",
    "translation": "PUOLTAA (verbi, transit) puoltaa + O par",
    "cases": [],
    "examples": [
      "Puollan opiskelijan apuraha-anomusta.",
      "Käytännölliset syyt puolsivat ratkaisua."
    ]
  },
  {
    "search_term": "puolustaa",
    "translation": "PUOLUSTAA (verbi, transit)",
    "cases": [
      "puolustaa + O par",
      "puolustaa + N par + vastaan"
    ],
    "examples": [
      "Puolustakaa häntä!",
      "He puolustivat oikeuttaan saada lomaa.",
      "He puolustivat isänmaataan vihollista vastaan."
    ]
  },
  {
    "search_term": "puolustautua",
    "translation": "PUOLUSTAUTUA (verbi, intransit)",
    "cases": [
      "puolustautua + N par + vastaan"
    ],
    "examples": [
      "He puolustautuivat hyökkääjiä vastaan.",
      "Miten voin puolustautua tuollaista syytöstä vastaan?"
    ]
  },
  {
    "search_term": "puolustella",
    "translation": "PUOLUSTELLA (verbi, transit)",
    "cases": [
      "puolustella + O par",
      "puolustella + N ade"
    ],
    "examples": [
      "Yritätkö puolustella itseäsi?",
      "Antti puolusteli myöhästymistään työkiireillä.",
      "Et voi puolustella tekoasi tietämättömyydellä.",
      "Käärme puri Kallea."
    ]
  },
  {
    "search_term": "puute",
    "translation": "PUUTE (subst)",
    "cases": [
      "puute + N ela"
    ],
    "examples": [
      "Mihin koira puri, käteenkö?",
      "Koira puri Liisaa jalkaan.",
      "Maassa on kova puute ruoasta.",
      "Kaikesta oli suuri puute.",
      "Työpaikoista on puutetta."
    ]
  },
  {
    "search_term": "purra",
    "translation": "PURRA (verbi, transit)",
    "cases": [
      "purra + O par",
      "purra + N ill"
    ],
    "examples": [
      "Myös: ruoan puute, rahan puute, ajan puute"
    ]
  },
  {
    "search_term": "puuttua",
    "translation": "PUUTTUA (verbi, intransit)",
    "cases": [
      "puuttua + N ela/abl",
      "puuttua + N ill"
    ],
    "examples": [
      "Takista puuttuu nappi.",
      "Minulta puuttuu 7 markkaa.",
      "Pojalta puuttuu kokemusta.",
      "Hän puuttuu (= sekaantuu) aina joka asiaan.",
      "Älä puutu tähän, tämä ei kuulu sinulle!"
    ]
  },
  {
    "search_term": "pyrkimys",
    "translation": "PYRKIMYS (subst)",
    "cases": [
      "pyrkimys + N ill",
      "pyrkimys + V 1. inf"
    ],
    "examples": [
      "Hänellä on kova pyrkimys täydellisyyteen.",
      "Pyrkimys totuuteen on ihailtavaa.",
      "Kaikilla oli pyrkimys tehdä työ huolellisesti.",
      "Pyrkimykset vähentää työttömyyttä eivät ole vielä onnistuneet."
    ]
  },
  {
    "search_term": "pyrkiä",
    "translation": "PYRKIÄ (verbi, intransit)",
    "cases": [
      "pyrkiä + N ill/all",
      "pyrkiä + V -mAAn"
    ],
    "examples": [
      "Kaarina pyrkii yliopistoon ensi vuonna.",
      "Me pyrimme kurssille viime kesänä.",
      "Kaarina pyrkii opiskelemaan lääketiedettä.",
      "Pyrin tekemään (= yritän tehdä) työn mahdollisimman hyvin."
    ]
  },
  {
    "search_term": "pystyttää",
    "translation": "PYSTYTTÄÄ (verbi, transit)",
    "cases": [
      "pystyttää + N ill/all"
    ],
    "examples": [
      "Talo pystytettiin saareen.",
      "Me pystytimme teltan rannalle."
    ]
  },
  {
    "search_term": "pystyä",
    "translation": "PYSTYÄ (verbi, intransit) — быть способным (сделать), мочь",
    "cases": [
      "pystyä + V -mAAn",
      "pystyä + N ill"
    ],
    "examples": [
      "Pojat pystyivät suorittamaan tentin. — Мальчики смогли сдать экзамен.",
      "Pystytkö nostamaani tämän laatikon ylähyllylle?",
      "Pystytkö sanomaan, mitä korjaus maksaa?",
      "Minulla ei ole yhtään rahaa.",
      "En pysty maksamaan laskua.",
      "Hän ei pysty tähän työhön, hän on liian nuori.",
      "Siihen minä en pysty, minulla ei ole tarpeeksi kokemusta."
    ]
  },
  {
    "search_term": "pysyä",
    "translation": "PYSYÄ (verbi, intransit)",
    "cases": [
      "pysyä + N ine/ade",
      "pysyä + N ess"
    ],
    "examples": [
      "Älä mene mihinkään, pysy huoneessasi!",
      "Älä liiku, pysy paikallasi!",
      "Sää pysyi aurinkoisena koko loman.",
      "Hän pysyi terveenä elämänsä loppuun asti."
    ]
  },
  {
    "search_term": "pysähtyä",
    "translation": "PYSÄHTYÄ (verbi, intransit)",
    "cases": [
      "pysähtyä + N ine/ade",
      "pysähtyä + N ill/all",
      "pysähtyä + V -mAAn"
    ],
    "examples": [
      "Juna pysähtyy Lahdessa ja jatkaa sitten matkaansa.",
      "Pikajuna Helsingistä Tampereelle ei pysähdy Hyvinkäällä.",
      "Juna pysähtyi (= jäi) Helsinkiin.",
      "Juna pysähtyy Tampereelle.",
      "Pysähdyin kadulle juttelemaan naapurin kanssa.",
      "Bussi pysähtyi ottamaan lisää matkustajia."
    ]
  },
  {
    "search_term": "pysäköidä",
    "translation": "PYSÄKÖIDÄ (verbi, transit)",
    "cases": [
      "pysäköidä + N ill/all"
    ],
    "examples": [
      "Saako tähän paikkaan pysäköidä?",
      "Hän pysäköi autonsa takapihalle."
    ]
  },
  {
    "search_term": "pyytää",
    "translation": "PYYTÄÄ (verbi, transit)",
    "cases": [
      "pyytää + N ela/abl",
      "pyytää + N ill/all",
      "pyytää + O + N tra",
      "pyytää + O par + V -mAAn"
    ],
    "examples": [
      "Pyydä lomake toimistosta!",
      "Pyysin rahaa isältä.",
      "Hän pyysi (= kutsui) minut kotiinsa.",
      "Matti pyysi Leenan lounaalle.",
      "Pyydetään Leena lapsenvahdiksi!",
      "Pyysimme Matin erotuomariksi.",
      "Pyydän sinua lukemaan tämän tekstin.",
      "Pyytäkää Marttia auttamaan."
    ]
  },
  {
    "search_term": "pyörryttää",
    "translation": "PYÖRRYTTÄÄ (verbi, transit)",
    "cases": [
      "pyörryttää + O par"
    ],
    "examples": [
      "Avataan ikkuna, jos sinua pyörryttää.",
      "Minua pyörrytti."
    ]
  },
  {
    "search_term": "pyörtyä",
    "translation": "PYÖRTYÄ (verbi, intransit)",
    "cases": [
      "pyörtyä + N ela"
    ],
    "examples": [
      "Melkein pyörryin säikähdyksestä.",
      "Mies pyörtyi kivusta."
    ]
  },
  {
    "search_term": "pärjätä",
    "translation": "PÄRJÄTÄ (verbi, intransit)",
    "cases": [
      "pärjätä + N ine/ade"
    ],
    "examples": [
      "Anna pärjää (= menestyy) hyvin koulussa.",
      "Pojat pärjäsivät hyvin maailmalla.",
      "Hän pärjää (~ tulee toimeen) hyvin suomen kielellä.",
      "Englannilla pärjää kaikkialla.",
      "Kirjat ovat kaapin päällä."
    ]
  },
  {
    "search_term": "päästa",
    "translation": "PÄÄSTA (verbi, intransit)",
    "cases": [
      "päästä + N ill/all",
      "päästä + N ela/abl",
      "päästä + V -mAAn"
    ],
    "examples": [
      "Pääsitkö yliopistoon?",
      "Pääsimme suomen kurssille.",
      "Milloin pääset työstä kotiin?",
      "Pääsimme kurssilta klo 12.",
      "Kaarina pääsi opiskelemaan lääketiedettä.",
      "Pääsetkö tulemaan (= voitko tulla) huomenna?"
    ]
  },
  {
    "search_term": "päästää",
    "translation": "PÄÄSTÄÄ (verbi, transit)",
    "cases": [
      "päästää + N ill/all",
      "päästää + O + V -mAAn"
    ],
    "examples": [
      "Opettaja päästi meidät kotiin klo 12.",
      "Älä päästä kissaa pihalle!",
      "Päästin kissan pihalle juoksemaan.",
      "Äiti ei päästänyt lapsia ulos leikkimään."
    ]
  },
  {
    "search_term": "päätellä",
    "translation": "PÄÄTELLÄ (verbi, transit)",
    "cases": [
      "päätellä + N ela"
    ],
    "examples": [
      "Päättelin äänestä, että soittaja oli lapsi.",
      "Kalevin ilmeestä voi päätellä, että hän oli pettynyt.",
      "Päättelimme jäljistä, että pihalla oli ollut jänis."
    ]
  },
  {
    "search_term": "päättyä",
    "translation": "PÄÄTTYÄ (verbi, intransit)",
    "cases": [
      "päättyä + N ill"
    ],
    "examples": [
      "Sana ‘nainen’ päättyy konsonanttiin.",
      "Tie päättyy rantaan.",
      "Juhlat päättyivät yhteislauluun."
    ]
  },
  {
    "search_term": "päätyä",
    "translation": "PÄÄTYÄ (verbi, intransit) — прийти (к чему-либо)",
    "cases": [
      "päätyä + N ill"
    ],
    "examples": [
      "Mihin tulokseen olette päätyneet (= tulleet)?",
      "Neuvottelimme asiasta ja päädyimme tähän ratkaisuun."
    ]
  },
  {
    "search_term": "päättää",
    "translation": "PÄÄTTÄÄ (verbi, transit)",
    "cases": [
      "päättää + N ela",
      "päättää + V 1. inf"
    ],
    "examples": [
      "Päätimme asiasta viime kokouksessa.",
      "Budjetista päätetään elokuussa.",
      "Päätin alkaa opiskella ranskaa.",
      "Neuvotteluja päätettiin jatkaa."
    ]
  },
  {
    "search_term": "päätös",
    "translation": "PÄÄTÖS (subst)",
    "cases": [
      "päätös + N ela",
      "päätös + V 1. inf"
    ],
    "examples": [
      "Ryhmän päätös asiasta kerrottiin lehdistölle.",
      "Päätös sodan lopettamisesta on vihdoin tehty.",
      "Päätös antaa apuraha kaikille hakijoille oli mielestäni oikea."
    ]
  },
  {
    "search_term": "haastaa",
    "translation": "HAASTAA (verbi, transit)",
    "cases": [
      "haastaa + N ill"
    ],
    "examples": [
      "Haastan hänet oikeuteen.",
      "Oppilaat haastoivat opettajat jalkapallo-otteluun."
    ]
  },
  {
    "search_term": "haastatella",
    "translation": "HAASTATELLA (verbi, transit) — брать интервью, интервьюировать",
    "cases": [
      "haastatella + O par",
      "haastatella + N ela"
    ],
    "examples": [
      "Toimittaja haastatteli pääministeriä.",
      "Asiasta haastateltiin presidenttiä ja pääministeriä."
    ]
  },
  {
    "search_term": "haave",
    "translation": "HAAVE (subst) — мечта",
    "cases": [
      "haave + N ela",
      "haave + V 1. inf"
    ],
    "examples": [
      "Meillä on haave omasta kesämökistä.",
      "Haave lomamatkasta toteutui vihdoin.",
      "Sepolla oli haave matkustaa Timbuktuun.",
      "Minun haaveeni päästä opiskelemaan toteutui."
    ]
  },
  {
    "search_term": "haaveilla",
    "translation": "HAAVEILLA (verbi, transit) — мечтать",
    "cases": [
      "haaveilla + N ela",
      "haaveilla + V -minen",
      "haaveilla + eitä-lause"
    ],
    "examples": [
      "Perhe haaveilee kesämökin hankkimisesta. — Семья мечтает о приобретении летней дачи.",
      "Liisa haaveilee Pekasta.",
      "He haaveilevat, että he joskus pääsisivät Havaijille.",
      "Haaveilen, että minulla joskus olisi viisi lasta."
    ]
  },
  {
    "search_term": "haavoittaa",
    "translation": "HAAVOITTAA (verbi, transit)",
    "cases": [
      "haavoittaa + O par",
      "haavoittaa + N ill",
      "haavoittaa + O + V ine/ade"
    ],
    "examples": [
      "Paavon pahat sanat haavoittivat (= loukkasivat) minua.",
      "Puukko haavoitti häntä sormeen.",
      "Luoti haavoitti miestä jalkaan.",
      "Isoisä haavoitti jalkansa sodassa.",
      "Ammuskelija haavoitti ohikulkijaa asemalla."
    ]
  },
  {
    "search_term": "haavoittua",
    "translation": "HAAVOITTUA (verbi, intransit) — получить ранение, (досл.: раниться)",
    "cases": [
      "haavoittua + N ill",
      "haavoittua + N ela",
      "haavoittua + N ine/ade"
    ],
    "examples": [
      "Kapteeni haavoittui jalkaan.",
      "Hän haavoittui ampujan luodeista.",
      "Pekan isä haavoittui sodassa.",
      "Taistelussa haavoittui 10 ihmistä.",
      "Isoisäni haavoittui rintamalla."
    ]
  },
  {
    "search_term": "haista",
    "translation": "HAISTA (verbi, intransit)",
    "cases": [
      "haista + N abl/all"
    ],
    "examples": [
      "Tuo haisee pahalta.",
      "Miltä täällä haisee?"
    ]
  },
  {
    "search_term": "haitallinen",
    "translation": "HAITALLINEN (adj)",
    "cases": [
      "haitallinen + N ali"
    ],
    "examples": [
      "Vanha ruoka haisee pahalle.",
      "Sinä haiset tupakalle.",
      "Kuivuus on haitallista kasveille.",
      "Tupakanpoltto on haitallista terveydelle."
    ]
  },
  {
    "search_term": "haitata",
    "translation": "HAITATA (verbi, transit)",
    "cases": [
      "haitata + O par"
    ],
    "examples": [
      "Haittaako sinua, jos avaan ikkunan?",
      "Myrsky haittasi pelastustöitä.",
      "Onko tästä sinulle jotakin haittaa?",
      "Kielteisestä päätöksestä oli paljon haittaa.",
      "Siitä ratkaisusta on tuskin haittaa kenellekään.",
      "Onko tästä mitään haittaa teille?"
    ]
  },
  {
    "search_term": "haitta",
    "translation": "HAITTA (subst)",
    "cases": [
      "haitta + N ela",
      "haitta + N ali"
    ],
    "examples": [
      "Remontista syntyi paljon haittaa meille ja naapureille."
    ]
  },
  {
    "search_term": "hajota",
    "translation": "HAJOTA (verbi, intransit)",
    "cases": [
      "hajota + N tra"
    ],
    "examples": [
      "Maljakko hajosi sirpaleiksi."
    ]
  },
  {
    "search_term": "hajottaa",
    "translation": "HAJOTTAA (verbi, transit)",
    "cases": [
      "hajottaa + N ela/abl",
      "hajottaa + N tra/ill"
    ],
    "examples": [
      "Talosta oli hajotettu ikkunat.",
      "Myrsky hajotti katolta antennin.",
      "Lapsi hajotti {= rikkoi) maljakon palasiksi.",
      "Autonkorjaaja hajotti (= purki) moottorin moneen osaan."
    ]
  },
  {
    "search_term": "hajuinen",
    "translation": "HAJUINEN (adj)",
    "cases": [
      "N gen + hajuinen"
    ],
    "examples": [
      "Tämä sieni on kummallisen hajuinen.",
      "Veeran käsivoide on sitruunan hajuista.",
      "Ruoka oli epämiellyttävän hajuista."
    ]
  },
  {
    "search_term": "hakea",
    "translation": "HAKEA (verbi, transit)",
    "cases": [
      "hakea + O par",
      "hakea + N ela/abl",
      "hakea + N ill/all",
      "hakea + V -mAAn",
      "hakeutua + N ill/all"
    ],
    "examples": [
      "Haen Liisan syömään.",
      "Hain (= etsin) Liisaa joka paikasta.",
      "Olen jo hakenut (= anonut) uutta viisumia.",
      "Jatko-opiskelija haki apurahaa tutkimusta varten.",
      "Annemarie on hakenut Suomen kansalaisuutta.",
      "Hain (= noudin) paketin postista.",
      "Isä haki lapsen päiväkodista.",
      "Hae perunoita kellarista!",
      "Menen hakemaan mansikoita torilta.",
      "Haetko Helenan kotiin?",
      "Haen lapset teeile.",
      "Isä hakee vieraat meille saunaan.",
      "Haetaan Virtaset meille pelaamaan korttia!",
      "HAKEUTUA {verbi, intransit)",
      "Hän hakeutui hoitoon Auroran sairaalaan.",
      "Naiset hakeutuvat opetusalalle useammin kuin miehet."
    ]
  },
  {
    "search_term": "haksahtaa",
    "translation": "HAKSAHTAA (verbi, intransit)",
    "cases": [
      "haksahtaa + N ine",
      "haksahtaa + V -mAAn"
    ],
    "examples": [
      "Insinööri haksahti (= erehtyi) laskuissaan pahasti.",
      "Haksahdin ottamaan työn vastaan."
    ]
  },
  {
    "search_term": "halata",
    "translation": "HALATA (verbi, transit) — обнять",
    "cases": [
      "halata + O par"
    ],
    "examples": [
      "Lopuksi hän halasi minua.",
      "Pekka halasi Liisaa ja pyysi anteeksi."
    ]
  },
  {
    "search_term": "halkaista",
    "translation": "HALKAISTA (verbi, transit)",
    "cases": [
      "halkaista + N tra",
      "halkaista + N ill"
    ],
    "examples": [
      "Hän halkaisi melonin palasiksi.",
      "Halkaisin omenan kahteen osaan."
    ]
  },
  {
    "search_term": "halu",
    "translation": "HALU (subst)",
    "cases": [],
    "examples": [
      "halu -+ V 1. inf",
      "Minulla on kova halu ymmärtää kuinka tämä kone toimii.",
      "Heillä ei ollut mitään halua lähteä elokuviin."
    ]
  },
  {
    "search_term": "halukas",
    "translation": "HALUKAS (adj)",
    "cases": [
      "halukas + V -mAAn"
    ],
    "examples": [
      "Heikki on halukas lähtemään mukaan."
    ]
  },
  {
    "search_term": "haluta",
    "translation": "HALUTA (verbi, transit)",
    "cases": [
      "haluta + V 1. inf"
    ],
    "examples": [
      "Minä haluan oppia suomea.",
      "He eivät halunneet matkustaa lentokoneella.",
      "Hän halusi, että minä lähden mukaan.",
      "Haluatteko, että suljen ikkunan?",
      "En halunnut, että asiasta puhuttaisiin."
    ]
  },
  {
    "search_term": "haluton",
    "translation": "HALUTON (adj)",
    "cases": [
      "haluton + V -mAAn",
      "haluta + että-lause"
    ],
    "examples": [
      "Hän on haluton menemään lääkäriin.",
      "He olivat haluttomia auttamaan meitä."
    ]
  },
  {
    "search_term": "haluttaa",
    "translation": "HALUTTAA (verbi, transit) — хотеться",
    "cases": [
      "haluttaa + O par",
      "haluttaa + V 1. inf"
    ],
    "examples": [
      "Haluttaako sinua lähteä elokuviin illalla?",
      "Minua ei haluta mikään tänään.",
      "Minua haluttaisi syödä pitsaa tänään."
    ]
  },
  {
    "search_term": "halveksia",
    "translation": "HALVEKSIA (verbi, transit)",
    "cases": [
      "halveksia + O par"
    ],
    "examples": [
      "Miksi häntä halveksitaan?",
      "Sinä taidat halveksia minua."
    ]
  },
  {
    "search_term": "harjoitella",
    "translation": "HARJOITELLA (verbi, transit)",
    "cases": [
      "harjoitetta + O par",
      "harjoitella + V -mAAn"
    ],
    "examples": [
      "Olen harjoitellut sitä monta vuotta.",
      "Heli Rantanen harjoitteli keihään heittämistä koko kesän.",
      "Lapsi harjoittelee jo kävelemään.",
      "Anne on autokoulussa ja harjoittelee ajamaan autoa."
    ]
  },
  {
    "search_term": "hankala",
    "translation": "HANKALA (adj)",
    "cases": [
      "hankala + V 1. inf"
    ],
    "examples": [
      "Tätä on hankala tehdä.",
      "On hankala syödä spagettia siististi."
    ]
  },
  {
    "search_term": "harkita",
    "translation": "HARKITA (verbi, transit)",
    "cases": [
      "harkita + O par"
    ],
    "examples": [
      "Harkitsen asiaa."
    ]
  },
  {
    "search_term": "harmissa",
    "translation": "HARMISSA(AN) (subst)",
    "cases": [
      "harmissa(an) + N ela"
    ],
    "examples": [
      "Hän on harmissaan siitä asiasta.",
      "Olen kovasti harmissani tästä erehdyksestä."
    ]
  },
  {
    "search_term": "harmittaa",
    "translation": "HARMITTAA (verbi, transit)",
    "cases": [
      "harmittaa + O par"
    ],
    "examples": [
      "Minua harmittaa.",
      "Asia harmittaa häntä vieläkin."
    ]
  },
  {
    "search_term": "harrastaa",
    "translation": "HARRASTAA (verbi, transit)",
    "cases": [
      "harrastaa + O par",
      "harrastaa + V -minen"
    ],
    "examples": [
      "Hän harrastaa jalkapalloa.",
      "Harrastan runojen lukemista ja kirjoittamista."
    ]
  },
  {
    "search_term": "haudata",
    "translation": "HAUDATA (verbi, transit)",
    "cases": [
      "haudata + N ill/all"
    ],
    "examples": [
      "Mihin hänet on haudattu?",
      "Hänet haudattiin lopulta Suomeen.",
      "Isoäitini on haudattu Malmin hautausmaalle."
    ]
  },
  {
    "search_term": "haukkua",
    "translation": "HAUKKUA (verbi, transit) — облаять, ругать, отругать",
    "cases": [
      "haukkua + O par",
      "haukkua + N tra"
    ],
    "examples": [
      "Koira haukkuu postinkantajaa.",
      "Hän haukkui minua laiskaksi."
    ]
  },
  {
    "search_term": "hautautua",
    "translation": "HAUTAUTUA (HAUTAANTUA) (verbi, intransit)",
    "cases": [
      "hautautua + N ill/all"
    ],
    "examples": [
      "Laskettelija hautautui lumeen.",
      "Aurinkovoide hautautui hiekkaan.",
      "Kirje hautautui (= unohtui) laatikkoon pitkiksi ajoiksi.",
      "Todistus oli hautautunut pöydälle paperien alle."
    ]
  },
  {
    "search_term": "havahtua",
    "translation": "HAVAHTUA (verbi, intransit)",
    "cases": [
      "havahtua + N ela",
      "havahtua + N ill"
    ],
    "examples": [
      "Havahduin ajatuksistani, kun puhelin soi.",
      "Koira havahtuu oudoista äänistä.",
      "Havahduin siihen, että joku tuli huoneeseen."
    ]
  },
  {
    "search_term": "havitella",
    "translation": "HAVITELLA (verbi, transit)",
    "cases": [
      "havitella + O par"
    ],
    "examples": [
      "Hän havittelee uutta virkaa.",
      "Havittelemme kesämökkiä ensi kesäksi."
    ]
  },
  {
    "search_term": "heijastaa",
    "translation": "HEIJASTAA (verbi, transit)",
    "cases": [
      "heijastaa + N ill/all"
    ],
    "examples": [
      "Kuu heijasti valoa huoneeseen.",
      "Projektori heijastaa kuvan seinälle."
    ]
  },
  {
    "search_term": "heijastua",
    "translation": "HEIJASTUA (verbi, intransit)",
    "cases": [
      "heijastua + N ill/all",
      "heijastua + N ela/abl"
    ],
    "examples": [
      "Valo heijastuu ikkunaan.",
      "Kuva heijastuu seinälle.",
      "Vedestä heijastui hänen oma kuvansa.",
      "Ikkunasta heijastui valoa.",
      "Tytön kasvoilta heijastui ilo."
    ]
  },
  {
    "search_term": "heiluttaa",
    "translation": "HEILUTTAA (verbi, transit)",
    "cases": [
      "heiluttaa + O par"
    ],
    "examples": [
      "Tuuti heiluttaa puuta.",
      "Asemamies heilutti lippua.",
      "Lapsi heilutti kättä (= vilkutti) minulle."
    ]
  },
  {
    "search_term": "helliä",
    "translation": "HELLIÄ (verbi, transit)",
    "cases": [
      "helliä + O par"
    ],
    "examples": [
      "Ville hellii kissaa sylissään.",
      "Vanhemmat ovat aina hellineet tätä lasta."
    ]
  },
  {
    "search_term": "helpottaa",
    "translation": "HELPOTTAA (verbi, transit)",
    "cases": [
      "helpottaa + O par",
      "helpottaa + V -mAAn"
    ],
    "examples": [
      "Hyvä sanakirja helpottaa käännöstyötä paljon.",
      "Tämä lääke helpottaa kipua. Tuo helpotti asian ymmärtämistä.",
      "Piirros helpottaa ymmärtämään asiaa."
    ]
  },
  {
    "search_term": "helppo",
    "translation": "HELPPO (adj)",
    "cases": [
      "helppo + V 1, inf"
    ],
    "examples": [
      "Minun on helppo ymmärtää suomea.",
      "Tämä tehtävä on helppo suorittaa.",
      "Helppo sinun on hymyillä?"
    ]
  },
  {
    "search_term": "hemmotella",
    "translation": "HEMMOTELLA (verbi, transit)",
    "cases": [
      "hemmotella + O par"
    ],
    "examples": [
      "Kummitäti hemmottelee poikaa suklaalla ja lahjoilla."
    ]
  },
  {
    "search_term": "herkkä",
    "translation": "HERKKÄ (adj)",
    "cases": [
      "herkkä + V -mAAn"
    ],
    "examples": [
      "Häntä hemmotellaan kotona ja koulussa.",
      "Olen herkkä itkemään elokuvissa."
    ]
  },
  {
    "search_term": "hermostua",
    "translation": "HERMOSTUA (verbi, intransit)",
    "cases": [
      "hermostua + N ela",
      "hermostua + N ill"
    ],
    "examples": [
      "Mistä sinä hermostuit?"
    ]
  },
  {
    "search_term": "hermostunut",
    "translation": "HERMOSTUNUT (adj)",
    "cases": [
      "hermostunut + N ela",
      "hermostunut + N ill"
    ],
    "examples": [
      "Hän hermostui tästä asiasta kovasti.",
      "Hän hermostui lapseen, joka kyseli koko ajan.",
      "Olen kamalan hermostunut tentistä.",
      "Olemme kovin hermostuneita häneen."
    ]
  },
  {
    "search_term": "hermostuttaa",
    "translation": "HERMOSTUTTAA (verbi, transit)",
    "cases": [
      "hermostuttaa + O par",
      "hermostuttaa + V 1. inf"
    ],
    "examples": [
      "Sinä hermostutat minua.",
      "Häntä hermostuttaa se, että lapsi kyselee koko ajan.",
      "Hermostuttaako sinua mennä tapaamaan häntä?",
      "Minua hermostutti kuunnella häntä aamusta iltaan."
    ]
  },
  {
    "search_term": "herättää",
    "translation": "HERÄTTÄÄ (verbi, transit)",
    "cases": [
      "herättää + N ill/all",
      "herättää + V -mAAn"
    ],
    "examples": [
      "Herätä minut ajoissa kouluun!",
      "Herätämme sinut kurssille aamulla.",
      "Herätä minut syömään parin tunnin kuluttua."
    ]
  },
  {
    "search_term": "herätä",
    "translation": "HERÄTÄ (verbi, intransit)",
    "cases": [
      "herätä + N ill",
      "herätä + V -mAAn"
    ],
    "examples": [
      "Heräsin kellonsoittoon.",
      "Heräsin liian myöhään huomaamaan, että olin ollut väärässä."
    ]
  },
  {
    "search_term": "hidas",
    "translation": "HIDAS (adj)",
    "cases": [
      "hidas + V -mAAn"
    ],
    "examples": [
      "Olen hidas juoksemaan.",
      "Paavo on hidas puhumaan."
    ]
  },
  {
    "search_term": "hidastaa",
    "translation": "HIDASTAA (verbi, transit)",
    "cases": [
      "hidastaa + O par"
    ],
    "examples": [
      "Auto hidastaa vauhtia risteyksessä.",
      "Talouskriisi hidasti maan kehitystä.",
      "Hän on hidastanut tahtia viime aikoina."
    ]
  },
  {
    "search_term": "hikoilla",
    "translation": "HIKOILLA (verbi, intransit)",
    "cases": [
      "hikoilla + N ela",
      "hiljaa + N ela"
    ],
    "examples": [
      "Hän hikoilee jännityksestä aina ennen esitystä.",
      "Hikoilen eniten kainaloista.",
      "HILJAA (adv)",
      "Ole hiljaa {= älä puhu) tästä asiasta!"
    ]
  },
  {
    "search_term": "himoita",
    "translation": "HIMOITA (verbi, transit)",
    "cases": [
      "himoita + O par",
      "himoita + V 1. inf"
    ],
    "examples": [
      "Hän himoitsee kaikkea: rahaa, rakkautta ja naapurin autoa.",
      "Hän himoitsee päästä matkalle."
    ]
  },
  {
    "search_term": "himottaa",
    "translation": "HIMOTTAA (verbi, transit)",
    "cases": [
      "himottaa + O par"
    ],
    "examples": [
      "Minua himottaa syödä valkosipulia.",
      "Häntä himottaa tupakoida hyvän päivällisen jälkeen."
    ]
  },
  {
    "search_term": "hinta",
    "translation": "HINTA (subst)",
    "cases": [
      "hinta + N ela"
    ],
    "examples": []
  },
  {
    "search_term": "hintainen",
    "translation": "HINTAINEN (adj)",
    "cases": [
      "N gen + hintainen"
    ],
    "examples": [
      "Se on sopiva hinta vanhasta autosta.",
      "Minkä hintainen tuo kirja on?",
      "Se on saman hintainen kuin tämä."
    ]
  },
  {
    "search_term": "hipaista",
    "translation": "HIPAISTA (verbi, transit)",
    "cases": [
      "hipaista + O par"
    ],
    "examples": [
      "Hipaisin keittolevyä ja poltin sormeni.",
      "Bussi hipaisi minua kadunkulmassa."
    ]
  },
  {
    "search_term": "hirvittää",
    "translation": "HIRVITTÄÄ (verbi, transit)",
    "cases": [
      "hirvittää + O par",
      "hirvittää + V 1. inf"
    ],
    "examples": [
      "Opiskelijaa hirvitti seuraavan viikon tentti.",
      "Minua hirvittää lähteä ulos tuollaisella ilmalla.",
      "Hän hokee samaa asiaa aamusta iltaan."
    ]
  },
  {
    "search_term": "horjuttaa",
    "translation": "HORJUTTAA (verbi, transit)",
    "cases": [
      "horjuttaa + O par"
    ],
    "examples": [
      "Myrsky horjuttaa tornia."
    ]
  },
  {
    "search_term": "hokea",
    "translation": "HOKEA (verbi, transit)",
    "cases": [
      "hokea + O par"
    ],
    "examples": [
      "Järjestelyt työpaikalla horjuttavat johtaja Kosken asemaa."
    ]
  },
  {
    "search_term": "houkutella",
    "translation": "HOUKUTELLA (verbi, transit)",
    "cases": [
      "houkutella + N ill/all",
      "houkutella + O + V -maan"
    ],
    "examples": [
      "Hän houkutteli minut elokuviin.",
      "Mies houkutteli koiran pihalle. Houkuttelin hänet oluelle kanssani.",
      "Kalle houkutteli minut lähtemään ulos. Äiti yritti houkutella lasta syömään."
    ]
  },
  {
    "search_term": "houkutus",
    "translation": "HOUKUTUS (subst)",
    "cases": [
      "houkutus + V 1. inf"
    ],
    "examples": [
      "Houkutus lähteä ulkomaille on suuri."
    ]
  },
  {
    "search_term": "huijata",
    "translation": "HUIJATA (verbi, transit)",
    "cases": [
      "huijata + O par",
      "huijata + N ine",
      "huijata + V -mAAn"
    ],
    "examples": [
      "Hän huijasi minua autokaupassa.",
      "Pekka huijaa aina meitä.",
      "Yritin vain huijata sinua.",
      "Minua huijattiin siinä asiassa.",
      "Myyjä huijasi Liisaa maksamaan liikaa."
    ]
  },
  {
    "search_term": "huimata",
    "translation": "HUIMATA (verbi, transit)",
    "cases": [
      "huimata + O par"
    ],
    "examples": [
      "Minua huimaa korkeilla paikoilla.",
      "Pelkkä ajatus huimasi häntä."
    ]
  },
  {
    "search_term": "huiputtaa",
    "translation": "HUIPUTTAA (verbi, transit)",
    "cases": [
      "huiputtaa + O par",
      "huiputtaa + N ine",
      "huiputtaa + O + V -maan"
    ],
    "examples": [
      "He yrittivät huiputtaa minua.",
      "Meitä huiputettiin taas kerran.",
      "Häntä huiputettiin liikeasioissa.",
      "Sakari huiputti minut maksamaan autosta aivan liikaa.",
      "Hän yritti huiputtaa minua lainaamaan pankkikorttini hänelle."
    ]
  },
  {
    "search_term": "hukata",
    "translation": "HUKATA (verbi, transit)",
    "cases": [
      "hukata + N ill/all"
    ],
    "examples": [
      "Mihin olet hukannut avaimen?",
      "Hukkasin sen metsään tai pihalle."
    ]
  },
  {
    "search_term": "hukkua",
    "translation": "HUKKUA (verbi, intransit)",
    "cases": [
      "hukkua + N ill"
    ],
    "examples": [
      "Mies hukkui myrskyssä mereen.",
      "En tiedä, mihin lompakko hukkui (= katosi)."
    ]
  },
  {
    "search_term": "huokaista",
    "translation": "HUOKAISTA (verbi, intransit)",
    "cases": [
      "huokaista + N ela"
    ],
    "examples": [
      "Minä huokaisin onnesta.",
      "Voit huokaista helpotuksesta."
    ]
  },
  {
    "search_term": "huolehtia",
    "translation": "HUOLEHTIA (verbi, intransit)",
    "cases": [
      "huolehtia + N ela",
      "huolehtia + V -minen"
    ],
    "examples": [
      "Me huolehdimme hänestä hyvin.",
      "Voitko huolehtia tästä asiasta?",
      "Sihteeri huolehti kirjeiden lähettämisestä.",
      "Kuka huolehtii tarjoilemisesta?"
    ]
  },
  {
    "search_term": "huolestua",
    "translation": "HUOLESTUA (verbi, intransit)",
    "cases": [
      "huolestua + N ela"
    ],
    "examples": [
      "Te huolestutte aina joka asiasta."
    ]
  },
  {
    "search_term": "huolellinen",
    "translation": "HUOLELLINEN (adj)",
    "cases": [
      "huolellinen + N ine",
      "huolellinen + N ela"
    ],
    "examples": [
      "Hän on huolellinen työssään.",
      "Erkki on huolellinen rahoistaan."
    ]
  },
  {
    "search_term": "huolestunut",
    "translation": "HUOLESTUNUT (adj)",
    "cases": [
      "huolestunut + N ela"
    ],
    "examples": [
      "Olen huolestunut sinusta.",
      "Me olemme huolestuneita Pekasta.",
      "Kaikki olivat hyvin huolestuneita meistä."
    ]
  },
  {
    "search_term": "huolestuttaa",
    "translation": "HUOLESTUTTAA (verbi, transit)",
    "cases": [
      "huolestuttaa + O par",
      "huolestuttaa + V 1. inf"
    ],
    "examples": [
      "Jokin asia huolestuttaa häntä.",
      "Mikä sinua huolestuttaa?",
      "Häntä huolestutti lähteä sairaalaan.",
      "Minua huolestuttaa nähdä, kuinka luonto pilaantuu."
    ]
  },
  {
    "search_term": "huoli",
    "translation": "HUOLI (subst)",
    "cases": [
      "huoli + N ela"
    ],
    "examples": [
      "Meillä on suuri huoli Jussin perheestä.",
      "Hänellä ei ole huolta huomisesta."
    ]
  },
  {
    "search_term": "huolimaton",
    "translation": "HUOLIMATON (adj)",
    "cases": [
      "huolimaton + N ine"
    ],
    "examples": [
      "Tässä tehtävässä ei saa olla huolimaton."
    ]
  },
  {
    "search_term": "huolissa",
    "translation": "HUOLISSA(AN) (subst)",
    "cases": [
      "huolissa(an) + N ela",
      "huolissa(an) + N gen + vuoksi / takia"
    ],
    "examples": [
      "Me olemme huolissamme Seijasta.",
      "He ovat huolissaan lapsen vuoksi / takia.",
      "Älkää olko huolissanne minun vuokseni!"
    ]
  },
  {
    "search_term": "huomata",
    "translation": "HUOMATA (verbi, transit)",
    "cases": [
      "huomata + N ine/ade",
      "huomata + V 1. inf",
      "huomata + että-lause"
    ],
    "examples": [
      "Huomasin hänet puistossa. Huomasitko koiranpennun ikkunassa?",
      "Huomasimme pysäkillä uuden aikataulun.",
      "Huomasitko ostaa maitoa? Huomasin olla hiljaa.",
      "Huomaan, että te olette ymmärtäneet asian.",
      "Huomasitko, että hän oli tullut?",
      "Emme huomanneet, että ulkona oli alkanut sataa."
    ]
  },
  {
    "search_term": "huomauttaa",
    "translation": "HUOMAUTTAA (verbi, intransit)",
    "cases": [
      "huomauttaa + N ali",
      "huomauttaa + N ela"
    ],
    "examples": [
      "Opettaja huomautti asiasta monta kertaa.",
      "Hän huomautti minulle siitä eilen."
    ]
  },
  {
    "search_term": "huomautus",
    "translation": "HUOMAUTUS (subst)",
    "cases": [
      "huomautus + N ela"
    ],
    "examples": [
      "Hän sai huomautuksen asiasta."
    ]
  },
  {
    "search_term": "huono",
    "translation": "HUONO (adj)",
    "cases": [
      "huono + V -mAAn"
    ],
    "examples": [
      "Olen huono laulamaan."
    ]
  },
  {
    "search_term": "huonontaa",
    "translation": "HUONONTAA (verbi, transit)",
    "cases": [
      "huonontaa + O par"
    ],
    "examples": [
      "Pankki on viime aikoina huonontanut palvelua."
    ]
  },
  {
    "search_term": "huvittaa",
    "translation": "HUVITTAA (verbi, transit)",
    "cases": [
      "huvittaa + O par",
      "huvittaa + V 1. inf"
    ],
    "examples": [
      "Elokuva huvitti meitä. Peterin jutut huvittivat heitä.",
      "Huvittaisiko sinua lähteä teatteriin?"
    ]
  },
  {
    "search_term": "huvittunut",
    "translation": "HUVITTUNUT (adj)",
    "cases": [
      "huvittunut + N ela"
    ],
    "examples": [
      "Olin kovasti huvittunut Kallen jutuista."
    ]
  },
  {
    "search_term": "hylätä",
    "translation": "HYLÄTÄ (verbi, transit)",
    "cases": [
      "hylätä + N ine"
    ],
    "examples": []
  },
  {
    "search_term": "hymyillä",
    "translation": "HYMYILLÄ (verbi, intransit)",
    "cases": [
      "hymyillä + N ali"
    ],
    "examples": [
      "Tarjoilija hymyili Liisalle.",
      "Opiskelija hylättiin tentissä.",
      "Hän hymyili koko jutulle.Uolevi on hyvä urheilussa."
    ]
  },
  {
    "search_term": "hyvä",
    "translation": "HYVÄ (adj)",
    "cases": [
      "hyvä + N ine",
      "hyvä + V -mAAn"
    ],
    "examples": [
      "Matti ja Maija ovat hyviä matematiikassa.",
      "Jani on hyvä uimaan.",
      "Hän on hyvä kertomaan vitsejä."
    ]
  },
  {
    "search_term": "hyväillä",
    "translation": "HYVÄILLÄ (verbi, transit)",
    "cases": [
      "hyväillä + O par"
    ],
    "examples": [
      "Anna minun hyväillä sinua!",
      "Hän hyväili koiranpentua sylissään."
    ]
  },
  {
    "search_term": "hyväksyä",
    "translation": "HYVÄKSYÄ (verbi, transit)",
    "cases": [
      "hyväksyä + O + N tra",
      "hyväksyä + N ill/all"
    ],
    "examples": [
      "Hyväksyimme Eevan puheenjohtajaksi.",
      "Teologinen tiedekunta hyväksyi hänet opiskelijaksi.",
      "Juan on hyväksytty Jyväskylän yliopistoon.",
      "Minut hyväksyttiin kurssille."
    ]
  },
  {
    "search_term": "hyökkäys",
    "translation": "HYÖKKÄYS (subst)",
    "cases": [
      "hyökkäys + N ill/all",
      "hyökkäys + N par + vastaan"
    ],
    "examples": []
  },
  {
    "search_term": "hyökätä",
    "translation": "HYÖKÄTÄ (verbi, intransit)",
    "cases": [
      "hyökätä + N ill/all",
      "hyökätä + N par + vastaan"
    ],
    "examples": [
      "He hyökkäävät pian maahan.",
      "Koira hyökkäsi pihalle kovaa vauhtia.",
      "Poliisit hyökkäsivät taloon sisälle.",
      "Huom! Kauppias hyökkäsi varkaan kimppuun.",
      "Kaikki hyökkäsivät häntä vastaan kokouksessa."
    ]
  },
  {
    "search_term": "hyöty",
    "translation": "HYÖTY (subst)",
    "cases": [
      "hyöty + N ela",
      "hyöty + N ali"
    ],
    "examples": [
      "Vihollisen hyökkäys maahan epäonnistui.",
      "Hyökkäys Venäjälle alkoi odottamatta.",
      "Tuo oli selvästi hyökkäys minua vastaan.",
      "Mitä hyötyä tästä on?",
      "Hänestä ei ole mitään hyötyä.",
      "Hyöty uudistuksesta ei ole suuri.",
      "Mitä hyötyä siitä on minulle?",
      "Työkokemuksesta oli paljon hyötyä hänelle.",
      "Tästä ei ole kenellekään mitään hyötyä."
    ]
  },
  {
    "search_term": "hyötyä",
    "translation": "HYÖTYÄ (verbi, transit)",
    "cases": [
      "hyötyä + N ela"
    ],
    "examples": [
      "Mitä he hyötyvät siitä kaupasta?",
      "Tästä hyötyy koko maa."
    ]
  },
  {
    "search_term": "häipyä",
    "translation": "HÄIPYÄ (verbi, intransit)",
    "cases": [
      "häipyä + N ill/all",
      "häipyä + N ela/abl"
    ],
    "examples": [
      "Mihin hän nyt häipyi?",
      "Mies häipyi metsään.",
      "Hän häipyi ulkomaille.",
      "Hän häipyi tästä talosta jonnekin.",
      "Myyjät ovat jo häipyneet torilta."
    ]
  },
  {
    "search_term": "häiriintyä",
    "translation": "HÄIRIINTYÄ (HÄIRIYTYÄ) (verbi, intransit)",
    "cases": [
      "häiriintyä + N ela"
    ],
    "examples": [
      "Mummo häiriintyy naapurin melusta."
    ]
  },
  {
    "search_term": "häiritä",
    "translation": "HÄIRITÄ (verbi, transit)",
    "cases": [
      "häiritä + O par"
    ],
    "examples": [
      "Hän häiritsi minua koko ajan.",
      "Anteeksi, jos häiritsen teitä."
    ]
  },
  {
    "search_term": "hämmästellä",
    "translation": "HÄMMÄSTELLÄ (verbi, transit)",
    "cases": [
      "hämmästellä + O par"
    ],
    "examples": [
      "Hän hämmästeli (= ihmetteli) bensiinin hintaa."
    ]
  },
  {
    "search_term": "hämmästynyt",
    "translation": "HÄMMÄSTYNYT (adj)",
    "cases": [
      "hämmästynyt + N ela"
    ],
    "examples": [
      "Hän oli hyvin hämmästynyt Janin voitosta."
    ]
  },
  {
    "search_term": "hämmästyttää",
    "translation": "HÄMMÄSTYTTÄÄ (verbi, transit)",
    "cases": [
      "hämmästyttää + O par"
    ],
    "examples": [
      "Ullaa hämmästytti Villen käytös.",
      "Minua hämmästyttää se, että sinä olet niin epärealistinen."
    ]
  },
  {
    "search_term": "hämmästyä",
    "translation": "HÄMMÄSTYÄ (verbi, intransit)",
    "cases": [
      "hämmästyä + N ela"
    ],
    "examples": [
      "Minä hämmästyin asiasta aika paljon."
    ]
  },
  {
    "search_term": "härnätä",
    "translation": "HÄRNÄTÄ (verbi, transit)",
    "cases": [
      "härnätä + O par"
    ],
    "examples": [
      "Lapset härnäävät naapurin koiraa.",
      "Minä vain härnäsin sinua."
    ]
  },
  {
    "search_term": "hätkähdyttää",
    "translation": "HÄTKÄHDYTTÄÄ (verbi, transit)",
    "cases": [
      "hätkähdyttää + O par"
    ],
    "examples": [
      "Uutinen hätkähdytti minua."
    ]
  },
  {
    "search_term": "hätkähtää",
    "translation": "HÄTKÄHTÄÄ (verbi, transit)",
    "cases": [
      "hätkähtää + O par"
    ],
    "examples": [
      "Hän hätkähti varjoa pimeässä.",
      "Hätkähdin niin suoraa kysymystä."
    ]
  },
  {
    "search_term": "hävettää",
    "translation": "HÄVETTÄÄ (verbi, transit)",
    "cases": [
      "hävettää + O par",
      "hävettää + V 1. inf",
      "hävettää + että-lause"
    ],
    "examples": [
      "Hänen huono käytöksensä hävetti minua.",
      "Minua hävettää mennä pyytämään anteeksi.",
      "Opiskelijaa hävetti tulla myöhään kurssille.",
      "Meitä hävettää, että valehtelimme hänelle.",
      "Hävettääkö sinua, että olit niin epäkohtelias?"
    ]
  },
  {
    "search_term": "hävetä",
    "translation": "HÄVETÄ (verbi, transit)",
    "cases": [
      "hävetä + O par",
      "hävetä + V 1. inf"
    ],
    "examples": [
      "Häpeän isoa nenääni.",
      "Häpeän sitä.",
      "Häpesin mennä sinne uudelleen."
    ]
  },
  {
    "search_term": "hävita",
    "translation": "HÄVITA (verbi, transit)",
    "cases": [
      "hävitä + N ine",
      "hävitä + N ali"
    ],
    "examples": [
      "Hän hävisi pelissä 5 pistettä.",
      "Maailmansodassa hävittiin enemmän kuin voitettiin.",
      "Suomen joukkue hävisi ottelussa Ruotsille 3-5."
    ]
  },
  {
    "search_term": "hävitä",
    "translation": "HÄVITÄ (verbi, intransit)",
    "cases": [
      "hävitä + N ill/all",
      "hävitä + N ela/abl"
    ],
    "examples": [
      "Paperi on hävinnyt (= kadonnut) johonkin.",
      "Varas hävisi (= häipyi, katosi) metsään. Ilmapallo hävisi taivaalle.",
      "Lompakosta oli hävinnyt (= kadonnut) sata euroa.",
      "Minulta hävisi kynä jonnekin."
    ]
  },
  {
    "search_term": "vaara",
    "translation": "VAARA (subst)",
    "cases": [
      "vaara + N all"
    ],
    "examples": []
  },
  {
    "search_term": "vaarallinen",
    "translation": "VAARALLINEN (adj)",
    "cases": [
      "vaarallinen + N all"
    ],
    "examples": [
      "Ydinaseet ovat suuri vaara koko ihmiskunnalle.",
      "Ilmansaasteet ovat vaaraksi luonnolle.",
      "Tupakointi on vaarallista terveydelle.",
      "Ampiaisenpisto voi olla hengenvaarallinen allergiselle ihmiselle."
    ]
  },
  {
    "search_term": "vaatia",
    "translation": "VAATIA (verbi, transit)",
    "cases": [
      "vaatia + N abi",
      "vaatia + V 1. inf",
      "vaatia + O par + V -mAAn"
    ],
    "examples": [
      "Opettaja vaatii oppilailta liian paljon.",
      "Suomen hallitukselta vaadittiin selvitys asiasta.",
      "Vaadin saada tietää, miten asia on.",
      "Opettaja vaati minua tekemään harjoituksen uudestaan."
    ]
  },
  {
    "search_term": "vaatimus",
    "translation": "VAATIMUS (subst)",
    "cases": [
      "vaatimus + N ela",
      "vaatimus + V 1. inf"
    ],
    "examples": [
      "Vaatimus lyhyemmästä työviikosta oli aiheellinen.",
      "Vaatimukset palkkojen korottamisesta tuntuivat kohtuullisilta.",
      "Miehen vaatimus saada palkankorotus oli ymmärrettävä.",
      "Myös: palkkavaatimus, pääsyvaatimus"
    ]
  },
  {
    "search_term": "vahingoittaa",
    "translation": "VAHINGOITTAA (verbi, transit)",
    "cases": [
      "vahingoittaa + O par"
    ],
    "examples": [
      "Öljyvuoto vahingoitti rannikkoa pahasti."
    ]
  },
  {
    "search_term": "vahtia",
    "translation": "VAHTIA (verbi, transit)",
    "cases": [
      "vahtia + O par",
      "vahvistaa + N",
      "vahvistaa + P ade"
    ],
    "examples": [
      "Tupakointi vahingoittaa terveyttä.",
      "Musti-koira vahtii taloa hyvin. Voitko vahtia tätä kassia vähän aikaa?",
      "VAHVISTAA",
      "Isä vahvisti  kattoa parruilla. — Отец укрепил крышу брусами.",
      "Presidentti vahvisti lain. — Президент утвердил закон.",
      "Poikkeus vahvisti säännön. — Исключение подтверждает правило.",
      "VAIHDELLA — меняться",
      "P",
      "ela ill",
      "Vaihdelemme postimerkkejä. — Мы обмениваемся марками.",
      "Lämpötila vaihteli kylmästä kuumaan. — Погода изменилась (переменилась) с холодной на жаркую.",
      "Omenoiden kilohinta vaihtelee 8:sta 20 markaan. — Цена за килограмм яблок колеблется (меняется) от 8 до 20 марок."
    ]
  },
  {
    "search_term": "vaihtaa",
    "translation": "VAIHTAA (verbi, transit)",
    "cases": [
      "vaihtaa + N ill",
      "vaihtaa + N tra"
    ],
    "examples": [
      "Vaihdoin autoon kesärenkaat.",
      "Jenni vaihtoi ikkunoihin uudet verhot.",
      "Tellervo vaihtoi vanhan polkupyöränsä uuteen.",
      "Syksyllä vaihdetaan auton kesärenkaat talvirenkaisiin.",
      "Haluaisin vaihtaa 100 dollaria markoiksi.",
      "Voiko palkinnon vaihtaa rahaksi?"
    ]
  },
  {
    "search_term": "vaihtua",
    "translation": "VAIHTUA (verbi, intransit)",
    "cases": [
      "vaihtua + N tra/ill"
    ],
    "examples": [
      "Hämärä vaihtuu pimeäksi.",
      "Juhla vaihtui arjeksi.",
      "Kun valo vaihtuu vihreäksi / vihreään, voit mennä kadun yli."
    ]
  },
  {
    "search_term": "vaikea",
    "translation": "VAIKEA (adj)",
    "cases": [
      "vaikea + V 1. inf"
    ],
    "examples": [
      "Oli vaikea löytää halpaa asuntoa.",
      "Vaikeinta oli myöntää omat virheeni."
    ]
  },
  {
    "search_term": "vaikeus",
    "translation": "VAIKEUS (subst)",
    "cases": [
      "vaikeus + V 1. inf"
    ],
    "examples": [
      "Minulla oli vaikeuksia vastata kysymyksiin."
    ]
  },
  {
    "search_term": "vaikeuttaa",
    "translation": "VAIKEUTTAA (verbi, transit)",
    "cases": [
      "vaikeuttaa + O par"
    ],
    "examples": [
      "Rahan puute vaikeutti tutkimusta.",
      "Liukas keli vaikeuttaa liikennettä.",
      "Millaisen vaikutelman sait hänestä?",
      "Ensi vaikutelmani Suomesta oli ihan positiivinen."
    ]
  },
  {
    "search_term": "vaikutelma",
    "translation": "VAIKUTELMA (subst)",
    "cases": [
      "vaikutelma + N ela",
      "vaikutelma + että-lause"
    ],
    "examples": [
      "Sain sellaisen vaikutelman, että mies oli huijari."
    ]
  },
  {
    "search_term": "vaikuttaa",
    "translation": "VAIKUTTAA (verbi, intransit)",
    "cases": [
      "vaikuttaa + N ill",
      "vaikuttaa + N abl"
    ],
    "examples": [
      "Valitettavasti en voi vaikuttaa asiaan mitenkään.",
      "Miten sää vaikuttaa ihmisen mielialaan?",
      "Pakastaminen ei vaikuta ruoan makuun.",
      "Uhkailu ei vaikuta minuun mitenkään.",
      "Kuka hän oli? Hän vaikutti tutulta.",
      "Liisa vaikuttaa onnettomalta.",
      "Vaikuttaa siltä, että kohta alkaa sataa."
    ]
  },
  {
    "search_term": "vaikutus",
    "translation": "VAIKUTUS (subst)",
    "cases": [
      "vaikutus + N ill"
    ],
    "examples": [
      "Sään vaikutus ihmisen mielialaan voi olla suuri.",
      "Opettajalla on suuri vaikutus oppilaisiin.",
      "Kirja teki minuun syvän vaikutuksen."
    ]
  },
  {
    "search_term": "vainota",
    "translation": "VAINOTA (verbi, transit)",
    "cases": [
      "vainota + O par"
    ],
    "examples": [
      "Vainotaanko täällä muukalaisia?",
      "Ihmisiä on vainottu esimerkiksi uskonnon perusteella.",
      "Mies vainosi naista päivin ja öin."
    ]
  },
  {
    "search_term": "vaipua",
    "translation": "VAIPUA (verbi, intransit)",
    "cases": [
      "vaipua + N ill"
    ],
    "examples": [
      "Mies sai sydänkohtauksen ja vaipui kuolleena maahan.",
      "Hän vaipui ajatuksiinsa.",
      "Älä vaivu epätoivoon!"
    ]
  },
  {
    "search_term": "vaivata",
    "translation": "VAIVATA (verbi, transit)",
    "cases": [
      "vaivata + O par"
    ],
    "examples": [
      "Mikä sinua vaivaa, miksi olet noin surullinen?",
      "Ikävä tapaus vaivasi minua kauan."
    ]
  },
  {
    "search_term": "vaivautua",
    "translation": "VAIVAUTUA (verbi, intransit)",
    "cases": [
      "vaivautua + V -mAAn"
    ],
    "examples": [
      "Hän ei vaivautunut edes sanomaan päivää minulle.",
      "Voisit sentään vaivautua ottamaan asiasta selvää."
    ]
  },
  {
    "search_term": "vajota",
    "translation": "VAJOTA (verbi, intransit)",
    "cases": [
      "vajota + N ill"
    ],
    "examples": [
      "Vene vajosi järven pohjaan.",
      "Varo, että et vajoa suohon! Potilas vajosi koomaan."
    ]
  },
  {
    "search_term": "vakuuttaa",
    "translation": "VAKUUTTAA (verbi, transit)",
    "cases": [
      "vakuuttaa + N all",
      "vakuuttaa + että-lause",
      "vakuuttaa + N ela"
    ],
    "examples": [
      "Virkailija vakuutti minulle, että asia hoidetaan.",
      "Hän vakuutti minulle, että hän on syytön.",
      "Talomme on vakuutettu miljoonasta markasta."
    ]
  },
  {
    "search_term": "vakuuttunut",
    "translation": "VAKUUTTUNUT (adj)",
    "cases": [
      "vakuuttunut + N ela"
    ],
    "examples": [
      "Poliisi on vakuuttunut (= varma) miehen syyllisyydestä.",
      "Olimme täysin vakuuttuneita asiasta.",
      "VALAISTA — осветить, (в том числе переносно: разъяснить)",
      "P",
      "Lamppu valaisi huonetta.",
      "Puhuja valaisi asiaa monipuolisesti."
    ]
  },
  {
    "search_term": "valehdella",
    "translation": "VALEHDELLA (verbi, transit)",
    "cases": [
      "valehdella + N all"
    ],
    "examples": [
      "Alä valehtele minulle!"
    ]
  },
  {
    "search_term": "valita",
    "translation": "VALITA (verbi, transit)",
    "cases": [
      "valita + O + N tra",
      "valita + O + V -mAAn",
      "valita + V -minen"
    ],
    "examples": [
      "Valitsimme Niemisen puheenjohtajaksi.",
      "Kenet valittiin presidentiksi?",
      "Valitsimme Pirkko Kosken johtamaan kokousta.",
      "Hänet valittiin edustamaan Suomea.",
      "Minä valitsin vapaaehtoisesti maalla asumisen."
    ]
  },
  {
    "search_term": "valittaa",
    "translation": "VALITTAA (verbi, transit)",
    "cases": [
      "valittaa + N ela",
      "valittaa + N ill/all",
      "valittaa + O par"
    ],
    "examples": [
      "Hän valittaa aina kaikesta.",
      "Päätöksestä voi valittaa lääninoikeuteen.",
      "Mihin tästä voi valittaa?",
      "Voitte valittaa asiasta johtajalle.",
      "Mitä sinä valitat? Kaikki on ihan hyvin.",
      "Hän valitti päänsärkyä.",
      "En voi muuta kuin valittaa asiaa."
    ]
  },
  {
    "search_term": "valitus",
    "translation": "VALITUS (subst)",
    "cases": [
      "valitus + N ela"
    ],
    "examples": [
      "Valitus päätöksestä on tehtävä kahden viikon kuluessa."
    ]
  },
  {
    "search_term": "valmis",
    "translation": "VALMIS (adj)",
    "cases": [
      "valmis + V -mAAn",
      "valmis + N ill"
    ],
    "examples": [
      "Me olemme valmiita lähtemään vaikka heti.",
      "Hän on aina valmis auttamaan muita.",
      "Oletko valmis tähän?",
      "Olen aina valmis pieneen seikkailuun."
    ]
  },
  {
    "search_term": "valmistautua",
    "translation": "VALMISTAUTUA (verbi, intransit)",
    "cases": [
      "valmistautua + N ill",
      "valmistautua + V -mAAn"
    ],
    "examples": [
      "Millä tavalla voisin valmistautua tenttiin?",
      "Valmistautukaa pahimpaan!",
      "Hän valmistautui lähtemään matkalle."
    ]
  },
  {
    "search_term": "valmistua",
    "translation": "VALMISTUA (verbi, intransit) — выучиться, обучиться на кого-либо, закончить учебное заведение",
    "cases": [
      "valmistua + N tra",
      "valmistua + N ela/abl"
    ],
    "examples": [
      "Sari valmistui insinööriksi.",
      "Maija valmistuu sairaanhoitajaksi vuoden kuluttua. — Маййа выучится на медсестру через год.",
      "Hän valmistui insinööriksi teknillisestä korkeakoulusta. — Он выучился на инженера в технической высшей школе.",
      "Ensimmäiseltä maalarikurssilta valmistui myös kolme tyttöä. — Первые курсы маляров закончили также три девушки."
    ]
  },
  {
    "search_term": "valta",
    "translation": "VALTA (subst)",
    "cases": [
      "valta + V 1. inf"
    ],
    "examples": [
      "Minulla ei ole valtaa päättää asiasta.",
      "Kenellä on valta määrätä tästä?"
    ]
  },
  {
    "search_term": "valvoa",
    "translation": "VALVOA (verbi, transit)",
    "cases": [
      "valvoa + O par"
    ],
    "examples": [
      "Poliisi valvoo liikennettä.",
      "Kuka valvoo meidän etuamme?",
      "Hän on vapaa tekemään mitä haluaa.",
      "He olivat vapaita lähtemään."
    ]
  },
  {
    "search_term": "vapaa",
    "translation": "VAPAA (adj)",
    "cases": [
      "vapaa + V -mAAn",
      "vapaa + N ela"
    ],
    "examples": [
      "Maa on vihdoinkin vapaa diktatuurista."
    ]
  },
  {
    "search_term": "vapaus",
    "translation": "VAPAUS (subst)",
    "cases": [
      "vapaus + V 1. inf"
    ],
    "examples": [
      "Sinulla on vapaus tehdä niin kuin haluat."
    ]
  },
  {
    "search_term": "vapauttaa",
    "translation": "VAPAUTTAA (verbi, transit)",
    "cases": [
      "vapauttaa + N ela"
    ],
    "examples": [
      "Poliisi vapautti miehen vankilasta viikko sitten.",
      "Heidät vapautettiin kaikesta vastuusta."
    ]
  },
  {
    "search_term": "vapautua",
    "translation": "VAPAUTUA (verbi, intransit)",
    "cases": [
      "vapautua + N ela"
    ],
    "examples": [
      "Hän vapautuu vankilasta vuoden kuluttua.",
      "Vapaudun tehtävästä kahden kuukauden kuluttua. Maa vapautui diktatuurista kaksi vuotta sitten."
    ]
  },
  {
    "search_term": "vapista",
    "translation": "VAPISTA (verbi, intransit)",
    "cases": [
      "vapista + N ela"
    ],
    "examples": [
      "Koira-parka vapisi kylmästä.",
      "Pikku-Liisa vapisi jännityksestä.",
      "Minulla ei ole varaa (= rahaa) autoon.",
      "Onko meillä varaa tähän?",
      "Tällaiseen ei ole varaa.",
      "Meillä ei ole varaa ostaa autoa."
    ]
  },
  {
    "search_term": "vara",
    "translation": "VARA (subst)",
    "cases": [
      "vara + N ill",
      "vara + V 1. inf"
    ],
    "examples": [
      "Nyt ei ole varaa (= mahdollisuutta) valita."
    ]
  },
  {
    "search_term": "varastaa",
    "translation": "VARASTAA (verbi, transit)",
    "cases": [
      "varastaa + N ela/abl"
    ],
    "examples": [
      "Poika varasti lompakon turistin taskusta.",
      "Myyjä on varastanut kassasta rahaa.",
      "Minulta varastettiin passtja lompakko."
    ]
  },
  {
    "search_term": "varata",
    "translation": "VARATA (verbi, transit)",
    "cases": [
      "varata + N ill/all",
      "varata + N ela/abl"
    ],
    "examples": [
      "Huone on varattu opiskelijoiden käyttöön.",
      "Tupakoiville on varattu neljä pöytää ravintolan takaosasta.",
      "Varaanko teille liput lauantaiksi?",
      "Varataan pöytä jostakin ravintolasta. Varaisin kolme lippua ensimmäiseltä riviltä."
    ]
  },
  {
    "search_term": "varautua",
    "translation": "VARAUTUA (verbi, intransit)",
    "cases": [
      "varautua + N ill",
      "varautua + V -mAAn"
    ],
    "examples": [
      "En osannut varautua näin suureen muutokseen.",
      "Varautukaa pahimpaan!",
      "Olen varautunut lähtemään heti, kun pyydetään."
    ]
  },
  {
    "search_term": "varjella",
    "translation": "VARJELLA (verbi, transit)",
    "cases": [
      "varjella + O par",
      "varjella + N abi",
      "varjella + V -mAstA"
    ],
    "examples": [
      "Varjelkaa luontoa!",
      "Varjelkaa luontoa saastumiselta!",
      "Lapsia täytyy varjella väkivallalta.",
      "Varjele tätä kasvia kuivumasta!",
      "Isä varjeli lasta joutumasta auton alle."
    ]
  },
  {
    "search_term": "varma",
    "translation": "VARMA (adj)",
    "cases": [
      "varma + N ela"
    ],
    "examples": [
      "En ole aivan varma tästä asiasta.",
      "Hän on varma itsestään.",
      "Olen varma siitä, että päätös oli oikea."
    ]
  },
  {
    "search_term": "varmistaa",
    "translation": "VARMISTAA (verbi, transit)",
    "cases": [
      "varmistaa + N ela/abl"
    ],
    "examples": [
      "Varmistakaa tiedot toimistosta!",
      "Varmista kurssin alkamispäivä sihteeriltä!"
    ]
  },
  {
    "search_term": "varmistua",
    "translation": "VARMISTUA (verbi, intransit)",
    "cases": [
      "varmistua + N ela"
    ],
    "examples": [
      "Varmistu asiasta ennen kuin puhut siitä muille!",
      "Varmistu siitä, että asia on totta!Loukkaantuneiden määrästä ei vielä ole varmuutta.",
      "Vasta viikon kuluttua saimme varmuuden asiasta."
    ]
  },
  {
    "search_term": "varmuus",
    "translation": "VARMUUS (subst)",
    "cases": [
      "varmuus + N ela"
    ],
    "examples": []
  },
  {
    "search_term": "varoa",
    "translation": "VAROA (verbi, transit)",
    "cases": [
      "varoa + O par",
      "varoa + V -mAstA"
    ],
    "examples": [
      "Varokaa vihaista koiraa!",
      "Varo taskuvarkaita!",
      "Varoin tekemästä virheitä.",
      "Yritin varoa suututtamasta Sakaria."
    ]
  },
  {
    "search_term": "varoittaa",
    "translation": "VAROITTAA (verbi, transit)",
    "cases": [
      "varoittaa + O par",
      "varoittaa + N ela",
      "varoittaa + V -mAstA"
    ],
    "examples": [
      "Varoitan sinua. Varoitin sinua tästä.",
      "Radiossa varoitettiin autoilijoita liukkaasta kelistä.",
      "Varoitin lapsia menemästä rantaan.",
      "Liisa varoitti minua luottamasta Jussiin."
    ]
  },
  {
    "search_term": "varoitus",
    "translation": "VAROITUS (subst)",
    "cases": [
      "varoitus + N ela"
    ],
    "examples": [
      "Radiossa annettiin varoitus liukkaasta kelistä.",
      "Poika sai opettajalta varoituksen huonosta käytöksestä."
    ]
  },
  {
    "search_term": "vartioida",
    "translation": "VARTIOIDA (verbi, transit)",
    "cases": [
      "vartioida + O par"
    ],
    "examples": [
      "Koira vartioi taloa.",
      "Tätä rakennusta vartioidaan yötä päivää."
    ]
  },
  {
    "search_term": "vastalause",
    "translation": "VASTALAUSE (subst)",
    "cases": [
      "vastalause + N ela",
      "vastalause + N gen + johdosta",
      "vastalause + N ali"
    ],
    "examples": [
      "Asianajaja esitti vastalauseen tuomarin päätöksestä.",
      "Asianajaja esitti vastalauseen tuomion johdosta.",
      "Kirjoitus oli vastalause rasismille."
    ]
  },
  {
    "search_term": "vastakohta",
    "translation": "VASTAKOHTA (subst)",
    "cases": [
      "N gen + vastakohta"
    ],
    "examples": [
      "Onko hyvä pahan vastakohta?",
      "Kauniin vastakohta on ruma."
    ]
  },
  {
    "search_term": "vastata",
    "translation": "VASTATA (verbi, intransit)",
    "cases": [
      "vastata + N ill/all",
      "vastata + N ela"
    ],
    "examples": [
      "Vastatkaa kysymykseen!",
      "Vastasin kirjeeseen heti.",
      "Vastaisitko puhelimeen?",
      "Miksi et vastaa minulle?",
      "Hän vastaa (= on vastuussa) firmamme viennistä.",
      "Jokainen vastaa omista teoistaan."
    ]
  },
  {
    "search_term": "vastaus",
    "translation": "VASTAUS (subst)",
    "cases": [
      "vastaus + N ill"
    ],
    "examples": [
      "En saanut vastausta kysymykseen."
    ]
  },
  {
    "search_term": "vastustaa",
    "translation": "VASTUSTAA (verbi, transit)",
    "cases": [
      "vastustaa + O par",
      "vastustaa + V -minen"
    ],
    "examples": [
      "Vastustatteko te minua?",
      "Kaikki vastustivat puheenjohtajan ehdotusta.",
      "Vastustamme ydinvoimalan rakentamista."
    ]
  },
  {
    "search_term": "vastuu",
    "translation": "VASTUU (subst)",
    "cases": [
      "vastuu + N ela"
    ],
    "examples": [
      "Pääjohtaja on vastuussa päätöksistä.",
      "Kenellä on vastuu tästä?",
      "Vastuu virheistä kuuluu minulle."
    ]
  },
  {
    "search_term": "vedota",
    "translation": "VEDOTA (verbi, intransit)",
    "cases": [
      "vedota + N ill"
    ],
    "examples": [
      "Tuo mainos vetoaa nuorisoon.",
      "Hän vetosi yleiseen mielipiteeseen."
    ]
  },
  {
    "search_term": "velka",
    "translation": "VELKA (subst)",
    "cases": [
      "velka + N ill/all",
      "velka + N ela"
    ],
    "examples": [
      "Olen velkaa kauppaan melkein tuhat markkaa.",
      "Velkani Matille on sata markkaa.",
      "Talosta on vielä velkaa yli 100 000 markkaa."
    ]
  },
  {
    "search_term": "velvoittaa",
    "translation": "VELVOITTAA (verbi, transit)",
    "cases": [
      "velvoittaa + O + V -mAAn"
    ],
    "examples": [
      "Velvoitan teidät tulemaan paikalle ajoissa.",
      "Mies velvoitettiin maksamaan korvausta naiselle."
    ]
  },
  {
    "search_term": "velvollisuus",
    "translation": "VELVOLLISUUS (subst)",
    "cases": [
      "velvollisuus + N par + kohtaan",
      "velvollisuus + V 1. inf"
    ],
    "examples": [
      "Minulla ei ole mitään velvollisuuksia häntä kohtaan.",
      "Meillä on velvollisuus auttaa heitä."
    ]
  },
  {
    "search_term": "verrata",
    "translation": "VERRATA (verbi, transit)",
    "cases": [
      "verrata + O par + N ill"
    ],
    "examples": [
      "Vertaa hintaa laatuun! Häntä verrataan usein veljeensä."
    ]
  },
  {
    "search_term": "vertauskuva",
    "translation": "VERTAUSKUVA (subst)",
    "cases": [
      "N gen + vertauskuva"
    ],
    "examples": [
      "Sydän on rakkauden vertauskuva. Valkoinen kyyhky on rauhan vertauskuva."
    ]
  },
  {
    "search_term": "vetoomus",
    "translation": "VETOOMUS (subst)",
    "cases": [
      "vetoomus + N gen + puolesta",
      "vetoomus + N gen + V -minen tra"
    ],
    "examples": [
      "He esittivät vetoomuksen rauhan puolesta.",
      "He esittivät vetoomuksen uhrien auttamiseksi.",
      "Vetoomus sodan lopettamiseksi oli turha."
    ]
  },
  {
    "search_term": "viedä",
    "translation": "VIEDÄ (verbi, transit)",
    "cases": [
      "viedä + N ill/all",
      "viedä + ela/abl",
      "viedä + V -mAAn"
    ],
    "examples": [
      "Vietkö tämän kirjeen postiin?",
      "Vein hänelle kukkia.",
      "Vintistä oli viety kaikki tavarat.",
      "Joku on vienyt pihalta Villen pyörän.",
      "Suomesta viedään paperia moneen maahan.",
      "Pertti vie meidät illalla ulos syömään.",
      "Vierailimme monessa perheessä.",
      "Japanilaisturistit vierailivat monella paikkakunnalla."
    ]
  },
  {
    "search_term": "vierailla",
    "translation": "VIERAILLA (verbi, intransit)",
    "cases": [
      "vierailla + N ine/ade"
    ],
    "examples": [
      "Isä vei lapset eläintarhaan katsomaan leijonia."
    ]
  },
  {
    "search_term": "viettää",
    "translation": "VIETTÄÄ (verbi, transit)",
    "cases": [
      "viettää + O par",
      "viettää + N ine/ade"
    ],
    "examples": [
      "Vietämme (= juhlimme) huomenna isoäidin 85-vuotispäiviä.",
      "Vietetäänkö teidän maassanne joulua?",
      "Vietättekö (= oletteko) koko loman Suomessa?",
      "Vietimme kesän maalla."
    ]
  },
  {
    "search_term": "viha",
    "translation": "VIHA (subst)",
    "cases": [
      "viha + N par + kohtaan"
    ],
    "examples": [
      "Hän oli täynnä vihaa heitä kohtaan.",
      "Viha väkivaltaa kohtaan on hyväksyttävää.",
      "Älä ole vihainen minulle!",
      "Hän oli vihainen kaikille.",
      "Mistä sinä noin vihainen olet?"
    ]
  },
  {
    "search_term": "vihainen",
    "translation": "VIHAINEN (adj)",
    "cases": [
      "vihainen + N ali",
      "vihainen + N ela"
    ],
    "examples": [
      "Olen vihainen siitä, että sinä et koskaan tule ajoissa."
    ]
  },
  {
    "search_term": "vihata",
    "translation": "VIHATA (verbi, transit)",
    "cases": [
      "vihata + O par",
      "vihata + V -minen"
    ],
    "examples": [
      "Mitä sinä vihaat?",
      "Vihaatko minua?",
      "Vihaan väkivaltaa.",
      "Vihaan vaatteiden silittämistä."
    ]
  },
  {
    "search_term": "viihdyttää",
    "translation": "VIIHDYTTÄÄ (verbi, transit)",
    "cases": [
      "viihdyttää + O par",
      "viihdyttää + N ade",
      "viihdyttää + V -mAllA"
    ],
    "examples": [
      "Miten voin viihdyttää itkevää lasta?",
      "Yritin viihdyttää vieraita.",
      "Oskari viihdytti meitä kertomalla hauskoja juttuja.",
      "Illan isäntä viihdytti vieraita huvittavilla anekdooteilla.",
      "Yritin viihdyttää lasta laulamalla joululauluja."
    ]
  },
  {
    "search_term": "viihtyä",
    "translation": "VIIHTYÄ (verbi, intransit)",
    "cases": [
      "viihtyä + N ine/ade"
    ],
    "examples": [
      "Viihdytkö uudessa työpaikassasi?",
      "Kuinka olet viihtynyt Suomessa?",
      "Muutimme takaisin kaupunkiin, koska emme viihtyneet maalla."
    ]
  },
  {
    "search_term": "viipyä",
    "translation": "VIIPYÄ (verbi, intransit)",
    "cases": [
      "viipyä + N ine/ade"
    ],
    "examples": []
  },
  {
    "search_term": "viitata",
    "translation": "VIITATA (verbi, intransit)",
    "cases": [
      "viitata + N ill"
    ],
    "examples": [
      "Viivyn Ranskassa kuukauden.",
      "Kauanko aiotte viipyä Suomessa?",
      "Hän vifpyi matkalla vain pari viikkoa.",
      "Ministeri viittasi puheessaan tähän asiaan. Viittaan lain kolmanteen pykälään."
    ]
  },
  {
    "search_term": "viittaus",
    "translation": "VIITTAUS (subst)",
    "cases": [
      "viittaus + N ill"
    ],
    "examples": [
      "Kirjassa on viittauksia Aleksis Kiven teoksiin.",
      "Artikkelissa on muutama viittaus aikaisempiin tutkimuksiin."
    ]
  },
  {
    "search_term": "viitsiä",
    "translation": "VIITSIÄ (verbi, transit)",
    "cases": [
      "viitsiä + V 1. inf"
    ],
    "examples": [
      "Minä en viitsi nousta niin aikaisin.",
      "Älä viitsi aina valittaa!"
    ]
  },
  {
    "search_term": "viivyttää",
    "translation": "VIIVYTTÄÄ (verbi, transit)",
    "cases": [
      "viivyttää + O par"
    ],
    "examples": [
      "Kova tuuli viivytti laivan lähtöä."
    ]
  },
  {
    "search_term": "vilkaista",
    "translation": "VILKAISTA (verbi, transit)",
    "cases": [
      "vilkaista + O par",
      "vilkaista + N ill/all"
    ],
    "examples": [
      "Voisitko vähän vilkaista tätä tekstiä?",
      "Aamulla on niin kiire, että ehdin vain vilkaista lehteä.",
      "Hän ei vilkaissutkaan minuun.",
      "Vilkaisin peiliin ja huomasin näppylän nenässäni.",
      "Mies vilkaisi ikkunasta kadulle ja näki kauniin naisen.",
      "Vilkaisin sivulleni ja huomasin Matin."
    ]
  },
  {
    "search_term": "vilkuttaa",
    "translation": "VILKUTTAA (verbi, transit)",
    "cases": [
      "vilkuttaa + N all"
    ],
    "examples": [
      "Lapset vilkuttivat äidille ja isälle.",
      "Autoilija vilkutti valoja muille autoille."
    ]
  },
  {
    "search_term": "virkistyä",
    "translation": "VIRKISTYÄ (verbi, intransit)",
    "cases": [
      "virkistyä + N ela"
    ],
    "examples": [
      "He virkistyivät lomamatkasta.",
      "Virkistyin kahvista niin, etten saanut yöllä unta."
    ]
  },
  {
    "search_term": "virkistää",
    "translation": "VIRKISTÄÄ (verbi, transit)",
    "cases": [
      "virkistää + O par"
    ],
    "examples": [
      "Lomamatka virkisti heitä.",
      "Kahvi virkistää minua."
    ]
  },
  {
    "search_term": "voida",
    "translation": "VOIDA (verbi, transit)",
    "cases": [
      "voida + N all",
      "voida + V 1. inf"
    ],
    "examples": [
      "Tälle asialle minä en voi yhtään mitään.",
      "Koska täällä ei ole pianoa, en voi nyt soittaa.",
      "Voitko tulla huomenna?",
      "Voisinko saada kupin kahvia?"
    ]
  },
  {
    "search_term": "voima",
    "translation": "VOIMA (subst)",
    "cases": [
      "voima + V 1. inf"
    ],
    "examples": [
      "Hänellä ei ollut voimaa jatkaa opintojaan.",
      "Äiti on niin sairas, että hänellä ei ole voimia nousta sängystä."
    ]
  },
  {
    "search_term": "voittaa",
    "translation": "VOITTAA (verbi, transit)",
    "cases": [
      "voittaa + N ine"
    ],
    "examples": [
      "Mies voitti miljoona markkaa lotossa.",
      "Hän on voittanut viisi maailmanmestaruutta tenniksessä."
    ]
  },
  {
    "search_term": "voitto",
    "translation": "VOITTO (subst)",
    "cases": [
      "voitto + N ine",
      "voitto + N ela"
    ],
    "examples": [
      "Voitto tietokilpailussa toi Jannelle 10 000 markkaa.",
      "Suomen voitto Kanadan joukkueesta oli iloinen yllätys."
    ]
  },
  {
    "search_term": "vuokrata",
    "translation": "VUOKRATA (verbi, transit)",
    "cases": [
      "vuokrata + N all",
      "vuokrata + N ela/abl"
    ],
    "examples": [
      "Virtaset vuokrasivat huoneen kahdelle opiskelijalle.",
      "Firmalle on vuokrattu pieni toimisto Albertinkadulta.",
      "Miiierit vuokraavat huoneiston Helsingistä.",
      "Halutaan vuokrata huone vanhasta puutalosta.",
      "Opiskelija vuokrasi huoneen Virtasilta."
    ]
  },
  {
    "search_term": "vähetä",
    "translation": "VÄHETÄ (VÄHENTYÄ) (verbi, intransit)",
    "cases": [
      "vähetä + N ill"
    ],
    "examples": [
      "Läänien määrä väheni viiteen.",
      "Yhdistyksen jäsenmäärä on vähentynyt puoleen entisestä."
    ]
  },
  {
    "search_term": "vähentää",
    "translation": "VÄHENTÄÄ (verbi, transit)",
    "cases": [
      "vähentää + O par",
      "vähän + N par"
    ],
    "examples": [
      "Yritän vähentää tupakanpolttoa.",
      "Mirja on vähentänyt suklaan syömistä.",
      "VÄHÄN (adv)",
      "Ostin vain vähän ruokaa.",
      "Satsinko vähän teetä?",
      "Meillä on vähän kotitehtäviä."
    ]
  },
  {
    "search_term": "väite",
    "translation": "VÄITE (subst)",
    "cases": [
      "väite + N ela"
    ],
    "examples": [
      "Väite miehen syyllisyydestä osoittautui vääräksi.",
      "Väitteet korruptiosta olivat liioiteltuja.",
      "Väite siitä, että mies on syyllinen, oli väärä."
    ]
  },
  {
    "search_term": "väitellä",
    "translation": "VÄITELLÄ (verbi, intransit)",
    "cases": [
      "väitellä + N ela",
      "väitellä + N gen + kanssa"
    ],
    "examples": [
      "He väittelivät politiikasta koko illan.",
      "Kalle väittelee aina kaikesta.",
      "Tästä asiasta on turha väitellä minun kanssani."
    ]
  },
  {
    "search_term": "väittely",
    "translation": "VÄITTELY (subst)",
    "cases": [
      "väittely + N ela"
    ],
    "examples": [
      "Kokouksessa käytiin kiivas väittely puheenjohtajan valinnasta.",
      "Väittely asiasta jatkuu yhä."
    ]
  },
  {
    "search_term": "välittää",
    "translation": "VÄLITTÄÄ (verbi, transit)",
    "cases": [
      "välittää + N ela",
      "välittää + V 1. inf"
    ],
    "examples": [
      "Pienistä virheistä ei kannata välittää.",
      "Hän ei välitä kenestäkään."
    ]
  },
  {
    "search_term": "välttyä",
    "translation": "VÄLTTYÄ (verbi, intransit)",
    "cases": [
      "välttyä + N abl",
      "välttyä + V -mAstA"
    ],
    "examples": [
      "En välitä (= viitsi) lähteä nyt ulos.",
      "Poika välttyi rangaistukselta.",
      "Onnettomuuksilta ei vältytty.",
      "Julia välttyi joutumasta vankilaan."
    ]
  },
  {
    "search_term": "välttää",
    "translation": "VÄLTTÄÄ (verbi, transit)",
    "cases": [
      "välttää + O par",
      "välttää + V -mAstA"
    ],
    "examples": [
      "Yrittäkää välttää virheitä!",
      "Suolankäyttöä kannattaa välttää, suola on epäterveellistä.",
      "Vältän tekemästä samoja virheitä uudestaan."
    ]
  },
  {
    "search_term": "väsynyt",
    "translation": "VÄSYNYT (adj)",
    "cases": [
      "väsynyt + N ela",
      "väsynyt + N ill",
      "väsynyt + V -mAAn"
    ],
    "examples": [
      "Lapset olivat väsyneitä pitkästä kävelymatkasta.",
      "Lasse oli niin väsynyt kävelemisestä, että meni heti nukkumaan.",
      "Kaikki olivat väsyneitä (= kyllästyneitä) miehen juttuihin.",
      "Istutaan tähän, olen väsynyt kävelemään!",
      "Olen väsynyt (= kyllästynyt) tekemään kotitöitä.",
      "Olen väsynyt kuuntelemaan hänen tyhmiä vitsejään."
    ]
  },
  {
    "search_term": "väsyttää",
    "translation": "VÄSYTTÄÄ (verbi, transit)",
    "cases": [
      "väsyttää + O par",
      "väsyttää + V 1. inf"
    ],
    "examples": [
      "Minua väsyttää.",
      "Pitkä matka väsytti lapsia.",
      "Lääke voi väsyttää potilasta.",
      "Minua väsyttää (= kyllästyttää) tehdä kotitöitä joka päivä.",
      "Meitä väsytti kuunnella hänen tylsiä vitsejään."
    ]
  },
  {
    "search_term": "väsyä",
    "translation": "VÄSYÄ (verbi, intransit)",
    "cases": [
      "väsyä + N ela",
      "väsyä + N ill",
      "väsyä + V -mAAn"
    ],
    "examples": [
      "Väsyn helposti oluesta.",
      "Ulla väsyi uimisesta niin, ettei jaksanut tehdä enää mitään.",
      "He väsyivät (= kyllästyivät) miehen puheisiin.",
      "He väsyivät kuuntelemaan miehen puheita."
    ]
  },
  {
    "search_term": "odottaa",
    "translation": "ODOTTAA (verbi, transit) — ждать",
    "cases": [
      "odottaa + O par",
      "odottaa + N ine/ade"
    ],
    "examples": [
      "Olen odottanut häntä jo kaksi tuntia.",
      "Voitko odottaa minua hetken?",
      "Odotin häntä puistossa.",
      "Odotimme bussia pysäkillä."
    ]
  },
  {
    "search_term": "ohittaa",
    "translation": "OHITTAA (verbi, transit)",
    "cases": [
      "ohittaa + N ine",
      "ohittaa + N abi"
    ],
    "examples": [
      "Risteyksessä ei saa ohittaa toista autoa.",
      "Auto ohitti bussin kaarteessa.",
      "Kummalta puolelta ohitetaan?",
      "Autoilija ohittaa toisen auton vasemmalta.",
      "Vastaantulija ohitetaan oikealta."
    ]
  },
  {
    "search_term": "ohje",
    "translation": "OHJE (subst)",
    "cases": [
      "ohje + N ela"
    ],
    "examples": [
      "Kirjassa annetaan ohjeita mm. välimerkkien oikeasta käytöstä.",
      "Saimme hyvät ohjeet tietokoneen käytöstä.",
      "Myös; käyttöohje, ääntämisohje"
    ]
  },
  {
    "search_term": "oikeus",
    "translation": "OIKEUS (subst)",
    "cases": [
      "oikeus + N iii",
      "oikeus + V 1. inf"
    ],
    "examples": [
      "Kaikilla on oikeus omaan mielipiteeseen.",
      "Minulla on oikeus sanoa oma mielipiteeni."
    ]
  },
  {
    "search_term": "oikeutettu",
    "translation": "OIKEUTETTU (adj)",
    "cases": [
      "oikeutettu + N ill",
      "oikeutettu + V -mAAn"
    ],
    "examples": [
      "Matkustajat olivat oikeutettuja saamaan korvausta lentokoneen myöhästymisestä.",
      "Lain mukaan hän on oikeutettu vahingonkorvaukseen."
    ]
  },
  {
    "search_term": "oikeuttaa",
    "translation": "OIKEUTTAA (verbi, transit)",
    "cases": [
      "oikeuttaa + V -mAAn",
      "oikeuttaa + N ill"
    ],
    "examples": [
      "Lippu oikeuttaa edestakaiseen matkaan.",
      "Lippu oikeuttaa matkustamaan raitiovaunuilla tunnin ajan."
    ]
  },
  {
    "search_term": "oire",
    "translation": "OIRE (subst)",
    "cases": [
      "oire + N ela"
    ],
    "examples": [
      "Kuume on oire tulehduksesta.",
      "Syövästä ei ollut mitään oireita.",
      "Oireita rauhan palaamisesta on jo olemassa.",
      "Myös: aidsin oireet, syövän oireet"
    ]
  },
  {
    "search_term": "ojentaa",
    "translation": "OJENTAA (verbi, transit)",
    "cases": [
      "ojentaa + N ali"
    ],
    "examples": [
      "Ojensimme Lailalle lahjan.",
      "Ojensin hänelle käteni."
    ]
  },
  {
    "search_term": "oksettaa",
    "translation": "OKSETTAA (verbi, transit) — тошнить",
    "cases": [
      "oksettaa + O par"
    ],
    "examples": [
      "Jussia oksettaa. Hänellä on vatsatauti.",
      "Minua oksetti koko merimatkan. Olin merisairas."
    ]
  },
  {
    "search_term": "olettaa",
    "translation": "OLETTAA (verbi, transit)",
    "cases": [
      "olettaa + että-lause"
    ],
    "examples": [
      "Oletan, että te kaikki tiedätte tämän."
    ]
  },
  {
    "search_term": "oletus",
    "translation": "OLETUS (subst)",
    "cases": [
      "oletus + N ela"
    ],
    "examples": [
      "Oletukset suomalaisten alkuperästä ovat osittain vääriä."
    ]
  },
  {
    "search_term": "olla",
    "translation": "OLLA (verbi, intransit)",
    "cases": [
      "olla + N ine/ade",
      "olla + V -mAssA",
      "olla + V -mAttA"
    ],
    "examples": [
      "Olimme viime viikolla Turussa.",
      "Liisa on torilla.",
      "Olin kirjastossa lukemassa lehtiä.",
      "Hän on torilla ostamassa kalaa.",
      "En voi olla syömättä suklaata, se on niin hyvää.",
      "Voisitko olla huutamatta (= älä huuda)!"
    ]
  },
  {
    "search_term": "ominainen",
    "translation": "OMINAINEN (adj)",
    "cases": [
      "ominainen + N all"
    ],
    "examples": [
      "Taudille ominaista on äkillinen korkea kuume.",
      "Kaksinaismoraali oli ominaista viktoriaaniselle ajalle."
    ]
  },
  {
    "search_term": "omistautua",
    "translation": "OMISTAUTUA (verbi, intransit)",
    "cases": [
      "omistautua + N all"
    ],
    "examples": [
      "Hän omistautui vain työlleen.",
      "Hän on omistautunut täydellisesti perheelleen."
    ]
  },
  {
    "search_term": "ongelma",
    "translation": "ONGELMA (subst)",
    "cases": [
      "ongelma + N ine"
    ],
    "examples": [
      "Olavilla on ongelmia matematiikassa.",
      "Tässä asiassa on pari pientä ongelmaa."
    ]
  },
  {
    "search_term": "onnellinen",
    "translation": "ONNELLINEN (adj)",
    "cases": [
      "onnellinen + N ela"
    ],
    "examples": [
      "Pirjo oli onnellinen apurahasta.",
      "Poika tuli onnelliseksi lahjasta.",
      "Hän oli onnellinen siitä, että sai apurahan."
    ]
  },
  {
    "search_term": "onneton",
    "translation": "ONNETON (adj)",
    "cases": [
      "onneton + N ela",
      "onneton + N gen + takia"
    ],
    "examples": [
      "Mistä sinä noin onneton olet?",
      "Hän oli onneton sairaudestaan.",
      "Äiti oli onneton pojan käytöksestä.",
      "Äiti oli onneton pojan käytöksen takia."
    ]
  },
  {
    "search_term": "onni",
    "translation": "ONNI (subst)",
    "cases": [
      "onni + N ine",
      "onni + N ill/all",
      "onni + V 1. inf"
    ],
    "examples": [
      "Pekka-paralla ei ollut onnea tentissä.",
      "Hyvä onni pelissä, huono onni rakkaudessa.",
      "(Toivotan) onnea tenttiin!",
      "Onnea hääparille!",
      "Onnea yritykselle!",
      "Oli onni päästä vihdoinkin omaan asuntoon.",
      "Meillä ei ollut onnea saada lippuja konserttiin."
    ]
  },
  {
    "search_term": "onnistaa",
    "translation": "ONNISTAA (verbi, transit)",
    "cases": [
      "onnistaa + O par",
      "onnistaa + N ine"
    ],
    "examples": [
      "Mikkoa onnisti: hän sai apurahan.",
      "Jannea onnisti työnhaussa: hän sai kivan työpaikan.",
      "Minua onnisti tentissä, kysymykset olivat helppoja."
    ]
  },
  {
    "search_term": "onnistua",
    "translation": "ONNISTUA (verbi, intransit)",
    "cases": [
      "onnistua + N ine",
      "N nom + onnistua + V -mAAn",
      "N gen + onnistuu + V 1. inf"
    ],
    "examples": [
      "Onnistuin tentissä.",
      "Kalevi onnistuu aina kaikessa.",
      "Minä onnistuin saamaan liput.",
      "He onnistuivat löytämään halvan asunnon.",
      "Minun onnistui saada liput.",
      "Heidän ei onnistunut löytää halpaa asuntoa."
    ]
  },
  {
    "search_term": "onnitella",
    "translation": "ONNITELLA (verbi, transit) onnitella + O par",
    "cases": [
      "onnitella + N ela"
    ],
    "examples": [
      "Onnittelimme isoäitiä hänen syntymäpäivänään.",
      "Kaikki onnittelivat voittajaa."
    ]
  },
  {
    "search_term": "onnittelu",
    "translation": "ONNITTELU (subst)",
    "cases": [
      "onnittelu + N ela",
      "onnittelu + N gen + johdosta",
      "OPASTAA {verbi, transit) opastaa + N ilt/ail",
      "opastaa + V -mAAn",
      "opastaa + O par + N ine",
      "opetella + V -mAAn",
      "opettaa + N ali",
      "opettaa + V -mAAn",
      "opiskella + O par",
      "opiskella + N ine/ade",
      "opiskella + N tra"
    ],
    "examples": [
      "Onnittelut hienosta todistuksesta!",
      "Onnitteluni merkkipäivän johdosta!",
      "Onnittelen teitä hyvin tehdystä työstä.",
      "Mies opasti turistin hotelliin.",
      "Minä voin opastaa teidät Kauppatorille.",
      "Hovimestari opasti vieraat ruokasaliin istumaan.",
      "Hän opasti minua käyttämään tietokonetta.",
      "Heikki opastaa minua tietokoneen käytössä.",
      "Tässä asiassa en voi teitä opastaa.",
      "OPETELLA {verbi, transit) — учиться (делать что-то)",
      "Lapsi opettelee kävelemään.",
      "Opettelin ajamaan autoa 18-vuotiaana.",
      "OPETTAA {verbi, transit)",
      "Kuka opettaa teille suomea?",
      "Kalle opetti minua ajamaan autoa, isoäiti on opettanut Villen leipomaan.",
      "OPISKELLA {verbi, transit) — учиться, изучать (какие-то дисциплины)",
      "Me opiskelemme suomea.",
      "Hän opiskelee lääketiedettä Helsingin yliopistossa.",
      "Heikki opiskeli tiedotusoppia Tampereella.",
      "Martti opiskelee sairaanhoitajaksi."
    ]
  },
  {
    "search_term": "oppia",
    "translation": "OPPIA (verbi, transit)",
    "cases": [
      "oppia + V -mAAn"
    ],
    "examples": [
      "Hän on oppinut puhumaan suomea hyvin.",
      "Lapsi oppii kävelemään noin vuoden ikäisenä."
    ]
  },
  {
    "search_term": "osa",
    "translation": "OSA (subst)",
    "cases": [
      "osa + N ela",
      "osa + N par",
      "ottaa osaa + N ill"
    ],
    "examples": [
      "Aiotko sinäkin ottaa osaa kilpailuun?",
      "Kaikkien on otettava osaa kustannuksiin.",
      "Otan osaa suruusi.",
      "Osa opiskelijoista lähti kotiin, osa jäi vielä harjoittelemaan.",
      "Hän sai osan palkasta etukäteen.",
      "Hän oli sairaana suurimman osan lomasta.",
      "Hän asuu Espanjassa osan vuodesta.",
      "Tämä on vain osa totuutta, ei koko totuus.",
      "Työ on vain osa elämää.",
      "Osassa Suomea sataa lunta ensi viikonloppuna."
    ]
  },
  {
    "search_term": "osallistua",
    "translation": "OSALLISTUA (verbi, intransit)",
    "cases": [
      "osallistua + N ill"
    ],
    "examples": [
      "En voinut osallistua kokoukseen."
    ]
  },
  {
    "search_term": "osallistuminen",
    "translation": "OSALLISTUMINEN (subst)",
    "cases": [
      "osallistuminen + N ill"
    ],
    "examples": [
      "Kongressiin osallistuminen tulee kalliiksi."
    ]
  },
  {
    "search_term": "osata",
    "translation": "OSATA (verbi, transit)",
    "cases": [
      "osata + V 1. inf"
    ],
    "examples": [
      "Hän ei halunnut osallistua keskusteluun.",
      "Hän osallistui aktiivisesti rahojen keräämiseen.",
      "En osaa puhua suomea. Osaatko sanoa, milloin hän tulee?"
    ]
  },
  {
    "search_term": "osoittaa",
    "translation": "OSOITTAA (verbi, transit)",
    "cases": [
      "osoittaa + N ill/all",
      "osoittaa + O + N tra",
      "osoittaa + että-lause"
    ],
    "examples": [
      "Rahat on osoitettu tutkimukseen.",
      "Kirje on osoitettu suomen kielen laitokselle.",
      "Kenelle tämä postilähetys on osoitettu?",
      "Pystytkö osoittamaan (= todistamaan) väitteen vääräksi?",
      "Hän osoitti, että Saara oli väärässä.",
      "Kokemus on osoittanut, että raha ei tuo onnea."
    ]
  },
  {
    "search_term": "osoittautua",
    "translation": "OSOITTAUTUA (verbi, intransit) — оказаться (кем/чем/каким)",
    "cases": [
      "osoittautua + N tra"
    ],
    "examples": [
      "Tehtävä osoittautui helpoksi.",
      "Tämä voi osoittautua mahdottomaksi tehtäväksi.",
      "Martti osoittautui hauskaksi mieheksi."
    ]
  },
  {
    "search_term": "ostaa",
    "translation": "OSTAA (verbi, transit)",
    "cases": [
      "ostaa + N ela/abl"
    ],
    "examples": [
      "Ostamme talon Espoosta tai Vantaalta.",
      "Ostin sanakirjan kaupasta.",
      "Aion ostaa torilta kalaa ja vihanneksia."
    ]
  },
  {
    "search_term": "osoitus",
    "translation": "OSOITUS (subst)",
    "cases": [
      "osoitus + N eia"
    ],
    "examples": [
      "Teos on osoitus kirjoittajan lahjakkuudesta.",
      "Tuo on päivänselvä osoitus siitä, että et ymmärrä asiaa.",
      "Myös: rakkauden osoitus, uskollisuuden osoitus"
    ]
  },
  {
    "search_term": "osua",
    "translation": "OSUA (verbi, transit)",
    "cases": [
      "osua + N ill",
      "osua + O par + N"
    ],
    "examples": [
      "Pallo osui ikkunaan.",
      "Luoti osui mieheen ja haavoitti häntä.",
      "Ennustus osui oikeaan {= oli oikea).",
      "Laukaus osui miestä jalkaan."
    ]
  },
  {
    "search_term": "osuus",
    "translation": "OSUUS (subst)",
    "cases": [
      "osuus + N ela"
    ],
    "examples": [
      "Kaikki maksoivat oman osuutensa laskusta.",
      "Verojen osuus palkasta on liian suuri."
    ]
  },
  {
    "search_term": "ote",
    "translation": "OTE (subst)",
    "cases": [
      "ote + N ela",
      "ote + M ill"
    ],
    "examples": [
      "En saanut otetta kaiteesta vaan kaaduin portaissa. Hän luki otteita (= osia) uudesta kirjastaan.",
      "En saa otetta tähän työhön."
    ]
  },
  {
    "search_term": "ottaa",
    "translation": "OTTAA (verbi, transit)",
    "cases": [
      "ottaa + N ela/abl",
      "ottaa + N ill/all"
    ],
    "examples": [
      "Hän otti kirjan käteensä ja alkoi lukea.",
      "Hän otti kirjan kassista. Mies otti avaimet pöydältä. Ota takki päältäsi ja tule sisään!",
      "Poika otti ruokaa lautaselle ja rupesi syömään."
    ]
  },
  {
    "search_term": "ärsyttää",
    "translation": "ÄRSYTTÄÄ (verbi, transit) — раздражать",
    "cases": [
      "ärsyttää + O par"
    ],
    "examples": [
      "Pesuaine ärsyttää ihoa. — Моющее средство раздражает кожу.",
      "Jussin käytös ärsytti Maijaa. — Поведение Юсси вызвало раздражение у Майи.",
      "Minua ärsyttää se, että sinä aina valitat. — Меня раздражает то, что ты всегда жалуешься."
    ]
  },
  {
    "search_term": "äänestää",
    "translation": "ÄÄNESTÄÄ (verbi, transit) — голосовать",
    "cases": [
      "äänestää + N ela",
      "äänestää + O + N tra",
      "äänestää + N par + vastaan",
      "äänestää + N gen + puolesta"
    ],
    "examples": [
      "Kokouksessa äänestettiin asiasta.",
      "Äänestimme Liisa Töyryn puheenjohtajaksi.",
      "Ketä äänestit presidentiksi?",
      "Hänet äänestettiin yksimielisesti varapuheenjohtajaksi.",
      "Kaikki äänestivät puheenjohtajan esitystä vastaan.",
      "Äänestin esityksen puolesta.",
      "ÄÄRESSÄ — у",
      "ÄÄRESTÄ — от",
      "ÄÄREEN — к",
      "postpositio",
      "N gen +",
      "Istuin koko illan pöydän ääressä kirjottamassa.",
      "Koko perhe istui television ääressä katsomassa urheilua.",
      "Nousimme pöydän äärestä ja siirryimme pihalle juomaan kahvia.",
      "Tulkaa tänne pöydän ääreen syömään!"
    ]
  },
  {
    "search_term": "nauraa",
    "translation": "NAURAA (verbi, transit) — смеяться",
    "cases": [
      "nauraa + N all — чему",
      "nauraa + O par — над чем"
    ],
    "examples": [
      "Kaikki nauroivat hyvälle vitsille.",
      "Nauroimme Jussin hauskoille jutuille.",
      "Osaatko nauraa itsellesi?",
      "Nauroimme sitä tapausta kauan."
    ]
  },
  {
    "search_term": "naurattaa",
    "translation": "NAURATTAA (verbi, transit) — вызывать смех, смешить",
    "cases": [
      "naurattaa + O par"
    ],
    "examples": [
      "Asia nauratti minua kauan jälkeenpäin.",
      "Millaiset vitsit naurattavat sinua?",
      "Voi, että meitä nauratti!"
    ]
  },
  {
    "search_term": "nauttia",
    "translation": "NAUTTIA (verbi, intransit) — получать большое удовольствие (от чего-либо), наслаждаться (чем)",
    "cases": [
      "nauttia + N ela",
      "nauttia + V -minen"
    ],
    "examples": [
      "Nautin (= pidän kovasti) kauniista keväästä.",
      "Nautin klassisesta musiikista.",
      "Nautin uimisesta ja rannalla makaamisesta."
    ]
  },
  {
    "search_term": "nauttia",
    "translation": "NAUTTIA (verbi, transit) — 1) есть и пить 2) пользоваться (напр., поддержкой)",
    "cases": [
      "nauttia + O par"
    ],
    "examples": [
      "HUOM! обратите внимание, что этот глагол выступает и как переходный, и как непереходный, и при этом его значение сильно меняется",
      "Nautimme (= joimme ja söimme) pihalla viiniä ja oliiveja.",
      "Hallitus nauttii (= saa osakseen) eduskunnan luottamusta."
    ]
  },
  {
    "search_term": "neuvoa",
    "translation": "NEUVOA (verbi, transit)",
    "cases": [
      "neuvoa + O par",
      "neuvoa + N ine",
      "neuvoa + V -mAAn",
      "neuvoa + N ali"
    ],
    "examples": [
      "Voisitko neuvoa minua vähän?",
      "Kuka voisi neuvoa minua tietokoneen käytössä?",
      "Tässä asiassa en voi sinua neuvoa.",
      "Neuvoisin teitä lähtemään kentälle ajoissa.",
      "Lääkäri neuvoi minua lopettamaan tupakan polttamisen.",
      "Hän neuvoi turistille tien asemalle.",
      "Jussi neuvoi minulle, kuinka tietokonetta käytetään."
    ]
  },
  {
    "search_term": "neuvotella",
    "translation": "NEUVOTELLA (verbi, intransit)",
    "cases": [
      "neuvotella + N ela"
    ],
    "examples": [
      "Sinun on parasta neuvotella asiasta Jaanan kanssa.",
      "Palkoista on neuvoteltu jo kaksi viikkoa."
    ]
  },
  {
    "search_term": "nimittää",
    "translation": "NIMITTÄÄ (verbi, transit)",
    "cases": [
      "nimittää + N tra",
      "nimittää + O par + N tra"
    ],
    "examples": [
      "Presidentti nimitettiin Kauppakorkeakoulun kunniatohtoriksi.",
      "Hänet nimitettiin professoriksi vuonna 1976.",
      "Liisaa nimitetään (= kutsutaan) Lissuksi."
    ]
  },
  {
    "search_term": "nimitys",
    "translation": "NIMITYS (subst)",
    "cases": [
      "nimitys + M tra",
      "nimitys + N ill"
    ],
    "examples": [
      "Hän sai nimityksen professoriksi viime vuonna.",
      "Hän sai nimityksen professorin virkaan viime vuonna."
    ]
  },
  {
    "search_term": "nojata",
    "translation": "NOJATA (verbi, intransit) — опираться, прислоняться",
    "cases": [
      "nojata + N ill"
    ],
    "examples": [
      "Älä nojaa seinään, se on maalattu!",
      "Voit nojata minuun, jos sinun on vaikea kävellä."
    ]
  },
  {
    "search_term": "nolottaa",
    "translation": "NOLOTTAA (verbi, transit)",
    "cases": [
      "nolottaa + O par",
      "nolottaa + V 1. inf"
    ],
    "examples": [
      "Epäonnistuminen nolotti Kallea.",
      "Minua nolottaa puhua suomea, koska osaan sitä niin huonosti."
    ]
  },
  {
    "search_term": "nopea",
    "translation": "NOPEA (adj)",
    "cases": [
      "nopea + V -mAAn"
    ],
    "examples": [
      "Hän on nopea oppimaan vieraita kieliä."
    ]
  },
  {
    "search_term": "nostaa",
    "translation": "NOSTAA (verbi, transit)",
    "cases": [
      "nostaa + N ela/abl",
      "nostaa + N ill/all",
      "nostaa + V -mAAn"
    ],
    "examples": [
      "Hän nosti lapsen sängystä.",
      "Nostaisitko tuon kirjan lattialta?",
      "Nostin lapsen sänkyyn.",
      "Nostin kirjan lattialta pöydälle.",
      "Äiti nosti lapsen tuolille istumaan."
    ]
  },
  {
    "search_term": "noudattaa",
    "translation": "NOUDATTAA (verbi, transit) — придерживаться (правил), соблюдать (инструкции)",
    "cases": [
      "noudattaa + O par"
    ],
    "examples": [
      "Tätä sääntöä kannattaa noudattaa.",
      "Lakia täytyy noudattaa.",
      "Noudata ohjetta hyvin tarkasti!"
    ]
  },
  {
    "search_term": "nousta",
    "translation": "NOUSTA (verbi, intransit)",
    "cases": [
      "nousta + N ela/abl",
      "nousta + N ill/all",
      "nousta + V -mAAn"
    ],
    "examples": [
      "Poika nousi sängystä vasta iltapäivällä.",
      "Hän nousi lattialta tuolille.",
      "Hän nousi junaan.",
      "Hän nousi lattialta tuolille istumaan.",
      "Hän nousi pöydälle puhumaan.",
      "Hän nousi seisomaan tuolille."
    ]
  },
  {
    "search_term": "noutaa",
    "translation": "NOUTAA (verbi, transit)",
    "cases": [
      "noutaa + N ela/abl"
    ],
    "examples": [
      "Sihteeri voi noutaa paketin postista.",
      "Pojat noutivat torilta perunoita."
    ]
  },
  {
    "search_term": "nukkua",
    "translation": "NUKKUA (verbi, intransit)",
    "cases": [
      "nukkua + N ine/ade"
    ],
    "examples": [
      "En halua nukkua vesisängyssä.",
      "Sinä voit nukkua olohuoneen sohvalla.",
      "Luennolla ei saa nukkua!"
    ]
  },
  {
    "search_term": "nukuttaa",
    "translation": "NUKUTTAA (verbi, transit)",
    "cases": [
      "nukuttaa + O par"
    ],
    "examples": [
      "Minua nukuttaa vielä.",
      "Pitkä ja tylsä luento nukutti opiskelijoita."
    ]
  },
  {
    "search_term": "nuhdella",
    "translation": "NUHDELLA (verbi, transit)",
    "cases": [
      "nuhdella + O par",
      "nuhdella + N ela"
    ],
    "examples": [
      "Äiti nuhteli Ossia.",
      "Hän nuhteli minua huolimattomuudesta."
    ]
  },
  {
    "search_term": "nähdä",
    "translation": "NÄHDÄ (verbi, transit) — видеть",
    "cases": [
      "nähdä + V 1. inf",
      "nähdä + N ela",
      "nähdä + että-lause"
    ],
    "examples": [
      "Näetkö lukea tässä valossa?",
      "En näe katsoa televisiota ilman silmälaseja.",
      "Näin lehdestä, että hän on kuollut.",
      "Hänestä näkee heti, että hän on sairas.",
      "Näen, että voit huonosti.",
      "Näin heti, että Aino oli itkenyt."
    ]
  },
  {
    "search_term": "näkemys",
    "translation": "NÄKEMYS (subst) — взгляд (на вещи)",
    "cases": [
      "näkemys + N ela"
    ],
    "examples": [
      "Millainen näkemys sinulla on tästä asiasta?",
      "Ministeri esitti näkemyksiään talouspolitiikasta."
    ]
  },
  {
    "search_term": "näkyä",
    "translation": "NÄKYÄ (verbi, intransit) — виднеться, быть видным",
    "cases": [
      "näkyä + N ine/ade",
      "näkyä + N ela/abl",
      "näkyä + N ill/all"
    ],
    "examples": [
      "Kuvassa näkyy (= on) talo ja metsää.",
      "Taivaalla näkyy tähtiä.",
      "Kadulla ei näy yhtään ihmistä.",
      "Ikkunasta näkyy toinen talo (= voi nähdä toisen talon).",
      "Parvekkeelta näkyy meri.",
      "Venus näkyy maahan. Kirkon torni näkyy meille."
    ]
  },
  {
    "search_term": "näköinen",
    "translation": "NÄKÖINEN (adj) — выглядещий",
    "cases": [
      "N gen + näköinen"
    ],
    "examples": [
      "Hän on saman näköinen kuin äitinsä.",
      "Olet jo paljon terveemmän näköinen.",
      "Onpa omituisen näköinen talo!",
      "Hän esitti näytteitä runoilijan tuotannosta.",
      "Hän antoi hienon näytteen taidoistaan."
    ]
  },
  {
    "search_term": "näyte",
    "translation": "NÄYTE (subst) — образец",
    "cases": [
      "näyte + N ela"
    ],
    "examples": [
      "Talo on upea näyte modernista arkkitehtuurista."
    ]
  },
  {
    "search_term": "näytellä",
    "translation": "NÄYTELLÄ (verbi, transit) — играть роль; выступать (в театре)",
    "cases": [
      "näytellä + O par",
      "näytellä + N ine/ade"
    ],
    "examples": [
      "Hän on näytellyt mm. Romeota ja Hamletia.",
      "Missä teatterissa hän näyttelee?",
      "Hän on näytellyt myös Kansallisteatterm pienettä näyttämöllä.",
      "Kuka näytteli pääosaa Hamletissa?"
    ]
  },
  {
    "search_term": "näyttää",
    "translation": "NÄYTTÄÄ (verbi, transit) — показать",
    "cases": [
      "näyttää + N all",
      "näyttää + että-lause"
    ],
    "examples": [
      "Näytä minulle, missä talossa sinä asut.",
      "He näyttivät meille lomakuviaan.",
      "Näytän heille, että olen oikeassa."
    ]
  },
  {
    "search_term": "näyttää",
    "translation": "NÄYTTÄÄ (verbi, intransit) — выглядеть",
    "cases": [
      "näyttää + N abl"
    ],
    "examples": [
      "Miltä tämä takki näyttää?",
      "Se näyttää oikein kauniilta ja lämpimältä.",
      "Hän näytti hyvin sairaalta.",
      "Näyttää (= vaikuttaa) siltä, että verot nousevat taas."
    ]
  },
  {
    "search_term": "näyttö",
    "translation": "NÄYTTÖ (subst)",
    "cases": [
      "näyttö + N ela"
    ],
    "examples": [
      "Hän antoi vakuuttavan näytön tanssitaidostaan.",
      "Poliisilla ei ole näyttöä miehen syyllisyydestä."
    ]
  },
  {
    "search_term": "boikotoida",
    "translation": "BOIKOTOIDA (verbi, transit)",
    "cases": [
      "boikotoida + O par"
    ],
    "examples": [
      "Kauppaliitto boikotoi yhtä jäsenmaata."
    ]
  },
  {
    "search_term": "buuata",
    "translation": "BUUATA (verbi, transit) — освистывать, шикать",
    "cases": [
      "buuata + N aH"
    ],
    "examples": [
      "Yleisö buuasi esitykselle.",
      "Jääkiekko-ottelun erotuomarille buuattiin."
    ]
  }
];

const findInDatabase = (word) => {
  return database.filter((item) => {
    return item.search_term.indexOf(word.toLowerCase()) != -1;
  });
};

const formatWord = (item) => {
  var result = item.search_term + "\n\n" + item.translation + "\n\n";
  for (var i = 0; i < item.cases.length; i++) {
    result = result + item.cases[i] + "\n";
  }
  result = result + "\n";

  for (var i = 0; i < item.examples.length; i++) {
    result = result + item.examples[i] + "\n";
  }

  return result;
};

export default {
  async fetch(request, env, ctx) {
      if(request.method === "POST"){
          const payload = await request.json();
          if('message' in payload){
              const chatId = payload.message.chat.id;
              const word = String(payload.message.text);
              const items = findInDatabase(word);
              if (items.length === 0) {
                await this.sendMessage(env.API_KEY, chatId, `Для \"${word}\" ничего не нашлось`);
              }
              else {
                if (items.length > 3) {
                  await this.sendMessage(env.API_KEY, chatId, `Для \"${word}\" нашлось ${items.length} слов, но покажу только три из них.`);
                }
                const count = items.length <= 3 ? items.length : 3;
                for (var i = 0; i < count; i++) {
                  await this.sendMessage(env.API_KEY, chatId, formatWord(items[i]));                  
                }
              }
          }
      }
      
      return new Response('OK');
  },

  async sendMessage(apiKey, chatId, text){
      const url = `https://api.telegram.org/bot${apiKey}/sendMessage?chat_id=${chatId}&text=${text}`;
      const data = await fetch(url).then(resp => resp.json());
  }
};
