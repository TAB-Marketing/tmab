// Landningssidan /webbyra-goteborg – den enda ortssidan. Den finns för att TAB har sitt säte i
// Göteborg (Treatly AB, Svenslyckegatan 16) – inte för att ranka på en ort där vi inte finns.
// Bygg inga fler ortssidor utan verklig närvaro: Google räknar sådana sidor som spam
// ("doorway abuse"). Se claude/sajtstruktur.md i projektet.
//
// Fakta som sidan bygger på (bekräftade av TAB 2026-10-20):
// - säte i Göteborg; arbetar med företag i hela Göteborg och Västra Götaland (och resten av Sverige)
// - möten sker oftast digitalt eller på telefon; TAB åker ut till kunder i Göteborg och
//   kranskommunerna (Mölndal, Partille, Kungälv, Härryda, Lerum, Ale) om de vill ses på plats
// - inga besök på adressen (säte, inte kontor)
// Ändras något av det: uppdatera texterna här och på sidan.
//
// Google-företagsprofil: TAB är ett serviceområdesföretag (åker ut till kunderna). Adressen ska
// vara dold i profilen; serviceområdet = kommunerna ovan. Sajten och profilen ska säga samma sak.
// Priser hämtas från priser.ts – det finns inga särskilda Göteborgspriser.
import { AGANDE_TEXT, kr, MOMS_TEXT, PRIS, type Fraga } from "@/lib/priser";

export const WEBBYRA_GOTEBORG = {
  sokvag: "/webbyra-goteborg",
  titel: "Webbyrå Göteborg",
  etikett: "Tjänst · Göteborg",
  seoTitel: "Webbyrå i Göteborg – webbdesign för företag",
  seoBeskrivning: `Söker ni en webbyrå i Göteborg? TAB har säte i Göteborg och bygger moderna, mobilanpassade hemsidor åt företag i hela Sverige från ${kr(PRIS.tjanstesida)}.`,
  kortText:
    "Vår webbyrå finns i Göteborg. Vad vi gör för företag i Göteborg och Västra Götaland, hur samarbetet går till och vad det kostar.",
  publicerad: "2026-10-20",
  uppdaterad: "2026-10-20",
} as const;

/** Orterna sidan nämner – samma lista i text och strukturerad data. Bara där TAB arbetar. */
export const OMRADEN = [
  { typ: "City", namn: "Göteborg" },
  { typ: "AdministrativeArea", namn: "Västra Götalands län" },
] as const;

export const GOTEBORG_FRAGOR: readonly Fraga[] = [
  {
    fraga: "Vad kostar en webbyrå i Göteborg?",
    svar: `Hos oss kostar en tjänstesida ${kr(PRIS.tjanstesida)} och en e-handel ${kr(PRIS.ehandel)}, även som avbetalning på 12 månader. Drift efter lansering finns från ${kr(PRIS.essential)} per månad. Priset är detsamma i Göteborg som i resten av Sverige. ${MOMS_TEXT}`,
  },
  {
    fraga: "Har TAB ett kontor i Göteborg?",
    svar: "TAB drivs av Treatly AB, som har sitt säte på Svenslyckegatan 16 i Göteborg. Där tar vi inte emot besök. De flesta möten tar vi på video eller telefon, och vill ni ses på plats kommer vi ut till er i Göteborgsområdet.",
  },
  {
    fraga: "Kan vi träffas fysiskt?",
    svar: "Ja. Vi kommer gärna ut till er i Göteborg och kranskommunerna – Mölndal, Partille, Kungälv, Härryda, Lerum och Ale. Många väljer ändå video eller telefon, eftersom det går snabbare att boka och vi kan visa förslag och utkast på skärmen.",
  },
  {
    fraga: "Kan ni bygga en hemsida åt vårt företag i Göteborg?",
    svar: "Ja. Vi bygger hemsidor åt företag i hela Göteborg och Västra Götaland, från enskilda firmor och nystartade bolag till växande företag.",
  },
  {
    fraga: "Kan ni modernisera en hemsida vi redan har?",
    svar: `Ja. Ofta räcker det att förbättra design, mobilanpassning, innehåll och kontaktvägar i den sajt ni har. Fräscha upp är offert från ${kr(PRIS.modernisering)}.`,
  },
  {
    fraga: "Behöver vi en webbyrå som finns i Göteborg?",
    svar: "Det viktigaste är att byrån förstår vad ni gör och att kommunikationen fungerar. En byrå i samma region kan kännas tryggare, men själva arbetet går lika bra på distans: möten, utkast och ändringar sköts digitalt oavsett var byrån finns.",
  },
  {
    fraga: "Kan ni hjälpa oss att synas på Google i Göteborg?",
    svar: "Ja. Hemsidan får en SEO-grund, och vill ni synas för lokala sökningar som en tjänst i Göteborg kan vi arbeta med lokal SEO och er Google-företagsprofil. Någon viss placering kan ingen garantera.",
  },
  {
    fraga: "Vad är skillnaden mellan webbdesign och webbutveckling?",
    svar: "Webbdesign är hur sajten ser ut och hur den är att använda. Webbutveckling är att bygga den – koden och funktionerna som gör att den fungerar och laddar snabbt. Vi gör båda.",
  },
  {
    fraga: "Kan vi få kontaktformulär, offertformulär eller bokning?",
    svar: "Ja. Formulären utformar vi efter vad ni behöver veta för att kunna svara. Ska kunderna boka tid kan vi bygga ett bokningsformulär eller koppla in det bokningssystem ni redan använder.",
  },
  {
    fraga: "Vem äger hemsidan när den är klar?",
    svar: `Ni. ${AGANDE_TEXT}`,
  },
  {
    fraga: "Arbetar ni bara med företag i Göteborg?",
    svar: "Nej. Vi finns i Göteborg men arbetar med företag i hela Sverige – utanför Göteborgsområdet tar vi mötena digitalt, och då spelar det ingen roll var ni finns.",
  },
  {
    fraga: "Hur kommer vi igång?",
    svar: "Boka en gratis genomgång. Vi hör av oss inom en arbetsdag och bokar in 20–25 minuter på video, telefon eller hos er. Efteråt får ni ett förslag med upplägg och pris.",
  },
];
