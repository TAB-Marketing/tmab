import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  Copy,
  FileCode2,
  Gauge,
  Handshake,
  Link2,
  ListOrdered,
  Map,
  MessageSquareText,
  MousePointerClick,
  Newspaper,
  Search,
  Settings2,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { BokaKnapp, BokaPanel } from "@/components/Boka";
import { FramtidaLank } from "@/components/FramtidaLank";
import { KortVy, type Kort } from "@/components/Kort";
import { Markerad, Mark } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { VanligaFragor } from "@/components/VanligaFragor";
import { FORETAG } from "@/lib/foretag";
import { HEMSIDA_FORETAG } from "@/lib/hemsida-foretag";
import { LOKAL_SEO } from "@/lib/lokal-seo";
import { SEO_BYRA } from "@/lib/seo-byra";
import { SOKMOTOROPTIMERING, SOKMOTOROPTIMERING_FRAGOR } from "@/lib/sokmotoroptimering";
import { brodsmulor, faqSchema, sidhuvud, tjanstSchema } from "@/lib/seo";
import { bokaKlick } from "@/lib/sparning";
import { hittaTjanst, tjanstSokvag } from "@/lib/tjanster";

const SIDA = SOKMOTOROPTIMERING.sokvag;
const TJANST = "seo";

export const Route = createFileRoute("/sokmotoroptimering")({
  head: () => {
    const t = hittaTjanst(TJANST);
    return sidhuvud({
      titel: SOKMOTOROPTIMERING.seoTitel,
      beskrivning: SOKMOTOROPTIMERING.seoBeskrivning,
      sokvag: SIDA,
      schema: [
        ...(t
          ? [
              tjanstSchema(t, {
                namn: "Sökmotoroptimering (SEO)",
                beskrivning: SOKMOTOROPTIMERING.seoBeskrivning,
                sokvag: SIDA,
              }),
            ]
          : []),
        faqSchema(SOKMOTOROPTIMERING_FRAGOR),
        brodsmulor([
          { namn: "Hem", sokvag: "/" },
          { namn: SOKMOTOROPTIMERING.titel, sokvag: SIDA },
        ]),
      ],
    });
  },
  component: Sokmotoroptimering,
});

const LANK =
  "font-bold text-ink underline decoration-sun decoration-2 underline-offset-4 hover:decoration-ink";

const FORDELAR_HERO = [
  "Bättre förutsättningar att synas på Google",
  "Mer relevant organisk trafik",
  "Synlighet som byggs över tid",
] as const;

const TRE_DELAR: readonly Kort[] = [
  {
    titel: "Teknisk SEO",
    text: "Att Google kan hitta, läsa och förstå sajten. Grunden – utan den spelar resten mindre roll.",
    ikon: Settings2,
  },
  {
    titel: "On-page SEO",
    text: "Innehållet och strukturen på varje sida: titlar, rubriker, text och interna länkar.",
    ikon: FileCode2,
  },
  {
    titel: "Off-page SEO",
    text: "Det som händer utanför sajten: länkar och omnämnanden som visar att andra litar på er.",
    ikon: Link2,
  },
];

const GOOGLE_STEG = [
  {
    titel: "Crawling",
    text: "Google hittar nya adresser via länkar och webbplatskartor och läser sidorna.",
    ikon: Search,
  },
  {
    titel: "Indexering",
    text: "Innehållet bearbetas och kan sparas i Googles index, en enorm katalog över webben.",
    ikon: BookOpen,
  },
  {
    titel: "Ranking",
    text: "Vid varje sökning väljer och ordnar Googles system de resultat som bedöms mest relevanta.",
    ikon: ListOrdered,
  },
] as const;

const AFFARSNYTTA: readonly Kort[] = [
  {
    titel: "Relevant trafik",
    text: "Besökare som redan letar efter det ni erbjuder.",
    ikon: Target,
  },
  {
    titel: "Bättre användarupplevelse",
    text: "Det som gör sajten tydlig för Google gör den tydlig för människor.",
    ikon: MousePointerClick,
  },
  {
    titel: "Fler kontaktvägar",
    text: "En väg från sökning till förfrågan på varje viktig sida.",
    ikon: MessageSquareText,
  },
  {
    titel: "Synlighet som håller",
    text: "Sidor som rankar fortsätter ge besök, till skillnad från en annons som stängs av.",
    ikon: TrendingUp,
  },
];

const SOKORDSTYPER: readonly Kort[] = [
  {
    titel: "Breda sökord",
    text: "Korta och vanliga, som ”sökmotoroptimering”. Många söker, men konkurrensen är hård och avsikten blandad.",
    ikon: Search,
  },
  {
    titel: "Long-tail",
    text: "Längre och mer specifika, som ”SEO för hantverkare”. Färre söker, men de vet vad de vill.",
    ikon: Target,
  },
  {
    titel: "Informationssökningar",
    text: "”Vad är SEO?”, ”hur fungerar Google?” – personen vill lära sig något.",
    ikon: BookOpen,
  },
  {
    titel: "Kommersiella sökningar",
    text: "”SEO byrå pris”, ”anlita SEO-konsult” – personen jämför och är nära ett beslut.",
    ikon: Handshake,
  },
];

const AVSIKT = [
  { sok: "vad är seo", typ: "Vill lära sig" },
  { sok: "hur fungerar sökmotoroptimering", typ: "Vill förstå" },
  { sok: "seo byrå jämförelse", typ: "Jämför" },
  { sok: "seo konsult pris", typ: "Nära beslut" },
] as const;

const TEKNISKT: readonly Kort[] = [
  {
    titel: "Indexering",
    text: "Viktiga sidor ska gå att indexera, och sidor som inte ska synas ska stängas ute.",
    ikon: BookOpen,
  },
  {
    titel: "Sitemap",
    text: "En lista över sajtens viktiga adresser som hjälper Google att hitta dem.",
    ikon: Map,
  },
  {
    titel: "Canonical-taggar",
    text: "Talar om vilken adress som gäller när flera visar samma eller nästan samma innehåll.",
    ikon: Copy,
  },
  {
    titel: "Mobilanpassning",
    text: "Google bedömer i första hand mobilversionen av sajten.",
    ikon: Smartphone,
  },
  {
    titel: "Prestanda",
    text: "Laddningstid och Core Web Vitals – hur snabbt och stabilt sidan visas.",
    ikon: Gauge,
  },
  {
    titel: "Internlänkning",
    text: "Länkar mellan era sidor hjälper både besökare och Google att hitta det som hör ihop.",
    ikon: Link2,
  },
];

const ON_PAGE = [
  { del: "Sidtitel", text: "Det klickbara i sökresultatet. Börja med det kunden söker på." },
  { del: "Meta description", text: "Texten under titeln. Påverkar klicken, inte placeringen." },
  { del: "H1 och underrubriker", text: "En huvudrubrik per sida och tydliga mellanrubriker." },
  { del: "Brödtext", text: "Svarar på frågan, med sökorden där de passar naturligt." },
  { del: "Beskrivande URL", text: "/lokal-seo säger mer än /sida?id=42." },
  { del: "Bildbeskrivningar", text: "Filnamn och alt-text som beskriver vad bilden visar." },
  { del: "Interna länkar", text: "Till relaterade sidor, med länktext som säger vart de leder." },
  { del: "Kontaktväg", text: "Ett tydligt nästa steg – annars blir besöket bara ett besök." },
] as const;

const OFF_PAGE: readonly Kort[] = [
  {
    titel: "Samarbetspartners",
    text: "Leverantörer, kunder och partners som har skäl att länka till er.",
    ikon: Handshake,
  },
  {
    titel: "Branschomnämnanden",
    text: "Branschregister, föreningar och kataloger med korrekta uppgifter.",
    ikon: Users,
  },
  {
    titel: "Expertinnehåll",
    text: "Guider och svar som andra frivilligt vill hänvisa till.",
    ikon: Newspaper,
  },
  {
    titel: "Kundcase",
    text: "Verkliga projekt som kunden själv gärna delar och länkar till.",
    ikon: Sparkles,
  },
];

/** TAB:s egen sajt som exempel på struktur – alla sidor finns. */
const STRUKTUR = [
  { niva: "Startsida", sidor: [{ namn: "tabmarketing.se", till: "/" }] },
  {
    niva: "Tjänstesidor",
    sidor: [
      { namn: "SEO-byrå", till: SEO_BYRA.sokvag },
      { namn: "Lokal SEO", till: LOKAL_SEO.sokvag },
      { namn: "Hemsida till företag", till: HEMSIDA_FORETAG.sokvag },
    ],
  },
  {
    niva: "Fördjupande guider",
    sidor: [
      { namn: "SEO för småföretag", till: "/guider/seo-for-smaforetag" },
      { namn: "Google Search Console", till: "/guider/google-search-console" },
    ],
  },
  {
    niva: "Relaterade tjänster",
    sidor: [
      { namn: "GEO", till: tjanstSokvag("geo") },
      { namn: "Hemsideoptimering", till: tjanstSokvag("hemsideoptimering") },
    ],
  },
] as const;

const INNEHALL = [
  "Innehåll utifrån vad folk faktiskt söker efter",
  "Tydliga rubriker och förklaringar",
  "Länkar till relaterade sidor och guider",
  "En naturlig väg till kontakt eller offert",
] as const;

const UPPFOLJNING: readonly Kort[] = [
  {
    titel: "Synlighet",
    text: "Visningar i sökresultaten och vilka sökningar ni dyker upp för.",
    ikon: Search,
  },
  {
    titel: "Trafik",
    text: "Organiska klick och besök på de viktigaste sidorna.",
    ikon: MousePointerClick,
  },
  {
    titel: "Affärsresultat",
    text: "Förfrågningar och bokningar som kommer från Google.",
    ikon: BarChart3,
  },
];

const ADS_JAMFORELSE = [
  ["Kostnadsmodell", "Arbetet med sajten, inga klickavgifter", "Betalning per klick till Google"],
  ["Tidsperspektiv", "Byggs upp under månader", "Synlighet direkt när kampanjen startar"],
  ["Synlighet", "De vanliga sökresultaten", "Annonsplatser märkta som sponsrade"],
  ["Löpande arbete", "Innehåll, teknik och uppföljning", "Budget, bud och annonser"],
] as const;

const VARFOR: readonly Kort[] = [
  {
    titel: "Tydlig strategi",
    text: "Arbetet planeras utifrån vad företaget vill uppnå, inte efter en checklista.",
    ikon: Target,
  },
  {
    titel: "Teknik och innehåll",
    text: "Vi går igenom hela sajten, inte bara sökorden.",
    ikon: Settings2,
  },
  {
    titel: "Relevant trafik",
    text: "Sökningar som har koppling till det ni säljer.",
    ikon: TrendingUp,
  },
  {
    titel: "Helheten",
    text: "SEO, GEO och hemsidearbete från samma ställe.",
    ikon: Sparkles,
  },
];

function Sokmotoroptimering() {
  return (
    <>
      {/* Hero */}
      <section className="vagg-ljus relative isolate overflow-hidden">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 border-b border-ink/70"
        />
        <div className="mx-auto grid max-w-[78rem] items-center gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-24">
          <div>
            <p className="eyebrow">{SOKMOTOROPTIMERING.titel}</p>
            <h1 className="mt-6 max-w-3xl text-[clamp(2.4rem,5.6vw,4.75rem)] leading-[1.03]">
              <Markerad
                text="Sökmotoroptimering (SEO)&nbsp;– få ert företag att synas bättre på Google"
                markera="synas bättre på Google"
              />
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/80">
              Sökmotoroptimering, SEO, är arbetet med att få er hemsida att synas i Googles vanliga
              sökresultat, när kunder letar efter det ni erbjuder. Här förklarar vi hur det
              fungerar: hur Google läser sidor, vad teknisk SEO, innehåll och länkar betyder, och
              vad som faktiskt går att påverka.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "hero")} />
              <a href="#sa-fungerar" className="btn-base btn-outline">
                Så fungerar sökmotoroptimering
              </a>
            </div>
          </div>
          <Sokresultat />
        </div>
      </section>

      <section aria-label="Kort om sidan" className="container-page pt-8 sm:pt-10">
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

      {/* Vad är SEO */}
      <section
        id="sa-fungerar"
        aria-labelledby="vad"
        className="container-page scroll-mt-28 py-14 sm:py-20"
      >
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Grunderna</p>
            <h2 id="vad" className="mt-4 text-4xl sm:text-5xl">
              Vad är sökmotoroptimering och hur fungerar <Mark>SEO</Mark>?
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              När någon söker försöker Google visa det mest relevanta och användbara svaret.
              Sökmotoroptimering gör det lättare för Google att hitta er sida, förstå vad den
              handlar om och bedöma att den är ett bra svar.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              I praktiken handlar det om tre saker: att tekniken fungerar, att innehållet svarar på
              rätt frågor och att andra webbplatser hänvisar till er. Ingen av dem kan garantera en
              placering – Google väger in många faktorer, och konkurrensen skiljer sig mellan varje
              sökning.
            </p>
          </Reveal>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {TRE_DELAR.map((k, i) => (
            <li key={k.titel}>
              <Reveal delay={i * 60} className="h-full">
                <KortVy k={k} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Hur Google fungerar */}
      <section aria-labelledby="google" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Google Sök</p>
            <h2 id="google" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
              Hur fungerar Google – från indexering till <Mark>sökresultat</Mark>?
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
              Förenklat sker det i tre steg. Fastnar en sida i något av dem syns den inte, och att
              en sida är indexerad betyder inte att den rankar högt.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <ol className="mt-10 grid gap-3 md:grid-cols-3">
              {GOOGLE_STEG.map((s, i) => (
                <li key={s.titel} className="skylt relative p-7">
                  <span className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-full text-guld-mork border border-guld">
                      <s.ikon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-display text-2xl text-ink">
                      {i + 1}. {s.titel}
                    </span>
                  </span>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{s.text}</p>
                  {i < GOOGLE_STEG.length - 1 && (
                    <ArrowRight
                      className="absolute top-1/2 -right-4 z-10 hidden size-7 -translate-y-1/2 rounded-full bg-sun p-1 text-ink md:block"
                      aria-hidden="true"
                    />
                  )}
                </li>
              ))}
            </ol>
          </Reveal>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Exakt hur Googles rankningssystem väger olika signaler är inte offentligt. Den som lovar
            en genväg runt dem lovar mer än någon kan hålla.
          </p>
        </div>
      </section>

      {/* Varför investera */}
      <section aria-labelledby="varfor-seo" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Affärsnytta</p>
            <h2 id="varfor-seo" className="mt-4 text-4xl sm:text-5xl">
              Varför investera i <Mark>sökmotoroptimering</Mark>?
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              En sökning är ofta ett uttryck för ett behov. Den som söker efter en redovisningsbyrå
              eller en snickare jämför redan alternativ. Syns ni där, syns ni i rätt ögonblick.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Ni betalar inte Google per klick i de vanliga resultaten, men SEO kostar tid,
              utveckling och uppföljning. Därför passar det bäst som en långsiktig del av
              marknadsföringen.
            </p>
          </Reveal>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AFFARSNYTTA.map((k, i) => (
            <li key={k.titel}>
              <Reveal delay={i * 60} className="h-full">
                <KortVy k={k} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Sökordsanalys */}
      <section aria-labelledby="sokord" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">Sökordsanalys</p>
              <h2 id="sokord" className="mt-4 text-4xl sm:text-5xl">
                Sökordsanalys – förstå vad era kunder <Mark>söker efter</Mark>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ink/80">
                Hur många som söker är bara halva svaret. Det viktiga är vad personen vill uppnå –
                sökintentionen. Därför väger vi alltid sökvolym mot avsikt, relevans för er och hur
                hård konkurrensen är.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <div className="skylt p-6 sm:p-8">
                <p className="text-sm font-bold text-muted-foreground">Från fråga till köp</p>
                <ol className="mt-5 space-y-3">
                  {AVSIKT.map((a, i) => (
                    <li key={a.sok} className="flex items-center gap-3">
                      <span
                        className="h-2 shrink-0 rounded-full bg-brand"
                        style={{ width: `${(i + 1) * 1.25}rem`, opacity: 0.35 + i * 0.2 }}
                        aria-hidden="true"
                      />
                      <span className="skylt-liten flex flex-1 flex-wrap items-center justify-between gap-2 px-4 py-2.5">
                        <span className="flex items-center gap-2 text-ink">
                          <Search className="size-4 text-muted-foreground" aria-hidden="true" />
                          {a.sok}
                        </span>
                        <span className="text-xs font-bold text-guld-mork uppercase">{a.typ}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SOKORDSTYPER.map((k, i) => (
              <li key={k.titel}>
                <Reveal delay={i * 60} className="h-full">
                  <KortVy k={k} />
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal delay={80} className="mt-10">
            <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "sokord")}>
              Få hjälp med sökordsanalys
            </BokaKnapp>
          </Reveal>
        </div>
      </section>

      {/* Teknisk SEO */}
      <section aria-labelledby="teknisk" className="container-page py-14 sm:py-20">
        <Reveal>
          <p className="eyebrow">Teknisk SEO</p>
          <h2 id="teknisk" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
            Teknisk SEO – grunden för en <Mark>sökbar hemsida</Mark>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
            Även det bästa innehållet presterar dåligt om Google inte kan hitta eller läsa sidan.
            Det här är det vi kontrollerar först.
          </p>
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TEKNISKT.map((k, i) => (
            <li key={k.titel}>
              <Reveal delay={i * 50} className="h-full">
                <KortVy k={k} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* On-page */}
      <section aria-labelledby="onpage" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page grid [&>*]:min-w-0 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">On-page SEO</p>
            <h2 id="onpage" className="mt-4 text-4xl sm:text-5xl">
              On-page SEO – optimera innehållet på <Mark>er hemsida</Mark>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              Det besökare och Google möter på varje sida. En bra SEO-text hjälper först och främst
              läsaren – sökorden ska finnas där de passar, inte upprepas för Googles skull. Svarar
              sidan på frågan blir den också lättare för Google att förstå.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <dl className="grid gap-3 sm:grid-cols-2">
              {ON_PAGE.map((o) => (
                <div key={o.del} className="skylt-liten p-5">
                  <dt className="font-bold text-ink">{o.del}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{o.text}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Off-page */}
      <section aria-labelledby="offpage" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Off-page SEO</p>
            <h2 id="offpage" className="mt-4 text-4xl sm:text-5xl">
              Off-page SEO – bygg trovärdighet <Mark>utanför</Mark> er webbplats
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              Länkar från andra relevanta sajter hjälper Google att hitta er och är en av signalerna
              för att andra litar på er. Det som räknas är äkta länkar och omnämnanden med koppling
              till verksamheten.
            </p>
            <p className="skylt-liten mt-5 flex gap-3 p-4 leading-relaxed text-ink">
              <X className="mt-0.5 size-5 shrink-0 text-guld-mork" aria-hidden="true" />
              Att köpa länkar eller bygga stora mängder konstgjorda länkar för att påverka
              sökresultaten strider mot Googles riktlinjer och kan få motsatt effekt.
            </p>
          </Reveal>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {OFF_PAGE.map((k, i) => (
            <li key={k.titel}>
              <Reveal delay={i * 60} className="h-full">
                <KortVy k={k} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Struktur och landningssidor */}
      <section aria-labelledby="struktur" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page grid [&>*]:min-w-0 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Struktur</p>
            <h2 id="struktur" className="mt-4 text-4xl sm:text-5xl">
              Landningssidor som matchar <Mark>kundernas sökningar</Mark>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              Erbjuder ni flera tjänster behöver varje tjänst en egen sida, med fördelar, pris,
              arbetssätt och vanliga frågor. Men varje sida ska ha ett eget syfte. Många nästan
              likadana sidor med ett nytt sökord eller ortsnamn hjälper varken besökare eller
              Google.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Så här är vår egen sajt uppbyggd.
            </p>
            <div className="mt-8">
              <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "struktur")}>
                Diskutera SEO för er hemsida
              </BokaKnapp>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <figure className="skylt p-6 sm:p-8">
              <ol className="space-y-2">
                {STRUKTUR.map((n, i) => (
                  <li key={n.niva}>
                    {i > 0 && <span className="ml-5 block h-4 w-px bg-ink/30" aria-hidden="true" />}
                    <p className="text-xs font-bold tracking-[0.14em] text-guld-mork uppercase">
                      {n.niva}
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {n.sidor.map((s) => (
                        <li key={s.till}>
                          <Link
                            to={s.till}
                            className="inline-block rounded-full border border-guld/60 bg-[#f3f0e7] px-4 py-1.5 text-sm font-bold text-ink transition-colors hover:border-ink"
                          >
                            {s.namn}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
              <figcaption className="mt-5 text-sm text-muted-foreground">
                Vår egen sajt: en sida per sökavsikt, guider som fördjupar och länkar mellan dem.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Innehåll */}
      <section aria-labelledby="seo-innehall" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Innehåll</p>
            <h2 id="seo-innehall" className="mt-4 text-4xl sm:text-5xl">
              SEO-texter och innehåll som svarar på <Mark>rätt frågor</Mark>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              Den som söker vill ha ett tydligt svar eller förstå hur något fungerar.
              Välstrukturerade tjänstesidor och guider hjälper dem att fatta beslut, och ger Google
              något att visa. Det handlar inte om flest ord, utan om användbar information med
              tydlig struktur.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {INNEHALL.map((t) => (
                <li key={t} className="skylt-liten flex gap-3 p-4 text-ink">
                  <Check className="mt-0.5 size-5 shrink-0 text-guld-mork" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Lokal och GEO */}
      <section className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page grid [&>*]:min-w-0 gap-6 lg:grid-cols-2">
          <Reveal className="h-full">
            <article aria-labelledby="lokal" className="skylt h-full p-8 sm:p-10">
              <h2 id="lokal" className="text-3xl sm:text-4xl">
                Lokal sökmotoroptimering – syns där <Mark>kunderna finns</Mark>
              </h2>
              <p className="mt-5 leading-relaxed text-ink/80">
                Den som söker ”snickare Uppsala” vill ha någon i närheten. Lokal SEO handlar om
                hemsidans koppling till orterna ni arbetar i och, för företag som uppfyller Googles
                krav, närvaron i Google Maps via företagsprofilen.
              </p>
              <Link
                to={LOKAL_SEO.sokvag}
                className="mt-6 inline-flex items-center gap-2 font-bold text-ink underline decoration-sun decoration-2 underline-offset-4"
              >
                Läs mer om lokal SEO
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </article>
          </Reveal>
          <Reveal delay={80} className="h-full">
            <article aria-labelledby="geo" className="inramad h-full p-8 text-elfenben sm:p-10">
              <h2 id="geo" className="text-3xl sm:text-4xl">
                SEO och AI-sökoptimering – hur <Mark>hänger det ihop</Mark>?
              </h2>
              <p className="mt-5 leading-relaxed text-white/80">
                Allt fler frågar ChatGPT i stället för att googla. GEO, Generative Engine
                Optimization, handlar om att AI-tjänster ska kunna förstå och återge ert företag.
                Grunden överlappar – korrekta uppgifter, tydligt innehåll, trovärdiga källor – men
                bra SEO garanterar inte att ni nämns i ett AI-svar.
              </p>
              <FramtidaLank
                till="/geo-optimering"
                reserv={tjanstSokvag("geo")}
                className="mt-6 inline-flex items-center gap-2 font-bold text-white underline decoration-sun decoration-2 underline-offset-4"
              >
                GEO och AI-sökoptimering
                <ArrowRight className="size-4" aria-hidden="true" />
              </FramtidaLank>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Tid */}
      <section aria-labelledby="tid" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Tid</p>
            <h2 id="tid" className="mt-4 text-4xl sm:text-5xl">
              Hur lång tid tar det innan sökmotoroptimering ger <Mark>resultat</Mark>?
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              På en mindre sajt med låg konkurrens kan förbättringar märkas inom några veckor. På
              konkurrensutsatta sökord tar det oftast flera månader eller längre, beroende på var
              sajten står i dag, konkurrensen och vad som görs.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Därför ska SEO bedömas över tid och på flera mått, inte på placeringen för ett enskilt
              sökord.
            </p>
          </Reveal>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {UPPFOLJNING.map((k, i) => (
            <li key={k.titel}>
              <Reveal delay={i * 60} className="h-full">
                <KortVy k={k} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* SEO vs Google Ads */}
      <section aria-labelledby="ads" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page grid [&>*]:min-w-0 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">SEO eller annonser</p>
            <h2 id="ads" className="mt-4 text-4xl sm:text-5xl">
              Sökmotoroptimering eller Google Ads – vad är <Mark>skillnaden</Mark>?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              Båda syns på Google, men fungerar olika. Vilken som passar beror på mål,
              tidsperspektiv, konkurrens och budget, och ofta kompletterar de varandra.
            </p>
            <p className="mt-5 leading-relaxed text-ink/80">
              Google Ads sköter vi inte. Vill ni annonsera betalt hjälper vi till med{" "}
              <Link to={tjanstSokvag("meta-annonser")} className={LANK}>
                annonser på Facebook och Instagram
              </Link>
              .
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="skylt overflow-x-auto">
              <table className="w-full min-w-[30rem] text-left">
                <caption className="sr-only">
                  Jämförelse mellan sökmotoroptimering och Google Ads
                </caption>
                <thead>
                  <tr className="border-b-2 border-line">
                    <th scope="col" className="p-4">
                      <span className="sr-only">Faktor</span>
                    </th>
                    <th scope="col" className="p-4 font-bold text-guld-mork">
                      SEO
                    </th>
                    <th scope="col" className="p-4 font-bold text-ink">
                      Google Ads
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ADS_JAMFORELSE.map(([rad, seo, ads]) => (
                    <tr key={rad} className="border-b border-line last:border-0">
                      <th scope="row" className="p-4 font-bold text-ink">
                        {rad}
                      </th>
                      <td className="p-4 text-ink/85">{seo}</td>
                      <td className="p-4 text-ink/85">{ads}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Varför TAB */}
      <section aria-labelledby="varfor" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Varför {FORETAG.kortnamn}</p>
            <h2 id="varfor" className="mt-4 text-4xl sm:text-5xl">
              Varför arbeta med sökmotoroptimering hos <Mark>{FORETAG.kortnamn}</Mark>?
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              SEO ska ge rätt besökare, inte bara fler. Vi kombinerar teknisk SEO, sökordsanalys och
              innehåll med kunskap om webbdesign, så att vi ser hur sajtens struktur och
              användarupplevelse påverkar helheten. Och ni ska alltid förstå vad vi gör och varför.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Visar analysen att sajten behöver mer än SEO kan vi{" "}
              <Link to={tjanstSokvag("hemsideoptimering")} className={LANK}>
                modernisera en befintlig hemsida
              </Link>{" "}
              eller bygga en{" "}
              <Link to={HEMSIDA_FORETAG.sokvag} className={LANK}>
                professionell hemsida till företaget
              </Link>
              .
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

      {/* Vanliga frågor */}
      <section aria-labelledby="fragor" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="eyebrow">Vanliga frågor</p>
            <h2 id="fragor" className="mt-4 text-3xl sm:text-4xl">
              Vanliga frågor om <Mark>sökmotoroptimering</Mark> (SEO)
            </h2>
            <div className="mt-8">
              <VanligaFragor fragor={SOKMOTOROPTIMERING_FRAGOR} />
            </div>
          </div>
        </div>
      </section>

      <div className="pt-14 sm:pt-20">
        <BokaPanel
          tjanst={TJANST}
          onBoka={() => bokaKlick(SIDA, "avslutning")}
          prislank={{ href: "/seo-byra", text: "Se priser på SEO" }}
          rubrik={
            <>
              Vill ni förbättra ert företags synlighet på <Mark>Google</Mark>?
            </>
          }
          text="Era kunder söker redan efter det ni erbjuder. På den gratis genomgången ser vi hur ni syns i dag och vad som ger mest att förbättra först."
        />
      </div>
    </>
  );
}

/** Ett sökresultat med delarna utpekade – pedagogisk illustration, inga riktiga siffror. */
function Sokresultat() {
  const delar = [
    { etikett: "URL", text: "Beskrivande adress" },
    { etikett: "Sidtitel", text: "Det klickbara – börjar med sökordet" },
    { etikett: "Meta description", text: "Påverkar klicken, inte placeringen" },
  ];
  return (
    <figure>
      <div className="skylt p-5 sm:p-7">
        <div
          className="flex items-center gap-3 rounded-full border-2 border-line px-5 py-3"
          aria-hidden="true"
        >
          <Search className="size-4 text-muted-foreground" />
          <span className="text-ink">redovisningsbyrå småföretag</span>
        </div>
        <div className="mt-6 space-y-2" aria-hidden="true">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-sun px-1.5 text-[0.65rem] font-bold text-ink">1</span>
            <p className="text-xs text-muted-foreground">er-byra.se › redovisning-smaforetag</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-sun px-1.5 text-[0.65rem] font-bold text-ink">2</span>
            <p className="font-bold text-guld-mork">
              Redovisningsbyrå för småföretag – fast månadspris
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="mt-0.5 rounded-md bg-sun px-1.5 text-[0.65rem] font-bold text-ink">
              3
            </span>
            <p className="text-sm text-ink/70">
              Bokföring, moms och bokslut för små aktiebolag och enskilda firmor. Personlig
              rådgivare och svar samma dag.
            </p>
          </div>
        </div>
        <ol className="mt-6 grid gap-2 border-t border-line pt-5">
          {delar.map((d, i) => (
            <li key={d.etikett} className="flex items-center gap-3 text-sm">
              <span className="grid size-6 shrink-0 place-items-center rounded-md bg-sun text-xs font-bold text-ink">
                {i + 1}
              </span>
              <span>
                <span className="font-bold text-ink">{d.etikett}</span>
                <span className="text-muted-foreground"> – {d.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="mt-3 text-sm text-muted-foreground">
        Så är ett sökresultat uppbyggt. Påhittat exempel.
      </figcaption>
    </figure>
  );
}
