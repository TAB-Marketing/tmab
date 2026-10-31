import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart3,
  Check,
  FileText,
  Handshake,
  KeyRound,
  ListChecks,
  MapPin,
  MapPinned,
  Navigation,
  Phone,
  Search,
  ShieldCheck,
  Star,
  Store,
  Target,
  TrendingUp,
} from "lucide-react";
import { BokaKnapp, BokaPanel } from "@/components/Boka";
import { KortVy, type Kort } from "@/components/Kort";
import { Markerad, Mark } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { Stegliste, type Steg } from "@/components/Steg";
import { VanligaFragor } from "@/components/VanligaFragor";
import { FORETAG } from "@/lib/foretag";
import { HEMSIDA_FORETAG } from "@/lib/hemsida-foretag";
import { LOKAL_FRAGOR, LOKAL_SEO } from "@/lib/lokal-seo";
import { BINDNING_TEXT, kr, MOMS_TEXT, PRIS } from "@/lib/priser";
import { SEO_BYRA } from "@/lib/seo-byra";
import { brodsmulor, faqSchema, sidhuvud, tjanstSchema } from "@/lib/seo";
import { bokaKlick } from "@/lib/sparning";
import { hittaTjanst, tjanstSokvag } from "@/lib/tjanster";

const SIDA = LOKAL_SEO.sokvag;
const TJANST = "seo";

export const Route = createFileRoute("/lokal-seo")({
  head: () => {
    const t = hittaTjanst(TJANST);
    return sidhuvud({
      titel: LOKAL_SEO.seoTitel,
      beskrivning: LOKAL_SEO.seoBeskrivning,
      sokvag: SIDA,
      schema: [
        ...(t
          ? [
              tjanstSchema(t, {
                namn: LOKAL_SEO.titel,
                beskrivning: LOKAL_SEO.seoBeskrivning,
                sokvag: SIDA,
              }),
            ]
          : []),
        faqSchema(LOKAL_FRAGOR),
        brodsmulor([
          { namn: "Hem", sokvag: "/" },
          { namn: SEO_BYRA.titel, sokvag: SEO_BYRA.sokvag },
          { namn: LOKAL_SEO.titel, sokvag: SIDA },
        ]),
      ],
    });
  },
  component: LokalSeo,
});

const LANK =
  "font-bold text-ink underline decoration-sun decoration-2 underline-offset-4 hover:decoration-ink";

const FORDELAR_HERO = [
  "Synlighet på lokala Google-sökningar",
  "Fokus på kunder i ert område",
  "Hemsida och Google-företagsprofil",
] as const;

const VARFOR: readonly Kort[] = [
  {
    titel: "Nå kunder i rätt område",
    text: "Hemsidan blir relevant för orterna där ni faktiskt arbetar.",
    ikon: MapPin,
  },
  {
    titel: "Stark lokal närvaro",
    text: "Korrekta och likadana uppgifter om företaget överallt där kunder letar.",
    ikon: Store,
  },
  {
    titel: "Lätt att höra av sig",
    text: "Telefon, bokning och offertformulär ett klick bort, på mobilen.",
    ikon: Phone,
  },
  {
    titel: "Synlighet som byggs över tid",
    text: "Lokalt innehåll, omdömen och omnämnanden som fortsätter ge effekt.",
    ikon: TrendingUp,
  },
];

const FAKTORER: readonly (Kort & { kan: string })[] = [
  {
    titel: "Relevans",
    text: "Hur väl erbjudandet och informationen matchar det personen söker efter.",
    ikon: Target,
    kan: "Påverkas av profil, kategorier och hemsidans innehåll",
  },
  {
    titel: "Avstånd",
    text: "Hur nära företaget ligger sökaren eller platsen i sökningen.",
    ikon: Navigation,
    kan: "Går inte att optimera – det är er verkliga placering",
  },
  {
    titel: "Prominens",
    text: "Hur känt företaget är: omdömen, omnämnanden, länkar och närvaro på nätet.",
    ikon: Star,
    kan: "Byggs med recensioner, kataloger och omnämnanden",
  },
];

const TJANSTER: readonly Kort[] = [
  {
    titel: "Google-företagsprofil",
    text: "Vi går igenom kategori, tjänster, kontaktuppgifter, öppettider, beskrivning och bilder, så att profilen är korrekt och fullständig.",
    ikon: MapPinned,
  },
  {
    titel: "Lokal sökordsanalys",
    text: "Vilka kombinationer av tjänst och ort era kunder söker på, och vilka lokala frågor de har.",
    ikon: KeyRound,
  },
  {
    titel: "Lokala landningssidor",
    text: "Sidor för de tjänster och orter ni faktiskt arbetar med, med unikt innehåll, inte samma text med nytt ortsnamn.",
    ikon: FileText,
  },
  {
    titel: "Lokal on-page SEO",
    text: "Sidtitlar, beskrivningar, rubriker, innehåll och länkar som gör tjänster och orter tydliga för Google.",
    ikon: Search,
  },
  {
    titel: "Företagsuppgifter och trovärdighet",
    text: "Vi hittar motstridiga uppgifter i kataloger som Eniro och Hitta och tipsar om var ni kan nämnas lokalt.",
    ikon: ShieldCheck,
  },
  {
    titel: "Uppföljning",
    text: "Google Search Console i ert namn, statistik från företagsprofilen och en månadsrapport om vad som ger samtal och förfrågningar.",
    ikon: BarChart3,
  },
];

const PROFIL_CHECK = [
  "Korrekt företagsnamn",
  "Rätt huvudkategori och tilläggskategorier",
  "Aktuella kontaktuppgifter",
  "Korrekta öppettider",
  "Verkligt serviceområde",
  "Tjänster beskrivna med kundernas ord",
  "Äkta bilder från verksamheten",
  "Genuina kundomdömen",
] as const;

const SOKEXEMPEL = [
  ["Målare", "Västerås"],
  ["Städfirma", "Stockholm"],
  ["Redovisningsbyrå", "Malmö"],
  ["Frisör", "Borås"],
  ["Snickare", "Uppsala"],
  ["Bilverkstad", "Jönköping"],
] as const;

const BRANSCHER: readonly { titel: string; text: string }[] = [
  {
    titel: "Hantverkare och byggföretag",
    text: "Sökningar på tjänst och ort – måleri, snickeri, renovering – och ett serviceområde i profilen.",
  },
  {
    titel: "Städföretag",
    text: "En sida per städtjänst, tydliga områden och en enkel väg till offert.",
  },
  {
    titel: "Frisörer och skönhetssalonger",
    text: "Profil med bilder och öppettider, behandlingar beskrivna som kunderna söker och bokning direkt.",
  },
  {
    titel: "Bilverkstäder",
    text: "Tydliga tjänster, rätt adress och omdömen – det kunden jämför innan den ringer.",
  },
  {
    titel: "Restauranger och kaféer",
    text: "Meny, öppettider och läge som stämmer överallt, och bilder som får folk att komma.",
  },
  {
    titel: "Lokala konsult- och serviceföretag",
    text: "Sökningar där kunden vill ha någon i närheten, och sidor som visar kompetensen.",
  },
];

const STEG: readonly Steg[] = [
  {
    titel: "Gratis genomgång",
    text: "Företaget, tjänsterna och områdena där ni vill nå kunder.",
  },
  {
    titel: "Lokal nulägesanalys",
    text: "Företagsprofil, hemsidans lokala innehåll och vilka sökningar ni syns på i dag.",
  },
  {
    titel: "Lokal sökordsstrategi",
    text: "Sökningar där ert erbjudande och er marknad faktiskt möts.",
  },
  {
    titel: "Åtgärder",
    text: "Profil, lokala tjänstesidor, metadata, internlänkar och företagsuppgifter.",
  },
  {
    titel: "Uppföljning",
    text: "Månadsrapport och nästa steg utifrån vad som ger samtal och förfrågningar.",
  },
];

const JAMFORELSE = [
  {
    titel: "Vanlig SEO",
    text: "Sökningar oavsett plats. Innehåll efter tjänsterna och målgruppen.",
    stil: "skylt",
  },
  {
    titel: "Lokal SEO",
    text: "Sökningar där platsen spelar roll. Lokalt innehåll, Google-företagsprofil och omdömen.",
    stil: "inramad text-elfenben",
  },
  {
    titel: "Gemensamt",
    text: "Teknisk SEO, en användarvänlig hemsida, relevant innehåll och tydliga kontaktvägar.",
    stil: "skylt skylt-markerad",
  },
] as const;

const VARFOR_TAB: readonly Kort[] = [
  {
    titel: "Rätt kunder, inte flest",
    text: "Vi prioriterar sökningar från människor i ert område som kan bli kunder.",
    ikon: MapPin,
  },
  {
    titel: "Profil och hemsida ihop",
    text: "Vi optimerar båda, och kan göra ändringarna på sajten själva.",
    ikon: Handshake,
  },
  {
    titel: "Tydliga prioriteringar",
    text: "Ni vet vad vi gör först, varför och vad det kostar.",
    ikon: ListChecks,
  },
  {
    titel: "Kan växa med er",
    text: "Från lokal SEO till bredare SEO, GEO och en ny hemsida när det behövs.",
    ikon: TrendingUp,
  },
];

function LokalSeo() {
  return (
    <>
      {/* Hero */}
      <section className="vagg-ljus relative isolate overflow-hidden">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 border-b border-ink/70"
        />
        <div className="mx-auto grid max-w-[88rem] items-center gap-12 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-24">
          <div>
            <p className="eyebrow">
              {SEO_BYRA.titel} · {LOKAL_SEO.titel}
            </p>
            <h1 className="mt-6 max-w-3xl text-[clamp(2.4rem,5.6vw,4.75rem)] leading-[1.03]">
              <Markerad
                text="Lokal SEO – hjälp ert företag att synas på Google Maps och lokalt"
                markera="Google Maps"
              />
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/80">
              När någon söker efter en tjänst i ert område vill ni vara ett av alternativen de
              hittar. Med lokal SEO förbättrar vi era chanser i Google Maps och de lokala
              sökresultaten, med lokala sökord, korrekt företagsinformation och en hemsida som visar
              var ni arbetar.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "hero")} />
              <a href="#sa-fungerar" className="btn-base btn-outline">
                Så fungerar lokal SEO
              </a>
            </div>
          </div>
          <LokalSokning />
        </div>
      </section>

      <section aria-label="Kort om tjänsten" className="container-page pt-8 sm:pt-10">
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {FORDELAR_HERO.map((f) => (
            <li key={f} className="flex items-center gap-3 font-bold text-ink">
              <span className="grid size-7 shrink-0 place-items-center rounded-full text-guld-mork border border-guld">
                <Check className="size-4" strokeWidth={3} aria-hidden="true" />
              </span>
              {f}
            </li>
          ))}
        </ul>
      </section>

      {/* Vad är lokal SEO */}
      <section aria-labelledby="vad" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Grunderna</p>
            <h2 id="vad" className="mt-4 text-4xl sm:text-5xl">
              Vad är lokal SEO och varför är det <Mark>viktigt</Mark>?
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              Lokal SEO, eller lokal sökmotoroptimering, gör ett företag lättare att hitta när någon
              söker efter en tjänst kopplad till en plats – ”målare Västerås”, ”städfirma Stockholm”
              eller ”frisör nära mig”.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Då visar Google både vanliga sökresultat och företag på kartan. För verksamheter som
              lever på kunder i ett visst område är det ofta den viktigaste platsen att synas på –
              och den bygger på helt andra signaler än vanlig SEO.
            </p>
          </Reveal>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VARFOR.map((k, i) => (
            <li key={k.titel}>
              <Reveal delay={i * 60} className="h-full">
                <KortVy k={k} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Hur Google väljer */}
      <section
        id="sa-fungerar"
        aria-labelledby="faktorer"
        className="scroll-mt-28 bg-fade-tint py-14 sm:py-20"
      >
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Så fungerar det</p>
            <h2 id="faktorer" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
              Hur avgör Google vilka företag som syns <Mark>lokalt</Mark>?
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
              Google väger tre saker. Därför handlar lokal SEO om mer än sökord på hemsidan –
              verksamheten, platsen, uppgifterna och omdömena spelar lika stor roll.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {FAKTORER.map((k, i) => (
              <li key={k.titel}>
                <Reveal delay={i * 60} className="h-full">
                  <KortVy k={k}>
                    <p className="skylt-liten mt-5 px-4 py-3 text-sm font-bold text-ink">{k.kan}</p>
                  </KortVy>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl leading-relaxed text-ink/80">
            En plats i Google Maps går inte att köpa i de vanliga resultaten, och ingen kan
            garantera en viss placering. Optimering kan inte heller ändra var företaget faktiskt
            ligger.
          </p>
        </div>
      </section>

      {/* Tjänster */}
      <section aria-labelledby="tjanster" className="container-page py-14 sm:py-20">
        <Reveal>
          <p className="eyebrow">Det här gör vi</p>
          <h2 id="tjanster" className="mt-4 max-w-4xl text-4xl sm:text-5xl">
            Våra tjänster inom lokal <Mark>sökmotoroptimering</Mark>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
            Lokal synlighet kräver att profilen, hemsidan och uppgifterna på andra sajter fungerar
            ihop. Vi hittar var det finns mest att vinna och gör det som är överenskommet.
          </p>
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TJANSTER.map((k, i) => (
            <li key={k.titel}>
              <Reveal delay={i * 60} className="h-full">
                <KortVy k={k} />
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal delay={80} className="mt-10">
          <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "tjanster")}>
            Få hjälp med lokal SEO
          </BokaKnapp>
        </Reveal>
      </section>

      {/* Google-företagsprofil */}
      <section aria-labelledby="profil" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page grid [&>*]:min-w-0 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Google Maps</p>
            <h2 id="profil" className="mt-4 text-4xl sm:text-5xl">
              Synas på Google Maps med en optimerad <Mark>företagsprofil</Mark>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              I företagsprofilen jämför kunderna, läser omdömen och ringer direkt. En fullständig
              och korrekt profil ger Google bättre underlag om vad ni gör och var.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Profilen är gratis, men bara för verksamheter med verklig, personlig kundkontakt –
              antingen på en adress eller hos kunderna inom ett serviceområde. Vi skapar inga
              profiler för virtuella kontor, påhittade adresser eller orter där ni inte finns. Det
              bryter mot Googles regler och kan leda till att profilen stängs.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <figure>
              <div className="skylt overflow-hidden">
                <div
                  className="h-24 bg-[linear-gradient(135deg,var(--tint),var(--line))]"
                  aria-hidden="true"
                />
                <div className="p-6 sm:p-7">
                  <p className="font-sans text-xl font-bold text-ink" aria-hidden="true">
                    Er företagsprofil
                  </p>
                  <h3 className="mt-4 text-xs font-bold tracking-[0.14em] text-guld-mork uppercase">
                    Checklista
                  </h3>
                  <ul className="mt-3 divide-y divide-line">
                    {PROFIL_CHECK.map((c) => (
                      <li key={c} className="flex items-center gap-3 py-2.5 text-ink">
                        <span className="grid size-6 shrink-0 place-items-center rounded-full text-guld-mork border border-guld">
                          <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                        </span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <figcaption className="mt-3 text-sm text-muted-foreground">
                Det här ska finnas på plats i en Google-företagsprofil.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Lokala landningssidor */}
      <section aria-labelledby="landningssidor" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Hemsidan</p>
            <h2 id="landningssidor" className="mt-4 text-4xl sm:text-5xl">
              Lokala landningssidor som matchar <Mark>kundernas sökningar</Mark>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              Hemsidan ska tydligt säga vad ni gör och var. Arbetar ni på flera orter kan en sida
              per ort vara rätt, men bara när varje sida har något eget att säga: era jobb där, hur
              ni når kunderna, priser eller annat som gäller just den orten.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Femtio nästan identiska sidor med olika ortsnamn hjälper ingen. Google ser igenom det,
              och besökarna också.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="skylt p-6 sm:p-8">
              <p className="text-sm font-bold text-muted-foreground">Så ser en lokal sökning ut</p>
              <p className="mt-4 flex flex-wrap items-center gap-2 text-lg">
                <span className="rounded-full px-4 py-1.5 font-bold text-guld-mork border border-guld">
                  tjänst
                </span>
                <span aria-hidden="true">+</span>
                <span className="rounded-full bg-sun px-4 py-1.5 font-bold text-ink">ort</span>
              </p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {SOKEXEMPEL.map(([tjanst, ort]) => (
                  <li
                    key={tjanst}
                    className="skylt-liten flex items-center gap-2 px-4 py-3 text-ink"
                  >
                    <Search className="size-4 text-muted-foreground" aria-hidden="true" />
                    <span>
                      <span className="font-bold text-guld-mork">{tjanst.toLowerCase()}</span> i{" "}
                      <span className="font-bold">{ort}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                Exempel på sökningar, inte våra orter eller kunder.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Branscher */}
      <section aria-labelledby="branscher" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Branscher</p>
            <h2 id="branscher" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
              Lokal SEO för företag som vill nå kunder i <Mark>sitt område</Mark>
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
              Exempel på vad lokal SEO kan innebära i olika branscher.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {BRANSCHER.map((b, i) => (
              <li key={b.titel}>
                <Reveal delay={i * 50} className="h-full">
                  <div className="skylt h-full p-6">
                    <h3 className="font-sans text-lg font-bold tracking-normal text-ink">
                      {b.titel}
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{b.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process" className="container-page py-14 sm:py-20">
        <Reveal>
          <p className="eyebrow">Så går det till</p>
          <h2 id="process" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
            Så hjälper vi er med lokal SEO – <Mark>steg för steg</Mark>
          </h2>
        </Reveal>
        <Reveal delay={80} className="mt-10">
          <Stegliste steg={STEG} rad />
        </Reveal>
        <Reveal delay={120} className="mt-10">
          <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "process")} />
        </Reveal>
      </section>

      {/* Pris */}
      <section aria-labelledby="pris-rubrik" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page grid [&>*]:min-w-0 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Pris</p>
            <h2 id="pris-rubrik" className="mt-4 text-4xl sm:text-5xl">
              Vad kostar lokal SEO för <Mark>företag</Mark>?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              Lokal SEO ingår i Synlighet. För vissa räcker det att få ordning på
              Google-företagsprofilen och hemsidans grund. Andra behöver nya lokala tjänstesidor och
              uppföljning varje månad.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Vad som ingår för just er, och vad det kostar, står i förslaget ni får efter den
              kostnadsfria genomgången.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div id="pris" className="inramad scroll-mt-28 p-8 text-elfenben sm:p-10">
              <dl className="divide-y divide-white/15">
                <div className="py-4 first:pt-0">
                  <dt className="text-white/80">Google-företagsprofil, engång</dt>
                  <dd className="mt-1 font-display text-4xl">{kr(PRIS.foretagsprofil)}</dd>
                </div>
                <div className="py-4">
                  <dt className="text-white/80">Grundoptimering av hemsidan, engång</dt>
                  <dd className="mt-1 font-display text-4xl">
                    <span className="text-2xl">från </span>
                    {kr(PRIS.grundoptimering)}
                  </dd>
                </div>
                <div className="py-4">
                  <dt className="text-white/80">Löpande SEO med nya lokala sidor</dt>
                  <dd className="mt-1 font-display text-4xl">
                    <span className="text-2xl">från </span>
                    {kr(PRIS.synlighetBas)}
                    <span className="text-2xl text-white/70">/mån</span>
                  </dd>
                </div>
                <div className="py-4">
                  <dt className="text-white/80">Flera orter eller språk</dt>
                  <dd className="mt-1 font-bold">
                    Offert från {kr(PRIS.synlighetSkraddarsytt)}/mån
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-sm text-white/70">
                {MOMS_TEXT} {BINDNING_TEXT}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <BokaKnapp variant="white" tjanst={TJANST} onClick={() => bokaKlick(SIDA, "pris")}>
                  Få prisförslag på lokal SEO
                </BokaKnapp>
                <Link to="/priser" className="btn-base btn-outline-white">
                  Alla priser
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Lokal vs vanlig */}
      <section aria-labelledby="skillnad" className="container-page py-14 sm:py-20">
        <Reveal>
          <p className="eyebrow">Lokal eller vanlig SEO</p>
          <h2 id="skillnad" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
            Vad är skillnaden mellan lokal SEO och <Mark>vanlig SEO</Mark>?
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
            Säljer ni i hela Sverige är bredare SEO ofta rätt. Lever ni på kunder i ett område
            kommer lokal SEO först. Många behöver båda – läs mer om{" "}
            <Link to={SEO_BYRA.sokvag} className={LANK}>
              SEO för företag
            </Link>
            .
          </p>
        </Reveal>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {JAMFORELSE.map((j, i) => (
            <li key={j.titel}>
              <Reveal delay={i * 60} className="h-full">
                <div className={`h-full p-7 ${j.stil}`}>
                  <h3 className="font-sans text-xl font-bold tracking-normal">{j.titel}</h3>
                  <p className="mt-3 leading-relaxed opacity-85">{j.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Recensioner */}
      <section aria-labelledby="recensioner" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page grid [&>*]:min-w-0 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Omdömen</p>
            <h2 id="recensioner" className="mt-4 text-4xl sm:text-5xl">
              Bygg lokal trovärdighet med riktiga <Mark>kundrecensioner</Mark>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              Omdömen är ofta det kunden tittar på först, och för företag med en Google-profil är de
              en del av den lokala synligheten. Vi hjälper er att få in en rutin: fråga alla kunder,
              gör det lätt att svara och svara själva på det som kommer in, även det kritiska.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Fråga alla kunder, inte bara de ni vet är nöjda",
                "Ge inga rabatter eller gåvor i utbyte mot omdömen",
                "Köp aldrig recensioner och skriv inga själva",
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

      {/* Varför TAB */}
      <section aria-labelledby="varfor" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Varför {FORETAG.kortnamn}</p>
            <h2 id="varfor" className="mt-4 text-4xl sm:text-5xl">
              Varför välja {FORETAG.kortnamn} för lokal <Mark>sökmotoroptimering</Mark>?
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              Ni ska förstå vilka lokala sökningar som spelar roll och vad som behöver göras, utan
              att bli experter själva. Vill ni börja själva finns en checklista i guiden{" "}
              <Link to="/guider/$slug" params={{ slug: "seo-for-smaforetag" }} className={LANK}>
                SEO för småföretag
              </Link>
              , och vill ni hellre ha en SEO-konsult än en byrå gäller samma upplägg.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Eftersom vi även bygger och förbättrar hemsidor kan vi ändra hemsidan själva – ibland
              räcker det att{" "}
              <Link to={tjanstSokvag("hemsideoptimering")} className={LANK}>
                modernisera er hemsida
              </Link>
              , ibland behövs en ny{" "}
              <Link to={HEMSIDA_FORETAG.sokvag} className={LANK}>
                hemsida till företaget
              </Link>
              . Och med{" "}
              <Link to={tjanstSokvag("geo")} className={LANK}>
                GEO-optimering
              </Link>{" "}
              blir era uppgifter lättare för AI-tjänster att hitta och återge.
            </p>
          </Reveal>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VARFOR_TAB.map((k, i) => (
            <li key={k.titel}>
              <Reveal delay={i * 60} className="h-full">
                <KortVy k={k} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Vanliga frågor */}
      <section aria-labelledby="fragor" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="eyebrow">Vanliga frågor</p>
            <h2 id="fragor" className="mt-4 text-3xl sm:text-4xl">
              Vanliga frågor om lokal SEO och <Mark>Google Maps</Mark>
            </h2>
            <div className="mt-8">
              <VanligaFragor fragor={LOKAL_FRAGOR} />
            </div>
          </div>
        </div>
      </section>

      <div className="pt-14 sm:pt-20">
        <BokaPanel
          tjanst={TJANST}
          onBoka={() => bokaKlick(SIDA, "avslutning")}
          prislank={{ href: "#pris", text: "Få prisförslag på lokal SEO" }}
          rubrik={
            <>
              Vill ni att fler lokala kunder ska hitta <Mark>ert företag</Mark>?
            </>
          }
          text="Kunder i ert område söker redan efter det ni erbjuder. På den gratis genomgången ser vi hur ni syns lokalt i dag och vad som ger mest att förbättra först."
        />
      </div>
    </>
  );
}

/** Illustration av en lokal sökning: sökfält, karta och tre påhittade företag. */
function LokalSokning() {
  const foretag = [
    { namn: "Snickeri A", betyg: "4,8", typ: "Snickare · Serviceområde" },
    { namn: "Snickeri B", betyg: "4,6", typ: "Snickare · Uppsala" },
    { namn: "Snickeri C", betyg: "4,9", typ: "Snickare · Uppsala" },
  ];
  return (
    <figure>
      <div className="skylt overflow-hidden" aria-hidden="true">
        <div className="flex items-center gap-3 border-b border-line px-5 py-3.5">
          <Search className="size-4 text-muted-foreground" />
          <span className="text-ink">snickare uppsala</span>
        </div>
        <div className="relative h-44 overflow-hidden bg-tint">
          <div className="absolute inset-0 bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] bg-[size:36px_36px] opacity-70" />
          <div className="absolute top-[38%] -left-4 h-3 w-[120%] -rotate-6 bg-white/90" />
          <div className="absolute top-0 left-[58%] h-full w-3 rotate-12 bg-white/90" />
          {[
            ["left-[22%] top-[30%]", "A"],
            ["left-[62%] top-[18%]", "B"],
            ["left-[48%] top-[62%]", "C"],
          ].map(([pos, b]) => (
            <span key={b} className={`absolute ${pos} grid place-items-center`}>
              <MapPin className="size-9 fill-brand text-white drop-shadow" strokeWidth={1.5} />
              <span className="absolute top-1.5 text-[0.65rem] font-bold text-white">{b}</span>
            </span>
          ))}
        </div>
        <ul className="divide-y divide-line">
          {foretag.map((f) => (
            <li key={f.namn} className="flex items-center justify-between gap-3 px-5 py-3">
              <span>
                <span className="block font-bold text-ink">{f.namn}</span>
                <span className="text-sm text-muted-foreground">{f.typ}</span>
              </span>
              <span className="flex items-center gap-1 text-sm font-bold text-ink">
                <Star className="size-4 fill-sun text-sun" />
                {f.betyg}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="mt-3 text-sm text-muted-foreground">
        Illustration av en lokal sökning med påhittade företag.
      </figcaption>
    </figure>
  );
}
