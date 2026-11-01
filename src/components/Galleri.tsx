import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

/**
 * Startsidan som ett galleri: målningen överst hänger på museiväggen och sektionerna under är
 * salar med inramade verk och museiskyltar. Ramen är samma förgyllda ram som den stora
 * målningen (public/masterverk/ram-hog-kontur.webp), se .galleri-ram i styles.css.
 */

/** Salens rubrik: romersk siffra, liten versalrad och rubrik. */
export function SalRubrik({
  nummer,
  etikett,
  id,
  children,
  ingress,
  className = "",
}: {
  nummer: string;
  etikett: string;
  id: string;
  children: ReactNode;
  ingress?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`sal-rubrik ${className}`}>
      <span className="sal-nummer" aria-hidden="true">
        {nummer}
      </span>
      <p className="caps text-muted-foreground">{etikett}</p>
      <h2 id={id} className="text-[clamp(2.1rem,4.4vw,3.6rem)]">
        {children}
      </h2>
      {ingress && (
        <p className="sal-ingress mt-4 max-w-2xl text-lg leading-relaxed text-ink/80">{ingress}</p>
      )}
    </div>
  );
}

type Bild = { src: string; srcSet?: string; bredd: number; hojd: number; alt: string };

/** Ett inramat verk med museiskylt. Hela verket är en länk när `till` finns. */
export function Verk({
  bild,
  overrad,
  titel,
  children,
  till,
  lanktext = "Så gör vi",
  className = "",
  sizes = "(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 90vw",
}: {
  bild: Bild;
  overrad: string;
  titel: ReactNode;
  children?: ReactNode;
  till?: string;
  lanktext?: string;
  className?: string;
  sizes?: string;
}) {
  const innehall = (
    <>
      <div className="galleri-ram">
        <img
          src={bild.src}
          srcSet={bild.srcSet}
          sizes={bild.srcSet ? sizes : undefined}
          alt={bild.alt}
          width={bild.bredd}
          height={bild.hojd}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full"
        />
      </div>
      <div className="galleri-skylt">
        <p className="text-[0.68rem] font-bold tracking-[0.2em] text-muted-foreground uppercase">
          {overrad}
        </p>
        <h3 className="galleri-titel mt-1.5 text-2xl">{titel}</h3>
        {children}
        {till && <span className="galleri-pil mt-3 inline-block">{lanktext} →</span>}
      </div>
    </>
  );
  return (
    <Reveal className={`galleri-verk ${className}`}>
      {till ? (
        <Link to={till} className="group block">
          {innehall}
        </Link>
      ) : (
        innehall
      )}
    </Reveal>
  );
}
