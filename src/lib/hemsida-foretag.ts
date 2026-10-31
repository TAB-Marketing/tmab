// Landningssidan /hemsida-foretag – sajtens sida för att bygga hemsidor åt företag.
// Ersätter /tjanster/hemsida (som omdirigeras hit). Enda källan för sidan, kortet på /guider
// och vanliga frågor i llms.txt. Priser hämtas från priser.ts – skriv aldrig belopp här.
import { AGANDE_TEXT, kr, MOMS_TEXT, PRIS, type Fraga } from "@/lib/priser";

export const HEMSIDA_FORETAG = {
  sokvag: "/hemsida-foretag",
  /** Kort namn i listor, brödsmulor och sitemap. */
  titel: "Hemsida till företag",
  etikett: "Tjänst · Ny hemsida",
  /** Sidans titel i sökresultat, utan företagsnamn (läggs till automatiskt). */
  seoTitel: `Hemsida till företag – från ${kr(PRIS.tjanstesida)}`,
  /** Max ca 155 tecken. */
  seoBeskrivning: `Ny hemsida till företaget? TAB bygger moderna, mobilanpassade hemsidor för småföretag och växande företag från ${kr(PRIS.tjanstesida)} exkl. moms, även som avbetalning. Boka gratis genomgång.`,
  /** Text på kortet under /guider. */
  kortText:
    "Vad en bra företagshemsida behöver, vad som ingår när vi bygger den, hur det går till och vad det kostar.",
  publicerad: "2026-10-19",
  uppdaterad: "2026-10-20",
} as const;

export const HEMSIDA_FRAGOR: readonly Fraga[] = [
  {
    fraga: "Vad kostar det att skapa en hemsida till ett företag?",
    svar: `En tjänstesida med upp till 5 sidor kostar ${kr(PRIS.tjanstesida)} och en e-handel ${kr(PRIS.ehandel)}, eller ${kr(PRIS.tjanstesidaManad)} respektive ${kr(PRIS.ehandelManad)} per månad i 12 månader. Mer avancerade sajter – bokning, flera språk, inloggning – får offert från ${kr(PRIS.webbSkraddarsytt)}. Efter lansering tar ni över sajten, eller låter oss sköta driften från ${kr(PRIS.essential)} per månad. ${MOMS_TEXT}`,
  },
  {
    fraga: "Hur lång tid tar det att bygga en företagshemsida?",
    svar: "Det beror på hur stor sajten är, vilka funktioner den ska ha och hur snabbt texter och bilder finns på plats. Ni får en tidplan att godkänna innan vi börjar bygga, så att ni vet vad som händer och när.",
  },
  {
    fraga: "Kan ni hjälpa ett nystartat företag med hemsida?",
    svar: "Ja. För ett nytt företag är hemsidan ofta det första kunderna ser. Vi hjälper er att presentera vad ni erbjuder, bygga förtroende från start och göra det enkelt att ta kontakt, även om ni ännu inte har texter eller bilder klara.",
  },
  {
    fraga: "Kan ni bygga en hemsida åt ett småföretag eller en enskild firma?",
    svar: "Ja, åt enskilda firmor, mindre aktiebolag och nystartade företag. Vi anpassar antalet sidor, innehållet och funktionerna efter verksamheten och budgeten. Ett mindre företag behöver sällan en stor sajt – det viktiga är att besökaren snabbt förstår vad ni erbjuder och hur man tar kontakt.",
  },
  {
    fraga: "Vad ska finnas på en hemsida för ett småföretag?",
    svar: "En startsida som säger vad ni gör och för vem, en beskrivning av tjänsterna, var ni är verksamma, kontaktuppgifter och ett enkelt sätt att höra av sig – ett kontakt-, offert- eller bokningsformulär. Sajten ska fungera på mobilen och ha en SEO-grund så att Google förstår den. Mer än så behövs sällan i början.",
  },
  {
    fraga: "Finns det billiga hemsidor för småföretag?",
    svar: `Vår tjänstesida, med upp till 5 sidor, kostar ${kr(PRIS.tjanstesida)}. Skillnaden mellan en billig och en dyr hemsida sitter sällan i utseendet utan i vad som ingår: antal sidor, texter och bilder, funktioner och vem som äger sajten och kontona efteråt. Jämför därför vad som ingår, inte bara priset. ${MOMS_TEXT}`,
  },
  {
    fraga: "Är hemsidorna mobilanpassade?",
    svar: "Ja. Vi bygger med responsiv design och testar hemsidan på mobil, surfplatta och dator innan lansering. För många företag kommer en stor del av besökarna från mobilen, så det är där vi börjar.",
  },
  {
    fraga: "Kan vi få en hemsida med kontaktformulär, offertformulär eller bokning?",
    svar: "Ja. Kontakt- och offertformulär utformar vi efter vad ni behöver veta för att kunna svara, så att förfrågningarna innehåller det ni behöver. Ska kunderna boka tid kan vi bygga ett bokningsformulär eller koppla in det bokningssystem ni redan använder. Vad som ingår står i förslaget.",
  },
  {
    fraga: "Kan ni förbättra vår befintliga hemsida i stället för att bygga en ny?",
    svar: `Ja. Ibland räcker det att förbättra den sajt ni redan har – modernisering är offert från ${kr(PRIS.modernisering)}. Vi går igenom vad som lönar sig mest för er på den kostnadsfria genomgången.`,
  },
  {
    fraga: "Är hemsidan sökmotoroptimerad?",
    svar: `En SEO-grund ingår: sidstruktur, rubriker, sidtitlar och beskrivningar, sitemap, snabb laddning och mobilanpassning. Det gör att Google kan förstå och visa sidorna. Placeringar i sökresultaten kan ingen garantera – löpande SEO kostar från ${kr(PRIS.synlighetBas)} per månad, och har vi byggt sajten behövs ingen grundoptimering först.`,
  },
  {
    fraga: "Ingår cookiebanner och integritetspolicy?",
    svar: "Ja, när sajten behöver det. Ska den använda till exempel Meta-pixeln eller statistik med cookies sätter vi upp en cookiebanner som väntar på besökarens ja, och en integritetspolicy som beskriver varje verktyg. Använder sajten inget sådant behövs ingen banner.",
  },
  {
    fraga: "Kan ni hjälpa till med domän och publicering?",
    svar: "Ja. Vi går igenom vilken domän och vilket webbhotell som passar och publicerar hemsidan enligt det vi kommit överens om. Domänen och kontona registreras i ert namn – vi får bara åtkomst.",
  },
  {
    fraga: "Behöver vi redan ha texter och bilder?",
    svar: `Nej. Texterna skriver vi utifrån ett formulär ni fyller i. Bilder använder vi era egna, eller tar fram nya i Studio, till exempel 10 bilder för ${kr(PRIS.bilder10)}.`,
  },
  {
    fraga: "Vad är skillnaden mellan webbdesign och webbutveckling?",
    svar: "Webbdesign är hur sajten ser ut och hur den är att använda. Webbutveckling är att bygga den – koden, funktionerna och tekniken som gör att den fungerar och laddar snabbt. Vi gör båda.",
  },
  {
    fraga: "Hur väljer vi rätt webbyrå?",
    svar: "Titta på byråns tidigare sajter, be om ett skriftligt förslag på vad som ingår, fråga vem som äger sajten och kontona efteråt och vad det kostar att ändra den senare. Välj den som passar er, inte den med flest funktioner.",
  },
  {
    fraga: "Vem äger hemsidan när den är klar?",
    svar: `Ni. ${AGANDE_TEXT} Om ni någon gång vill byta leverantör tar ni med er allt.`,
  },
  {
    fraga: "Hur beställer vi en hemsida?",
    svar: "Börja med att boka en gratis genomgång på 20–25 minuter. Vi går igenom era mål och önskemål och skickar sedan ett förslag med upplägg och pris. Säger ni ja tar vi fram underlaget, och när ni godkänt det börjar vi bygga.",
  },
];
