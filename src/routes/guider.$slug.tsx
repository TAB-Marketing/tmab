import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { ArrowRight, Check, Clock, TriangleAlert } from "lucide-react";
import { BokaKnapp, BokaPanel } from "@/components/Boka";
import { Markerad, Mark, PageHero } from "@/components/Heading";
import { VanligaFragor } from "@/components/VanligaFragor";
import { FORETAG } from "@/lib/foretag";
import { FLYTTADE_GUIDER, GUIDER, hittaGuide, lastid, type Avsnitt, type Rad } from "@/lib/guider";
import { artikelSchema, brodsmulor, faqSchema, guideBild, sidhuvud } from "@/lib/seo";
import { DEL_TJANSTER, hittaTjanst, tjanstSokvag } from "@/lib/tjanster";

export const Route = createFileRoute("/guider/$slug")({
  beforeLoad: ({ params }) => {
    const ny = FLYTTADE_GUIDER[params.slug];
    if (ny) throw redirect({ href: ny, statusCode: 301 });
  },
  loader: ({ params }) => {
    if (!hittaGuide(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const g = hittaGuide(params.slug);
    if (!g) return {};
    const sidan = sidhuvud({
      titel: g.seoTitel,
      beskrivning: g.seoBeskrivning,
      sokvag: `/guider/${g.slug}`,
      bild: { src: guideBild(g), alt: g.titel },
      schema: [
        artikelSchema(g),
        faqSchema(g.fragor),
        brodsmulor([
          { namn: "Hem", sokvag: "/" },
          { namn: "Resurser", sokvag: "/guider" },
          { namn: g.titel, sokvag: `/guider/${g.slug}` },
        ]),
      ],
    });
    return {
      ...sidan,
      meta: [
        ...sidan.meta,
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: g.publicerad },
        { property: "article:modified_time", content: g.uppdaterad },
      ],
    };
  },
  component: GuideSida,
});

const datum = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

function GuideSida() {
  const { slug } = Route.useParams();
  const g = hittaGuide(slug);
  if (!g) return null;
  const tjanst = hittaTjanst(g.tjanst);
  const fler = GUIDER.filter((o) => o.slug !== g.slug);

  return (
    <>
      <PageHero
        eyebrow="Guide"
        title={<Markerad text={g.rubrik.text} markera={g.rubrik.markera} />}
        intro={g.ingress}
      />

      <article className="container-page pt-8 pb-14 sm:pt-10 sm:pb-20">
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Clock className="size-4" aria-hidden="true" />
            {lastid(g)} min läsning
          </span>
          <span>
            Uppdaterad <time dateTime={g.uppdaterad}>{datum(g.uppdaterad)}</time> av {FORETAG.namn}
          </span>
        </p>

        <div className="mt-10 max-w-3xl space-y-12">
          {g.avsnitt.map((a) => (
            <AvsnittVy key={a.rubrik} a={a} />
          ))}
        </div>

        {tjanst && (
          <aside className="inramad mt-14 max-w-3xl p-8 text-elfenben sm:p-10">
            <p className="caps text-sun">Vill du slippa göra det själv?</p>
            <p className="mt-4 text-2xl leading-snug sm:text-3xl">
              {DEL_TJANSTER.webb.includes(tjanst.slug)
                ? `Vi bygger ${tjanst.iText} åt dig – design, texter, teknik och lansering till fast pris.`
                : `Vi sköter ${tjanst.iText} åt dig, från första analysen till uppföljningen varje månad.`}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <BokaKnapp variant="white" tjanst={tjanst.slug} />
              <Link to={tjanstSokvag(tjanst)} className="btn-base btn-outline-white">
                Om {tjanst.titel}
              </Link>
            </div>
          </aside>
        )}
      </article>

      <section aria-labelledby="fragor" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="eyebrow">Vanliga frågor</p>
            <h2 id="fragor" className="mt-4 text-3xl sm:text-4xl">
              Det här undrar <Mark>många</Mark>
            </h2>
            <div className="mt-8">
              <VanligaFragor fragor={g.fragor} />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="fler-guider" className="container-page py-14 sm:py-20">
        <h2 id="fler-guider" className="text-3xl sm:text-4xl">
          Fler <Mark>guider</Mark>
        </h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {fler.map((o) => (
            <li key={o.slug}>
              <Link
                to="/guider/$slug"
                params={{ slug: o.slug }}
                className="skylt group flex h-full items-center justify-between gap-3 p-5"
              >
                <span className="font-bold text-ink">{o.titel}</span>
                <ArrowRight
                  className="size-5 shrink-0 text-ink transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {tjanst ? <BokaPanel tjanst={tjanst.slug} /> : <BokaPanel />}
    </>
  );
}

function AvsnittVy({ a }: { a: Avsnitt }) {
  return (
    <section>
      <h2 className="text-3xl sm:text-4xl">{a.rubrik}</h2>
      {a.stycken?.map((p) => (
        <p key={p} className="mt-5 text-lg leading-relaxed text-ink/85">
          {p}
        </p>
      ))}
      {a.lista && <Lista {...a.lista} />}
      {a.tabell && (
        <div className="skylt mt-6 overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left">
            <thead>
              <tr className="border-b-2 border-line">
                {a.tabell.kolumner.map((k, i) => (
                  <th key={i} scope="col" className="p-4 font-bold text-ink">
                    {k}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {a.tabell.rader.map((rad) => (
                <tr key={rad[0]} className="border-b border-line last:border-0">
                  {rad.map((cell, i) =>
                    i === 0 ? (
                      <th key={i} scope="row" className="p-4 font-bold text-ink">
                        {cell}
                      </th>
                    ) : (
                      <td key={i} className="p-4 text-ink/85">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {a.efter?.map((p) => (
        <p key={p} className="mt-5 text-lg leading-relaxed text-ink/85">
          {p}
        </p>
      ))}
    </section>
  );
}

function Lista({
  numrerad,
  varning,
  rader,
}: {
  numrerad?: boolean;
  varning?: boolean;
  rader: readonly Rad[];
}) {
  const Tag = numrerad ? "ol" : "ul";
  return (
    <Tag className="mt-6 space-y-3">
      {rader.map((r, i) => (
        <li
          key={typeof r === "string" ? r : r.titel}
          className={`flex gap-4 p-4 text-lg leading-relaxed text-ink sm:p-5 ${
            varning ? "border-l-4 border-red-800/70 bg-red-50/60" : "skylt-liten"
          }`}
        >
          {numrerad ? (
            <span
              className="grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold text-guld-mork border border-guld"
              aria-hidden="true"
            >
              {i + 1}
            </span>
          ) : varning ? (
            <TriangleAlert className="mt-1 size-5 shrink-0 text-red-800" aria-label="Undvik" />
          ) : (
            <Check className="mt-1 size-5 shrink-0 text-guld-mork" aria-hidden="true" />
          )}
          {typeof r === "string" ? (
            <span>{r}</span>
          ) : (
            <span>
              <strong className="block text-ink">{r.titel}</strong>
              <span className="text-ink/80">{r.text}</span>
            </span>
          )}
        </li>
      ))}
    </Tag>
  );
}
