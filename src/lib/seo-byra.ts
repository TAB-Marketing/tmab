// Landningssidan /seo-byra – sajtens sida för SEO-tjänsten.
// Ersätter /tjanster/seo (som omdirigeras hit). Priser hämtas från priser.ts – skriv aldrig
// belopp här.
import { BINDNING_TEXT, kr, MOMS_TEXT, PRIS, type Fraga } from "@/lib/priser";

export const SEO_BYRA = {
  sokvag: "/seo-byra",
  titel: "SEO-byrå",
  etikett: "Tjänst · SEO",
  seoTitel: "SEO-byrå för företag – anlita hjälp med SEO",
  seoBeskrivning: `Vill ni synas bättre på Google? TAB hjälper företag med teknisk SEO, sökordsanalys och innehåll som når rätt kunder. Från ${kr(PRIS.synlighetBas)}/mån.`,
  kortText:
    "Vad SEO är, vad vi gör, hur arbetet går till och vad sökmotoroptimering kostar för ett företag.",
  publicerad: "2026-10-19",
  uppdaterad: "2026-10-20",
} as const;

export const SEO_FRAGOR: readonly Fraga[] = [
  {
    fraga: "Vad gör en SEO-byrå?",
    svar: "En SEO-byrå hjälper företag att förbättra webbplatsens förutsättningar att synas i Googles vanliga sökresultat. Arbetet omfattar bland annat sökordsanalys, teknisk SEO, optimering av sidor och innehåll, internlänkning och uppföljning.",
  },
  {
    fraga: "Hur lång tid tar det innan SEO ger resultat?",
    svar: "Tekniska fel och otydliga sidtitlar kan ge effekt inom några veckor. Placeringar på konkurrensutsatta sökord tar oftast flera månader. Det beror på konkurrensen, hur sajten ser ut i dag och vilka åtgärder som görs – därför arbetar vi löpande varje månad.",
  },
  {
    fraga: "Vad kostar det att anlita en SEO-byrå?",
    svar: `Först en grundoptimering från ${kr(PRIS.grundoptimeringLiten)} som engångsjobb. Därefter löpande SEO och GEO: Bas ${kr(PRIS.synlighetBas)}, Mellan ${kr(PRIS.synlighetMellan)} eller Hög ${kr(PRIS.synlighetHog)} per månad, utan bindningstid. Nivån föreslår vi efter genomgången. ${MOMS_TEXT}`,
  },
  {
    fraga: "Kan SEO hjälpa småföretag att få fler kunder?",
    svar: "Ja. Ett mindre företag kan ofta synas på specifika sökningar – en tjänst i en viss stad, till exempel – där konkurrensen är lägre än på breda sökord. Hur många förfrågningar det blir beror på efterfrågan, konkurrensen och hur bra sajten är på att göra besökare till kunder.",
  },
  {
    fraga: "Vad är skillnaden mellan SEO och Google Ads?",
    svar: "Google Ads är betalda annonser där ni betalar för klicken och syns så länge budgeten räcker. SEO handlar om de vanliga sökresultaten – där betalar ni inget till Google per klick, men arbetet med att komma dit kostar tid eller pengar.",
  },
  {
    fraga: "Vad är teknisk SEO?",
    svar: "Teknisk SEO är det som gör att Google kan hitta, läsa och indexera sajten: laddningstid, mobilanpassning, sitemap, canonical-taggar, länkstruktur och att inga viktiga sidor är blockerade.",
  },
  {
    fraga: "Vad är lokal SEO?",
    svar: "Lokal SEO är arbetet med att synas när någon söker efter en tjänst i ett visst område, till exempel ”elektriker Uppsala”. Google-företagsprofilen, lokala sidor på hemsidan och omdömen spelar stor roll.",
  },
  {
    fraga: "Kan ni hjälpa oss att synas bättre på Google Maps?",
    svar: `Ja. Vi sätter upp eller tar över er Google-företagsprofil för ${kr(PRIS.foretagsprofil)} – verifiering, kategorier, tjänster, serviceområde och bilder – om företaget uppfyller Googles krav för en profil. En viss placering i Google Maps kan ingen garantera.`,
  },
  {
    fraga: "Behöver vi en ny hemsida för att jobba med SEO?",
    svar: "Nej, oftast går det att förbättra den hemsida ni har. Har sajten stora tekniska begränsningar eller en struktur som är svår att bygga vidare på kan en ny hemsida vara det bättre alternativet – det ser vi på genomgången.",
  },
  {
    fraga: "Kan ni kombinera SEO med GEO och synlighet i AI?",
    svar: "Ja. SEO och GEO bygger på samma grund – tydligt innehåll, korrekt företagsinformation och en tekniskt sund sajt – så vi gör dem tillsammans. Ingen kan garantera att ett företag nämns i ett AI-svar.",
  },
  {
    fraga: "Hur vet vi om SEO-arbetet fungerar?",
    svar: `Vi följer organiska klick, visningar i sökresultaten, utvecklingen för era viktigaste sidor och förfrågningar som kommer därifrån. Vi kopplar Google Search Console och Bing Webmaster Tools i ert eget namn, så att ni ser samma siffror som vi.`,
  },
  {
    fraga: "Erbjuder ni SEO-rådgivning och SEO-konsultation?",
    svar: `Ja. Första SEO-konsultationen är gratis: 20–25 minuter där vi tittar på er hemsida och hur ni syns i dag, och efteråt får ni ett förbättringsförslag. Vill ni genomföra ändringarna själva får ni en prioriterad åtgärdslista med instruktioner för ${kr(PRIS.grundoptimeringLista)}. Annars ingår rådgivningen i SEO-arbetet – ni har en kontaktperson och får varje prioritering förklarad.`,
  },
  {
    fraga: "Vad ingår i en SEO-analys?",
    svar: "En SEO-analys går igenom tekniken (indexering, laddtid, mobil, struktur), innehållet och sidtitlarna, vilka sökord ni syns på i dag och vilka ni borde synas på. Den kostnadsfria genomgången ger en första bild men är ingen fullständig SEO-audit – den görs i grundoptimeringen.",
  },
  {
    fraga: "Kan vi få SEO-hjälp till fast pris?",
    svar: `Ja. Grundoptimeringen kostar från ${kr(PRIS.grundoptimeringLiten)} som engångspris, och löpande SEO har fast månadspris från ${kr(PRIS.synlighetBas)}. Vi debiterar aldrig per timme. ${MOMS_TEXT}`,
  },
  {
    fraga: "Ska vi anlita en SEO-konsult eller en SEO-byrå?",
    svar: `Gränsen är flytande. En konsult anlitas ofta för en avgränsad analys eller rådgivning, en byrå för att också genomföra arbetet löpande. Hos oss kan ni välja: en åtgärdslista med instruktioner som ni genomför själva (${kr(PRIS.grundoptimeringLista)}), eller att vi gör grundoptimeringen och det löpande arbetet åt er.`,
  },
  {
    fraga: "Finns det någon bindningstid?",
    svar: BINDNING_TEXT,
  },
  {
    fraga: "Hur kommer vi igång med SEO hos TAB?",
    svar: "Boka en gratis genomgång på 20–25 minuter. Vi tittar på er hemsida och hur ni syns i dag, och ni får ett skräddarsytt förslag efteråt, utan kostnad.",
  },
];
