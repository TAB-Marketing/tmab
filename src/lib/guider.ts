// Guider – informationssidor som svarar på det kunder söker på. De ger sajten innehåll att
// ranka på i Google och att citeras av AI-assistenter, och länkar vidare till rätt tjänst.
// Enda källan för /guider, varje guidesida, sitemap.xml och llms.txt.
import type { Fraga } from "@/lib/priser";

export type Rad = string | { titel: string; text: string };

export type Avsnitt = {
  rubrik: string;
  stycken?: readonly string[];
  /** varning: raderna är saker att undvika och visas med en varningsikon i stället för en bock. */
  lista?: { numrerad?: boolean; varning?: boolean; rader: readonly Rad[] };
  tabell?: { kolumner: readonly string[]; rader: readonly (readonly string[])[] };
  /** Stycken efter listan eller tabellen. */
  efter?: readonly string[];
};

export type Guide = {
  slug: string;
  /** Kort namn i listor. */
  titel: string;
  rubrik: { text: string; markera: string };
  seoTitel: string;
  seoBeskrivning: string;
  /** Första stycket – själva svaret på frågan i rubriken. */
  ingress: string;
  publicerad: string;
  uppdaterad: string;
  /** Tjänsten guiden leder vidare till. */
  tjanst: string;
  /**
   * Egen delningsbild (1200 × 630) med guidens rubrik, t.ex. "/og/guider/<slug>.jpg".
   * Utelämnad = sajtens standardbild. Ny guide → be om en bild i samma mall.
   */
  delningsbild?: string;
  avsnitt: readonly Avsnitt[];
  fragor: readonly Fraga[];
};

export const GUIDER: readonly Guide[] = [
  {
    slug: "google-search-console",
    titel: "Google Search Console: kom igång på 15 minuter",
    rubrik: {
      text: "Google Search Console: kom igång på 15 minuter",
      markera: "15 minuter",
    },
    seoTitel: "Google Search Console – guide på svenska",
    seoBeskrivning:
      "Så kopplar du hemsidan till Google Search Console, skickar in din sitemap och ser vilka sökord som ger besök. Steg för steg, gratis.",
    ingress:
      "Google Search Console är Googles gratis verktyg som visar hur din hemsida syns i sökresultaten: vilka sökningar du visas för, hur många som klickar och om Google har problem att läsa dina sidor. Det tar en kvart att komma igång.",
    publicerad: "2026-10-16",
    uppdaterad: "2026-10-19",
    tjanst: "seo",
    delningsbild: "/og/guider/google-search-console.jpg",
    avsnitt: [
      {
        rubrik: "Vad du kan se i Search Console",
        lista: {
          rader: [
            "Vilka sökningar du visas för, och hur många som klickar.",
            "Genomsnittlig placering per sökning och per sida.",
            "Vilka sidor Google har tagit med i sitt index, och vilka som saknas och varför.",
            "Fel som gör att sidor inte kan visas i sökresultaten.",
          ],
        },
        efter: [
          "Statistiken sparas i 16 månader. Ju tidigare du kommer igång, desto mer historik har du att jämföra med.",
        ],
      },
      {
        rubrik: "Steg 1: Lägg till din hemsida",
        lista: {
          numrerad: true,
          rader: [
            "Gå till search.google.com/search-console och logga in med företagets Google-konto, inte ett privat.",
            "Välj egendomstyp: Domän om du kan ändra DNS hos din domänleverantör, annars URL-prefix.",
            "Verifiera att sajten är din. För Domän lägger du till en TXT-post i DNS. För URL-prefix är en HTML-tagg i hemsidans kod enklast.",
            "Vänta tills Google bekräftat. En DNS-ändring kan ta en stund att slå igenom.",
          ],
        },
        efter: [
          "Välj Domän om du kan. Då täcks alla varianter av adressen – med och utan www, http och https – av samma egendom.",
        ],
      },
      {
        rubrik: "Steg 2: Skicka in din sitemap",
        stycken: [
          "En sitemap är en lista över alla sidor du vill att Google ska hitta. De flesta hemsideverktyg skapar den automatiskt, ofta på adressen /sitemap.xml.",
        ],
        lista: {
          numrerad: true,
          rader: [
            "Öppna Webbplatskartor i menyn.",
            "Skriv in adressen till din sitemap och klicka på Skicka.",
            "Kontrollera efter några dagar att statusen är Lyckades och att antalet sidor stämmer.",
          ],
        },
      },
      {
        rubrik: "Steg 3: Be Google läsa en ny sida",
        stycken: [
          "Har du publicerat en ny sida eller ändrat en viktig text kan du snabba på. Klistra in adressen i sökfältet överst i Search Console och välj Begär indexering.",
          "Det garanterar inte att sidan visas högt, men Google brukar läsa den snabbare.",
        ],
      },
      {
        rubrik: "Det här ska du titta på varje månad",
        lista: {
          rader: [
            {
              titel: "Sökningar med många visningar men få klick",
              text: "En tydligare sidtitel och beskrivning kan ge fler besök utan att placeringen ändras.",
            },
            {
              titel: "Sidor som inte indexeras",
              text: "Rapporten säger varför. Ofta är det dubbletter eller sidor som saknar länkar.",
            },
            {
              titel: "Core Web Vitals",
              text: "Rapporten visar om sidorna laddar snabbt och fungerar bra på mobilen. Långsamma sidor tappar besökare, oavsett hur högt de rankar.",
            },
          ],
        },
      },
      {
        rubrik: "Glöm inte Bing",
        stycken: [
          "Bing Webmaster Tools fungerar på samma sätt och kan hämta din egendom direkt från Search Console. Det tar fem minuter.",
          "Det är värt det även om få av dina kunder använder Bing. Bing ligger bakom Microsoft Copilot och används av flera andra AI-tjänster för att hitta källor.",
        ],
      },
    ],
    fragor: [
      {
        fraga: "Kostar Google Search Console något?",
        svar: "Nej. Google Search Console och Bing Webmaster Tools är gratis.",
      },
      {
        fraga: "Vad är skillnaden mellan Search Console och Google Analytics?",
        svar: "Search Console visar vad som händer innan besöket, i sökresultaten. Google Analytics visar vad besökarna gör på hemsidan. Du behöver båda för att se hela bilden.",
      },
      {
        fraga: "Vem ska äga Search Console-kontot?",
        svar: "Företaget. Lägg upp egendomen i företagets Google-konto och ge byrån eller konsulten åtkomst som användare. Då förlorar du ingen statistik om ni slutar samarbeta.",
      },
    ],
  },
  {
    slug: "vad-ar-geo",
    titel: "Synas i ChatGPT: så ökar du chansen att nämnas i AI-svar",
    rubrik: {
      text: "Synas i ChatGPT\u00a0– så ökar du chansen att nämnas i AI-svar",
      markera: "ChatGPT",
    },
    seoTitel: "Synas i ChatGPT – optimera ditt företag för AI-sök",
    seoBeskrivning:
      "Hur får man sitt företag att synas i ChatGPT? Så väljer AI-tjänster sina källor, sex saker du kan göra själv och hur du ser om ditt företag nämns.",
    ingress:
      "Allt fler frågar ChatGPT, Gemini eller Copilot i stället för att googla. Att optimera företaget för de svaren kallas GEO, Generative Engine Optimization, eller ChatGPT-SEO, AI-sökoptimering. Grunden är densamma som för vanlig SEO, men AI-tjänsterna lägger mer vikt vid tydliga svar, fakta som går att kontrollera och vad andra skriver om dig.",
    publicerad: "2026-10-16",
    uppdaterad: "2026-10-20",
    tjanst: "geo",
    delningsbild: "/og/guider/vad-ar-geo.jpg",
    avsnitt: [
      {
        rubrik: "Hur AI-assistenter väljer vilka företag de nämner",
        stycken: [
          "När en AI-assistent svarar på en fråga om något aktuellt söker den ofta på webben och sammanfattar det den hittar. Den nämner hellre källor som:",
        ],
        lista: {
          rader: [
            "svarar tydligt och direkt på frågan,",
            "har fakta som pris, område och vad som ingår skrivet i klartext,",
            "nämns på andra sajter som assistenten litar på, till exempel branschsidor, recensioner och artiklar,",
            "är tekniskt lätta att läsa – texten finns i sidans kod från början, inte först efter att JavaScript körts.",
          ],
        },
      },
      {
        rubrik: "Kan man bli rekommenderad av ChatGPT?",
        stycken: [
          "Ingen kan bestämma vad ChatGPT svarar i en enskild konversation, och ingen kan garantera att ditt företag rekommenderas. Det du kan påverka är förutsättningarna: att ChatGPT kan hitta din sajt, förstå vad du gör och se att andra bekräftar det.",
          "När ChatGPT söker på webben hämtas sidorna av roboten OAI-SearchBot. Stänger din robots.txt ute den visas sajten inte i ChatGPT:s sökresultat. Den är skild från GPTBot, som samlar träningsdata – de två kan styras var för sig.",
        ],
      },
      {
        rubrik: "Skillnaden mellan SEO och GEO",
        tabell: {
          kolumner: ["", "SEO", "GEO"],
          rader: [
            ["Mål", "Hamna högt i Googles resultat", "Bli nämnd i ett AI-svar"],
            ["Kunden ser", "En lista med länkar", "Ett färdigt svar, ibland med källor"],
            ["Viktigast", "Sökord, teknik, länkar", "Tydliga svar, fakta, omnämnanden"],
            [
              "Följs upp med",
              "Google Search Console",
              "Bing Webmaster Tools, egna tester och trafik från AI-tjänster",
            ],
          ],
        },
      },
      {
        rubrik: "Sex saker du kan göra själv",
        lista: {
          numrerad: true,
          rader: [
            {
              titel: "Skriv det viktigaste i klartext",
              text: "Vad du gör, för vem och vad det kostar, på en egen sida, inte bara i en bild eller pdf.",
            },
            {
              titel: "Svara på kundernas frågor",
              text: "En fråga per rubrik, med svaret direkt i första meningen.",
            },
            {
              titel: "Lägg till strukturerad data",
              text: "Märk upp företaget, tjänsterna, priserna och de vanliga frågorna enligt schema.org.",
            },
            {
              titel: "Släpp in AI-tjänsternas sökrobotar",
              text: "Kontrollera att robots.txt inte stänger ute till exempel OAI-SearchBot och PerplexityBot.",
            },
            {
              titel: "Synas där andra letar",
              text: "Branschregister, recensionssajter och artiklar är källor som AI-assistenter ofta läser.",
            },
            {
              titel: "Håll uppgifterna lika överallt",
              text: "Samma namn, beskrivning och kontaktuppgifter på hemsidan och på alla andra ställen.",
            },
          ],
        },
      },
      {
        rubrik: "Så kontrollerar du om du syns",
        stycken: [
          "Bing Webmaster Tools har en rapport som visar hur ofta sajten citeras i Copilot – citeringar, inte klick. För ChatGPT och de andra tjänsterna finns inget motsvarande, så där får du fråga själv:",
        ],
        lista: {
          rader: [
            "Ställ de frågor dina kunder ställer, till exempel ”vilken redovisningsbyrå passar ett litet aktiebolag?”.",
            "Testa i flera tjänster: ChatGPT, Gemini, Perplexity och Copilot.",
            "Gör om testet varje månad och anteckna vilka företag som nämns.",
          ],
        },
        efter: [
          "Svaren varierar mellan gånger och användare. Se på utvecklingen över tid, inte på ett enskilt svar.",
        ],
      },
      {
        rubrik: "Vad är llms.txt?",
        stycken: [
          "llms.txt är en textfil på hemsidan som sammanfattar vad företaget gör, skriven för AI-tjänster. Det är ett förslag till standard som få tjänster använder, och Google skriver uttryckligen att det inte behövs några särskilda AI-filer för att synas i deras AI-funktioner. Den är snabb att lägga till och skadar inte, men prioritera punkterna ovan först. Vår egen ligger på adressen /llms.txt.",
        ],
      },
    ],
    fragor: [
      {
        fraga: "Vad är ChatGPT-SEO?",
        svar: "Samma sak som GEO, inriktat på ChatGPT: att optimera sajten och företagsinformationen så att ChatGPT kan hitta, förstå och hänvisa till dig. Det kallas också ChatGPT-optimering eller AI-sökoptimering.",
      },
      {
        fraga: "Är GEO samma sak som SEO?",
        svar: "Nej, men de bygger på samma grund. En sajt som är bra för SEO har oftast en bra start för GEO. GEO lägger mer vikt vid tydliga svar och vid att andra sajter nämner dig.",
      },
      {
        fraga: "Hur lång tid tar GEO?",
        svar: "Tekniska ändringar som strukturerad data går snabbt att göra. Omnämnanden på andra sajter och förtroende byggs över flera månader, precis som för SEO.",
      },
      {
        fraga: "Måste jag släppa in AI-robotar på min sajt?",
        svar: "Vill du synas i AI-svar behöver de robotar som hämtar källor få läsa sajten. Du kan samtidigt välja att stänga ute robotar som bara samlar in träningsdata.",
      },
    ],
  },
  {
    slug: "seo-for-smaforetag",
    titel: "SEO för småföretag: 10 saker att fixa själv",
    rubrik: {
      text: "SEO för småföretag: 10 saker du kan fixa själv",
      markera: "fixa själv",
    },
    seoTitel: "SEO för småföretag – 10 saker att fixa själv",
    seoBeskrivning:
      "En checklista för småföretag: sidtitlar, Google-företagsprofil, laddtid, sitemap och mer. Det mesta tar under en timme och kostar inget.",
    ingress:
      "Du behöver ingen byrå för att ta de första stegen. De här tio sakerna ger mest effekt för minst arbete, och de flesta går att göra på en eftermiddag.",
    publicerad: "2026-10-16",
    uppdaterad: "2026-10-19",
    tjanst: "seo",
    delningsbild: "/og/guider/seo-for-smaforetag.jpg",
    avsnitt: [
      {
        rubrik: "Checklistan",
        lista: {
          numrerad: true,
          rader: [
            {
              titel: "Koppla Google Search Console",
              text: "Då ser du vilka sökningar du redan syns för och om Google hittar alla dina sidor.",
            },
            {
              titel: "Fyll i din Google-företagsprofil",
              text: "Den styr hur du syns på Google Maps och i lokala sökningar. Lägg in öppettider, tjänster och bilder.",
            },
            {
              titel: "Skriv en unik sidtitel för varje sida",
              text: "Börja med det kunden söker på, till exempel ”Elektriker i Västerås – akut och planerat”, inte ”Startsida”.",
            },
            {
              titel: "Skriv en beskrivning per sida",
              text: "Den syns under titeln i sökresultatet och avgör ofta om någon klickar. Håll den under cirka 155 tecken.",
            },
            {
              titel: "En sida per tjänst",
              text: "En sida som handlar om en sak har lättare att ranka än en sida som räknar upp allt.",
            },
            {
              titel: "Svara på vanliga frågor",
              text: "Samla det kunder frågar och svara på hemsidan. Det hjälper både Google och AI-assistenter.",
            },
            {
              titel: "Gör sajten snabb på mobilen",
              text: "Testa i PageSpeed Insights. Stora bilder är den vanligaste orsaken till långsamma sidor.",
            },
            {
              titel: "Ge bilderna namn och alt-text",
              text: "”rostskydd-bil.jpg” säger mer än ”IMG_4021.jpg”, och alt-texten beskriver bilden för den som inte ser den.",
            },
            {
              titel: "Länka mellan dina egna sidor",
              text: "Från startsidan till tjänsterna, och från varje tjänst till kontakt.",
            },
            {
              titel: "Be kunderna om omdömen",
              text: "Fråga alla kunder, inte bara dem du tror är nöjda. Recensioner på Google-företagsprofilen påverkar hur högt du syns i lokala sökningar.",
            },
          ],
        },
      },
      {
        rubrik: "När är det dags att ta hjälp?",
        stycken: [
          "När grunden är på plats handlar SEO om löpande arbete: nytt innehåll, tekniska förbättringar och uppföljning varje månad. Det är där det blir tidskrävande, och där vi kan ta över.",
        ],
      },
    ],
    fragor: [
      {
        fraga: "Måste man betala för att synas på Google?",
        svar: "Nej. En plats i de vanliga sökresultaten går inte att köpa. Annonser är något annat och märks som sponsrade.",
      },
      {
        fraga: "Vad ska jag börja med om jag bara hinner en sak?",
        svar: "Google-företagsprofilen om du har kunder i ett visst område. Annars en tydlig sidtitel och beskrivning på dina viktigaste sidor.",
      },
      {
        fraga: "Hur ofta behöver man jobba med SEO?",
        svar: "Grunden gör du en gång. Därefter räcker det långt med att följa upp i Search Console varje månad och lägga till nytt innehåll när du har något att säga.",
      },
    ],
  },
  {
    slug: "facebook-annonsering",
    titel: "Facebook-annonsering: så kommer du igång själv",
    rubrik: {
      text: "Facebook-annonsering: så kommer du igång själv",
      markera: "igång själv",
    },
    seoTitel: "Facebook-annonsering – så kommer du igång",
    seoBeskrivning:
      "Så skapar du Facebook-annonser steg för steg: konto, kampanjmål, målgrupp, annonser och budget för Facebook och Instagram. Plus vad det kostar och vanliga misstag.",
    ingress:
      "Facebook-annonser – Facebook Ads, eller Facebook-reklam som många säger – skapas i Metas Ads Manager, och där gör du även annonser på Instagram. Du behöver ett annonskonto i företagets namn, ett tydligt mål för kampanjen, några annonsvarianter och en budget du låter gå i flera veckor. Så här gör du, och det här ska du undvika.",
    publicerad: "2026-10-20",
    uppdaterad: "2026-10-20",
    tjanst: "meta-annonser",
    avsnitt: [
      {
        rubrik: "Steg 1: Sätt upp kontona i företagets namn",
        lista: {
          numrerad: true,
          rader: [
            "Skapa ett företagskonto i Meta Business Suite, inloggad med ditt privata Facebook-konto, men på företagets uppgifter.",
            "Koppla företagets Facebook-sida och Instagram-konto till företagskontot.",
            "Skapa ett annonskonto och lägg in företagets betalkort. Välj rätt valuta och tidszon direkt – de är krångliga att ändra i efterhand.",
            "Lägg till en kollega som administratör, så att ni inte låses ute om något händer med ditt konto.",
          ],
        },
        efter: [
          "Låter du en byrå eller konsult hjälpa dig senare ger du dem åtkomst som partner. Kontot, historiken och betalningen stannar hos företaget.",
        ],
      },
      {
        rubrik: "Steg 2: Använd Ads Manager\u00a0– inte Boosta-knappen",
        stycken: [
          "Knappen Boosta inlägg är det snabbaste sättet att annonsera, men du får färre val för mål, målgrupp och placering. Bygger du kampanjen i Ads Manager styr du vad annonsen ska leda till och kan jämföra flera annonser mot varandra.",
        ],
      },
      {
        rubrik: "Steg 3: Välj ett mål som motsvarar det du vill ha",
        stycken: [
          "Meta visar annonsen för dem som mest sannolikt gör det du väljer som mål. Väljer du trafik får du klick, inte nödvändigtvis kunder.",
        ],
        tabell: {
          kolumner: ["Du vill ha", "Välj målet", "Passar för"],
          rader: [
            [
              "Förfrågningar och bokningar",
              "Leads (potentiella kunder)",
              "Tjänsteföretag, konsulter",
            ],
            ["Köp i webbshoppen", "Försäljning", "E-handel"],
            ["Besök på hemsidan", "Trafik", "Innehåll, nya sidor"],
            ["Bli kända i området", "Kännedom", "Lokala företag, nyöppning"],
          ],
        },
        efter: [
          "Leads kan ske med ett formulär direkt i annonsen – kunden behöver inte lämna Facebook eller Instagram. Det ger ofta fler svar, men kontrollera kvaliteten: det är lätt att skicka ett formulär man inte menar.",
        ],
      },
      {
        rubrik: "Steg 4: Bestäm hur du ska mäta resultatet",
        stycken: [
          "Vill du veta vilka annonser som leder till förfrågningar eller köp på hemsidan behöver du Meta-pixeln. Den sätter cookies och får bara laddas efter samtycke, så du behöver också en cookiebanner där det är lika lätt att neka som att godkänna.",
          "Utan pixel kan du ändå mäta: använd formulärannonser, eller märk länkarna med spårningsparametrar (UTM) och följ besöken i din vanliga statistik.",
        ],
      },
      {
        rubrik: "Steg 5: Välj målgrupp\u00a0– inte för smalt",
        lista: {
          rader: [
            {
              titel: "Plats",
              text: "Ange var dina kunder finns. För ett lokalt företag: orten eller en radie runt den.",
            },
            {
              titel: "Ålder",
              text: "Begränsa bara om du vet att vissa åldrar aldrig köper.",
            },
            {
              titel: "Intressen",
              text: "Börja brett. Meta hittar ofta rätt personer själv utifrån vilka som reagerar på annonsen.",
            },
            {
              titel: "Befintliga kunder",
              text: "En kundlista eller besökare på hemsidan kan användas för att nå liknande personer, men bara om du har rätt att använda uppgifterna.",
            },
          ],
        },
        efter: [
          "Annonserar du om bostäder, jobb eller lån gäller särskilda regler i Meta, och flera målgruppsval försvinner.",
        ],
      },
      {
        rubrik: "Steg 6: Gör två eller tre annonser, inte en",
        lista: {
          rader: [
            "Använd stående format (4:5) för flödet och helskärm (9:16) för Stories och Reels.",
            "Visa produkten, tjänsten eller resultatet, inte logotypen.",
            "Skriv det viktigaste i första meningen. Efter några rader döljs resten av texten.",
            "Välj en knapp som säger vad som händer: Boka nu, Begär offert, Handla.",
            "Testa olika bilder eller vinklar, och låt resultaten avgöra vilken som får fortsätta.",
          ],
        },
      },
      {
        rubrik: "Steg 7: Sätt en budget och ha tålamod",
        stycken: [
          "Välj en dagsbudget du klarar att låta gå i minst fyra veckor. De första dagarna testar Meta vilka som reagerar, och resultaten svänger mycket. Ändrar du budget, målgrupp eller annonser hela tiden börjar testet om.",
          "Bestäm i förväg vad en förfrågan eller ett köp får kosta för att det ska löna sig. Då vet du när det fungerar, och när du ska stänga av.",
        ],
      },
      {
        rubrik: "Det här ska du följa upp",
        tabell: {
          kolumner: ["Nyckeltal", "Vad det säger"],
          rader: [
            [
              "Kostnad per lead eller köp",
              "Det viktigaste talet: vad en förfrågan eller ett köp kostar",
            ],
            [
              "Klickfrekvens (CTR)",
              "Om annonsen fångar intresse – låg CTR betyder ofta fel bild eller budskap",
            ],
            ["Kostnad per tusen visningar (CPM)", "Hur dyrt det är att synas för din målgrupp"],
            ["Frekvens", "Hur många gånger samma person sett annonsen – byt annons när den stiger"],
          ],
        },
        efter: [
          "Gillamarkeringar och räckvidd ser bra ut i rapporten men betalar inga räkningar. Utvärdera på förfrågningar och köp.",
        ],
      },
      {
        rubrik: "De vanligaste misstagen",
        lista: {
          varning: true,
          rader: [
            "Annonskontot ligger på en privatperson eller en tidigare anställd.",
            "Kampanjmålet är trafik när målet egentligen är förfrågningar.",
            "Pixeln laddas utan samtycke.",
            "En enda annons får gå tills den slutar fungera.",
            "Budgeten ändras varannan dag.",
            "Annonsen leder till startsidan i stället för en sida om erbjudandet.",
          ],
        },
      },
    ],
    fragor: [
      {
        fraga: "Vad kostar Facebook-annonsering?",
        svar: "Meta har ingen fast avgift – annonsplatserna säljs i en auktion. Du bestämmer själv budgeten och betalar direkt till Meta. Vad en förfrågan eller ett köp kostar varierar mycket mellan branscher och målgrupper – testa med en budget du klarar att låta gå i några veckor och utvärdera sedan.",
      },
      {
        fraga: "Vad är sponsrade inlägg på Instagram?",
        svar: "Det är annonser som visas i flödet, i Reels eller mellan Stories för personer som inte följer dig, märkta som sponsrade. De skapas i Ads Manager precis som Facebook-annonser, inte med knappen för att marknadsföra ett inlägg om du vill ha full kontroll över mål och målgrupp.",
      },
      {
        fraga: "Ska jag annonsera på Facebook eller Instagram?",
        svar: "Båda styrs från samma Ads Manager. Låt kampanjen gå på båda till en början och se i resultaten var den fungerar bäst, i stället för att välja i förväg.",
      },
      {
        fraga: "Behöver jag Meta-pixeln?",
        svar: "Inte för att komma igång. Med formulärannonser och spårningslänkar kan du mäta utan pixel. Pixeln behövs för att mäta köp och förfrågningar på hemsidan och för att visa annonser för tidigare besökare, och då krävs samtycke.",
      },
      {
        fraga: "När är det dags att ta hjälp?",
        svar: "När annonserna kostar mer än de ger efter några veckor, när du inte hinner ta fram nya annonser och följa upp varje vecka, eller när du vill skala upp och behöver flera kampanjer som samverkar.",
      },
    ],
  },
  {
    slug: "bygga-hemsida-med-ai",
    titel: "Bygga hemsida med AI: det här återstår efter första utkastet",
    rubrik: {
      text: "Bygga hemsida med AI: det här återstår efter första utkastet",
      markera: "efter första utkastet",
    },
    seoTitel: "Bygga hemsida med AI – det här återstår efter utkastet",
    seoBeskrivning:
      "AI bygger en hemsida på minuter. Det som återstår är innehållet och tekniken du inte ser: SEO, DNS, formulär, säkerhet, cookies och hastighet. Med exempel från verkliga sajter.",
    ingress:
      "Med AI-verktyg som Lovable eller ChatGPT får du en hemsida som ser färdig ut på några minuter. Det som återstår är tre saker: innehåll som bara du kan ge, teknik som inte syns i webbläsaren och det som måste vara rätt innan du publicerar. Nedan går vi igenom vad du måste kontrollera själv – och hur. En enkel sajt klarar du med checklistan. Exemplen kommer från AI-byggda sajter vi har gått igenom.",
    publicerad: "2026-11-10",
    uppdaterad: "2026-11-10",
    tjanst: "hemsida",
    avsnitt: [
      {
        rubrik: "Det AI gör bra",
        lista: {
          rader: [
            "Ett första utkast med layout, färger och sidor på några minuter.",
            "Kod som fungerar på både dator och mobil från början.",
            "Textförslag att utgå från när du inte vet var du ska börja.",
            "Snabba ändringar: ”flytta knappen”, ”gör rubriken större”, ”lägg till en sida om oss”.",
          ],
        },
        efter: [
          "Det är därför ett utkast kan se färdigt ut. Men ett utkast som ser färdigt ut är inte samma sak som en hemsida som ger kunder.",
        ],
      },
      {
        rubrik: "Innehållet bara du kan ge",
        stycken: [
          "AI vet inte vad ditt företag kostar, när ni har öppet eller vad som skiljer er från konkurrenten. Saknas underlaget fyller verktyget i luckorna med något som låter rimligt – och det är farligare än en tom ruta.",
          "En restaurangsajt vi arbetade med såg färdig ut i första versionen. Men det saknades riktiga bilder, allergeninformation, dryckeslista och priser för avhämtning. Och eftersom restaurangen inte hade något bokningssystem fick ”Boka bord” bli en förfrågan i stället för en bokning.",
        ],
        lista: {
          rader: [
            "Riktiga priser, öppettider och kontaktuppgifter – kontrollera varje siffra.",
            "Egna bilder på er, era lokaler eller era produkter. Bildbanker och AI-bilder känns igen.",
            "Det som gör att kunden väljer er: erfarenhet, garantier, omdömen, exempel.",
            "Svar på frågorna kunderna faktiskt ställer i telefon och mejl.",
          ],
        },
      },
      {
        rubrik: "Tekniken du inte ser",
        stycken: [
          "Det mesta som går fel syns inte när du klickar runt på sajten. AI-verktyget bygger det du ber om – men du vet sällan att du ska be om det här. Allt i listan nedan hittade vi när vi gick igenom en sajt som byggts med AI – och alla sidor såg rätt ut i webbläsaren.",
        ],
        lista: {
          rader: [
            {
              titel: "Långsam på mobil",
              text: "Startsidan fick 76 av 100 i Googles PageSpeed-test på mobil. Bilden bakom rubriken låg i stilmallen, så telefonen hittade den sent. När bilden fick hämtas direkt landade sidan runt 90.",
            },
            {
              titel: "En knapp som inte gjorde något",
              text: "Den pekade på ett avsnitt som bara fanns på en annan sida. Inget felmeddelande – knappen gjorde helt enkelt ingenting.",
            },
            {
              titel: "Google kunde inte läsa sajtkartan",
              text: "Under en period svarade sajten med ett felmeddelande om betalning från värdtjänsten. Det märktes först i Google Search Console.",
            },
            {
              titel: "Gammal adress kvar i Google",
              text: "När sajten bytte domän låg den gamla adressen kvar i sökresultaten med gamla priser. Omdirigeringar räcker inte – Google behöver också få veta om flytten.",
            },
          ],
        },
        efter: [
          "Nedan går vi igenom de områden där AI-byggda sajter oftast brister, och hur du själv kontrollerar dem. Du behöver inte kunna koda – men du behöver veta vad du ska be om.",
        ],
      },
      {
        rubrik: "Syns sajten för Google och AI-tjänster?",
        stycken: [
          "Många AI-verktyg bygger sajter där texten skapas i webbläsaren med JavaScript. För besökaren ser det likadant ut. Men Google läser sådana sidor i en andra, långsammare omgång, och AI-tjänsternas robotar – de som hämtar källor åt ChatGPT, Claude och Perplexity – kör inte JavaScript alls. Där ser sidan tom ut.",
        ],
        lista: {
          rader: [
            {
              titel: "Texten finns i själva sidan",
              text: "Kontroll: högerklicka på sidan, välj Visa sidkälla och sök efter din rubrik. Hittar du den inte behöver sajten serverrendering (SSR) eller förrendering. Be AI-verktyget om det uttryckligen.",
            },
            {
              titel: "Egen titel och beskrivning på varje sida",
              text: "Vanligt fel: alla sidor har samma titel som startsidan. Kontroll: öppna några undersidor och läs fliknamnet i webbläsaren.",
            },
            {
              titel: "Sajtkarta och robots.txt pekar på rätt adress",
              text: "AI-verktyg skapar ofta sajtkartan med testadressen (t.ex. localhost eller en .app-adress) i stället för din domän. Kontroll: öppna dindomän.se/sitemap.xml och läs adresserna.",
            },
            {
              titel: "Canonical-länk på varje sida",
              text: "Den talar om vilken adress som är den riktiga när samma sida nås på flera sätt. Saknas den kan Google välja fel version.",
            },
            {
              titel: "Strukturerad data",
              text: "Kod som berättar för Google vad sidan handlar om: företag, adress, vanliga frågor. Kontroll: Googles test för utökade resultat (search.google.com/test/rich-results).",
            },
          ],
        },
      },
      {
        rubrik: "Domän, e-post och flytt",
        stycken: [
          "Här är misstagen dyrast, eftersom de kan stoppa din e-post eller radera år av placeringar i Google.",
        ],
        lista: {
          rader: [
            {
              titel: "DNS-ändringar kan stänga av e-posten",
              text: "När du kopplar domänen till den nya sajten ändrar du DNS. Råkar du ta bort eller skriva över MX-posterna slutar e-posten att komma fram. Ta en skärmbild av alla DNS-poster innan du ändrar något.",
            },
            {
              titel: "Mejl från formuläret hamnar i skräpposten",
              text: "Skickar sajten mejl i ditt domännamn behöver domänen SPF, DKIM och DMARC. Annars stoppas mejlen eller sorteras som skräp – ofta utan att du märker det.",
            },
            {
              titel: "Med och utan www",
              text: "Bestäm en adress och låt den andra leda dit. Annars finns sajten två gånger.",
            },
            {
              titel: "Flytt från en gammal sajt",
              text: "Varje gammal adress som har besökare eller länkar ska leda till motsvarande nya sida med en permanent omdirigering (301). Leder allt till startsidan, eller till en felsida, tappar du placeringarna. Lista de gamla adresserna innan du stänger något.",
            },
          ],
        },
      },
      {
        rubrik: "Formulär, inloggning och säkerhet",
        stycken: [
          "Så fort sajten tar emot uppgifter från besökare – formulär, konton, bokningar – blir det allvar. Det är också här AI-verktyg oftast gör fel som inte syns.",
        ],
        lista: {
          varning: true,
          rader: [
            {
              titel: "Hemliga nycklar i koden som skickas till besökaren",
              text: "En API-nyckel som ligger i webbläsarkoden kan vem som helst läsa och använda – på din bekostnad. Nycklar hör hemma på servern.",
            },
            {
              titel: "Databas utan behörighetsregler",
              text: "Sparar sajten uppgifter i en databas (t.ex. Supabase) måste raderna skyddas med regler för vem som får läsa vad. Saknas de kan vem som helst hämta alla kunders uppgifter.",
            },
            {
              titel: "Formulär utan skydd mot spam",
              text: "Ett öppet formulär hittas av robotar inom några veckor. Lägg till skräppostskydd och en gräns för hur ofta samma avsändare kan skicka.",
            },
            {
              titel: "Inget test av hela kedjan",
              text: "Fyll i formuläret själv, från mobilen, och kontrollera att svaret kommer fram – både till dig och, om det ska, till kunden.",
            },
          ],
        },
      },
      {
        rubrik: "Lagar: cookies, personuppgifter och tillgänglighet",
        lista: {
          rader: [
            {
              titel: "Cookiebanner som faktiskt stoppar spårning",
              text: "Ber du AI lägga in Google Analytics eller Meta-pixeln läggs den ofta in så att den startar direkt. Spårning får inte starta förrän besökaren sagt ja. Kontroll: öppna sajten i ett privat fönster och se om bannern dyker upp innan något laddas.",
            },
            {
              titel: "Integritetspolicy",
              text: "Behövs så fort du samlar in personuppgifter, till exempel via ett kontaktformulär. Den ska beskriva vad du sparar, varför och hur länge.",
            },
            {
              titel: "Tillgänglighet",
              text: "Sedan 28 juni 2025 gäller tillgänglighetslagen för bland annat e-handel till konsumenter. Mikroföretag – färre än tio anställda och högst 2 miljoner euro i omsättning eller balansomslutning – är undantagna. Oavsett lagkrav: alt-texter på bilder, tydlig kontrast och en sajt som går att använda med tangentbordet.",
            },
          ],
        },
      },
      {
        rubrik: "Hastighet på riktiga telefoner",
        stycken: [
          "AI-verktygets förhandsvisning körs på din dator med snabbt internet. Dina kunder har en mellanklasstelefon med 4G.",
        ],
        lista: {
          rader: [
            {
              titel: "Bilder i rätt storlek och format",
              text: "En bild från kameran kan väga flera megabyte. Gör om till WebP i den storlek den visas i, och ge mobilen en mindre version.",
            },
            {
              titel: "Det viktigaste laddas först",
              text: "Bilden överst på sidan ska hämtas direkt. Bilder längre ner ska vänta tills besökaren scrollar dit.",
            },
            {
              titel: "Inget som hoppar",
              text: "Bilder och rutor utan angiven storlek gör att texten hoppar när de laddas. Det irriterar besökare och räknas ner av Google.",
            },
          ],
        },
        efter: [
          "Kontroll: kör startsidan och din viktigaste undersida i PageSpeed Insights (pagespeed.web.dev) med Mobil vald. Under 90 är värt att titta på.",
        ],
      },
      {
        rubrik: "Efter lanseringen",
        lista: {
          rader: [
            {
              titel: "En ändring kan förstöra något annat",
              text: "Ber du AI ändra rubriken på en sida kan den samtidigt skriva om något annat. Klicka igenom de viktigaste sidorna och testa formuläret efter varje större ändring.",
            },
            {
              titel: "Koden ska gå att ta med sig",
              text: "Se till att koden sparas i ett konto du äger, till exempel GitHub, så att du kan byta verktyg eller ta in en utvecklare.",
            },
            {
              titel: "Någon måste se felen",
              text: "Koppla Google Search Console och läs den en gång i månaden. Det är oftast där felen syns först. I sajten ovan var det enda tecknet på att Google inte kunde läsa sajtkartan.",
            },
          ],
        },
      },
      {
        rubrik: "Checklista innan du publicerar",
        lista: {
          numrerad: true,
          rader: [
            "Domänen är registrerad i företagets namn, inte i en anställds eller byråns.",
            "Du har en skärmbild av alla DNS-poster från innan du ändrade något.",
            "Sajten har https, och adressen med och utan www leder till samma ställe.",
            "Texten syns i sidkällan, inte bara i webbläsaren.",
            "Varje sida har en egen titel och beskrivning.",
            "Sajtkartan visar din riktiga domän och är inskickad i Google Search Console.",
            "Gamla adresser leder till rätt nya sidor (om du flyttar från en äldre sajt).",
            "Kontaktformuläret är testat från mobilen, och mejlet kommer fram – inte till skräpposten.",
            "Inga hemliga nycklar i webbläsarkoden, och databasen har behörighetsregler.",
            "Integritetspolicy finns, och spårning startar först efter samtycke.",
            "Startsidan klarar minst 90 i PageSpeed Insights på mobil.",
            "Koden ligger i ett konto du äger.",
          ],
        },
      },
      {
        rubrik: "Kostnaderna efter lanseringen",
        stycken: ["Själva bygget kan vara nästan gratis. Det som kostar är att ha sajten igång."],
        lista: {
          rader: [
            "Domän: oftast några hundra kronor om året.",
            "Värdtjänst (hosting): kontrollera villkoren. Vissa gratisplaner tillåter inte kommersiellt bruk eller stänger sajten när en gräns nås.",
            "AI-verktyget: många kräver en betald plan för att du ska kunna fortsätta ändra eller koppla en egen domän.",
            "Din egen tid: varje ändring, varje uppdatering och varje fel som behöver felsökas.",
          ],
        },
      },
      {
        rubrik: "När klarar du dig själv – och när lönar det sig att ta hjälp?",
        tabell: {
          kolumner: ["Situation", "Gör själv", "Ta hjälp"],
          rader: [
            [
              "Enkel sajt: några sidor, kontaktuppgifter",
              "Ja, med checklistan ovan",
              "Om du hellre lägger tiden på företaget",
            ],
            [
              "Sajten ska ge kunder via Google",
              "Möjligt, men räkna med tid för SEO",
              "Om du inte hinner skriva och följa upp",
            ],
            ["Bokning, betalning eller webbshop", "Svårt – kopplingar och säkerhet", "Ja"],
            ["Flytt från en gammal sajt", "Riskabelt – rankning kan tappas", "Ja"],
          ],
        },
        efter: [
          "Det ärliga svaret: för många småföretag räcker det att göra själv. Det som kostar mest är inte bygget, utan en sajt som ser bra ut men inte syns eller inte ger förfrågningar.",
        ],
      },
      {
        rubrik: "Vår åsikt: det farliga är att den ser färdig ut",
        stycken: [
          "En AI-byggd hemsida är inte sämre för att AI byggt den. Problemet är att den ser färdig ut långt innan den är det – och därför publiceras den utan att någon kontrollerat det som inte syns.",
          "Vår hållning är enkel: publicera aldrig en AI-byggd sajt innan du har gjort tre saker. Sökt efter din rubrik i sidkällan. Skickat formuläret från din egen telefon och sett mejlet komma fram. Kopplat Google Search Console. Det tar en eftermiddag, och det fångar de fel som kostar mest.",
          "Och en gräns vi inte kompromissar med: tar sajten emot betalningar, inloggningar eller kunduppgifter som sparas i en databas ska någon som kan läsa koden granska den innan den går live. Där handlar det inte om design, utan om ansvar för andras uppgifter.",
          "Gäller inget av det – du har en enkel sajt med några sidor och ett kontaktformulär – då ska du inte betala en byrå för att bygga den. Lägg pengarna på innehållet i stället.",
        ],
      },
    ],
    fragor: [
      {
        fraga: "Kan man bygga en hemsida gratis med AI?",
        svar: "Själva utkastet, ofta ja. Men för att ha sajten igång under en egen domän behöver du oftast betala för domän, värdtjänst och ibland AI-verktyget. Räkna på kostnaden per år, inte bara bygget.",
      },
      {
        fraga: "Rankar en AI-byggd hemsida sämre på Google?",
        svar: "Nej, inte för att den är byggd med AI. Google bedömer om innehållet är användbart och om sidan fungerar tekniskt – inte vilket verktyg som skapade den. Det som drar ner AI-byggda sajter är oftast tunt, allmänt innehåll och teknikfel som ingen upptäckt.",
      },
      {
        fraga: "Vilket AI-verktyg ska jag välja?",
        svar: "Välj ett där du kan koppla en egen domän och där du kan ta med dig koden eller innehållet om du vill byta. Villkor och priser ändras ofta – kontrollera dem innan du bestämmer dig",
      },
      {
        fraga: "Hur lång tid tar det?",
        svar: "Utkastet tar minuter. Innehåll, bilder, testning och lansering tar för de flesta några dagar till ett par veckor, beroende på hur mycket underlag du har klart.",
      },
    ],
  },
];

/**
 * Guider som ersatts av en landningssida. Den gamla adressen omdirigeras dit (301) så att
 * länkar och sökresultat hamnar rätt.
 */
export const FLYTTADE_GUIDER: Readonly<Record<string, string>> = {};

export function hittaGuide(slug: string): Guide | undefined {
  return GUIDER.find((g) => g.slug === slug);
}

/** Ungefärlig lästid i minuter (200 ord per minut). */
export function lastid(g: Guide): number {
  const text = [
    g.ingress,
    ...g.avsnitt.flatMap((a) => [
      ...(a.stycken ?? []),
      ...(a.lista?.rader ?? []).map((r) => (typeof r === "string" ? r : `${r.titel} ${r.text}`)),
      ...(a.tabell?.rader.flat() ?? []),
      ...(a.efter ?? []),
    ]),
    ...g.fragor.flatMap((f) => [f.fraga, f.svar]),
  ].join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
}
