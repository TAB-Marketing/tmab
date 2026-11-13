// Landningssidan /sokmotoroptimering – huvudsidan om hur SEO fungerar.
// Sökavsikten är att förstå (sökningen "sökmotoroptimering" ger förklarande sidor), till
// skillnad från /seo-byra där avsikten är att anlita (sökningen "SEO byrå" ger listor över
// byråer). Sidan förklarar och leder vidare till /seo-byra. Priser hämtas från priser.ts.
import { BINDNING_TEXT, GSC_SVAR, kr, MOMS_TEXT, PRIS, type Fraga } from "@/lib/priser";

export const SOKMOTOROPTIMERING = {
  sokvag: "/sokmotoroptimering",
  titel: "Sökmotoroptimering",
  etikett: "Kunskap · SEO",
  seoTitel: "Sökmotoroptimering (SEO) – så fungerar det",
  seoBeskrivning:
    "Vad är sökmotoroptimering och hur fungerar SEO? Teknik, sökord, innehåll och länkar förklarat, och hur TAB hjälper företag att synas på Google.",
  kortText:
    "Hur Google hittar, läser och rankar sidor, och vad teknisk SEO, on-page, off-page och sökordsanalys betyder i praktiken.",
  publicerad: "2026-10-20",
  uppdaterad: "2026-10-20",
} as const;

export const SOKMOTOROPTIMERING_FRAGOR: readonly Fraga[] = [
  {
    fraga: "Vad är sökmotoroptimering?",
    svar: "Arbetet med att förbättra en webbplats teknik, innehåll och struktur så att sökmotorer kan hitta och förstå den, och visa den för relevanta sökningar i de vanliga, obetalda resultaten.",
  },
  {
    fraga: "Vad betyder SEO?",
    svar: "Search Engine Optimization – sökmotoroptimering på svenska.",
  },
  {
    fraga: "Hur fungerar sökmotoroptimering?",
    svar: "Google hittar sidor via länkar och webbplatskartor, läser och sparar dem i sitt index och väljer sedan vilka som visas för varje sökning. SEO gör varje steg lättare: sidorna går att hitta och läsa, innehållet svarar på det folk söker och andra sajter hänvisar till er.",
  },
  {
    fraga: "Vad kostar sökmotoroptimering?",
    svar: `Hos oss kostar en grundoptimering av SEO och GEO från ${kr(PRIS.grundoptimeringLiten)} som engångsjobb. Löpande SEO och GEO kostar från ${kr(PRIS.synlighetBas)} per månad. ${BINDNING_TEXT} ${MOMS_TEXT}`,
  },
  {
    fraga: "Hur lång tid tar SEO?",
    svar: "Tekniska fel och otydliga sidtitlar kan ge effekt inom några veckor. Placeringar på konkurrensutsatta sökord tar oftast flera månader eller längre. Ingen kan lova en tidpunkt eller en placering.",
  },
  {
    fraga: "Kan man göra SEO själv?",
    svar: "Ja, mycket av grunden: tydliga sidtitlar, en sida per tjänst, bra texter och länkar mellan sidorna. Teknisk felsökning, sökordsstrategi och löpande uppföljning tar mer tid och kunskap – det är där en byrå brukar göra störst skillnad.",
  },
  {
    fraga: "Hur får jag min hemsida högre upp på Google?",
    svar: "Ta reda på vad kunderna söker på, se till att sidan kan indexeras, skriv innehåll som svarar bättre än konkurrenterna och få andra relevanta sajter att länka till er. En viss placering kan ingen garantera.",
  },
  {
    fraga: "Vad är teknisk SEO?",
    svar: "Det som avgör om Google kan hitta, läsa och indexera sajten: indexering, sitemap, canonical-taggar, mobilanpassning, laddningstid och länkstruktur.",
  },
  {
    fraga: "Vad är on-page SEO?",
    svar: "Optimering av varje enskild sida: sidtitel, beskrivning, rubriker, text, bilder, URL och interna länkar.",
  },
  {
    fraga: "Vad är off-page SEO?",
    svar: "Det som händer utanför er egen sajt: länkar och omnämnanden från andra webbplatser, branschregister och samarbeten.",
  },
  {
    fraga: "Vad är skillnaden mellan SEO och SEM?",
    svar: "SEO är arbetet med de obetalda sökresultaten. SEM, Search Engine Marketing, betyder sökmarknadsföring och används oftast om betalda sökannonser, ibland om båda delarna tillsammans.",
  },
  {
    fraga: "Behöver småföretag SEO?",
    svar: "Om kunderna använder Google för att hitta det ni erbjuder – ja. Ett mindre företag vinner ofta på specifika sökningar, till exempel en tjänst i en viss stad, där konkurrensen är lägre.",
  },
  {
    fraga: "Vad är en sökordsanalys?",
    svar: "En genomgång av vilka ord och frågor folk använder på Google, hur många som söker, vad de vill uppnå och hur svårt det är att synas, kopplat till det ert företag erbjuder.",
  },
  {
    fraga: "Vad är en meta description?",
    svar: "En kort beskrivning av sidan som Google kan visa under titeln i sökresultatet. Den påverkar om folk klickar, men Google väljer ibland en annan text från sidan.",
  },
  {
    fraga: "Vad är en sitemap?",
    svar: "En lista över sajtens viktiga adresser som hjälper sökmotorer att hitta dem. Den garanterar inte att sidorna indexeras.",
  },
  {
    fraga: "Hur mäter man SEO-resultat?",
    svar: `Med organiska klick, visningar i sökresultaten, vilka sidor som indexeras och förfrågningar som kommer från Google. ${GSC_SVAR}`,
  },
  {
    fraga: "Kan SEO ge oss fler kunder?",
    svar: "Det kan göra att fler som söker efter det ni erbjuder hittar er. Hur många som blir kunder beror också på erbjudandet, priset, hemsidan och konkurrensen.",
  },
  {
    fraga: "Vad är skillnaden mellan SEO och GEO?",
    svar: "SEO handlar om de vanliga sökresultaten på Google. GEO handlar om att bli förstådd och nämnd av AI-tjänster som ChatGPT. Grunden är delvis densamma – tydligt innehåll, korrekta uppgifter och trovärdiga källor, men bra SEO garanterar inte att ett företag nämns i AI-svar.",
  },
  {
    fraga: "Hur kommer vi igång med SEO hos TAB?",
    svar: "Boka en gratis genomgång på 20–25 minuter. Vi tittar på er hemsida och hur ni syns i dag, och ni får ett förslag på vad som bör göras först.",
  },
];
