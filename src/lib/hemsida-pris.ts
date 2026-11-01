// Landningssidan /hemsida-pris – vad en hemsida kostar hos TAB.
// Varje belopp kommer från priser.ts och räknas ut här, så att sidan aldrig visar ett pris som
// inte står i prislistan. Skild från /hemsida-foretag (tjänsten).
//
// TODO(TAB): vid överlämning betalar kunden hosting själv. En kommersiell sajt på Vercel kräver
// Pro-planen (Hobby är bara för icke-kommersiellt bruk) – bestäm vad ni rekommenderar kunden.
import {
  AGANDE_TEXT,
  ANDRINGAR_TEXT,
  AVBETALNING_TEXT,
  BETALNING_TEXT,
  BINDNING_TEXT,
  DOMAN_TEXT,
  kr,
  MOMS_TEXT,
  PRIS,
  type Fraga,
} from "@/lib/priser";

export const HEMSIDA_PRIS = {
  sokvag: "/hemsida-pris",
  titel: "Hemsida pris",
  etikett: "Pris · Hemsida",
  seoTitel: "Vad kostar en hemsida för företag? Våra priser",
  seoBeskrivning: `Vad kostar en hemsida till företag? Hos TAB: tjänstesida ${kr(PRIS.tjanstesida)}, e-handel ${kr(PRIS.ehandel)}, även som avbetalning. Drift från ${kr(PRIS.essential)}/mån eller ta över själva.`,
  kortText:
    "Vad en företagshemsida kostar hos oss, vad som ingår, löpande kostnader och vad ni betalar totalt första året.",
  publicerad: "2026-10-19",
  uppdaterad: "2026-10-31",
} as const;

/** Årskostnad hos oss: bygget + tolv månader drift. Moms ingår inte. */
export const ARSKOSTNAD = [
  {
    namn: "Tjänstesida, ni tar över",
    start: PRIS.tjanstesida,
    perManad: 0,
    beskrivning:
      "Upp till 5 sidor. Ni får koden och kontona; hosting och domän betalar ni direkt till leverantören.",
  },
  {
    namn: "Tjänstesida + Essential",
    start: PRIS.tjanstesida,
    perManad: PRIS.essential,
    beskrivning: "Vi sköter hosting, domän, säkerhet och backup.",
  },
  {
    namn: "Tjänstesida + Total",
    start: PRIS.tjanstesida,
    perManad: PRIS.total,
    beskrivning: "Allt i Essential, plus upp till en timme ändringar varje månad.",
  },
  {
    namn: "E-handel + Total",
    start: PRIS.ehandel,
    perManad: PRIS.total,
    beskrivning:
      "Egen butik kopplad till Shopify. Shopify-abonnemanget tillkommer, direkt till Shopify.",
  },
].map((r) => ({ ...r, forstaAret: r.start + 12 * r.perManad, darefter: 12 * r.perManad }));

export const HEMSIDA_PRIS_FRAGOR: readonly Fraga[] = [
  {
    fraga: "Vad kostar en hemsida till företag?",
    svar: `Hos oss kostar en tjänstesida med upp till 5 sidor ${kr(PRIS.tjanstesida)} och en e-handel ${kr(PRIS.ehandel)}. Båda går att dela upp på 12 månader: ${kr(PRIS.tjanstesidaManad)} respektive ${kr(PRIS.ehandelManad)} per månad. Mer avancerade sajter, med bokning, flera språk, inloggning eller fler än 10 sidor, får offert från ${kr(PRIS.webbSkraddarsytt)}. ${MOMS_TEXT}`,
  },
  {
    fraga: "Vad kostar det att bygga en professionell hemsida?",
    svar: `En tjänstesida kostar ${kr(PRIS.tjanstesida)}: upp till 5 sidor med design, texter utifrån ert underlag, kontakt- eller offertformulär, SEO-grund, Search Console och en ändringsrunda innan lansering. Extra sidor kostar ${kr(PRIS.extraSida)} styck.`,
  },
  {
    fraga: "Vad kostar en hemsida per månad?",
    svar: `Det väljer ni. Tar ni över sajten betalar ni ingenting till oss per månad, bara hosting och domän till leverantören. Vill ni att vi sköter driften kostar Essential, med hosting och domän, ${kr(PRIS.essential)} per månad och Total, som även har ändringar, ${kr(PRIS.total)} per månad.`,
  },
  {
    fraga: "Är det ett engångspris eller en prenumeration?",
    svar: `Bygget är ett engångspris. Efter lansering väljer ni: ta över allt utan månadskostnad till oss, eller drift från ${kr(PRIS.essential)} per månad. ${BINDNING_TEXT}`,
  },
  {
    fraga: "Ingår domän och hosting i priset?",
    svar: `Hosting och domän ingår i både Essential och Total. ${DOMAN_TEXT} Tar ni över sajten betalar ni båda direkt till leverantören. Domänen ligger alltid i ert namn.`,
  },
  {
    fraga: "Ingår SEO i hemsidans pris?",
    svar: `En SEO-grund ingår: sidstruktur, rubriker, sidtitlar, beskrivningar och mobilanpassning. Löpande sökmotoroptimering köps i Synlighet – en grundoptimering behövs inte om vi har byggt sajten, och löpande SEO kostar från ${kr(PRIS.synlighetBas)} per månad.`,
  },
  {
    fraga: "Ingår bilder?",
    svar: `Nej. Har ni egna bilder använder vi dem. Behöver ni nya tar vi fram dem i Studio, till exempel 10 bilder för ${kr(PRIS.bilder10)}.`,
  },
  {
    fraga: "Kan vi uppdatera hemsidan efter lansering?",
    svar: `Ja. ${ANDRINGAR_TEXT} Vill ni ändra texterna själva lägger vi till ett redigeringsverktyg för ${kr(PRIS.cms)}.`,
  },
  {
    fraga: "Vem äger hemsidan när den är klar?",
    svar: `Ni. ${AGANDE_TEXT} Ligger sajten i vår drift får ni flytta den när ni vill – ni får koden och en timmes flytthjälp utan kostnad.`,
  },
  {
    fraga: "Finns det bindningstid?",
    svar: `Inte på drift: ${BINDNING_TEXT} Betalar ni bygget direkt finns ingen bindning alls. ${AVBETALNING_TEXT}`,
  },
  {
    fraga: "Hur betalar vi?",
    svar: `${BETALNING_TEXT} Offerten gäller i 30 dagar.`,
  },
  {
    fraga: "Vad kostar det att modernisera en hemsida vi redan har?",
    svar: `Fräscha upp är alltid offert, från ${kr(PRIS.modernisering)}, beroende på sajtens skick och plattform. Ibland är en ny tjänstesida för ${kr(PRIS.tjanstesida)} det bättre köpet, och då säger vi det.`,
  },
  {
    fraga: "Bygger ni webbshoppar?",
    svar: `Ja. E-handel kostar ${kr(PRIS.ehandel)}: en egen butik i er design, kopplad till Shopify. Produkter, lager och kassa sköts i Shopify, och Shopify-abonnemanget betalar ni direkt till Shopify.`,
  },
  {
    fraga: "Kan vi få en hemsida till fast pris?",
    svar: "Ja. Tjänstesida och E-handel har fasta priser, och mer avancerade sajter får en offert med fast pris. Bygget har alltid fast pris; bara senare småändringar räknas i tid, via Total eller klippkort.",
  },
  {
    fraga: "Hur beställer vi en hemsida?",
    svar: "Boka en gratis genomgång på 20–25 minuter. Ni får ett skriftligt förslag med fast pris, och när ni godkänt det – ett mejl räcker – sätter vi igång.",
  },
];
