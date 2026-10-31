// Landningssidan /modernisera-hemsida – förbättra, uppdatera och designa om en befintlig hemsida.
// Ersätter /tjanster/hemsideoptimering (som omdirigeras hit, se `tjanst` i landningssidor.ts) –
// en sida per sökavsikt. Skild från /hemsida-foretag (beställa en ny hemsida).
// Priser hämtas från priser.ts – skriv aldrig belopp här.
//
// TODO(TAB): riktiga före/efter-exempel. Sidan visar i dag en tydligt märkt illustration.
// Får ni moderniseringsprojekt som kunden godkänner att visa: lägg till skärmbilder före och
// efter, vad som ändrades och – om ni har dem – mätbara resultat.
import { AGANDE_TEXT, kr, MOMS_TEXT, PRIS, type Fraga } from "@/lib/priser";

export const MODERNISERA_HEMSIDA = {
  sokvag: "/modernisera-hemsida",
  titel: "Modernisera hemsida",
  etikett: "Tjänst · Befintlig hemsida",
  seoTitel: "Modernisera hemsida – uppdatera och förbättra",
  seoBeskrivning: `Behöver ni modernisera er hemsida? TAB uppdaterar design, mobilanpassning, hastighet och funktioner i den sajt ni har. Offert från ${kr(PRIS.modernisering)}.`,
  kortText:
    "Tecken på att hemsidan behöver uppdateras, vad som går att förbättra, när det är bättre att bygga nytt och vad det kostar.",
  publicerad: "2026-10-20",
  uppdaterad: "2026-10-20",
} as const;

/** Plattformar vi moderniserar i (alltid offert). Webbshoppar ingår inte – vi bygger inga. */
export const PLATTFORMAR = [
  "WordPress",
  "Webflow",
  "Wix",
  "Squarespace",
  "egenbyggda sajter",
] as const;

export const MODERNISERA_FRAGOR: readonly Fraga[] = [
  {
    fraga: "Vad innebär det att modernisera en hemsida?",
    svar: "Att förbättra den sajt ni redan har så att den motsvarar företaget och besökarna i dag – design, mobilanpassning, hastighet, innehåll och funktioner – utan att nödvändigtvis bygga om allt.",
  },
  {
    fraga: "Kan ni uppdatera vår befintliga hemsida?",
    svar: `Ja. Vi arbetar i den plattform sajten redan finns i – ${PLATTFORMAR.join(", ")}. På genomgången ser vi vad som går att förbättra med den teknik ni har.`,
  },
  {
    fraga: "Vad kostar det att modernisera en hemsida?",
    svar: `Fräscha upp är alltid offert, från ${kr(PRIS.modernisering)}, eftersom det beror på sajtens skick och plattform. Ni får ett fast pris efter genomgången, och bygget har alltid fast pris. ${MOMS_TEXT}`,
  },
  {
    fraga: "Måste vi bygga en helt ny hemsida?",
    svar: `Oftast inte – design, innehåll och funktioner går ofta att förbättra i den sajt ni har. Är tekniken för begränsad kan en ny hemsida vara bättre på sikt, och då säger vi det. En ny tjänstesida kostar ${kr(PRIS.tjanstesida)}.`,
  },
  {
    fraga: "Kan ni förbättra designen utan att ändra hela hemsidan?",
    svar: "Ja, i de flesta plattformar går layout, typsnitt, färger, bilder och komponenter att uppdatera utan att ersätta sajten.",
  },
  {
    fraga: "Kan ni göra vår hemsida mobilanpassad?",
    svar: "Vi går igenom hur sajten fungerar på mobil och surfplatta och rättar till layout, textstorlek, knappar och meny där det behövs. Hur långt det går beror på plattformen.",
  },
  {
    fraga: "Kan en modernisering förbättra SEO?",
    svar: "Den kan rätta tekniska fel och göra innehåll och struktur tydligare. Men ändrade adresser eller borttaget innehåll kan också försämra synligheten – därför planerar vi omdirigeringar och följer upp i Search Console efteråt.",
  },
  {
    fraga: "Vad händer med vår Google-ranking om vi gör om hemsidan?",
    svar: "Större förändringar kan påverka den. Vi kartlägger sidorna som ger trafik i dag, behåller eller omdirigerar deras adresser och kontrollerar indexeringen efter lansering. Någon placering kan ingen garantera eller lova att bevara.",
  },
  {
    fraga: "Hur lång tid tar det att göra om en hemsida?",
    svar: "Det beror på hur mycket som ska ändras, plattformen och hur snabbt texter och bilder finns på plats. Ni får en tidplan i förslaget.",
  },
  {
    fraga: "Kan vi behålla vår domän?",
    svar: "Ja. Domänen är er och följer med. Byter sajten webbhotell eller plattform planerar vi flytten så att adresserna fortsätter fungera.",
  },
  {
    fraga: "Kan vi behålla våra texter och bilder?",
    svar: "Ja, det som fungerar behåller vi. Vi föreslår vad som bör skrivas om eller bytas. Nya texter skriver vi, och nya bilder kan ni köpa till i Studio.",
  },
  {
    fraga: "Kan ni göra hemsidan snabbare?",
    svar: "Vi mäter laddtiden, hittar vad som gör sidan långsam – ofta för stora bilder, onödiga tillägg eller tunga typsnitt – och åtgärdar det. Resultatet beror på plattformen.",
  },
  {
    fraga: "Kan vi få ett nytt kontaktformulär?",
    svar: "Ja. Vi kan förbättra eller lägga till kontakt-, offert- eller bokningsformulär, utformade efter vad ni behöver veta för att kunna svara.",
  },
  {
    fraga: "Vad är skillnaden mellan redesign och en ny hemsida?",
    svar: "En redesign förbättrar den sajt ni har, i samma plattform. En ny hemsida byggs från grunden, rätt val när den gamla tekniken inte går att bygga vidare på.",
  },
  {
    fraga: "Vem äger hemsidan efteråt?",
    svar: `Ni. ${AGANDE_TEXT}`,
  },
  {
    fraga: "Hur kommer vi igång?",
    svar: "Boka en gratis genomgång och skicka med adressen till er hemsida. Vi går igenom den och ni får ett förslag med vad som bör göras och vad det kostar.",
  },
];
