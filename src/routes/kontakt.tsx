import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { Bokningsformular } from "@/components/Bokningsformular";
import { Mark, PageHero } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { Loften } from "@/components/Loften";
import { Stegliste, type Steg } from "@/components/Steg";
import { FORETAG } from "@/lib/foretag";
import { BOKNINGSBARA, ENGANGSJOBB, engangMeddelande } from "@/lib/priser";
import { sidhuvud } from "@/lib/seo";
import { hittaTjanst } from "@/lib/tjanster";

type Sok = { tjanst?: string; paket?: string; engang?: string };

export const Route = createFileRoute("/kontakt")({
  validateSearch: (sok: Record<string, unknown>): Sok => {
    const ut: Sok = {};
    if (typeof sok["tjanst"] === "string" && hittaTjanst(sok["tjanst"])) ut.tjanst = sok["tjanst"];
    if (typeof sok["paket"] === "string" && BOKNINGSBARA.some((p) => p.id === sok["paket"])) {
      ut.paket = sok["paket"];
    }
    if (typeof sok["engang"] === "string") {
      const ids = sok["engang"].split(",").filter((id) => ENGANGSJOBB.some((j) => j.id === id));
      if (ids.length > 0) ut.engang = ids.join(",");
    }
    return ut;
  },
  head: () =>
    sidhuvud({
      titel: "Boka gratis genomgång",
      beskrivning:
        "Boka en kostnadsfri genomgång på 20–25 minuter. Vi går igenom er hemsida, synlighet på Google och sociala medier och ger ett skräddarsytt förslag.",
      sokvag: "/kontakt",
    }),
  component: Kontakt,
});

const STEG: readonly Steg[] = [
  {
    titel: "Ni svarar på fyra korta frågor",
    text: "Vad ni vill ha hjälp med och hur vi når er. Det tar under en minut.",
  },
  {
    titel: "Vi bokar en tid",
    text: "Vi hör av oss inom en arbetsdag och bokar in 20–25 minuter som passar er.",
  },
  {
    titel: "Ni får ett förslag",
    text: "Vi går igenom er digitala närvaro och ger ett skräddarsytt förslag, helt utan kostnad.",
  },
];

function Kontakt() {
  const sok = Route.useSearch();

  return (
    <>
      <PageHero
        tavla={{ src: "/fyr/fyr-hog.webp", bredd: 940, hojd: 1672 }}
        eyebrow="Gratis genomgång"
        title={
          <>
            Boka en <Mark>gratis genomgång</Mark>
          </>
        }
        intro="20–25 minuter där vi går igenom er hemsida, er synlighet på Google och i sociala medier. Ni får ett skräddarsytt förslag efteråt, helt utan kostnad."
      />

      <section className="container-page grid [&>*]:min-w-0 gap-14 py-14 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl">Så går det till</h2>
          <div className="mt-8">
            <Stegliste steg={STEG} />
          </div>
          <div className="mt-8">
            <Loften kompakt />
          </div>

          {(FORETAG.telefon || FORETAG.epost) && (
            <ul className="mt-8 space-y-3">
              {FORETAG.telefon && (
                <li className="flex items-center gap-3">
                  <Phone className="size-5 text-guld-mork" aria-hidden="true" />
                  <a href={`tel:${FORETAG.telefonLank}`} className="font-bold text-ink underline">
                    {FORETAG.telefon}
                  </a>
                </li>
              )}
              {FORETAG.epost && (
                <li className="flex items-center gap-3">
                  <Mail className="size-5 text-guld-mork" aria-hidden="true" />
                  <a href={`mailto:${FORETAG.epost}`} className="font-bold text-ink underline">
                    {FORETAG.epost}
                  </a>
                </li>
              )}
            </ul>
          )}
        </Reveal>

        <Reveal delay={100} className="order-first lg:order-none">
          <Bokningsformular
            tjanst={sok.tjanst}
            paket={BOKNINGSBARA.find((p) => p.id === sok.paket)?.namn}
            meddelande={sok.engang ? engangMeddelande(sok.engang.split(",")) : undefined}
          />
        </Reveal>
      </section>
    </>
  );
}
