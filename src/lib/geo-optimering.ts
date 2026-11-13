// Landningssidan /geo-optimering – GEO (Generative Engine Optimization) som tjänst.
// Ersätter /tjanster/geo (som omdirigeras hit, se `tjanst` i landningssidor.ts) – en sida per
// sökavsikt. Guiden /guider/vad-ar-geo förklarar och "gör själv"; den här sidan säljer tjänsten.
// Priser hämtas från priser.ts – skriv aldrig belopp här.
//
// Faktauppgifter om Google, OpenAI och Bing kontrollerade 2026-10-20 mot:
// - developers.google.com/search/docs/appearance/ai-features (inga extra krav för AI Overviews
//   och AI Mode; inga särskilda AI-filer eller särskild schema-markering)
// - developers.openai.com/docs/gptbot (OAI-SearchBot = ChatGPT-sök, GPTBot = träning)
// - Bing Webmaster Tools AI Performance (citeringar i Copilot, inte klick; public preview feb 2026)
// Kontrollera igen när sidan uppdateras – de här tjänsterna ändras ofta.
//
// GEO säljs inte separat – det ingår i Synlighet (priser.ts), där nya sidor och AI-koll ingår.
import { BINDNING_TEXT, kr, MOMS_TEXT, PRIS, type Fraga } from "@/lib/priser";

export const GEO_OPTIMERING = {
  sokvag: "/geo-optimering",
  titel: "GEO-optimering",
  etikett: "Tjänst · GEO",
  seoTitel: "GEO-optimering & AI-sökoptimering för företag",
  seoBeskrivning: `Vill ni synas i ChatGPT och AI-sök? TAB hjälper företag med GEO-optimering: innehåll, teknik och företagsinformation. Från ${kr(PRIS.synlighetBas)}/mån.`,
  kortText:
    "Vad GEO är, hur AI-sök hittar information, vad vi gör, hur det mäts och vad GEO-optimering kostar.",
  publicerad: "2026-10-20",
  uppdaterad: "2026-10-20",
} as const;

export const GEO_FRAGOR: readonly Fraga[] = [
  {
    fraga: "Vad är GEO-optimering?",
    svar: "GEO står för Generative Engine Optimization. Det är arbetet med att göra ett företags innehåll och information lätt att hitta, förstå och använda för AI-baserade söktjänster som ChatGPT, Googles AI-översikter och Copilot.",
  },
  {
    fraga: "Vad är skillnaden mellan SEO och GEO?",
    svar: "SEO handlar om de vanliga sökresultaten i Google och Bing. GEO handlar om svaren som AI-tjänster sammanställer. Grunden – relevant innehåll, en sajt som går att läsa och korrekta uppgifter om företaget – är densamma, så vi gör dem tillsammans.",
  },
  {
    fraga: "Hur får vi vårt företag att synas i ChatGPT?",
    svar: "Börja med att sajten är offentligt tillgänglig, beskriver verksamheten tydligt och inte blockerar OAI-SearchBot, roboten ChatGPT använder för sin sökfunktion. Det förbättrar möjligheten att bli hittad, men styr inte vad ChatGPT svarar.",
  },
  {
    fraga: "Vad är ChatGPT-SEO eller ChatGPT-optimering?",
    svar: "Det är GEO med fokus på ChatGPT: att optimera företagets sajt och information så att ChatGPT kan hitta, förstå och hänvisa till den när den söker på webben. Hos oss ingår det i samma arbete som SEO och GEO.",
  },
  {
    fraga: "Kan ni garantera att vi rekommenderas av ChatGPT?",
    svar: "Nej, och det kan ingen. Vilka företag och källor som nämns beror på frågan, användaren, tidpunkten och tjänstens egna system, och svaren varierar.",
  },
  {
    fraga: "Behöver vi GEO om vi redan arbetar med SEO?",
    svar: "Det mesta av GEO bygger på bra SEO. Det som tillkommer är fokus på tydliga svar på kundernas frågor, korrekt företagsinformation på fler ställen än er egen sajt och uppföljning av AI-tjänsterna. Hos oss ingår det i samma arbete.",
  },
  {
    fraga: "Vad kostar GEO-optimering?",
    svar: `GEO ingår i Synlighet tillsammans med SEO – det finns inget separat GEO-pris. Först en grundoptimering från ${kr(PRIS.grundoptimeringLiten)}, sedan löpande från ${kr(PRIS.synlighetBas)} per månad med AI-koll i varje rapport. Vad ChatGPT svarar om er i dag visar vi gratis i genomgången. ${MOMS_TEXT}`,
  },
  {
    fraga: "Hur lång tid tar det innan GEO ger resultat?",
    svar: "Det finns ingen generell tidsram. Tekniska hinder kan tas bort direkt, men hur ofta ni nämns eller citeras beror på söktjänsterna och kan ändras över tid. Ingen specifik effekt kan garanteras.",
  },
  {
    fraga: "Vad är AI SEO?",
    svar: "AI SEO används ibland om SEO-arbete som tar hänsyn till AI-baserade sökfunktioner. Termen används på olika sätt och överlappar till stor del med GEO.",
  },
  {
    fraga: "Vad är AEO?",
    svar: "AEO står för Answer Engine Optimization: att göra innehåll användbart för tjänster som svarar direkt på frågor. Begreppet överlappar med både SEO och GEO.",
  },
  {
    fraga: "Vad är Google AI Overviews?",
    svar: "AI Overviews, på svenska AI-översikter, är AI-genererade sammanfattningar som Google visar överst i vissa sökningar, med länkar till källorna.",
  },
  {
    fraga: "Kan företag synas i Google AI Mode?",
    svar: "Ja. AI Mode kan visa länkar till webbplatser. Enligt Google ska sidan vara indexerad och kunna visas med ett utdrag i Google Sök – det finns inga extra krav utöver det. Att en sida visas är inte garanterat.",
  },
  {
    fraga: "Behöver vi ett särskilt AI-schema eller en AI-fil för GEO?",
    svar: "Nej. Google skriver uttryckligen att det inte behövs någon särskild strukturerad data eller några AI-filer för AI-översikter och AI Mode. Vanlig strukturerad data kan beskriva företag och tjänster, men den måste stämma med det som syns på sidan.",
  },
  {
    fraga: "Vad är OAI-SearchBot?",
    svar: "OAI-SearchBot är roboten OpenAI använder för ChatGPT:s sökfunktion. Blockeras den i robots.txt visas sajten inte i ChatGPT:s sökresultat. Den är skild från GPTBot, som samlar träningsdata – de två kan styras var för sig.",
  },
  {
    fraga: "Kan småföretag arbeta med GEO?",
    svar: "Ja. För ett mindre företag är grunderna oftast det som ger mest: en sajt som tydligt säger vad ni gör, var, för vem och vad det kostar, och samma uppgifter överallt där ni finns.",
  },
  {
    fraga: "Hur mäter man synlighet i AI-sökmotorer?",
    svar: "Med flera metoder: Bing Webmaster Tools visar hur ofta sajten citeras i Copilot, er statistik visar besök från AI-tjänster, och vi ställer samma frågor i AI-tjänsterna och antecknar svaren. Ingen av dem motsvarar en placering i Google.",
  },
  {
    fraga: "Är GEO bättre än vanlig SEO?",
    svar: "Nej, det är ett komplement. De flesta kunder hittar fortfarande företag via vanliga sökresultat. Därför börjar vi med SEO-grunden och lägger GEO ovanpå.",
  },
  {
    fraga: "Kan GEO ge oss fler kunder?",
    svar: "Det kan ge fler tillfällen där potentiella kunder upptäcker er. Synlighet blir inte automatiskt förfrågningar – sajten måste också övertyga när besökaren väl kommer dit.",
  },
  {
    fraga: "Finns det någon bindningstid?",
    svar: BINDNING_TEXT,
  },
  {
    fraga: "Hur kommer vi igång med GEO hos TAB?",
    svar: "Boka en gratis genomgång på 20–25 minuter. Vi tittar på er sajt och hur ni beskrivs i AI-tjänsterna i dag, och ni får ett förslag efteråt.",
  },
];
