import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { BokaKnapp, BokaPanel } from "@/components/Boka";
import { Fyrscen, LANTERNIN } from "@/components/Fyrscen";
import { Mark } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { DELAR, kr, STARTAVGIFT_TEXT } from "@/lib/priser";
import { avstava } from "@/lib/text";
import { brodsmulor, sidhuvud } from "@/lib/seo";
import { DEL_TJANSTER, hittaTjanst, tjanstSokvag, type Tjanst } from "@/lib/tjanster";

export const Route = createFileRoute("/tjanster/")({
  head: () =>
    sidhuvud({
      titel: "SEO, GEO, annonser och hemsidor",
      beskrivning:
        "Fyra delar: Studio för bilder och video, Annonser på Facebook och Instagram, Synlighet med SEO och GEO, och Webb för nya hemsidor. Fasta priser och gratis första genomgång.",
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
      <Fyrscen
        hero
        bilder={LANTERNIN}
        etikett="Tjänster"
        rubrik={
          <>
            Allt ni behöver för att <Mark>synas digitalt</Mark>
          </>
        }
        text="Fyra delar som tillsammans får fler att hitta, välja och kontakta er. Ta en i taget och lägg till fler när det passar."
        knappar={
          <div className="mt-9 flex flex-wrap gap-3">
            <BokaKnapp variant="white" />
            <Link to="/priser" className="btn-base btn-outline-white">
              Se priser
            </Link>
          </div>
        }
      />

      <div className="container-page grid [&>*]:min-w-0 gap-5 py-14 sm:py-20">
        {DELAR.map((d) => {
          const tjanster = DEL_TJANSTER[d.id]
            .map((slug) => hittaTjanst(slug))
            .filter((t): t is Tjanst => Boolean(t));
          const forsta = tjanster[0];
          const punkter = [...new Set(tjanster.flatMap((t) => t.medOss))].slice(0, 5);
          return (
            <Reveal key={d.id}>
              <section
                id={d.id}
                aria-labelledby={`${d.id}-rubrik`}
                className="skylt grid scroll-mt-28 gap-8 p-7 sm:p-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16"
              >
                <div>
                  {forsta && (
                    <span className="grid size-16 place-items-center rounded-full border border-guld text-guld-mork">
                      <forsta.ikon className="size-7" aria-hidden="true" />
                    </span>
                  )}
                  <h2 id={`${d.id}-rubrik`} className="mt-6 text-3xl sm:text-4xl">
                    {d.namn}
                  </h2>
                  <p className="mt-3 text-lg font-bold text-ink">{d.vad}</p>
                  <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">{d.intro}</p>
                  <p className="mt-6 font-display text-2xl text-ink">
                    från {kr(d.lagsta.belopp)}
                    {d.lagsta.enhet === "mån" ? "/mån" : ""}{" "}
                    <span className="ml-1 font-sans text-sm text-muted-foreground">exkl. moms</span>
                  </p>
                  {(d.id === "annonser" || d.id === "synlighet") && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      Plus ett engångsjobb vid start.
                    </p>
                  )}
                </div>
                <div>
                  <ul className="space-y-3">
                    {punkter.map((p) => (
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
                  <div className="mt-6 flex flex-wrap gap-3">
                    {tjanster.map((t, i) => (
                      <Link
                        key={t.slug}
                        to={tjanstSokvag(t)}
                        className={`btn-base ${i === 0 ? "btn-dark" : "btn-outline"}`}
                      >
                        {t.slug === "hemsideoptimering"
                          ? "Fräscha upp befintlig hemsida"
                          : `Läs mer om ${avstava(t.iText)}`}
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            </Reveal>
          );
        })}
        <p className="text-sm text-muted-foreground">{STARTAVGIFT_TEXT}</p>
      </div>

      <BokaPanel />
    </>
  );
}
