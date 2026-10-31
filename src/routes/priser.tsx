import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { BokaKnapp, BokaPanel } from "@/components/Boka";
import { Engangsvaljare } from "@/components/Engangsvaljare";
import { PrisvalProvider, usePrisval } from "@/components/Prisval";
import { Mark, PageHero } from "@/components/Heading";
import { Loften } from "@/components/Loften";
import { Reveal } from "@/components/Reveal";
import { VanligaFragor } from "@/components/VanligaFragor";
import {
  DELAR,
  EN_I_TAGET_TEXT,
  EXTERN,
  KOMBINATIONER,
  kr,
  LAGSTA_MANADSPRIS,
  MOMS_TEXT,
  PRIS,
  PRIS_FRAGOR,
  STARTAVGIFT_TEXT,
  type Del,
  type Niva,
} from "@/lib/priser";
import { faqSchema, paketSchema, sidhuvud } from "@/lib/seo";
import { tjanstSokvag } from "@/lib/tjanster";

export const Route = createFileRoute("/priser")({
  head: () =>
    sidhuvud({
      titel: `Priser – marknadsföring från ${kr(LAGSTA_MANADSPRIS)}/mån`,
      beskrivning: `Bilder och video från ${kr(PRIS.studioS)}/mån, annonser från ${kr(PRIS.annonser1)}/mån, SEO och GEO från ${kr(PRIS.synlighetBas)}/mån och hemsida från ${kr(PRIS.tjanstesida)}. Ingen bindningstid. ${MOMS_TEXT}`,
      sokvag: "/priser",
      schema: [paketSchema(), faqSchema(PRIS_FRAGOR)],
    }),
  component: Priser,
});

const enhet = (e: "mån" | "engång") => (e === "mån" ? "/mån" : "");

/** Lägger till eller tar bort nivån i urvalet. Ett nytt val ersätter ett annat i samma del. */
function Valknapp({ n, utvald }: { n: Niva; utvald: boolean }) {
  const { arVald, vaxla } = usePrisval();
  const vald = arVald(n.id);
  return (
    <button
      type="button"
      aria-pressed={vald}
      onClick={() => vaxla(n.id)}
      className={`btn-base w-full ${vald ? "bg-sun text-ink" : utvald ? "btn-white" : "btn-dark"}`}
    >
      {vald ? (
        <>
          <Check className="size-4" strokeWidth={3} aria-hidden="true" />
          Vald
        </>
      ) : (
        `Välj ${n.namn}`
      )}
    </button>
  );
}

function Nivakort({ n, valbar }: { n: Niva; valbar: boolean }) {
  const utvald = n.utvald === true;
  return (
    <article
      aria-labelledby={`niva-${n.id}`}
      className={`relative flex h-full flex-col p-7 sm:p-8 ${
        utvald ? "inramad text-elfenben" : "skylt text-ink"
      }`}
    >
      {utvald && (
        <span className="absolute -top-3.5 left-7 -rotate-[2deg] rounded-full bg-sun px-4 py-1.5 text-xs font-bold tracking-[0.14em] text-ink uppercase shadow-[3px_3px_0_var(--ink)]">
          Vi föreslår
        </span>
      )}
      <h4
        id={`niva-${n.id}`}
        className={`font-sans text-xs font-bold tracking-[0.22em] uppercase ${
          utvald ? "text-white/85" : "text-guld-mork"
        }`}
      >
        {n.namn}
      </h4>
      <p className="mt-4 font-display text-4xl leading-none sm:text-5xl">
        {n.fran && <span className="text-xl sm:text-2xl">från </span>}
        {kr(n.belopp)}
        <span className="text-xl sm:text-2xl">{enhet(n.enhet)}</span>
      </p>
      <p className={`mt-2 text-sm ${utvald ? "text-white/80" : "text-muted-foreground"}`}>
        {n.enhet === "mån" ? "exkl. moms · ingen bindningstid" : "exkl. moms · engångspris"}
      </p>
      {n.alternativ && (
        <p className={`mt-1 text-sm font-bold ${utvald ? "text-sun" : "text-ink"}`}>
          {n.alternativ}
        </p>
      )}
      <ul className={`mt-6 space-y-3 border-t pt-6 ${utvald ? "border-white/25" : "border-line"}`}>
        {n.ingar.map((rad) => (
          <li key={rad} className="flex gap-3">
            <span
              className={`grid size-6 shrink-0 place-items-center rounded-full ${
                utvald ? "border border-guld text-guld" : "border border-guld text-guld-mork"
              }`}
            >
              <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
            </span>
            <span className={utvald ? "font-bold" : ""}>{rad}</span>
          </li>
        ))}
      </ul>
      {valbar && (
        <div className="mt-auto pt-8">
          <Valknapp n={n} utvald={utvald} />
        </div>
      )}
    </article>
  );
}

function Nivarad({
  rubrik,
  nivaer,
  valbar,
  not,
}: {
  rubrik: string;
  nivaer: readonly Niva[];
  valbar: boolean;
  not?: string | undefined;
}) {
  return (
    <>
      <h3 className="mt-8 font-sans text-sm font-bold tracking-[0.18em] text-muted-foreground uppercase">
        {rubrik}
      </h3>
      {not && <p className="mt-2 max-w-2xl text-ink/80">{not}</p>}
      <div
        className={`mt-6 grid items-stretch gap-5 ${nivaer.length === 2 ? "md:grid-cols-2 lg:max-w-4xl" : "md:grid-cols-3"}`}
      >
        {nivaer.map((n, i) => (
          <Reveal key={n.id} delay={i * 70} className="h-full">
            <Nivakort n={n} valbar={valbar} />
          </Reveal>
        ))}
      </div>
    </>
  );
}

function Delavsnitt({ d, nr }: { d: Del; nr: number }) {
  const valbar = true;
  return (
    <section
      id={d.id}
      aria-labelledby={`rubrik-${d.id}`}
      className={`scroll-mt-24 py-10 sm:py-14 ${nr % 2 === 0 ? "bg-fade-tint" : ""}`}
    >
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">
              0{nr} · {d.vad}
            </p>
            <h2 id={`rubrik-${d.id}`} className="mt-4 text-4xl sm:text-5xl">
              <Mark>{d.namn}</Mark>
            </h2>
            <p className="mt-4 text-lg text-ink">
              Från{" "}
              <span className="font-display text-2xl">
                {kr(d.lagsta.belopp)}
                {enhet(d.lagsta.enhet)}
              </span>
            </p>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">{d.intro}</p>
            <Link
              to={tjanstSokvag(d.slug)}
              className="mt-5 inline-flex items-center gap-2 font-bold text-ink underline decoration-sun decoration-2 underline-offset-4"
            >
              Läs mer om tjänsten
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        {d.bygge && <Nivarad rubrik="Bygge" nivaer={d.bygge} valbar />}
        <Nivarad
          rubrik={d.nivaRubrik}
          nivaer={d.nivaer}
          valbar={valbar}
          not={
            d.id === "synlighet"
              ? "Osäker på nivå? Välj den som verkar rimlig – vi föreslår rätt nivå i genomgången, utifrån konkurrensen och hur sajten ser ut."
              : undefined
          }
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-10">
          {d.ingarAlltid && (
            <Reveal className="min-w-0">
              <h3 className="font-sans text-sm font-bold tracking-[0.18em] text-muted-foreground uppercase">
                Så fungerar det
              </h3>
              <ul className="mt-4 space-y-2.5">
                {d.ingarAlltid.map((r) => (
                  <li key={r} className="flex gap-3 text-ink/85">
                    <Check className="mt-1 size-4 shrink-0 text-guld-mork" aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
          <Reveal delay={80} className="min-w-0">
            <h3 className="font-sans text-sm font-bold tracking-[0.18em] text-muted-foreground uppercase">
              Bra att veta
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
              {d.granser.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Priser() {
  return (
    <PrisvalProvider>
      <PageHero
        tavla={{ src: "/galleri/detalj-urna.webp", bredd: 822, hojd: 1020 }}
        eyebrow="Priser"
        title={
          <>
            Köp det ni behöver&nbsp;– <Mark>inget mer</Mark>
          </>
        }
        intro="Fyra delar som köps var för sig: bilder och video, annonser, synlighet på Google och i AI-svar, och hemsida. Fasta priser och ingen bindningstid på månadstjänsterna. Annonser och Synlighet har ett engångsjobb vid start."
      >
        <BokaKnapp />
        <a href="#oversikt" className="btn-base btn-outline">
          Se alla delar
        </a>
      </PageHero>

      {/* Översikt */}
      <section
        id="oversikt"
        aria-labelledby="oversikt-rubrik"
        className="relative isolate scroll-mt-24"
      >
        <div className="container-page pt-14 pb-10 sm:pt-20">
          <Reveal>
            <h2 id="oversikt-rubrik" className="text-4xl sm:text-5xl">
              Fyra delar&nbsp;– <Mark>välj fritt</Mark>
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DELAR.map((d, i) => (
              <li key={d.id}>
                <Reveal delay={i * 60} className="h-full">
                  <a href={`#${d.id}`} className="skylt flex h-full flex-col p-7">
                    <span className="font-sans text-xs font-bold tracking-[0.22em] text-guld-mork uppercase">
                      {d.namn}
                    </span>
                    <span className="mt-3 flex-1 font-bold text-ink">{d.vad}</span>
                    <span className="mt-6 text-sm text-muted-foreground">från</span>
                    <span className="font-display text-3xl text-ink">
                      {kr(d.lagsta.belopp)}
                      <span className="text-lg">{enhet(d.lagsta.enhet)}</span>
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal delay={80}>
            <a
              href="#extern"
              className="mork-kort mt-4 flex flex-wrap items-center justify-between gap-4 p-7 text-elfenben"
            >
              <span>
                <span className="font-sans text-xs font-bold tracking-[0.22em] text-sun uppercase">
                  Allt i ett
                </span>
                <span className="mt-2 block font-bold">{EXTERN.namn}</span>
              </span>
              <span className="font-display text-3xl">
                {kr(EXTERN.belopp)}
                <span className="text-lg">/mån</span>
              </span>
            </a>
          </Reveal>
          <div className="mt-10">
            <Loften />
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {MOMS_TEXT} {STARTAVGIFT_TEXT}{" "}
            <Link to="/villkor" className="font-bold text-ink underline">
              Allmänna villkor
            </Link>
          </p>
        </div>
      </section>

      {DELAR.map((d, i) => (
        <Delavsnitt key={d.id} d={d} nr={i + 1} />
      ))}

      {/* Engångsjobb */}
      <section
        id="engang"
        aria-labelledby="engang-rubrik"
        className="scroll-mt-24 bg-fade-tint py-10 sm:py-14"
      >
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">Engångsjobb</p>
              <h2 id="engang-rubrik" className="mt-4 text-4xl sm:text-5xl">
                Välj det ni <Mark>behöver</Mark>
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-lg leading-relaxed text-ink/80">
                Bilder, uppsättningar och tillägg till hemsidan som köps en gång. Kryssa i det ni
                vill ha – ju fler jobb, desto större mängdrabatt. Ni får en bekräftelse med fast
                pris innan vi börjar.
              </p>
            </Reveal>
          </div>
          <div className="mt-10">
            <Engangsvaljare />
          </div>
        </div>
      </section>

      {/* Kombinationer */}
      <section aria-labelledby="kombinationer" className="container-page py-14 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Kombinationer</p>
            <h2 id="kombinationer" className="mt-4 text-4xl sm:text-5xl">
              Så ser det ut <Mark>tillsammans</Mark>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              Summan av delarna – ingen rabatt på månadspriserna och inget finstilt. Uppstarten är
              engångsjobben för Annonser ({kr(PRIS.annonsUppsattning)}) och Synlighet (
              {kr(PRIS.grundoptimering)}).
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink/80">{EN_I_TAGET_TEXT}</p>
          </Reveal>
        </div>
        <Reveal delay={60} className="mt-10">
          <ul className="space-y-3 sm:hidden">
            {KOMBINATIONER.map((k) => (
              <li key={k.delar} className="skylt-liten p-5">
                <p className="font-bold text-ink">{k.namn}</p>
                {k.vanligast && (
                  <span className="mt-1 inline-block rounded-full bg-sun px-2.5 py-0.5 text-xs font-bold">
                    Vi rekommenderar
                  </span>
                )}
                <p className="mt-1 text-sm text-muted-foreground">{k.delar}</p>
                <dl className="mt-3 grid grid-cols-2 gap-3 border-t-2 border-line pt-3">
                  <div>
                    <dt className="text-xs text-muted-foreground">Per månad</dt>
                    <dd className="font-display text-xl text-ink">{kr(k.manad)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Uppstart (engång)</dt>
                    <dd className="text-ink">
                      {typeof k.uppstart === "number" ? kr(k.uppstart) : k.uppstart}
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
          <div className="skylt-liten hidden overflow-x-auto px-5 py-2 sm:block sm:px-8">
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <caption className="sr-only">Vanliga kombinationer</caption>
              <thead>
                <tr className="text-sm text-muted-foreground">
                  <th scope="col" className="py-4 pr-3 font-normal">
                    Kombination
                  </th>
                  <th scope="col" className="py-4 pr-3 text-right font-normal">
                    Per månad
                  </th>
                  <th scope="col" className="py-4 text-right font-normal">
                    Uppstart (engång)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-line border-t-2 border-line">
                {KOMBINATIONER.map((k) => (
                  <tr key={k.delar}>
                    <th scope="row" className="py-4 pr-3 font-normal text-ink">
                      <span className="block font-bold">
                        {k.namn}
                        {k.vanligast && (
                          <span className="ml-2 rounded-full bg-sun px-2.5 py-0.5 align-middle text-xs font-bold">
                            Vi rekommenderar
                          </span>
                        )}
                      </span>
                      <span className="text-sm text-muted-foreground">{k.delar}</span>
                    </th>
                    <td className="py-4 pr-3 text-right font-display text-xl whitespace-nowrap text-ink">
                      {kr(k.manad)}
                    </td>
                    <td className="py-4 text-right whitespace-nowrap text-ink">
                      {typeof k.uppstart === "number" ? kr(k.uppstart) : k.uppstart}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Ny hemsida räknas för sig: till exempel en tjänstesida för {kr(PRIS.tjanstesida)} och
            drift med ändringar (Total) för {kr(PRIS.total)}/mån. {MOMS_TEXT}
          </p>
        </Reveal>
      </section>

      {/* Extern marknadsavdelning */}
      <section id="extern" aria-labelledby="extern-rubrik" className="scroll-mt-24 px-3 sm:px-6">
        <Reveal>
          <div className="mork-kort relative isolate mx-auto max-w-[88rem] overflow-hidden px-6 py-14 text-elfenben sm:px-14 sm:py-16">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
              <div>
                <p className="caps text-sun">
                  Allt i ett · högst {EXTERN.maxKunder} kunder åt gången
                </p>
                <h2 id="extern-rubrik" className="mt-4 text-4xl sm:text-5xl">
                  {EXTERN.namn}
                </h2>
                <p className="mt-6 font-display text-5xl leading-none sm:text-6xl">
                  {kr(EXTERN.belopp)}
                  <span className="text-2xl">/mån</span>
                </p>
                <p className="mt-3 text-sm text-white/70">
                  Exkl. moms · ingen bindningstid · uppstart ingår
                </p>
                <p className="mt-6 max-w-md leading-relaxed text-white/80">
                  För företag som vill ha all marknadsföring på ett ställe utan att anställa. Vi tar
                  högst {EXTERN.maxKunder} sådana kunder åt gången, så att tiden räcker.
                </p>
                <div className="mt-8">
                  <BokaKnapp variant="white" paket={EXTERN.id}>
                    Fråga om en plats
                  </BokaKnapp>
                </div>
              </div>
              <ul className="space-y-3 self-center">
                {EXTERN.ingar.map((r) => (
                  <li key={r} className="flex gap-3 text-white/90">
                    <Check className="mt-1 size-4 shrink-0 text-sun" aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Vanliga frågor */}
      <section aria-labelledby="fragor" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Vanliga frågor</p>
            <h2 id="fragor" className="mt-4 text-3xl sm:text-4xl">
              Frågor om <Mark>priser</Mark>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <VanligaFragor fragor={PRIS_FRAGOR} />
          </Reveal>
        </div>
      </section>

      <BokaPanel
        rubrik={
          <>
            Osäker på vad ni <Mark>behöver</Mark>?
          </>
        }
        text="Boka en gratis genomgång på 20–25 minuter. Vi föreslår vilka delar som ger mest för er&nbsp;– ofta räcker det att börja med en."
        prislank={{ href: "#oversikt", text: "Till översikten" }}
      />
    </PrisvalProvider>
  );
}
