import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  BadgeCheck,
  Building2,
  Check,
  Code2,
  Compass,
  FileText,
  Layers,
  ListChecks,
  MessageSquareText,
  Quote,
  Search,
  Sparkles,
} from "lucide-react";
import { BokaKnapp, BokaPanel } from "@/components/Boka";
import { KortVy, type Kort } from "@/components/Kort";
import { Markerad, Mark } from "@/components/Heading";
import { MastarHero } from "@/components/MastarHero";
import { Reveal } from "@/components/Reveal";
import { Stegliste, type Steg } from "@/components/Steg";
import { VanligaFragor } from "@/components/VanligaFragor";
import { FORETAG } from "@/lib/foretag";
import { GEO_FRAGOR, GEO_OPTIMERING } from "@/lib/geo-optimering";
import { HEMSIDA_FORETAG } from "@/lib/hemsida-foretag";
import { LOKAL_SEO } from "@/lib/lokal-seo";
import { MODERNISERA_HEMSIDA } from "@/lib/modernisera-hemsida";
import { DelPrisrutor, SYNLIGHET_KORT } from "@/components/Prisrutor";
import { kr, PRIS, SYNLIGHET } from "@/lib/priser";
import { SEO_BYRA } from "@/lib/seo-byra";
import { SOKMOTOROPTIMERING } from "@/lib/sokmotoroptimering";
import { brodsmulor, faqSchema, sidhuvud, tjanstSchema } from "@/lib/seo";
import { bokaKlick } from "@/lib/sparning";
import { hittaTjanst } from "@/lib/tjanster";

const SIDA = GEO_OPTIMERING.sokvag;
const TJANST = "geo";
const GUIDE_SLUG = "vad-ar-geo";
const LANK =
  "inline-flex items-center gap-2 font-bold text-ink underline decoration-sun decoration-2 underline-offset-4";

export const Route = createFileRoute("/geo-optimering")({
  head: () => {
    const t = hittaTjanst(TJANST);
    return sidhuvud({
      titel: GEO_OPTIMERING.seoTitel,
      beskrivning: GEO_OPTIMERING.seoBeskrivning,
      sokvag: SIDA,
      schema: [
        ...(t
          ? [
              tjanstSchema(t, {
                namn: "GEO-optimering (AI-sökoptimering)",
                beskrivning: GEO_OPTIMERING.seoBeskrivning,
                sokvag: SIDA,
              }),
            ]
          : []),
        faqSchema(GEO_FRAGOR),
        brodsmulor([
          { namn: "Hem", sokvag: "/" },
          { namn: "Tjänster", sokvag: "/tjanster" },
          { namn: GEO_OPTIMERING.titel, sokvag: SIDA },
        ]),
      ],
    });
  },
  component: GeoOptimering,
});

const FORDELAR_HERO = [
  "Anpassat för AI-baserad sökning",
  "Tydligare företagsinformation",
  "Byggt på samma grund som SEO",
] as const;

const GRUNDER: readonly Kort[] = [
  {
    titel: "Innehåll",
    text: "Tydliga och användbara svar på de frågor era kunder faktiskt ställer.",
    ikon: FileText,
  },
  {
    titel: "Teknik",
    text: "En sajt som söktjänsternas robotar kan hitta, läsa och förstå.",
    ikon: Code2,
  },
  {
    titel: "Trovärdig information",
    text: "Samma, korrekta uppgifter om företaget på sajten och där ni nämns.",
    ikon: BadgeCheck,
  },
];

const FLODE: readonly { titel: string; text: string }[] = [
  {
    titel: "Någon ställer en fråga",
    text: "”Vilka företag hjälper småföretag med SEO?”",
  },
  {
    titel: "Tjänsten letar information",
    text: "Beroende på tjänst hämtas aktuella källor från webben, eller så svarar modellen ur det den redan lärt sig.",
  },
  {
    titel: "Ett svar sammanställs",
    text: "Svaret kan kombinera uppgifter från flera källor.",
  },
  {
    titel: "Källor kan visas",
    text: "Ofta med länkar till sajterna som användes – hur det ser ut varierar mellan tjänsterna.",
  },
];

const NYTTOR: readonly Kort[] = [
  {
    titel: "Fler ställen att bli upptäckt",
    text: "Möjlighet att synas även när kunden frågar en AI-tjänst i stället för att googla.",
    ikon: Compass,
  },
  {
    titel: "Tydligare erbjudande",
    text: "Tjänster och villkor beskrivs så att både människor och maskiner förstår dem.",
    ikon: MessageSquareText,
  },
  {
    titel: "Bättre innehållsstruktur",
    text: "Viktig information blir lättare att hitta, på sajten och för söktjänsterna.",
    ikon: Layers,
  },
  {
    titel: "Stärker er SEO",
    text: "Nästan allt som hjälper i AI-sök hjälper också i Googles vanliga resultat.",
    ikon: Search,
  },
];

const TJANSTER: readonly Kort[] = [
  {
    titel: "GEO-analys och nuläge",
    text: "Vi går igenom sajten och vilka frågor era kunder ställer, och testar hur ni beskrivs i ChatGPT, Googles AI-funktioner och Copilot i dag.",
    ikon: Search,
  },
  {
    titel: "AI-anpassad innehållsstrategi",
    text: "En plan för vilka frågor sajten ska besvara, om tjänster, priser, område och hur det går till.",
    ikon: ListChecks,
  },
  {
    titel: "Teknisk SEO och åtkomst",
    text: "Indexering, struktur, interna länkar, robots.txt och att texten finns i sidans kod, så att inga tekniska hinder står i vägen.",
    ikon: Code2,
  },
  {
    titel: "Företagsinformation",
    text: "Namn, tjänster, kontaktuppgifter och område – likadant på sajten, i Google-företagsprofilen och i register där ni finns.",
    ikon: Building2,
  },
  {
    titel: "Innehåll och struktur",
    text: "Tydligare rubriker, tjänstebeskrivningar och vanliga frågor, och strukturerad data där den stämmer med sidan.",
    ikon: FileText,
  },
  {
    titel: "Uppföljning",
    text: "Citeringar, besök från AI-tjänster och återkommande kontroller, redovisade i månadsrapporten.",
    ikon: BarChart3,
  },
];

const JAMFORELSE: readonly { titel: string; rader: readonly string[]; markerad?: boolean }[] = [
  {
    titel: "SEO",
    rader: [
      "Fokus på vanliga sökresultat",
      "Sökordsanalys och sökavsikt",
      "Teknisk SEO och innehåll",
      "Mäts i klick, visningar och förfrågningar",
    ],
  },
  {
    titel: "GEO",
    rader: [
      "Fokus på AI-baserade söktjänster",
      "Tydlig och tillgänglig information",
      "Innehåll som besvarar kundernas frågor",
      "Mäts i citeringar och besök från AI-tjänster",
    ],
    markerad: true,
  },
  {
    titel: "Gemensamt",
    rader: [
      "Sajten går att hitta och läsa",
      "Relevant, användbart innehåll",
      "Korrekt företagsinformation",
      "Trovärdighet och värde för besökaren",
    ],
  },
];

const PRINCIPER: readonly { titel: string; text: string }[] = [
  { titel: "Tydliga svar", text: "Besvara kundernas vanligaste frågor direkt, högt upp." },
  { titel: "Konkreta tjänster", text: "Skriv vad ni gör, för vem, var och vad det kostar." },
  { titel: "Kontrollerbara uppgifter", text: "Stöd viktiga påståenden med fakta." },
  { titel: "Logisk struktur", text: "Rubriker, korta stycken, listor och tabeller." },
  { titel: "Aktuellt innehåll", text: "Uppdatera när priser, tjänster eller villkor ändras." },
];

const FORETAGSINFO = [
  "Samma företagsnamn överallt",
  "Korrekt beskrivning av tjänsterna",
  "Aktuella kontaktuppgifter",
  "Äkta omnämnanden på relevanta sajter",
] as const;

const MATNING: readonly Kort[] = [
  {
    titel: "AI-citeringar",
    text: "Bing Webmaster Tools visar hur ofta sajten citeras i Copilot – citeringar, inte klick.",
    ikon: Quote,
  },
  {
    titel: "Besök från AI-tjänster",
    text: "I statistiken syns besök som kommer från till exempel ChatGPT och Copilot.",
    ikon: BarChart3,
  },
  {
    titel: "Täckning av kundfrågor",
    text: "Finns det tydliga svar på sajten på de frågor som spelar roll?",
    ikon: ListChecks,
  },
  {
    titel: "Förfrågningar",
    text: "Kontakter och köp, där det går att se varifrån de kommer.",
    ikon: MessageSquareText,
  },
];

const STEG: readonly Steg[] = [
  {
    titel: "Gratis genomgång",
    text: "20–25 minuter om företaget, kunderna och vad ni vill synas på.",
  },
  {
    titel: "GEO-analys",
    text: "Sajtens innehåll, teknik och företagsinformation, och hur ni beskrivs i AI-tjänsterna i dag.",
  },
  {
    titel: "Prioriteringar",
    text: "Vi väljer det som ger mest för er verksamhet och stämmer av förslaget med er.",
  },
  {
    titel: "Innehåll och teknik",
    text: "Tjänstesidor, vanliga frågor, företagsinformation, teknisk SEO och strukturerad data.",
  },
  {
    titel: "Uppföljning",
    text: "Vi följer citeringar, besök och kontroller och justerar arbetet över tid.",
  },
];

const VARFOR: readonly Kort[] = [
  {
    titel: "SEO och GEO tillsammans",
    text: "Etablerad SEO är grunden – GEO byggs ovanpå, inte bredvid.",
    ikon: Layers,
  },
  {
    titel: "Tydligt innehåll",
    text: "Vi skriver så att det går att förstå vad ni erbjuder, på en gång.",
    ikon: FileText,
  },
  {
    titel: "Teknisk förståelse",
    text: "Vi bygger hemsidor själva och kan se vad som stoppar robotarna.",
    ikon: Code2,
  },
  {
    titel: "Inga genvägar",
    text: "Inga dolda texter, påhittade omnämnanden eller tekniska knep som utlovar AI-synlighet.",
    ikon: BadgeCheck,
  },
];

/** Illustrerad AI-sökning – inga riktiga företag, inget påstående om att någon rekommenderas. */
// GEO:s mästare: Sokrates, som lärde ut genom frågor och svar – precis så folk söker hos
// AI-tjänster i dag. Bilderna är AI-genererade (november 2026).
const SOKRATES = {
  person: "Sokrates",
  levde: "ca 470–399 f.Kr.",
  bildtext: "Lärde ut genom frågor och svar, så att sanningen kom fram.",
  bakgrund: {
    src: "/mastare/sokrates-bakgrund.webp",
    srcSet: "/mastare/sokrates-bakgrund-1000.webp 1000w, /mastare/sokrates-bakgrund.webp 1672w",
    alt: "Målning av antikens Aten i morgonljus, med Parthenon på Akropolis, olivlundar och Egeiska havet",
  },
  figur: {
    src: "/mastare/sokrates-900.webp",
    srcSet: "/mastare/sokrates-560.webp 560w, /mastare/sokrates-900.webp 900w",
    bredd: 900,
    hojd: 1094,
  },
};

function AiSokning() {
  return (
    <figure>
      <div aria-hidden="true" className="skylt skylt-markerad p-5 sm:p-6">
        <div className="flex items-center gap-3 rounded-full border border-line bg-cream px-4 py-3">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <span className="text-sm text-ink">Vilka företag hjälper småföretag med SEO?</span>
        </div>
        <div className="mt-5 flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-full text-guld-mork border border-guld">
            <Sparkles className="size-4" />
          </span>
          <span className="caps text-guld-mork">AI-svar</span>
        </div>
        <div className="mt-4 space-y-2">
          <span className="block h-2.5 w-full rounded bg-ink/15" />
          <span className="block h-2.5 w-11/12 rounded bg-ink/15" />
          <span className="block h-2.5 w-4/5 rounded bg-ink/15" />
        </div>
        <ul className="mt-5 space-y-2">
          {["Företag A", "Företag B", "Företag C"].map((f, i) => (
            <li key={f} className="flex items-center gap-3">
              <span className="grid size-6 place-items-center rounded-full text-xs font-bold text-guld-mork border border-guld/60">
                {i + 1}
              </span>
              <span className="text-sm font-bold text-ink">{f}</span>
              <span className="h-2 flex-1 rounded bg-ink/10" />
            </li>
          ))}
        </ul>
        <p className="caps mt-6 text-muted-foreground">Källor</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {["exempel-a.se", "branschregister.se", "exempel-c.se"].map((k, i) => (
            <span
              key={k}
              className={`rounded-full px-3 py-1 text-xs font-bold ${i === 0 ? "bg-sun text-ink" : "bg-tint text-ink/70"}`}
            >
              {i + 1} · {k}
            </span>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-muted-foreground">
        Illustration av ett AI-svar med källor. Påhittade företag, inte ett riktigt resultat.
      </figcaption>
    </figure>
  );
}

function GeoOptimering() {
  return (
    <>
      <MastarHero
        mastare={SOKRATES}
        plats="Sal II · Verk nr 2"
        sida="vanster"
        hantverk={GEO_OPTIMERING.titel}
        title={
          <Markerad
            text="GEO-optimering&nbsp;– hjälp ert företag att synas i AI-sökmotorer"
            markera="synas i AI-sökmotorer"
          />
        }
        intro={`Allt fler frågar ChatGPT, Googles AI-funktioner eller Copilot när de jämför företag. Med GEO-optimering gör ${FORETAG.kortnamn} er sajt, ert innehåll och er företagsinformation lätta att hitta, förstå och hänvisa till, med samma grund som god sökmotoroptimering.`}
      >
        <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "hero")}>
          Boka gratis GEO-genomgång
        </BokaKnapp>
        <a href="#sa-fungerar" className="btn-base btn-outline">
          Så fungerar GEO-optimering
        </a>
      </MastarHero>

      {/* Fördelar och illustration */}
      <section
        aria-label="Kort om tjänsten"
        className="container-page grid [&>*]:min-w-0 items-center gap-10 pt-10 pb-4 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
      >
        <ul className="space-y-3">
          {FORDELAR_HERO.map((f) => (
            <li key={f} className="flex items-center gap-3 font-bold text-ink">
              <span className="grid size-7 shrink-0 place-items-center rounded-full text-guld-mork border border-guld">
                <Check className="size-4" strokeWidth={3} aria-hidden="true" />
              </span>
              {f}
            </li>
          ))}
          <li className="pt-2">
            <span className="rounded-full bg-sun px-3 py-1 text-sm font-bold text-ink">
              {SYNLIGHET_KORT}
            </span>
          </li>
        </ul>
        <AiSokning />
      </section>

      {/* Vad är GEO */}
      <section aria-labelledby="vad" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Grunderna</p>
            <h2 id="vad" className="mt-4 text-4xl sm:text-5xl">
              Vad är GEO&nbsp;– <Mark>Generative Engine Optimization</Mark>?
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              GEO kallas på svenska ofta AI-sökoptimering. Det är arbetet med att göra företaget,
              sajten och innehållet lätt att hitta och använda för söktjänster som bygger på
              generativ AI.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              I stället för en lista med länkar sammanställer de ett direkt svar från flera källor –
              ibland med hänvisningar till dem. Det är ännu en kanal där kunder kan upptäcka er.
              Någon metod som garanterar att ett företag citeras eller rekommenderas finns dock
              inte.
            </p>
          </Reveal>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {GRUNDER.map((k, i) => (
            <li key={k.titel}>
              <Reveal delay={i * 60} className="h-full">
                <KortVy k={k} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Hur AI-sök fungerar */}
      <section
        id="sa-fungerar"
        aria-labelledby="flode"
        className="scroll-mt-28 bg-ink py-14 text-white sm:py-20"
      >
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-sun">Så fungerar AI-sök</p>
            <h2 id="flode" className="mt-4 max-w-3xl text-4xl text-white sm:text-5xl">
              Hur hittar ChatGPT och andra AI-söktjänster information?
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
              Tjänsterna fungerar olika. Vissa svar bygger på det modellen lärt sig under träningen,
              andra på sidor som hämtas från webben just då. Vilka källor som används varierar
              mellan tjänster, frågor och tidpunkter.
            </p>
          </Reveal>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FLODE.map((s, i) => (
              <li key={s.titel}>
                <Reveal delay={i * 70} className="h-full">
                  <div className="h-full border border-guld/35 bg-white/5 p-6">
                    <span className="grid size-9 place-items-center rounded-full border border-guld font-display text-lg text-guld italic">
                      {i + 1}
                    </span>
                    <h3 className="mt-5 font-sans text-lg font-bold tracking-normal text-white">
                      {s.titel}
                    </h3>
                    <p className="mt-2 leading-relaxed text-white/75">{s.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <Reveal delay={80}>
            <p className="mt-8 max-w-3xl text-white/80">
              Förenklad bild – den beskriver inte exakt hur varje AI-modell fungerar. Slutsatsen är
              ändå densamma: gör er information korrekt, lätt att nå och användbar, i stället för
              att försöka lura en viss modell.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Varför GEO + småföretag */}
      <section aria-labelledby="varfor-geo" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Varför GEO?</p>
            <h2 id="varfor-geo" className="mt-4 text-4xl sm:text-5xl">
              Varför bör företag arbeta med <Mark>synlighet i AI-sök</Mark>?
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              När någon undersöker en tjänst kan en AI-tjänst vara ett av flera verktyg: be om
              förslag på leverantörer, jämföra alternativ eller få något förklarat inför ett köp. Då
              är det värdefullt att uppgifterna om er är korrekta och lätta att hitta även där.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Se GEO som ett komplement till SEO, inte som en ersättning, och inte som en garanti
              för fler affärer.
            </p>
          </Reveal>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {NYTTOR.map((k, i) => (
            <li key={k.titel}>
              <Reveal delay={i * 60} className="h-full">
                <KortVy k={k} />
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={60} className="mt-14">
          <div className="skylt grid gap-8 p-8 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              <h3 className="text-3xl sm:text-4xl">GEO-optimering för småföretag</h3>
              <p className="mt-4 leading-relaxed text-ink/80">
                Ett mindre företag behöver inte göra allt. Börja med att sajten säger tydligt vad ni
                gör, var, för vem och hur man kontaktar er – sedan kan innehåll, teknik och
                företagsinformation byggas på i den takt det ger nytta.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ["Börja med grunderna", "Tydligt och korrekt innehåll först."],
                ["Prioritera rätt frågor", "Det era kunder faktiskt vill veta."],
                ["Kombinera med SEO", "Inte ett isolerat sidoprojekt."],
              ].map(([t, x]) => (
                <li key={t} className="skylt-liten flex gap-3 p-4">
                  <Check className="mt-1 size-5 shrink-0 text-guld-mork" aria-hidden="true" />
                  <span>
                    <span className="block font-bold text-ink">{t}</span>
                    <span className="text-muted-foreground">{x}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* Tjänster */}
      <section aria-labelledby="tjanster" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Det här gör vi</p>
            <h2 id="tjanster" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
              Våra GEO-tjänster – från analys till <Mark>AI-anpassat innehåll</Mark>
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
              GEO är ingen enskild inställning. Det är flera delar av er digitala närvaro, som vi
              prioriterar efter vad som ger mest för just er verksamhet.
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
        </div>
      </section>

      {/* ChatGPT och Google */}
      <section aria-label="ChatGPT och Google" className="container-page py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">ChatGPT</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">
              Hur kan företag förbättra sina möjligheter att <Mark>synas i ChatGPT</Mark>?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              När ChatGPT söker på webben kan offentliga sidor ingå i underlaget för svaret. Roboten
              som hämtar dem heter OAI-SearchBot – blockeras den i robots.txt visas sajten inte i
              ChatGPT:s sökresultat. Den är skild från GPTBot, som samlar träningsdata, och de två
              kan styras var för sig.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Vad ChatGPT rekommenderar i en enskild konversation går inte att styra. Att optimera
              företaget för ChatGPT handlar om förutsättningarna:
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {[
                "Tydliga tjänstesidor",
                "Korrekt och tillgänglig företagsinformation",
                "Svar på kundernas frågor",
                "Kontroll av robotarnas åtkomst",
              ].map((r) => (
                <li key={r} className="flex gap-3 text-ink">
                  <Check className="mt-1 size-4 shrink-0 text-guld-mork" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
            <Link to="/guider/$slug" params={{ slug: GUIDE_SLUG }} className={`mt-6 ${LANK}`}>
              Guide: så syns ditt företag i ChatGPT
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
          <Reveal delay={80}>
            <p className="eyebrow">Google</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">
              Synlighet i Google <Mark>AI Overviews och AI Mode</Mark>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Googles AI-översikter och AI Mode bygger på Googles vanliga söksystem och kan länka
              till källorna. Google skriver själva att det inte finns några extra krav och inga
              särskilda AI-filer eller särskild schema-markering som behövs – en sida ska vara
              indexerad och kunna visas med ett utdrag i Google Sök.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Den som säljer en teknisk genväg till Googles AI-svar säljer alltså något som inte
              finns. Det som gäller är:
            </p>
            <ul className="mt-5 space-y-3">
              {[
                ["Indexerbart innehåll", "Viktiga sidor går att hitta och visa i Google Sök."],
                ["Användbar information", "Relevanta, tillförlitliga svar på riktiga frågor."],
                ["Teknisk kvalitet", "Grundläggande SEO, struktur och funktion som fungerar."],
              ].map(([t, x]) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-guld-mork" aria-hidden="true" />
                  <span>
                    <span className="font-bold text-ink">{t}:</span>{" "}
                    <span className="text-ink/80">{x}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* SEO vs GEO */}
      <section aria-labelledby="skillnad" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">SEO och GEO</p>
            <h2 id="skillnad" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
              Vad är skillnaden mellan <Mark>SEO och GEO</Mark>?
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
              SEO handlar om de vanliga sökresultaten i Google och Bing. GEO är det bredare arbetet
              med hur information hittas och används i AI-baserade söktjänster. Grunden är densamma,
              och det mesta som hjälper den ena hjälper den andra.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-4 lg:grid-cols-3">
            {JAMFORELSE.map((k, i) => (
              <li key={k.titel}>
                <Reveal delay={i * 60} className="h-full">
                  <div className={`skylt h-full p-7 ${k.markerad ? "skylt-markerad" : ""}`}>
                    <h3 className="font-sans text-xl font-bold tracking-normal text-ink">
                      {k.titel}
                    </h3>
                    <ul className="mt-5 space-y-3">
                      {k.rader.map((r) => (
                        <li key={r} className="flex gap-3 text-ink/80">
                          <Check
                            className="mt-1 size-4 shrink-0 text-guld-mork"
                            aria-hidden="true"
                          />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal delay={80}>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ink/80">
              Vill ni förstå SEO-grunden?{" "}
              <Link to={SOKMOTOROPTIMERING.sokvag} className={LANK}>
                Så fungerar sökmotoroptimering
              </Link>
              . Söker ni hjälp med SEO i första hand? Läs om oss som{" "}
              <Link to={SEO_BYRA.sokvag} className={LANK}>
                SEO-byrå
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* Innehåll + företagsinformation */}
      <section
        aria-label="Innehåll och företagsinformation"
        className="container-page py-14 sm:py-20"
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">Innehåll</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">
              AI-anpassat innehåll som är <Mark>tydligt och användbart</Mark>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Bra innehåll skrivs för människor först. Den som jämför vill förstå vad tjänsten är,
              hur den går till, vilka alternativ som finns och vad den kostar. Är det skrivet
              tydligt kan också söktjänsterna tolka det – text skriven bara för AI hjälper ingen.
            </p>
            <ol className="mt-6 space-y-3">
              {PRINCIPER.map((p, i) => (
                <li key={p.titel} className="skylt-liten flex gap-4 p-4">
                  <span className="font-display text-2xl leading-none text-guld-mork">{i + 1}</span>
                  <span>
                    <span className="block font-bold text-ink">{p.titel}</span>
                    <span className="text-muted-foreground">{p.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={80}>
            <p className="eyebrow">Trovärdighet</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">
              Varför korrekt <Mark>företagsinformation</Mark> spelar roll
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Uppgifter om ert företag finns på fler ställen än er egen sajt: Google-företagsprofil,
              branschregister, samarbetspartner och artiklar. Är de tydliga och stämmer överens är
              det lättare för både människor och söktjänster att förstå vad ni gör.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {FORETAGSINFO.map((f) => (
                <li key={f} className="skylt-liten flex items-center gap-3 p-4 text-ink">
                  <Check className="size-5 shrink-0 text-guld-mork" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Vi arbetar bara med riktiga uppgifter och äkta omnämnanden, inga påhittade
              recensioner. Hur mycket omnämnanden väger skiljer sig mellan tjänsterna och är inte
              offentligt. Lokalt företag?{" "}
              <Link to={LOKAL_SEO.sokvag} className={LANK}>
                Lokal SEO
              </Link>{" "}
              tar hand om Google-företagsprofilen.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mätning */}
      <section aria-labelledby="matning" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">Uppföljning</p>
              <h2 id="matning" className="mt-4 text-4xl sm:text-5xl">
                Hur mäter man om ett företag <Mark>syns i AI-sök</Mark>?
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-lg leading-relaxed text-ink/80">
                Inte som SEO. Alla AI-tjänster redovisar inte statistik, och ett företag kan nämnas
                utan att det syns någonstans. Därför kombinerar vi flera källor.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-ink/80">
                Vi ställer också samma frågor i AI-tjänsterna varje månad och antecknar datum,
                tjänst, fråga och svar. Svaren varierar, så ett enskilt svar är ingen placering – vi
                tittar på utvecklingen över tid. En citering är inte heller samma sak som ett besök
                eller en kund.
              </p>
            </Reveal>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MATNING.map((k, i) => (
              <li key={k.titel}>
                <Reveal delay={i * 60} className="h-full">
                  <KortVy k={k} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pris */}
      <section aria-labelledby="pris-rubrik" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Pris</p>
            <h2 id="pris-rubrik" className="mt-4 text-4xl sm:text-5xl">
              Vad kostar <Mark nowrap>GEO-optimering</Mark>?
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              GEO säljs inte som en egen tjänst hos oss – det ingår i Synlighet tillsammans med SEO,
              eftersom grunden är densamma. Först en grundoptimering, sedan löpande arbete med
              AI-koll i varje rapport. I den gratis genomgången visar vi vad ChatGPT svarar om er i
              dag.
            </p>
          </Reveal>
        </div>
        <div className="mt-12">
          <DelPrisrutor
            del={SYNLIGHET}
            engangIndex={2}
            engangRubrik="Grundoptimering av SEO och GEO"
            engangNot="Teknik, sökordsanalys, strukturerad data, Search Console och Bing i ert namn, och en AI-koll som nollmätning."
            lopandeRubrik="Löpande SEO och GEO"
            lopandeNot="Nya eller förbättrade sidor, teknisk bevakning och AI-koll varje månad. Nivån föreslår vi efter genomgången."
            tjanst={TJANST}
            knapptext="Få prisförslag på GEO"
            onBoka={() => bokaKlick(SIDA, "pris")}
          />
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Så går det till</p>
            <h2 id="process" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
              Så hjälper vi ert företag med GEO&nbsp;– <Mark>steg för steg</Mark>
            </h2>
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <Stegliste steg={STEG} rad />
          </Reveal>
          <Reveal delay={120} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "process")}>
              Boka gratis GEO-genomgång
            </BokaKnapp>
            <span className="text-muted-foreground">Ni godkänner förslaget innan vi börjar.</span>
          </Reveal>
        </div>
      </section>

      {/* Varför TAB */}
      <section aria-labelledby="varfor" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Varför {FORETAG.kortnamn}</p>
            <h2 id="varfor" className="mt-4 text-4xl sm:text-5xl">
              Varför arbeta med GEO och AI-synlighet hos <Mark>{FORETAG.kortnamn}</Mark>?
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              AI-synlighet handlar inte om en snabb genväg till rekommendationer. Det handlar om en
              digital närvaro som är tydlig, korrekt och användbar, för människor och för
              söksystemen.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Vi arbetar med både innehållet och sajten. Behöver tekniken ses över kan vi{" "}
              <Link to={MODERNISERA_HEMSIDA.sokvag} className={LANK}>
                modernisera er befintliga hemsida
              </Link>
              , och saknar ni en sajt bygger vi en{" "}
              <Link to={HEMSIDA_FORETAG.sokvag} className={LANK}>
                hemsida till företaget
              </Link>{" "}
              med SEO och GEO från start.
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
              Vanliga frågor om GEO och <Mark>AI-sökoptimering</Mark>
            </h2>
            <div className="mt-8">
              <VanligaFragor fragor={GEO_FRAGOR} />
            </div>
          </div>
        </div>
      </section>

      <div className="pt-14 sm:pt-20">
        <BokaPanel
          tjanst={TJANST}
          onBoka={() => bokaKlick(SIDA, "avslutning")}
          prislank={{ href: "#pris", text: `Från ${kr(PRIS.synlighetBas)}/mån` }}
          rubrik={
            <>
              Vill ni utveckla er synlighet i <Mark>AI-sökningar</Mark>?
            </>
          }
          text="Boka en gratis genomgång. Vi tittar på er sajt och hur ni beskrivs i AI-tjänsterna i dag, och föreslår vad som är värt att göra, utan löften vi inte kan hålla."
        />
      </div>
    </>
  );
}
