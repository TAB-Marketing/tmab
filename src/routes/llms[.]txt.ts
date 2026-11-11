import { createFileRoute } from "@tanstack/react-router";
import { absolut, FORETAG } from "@/lib/foretag";
import { utanLankar } from "@/lib/lankar";
import {
  BINDNING_TEXT,
  DELAR,
  EN_I_TAGET_TEXT,
  EXTERN,
  kr,
  LOFTEN,
  MOMS_TEXT,
  PRIS_FRAGOR,
  prisText,
  STARTAVGIFT_TEXT,
} from "@/lib/priser";
import { GUIDER } from "@/lib/guider";
import { LANDNINGSSIDOR, landningssidaForTjanst } from "@/lib/landningssidor";
import { textSvar } from "@/lib/sidor";
import { TJANSTER, tjanstSokvag } from "@/lib/tjanster";

// llms.txt (https://llmstxt.org): en kort sammanfattning av sajten för AI-assistenter.
// Byggs från samma data som sidorna, så den är alltid uppdaterad.

const ren = (text: string) => text.replace(/\u00a0/g, " ");

/** "Finns det bindningstid?" och "Finns det någon bindningstid?" räknas som samma fråga. */
function unikaFragor<T extends { fraga: string }>(fragor: readonly T[]): T[] {
  const sedda = new Set<string>();
  return fragor.filter((f) => {
    const nyckel = f.fraga
      .toLowerCase()
      .replace(/\b(någon|några|en|ett)\b/g, "")
      .replace(/[^a-zåäö]/g, "");
    if (sedda.has(nyckel)) return false;
    sedda.add(nyckel);
    return true;
  });
}

function llmsText(): string {
  const rader = [
    `# ${FORETAG.namn}`,
    "",
    `> ${FORETAG.beskrivning}`,
    "",
    `${FORETAG.namn} drivs av ${FORETAG.juridisktNamn} (org.nr ${FORETAG.orgnr}). Kontakt: ${FORETAG.epost}.`,
    "",
    `Vi arbetar digitalt med företag i hela Sverige. ${MOMS_TEXT} Första genomgången (20–25 minuter) är gratis och bokas på ${absolut("/kontakt")}.`,
    "",
    "## Löften",
    "",
    ...LOFTEN.map((l) => `- ${l.titel}: ${l.text}`),
    "",
    "## Tjänster",
    "",
    ...TJANSTER.map(
      (t) =>
        `- [${t.titel}](${absolut(tjanstSokvag(t))}): ${t.vad}. ${t.pris.avser}: ${t.pris.fran ? "från " : ""}${kr(t.pris.belopp)}${t.pris.manad ? " per månad" : ""}.`,
    ),
    "",
    "## Priser",
    "",
    `Erbjudandet består av fyra delar som köps var för sig. ${BINDNING_TEXT} ${STARTAVGIFT_TEXT} ${EN_I_TAGET_TEXT}`,
    "",
    ...DELAR.flatMap((d) => [
      `### ${d.namn} – ${d.vad}`,
      "",
      d.intro,
      "",
      ...d.engang.map((r) => `- ${r.tjanst}: ${prisText(r)}${r.not ? ` (${r.not})` : ""}`),
      ...d.nivaer.map(
        (n) =>
          `- ${n.namn}: ${kr(n.belopp)}${n.enhet === "mån" ? " per månad" : ""} – ${n.ingar.join(", ")}.`,
      ),
      `- Skräddarsytt: offert från ${kr(d.skraddarsytt.pris)}${d.skraddarsytt.enhet === "mån" ? " per månad" : ""} – ${d.skraddarsytt.text}.`,
      "",
    ]),
    `### ${EXTERN.namn}`,
    "",
    `- ${kr(EXTERN.belopp)} per månad, högst ${EXTERN.maxKunder} kunder samtidigt – ${EXTERN.ingar.join(", ")}.`,
    "",
    "## Guider",
    "",
    ...GUIDER.map((g) => `- [${g.titel}](${absolut(`/guider/${g.slug}`)}): ${g.ingress}`),
    "",
    "## Vanliga frågor",
    "",
    // Tjänster med egen landningssida har sina frågor där – inte på /tjanster/{slug}.
    // Samma fråga på flera sidor tas bara med en gång (den första).
    ...unikaFragor([
      ...PRIS_FRAGOR,
      ...TJANSTER.filter((t) => !landningssidaForTjanst(t.slug)).flatMap((t) => t.fragor),
      ...LANDNINGSSIDOR.flatMap((l) => l.fragor),
    ]).map((f) => `- ${f.fraga} ${utanLankar(f.svar)}`),
    "",
    "## Sidor",
    "",
    `- [Priser](${absolut("/priser")})`,
    `- [Alla tjänster](${absolut("/tjanster")})`,
    `- [Guider](${absolut("/guider")})`,
    ...LANDNINGSSIDOR.map((l) => `- [${l.titel}](${absolut(l.sokvag)})`),
    `- [Om oss](${absolut("/om-oss")})`,
    `- [Boka gratis genomgång](${absolut("/kontakt")})`,
    `- [Allmänna villkor](${absolut("/villkor")})`,
    "",
  ];
  return ren(rader.join("\n"));
}

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: () => textSvar(llmsText(), "text/plain"),
    },
  },
});
