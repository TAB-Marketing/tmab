import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  Car,
  Check,
  Laptop,
  MapPin,
  RefreshCw,
  Search,
  Video,
  type LucideIcon,
} from "lucide-react";
import { BokaKnapp, BokaPanel } from "@/components/Boka";
import { Markerad, Mark, PageHero } from "@/components/Heading";
import { ProjektLista } from "@/components/Projekt";
import { Reveal } from "@/components/Reveal";
import { Stegliste, type Steg } from "@/components/Steg";
import { VanligaFragor } from "@/components/VanligaFragor";
import { FORETAG } from "@/lib/foretag";
import { GEO_OPTIMERING } from "@/lib/geo-optimering";
import { HEMSIDA_FORETAG } from "@/lib/hemsida-foretag";
import { HEMSIDA_PRIS } from "@/lib/hemsida-pris";
import { LOKAL_SEO } from "@/lib/lokal-seo";
import { MODERNISERA_HEMSIDA } from "@/lib/modernisera-hemsida";
import { kr, MOMS_TEXT, PRIS } from "@/lib/priser";
import { SEO_BYRA } from "@/lib/seo-byra";
import { brodsmulor, faqSchema, sidhuvud, tjanstSchema } from "@/lib/seo";
import { bokaKlick } from "@/lib/sparning";
import { hittaTjanst } from "@/lib/tjanster";
import { GOTEBORG_FRAGOR, OMRADEN, WEBBYRA_GOTEBORG } from "@/lib/webbyra-goteborg";

const SIDA = WEBBYRA_GOTEBORG.sokvag;
const TJANST = "hemsida";
const LANK =
  "inline-flex items-center gap-2 font-bold text-ink underline decoration-sun decoration-2 underline-offset-4";

export const Route = createFileRoute("/webbyra-goteborg")({
  head: () => {
    const t = hittaTjanst(TJANST);
    return sidhuvud({
      titel: WEBBYRA_GOTEBORG.seoTitel,
      beskrivning: WEBBYRA_GOTEBORG.seoBeskrivning,
      sokvag: SIDA,
      schema: [
        ...(t
          ? [
              tjanstSchema(t, {
                namn: "Webbdesign och webbutveckling i Göteborg",
                beskrivning: WEBBYRA_GOTEBORG.seoBeskrivning,
                sokvag: SIDA,
                omraden: OMRADEN,
              }),
            ]
          : []),
        faqSchema(GOTEBORG_FRAGOR),
        brodsmulor([
          { namn: "Hem", sokvag: "/" },
          { namn: "Tjänster", sokvag: "/tjanster" },
          { namn: WEBBYRA_GOTEBORG.titel, sokvag: SIDA },
        ]),
      ],
    });
  },
  component: WebbyraGoteborg,
});

const FAKTA = [
  "Säte i Göteborg",
  "Möten digitalt eller hos er",
  "Fast pris innan vi börjar",
] as const;

/** Tjänsterna i korthet – varje kort leder till sidan som beskriver tjänsten fullt ut. */
const TJANSTER: readonly {
  titel: string;
  text: string;
  ikon: LucideIcon;
  till: string;
  lank: string;
}[] = [
  {
    titel: "Ny hemsida",
    text: "Webbdesign och webbutveckling av en ny företagshemsida, mobilanpassad, snabb och med en SEO-grund.",
    ikon: Laptop,
    till: HEMSIDA_FORETAG.sokvag,
    lank: "Hemsida till företag",
  },
  {
    titel: "Modernisera befintlig hemsida",
    text: "Ny design, bättre mobilvy, snabbare sidor och tydligare kontaktvägar i den sajt ni redan har.",
    ikon: RefreshCw,
    till: MODERNISERA_HEMSIDA.sokvag,
    lank: "Modernisera hemsidan",
  },
  {
    titel: "SEO och lokal synlighet",
    text: "Synas när kunder i Göteborg söker efter det ni gör, på Google och i Google Maps.",
    ikon: Search,
    till: LOKAL_SEO.sokvag,
    lank: "Lokal SEO",
  },
  {
    titel: "Synlighet i AI-sök",
    text: "Tydlig information om företaget som ChatGPT och Googles AI-funktioner kan hitta och förstå.",
    ikon: Bot,
    till: GEO_OPTIMERING.sokvag,
    lank: "GEO-optimering",
  },
];

const STEG: readonly Steg[] = [
  {
    titel: "Gratis genomgång",
    text: "20–25 minuter på video, telefon eller hos er om företaget och vad hemsidan ska uppnå.",
  },
  {
    titel: "Förslag och pris",
    text: "Ni får upplägg, tidplan och fast pris skriftligt, innan något arbete påbörjas.",
  },
  {
    titel: "Design och bygge",
    text: "Vi visar utkasten på skärmen och ni kommenterar. En ändringsrunda ingår innan lansering.",
  },
  {
    titel: "Lansering",
    text: "Hemsidan publiceras i ert namn. Senare ändringar ingår i drift Total eller köps som klippkort.",
  },
];

const KRANSKOMMUNER = ["Mölndal", "Partille", "Kungälv", "Härryda", "Lerum", "Ale"] as const;

function WebbyraGoteborg() {
  return (
    <>
      <PageHero
        tavla={{ src: "/galleri/davinci-840.webp", bredd: 840, hojd: 1050 }}
        eyebrow={`Tjänster · ${WEBBYRA_GOTEBORG.titel}`}
        title={
          <Markerad
            text="Webbyrå Göteborg&nbsp;– professionell webbdesign för ert företag"
            markera="webbdesign för ert företag"
          />
        }
        intro={`${FORETAG.kortnamn} är en webbyrå med säte i Göteborg. Vi bygger moderna, mobilanpassade hemsidor och förbättrar befintliga sajter åt företag i Göteborg och resten av Västra Götaland, med fast pris och möten på video eller telefon, eller hos er om ni hellre ses på plats.`}
      >
        <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "hero")} />
        <Link to={HEMSIDA_PRIS.sokvag} className="btn-base btn-outline">
          Se våra hemsidepriser
        </Link>
      </PageHero>

      <section aria-label="Kort om oss" className="container-page pt-8 sm:pt-10">
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {FAKTA.map((f) => (
            <li key={f} className="flex items-center gap-3 font-bold text-ink">
              <span className="grid size-7 shrink-0 place-items-center rounded-full text-guld-mork border border-guld">
                <Check className="size-4" strokeWidth={3} aria-hidden="true" />
              </span>
              {f}
            </li>
          ))}
          <li className="flex items-center">
            <span className="rounded-full bg-sun px-3 py-1 text-sm font-bold text-ink">
              Ny hemsida från {kr(PRIS.tjanstesida)} exkl. moms
            </span>
          </li>
        </ul>
      </section>

      {/* Tjänster */}
      <section aria-labelledby="tjanster" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Det här gör vi</p>
            <h2 id="tjanster" className="mt-4 text-4xl sm:text-5xl">
              Webbdesign och webbutveckling för <Mark>företag i Göteborg</Mark>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              En hantverkare i Mölndal behöver tjänstesidor och ett offertformulär. En konsult i
              centrala Göteborg vill visa kompetens och göra det enkelt att boka ett möte. Vi utgår
              från vad era kunder ska göra på sajten, och bygger det, inte mer.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Här är vad vi hjälper företag i Göteborg med. Varje tjänst har en egen sida med
              innehåll, process och pris.
            </p>
          </Reveal>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {TJANSTER.map((k, i) => (
            <li key={k.titel}>
              <Reveal delay={i * 60} className="h-full">
                <div className="skylt flex h-full flex-col p-7">
                  <span className="grid size-12 place-items-center rounded-full text-guld-mork border border-guld/60">
                    <k.ikon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-sans text-lg leading-snug font-bold tracking-normal text-ink">
                    {k.titel}
                  </h3>
                  <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">{k.text}</p>
                  <Link to={k.till} className={`mt-5 ${LANK}`}>
                    {k.lank}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Samarbete */}
      <section aria-labelledby="samarbete" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">Så samarbetar vi</p>
              <h2 id="samarbete" className="mt-4 text-4xl sm:text-5xl">
                Digitalt när det passar, <Mark>på plats</Mark> när ni vill
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-lg leading-relaxed text-ink/80">
                De flesta möten tar vi på video eller telefon – det gör det enkelt att boka in en
                genomgång samma vecka, och ni ser förslag och utkast på skärmen. Vill ni hellre ses
                på plats kommer vi ut till er i Göteborg och kranskommunerna. Vi har inget kontor
                där vi tar emot besök.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  { ikon: MapPin, text: `Säte: ${FORETAG.adress} (inga besök)` },
                  { ikon: Video, text: "Möten på video eller telefon, 20–25 minuter" },
                  { ikon: Car, text: "Vi kommer ut till er i Göteborgsområdet om ni vill" },
                  { ikon: Check, text: "Svar inom en arbetsdag" },
                ].map((r) => (
                  <li key={r.text} className="flex gap-3 text-ink">
                    <r.ikon className="mt-1 size-5 shrink-0 text-guld-mork" aria-hidden="true" />
                    {r.text}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={80} className="mt-12">
            <Stegliste steg={STEG} rad />
          </Reveal>
          <Reveal delay={120} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "process")}>
              Boka ett möte
            </BokaKnapp>
            <span className="text-muted-foreground">Ni godkänner priset innan vi börjar.</span>
          </Reveal>
        </div>
      </section>

      {/* Område */}
      <section aria-labelledby="omrade" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Område</p>
            <h2 id="omrade" className="mt-4 text-4xl sm:text-5xl">
              Göteborg, kranskommunerna och <Mark>Västra Götaland</Mark>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              Vi arbetar med företag i hela Göteborg och i kranskommuner som{" "}
              {KRANSKOMMUNER.slice(0, -1).join(", ")} och {KRANSKOMMUNER.at(-1)}, och i resten av
              Västra Götaland. I Göteborg och kranskommunerna kan vi ses hos er; längre bort tar vi
              mötena digitalt, och det fungerar likadant för ett företag i Borås, Trollhättan eller
              resten av Sverige.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Vill ni själva synas när kunder i ert område söker, är det hemsidan, en lokal
              tjänstesida och er Google-företagsprofil som avgör. Det hjälper vi till med under{" "}
              <Link to={LOKAL_SEO.sokvag} className={LANK}>
                lokal SEO
              </Link>
              . Någon placering på Google eller i Google Maps kan ingen garantera.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Projekt */}
      <section aria-labelledby="projekt" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Projekt</p>
            <h2 id="projekt" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
              Hemsidor vi har <Mark>byggt</Mark>
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
              Hvittfeldt Invest i Göteborg har vi byggt hemsidan åt och sköter den i dag. Treatly är
              vårt eget moderbolag – där har vi byggt hemsidan och kundplattformen.
            </p>
          </Reveal>
          <ProjektLista className="mt-10" />
        </div>
      </section>

      {/* Pris */}
      <section aria-labelledby="pris-rubrik" className="container-page py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Pris</p>
            <h2 id="pris-rubrik" className="mt-4 text-4xl sm:text-5xl">
              Vad kostar en hemsida hos en <Mark>webbyrå i Göteborg</Mark>?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              Priset beror på hur många sidor och funktioner ni behöver och om vi tar fram texter
              och bilder. Det är detsamma i Göteborg som i resten av Sverige – vi har inga
              ortspriser. När ni jämför webbyråer i Göteborg: titta på vad som ingår, vem som äger
              sajten efteråt och vad senare ändringar kostar, inte bara på slutsumman.
            </p>
            <Link to={HEMSIDA_PRIS.sokvag} className={`mt-6 ${LANK}`}>
              Så räknar vi ut priset på en hemsida
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
          <Reveal delay={80}>
            <div id="pris" className="inramad scroll-mt-28 p-8 text-elfenben sm:p-10">
              <p className="caps text-sun">Ny hemsida</p>
              <p className="mt-5 font-display text-5xl leading-none sm:text-6xl">
                <span className="text-3xl sm:text-4xl">från </span>
                {kr(PRIS.tjanstesida)}
              </p>
              <p className="mt-3 text-sm text-white/70">
                {MOMS_TEXT} Tjänstesida med upp till 5 sidor, eller {kr(PRIS.tjanstesidaManad)}/mån
                i 12 månader. E-handel {kr(PRIS.ehandel)}. Drift från {kr(PRIS.essential)}/mån.
                Fräscha upp: offert från {kr(PRIS.modernisering)}.
              </p>
              <div className="mt-8">
                <BokaKnapp variant="white" tjanst={TJANST} onClick={() => bokaKlick(SIDA, "pris")}>
                  Få ett fast pris
                </BokaKnapp>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vanliga frågor */}
      <section aria-labelledby="fragor" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="eyebrow">Vanliga frågor</p>
            <h2 id="fragor" className="mt-4 text-3xl sm:text-4xl">
              Vanliga frågor om webbyråer och <Mark>webbdesign i Göteborg</Mark>
            </h2>
            <div className="mt-8">
              <VanligaFragor fragor={GOTEBORG_FRAGOR} />
            </div>
            <p className="mt-8 text-ink/80">
              Söker ni hjälp med SEO snarare än hemsida? Läs om oss som{" "}
              <Link to={SEO_BYRA.sokvag} className={LANK}>
                SEO-byrå
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <div className="pt-14 sm:pt-20">
        <BokaPanel
          tjanst={TJANST}
          onBoka={() => bokaKlick(SIDA, "avslutning")}
          prislank={{ href: "#pris", text: `Ny hemsida från ${kr(PRIS.tjanstesida)}` }}
          rubrik={
            <>
              Behöver ert företag i Göteborg en <Mark>ny hemsida</Mark>?
            </>
          }
          text="Boka en gratis genomgång, på video, telefon eller hos er i Göteborgsområdet. Vi hör av oss inom en arbetsdag, går igenom vad ni behöver och skickar ett förslag med fast pris."
        />
      </div>
    </>
  );
}
