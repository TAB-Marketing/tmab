import { Link } from "@tanstack/react-router";
import { BokaKnapp } from "@/components/Boka";
import { Reveal } from "@/components/Reveal";
import { kr, MOMS_TEXT, PRIS, prisText, type Del } from "@/lib/priser";

/**
 * Två prisrutor för en del: engångsjobbet (mörk ruta, id="pris") och de löpande nivåerna.
 * Används av landningssidorna så att priserna bara skrivs på ett ställe (priser.ts).
 */
export function DelPrisrutor({
  del,
  engangIndex,
  engangRubrik,
  engangNot,
  lopandeRubrik,
  lopandeNot,
  tjanst,
  knapptext,
  onBoka,
}: {
  del: Del;
  /** Vilken engångsrad som lyfts fram i den mörka rutan. */
  engangIndex: number;
  engangRubrik: string;
  engangNot: string;
  lopandeRubrik: string;
  lopandeNot?: string;
  tjanst: string;
  knapptext: string;
  onBoka?: () => void;
}) {
  const engang = del.engang[engangIndex];
  if (!engang) return null;
  return (
    <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
      <Reveal className="h-full">
        <div
          id="pris"
          className="inramad flex h-full scroll-mt-28 flex-col p-8 text-elfenben sm:p-10"
        >
          <p className="caps text-sun">Först · engång</p>
          <h3 className="mt-4 text-2xl leading-tight">{engangRubrik}</h3>
          <p className="mt-4 font-display text-5xl leading-none sm:text-6xl">{prisText(engang)}</p>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-elfenben/75">
            {engangNot} {MOMS_TEXT}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <BokaKnapp variant="white" tjanst={tjanst} {...(onBoka ? { onClick: onBoka } : {})}>
              {knapptext}
            </BokaKnapp>
          </div>
        </div>
      </Reveal>
      <Reveal delay={80} className="h-full">
        <div className="skylt h-full p-8 sm:p-10">
          <p className="caps text-guld-mork">Sedan · löpande</p>
          <h3 className="mt-4 text-2xl leading-tight text-ink">{lopandeRubrik}</h3>
          <ul className="mt-6 divide-y divide-ink/15">
            {del.nivaer.map((n) => (
              <li key={n.id} className="flex items-baseline justify-between gap-4 py-4">
                <span>
                  <span className="block font-bold text-ink">{n.namn}</span>
                  <span className="text-sm text-muted-foreground">{n.ingar[0]}</span>
                </span>
                <span className="shrink-0 font-display text-2xl text-ink">
                  {kr(n.belopp)}
                  {n.enhet === "mån" && <span className="text-sm text-muted-foreground">/mån</span>}
                </span>
              </li>
            ))}
            <li className="flex items-baseline justify-between gap-4 py-4">
              <span>
                <span className="block font-bold text-ink">Skräddarsytt</span>
                <span className="text-sm text-muted-foreground">{del.skraddarsytt.text}</span>
              </span>
              <span className="shrink-0 text-right text-sm text-ink">
                offert från {kr(del.skraddarsytt.pris)}
                {del.skraddarsytt.enhet === "mån" ? "/mån" : ""}
              </span>
            </li>
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {lopandeNot ? `${lopandeNot} ` : ""}Ingen bindningstid.
          </p>
          <Link to="/priser" hash={del.id} className="btn-base btn-outline mt-6">
            Se allt som ingår
          </Link>
        </div>
      </Reveal>
    </div>
  );
}

/** Kort prisrad för hjältesektionen: "Grundoptimering 3 460 kr · löpande från 3 995 kr/mån". */
export const SYNLIGHET_KORT = `Grundoptimering från ${kr(PRIS.grundoptimeringLiten)} · löpande från ${kr(PRIS.synlighetBas)}/mån`;
export const ANNONSER_KORT = `Uppsättning ${kr(PRIS.annonsUppsattning)} · löpande från ${kr(PRIS.annonser1)}/mån`;
