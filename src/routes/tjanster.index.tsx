import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { BokaKnapp, BokaPanel } from "@/components/Boka";
import { Mark, PageHero } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { kr } from "@/lib/priser";
import { avstava } from "@/lib/text";
import { brodsmulor, sidhuvud } from "@/lib/seo";
import { TJANSTER, tjanstSokvag } from "@/lib/tjanster";

export const Route = createFileRoute("/tjanster/")({
  head: () =>
    sidhuvud({
      titel: "SEO, GEO, annonser och hemsidor",
      beskrivning:
        "Marknadsföringsbilder, SEO, GEO, Meta-annonser, hemsideoptimering och nya hemsidor för företag. Fasta priser och gratis första genomgång.",
      sokvag: "/tjanster",
      schema: [
        brodsmulor([
          { namn: "Hem", sokvag: "/" },
          { namn: "Tjänster", sokvag: "/tjanster" },
        ]),
      ],
    }),
  component: Tjanster,
});

function Tjanster() {
  return (
    <>
      <PageHero
        tavla={{ src: "/galleri/caesar-1080.webp", bredd: 1080, hojd: 1350 }}
        eyebrow="Tjänster"
        title={
          <>
            Allt ni behöver för att <Mark>synas digitalt</Mark>
          </>
        }
        intro="Sex tjänster som tillsammans får fler att hitta, välja och kontakta er. Ta en i taget och lägg till fler när det passar."
      >
        <BokaKnapp />
        <Link to="/priser" className="btn-base btn-outline">
          Se priser
        </Link>
      </PageHero>

      <div className="container-page grid [&>*]:min-w-0 gap-5 py-14 sm:py-20">
        {TJANSTER.map((t) => (
          <Reveal key={t.slug}>
            <section
              aria-labelledby={`${t.slug}-rubrik`}
              className="skylt grid gap-8 p-7 sm:p-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16"
            >
              <div>
                <span className="grid size-16 place-items-center rounded-full text-guld-mork border border-guld">
                  <t.ikon className="size-7" aria-hidden="true" />
                </span>
                <h2 id={`${t.slug}-rubrik`} className="mt-6 text-3xl sm:text-4xl">
                  {avstava(t.titel)}
                </h2>
                <p className="mt-3 text-lg font-bold text-ink">{t.vad}</p>
                <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
                  {t.forklaring}
                </p>
                <p className="mt-6 text-sm text-muted-foreground">{t.pris.avser}</p>
                <p className="mt-1 font-display text-2xl text-ink">
                  {t.pris.fran ? "från " : ""}
                  {kr(t.pris.belopp)}
                  {t.pris.manad ? "/mån" : ""}{" "}
                  <span className="ml-1 font-sans text-sm text-muted-foreground">exkl. moms</span>
                </p>
              </div>
              <div>
                <ul className="space-y-3">
                  {t.medOss.map((p) => (
                    <li key={p} className="skylt-liten flex gap-3 p-4 text-ink">
                      <Check
                        className="mt-0.5 size-5 shrink-0 text-guld-mork"
                        strokeWidth={3}
                        aria-hidden="true"
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <Link to={tjanstSokvag(t)} className="btn-base btn-dark mt-6">
                  Läs mer om {avstava(t.iText)}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </section>
          </Reveal>
        ))}
      </div>

      <BokaPanel />
    </>
  );
}
