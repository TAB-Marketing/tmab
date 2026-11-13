// Landningssidan /lokal-seo – lokal sökmotoroptimering, Google Maps och Google-företagsprofilen.
// Skild från /seo-byra (SEO generellt).
// Lokal SEO ingår i Synlighet; Google-företagsprofilen har eget pris. Priser hämtas från priser.ts.
import { BINDNING_TEXT, kr, MOMS_TEXT, PRIS, type Fraga } from "@/lib/priser";

export const LOKAL_SEO = {
  sokvag: "/lokal-seo",
  titel: "Lokal SEO",
  etikett: "Tjänst · SEO",
  seoTitel: "Lokal SEO – synas på Google Maps och lokalt",
  seoBeskrivning:
    "Vill ni nå fler kunder i ert område? TAB hjälper företag med lokal SEO, Google Maps och Google-företagsprofilen. Boka en gratis genomgång.",
  kortText:
    "Hur Google väljer vilka företag som syns lokalt, hur ni syns på Google Maps och vad ni kan göra, själva eller med oss.",
  publicerad: "2026-10-19",
  uppdaterad: "2026-10-19",
} as const;

export const LOKAL_FRAGOR: readonly Fraga[] = [
  {
    fraga: "Vad är lokal SEO?",
    svar: "Sökmotoroptimering för sökningar med en plats i, till exempel ”snickare Uppsala” eller ”frisör nära mig”. Målet är att synas både i Google Maps och i de vanliga sökresultaten när kunder i ert område letar.",
  },
  {
    fraga: "Hur fungerar lokal SEO?",
    svar: "Google väger relevans, avstånd och hur känt företaget är. Lokal SEO handlar om det ni kan påverka: en korrekt Google-företagsprofil, sidor som beskriver tjänsterna och orterna ni arbetar i, samma företagsuppgifter överallt och riktiga omdömen.",
  },
  {
    fraga: "Hur får vi vårt företag att synas på Google Maps?",
    svar: "Uppfyller företaget Googles krav skapar eller gör ni anspråk på en Google-företagsprofil och fyller i den fullständigt och korrekt. Sedan gäller det att hålla den uppdaterad och samla omdömen. En viss placering kan ingen garantera.",
  },
  {
    fraga: "Vad kostar lokal SEO?",
    svar: `Google-företagsprofilen sätter vi upp eller tar över för ${kr(PRIS.foretagsprofil)}. Hemsidan: en grundoptimering från ${kr(PRIS.grundoptimeringLiten)}, och därefter löpande SEO från ${kr(PRIS.synlighetBas)} per månad med nya lokala tjänstesidor varje månad. Flera orter eller språk får offert. ${MOMS_TEXT}`,
  },
  {
    fraga: "Hur lång tid tar det innan lokal SEO ger resultat?",
    svar: "Ändringar i Google-företagsprofilen syns ofta inom några dagar. Bättre placeringar i lokala sökresultat tar oftast flera månader och beror på konkurrensen i området.",
  },
  {
    fraga: "Är Google-företagsprofilen gratis?",
    svar: "Ja. Det kostar inget att skapa och sköta en Google-företagsprofil. Det ni eventuellt betalar för är hjälp att optimera och sköta den.",
  },
  {
    fraga: "Måste vi ha en fysisk butik för att synas på Google Maps?",
    svar: "Nej. Företag som besöker kunderna, som hantverkare och städfirmor, kan ha en profil med ett serviceområde i stället för en synlig adress. Google kräver däremot en verklig verksamhet med personlig kundkontakt.",
  },
  {
    fraga: "Kan vi synas i flera städer?",
    svar: "Hemsidan kan beskriva alla orter ni faktiskt arbetar i, gärna med en egen sida per ort när det finns något unikt att säga. Det ger däremot inte rätt till en företagsprofil per stad – profiler kräver en verklig närvaro på platsen.",
  },
  {
    fraga: "Kan ni få oss att ranka högre på Google Maps?",
    svar: "Vi kan förbättra profilen, hemsidan och företagets lokala närvaro, det som påverkar placeringen. Ingen kan garantera eller köpa en viss plats i Google Maps, och avståndet till sökaren går inte att optimera bort.",
  },
  {
    fraga: "Vad är skillnaden mellan lokal SEO och vanlig SEO?",
    svar: "Vanlig SEO riktar sig mot sökningar oavsett plats. Lokal SEO handlar om sökningar där platsen spelar roll, och lägger till Google-företagsprofilen, Google Maps och lokala omdömen.",
  },
  {
    fraga: "Behöver vi en hemsida för lokal SEO?",
    svar: "Det är inget krav för en företagsprofil, men en hemsida gör stor skillnad. Den beskriver tjänsterna och orterna utförligt och ger Google mer att gå på än profilen ensam.",
  },
  {
    fraga: "Vad är NAP?",
    svar: "Name, Address, Phone – företagsnamn, adress och telefonnummer. Uppgifterna ska vara exakt likadana på hemsidan, i företagsprofilen och i kataloger som Eniro och Hitta.",
  },
  {
    fraga: "Får man be kunder om recensioner?",
    svar: "Ja, och det bör ni. Men alla kunder ska få frågan, inte bara de nöjda, och ni får inte ge rabatter eller gåvor i utbyte. Köpta eller falska recensioner bryter mot Googles regler.",
  },
  {
    fraga: "Finns det bindningstid?",
    svar: `Företagsprofilen och grundoptimeringen är engångsjobb. För det löpande arbetet gäller: ${BINDNING_TEXT}`,
  },
  {
    fraga: "Hur kommer vi igång?",
    svar: "Boka en gratis genomgång på 20–25 minuter. Vi tittar på er företagsprofil, hemsidan och vilka lokala sökningar ni syns på i dag, och ni får ett förslag efteråt.",
  },
];
