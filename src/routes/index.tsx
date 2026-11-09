import { createFileRoute, Link } from "@tanstack/react-router";
import { Fyrscen } from "@/components/Fyrscen";
import { SalRubrik, Verk } from "@/components/Galleri";
import { Mark } from "@/components/Heading";
import { Masterverket } from "@/components/Masterverket";
import { BildGalleri, ProjektLista } from "@/components/Projekt";
import { ProjektVideo } from "@/components/ProjektVideo";
import { Reveal } from "@/components/Reveal";
import { VanligaFragor } from "@/components/VanligaFragor";
import { FORETAG } from "@/lib/foretag";
import {
  AVBETALNING_TEXT,
  BINDNING_TEXT,
  kr,
  LAGSTA_MANADSPRIS,
  MOMS_TEXT,
  PRIS,
  type Fraga,
} from "@/lib/priser";
import { PROJEKT_VIDEO } from "@/lib/projekt";
import { faqSchema, sidhuvud, videoSchema } from "@/lib/seo";
import { avstava } from "@/lib/text";
import { hittaTjanst, tjanstSokvag } from "@/lib/tjanster";

export const Route = createFileRoute("/")({
  head: () => {
    const huvud = sidhuvud({
      titel: "Marknadsföringsbyrå för företag",
      beskrivning: `Vi tar fram marknadsföringsbilder, sköter SEO, GEO och Meta-annonser och bygger hemsidor åt företag. Marknadsföring från ${kr(LAGSTA_MANADSPRIS)}/mån. Boka gratis genomgång.`,
      sokvag: "/",
      schema: [faqSchema(HEM_FRAGOR), videoSchema(PROJEKT_VIDEO.startsida)],
    });
    return {
      ...huvud,
      links: [
        ...huvud.links,
        // Mobilens LCP: dukens överdel bakom rubriken är en CSS-bakgrund (.tavla-ovan) och
        // upptäcks annars först när stilmallen är tolkad. Hämtas direkt, bara på smala skärmar.
        {
          rel: "preload",
          as: "image",
          href: "/masterverk/duk-hog-ovan.webp",
          type: "image/webp",
          media: "(max-width: 1023px)",
          fetchPriority: "high",
        },
        // Datorns LCP är den liggande duken (<img> i Masterverket.tsx).
        {
          rel: "preload",
          as: "image",
          href: "/masterverk/duk-bred.webp",
          imageSrcSet: "/masterverk/duk-bred-1000.webp 1000w, /masterverk/duk-bred.webp 1506w",
          imageSizes: "min(90vw, 90rem)",
          type: "image/webp",
          media: "(min-width: 1024px)",
          fetchPriority: "high",
        },
      ],
    };
  },
  component: Start,
});

// Vanliga frågor på startsidan – svarar på det man undrar innan man anlitar en byrå.
// Visas längst ner och som FAQPage-schema.
const HEM_FRAGOR: readonly Fraga[] = [
  {
    fraga: "Vad gör en marknadsföringsbyrå?",
    svar: "Den hjälper företag att synas och få kunder – på Google, i AI-tjänster, i sociala medier och i annonser. Hos oss betyder det marknadsföringsbilder och video, SEO och GEO, Meta-annonser och hemsidor. Vi gör jobbet åt er i stället för att bara ge råd.",
  },
  {
    fraga: "Vad kostar det att anlita er?",
    svar: `Ni köper det ni behöver: bilder och video från ${kr(PRIS.studioS)}/mån, annonser från ${kr(PRIS.annonser1)}/mån, SEO och GEO från ${kr(PRIS.synlighetBas)}/mån och en ny hemsida från ${kr(PRIS.tjanstesida)}. ${MOMS_TEXT} Första genomgången är gratis.`,
  },
  {
    fraga: "Arbetar ni med företag i hela Sverige?",
    svar: "Ja. Vi har säte i Göteborg och arbetar digitalt, så det spelar ingen roll var ert företag finns.",
  },
  {
    fraga: "Finns det någon bindningstid?",
    svar: `${BINDNING_TEXT} ${AVBETALNING_TEXT}`,
  },
  {
    fraga: "Kan ni garantera att vi hamnar först på Google?",
    svar: "Nej, det kan ingen lova. Vi lovar arbetet och en rapport varje månad som visar vad det gav.",
  },
  {
    fraga: "Hur kommer vi igång?",
    svar: "Boka en gratis genomgång på 20–25 minuter. Vi går igenom er digitala närvaro och skickar sedan ett förslag med pris. Säger ni ja börjar vi.",
  },
];

// Tre övergripande områden på startsidan, var och en med en detalj ur målningen överst.
// Detaljerna i resten av sidan finns på tjänstesidorna.
const OMRADEN = [
  {
    titel: "Synas på Google & i AI",
    overrad: "Detalj I · Synlighet",
    text: "SEO och GEO som gör att kunderna hittar er, på Google och i ChatGPT.",
    bild: {
      src: "/galleri/detalj-iris.webp",
      bredd: 768,
      hojd: 948,
      alt: "Detalj ur målningen: iris och humla",
    },
    till: "/seo-byra",
  },
  {
    titel: "Innehåll & sociala medier",
    overrad: "Detalj II · Innehåll",
    text: "Bilder och korta videor som får er målgrupp att stanna upp.",
    bild: {
      src: "/galleri/detalj-pion.webp",
      bredd: 905,
      hojd: 1119,
      alt: "Detalj ur målningen: rosa pion",
    },
    till: tjanstSokvag("marknadsforingsbilder"),
  },
  {
    titel: "Kampanjer & annonsering",
    overrad: "Detalj III · Annonser",
    text: "Kampanjer som når rätt personer och går att mäta.",
    bild: {
      src: "/galleri/detalj-urna.webp",
      bredd: 822,
      hojd: 1020,
      alt: "Detalj ur målningen: bronsurnan",
    },
    till: "/meta-ads-byra",
  },
] as const;

// Hantverken och deras mästare. Bilderna är AI-genererade stilleben (oktober 2026) med
// föremål som hör till personen – inga porträtt.
const MASTARE: readonly {
  slug: string;
  person: string;
  bild: string;
  text: string;
  citat?: { text: string; lang: "la" | "en"; oversattning: string };
}[] = [
  {
    slug: "seo",
    person: "Carl von Linné",
    bild: "linne",
    text: "Linné gav varje växt ett namn och en plats, så att allt gick att hitta. Vi gör samma sak med er sajt, så att Google hittar den.",
    citat: {
      text: "Nomina si nescis, perit et cognitio rerum",
      lang: "la",
      oversattning: "Om du inte kan namnen går kunskapen förlorad.",
    },
  },
  {
    slug: "geo",
    person: "Sokrates",
    bild: "sokrates",
    text: "Sokrates lärde ut genom frågor och svar. Det är precis så folk söker hos ChatGPT i dag – vi ser till att svaret blir ni.",
    citat: {
      text: "Ad inquirendam veritatem quaerendum est",
      lang: "la",
      oversattning: "För att utforska sanningen måste man ställa frågor.",
    },
  },
  {
    slug: "meta-annonser",
    person: "Aristoteles",
    bild: "aristoteles",
    text: "Aristoteles skrev boken om att övertyga: ethos, pathos och logos, och om att tala till rätt publik. Det är annonsering.",
    citat: {
      text: "Persuasio est ars movendi animos",
      lang: "la",
      oversattning: "Övertalning är konsten att röra vid sinnena.",
    },
  },
  {
    slug: "hemsideoptimering",
    person: "Florence Nightingale",
    bild: "nightingale",
    text: "Nightingale mätte, ritade diagram och ändrade efter vad siffrorna visade. Vi gör samma sak tills fler besökare blir kunder.",
    citat: {
      text: "I use the figures freely to prove my case.",
      lang: "en",
      oversattning: "Jag använder siffrorna fritt för att bevisa min sak.",
    },
  },
  {
    slug: "marknadsforingsbilder",
    person: "Johannes Vermeer",
    bild: "vermeer",
    text: "Ljusets mästare. Varje bild han målade började med hur ljuset föll – det gör våra också.",
    citat: {
      text: "Painting is the silent poetry of light and shadow.",
      lang: "en",
      oversattning: "Måleriet är ljusets och skuggans tysta poesi.",
    },
  },
  {
    slug: "hemsida",
    person: "Leonardo da Vinci",
    bild: "davinci",
    text: "Konst och teknik i samma hand. En bra hemsida är båda: design som säljer och kod som fungerar.",
    citat: {
      text: "Details make perfection, and perfection is not a detail.",
      lang: "en",
      oversattning: "Detaljer skapar perfektion, och perfektion är ingen detalj.",
    },
  },
];

function Start() {
  return (
    <>
      {/* Hero: en inramad målning – rubriken (H1) bär sökfrasen och står på dukens mörka del. */}
      <Masterverket />

      {/* Galleriet: salarna bakom målningen. Varje sal har sin rubrik, verken har museiskyltar. */}
      <div className="galleri overflow-x-clip">
        {/* Sal I – Tjänster: tre detaljer ur samma målning */}
        <section id="tjanster" aria-labelledby="tjanster-rubrik" className="container-page sal">
          <Reveal>
            <SalRubrik nummer="I" etikett="Tjänster" id="tjanster-rubrik">
              Från idé till <Mark>synlighet</Mark>
            </SalRubrik>
          </Reveal>
          <div className="sal-tre">
            {OMRADEN.map((o) => (
              <Verk
                key={o.titel}
                bild={o.bild}
                overrad={o.overrad}
                titel={o.titel}
                till={o.till}
                lanktext="Se tjänsten"
              >
                <p className="mt-2 leading-relaxed text-muted-foreground">{o.text}</p>
              </Verk>
            ))}
          </div>
        </section>

        {/* Sal II – Varför TAB: Caesar och de sex hantverkens mästare. Det röda rummet: damasttapet
            mellan förgyllda lister, se .rod-sal i styles.css. */}
        <section aria-labelledby="lyckas-rubrik" className="rod-sal">
          <div className="container-page sal">
            <Reveal>
              <SalRubrik
                nummer="II"
                etikett={`Varför ${FORETAG.kortnamn}`}
                id="lyckas-rubrik"
                ingress="Digital marknadsföring är många hantverk på en gång. Varje hantverk har haft sin mästare. Ni kan lära er dem själva, eller låta oss sköta dem medan ni driver företaget."
              >
                Det här krävs för att <Mark>lyckas</Mark> digitalt
              </SalRubrik>
            </Reveal>
            <div className="caesar">
              <Verk
                bild={{
                  src: "/galleri/caesar-720.webp",
                  srcSet: "/galleri/caesar-720.webp 720w, /galleri/caesar-1080.webp 1080w",
                  bredd: 720,
                  hojd: 900,
                  alt: "Stilleben tillägnat Julius Caesar: lagerkrans, svärd och romersk örn på en marmorhylla",
                }}
                sizes="(min-width: 1024px) 30rem, 90vw"
                overrad="Tillägnad Julius Caesar"
                titel="Veni, vidi, vici"
                className="caesar-verk"
              />
              <Reveal className="caesar-text">
                <p className="caps text-muted-foreground">Julius Caesar · 47 f.Kr.</p>
                <blockquote lang="la" className="caesar-citat">
                  Veni, vidi, vici.
                </blockquote>
                <p className="mt-3 font-display text-2xl text-muted-foreground">
                  Jag kom, jag såg, jag segrade.
                </p>
                <p className="caesar-poang">
                  Ingen segrar osynlig. Innan ni kan vinna kunderna måste de se er, och det är de
                  här sex hantverken som gör att de gör det.
                </p>
              </Reveal>
            </div>
            <div className="sal-tre mastare">
              {MASTARE.map((m) => (
                <Verk
                  key={m.slug}
                  bild={{
                    src: `/galleri/${m.bild}-560.webp`,
                    srcSet: `/galleri/${m.bild}-560.webp 560w, /galleri/${m.bild}-840.webp 840w`,
                    bredd: 560,
                    hojd: 700,
                    alt: `Stilleben tillägnat ${m.person}`,
                  }}
                  overrad={`Tillägnad ${m.person}`}
                  titel={hittaTjanst(m.slug)?.titel ?? m.slug}
                  till={tjanstSokvag(m.slug)}
                >
                  <p className="mt-2 leading-relaxed text-muted-foreground">{m.text}</p>
                  {m.citat && (
                    <p className="mt-3 font-display text-[1.05rem] leading-snug text-ink italic">
                      <span lang={m.citat.lang}>”{m.citat.text}”</span> – {m.citat.oversattning}
                    </p>
                  )}
                </Verk>
              ))}
            </div>
          </div>
        </section>

        {/* Sal III – Tidigare projekt */}
        <section aria-labelledby="projekt-rubrik" className="container-page sal">
          <Reveal>
            <SalRubrik nummer="III" etikett="Projekt" id="projekt-rubrik">
              Några av våra <Mark>tidigare projekt</Mark>
            </SalRubrik>
          </Reveal>
          <Reveal>
            <div className="galleri-ram galleri-ram-bred">
              <ProjektVideo video={PROJEKT_VIDEO.startsida} />
            </div>
          </Reveal>
          <ProjektLista className="mt-14" />

          <Reveal className="mt-16">
            <h3 className="text-3xl sm:text-4xl">
              Marknadsföringsbilder vi <Mark>tagit fram</Mark>
            </h3>
          </Reveal>
          <BildGalleri className="mt-8" />
        </section>

        {/* Sal IV – Om TAB: faktarutorna som mässingsskyltar */}
        <section aria-labelledby="om-rubrik" className="container-page sal">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            <Reveal>
              <SalRubrik nummer="IV" etikett={`Om ${FORETAG.kortnamn}`} id="om-rubrik">
                Marknadsföring utan <Mark>krångel</Mark>
              </SalRubrik>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/80">
                {FORETAG.namn} hjälper företag i hela Sverige med bilder, synlighet och hemsidor. Ni
                får fasta priser, en kontakt och ett jobb som blir gjort.
              </p>
              <Link to="/om-oss" className="btn-base btn-outline mt-8">
                Läs mer om oss
              </Link>
            </Reveal>
            <Reveal delay={120}>
              <dl className="vaggtext">
                {[
                  ["I", "Fokus", "Marknadsföring"],
                  ["II", "Område", "Hela Sverige"],
                  ["III", "Arbetssätt", "Idé\u00a0· Produktion\u00a0· Uppföljning"],
                ].map(([nr, dt, dd]) => (
                  <div key={dt} className="vaggtext-rad">
                    <span className="vaggtext-nr" aria-hidden="true">
                      {nr}
                    </span>
                    <dt>{dt}</dt>
                    <dd>{dd}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* Sal V – Vanliga frågor */}
        <section aria-labelledby="fragor-rubrik" className="container-page sal">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <SalRubrik nummer="V" etikett="Vanliga frågor" id="fragor-rubrik">
                Innan ni anlitar en <Mark>{avstava("marknadsföringsbyrå")}</Mark>
              </SalRubrik>
            </Reveal>
            <Reveal delay={80}>
              <VanligaFragor fragor={HEM_FRAGOR} />
            </Reveal>
          </div>
        </section>
      </div>

      <Fyrscen />
    </>
  );
}
