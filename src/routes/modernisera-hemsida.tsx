import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accessibility,
  ArrowRight,
  Check,
  FileText,
  Gauge,
  MessageSquareText,
  Palette,
  Search,
  Smartphone,
} from "lucide-react";
import { BokaKnapp, BokaPanel } from "@/components/Boka";
import { KortVy, type Kort } from "@/components/Kort";
import { Markerad, Mark, PageHero } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { Stegliste, type Steg } from "@/components/Steg";
import { VanligaFragor } from "@/components/VanligaFragor";
import { FORETAG } from "@/lib/foretag";
import { HEMSIDA_FORETAG } from "@/lib/hemsida-foretag";
import { HEMSIDA_PRIS } from "@/lib/hemsida-pris";
import { MODERNISERA_FRAGOR, MODERNISERA_HEMSIDA, PLATTFORMAR } from "@/lib/modernisera-hemsida";
import { AGANDE_TEXT, ANDRINGAR_TEXT, kr, MOMS_TEXT, PRIS } from "@/lib/priser";
import { SOKMOTOROPTIMERING } from "@/lib/sokmotoroptimering";
import { brodsmulor, faqSchema, sidhuvud, tjanstSchema } from "@/lib/seo";
import { bokaKlick } from "@/lib/sparning";
import { hittaTjanst, tjanstSokvag } from "@/lib/tjanster";

const SIDA = MODERNISERA_HEMSIDA.sokvag;
const TJANST = "hemsideoptimering";
const LANK =
  "inline-flex items-center gap-2 font-bold text-ink underline decoration-sun decoration-2 underline-offset-4";

export const Route = createFileRoute("/modernisera-hemsida")({
  head: () => {
    const t = hittaTjanst(TJANST);
    return sidhuvud({
      titel: MODERNISERA_HEMSIDA.seoTitel,
      beskrivning: MODERNISERA_HEMSIDA.seoBeskrivning,
      sokvag: SIDA,
      schema: [
        ...(t
          ? [
              tjanstSchema(t, {
                namn: "Fräscha upp befintlig hemsida",
                beskrivning: MODERNISERA_HEMSIDA.seoBeskrivning,
                sokvag: SIDA,
              }),
            ]
          : []),
        faqSchema(MODERNISERA_FRAGOR),
        brodsmulor([
          { namn: "Hem", sokvag: "/" },
          { namn: "Tjänster", sokvag: "/tjanster" },
          { namn: MODERNISERA_HEMSIDA.titel, sokvag: SIDA },
        ]),
      ],
    });
  },
  component: ModerniseraHemsida,
});

const FORDELAR_HERO = [
  "Vi arbetar i er nuvarande plattform",
  "Mätning före och efter",
  "Fast pris innan vi börjar",
] as const;

const TECKEN: readonly { titel: string; text: string }[] = [
  {
    titel: "Den är svår att använda på mobilen",
    text: "Små knappar, text som måste zoomas och menyer som inte fungerar med tummen.",
  },
  {
    titel: "Den laddar långsamt",
    text: "Besökaren hinner tröttna innan sidan visas, särskilt på mobilnät.",
  },
  {
    titel: "Designen känns gammal",
    text: "Sajten ser inte ut som företaget gör i dag, och det märks för nya kunder.",
  },
  {
    titel: "Det är otydligt vad ni erbjuder",
    text: "Tjänster och priser är svåra att hitta, eller beskrivs med för mycket text.",
  },
  {
    titel: "Få hör av sig",
    text: "Besökare kommer in, men kontaktvägen är gömd eller formuläret krångligt.",
  },
  {
    titel: "Innehållet är inaktuellt",
    text: "Gamla erbjudanden, fel öppettider, personal som slutat eller nyheter från flera år sedan.",
  },
  {
    titel: "Den är svår att uppdatera",
    text: "Varje liten ändring kräver någon annan, eller att man vågar röra en krånglig plattform.",
  },
];

const FORBATTRA: readonly Kort[] = [
  {
    titel: "Design och känsla",
    text: "Typsnitt, färger, bilder och layout som matchar företaget och känns aktuella.",
    ikon: Palette,
  },
  {
    titel: "Mobilanpassning",
    text: "Layout, textstorlek, knappar och meny som fungerar på mobil och surfplatta.",
    ikon: Smartphone,
  },
  {
    titel: "Hastighet",
    text: "Mindre bilder, färre tunga tillägg och typsnitt, så att sidorna laddar snabbare.",
    ikon: Gauge,
  },
  {
    titel: "Struktur och innehåll",
    text: "Tydligare menyer, sidor och texter som svarar på det besökaren letar efter.",
    ikon: FileText,
  },
  {
    titel: "Kontaktvägar och formulär",
    text: "Kontakt-, offert- eller bokningsformulär där besökaren faktiskt letar efter dem.",
    ikon: MessageSquareText,
  },
  {
    titel: "Teknisk SEO och tillgänglighet",
    text: "Sidtitlar, rubriker, sitemap, kontrast, textstorlek och tangentbordsnavigering.",
    ikon: Search,
  },
];

/** Det vi kontrollerar för att en större förändring inte ska kosta synlighet i Google. */
const SEO_SKYDD = [
  {
    titel: "Inventering av alla adresser",
    text: "Vi listar sidorna som finns i dag och vilka som ger besök och förfrågningar.",
  },
  {
    titel: "Omdirigeringar (301)",
    text: "Byter en sida adress skickas besökare och Google vidare till den nya, inga döda länkar.",
  },
  {
    titel: "Behålla det som rankar",
    text: "Innehåll som syns i Google tas inte bort utan att vi vet vad det betyder.",
  },
  {
    titel: "Sidtitlar, rubriker och canonical",
    text: "Varje sida får en tydlig titel och beskrivning, och en adress Google ska räkna som den rätta.",
  },
  {
    titel: "Interna länkar och sitemap",
    text: "Länkar mellan sidorna uppdateras och sitemapen skickas in på nytt.",
  },
  {
    titel: "Test innan och efter lansering",
    text: "Formulär, mobilvy och indexering kontrolleras, och vi följer upp i Search Console efteråt.",
  },
] as const;

/** Tre vägar – från minst till mest omfattande. Priserna kommer från priser.ts. */
const VAGAR: readonly {
  titel: string;
  passar: string;
  punkter: readonly string[];
  pris: string;
  lank?: { till: string; text: string };
  markerad?: boolean;
}[] = [
  {
    titel: "Fräscha upp",
    passar: "Grunden fungerar, men sajten känns gammal eller krånglig på några punkter.",
    punkter: [
      "Design, bilder och texter uppdateras",
      "Mobilvy och hastighet rättas till",
      "Teknisk SEO och kontaktvägar ses över",
    ],
    pris: `Offert från ${kr(PRIS.modernisering)}`,
    markerad: true,
  },
  {
    titel: "Större redesign",
    passar: "Plattformen duger, men struktur, design och innehåll behöver göras om ordentligt.",
    punkter: [
      "Ny struktur och nya sidor",
      "Ny design i samma plattform",
      "Adresser och omdirigeringar planeras",
    ],
    pris: "Fräscha upp, offert efter genomgången",
  },
  {
    titel: "Ny hemsida",
    passar: "Tekniken är för begränsad eller dyr att laga – då lönar det sig att bygga nytt.",
    punkter: [
      "Byggs från grunden",
      "Innehåll som fungerar flyttas med",
      "Domän och viktiga adresser behålls",
    ],
    pris: `Från ${kr(PRIS.tjanstesida)}`,
    lank: { till: HEMSIDA_FORETAG.sokvag, text: "Hemsida till företag" },
  },
];

const STEG: readonly Steg[] = [
  {
    titel: "Gratis genomgång",
    text: "Ni skickar adressen till hemsidan. Vi tittar på den tillsammans i 20–25 minuter.",
  },
  {
    titel: "Analys och nuläge",
    text: "Vi sparar laddtid, besök, förfrågningar och placeringar i Google innan något ändras.",
  },
  {
    titel: "Förslag med fast pris",
    text: "En prioriterad lista med åtgärder och vad de kostar. Ni väljer vad som ska göras.",
  },
  {
    titel: "Vi gör ändringarna",
    text: "I er plattform, med omdirigeringar och test. En ändringsrunda ingår innan lansering.",
  },
  {
    titel: "Uppföljning",
    text: "Vi jämför med nuläget och kontrollerar indexeringen i Search Console.",
  },
];

const BRANSCHER = [
  "Hantverkare och byggföretag",
  "Skönhetssalonger och frisörer",
  "Konsulter och byråer",
  "Restauranger och caféer",
  "Städ- och serviceföretag",
] as const;

/** Illustrerad före/efter – ingen kundsajt. Ersätts när riktiga, godkända exempel finns. */
function ForeEfter() {
  return (
    <figure className="mt-10">
      <div className="grid gap-5 md:grid-cols-2" aria-hidden="true">
        {/* Före */}
        <div className="skylt-liten p-4">
          <p className="caps text-muted-foreground">Före</p>
          <div className="mt-3 overflow-hidden rounded-xl border border-line bg-neutral-100">
            <div className="flex items-center gap-2 bg-neutral-300 px-3 py-2">
              <span className="h-3 w-16 rounded bg-neutral-500" />
              <span className="ml-auto h-2 w-6 rounded bg-neutral-400" />
              <span className="h-2 w-6 rounded bg-neutral-400" />
              <span className="h-2 w-6 rounded bg-neutral-400" />
              <span className="h-2 w-6 rounded bg-neutral-400" />
              <span className="h-2 w-6 rounded bg-neutral-400" />
            </div>
            <div className="space-y-2 p-4">
              <span className="block h-20 rounded bg-neutral-300" />
              <span className="block h-2 w-full rounded bg-neutral-300" />
              <span className="block h-2 w-11/12 rounded bg-neutral-300" />
              <span className="block h-2 w-full rounded bg-neutral-300" />
              <span className="block h-2 w-10/12 rounded bg-neutral-300" />
              <span className="block h-2 w-full rounded bg-neutral-300" />
              <div className="grid grid-cols-3 gap-2 pt-2">
                <span className="h-10 rounded bg-neutral-300" />
                <span className="h-10 rounded bg-neutral-300" />
                <span className="h-10 rounded bg-neutral-300" />
              </div>
              <span className="block h-2 w-1/3 rounded bg-neutral-400" />
            </div>
          </div>
          <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
            <li>Lång meny, mycket text, kontakt längst ner</li>
          </ul>
        </div>
        {/* Efter */}
        <div className="skylt-liten skylt-markerad p-4">
          <p className="caps text-guld-mork">Efter</p>
          <div className="mt-3 overflow-hidden rounded-xl border border-line bg-cream">
            <div className="flex items-center gap-3 px-3 py-2">
              <span className="h-3 w-12 rounded-full bg-ink" />
              <span className="ml-auto h-2 w-8 rounded bg-ink/30" />
              <span className="h-2 w-8 rounded bg-ink/30" />
              <span className="h-5 w-16 rounded-full bg-sun" />
            </div>
            <div className="p-4">
              <span className="block h-4 w-3/4 rounded bg-ink" />
              <span className="mt-2 block h-4 w-1/2 rounded bg-ink" />
              <span className="mt-3 block h-2 w-2/3 rounded bg-ink/30" />
              <span className="mt-4 inline-block h-7 w-28 rounded-full bg-brand" />
              <div className="mt-5 grid grid-cols-3 gap-2">
                <span className="h-12 rounded-lg bg-tint" />
                <span className="h-12 rounded-lg bg-tint" />
                <span className="h-12 rounded-lg bg-tint" />
              </div>
            </div>
          </div>
          <ul className="mt-4 space-y-1 text-sm text-ink/80">
            <li>Kort budskap, tydlig knapp till kontakt, tjänsterna direkt synliga</li>
          </ul>
        </div>
      </div>
      <figcaption className="mt-4 text-sm text-muted-foreground">
        Illustration av en typisk modernisering, inte en kunds hemsida.
      </figcaption>
    </figure>
  );
}

function ModerniseraHemsida() {
  return (
    <>
      <PageHero
        tavla={{ src: "/galleri/nightingale-840.webp", bredd: 840, hojd: 1050 }}
        eyebrow={`Tjänster · ${MODERNISERA_HEMSIDA.titel}`}
        title={
          <Markerad
            text="Modernisera hemsidan&nbsp;– utan att börja om från noll"
            markera="utan att börja om"
          />
        }
        intro={`Har ni en hemsida som känns gammal, är svår att använda på mobilen eller inte ger några förfrågningar? ${FORETAG.kortnamn} uppdaterar design, hastighet, innehåll och funktioner i den sajt ni redan har, och säger till om det är smartare att bygga nytt.`}
      >
        <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "hero")}>
          Få er hemsida genomgången
        </BokaKnapp>
        <a href="#pris" className="btn-base btn-outline">
          Se pris
        </a>
      </PageHero>

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
          <li className="flex items-center gap-3 font-bold text-ink">
            <span className="rounded-full bg-sun px-3 py-1 text-sm">
              Offert från {kr(PRIS.modernisering)} exkl. moms
            </span>
          </li>
        </ul>
      </section>

      {/* Före och efter */}
      <section aria-labelledby="fore-efter" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Före och efter</p>
            <h2 id="fore-efter" className="mt-4 text-4xl sm:text-5xl">
              Samma företag, <Mark>tydligare hemsida</Mark>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              En modernisering handlar sällan om att allt ska se annorlunda ut. Det handlar om att
              besökaren snabbt ska förstå vad ni gör, lita på er och hitta hur man hör av sig, på
              den skärm hen råkar använda.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Ofta räcker det med kortare texter, en tydligare startsida, bättre bilder och en knapp
              till kontakt som syns direkt.
            </p>
          </Reveal>
        </div>
        <Reveal delay={60}>
          <ForeEfter />
        </Reveal>
      </section>

      {/* Tecken */}
      <section aria-labelledby="tecken" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Behöver hemsidan uppdateras?</p>
            <h2 id="tecken" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
              Sju tecken på att det är dags att <Mark>modernisera hemsidan</Mark>
            </h2>
          </Reveal>
          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TECKEN.map((t, i) => (
              <li key={t.titel}>
                <Reveal delay={i * 50} className="h-full">
                  <div className="skylt flex h-full gap-4 p-6">
                    <span className="font-display text-3xl leading-none text-guld-mork">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-sans text-lg font-bold tracking-normal text-ink">
                        {t.titel}
                      </h3>
                      <p className="mt-2 leading-relaxed text-muted-foreground">{t.text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <Reveal delay={80}>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ink/80">
              Känner ni igen er i två eller fler? Då finns det nästan alltid något att vinna på att
              se över sajten.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Vad vi förbättrar */}
      <section aria-labelledby="forbattra" className="container-page py-14 sm:py-20">
        <Reveal>
          <p className="eyebrow">Det här kan vi förbättra</p>
          <h2 id="forbattra" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
            Uppdatera hemsidan där det <Mark>gör skillnad</Mark>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
            Vi börjar med det som påverkar besökaren mest och arbetar i den plattform sajten redan
            finns i – {PLATTFORMAR.join(", ")}.
          </p>
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FORBATTRA.map((k, i) => (
            <li key={k.titel}>
              <Reveal delay={i * 60} className="h-full">
                <KortVy k={k} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Design, mobil och hastighet */}
      <section aria-labelledby="mobil" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page grid [&>*]:min-w-0 gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">Design</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">
              Ny design&nbsp;– <Mark>utan att byta plattform</Mark>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              I de flesta plattformar går layout, typsnitt, färger, bilder och komponenter att
              uppdatera utan att sajten byts ut. Texter och bilder som fungerar behåller vi, och vi
              föreslår vad som bör skrivas om. Behöver ni nytt material kan vi ta fram det.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <p className="eyebrow">Mobil och hastighet</p>
            <h2 id="mobil" className="mt-4 text-3xl sm:text-4xl">
              Hemsida som fungerar <Mark>på mobilen</Mark>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Vi testar sajten på mobil, surfplatta och dator och mäter laddtiden. Vanliga bovar är
              för stora bilder, onödiga tillägg och tunga typsnitt. Google mäter också
              användarupplevelsen med så kallade Core Web Vitals – vi går igenom dem, men hur långt
              det går att förbättra beror på plattformen ni har.
            </p>
            <p className="mt-5 flex gap-3 text-lg leading-relaxed text-ink/80">
              <Accessibility className="mt-1 size-5 shrink-0 text-guld-mork" aria-hidden="true" />
              Vi ser också över tillgänglighet: kontrast, textstorlek och att sajten går att använda
              med tangentbord.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SEO-risker */}
      <section aria-labelledby="seo-risk" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">SEO vid redesign</p>
            <h2 id="seo-risk" className="mt-4 text-4xl sm:text-5xl">
              Gör om hemsidan utan att <Mark>tappa i Google</Mark>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              En modernisering kan förbättra synligheten, men den kan också försämra den. Byter
              sidor adress, försvinner texter eller går länkar sönder kan Google tappa sidor som gav
              besök. Det vanligaste misstaget är att lansera den nya designen och upptäcka problemet
              först när förfrågningarna minskar.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Därför planerar vi SEO-delen innan något ändras. Någon placering kan ingen garantera,
              men riskerna går att hålla låga.
            </p>
          </Reveal>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SEO_SKYDD.map((s, i) => (
            <li key={s.titel}>
              <Reveal delay={i * 50} className="h-full">
                <div className="skylt flex h-full gap-4 p-6">
                  <Check className="mt-1 size-5 shrink-0 text-guld-mork" aria-hidden="true" />
                  <div>
                    <h3 className="font-sans text-lg font-bold tracking-normal text-ink">
                      {s.titel}
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal delay={80}>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ink/80">
            Vill ni fortsätta arbeta med synligheten efteråt?{" "}
            <Link to={SOKMOTOROPTIMERING.sokvag} className={LANK}>
              Läs om sökmotoroptimering
            </Link>{" "}
            eller{" "}
            <Link to={tjanstSokvag("seo")} className={LANK}>
              anlita oss för löpande SEO
            </Link>
            .
          </p>
        </Reveal>
      </section>

      {/* Uppdatera eller bygga nytt */}
      <section aria-labelledby="valja" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Uppdatera eller bygga nytt?</p>
            <h2 id="valja" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
              Tre vägar – vi säger <Mark>vilken som lönar sig</Mark>
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
              Ibland lönar det sig mer att bygga nytt än att laga det gamla, och då säger vi det.
              Oftast räcker det dock att förbättra den sajt ni har.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-4 lg:grid-cols-3">
            {VAGAR.map((v, i) => (
              <li key={v.titel}>
                <Reveal delay={i * 60} className="h-full">
                  <div
                    className={`skylt flex h-full flex-col p-7 ${v.markerad ? "skylt-markerad" : ""}`}
                  >
                    <h3 className="font-sans text-xl font-bold tracking-normal text-ink">
                      {v.titel}
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{v.passar}</p>
                    <ul className="mt-5 flex-1 space-y-2">
                      {v.punkter.map((p) => (
                        <li key={p} className="flex gap-3 text-ink">
                          <Check
                            className="mt-1 size-4 shrink-0 text-guld-mork"
                            aria-hidden="true"
                          />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 font-bold text-ink">{v.pris}</p>
                    {v.lank && (
                      <Link to={v.lank.till} className={`mt-4 ${LANK}`}>
                        {v.lank.text}
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pris */}
      <section aria-labelledby="pris-rubrik" className="container-page py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Pris</p>
            <h2 id="pris-rubrik" className="mt-4 text-4xl sm:text-5xl">
              Vad kostar det att <Mark>modernisera en hemsida</Mark>?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              Priset beror på hur mycket som ska göras: några uppdaterade sidor och en snabbare
              mobilvy är ett annat uppdrag än ny struktur, nya sidor och ny design. Vi går igenom
              sajten först, så att ni får ett fast pris för det som faktiskt behövs.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">{ANDRINGAR_TEXT}</p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">{AGANDE_TEXT}</p>
            <Link to={HEMSIDA_PRIS.sokvag} className={`mt-6 ${LANK}`}>
              Vad kostar en hemsida? Så räknar vi
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
          <Reveal delay={80}>
            <div id="pris" className="inramad scroll-mt-28 p-8 text-elfenben sm:p-10">
              <p className="caps text-sun">Fräscha upp hemsidan</p>
              <p className="mt-5 font-display text-5xl leading-none sm:text-6xl">
                <span className="text-3xl sm:text-4xl">från </span>
                {kr(PRIS.modernisering)}
              </p>
              <p className="mt-3 text-sm text-white/70">
                {MOMS_TEXT} Alltid offert med fast pris för jobbet.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <BokaKnapp variant="white" tjanst={TJANST} onClick={() => bokaKlick(SIDA, "pris")}>
                  Få ett fast pris
                </BokaKnapp>
              </div>
              <div className="mt-10 border-t border-white/15 pt-8">
                <p className="font-bold">Behöver ni hellre en ny hemsida?</p>
                <p className="mt-2 leading-relaxed text-white/80">
                  En tjänstesida kostar {kr(PRIS.tjanstesida)} och en e-handel {kr(PRIS.ehandel)}.
                </p>
                <Link
                  to={HEMSIDA_FORETAG.sokvag}
                  className="mt-4 inline-flex items-center gap-2 font-bold text-white underline decoration-sun decoration-2 underline-offset-4"
                >
                  Hemsida till företag
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Så går det till</p>
            <h2 id="process" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
              Från genomgång till <Mark>uppdaterad hemsida</Mark>
            </h2>
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <Stegliste steg={STEG} rad />
          </Reveal>
          <Reveal delay={120} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "process")}>
              Boka genomgång av er hemsida
            </BokaKnapp>
            <span className="text-muted-foreground">Ni godkänner priset innan vi börjar.</span>
          </Reveal>
        </div>
      </section>

      {/* Branscher och varför TAB */}
      <section aria-labelledby="varfor" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">Varför {FORETAG.kortnamn}</p>
            <h2 id="varfor" className="mt-4 text-4xl sm:text-5xl">
              En hemsida som är byggd för <Mark>att ge kunder</Mark>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              Vi tittar inte bara på hur sajten ser ut, utan på vad besökaren ska göra där: förstå
              erbjudandet, lita på er och höra av sig. Vi mäter före och efter, så att ni ser vad
              förändringen gav.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              När sajten är klar kan vi fortsätta med{" "}
              <Link to={tjanstSokvag("seo")} className={LANK}>
                SEO
              </Link>
              ,{" "}
              <Link to={tjanstSokvag("geo")} className={LANK}>
                synlighet i AI-assistenter
              </Link>{" "}
              och marknadsföring, men det är ett eget val, inget krav.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h3 className="text-2xl sm:text-3xl">Vi hjälper bland annat</h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {BRANSCHER.map((b) => (
                <li key={b} className="skylt-liten flex items-center gap-3 p-4 text-ink">
                  <Check className="size-5 shrink-0 text-guld-mork" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Vanliga frågor */}
      <section aria-labelledby="fragor" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="eyebrow">Vanliga frågor</p>
            <h2 id="fragor" className="mt-4 text-3xl sm:text-4xl">
              Vanliga frågor om att <Mark>modernisera hemsidan</Mark>
            </h2>
            <div className="mt-8">
              <VanligaFragor fragor={MODERNISERA_FRAGOR} />
            </div>
          </div>
        </div>
      </section>

      <div className="pt-14 sm:pt-20">
        <BokaPanel
          tjanst={TJANST}
          onBoka={() => bokaKlick(SIDA, "avslutning")}
          prislank={{ href: "#pris", text: `Offert från ${kr(PRIS.modernisering)}` }}
          rubrik={
            <>
              Redo att ge er hemsida <Mark>ett lyft</Mark>?
            </>
          }
          text="Skicka adressen till er hemsida och boka en gratis genomgång. Vi berättar vad som bör förbättras, vad det kostar, och om det är smartare att bygga nytt."
        />
      </div>
    </>
  );
}
