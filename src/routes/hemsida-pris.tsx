import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  Camera,
  Check,
  FileText,
  Gauge,
  LayoutTemplate,
  Megaphone,
  Palette,
  RefreshCw,
  Search,
  Wrench,
} from "lucide-react";
import { BokaKnapp, BokaPanel } from "@/components/Boka";
import { KortVy, type Kort } from "@/components/Kort";
import { Markerad, Mark } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { Stegliste, type Steg } from "@/components/Steg";
import { VanligaFragor } from "@/components/VanligaFragor";
import { FORETAG } from "@/lib/foretag";
import { HEMSIDA_FORETAG } from "@/lib/hemsida-foretag";
import { ARSKOSTNAD, HEMSIDA_PRIS, HEMSIDA_PRIS_FRAGOR } from "@/lib/hemsida-pris";
import {
  AGANDE_TEXT,
  BETALNING_TEXT,
  AVBETALNING_TEXT,
  BINDNING_TEXT,
  kr,
  MOMS_TEXT,
  PRIS,
  WEBB,
} from "@/lib/priser";
import { SEO_BYRA } from "@/lib/seo-byra";
import { brodsmulor, faqSchema, sidhuvud, tjanstSchema } from "@/lib/seo";
import { bokaKlick } from "@/lib/sparning";
import { hittaTjanst, tjanstSokvag } from "@/lib/tjanster";

const SIDA = HEMSIDA_PRIS.sokvag;
const TJANST = "hemsida";

export const Route = createFileRoute("/hemsida-pris")({
  head: () => {
    const t = hittaTjanst(TJANST);
    return sidhuvud({
      titel: HEMSIDA_PRIS.seoTitel,
      beskrivning: HEMSIDA_PRIS.seoBeskrivning,
      sokvag: SIDA,
      schema: [
        ...(t
          ? [
              tjanstSchema(t, {
                namn: "Hemsida till företag",
                beskrivning: HEMSIDA_PRIS.seoBeskrivning,
                sokvag: SIDA,
              }),
            ]
          : []),
        faqSchema(HEMSIDA_PRIS_FRAGOR),
        brodsmulor([
          { namn: "Hem", sokvag: "/" },
          { namn: "Priser", sokvag: "/priser" },
          { namn: HEMSIDA_PRIS.titel, sokvag: SIDA },
        ]),
      ],
    });
  },
  component: HemsidaPris,
});

const LANK =
  "font-bold text-ink underline decoration-sun decoration-2 underline-offset-4 hover:decoration-ink";

/** Bygget: tjänstesida, e-handel och skräddarsytt – priserna kommer från priser.ts. */
const BYGGEN: readonly {
  id: string;
  namn: string;
  pris: string;
  passar: string;
  ingar: readonly string[];
  utvald?: boolean;
}[] = [
  {
    id: "tjanstesida",
    namn: "Tjänstesida",
    pris: kr(PRIS.tjanstesida),
    passar: `Upp till 5 sidor för företag som säljer tjänster. Eller ${kr(PRIS.tjanstesidaManad)}/mån i 12 månader.`,
    ingar: [
      "Upp till 5 sidor med design efter ert varumärke",
      "Texter utifrån ert underlag",
      "Kontakt- eller offertformulär",
      "Mobilanpassning, SEO-grund, Search Console och Bing",
      `Extra sida ${kr(PRIS.extraSida)}`,
    ],
    utvald: true,
  },
  {
    id: "ehandel",
    namn: "E-handel",
    pris: kr(PRIS.ehandel),
    passar: `Egen butik för er som säljer produkter. Eller ${kr(PRIS.ehandelManad)}/mån i 12 månader.`,
    ingar: [
      "Allt i Tjänstesida",
      "Egen butik i er design, kopplad till Shopify",
      "Produkter, lager och kassa sköts i Shopify",
      "Shopify-abonnemanget betalar ni direkt till Shopify",
    ],
  },
  {
    id: "skraddarsytt",
    namn: "Skräddarsytt",
    pris: `från ${kr(PRIS.webbSkraddarsytt)}`,
    passar: "Mer avancerade sajter. Ni får en offert med fast pris.",
    ingar: [
      "Bokning och inloggning",
      "Flera språk",
      "Fler än 10 sidor",
      "Andra plattformar, som WordPress eller Webflow",
    ],
  },
];

type Cell = { text: string; ingar: boolean };
const ja = (text = "Ingår"): Cell => ({ text, ingar: true });
const nej = (text = "Ingår inte"): Cell => ({ text, ingar: false });

/** Tre spår efter lansering. */
const KOLUMNER = [
  { namn: "Överlämning", pris: "Ingår i bygget" },
  { namn: "Essential", pris: `${kr(PRIS.essential)}/mån` },
  { namn: "Total", pris: `${kr(PRIS.total)}/mån` },
] as const;

const JAMFORELSE: readonly { rad: string; celler: readonly Cell[] }[] = [
  {
    rad: "Kod, konton och inloggningar till er",
    celler: [ja(), ja("Ni får dem när ni vill"), ja("Ni får dem när ni vill")],
  },
  { rad: "Hosting och SSL", celler: [nej("Ni betalar själva"), ja(), ja()] },
  { rad: "Övervakning och säkerhetsuppdateringar", celler: [nej("Ni sköter själva"), ja(), ja()] },
  { rad: "Backup", celler: [nej("Ni sköter själva"), ja(), ja()] },
  {
    rad: "Domän",
    celler: [
      nej("Ni betalar själva"),
      ja("Ingår – dyrare domännamn kan kosta extra"),
      ja("Ingår – dyrare domännamn kan kosta extra"),
    ],
  },
  {
    rad: "Ändringar",
    celler: [
      nej(`Klippkort: 2 h ${kr(PRIS.klippkort2)}, 5 h ${kr(PRIS.klippkort5)}`),
      nej(`Klippkort: 2 h ${kr(PRIS.klippkort2)}, 5 h ${kr(PRIS.klippkort5)}`),
      ja(`Upp till 1 h/mån, därefter ${kr(PRIS.extraTimme)}/påbörjad timme`),
    ],
  },
  {
    rad: "Ändra texter själva",
    celler: [
      nej(`Redigeringsverktyg ${kr(PRIS.cms)}`),
      nej(`Redigeringsverktyg ${kr(PRIS.cms)}`),
      nej("Behövs inte – vi gör ändringarna"),
    ],
  },
];

const FAKTORER: readonly Kort[] = [
  {
    titel: "Antal sidor",
    text: "En sida per tjänst ger bättre synlighet, men varje sida är också arbete.",
    ikon: LayoutTemplate,
  },
  {
    titel: "Design",
    text: "Bygger vi på en befintlig grafisk profil, eller tar vi fram utseendet från början?",
    ikon: Palette,
  },
  {
    titel: "Funktioner",
    text: "Kontaktformulär ingår. Bokning, offertflöden eller annat kan påverka priset.",
    ikon: Wrench,
  },
  {
    titel: "Innehåll",
    text: "Texterna skriver vi utifrån ett formulär ni fyller i. Bilder använder vi era egna, eller tar fram nya i Studio.",
    ikon: FileText,
  },
  {
    titel: "SEO",
    text: "En SEO-grund ingår alltid. Mer omfattande SEO är en egen tjänst.",
    ikon: Search,
  },
  {
    titel: "Efter lansering",
    text: "Tar ni över sajten själva, eller ska vi sköta drift och ändringar?",
    ikon: Gauge,
  },
];

const KONTROLLERA: readonly { punkt: string; hosOss: string }[] = [
  {
    punkt: "Startkostnad",
    hosOss: `Tjänstesida ${kr(PRIS.tjanstesida)}, e-handel ${kr(PRIS.ehandel)}, även som avbetalning`,
  },
  {
    punkt: "Löpande avgifter",
    hosOss: `Inga om ni tar över – drift från ${kr(PRIS.essential)}/mån om ni vill`,
  },
  { punkt: "Vad som ingår", hosOss: "Står på sajten och i förslaget innan ni bestämmer er" },
  { punkt: "Mobilanpassning", hosOss: "Ingår alltid" },
  { punkt: "Grundläggande SEO", hosOss: "Ingår alltid" },
  { punkt: "Ändringar", hosOss: "En runda innan lansering, sedan klippkort eller ingår i Total" },
  { punkt: "Ägande", hosOss: "Ni äger koden, domänen och kontona" },
  { punkt: "Om ni vill flytta", hosOss: "Ni får koden och en timmes flytthjälp utan kostnad" },
];

const FORETAGSTYPER: readonly { titel: string; text: string }[] = [
  {
    titel: "Nystartade företag",
    text: "Ofta räcker några få sidor: vad ni gör, för vem och hur man når er. Bra struktur från start gör att sajten kan växa utan att byggas om.",
  },
  {
    titel: "Hantverkare",
    text: "Ofta räcker några sidor med ett tydligt offertformulär. Har ni flera tjänster ger en sida per tjänst mest.",
  },
  {
    titel: "Konsulter",
    text: "Tjänstesidor som visar kompetensen, och gärna några artiklar som svarar på kundernas frågor.",
  },
  {
    titel: "Lokala småföretag",
    text: "Öppettider, karta, tjänster och en enkel väg till kontakt. Google-företagsprofilen gör resten.",
  },
];

const TILLVAL: readonly (Kort & { pris: string; till: string; lanktext: string })[] = [
  {
    titel: "SEO och GEO",
    text: "Nya sidor, teknisk bevakning och AI-koll varje månad. Ingen grundoptimering behövs om vi byggt sajten.",
    ikon: Search,
    pris: `från ${kr(PRIS.synlighetBas)}/mån`,
    till: SEO_BYRA.sokvag,
    lanktext: "SEO för företag",
  },
  {
    titel: "Synlighet i AI-sök",
    text: "Ingår i Synlighet tillsammans med SEO.",
    ikon: Bot,
    pris: "Ingår i SEO och GEO",
    till: tjanstSokvag("geo"),
    lanktext: "GEO-optimering",
  },
  {
    titel: "Annonser på Facebook och Instagram",
    text: "Konto, pixel, samtyckesbanner och första kampanjen ingår i uppsättningen.",
    ikon: Megaphone,
    pris: `uppsättning ${kr(PRIS.annonsUppsattning)}`,
    till: tjanstSokvag("meta-annonser"),
    lanktext: "Meta Ads",
  },
  {
    titel: "Bilder och video",
    text: "Produkt- och kampanjbilder för hemsidan, sociala medier och annonser.",
    ikon: Camera,
    pris: `från ${kr(PRIS.studioS)}/mån`,
    till: tjanstSokvag("marknadsforingsbilder"),
    lanktext: "Studio",
  },
  {
    titel: "Redigeringsverktyg",
    text: "För er som tar över sajten och vill ändra texterna själva.",
    ikon: Wrench,
    pris: kr(PRIS.cms),
    till: "/priser#webb",
    lanktext: "Alla webbpriser",
  },
  {
    titel: "Modernisera befintlig hemsida",
    text: "Förbättringar av en sajt ni redan har – design, struktur och hastighet.",
    ikon: RefreshCw,
    pris: `offert från ${kr(PRIS.modernisering)}`,
    till: tjanstSokvag("hemsideoptimering"),
    lanktext: "Modernisera er hemsida",
  },
];

const STEG: readonly Steg[] = [
  {
    titel: "Jämför eller boka",
    text: "Läs igenom priserna här, eller boka en gratis genomgång om ni är osäkra på vad ni behöver.",
  },
  {
    titel: "Vi går igenom behoven",
    text: "20–25 minuter om verksamheten, önskemålen och vilka sidor och funktioner sajten behöver.",
  },
  {
    titel: "Ni får en offert",
    text: "Fast pris och vad som ingår. Offerten gäller i 30 dagar och godkänns med ett mejl.",
  },
  {
    titel: "Design och bygge",
    text: "Kravunderlag, designbrief och tidplan att godkänna – sedan designar och bygger vi.",
  },
  {
    titel: "Lansering",
    text: "En ändringsrunda, sedan publicerar vi. Ni väljer om ni tar över sajten eller låter oss sköta driften.",
  },
];

function HemsidaPris() {
  return (
    <>
      {/* Hero */}
      <section className="vagg-ljus relative isolate overflow-hidden">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 border-b border-ink/70"
        />
        <div className="mx-auto grid max-w-[78rem] items-center gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-24">
          <div>
            <p className="eyebrow">Priser · Hemsida</p>
            <h1 className="mt-6 max-w-3xl text-[clamp(2.4rem,5.6vw,4.75rem)] leading-[1.03]">
              <Markerad
                text="Vad kostar en hemsida till företag? Se våra priser"
                markera="Se våra priser"
              />
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/80">
              Ni ska inte behöva gissa vad en ny hemsida kostar. Hos {FORETAG.kortnamn} har bygget
              fast pris, och efter lansering väljer ni själva om ni tar över sajten eller låter oss
              sköta driften. Här ser ni vad det kostar, vad som ingår och vad ni betalar totalt
              första året.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#priser" className="btn-base btn-dark">
                Se våra priser
              </a>
              <Link
                to="/kontakt"
                search={{ tjanst: TJANST }}
                onClick={() => bokaKlick(SIDA, "hero")}
                className="btn-base btn-outline"
              >
                Boka gratis genomgång
              </Link>
            </div>
          </div>
          <div className="mork-kort p-8 text-elfenben sm:p-10">
            <p className="caps text-sun">Hemsidor från</p>
            <p className="mt-4 font-display text-6xl leading-none sm:text-7xl">
              {kr(PRIS.tjanstesida)}
            </p>
            <p className="mt-3 text-white/75">
              Tjänstesida, engångspris exkl. moms, eller {kr(PRIS.tjanstesidaManad)}/mån i 12
              månader
            </p>
            <dl className="mt-8 divide-y divide-white/15 border-t border-white/15">
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-white/80">E-handel</dt>
                <dd className="font-bold">{kr(PRIS.ehandel)}</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-white/80">Skräddarsytt</dt>
                <dd className="font-bold">från {kr(PRIS.webbSkraddarsytt)}</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-white/80">Drift efter lansering (frivilligt)</dt>
                <dd className="font-bold">från {kr(PRIS.essential)}/mån</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-white/80">Genomgång och offert</dt>
                <dd className="font-bold">Gratis</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Priser */}
      <section
        id="priser"
        aria-labelledby="priser-rubrik"
        className="container-page scroll-mt-28 py-14 sm:py-20"
      >
        <Reveal>
          <p className="eyebrow">Priser</p>
          <h2 id="priser-rubrik" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
            Våra priser för <Mark>hemsidor</Mark>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
            Tjänstesida eller e-handel, båda med fast pris, och skräddarsytt för mer avancerade
            behov. Fasta priser gäller hemsidor vi bygger i vår egen uppsättning – andra plattformar
            får offert.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {BYGGEN.map((b, i) => (
            <Reveal key={b.id} delay={i * 60} className="h-full">
              <article
                aria-labelledby={`bygge-${b.id}`}
                className={`flex h-full flex-col p-8 sm:p-9 ${
                  b.utvald ? "inramad text-elfenben" : "skylt text-ink"
                }`}
              >
                <p className={`caps ${b.utvald ? "text-white/80" : "text-guld-mork"}`}>
                  {b.id === "skraddarsytt" ? "Offert" : "Fast pris"}
                </p>
                <h3
                  id={`bygge-${b.id}`}
                  className="mt-3 font-sans text-2xl font-bold tracking-normal"
                >
                  {b.namn}
                </h3>
                <p className="mt-5 font-display text-5xl leading-none">{b.pris}</p>
                <p
                  className={`mt-3 text-sm ${b.utvald ? "text-white/80" : "text-muted-foreground"}`}
                >
                  {b.passar}
                </p>
                <ul className="mt-7 flex-1 space-y-2.5">
                  {b.ingar.map((r) => (
                    <li key={r} className="flex gap-3">
                      <Check
                        className="mt-0.5 size-5 shrink-0"
                        strokeWidth={3}
                        aria-hidden="true"
                      />
                      {r}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <BokaKnapp
                    variant={b.utvald ? "white" : "dark"}
                    tjanst={TJANST}
                    onClick={() => bokaKlick(SIDA, `pris-${b.id}`)}
                  >
                    {b.id === "skraddarsytt" ? "Få en offert" : `Välj ${b.namn.toLowerCase()}`}
                  </BokaKnapp>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <ul className="mt-6 max-w-3xl space-y-1 text-sm leading-relaxed text-muted-foreground">
          {WEBB.granser.map((g) => (
            <li key={g}>{g}</li>
          ))}
          <li>
            {MOMS_TEXT} {BETALNING_TEXT}
          </li>
        </ul>
        <p className="mt-4 text-ink/80">
          Har ni redan en hemsida? Fräscha upp är offert från {kr(PRIS.modernisering)} –{" "}
          <Link to={tjanstSokvag("hemsideoptimering")} className={LANK}>
            fräscha upp er hemsida
          </Link>
          .
        </p>
      </section>

      {/* Jämförelse */}
      <section aria-labelledby="ingar" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Vad ingår</p>
            <h2 id="ingar" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
              Efter lansering: <Mark>tre spår</Mark> att välja mellan
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
              När sajten är klar väljer ni: ta över allt själva, låt oss sköta tekniken, eller låt
              oss sköta både tekniken och ändringarna. Ni kan byta spår senare.
            </p>
          </Reveal>

          {/* Dator: tabell */}
          <Reveal delay={80} className="mt-10 hidden md:block">
            <div className="skylt overflow-hidden">
              <table className="w-full text-left">
                <caption className="sr-only">Vad som ingår i de tre spåren efter lansering</caption>
                <thead>
                  <tr className="border-b-2 border-line">
                    <th scope="col" className="p-4">
                      <span className="sr-only">Innehåll</span>
                    </th>
                    {KOLUMNER.map((k, i) => (
                      <th
                        key={k.namn}
                        scope="col"
                        className={`p-4 font-bold ${i === 2 ? "text-guld-mork" : "text-ink"}`}
                      >
                        {k.namn}
                        <span className="block text-sm font-normal text-muted-foreground">
                          {k.pris}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {JAMFORELSE.map((r) => (
                    <tr key={r.rad} className="border-b border-line last:border-0">
                      <th scope="row" className="p-4 font-bold text-ink">
                        {r.rad}
                      </th>
                      {r.celler.map((c, i) => (
                        <td key={i} className="p-4 text-sm">
                          <CellVy c={c} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          {/* Mobil: ett kort per alternativ */}
          <div className="mt-10 grid gap-4 md:hidden">
            {KOLUMNER.map((k, i) => (
              <div key={k.namn} className="skylt-liten p-5">
                <h3 className="font-sans text-lg font-bold tracking-normal text-ink">
                  {k.namn} <span className="font-normal text-muted-foreground">{k.pris}</span>
                </h3>
                <dl className="mt-3 space-y-2 text-sm">
                  {JAMFORELSE.map((r) => {
                    const c = r.celler[i];
                    if (!c) return null;
                    return (
                      <div key={r.rad} className="flex justify-between gap-4">
                        <dt className="text-ink/80">{r.rad}</dt>
                        <dd className="text-right">
                          <CellVy c={c} />
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            ))}
          </div>

          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Domänen ligger alltid i ert namn. Ligger sajten i vår drift får ni flytta den när ni
            vill – ni får koden och en timmes flytthjälp utan kostnad. {AGANDE_TEXT} {BINDNING_TEXT}
          </p>
        </div>
      </section>

      {/* Engång eller månad */}
      <section aria-labelledby="modell" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Prismodell</p>
            <h2 id="modell" className="mt-4 text-4xl sm:text-5xl">
              Engångspris eller månadskostnad&nbsp;– <Mark>hur fungerar det?</Mark>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              Hos många leverantörer kostar en hemsida en startavgift plus en obligatorisk
              månadsavgift, och ibland äger leverantören sajten. Jämför därför alltid totalkostnaden
              och vad som händer om ni vill byta.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                `Ni betalar bygget en gång, från ${kr(PRIS.tjanstesida)}, eller delar upp det på 12 månader.`,
                "Drift är frivillig. Tar ni över sajten betalar ni ingenting till oss per månad.",
                `Väljer ni drift: ${BINDNING_TEXT}`,
                AVBETALNING_TEXT,
                "Domänen ligger alltid i ert namn, och koden är er.",
                "Vill ni flytta får ni koden och en timmes flytthjälp utan kostnad.",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-ink/85">
                  <Check className="mt-1 size-5 shrink-0 text-guld-mork" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Årskostnad */}
      <section aria-labelledby="arskostnad" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Totalkostnad</p>
            <h2 id="arskostnad" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
              Vad kostar en företagshemsida totalt <Mark>under ett år</Mark>?
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
              Bygget plus tolv månader. Beräknat på våra fasta priser – mer avancerade sajter får
              offert.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ARSKOSTNAD.map((a, i) => (
              <li key={a.namn}>
                <Reveal delay={i * 60} className="h-full">
                  <div
                    className={`flex h-full flex-col p-6 ${
                      i === 0 ? "mork-kort text-elfenben" : "skylt text-ink"
                    }`}
                  >
                    <h3 className="font-sans text-lg font-bold tracking-normal">{a.namn}</h3>
                    <p
                      className={`mt-1 flex-1 text-sm ${i === 0 ? "text-white/70" : "text-muted-foreground"}`}
                    >
                      {a.beskrivning}
                    </p>
                    <dl
                      className={`mt-5 divide-y text-sm ${i === 0 ? "divide-white/15" : "divide-line"}`}
                    >
                      <div className="flex justify-between gap-3 py-2">
                        <dt>Vid start</dt>
                        <dd className="font-bold">{kr(a.start)}</dd>
                      </div>
                      <div className="flex justify-between gap-3 py-2">
                        <dt>Per månad</dt>
                        <dd className="font-bold">{a.perManad ? kr(a.perManad) : "0 kr"}</dd>
                      </div>
                      <div className="flex justify-between gap-3 py-2">
                        <dt>Första året</dt>
                        <dd className="font-display text-2xl">{kr(a.forstaAret)}</dd>
                      </div>
                      <div className="flex justify-between gap-3 py-2">
                        <dt>Följande år</dt>
                        <dd className="font-bold">{kr(a.darefter)}</dd>
                      </div>
                    </dl>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {MOMS_TEXT} Tar ni över sajten tillkommer hosting och domän, som ni betalar direkt till
            leverantören. Driften kan avslutas när som helst –
            räkningen gäller om ni behåller den hela året.
          </p>
        </div>
      </section>

      {/* Vad påverkar priset */}
      <section aria-labelledby="faktorer" className="container-page py-14 sm:py-20">
        <Reveal>
          <p className="eyebrow">Prisets delar</p>
          <h2 id="faktorer" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
            Vad avgör hur mycket en <Mark>hemsida kostar</Mark>?
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
            En enkel hemsida med verksamheten, tjänsterna och kontaktuppgifter är mindre arbete än
            en stor sajt med många undersidor och egna funktioner. Jämför därför vad som ingår, inte
            bara beloppet.
          </p>
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FAKTORER.map((k, i) => (
            <li key={k.titel}>
              <Reveal delay={i * 60} className="h-full">
                <KortVy k={k} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Billig eller professionell */}
      <section aria-labelledby="billig" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page grid [&>*]:min-w-0 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Billig hemsida</p>
            <h2 id="billig" className="mt-4 text-4xl sm:text-5xl">
              Billig hemsida till företag – vad är viktigt att <Mark>tänka på</Mark>?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              En billig hemsida kan räcka för den som behöver en enkel närvaro. Men det mest
              prisvärda är inte alltid lägsta startpris, utan det som motsvarar behoven och har
              tydliga villkor. Kontrollera det här, oavsett vilken leverantör ni väljer.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="skylt overflow-hidden">
              <table className="w-full text-left text-sm sm:text-base">
                <caption className="sr-only">
                  Vad ni bör kontrollera och hur det ser ut hos oss
                </caption>
                <thead>
                  <tr className="border-b-2 border-line">
                    <th scope="col" className="p-4 font-bold text-ink">
                      Kontrollera
                    </th>
                    <th scope="col" className="p-4 font-bold text-guld-mork">
                      Hos {FORETAG.kortnamn}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {KONTROLLERA.map((k) => (
                    <tr key={k.punkt} className="border-b border-line last:border-0">
                      <th scope="row" className="p-4 font-bold text-ink">
                        {k.punkt}
                      </th>
                      <td className="p-4 text-ink/85">{k.hosOss}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Olika företag */}
      <section aria-labelledby="typer" className="container-page py-14 sm:py-20">
        <Reveal>
          <p className="eyebrow">Olika behov</p>
          <h2 id="typer" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
            Hemsidor anpassade efter olika <Mark>företags behov</Mark>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
            Det som skiljer är hur många sidor och vilka funktioner som behövs – därför finns tre
            nivåer.
          </p>
        </Reveal>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FORETAGSTYPER.map((f, i) => (
            <li key={f.titel}>
              <Reveal delay={i * 50} className="h-full">
                <div className="skylt h-full p-6">
                  <h3 className="font-sans text-lg font-bold tracking-normal text-ink">
                    Hemsida för {f.titel.toLowerCase()}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{f.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Tillval */}
      <section aria-labelledby="tillval" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Tillval</p>
            <h2 id="tillval" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
              Vill ni utveckla hemsidan <Mark>ytterligare</Mark>?
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
              Det här ingår inte i bygget, men kan läggas till nu eller senare, var för sig.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TILLVAL.map((k, i) => (
              <li key={k.titel}>
                <Reveal delay={i * 60} className="h-full">
                  <KortVy k={k}>
                    <p className="mt-5 font-display text-2xl text-ink">{k.pris}</p>
                    <Link
                      to={k.till}
                      className="mt-3 inline-flex items-center gap-2 font-bold text-ink underline decoration-sun decoration-2 underline-offset-4"
                    >
                      {k.lanktext}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </KortVy>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">{MOMS_TEXT}</p>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process" className="container-page py-14 sm:py-20">
        <Reveal>
          <p className="eyebrow">Så går det till</p>
          <h2 id="process" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
            Från prisförfrågan till färdig hemsida&nbsp;– <Mark>så går det till</Mark>
          </h2>
        </Reveal>
        <Reveal delay={80} className="mt-10">
          <Stegliste steg={STEG} rad />
        </Reveal>
        <Reveal delay={120} className="mt-10">
          <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "process")} />
        </Reveal>
      </section>

      {/* Varför TAB */}
      <section aria-labelledby="varfor" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page grid [&>*]:min-w-0 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Varför {FORETAG.kortnamn}</p>
            <h2 id="varfor" className="mt-4 text-4xl sm:text-5xl">
              Tydliga priser och en hemsida anpassad efter <Mark>ert företag</Mark>
            </h2>
            <ul className="mt-8 space-y-3">
              {[
                "Tydliga priser och innehåll, innan ni bestämmer er",
                "Professionell, mobilanpassad webbdesign",
                "Lösningar efter företagets behov",
                "Hemsida, SEO och marknadsföring på ett ställe",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 font-bold text-ink">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full text-guld-mork border border-guld">
                    <Check className="size-4" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              Att köpa en hemsida ska vara ett begripligt beslut. Vill ni läsa mer om själva
              tjänsten finns allt om att beställa en{" "}
              <Link to={HEMSIDA_FORETAG.sokvag} className={LANK}>
                hemsida till företag
              </Link>
              , med hur vi arbetar från första mötet till lansering.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Eftersom vi även jobbar med SEO, bilder och annonser kan ni fortsätta med oss efter
              lansering, till exempel med{" "}
              <Link to={SEO_BYRA.sokvag} className={LANK}>
                SEO
              </Link>{" "}
              när ni vill synas bättre på Google.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Vanliga frågor */}
      <section aria-labelledby="fragor" className="container-page py-14 sm:py-20">
        <div className="max-w-3xl">
          <p className="eyebrow">Vanliga frågor</p>
          <h2 id="fragor" className="mt-4 text-3xl sm:text-4xl">
            Vanliga frågor om vad en <Mark>hemsida kostar</Mark>
          </h2>
          <div className="mt-8">
            <VanligaFragor fragor={HEMSIDA_PRIS_FRAGOR} />
          </div>
        </div>
      </section>

      <BokaPanel
        tjanst={TJANST}
        onBoka={() => bokaKlick(SIDA, "avslutning")}
        prislank={{ href: "#priser", text: "Se våra priser" }}
        rubrik={
          <>
            Redo att investera i en professionell <Mark>hemsida</Mark>?
          </>
        }
        text="Första hemsidan eller en ersättare för en gammal&nbsp;– boka en gratis genomgång så får ni ett förslag med fast pris och allt som ingår."
      />
    </>
  );
}

function CellVy({ c }: { c: Cell }) {
  return c.ingar ? (
    <span className="inline-flex items-start gap-2 text-ink">
      <Check className="mt-0.5 size-4 shrink-0 text-guld-mork" strokeWidth={3} aria-hidden="true" />
      {c.text}
    </span>
  ) : (
    <span className="text-muted-foreground">{c.text}</span>
  );
}
