import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, LayoutTemplate } from "lucide-react";
import { BokaPanel } from "@/components/Boka";
import { Mark, PageHero } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { GUIDER, lastid } from "@/lib/guider";
import { LANDNINGSSIDOR } from "@/lib/landningssidor";
import { brodsmulor, sidhuvud } from "@/lib/seo";
import { avstava } from "@/lib/text";

// Resurser: två tydligt skilda delar – guider (gör det själv) och sidor om tjänsterna
// (landningssidorna). Blanda dem inte i samma lista, då ser säljsidor ut som guider.

const KORT = "skylt group flex h-full flex-col p-7 sm:p-8";

export const Route = createFileRoute("/guider/")({
  head: () =>
    sidhuvud({
      titel: "Resurser: guider om SEO, GEO och hemsidor",
      beskrivning:
        "Gratis guider för företag som vill synas bättre på Google och i AI-assistenter, och mer om hur vi arbetar med SEO och hemsidor.",
      sokvag: "/guider",
      schema: [
        brodsmulor([
          { namn: "Hem", sokvag: "/" },
          { namn: "Resurser", sokvag: "/guider" },
        ]),
      ],
    }),
  component: Resurser,
});

function Resurser() {
  return (
    <>
      <PageHero
        tavla={{ src: "/galleri/detalj-iris.webp", bredd: 768, hojd: 948 }}
        eyebrow="Resurser"
        title={
          <>
            Lär er mer&nbsp;– <Mark>eller låt oss göra det</Mark>
          </>
        }
        intro="Guider ni kan följa själva, och sidor om hur vi arbetar med SEO och hemsidor. Allt är gratis att läsa."
      />

      <section aria-labelledby="guider-rubrik" className="container-page py-14 sm:py-20">
        <p className="eyebrow">Guider</p>
        <h2 id="guider-rubrik" className="mt-4 text-3xl sm:text-4xl">
          Gör det själv&nbsp;– <Mark>steg för steg</Mark>
        </h2>
        <ul className="mt-8 grid gap-5 lg:grid-cols-3">
          {GUIDER.map((g, i) => (
            <li key={g.slug}>
              <Reveal delay={i * 60} className="h-full">
                <Link to="/guider/$slug" params={{ slug: g.slug }} className={KORT}>
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="size-4" aria-hidden="true" />
                    {lastid(g)} min läsning
                  </span>
                  <h3 className="mt-4 text-2xl sm:text-3xl">{avstava(g.titel)}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                    {g.seoBeskrivning}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-bold text-ink">
                    Läs guiden
                    <ArrowRight
                      className="size-5 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="tjanster-rubrik" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <p className="eyebrow">Våra tjänster</p>
          <h2 id="tjanster-rubrik" className="mt-4 text-3xl sm:text-4xl">
            Så arbetar vi med <Mark>SEO och hemsidor</Mark>
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {LANDNINGSSIDOR.map((l, i) => (
              <li key={l.sokvag}>
                <Reveal delay={i * 60} className="h-full">
                  <Link to={l.sokvag} className={KORT}>
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <LayoutTemplate className="size-4" aria-hidden="true" />
                      {l.etikett}
                    </span>
                    <h3 className="mt-4 text-2xl sm:text-3xl">{avstava(l.titel)}</h3>
                    <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                      {l.kortText}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 font-bold text-ink">
                      Läs mer
                      <ArrowRight
                        className="size-5 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BokaPanel />
    </>
  );
}
