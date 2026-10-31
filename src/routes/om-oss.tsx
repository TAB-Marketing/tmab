import { createFileRoute } from "@tanstack/react-router";
import { FileCheck, Receipt, Unlock } from "lucide-react";
import { BokaPanel } from "@/components/Boka";
import { Heading, Mark, PageHero } from "@/components/Heading";
import { Loften } from "@/components/Loften";
import { Reveal } from "@/components/Reveal";
import { FORETAG } from "@/lib/foretag";
import { AGANDE_TEXT, BINDNING_TEXT } from "@/lib/priser";
import { sidhuvud } from "@/lib/seo";

export const Route = createFileRoute("/om-oss")({
  head: () =>
    sidhuvud({
      titel: "Om oss – marknadsföringsbyrå för företag",
      beskrivning: `${FORETAG.namn} är en marknadsföringsbyrå för företag i hela Sverige. Vi tar fram bilder, sköter SEO, GEO och annonser och bygger hemsidor åt företag.`,
      sokvag: "/om-oss",
    }),
  component: OmOss,
});

// Tre saker vi står för – alla går att kontrollera på sajten och i villkoren.
const VARDERINGAR = [
  {
    ikon: Receipt,
    titel: "Fasta priser",
    text: "Ni ser vad det kostar innan vi börjar. Alla grundpriser står på sajten, och arbete utanför det avtalade stämmer vi av först.",
    stil: "skylt text-ink",
  },
  {
    ikon: Unlock,
    titel: "Ingen bindningstid",
    text: BINDNING_TEXT.replace("Ingen bindningstid. ", ""),
    stil: "skylt text-ink",
  },
  {
    ikon: FileCheck,
    titel: "Ni äger allt",
    text: AGANDE_TEXT,
    stil: "skylt text-ink",
  },
] as const;

const FAKTA = [
  { rubrik: "Varumärke", varde: FORETAG.namn },
  { rubrik: "Bolag", varde: FORETAG.juridisktNamn },
  { rubrik: "Organisationsnummer", varde: FORETAG.orgnr },
  { rubrik: "Bransch", varde: "Marknadsföring & kommunikation" },
  { rubrik: "Adress", varde: FORETAG.adress },
  { rubrik: "E-post", varde: FORETAG.epost },
  { rubrik: "Skatt", varde: "Godkänd för F-skatt, momsregistrerad" },
] as const;

const initialer = (namn: string) =>
  namn
    .split(" ")
    .filter((_, i, a) => i === 0 || i === a.length - 1)
    .map((d) => d[0])
    .join("");

function OmOss() {
  return (
    <>
      <PageHero
        tavla={{ src: "/galleri/detalj-pion.webp", bredd: 905, hojd: 1119 }}
        eyebrow="Om oss"
        title={
          <>
            En byrå som <Mark>gör jobbet</Mark> åt er
          </>
        }
        intro={`${FORETAG.namn} hjälper företag i hela Sverige med marknadsföringsbilder, SEO, GEO, annonser och hemsidor. Vi gör jobbet – ni driver företaget.`}
      />

      {/* Vilka vi är */}
      <section aria-labelledby="vilka" className="container-page py-14 sm:py-20">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Vilka vi är</p>
          <Heading className="mt-4 text-4xl sm:text-5xl">
            <span id="vilka">
              Vi har gjort det <Mark>för oss själva</Mark> först
            </span>
          </Heading>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink/80">
            <p>
              {FORETAG.namn} startades av grundarna bakom {FORETAG.juridisktNamn}. Vi har byggt och
              marknadsfört vårt eget bolag från noll: hemsida, bilder, synlighet på Google och
              försäljning.
            </p>
            <p>
              Nu gör vi samma jobb åt andra företag. Ni får en kontakt, fasta priser och någon som
              faktiskt gör arbetet, inte bara ger råd om det.
            </p>
          </div>
        </Reveal>
      </section>

      <section
        aria-label="Det vi står för"
        className="container-page grid [&>*]:min-w-0 gap-4 pb-14 md:grid-cols-3 sm:pb-20"
      >
        {VARDERINGAR.map((v, i) => (
          <Reveal key={v.titel} delay={i * 90}>
            <article className={`h-full p-8 ${v.stil}`}>
              <span className="grid size-14 place-items-center rounded-full border border-guld text-guld-mork">
                <v.ikon className="size-6" aria-hidden="true" />
              </span>
              <h2 className="mt-8 text-3xl">{v.titel}</h2>
              <p className="mt-3 leading-relaxed opacity-90">{v.text}</p>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="bg-fade-tint py-14 sm:py-20">
        <div
          className={`container-page grid gap-12 lg:gap-20 ${FORETAG.personer.length > 0 ? "lg:grid-cols-2" : "[&>*]:max-w-3xl"}`}
        >
          {FORETAG.personer.length > 0 && (
            <Reveal>
              <p className="eyebrow">Teamet</p>
              <Heading className="mt-4 text-4xl sm:text-5xl">Ledningen</Heading>
              <ul className="mt-8 space-y-3">
                {FORETAG.personer.map((p) => (
                  <li key={p.namn} className="skylt-liten flex items-center gap-4 p-4">
                    <span
                      aria-hidden="true"
                      className="grid size-14 shrink-0 place-items-center rounded-full font-display text-xl text-guld-mork border border-guld"
                    >
                      {initialer(p.namn)}
                    </span>
                    <span>
                      <span className="block font-bold text-ink">{p.namn}</span>
                      <span className="text-sm text-muted-foreground">{p.roll}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
          <Reveal delay={100}>
            <p className="eyebrow">Fakta om företaget</p>
            <dl className="skylt-liten mt-6 divide-y-2 divide-line px-6 py-2 sm:px-8">
              {FAKTA.filter((f) => f.varde).map((f) => (
                <div key={f.rubrik} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt className="text-sm font-bold text-ink">{f.rubrik}</dt>
                  <dd className="text-muted-foreground">{f.varde}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <BokaPanel />
    </>
  );
}
