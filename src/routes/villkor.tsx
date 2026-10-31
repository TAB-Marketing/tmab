import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/Heading";
import { FORETAG } from "@/lib/foretag";
import { sidhuvud } from "@/lib/seo";
import { VILLKOR, VILLKOR_DATUM } from "@/lib/villkor";

export const Route = createFileRoute("/villkor")({
  head: () =>
    sidhuvud({
      titel: "Allmänna villkor",
      beskrivning: `Villkoren som gäller när ni köper tjänster av ${FORETAG.namn}: betalning, uppsägning, avbetalning, leveranser och vem som äger materialet.`,
      sokvag: "/villkor",
    }),
  component: Villkor,
});

function Villkor() {
  return (
    <>
      <PageHero
        eyebrow="Villkor"
        title="Allmänna villkor"
        intro={`Gäller när ett företag köper tjänster av ${FORETAG.namn}. Senast uppdaterade ${VILLKOR_DATUM}.`}
      />
      <article className="container-page max-w-3xl pt-4 pb-24">
        {VILLKOR.map((s) => (
          <section key={s.rubrik} className="mt-12">
            <h2 className="text-2xl text-ink">{s.rubrik}</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
              {s.stycken.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </section>
        ))}
        <p className="mt-14 text-sm text-muted-foreground">
          Frågor om villkoren?{" "}
          <a
            href={`mailto:${FORETAG.epost}`}
            className="font-bold text-ink underline decoration-guld"
          >
            {FORETAG.epost}
          </a>{" "}
          · Se även{" "}
          <Link to="/integritetspolicy" className="font-bold text-ink underline decoration-guld">
            integritetspolicyn
          </Link>
          .
        </p>
      </article>
    </>
  );
}
