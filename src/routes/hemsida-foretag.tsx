import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  FileCheck,
  Gauge,
  LayoutTemplate,
  MessageSquareText,
  Palette,
  Puzzle,
  Search,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { BokaKnapp, BokaPanel } from "@/components/Boka";
import { KortVy, type Kort } from "@/components/Kort";
import { Markerad, Mark } from "@/components/Heading";
import { SjalvMotOss } from "@/components/LyckasDigitalt";
import { ProjektLista } from "@/components/Projekt";
import { ProjektVideo } from "@/components/ProjektVideo";
import { MastarHero } from "@/components/MastarHero";
import { Reveal } from "@/components/Reveal";
import { Stegliste, type Steg } from "@/components/Steg";
import { VanligaFragor } from "@/components/VanligaFragor";
import { FORETAG } from "@/lib/foretag";
import { MASTAR_HERO } from "@/lib/mastare";
import { HEMSIDA_PRIS } from "@/lib/hemsida-pris";
import { HEMSIDA_FORETAG, HEMSIDA_FRAGOR } from "@/lib/hemsida-foretag";
import { AGANDE_TEXT, kr, MOMS_TEXT, PRIS } from "@/lib/priser";
import { PROJEKT_VIDEO } from "@/lib/projekt";
import { brodsmulor, faqSchema, sidhuvud, tjanstSchema, videoSchema } from "@/lib/seo";
import { bokaKlick } from "@/lib/sparning";
import { hittaTjanst, tjanstSokvag } from "@/lib/tjanster";
import { WEBBYRA_GOTEBORG } from "@/lib/webbyra-goteborg";

const SIDA = HEMSIDA_FORETAG.sokvag;
const TJANST = "hemsida";

export const Route = createFileRoute("/hemsida-foretag")({
  head: () => {
    const t = hittaTjanst(TJANST);
    return sidhuvud({
      titel: HEMSIDA_FORETAG.seoTitel,
      beskrivning: HEMSIDA_FORETAG.seoBeskrivning,
      sokvag: SIDA,
      schema: [
        ...(t ? [tjanstSchema(t)] : []),
        faqSchema(HEMSIDA_FRAGOR),
        videoSchema(PROJEKT_VIDEO.hemsida),
        brodsmulor([
          { namn: "Hem", sokvag: "/" },
          { namn: "Tjänster", sokvag: "/tjanster" },
          { namn: HEMSIDA_FORETAG.titel, sokvag: SIDA },
        ]),
      ],
    });
  },
  component: HemsidaForetag,
});

const FORDELAR_HERO = [
  "Anpassad efter ert företag",
  "Mobilanpassad och SEO-vänlig",
  "Personlig kontakt genom hela projektet",
] as const;

const GOR_MER: readonly Kort[] = [
  {
    titel: "Förtroende från första sekunden",
    text: "En genomtänkt design som får företaget att se lika seriöst ut som det är.",
    ikon: ShieldCheck,
  },
  {
    titel: "Fungerar på alla skärmar",
    text: "Responsiv webbdesign som är lika lätt att använda på mobilen som på datorn.",
    ikon: Smartphone,
  },
  {
    titel: "Teknisk SEO från start",
    text: "Struktur, rubriker och metadata som gör att Google förstår vad ni erbjuder.",
    ikon: Search,
  },
  {
    titel: "Tydliga vägar till kontakt",
    text: "Kontaktformulär och offertförfrågningar där besökaren faktiskt letar efter dem.",
    ikon: MessageSquareText,
  },
];

const MALGRUPPER: readonly { titel: string; text: string }[] = [
  {
    titel: "Hantverkare och byggföretag",
    text: "Visa vilka jobb ni tar och var ni arbetar, och gör det enkelt att begära offert.",
  },
  {
    titel: "Skönhetssalonger",
    text: "Behandlingar, priser och en tydlig väg till bokning, i ett utseende som matchar salongen.",
  },
  {
    titel: "Konsulter",
    text: "Gör det tydligt vad ni hjälper till med och varför kunden ska välja just er.",
  },
  {
    titel: "Städföretag",
    text: "Tjänster, område och pris i klartext, så att kunden kan jämföra och höra av sig direkt.",
  },
  {
    titel: "Restauranger och caféer",
    text: "Meny, öppettider och bordsbokning som går att hitta snabbt på mobilen.",
  },
  {
    titel: "Andra lokala tjänsteföretag",
    text: "Synas när kunder i ert område söker, och ge dem en anledning att välja er.",
  },
];

/** Checklista för småföretag – vad besökaren behöver hitta, inte vad paketet innehåller. */
const SMAFORETAG_INNEHALL: readonly (readonly [string, string])[] = [
  ["Tydlig startsida", "Vad ni gör och vem ni hjälper, direkt."],
  ["Tjänstebeskrivningar", "Vad kunden kan få hjälp med, gärna med pris."],
  ["Var ni finns", "Orter eller område ni arbetar i."],
  ["Kontaktuppgifter", "Telefon och e-post som syns på varje sida."],
  ["Formulär", "Kontakt, offertförfrågan eller bokning, det som passar er."],
  ["Mobil och SEO-grund", "Fungerar på telefonen och går att hitta på Google."],
];

const INGAR: readonly (Kort & { lank?: { till: string; text: string } })[] = [
  {
    titel: "Design anpassad efter ert varumärke",
    text: "En enhetlig och professionell design som speglar företagets identitet, med texter som säljer.",
    ikon: Palette,
  },
  {
    titel: "Mobilanpassad webbplats",
    text: "Hemsidan byggs för och testas på mobiltelefoner, surfplattor och datorer.",
    ikon: Smartphone,
  },
  {
    titel: "Grundläggande SEO",
    text: "Sidstruktur, rubriker, sidtitlar, beskrivningar och sitemap, så att sökmotorer kan förstå och visa sidorna.",
    ikon: Search,
    lank: { till: tjanstSokvag("seo"), text: "Löpande SEO" },
  },
  {
    titel: "Kontaktformulär och tydliga kontaktvägar",
    text: "Besökare ska kunna kontakta er och skicka förfrågningar utan att leta.",
    ikon: MessageSquareText,
  },
  {
    titel: "Snabb och användarvänlig",
    text: "Tydlig sidstruktur, relevant innehåll och kort laddningstid, även på mobilnät.",
    ikon: Gauge,
  },
  {
    titel: "Möjlighet att bygga vidare",
    text: "Hemsidan kan växa med verksamheten. Efter lansering tar ni över den, eller låter oss sköta drift och ändringar.",
    ikon: Puzzle,
    lank: { till: "/priser", text: "Priser" },
  },
];

const STEG: readonly Steg[] = [
  {
    titel: "Gratis genomgång",
    text: "20–25 minuter där vi går igenom företaget, era kunder och vad hemsidan ska uppnå. Efteråt får ni ett förslag med upplägg och pris.",
  },
  {
    titel: "Underlag att godkänna",
    text: "Kravunderlag, användarflöde, designbrief och tidplan, så att ni ser svart på vitt vad vi bygger innan vi börjar.",
  },
  {
    titel: "Design och bygge",
    text: "Vi designar, skriver och bygger efter tidplanen och testar på olika skärmar. En ändringsrunda ingår innan lansering.",
  },
  {
    titel: "Lansering och vidare",
    text: "Vi publicerar hemsidan och lämnar över kod och konton, eller sköter driften åt er. Vill ni synas mer finns bilder, SEO och annonser att lägga till, var för sig.",
  },
];

const PRISFAKTORER = [
  "Hur många sidor som behövs",
  "Vilken design ni önskar",
  "Om ni behöver nya bilder (köps i Studio)",
  "Vilka funktioner hemsidan ska ha",
] as const;

const VARFOR: readonly Kort[] = [
  {
    titel: "Personlig dialog",
    text: "Ni har en kontaktperson genom hela projektet och får svar inom en arbetsdag.",
    ikon: MessageSquareText,
  },
  {
    titel: "Byggd för att ge affärer",
    text: "Vi utgår från vad besökaren ska göra på sajten, inte bara från hur den ser ut.",
    ikon: LayoutTemplate,
  },
  {
    titel: "Hemsida, SEO och marknadsföring på ett ställe",
    text: "När sajten är klar kan vi fortsätta med SEO, AI-synlighet, bilder och annonser.",
    ikon: Search,
  },
];

function HemsidaForetag() {
  const hemsida = hittaTjanst(TJANST);

  return (
    <>
      <MastarHero
        mastare={MASTAR_HERO[TJANST]}
        hantverk={HEMSIDA_FORETAG.titel}
        title={
          <Markerad
            text="Hemsida till företag&nbsp;– byggd för att ge er fler kunder"
            markera="fler kunder"
          />
        }
        intro={`En professionell hemsida gör det enklare för kunderna att hitta er, förstå vad ni erbjuder och ta kontakt. ${FORETAG.kortnamn} bygger moderna, snabba och mobilanpassade hemsidor där design och affärsmål går hand i hand, oavsett om företaget är etablerat eller precis har startat.`}
      >
        <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "hero")} />
        <a href="#projekt" className="btn-base btn-outline">
          Se tidigare projekt
        </a>
      </MastarHero>

      {/* Tre fördelar och pris direkt under rubriken */}
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
              Från {kr(PRIS.tjanstesida)} exkl. moms
            </span>
          </li>
        </ul>
      </section>

      {/* 2. En hemsida som arbetar för företaget */}
      <section aria-labelledby="gor-mer" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Mer än en snygg yta</p>
            <h2 id="gor-mer" className="mt-4 text-4xl sm:text-5xl">
              En professionell hemsida som <Mark>gör mer</Mark> än att bara se bra ut
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              Hemsidan är ofta det första mötet mellan ert företag och en ny kund. En genomtänkt
              företagshemsida ska därför inte bara presentera verksamheten – den ska hjälpa
              besökaren att ta nästa steg.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Därför bygger vi med tydlig navigering, relevant innehåll, snabb laddningstid och
              genomtänkta kontaktvägar. Det ska gå fort att förstå vad ni erbjuder, varför kunden
              ska välja er och hur man hör av sig. Tillsammans med en grund i sökmotoroptimering
              blir det en stabil bas för hela er digitala närvaro.
            </p>
          </Reveal>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GOR_MER.map((k, i) => (
            <li key={k.titel}>
              <Reveal delay={i * 60} className="h-full">
                <KortVy k={k} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Småföretag och nystartade */}
      <section aria-labelledby="smaforetag" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">För vem</p>
            <h2 id="smaforetag" className="mt-4 max-w-4xl text-4xl sm:text-5xl">
              Hemsidor för småföretag, <Mark>nystartade företag</Mark> och växande verksamheter
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-16">
            <Reveal delay={60}>
              <p className="text-lg leading-relaxed text-ink/80">
                Att skapa en hemsida till ett småföretag eller en enskild firma behöver inte vara
                ett stort eller dyrt projekt. För ett nystartat företag är hemsidan ofta första
                steget för att presentera tjänsterna, skapa trovärdighet och bli lättare att hitta.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-lg leading-relaxed text-ink/80">
                För ett mer etablerat företag kan en ny webbplats modernisera varumärket, förbättra
                kundupplevelsen och ge fler förfrågningar. Vi anpassar struktur, innehåll och
                funktioner efter verksamheten – alla företag behöver inte samma lösning.
              </p>
            </Reveal>
          </div>

          <Reveal delay={80} className="mt-12">
            <h3 className="text-2xl sm:text-3xl">Några verksamheter vi kan hjälpa</h3>
          </Reveal>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MALGRUPPER.map((m, i) => (
              <li key={m.titel}>
                <Reveal delay={i * 50} className="h-full">
                  <div className="skylt h-full p-6">
                    <h4 className="font-sans text-lg font-bold tracking-normal text-ink">
                      {m.titel}
                    </h4>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{m.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={60} className="mt-14">
            <div className="skylt grid gap-8 p-8 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
              <div>
                <h3 className="text-3xl sm:text-4xl">
                  Vad ska finnas på en hemsida för småföretag?
                </h3>
                <p className="mt-4 leading-relaxed text-ink/80">
                  Med liten budget lönar det sig att få det viktigaste att fungera riktigt bra i
                  stället för att betala för funktioner ingen använder. Det här behöver de flesta
                  mindre företag – resten kan byggas på när verksamheten växer.
                </p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {SMAFORETAG_INNEHALL.map(([t, x]) => (
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
        </div>
      </section>

      {/* 4. Vad ingår */}
      <section aria-labelledby="ingar" className="container-page py-14 sm:py-20">
        <Reveal>
          <p className="eyebrow">Det här ingår</p>
          <h2 id="ingar" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
            Vad ingår när {FORETAG.kortnamn} bygger <Mark>er hemsida</Mark>?
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
            Vi utgår från verksamhetens mål, målgrupp och önskemål, och tar fram en lösning där
            design, funktion och användarvänlighet fungerar tillsammans.
          </p>
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INGAR.map((k, i) => (
            <li key={k.titel}>
              <Reveal delay={i * 60} className="h-full">
                <KortVy k={k}>
                  {k.lank && (
                    <Link
                      to={k.lank.till}
                      className="mt-5 inline-flex items-center gap-2 font-bold text-ink underline decoration-sun decoration-2 underline-offset-4"
                    >
                      {k.lank.text}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  )}
                </KortVy>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal delay={80}>
          <p className="mt-8 flex max-w-3xl gap-3 text-lg leading-relaxed text-ink/80">
            <FileCheck className="mt-1 size-5 shrink-0 text-guld-mork" aria-hidden="true" />
            {AGANDE_TEXT} Domän och konton registreras i ert namn.
          </p>
        </Reveal>
      </section>

      {/* 5. Så går det till */}
      <section aria-labelledby="process" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Så går det till</p>
            <h2 id="process" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
              Så hjälper vi er att skapa en hemsida till <Mark>ert företag</Mark>
            </h2>
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <Stegliste steg={STEG} rad />
          </Reveal>
          <Reveal delay={120} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "process")}>
              Diskutera er nya hemsida
            </BokaKnapp>
            <span className="text-muted-foreground">Ni godkänner allt innan vi bygger.</span>
          </Reveal>
        </div>
      </section>

      {/* 6. Portfolio */}
      <section
        id="projekt"
        aria-labelledby="projekt-rubrik"
        className="container-page scroll-mt-28 py-14 sm:py-20"
      >
        <Reveal>
          <p className="eyebrow">Projekt</p>
          <h2 id="projekt-rubrik" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
            Se exempel på hemsidor och <Mark>digitala projekt</Mark>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
            Varje företag har olika behov, så vi utgår från verksamhetens mål när vi planerar
            design, innehåll och funktioner. Här är några av våra tidigare projekt.
          </p>
        </Reveal>
        <Reveal className="mt-10">
          <ProjektVideo video={PROJEKT_VIDEO.hemsida} />
        </Reveal>
        <ProjektLista className="mt-12" />
      </section>

      {/* 7. Pris */}
      <section aria-labelledby="pris-rubrik" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page grid [&>*]:min-w-0 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Pris</p>
            <h2 id="pris-rubrik" className="mt-4 text-4xl sm:text-5xl">
              Vad kostar en <Mark>hemsida till företag</Mark>?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              Priset beror på hur stor och avancerad hemsidan ska vara. En enklare företagshemsida
              med information om verksamheten och kontaktmöjligheter är ett annat projekt än en
              webbplats med flera tjänstesidor och specialanpassade funktioner. Det som påverkar
              mest:
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {PRISFAKTORER.map((p) => (
                <li key={p} className="skylt-liten flex items-center gap-3 p-4 text-ink">
                  <Check className="size-5 shrink-0 text-guld-mork" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              Vi börjar med att förstå vad ert företag faktiskt behöver och skickar sedan ett
              tydligt förslag med upplägg och pris. Ni vet vad som ingår innan något arbete
              påbörjas.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div id="pris" className="inramad scroll-mt-28 p-8 text-elfenben sm:p-10">
              <p className="caps text-sun">Ny hemsida</p>
              <dl className="mt-5 divide-y divide-white/15">
                <div className="flex items-baseline justify-between gap-4 pb-3">
                  <dt className="text-white/80">Tjänstesida, upp till 5 sidor</dt>
                  <dd className="font-display text-4xl">{kr(PRIS.tjanstesida)}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="text-white/80">E-handel</dt>
                  <dd className="font-display text-4xl">{kr(PRIS.ehandel)}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="text-white/80">Skräddarsytt</dt>
                  <dd className="font-bold">från {kr(PRIS.webbSkraddarsytt)}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 pt-3">
                  <dt className="text-white/80">Drift efter lansering (frivilligt)</dt>
                  <dd className="font-bold">från {kr(PRIS.essential)}/mån</dd>
                </div>
              </dl>
              <p className="mt-4 text-sm text-white/70">
                {MOMS_TEXT} Första genomgången och förslaget är gratis.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <BokaKnapp variant="white" tjanst={TJANST} onClick={() => bokaKlick(SIDA, "pris")}>
                  Få ett fast pris
                </BokaKnapp>
                <Link to={HEMSIDA_PRIS.sokvag} className="btn-base btn-outline-white">
                  Se vad en hemsida kostar
                </Link>
              </div>
              <div className="mt-10 border-t border-white/15 pt-8">
                <p className="font-bold">Har ni redan en hemsida?</p>
                <p className="mt-2 leading-relaxed text-white/80">
                  Ibland räcker det att modernisera den ni har – offert från{" "}
                  {kr(PRIS.modernisering)}.
                </p>
                <Link
                  to={tjanstSokvag("hemsideoptimering")}
                  className="mt-4 inline-flex items-center gap-2 font-bold text-white underline decoration-sun decoration-2 underline-offset-4"
                >
                  Fräscha upp befintlig hemsida
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8. Varför TAB */}
      <section aria-labelledby="varfor" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Varför {FORETAG.kortnamn}</p>
            <h2 id="varfor" className="mt-4 text-4xl sm:text-5xl">
              Varför välja {FORETAG.kortnamn} när ni behöver en <Mark>ny hemsida</Mark>?
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              En bra hemsida ska vara enkel att använda, representera företaget professionellt och
              göra det lättare för kunder att höra av sig. Därför tittar vi inte bara på hur sajten
              ser ut, utan på hur den fungerar i praktiken.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Vi kombinerar webbdesign med{" "}
              <Link
                to={tjanstSokvag("seo")}
                className="font-bold text-ink underline decoration-sun decoration-2 underline-offset-4"
              >
                SEO
              </Link>
              ,{" "}
              <Link
                to={tjanstSokvag("geo")}
                className="font-bold text-ink underline decoration-sun decoration-2 underline-offset-4"
              >
                synlighet i AI-assistenter
              </Link>{" "}
              och digital marknadsföring. Det gör att ni kan tänka långsiktigt kring er digitala
              närvaro, även om första steget bara är en ny hemsida.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Vi arbetar med företag i hela Sverige och har vårt säte i Göteborg – läs mer om{" "}
              <Link
                to={WEBBYRA_GOTEBORG.sokvag}
                className="font-bold text-ink underline decoration-sun decoration-2 underline-offset-4"
              >
                vår webbyrå i Göteborg
              </Link>
              .
            </p>
          </Reveal>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {VARFOR.map((k, i) => (
            <li key={k.titel}>
              <Reveal delay={i * 60} className="h-full">
                <KortVy k={k} />
              </Reveal>
            </li>
          ))}
        </ul>
        {hemsida && (
          <Reveal delay={80} className="mt-14">
            <h3 className="max-w-3xl text-3xl sm:text-4xl">
              Det här krävs för en ny hemsida&nbsp;– <Mark>vi gör det åt er</Mark>
            </h3>
            <div className="mt-8">
              <SjalvMotOss o={hemsida} />
            </div>
          </Reveal>
        )}
      </section>

      {/* 9. Vanliga frågor */}
      <section aria-labelledby="fragor" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="eyebrow">Vanliga frågor</p>
            <h2 id="fragor" className="mt-4 text-3xl sm:text-4xl">
              Vanliga frågor om <Mark>hemsidor till företag</Mark>
            </h2>
            <div className="mt-8">
              <VanligaFragor fragor={HEMSIDA_FRAGOR} />
            </div>
          </div>
        </div>
      </section>

      {/* 10. Avslutning */}
      <div className="pt-14 sm:pt-20">
        <BokaPanel
          tjanst={TJANST}
          onBoka={() => bokaKlick(SIDA, "avslutning")}
          rubrik={
            <>
              Redo att skapa en professionell hemsida till <Mark>ert företag</Mark>?
            </>
          }
          text="Oavsett om ni bygger er första hemsida eller vill ersätta en gammal: berätta kort om företaget, så går vi igenom hur en ny hemsida kan se ut utifrån era mål. Genomgången är gratis och ni förbinder er inte till något."
        />
      </div>
    </>
  );
}
