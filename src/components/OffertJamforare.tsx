import { useId, useState } from "react";
import { kr } from "@/lib/priser";

/**
 * Jämför upp till tre offerter på en hemsida: kostnad på tre år och de frågor som avgör om
 * offerten går att lämna. Allt räknas i webbläsaren – inget sparas eller skickas.
 * Används i guiden /guider/jamfora-offerter-hemsida.
 */

const AR = 3;

type Svar = "ja" | "nej" | "?";

const FRAGOR = [
  "Domänen registreras i ert namn",
  "Ni äger design, texter och kod",
  "Ni kan flytta sajten och få med allt",
  "Fast pris för hela bygget",
  "Texter ingår (inte bara mall-text)",
  "SEO-grund specificerad: titlar, sajtkarta, omdirigeringar",
  "Bindningstid högst 12 månader",
] as const;

type Offert = {
  namn: string;
  engang: string;
  manad: string;
  svar: Svar[];
};

const ny = (namn: string): Offert => ({
  namn,
  engang: "",
  manad: "",
  svar: FRAGOR.map(() => "?" as Svar),
});

const tal = (s: string) => {
  const n = Number(s.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : 0;
};

const NASTA: Record<Svar, Svar> = { "?": "ja", ja: "nej", nej: "?" };
const SVAR_TEXT: Record<Svar, string> = { ja: "Ja", nej: "Nej", "?": "Vet ej" };
const SVAR_STIL: Record<Svar, string> = {
  ja: "border-guld bg-guld/15 text-ink",
  nej: "border-red-800/60 bg-red-50 text-red-900",
  "?": "border-line bg-transparent text-muted-foreground",
};

export function OffertJamforare() {
  const id = useId();
  const [offerter, setOfferter] = useState<Offert[]>([
    ny("Offert A"),
    ny("Offert B"),
    ny("Offert C"),
  ]);

  const andra = (i: number, del: Partial<Offert>) =>
    setOfferter((o) => o.map((x, j) => (j === i ? { ...x, ...del } : x)));

  const totaler = offerter.map((o) => tal(o.engang) + tal(o.manad) * 12 * AR);
  const ifyllda = totaler.filter((t) => t > 0);
  const lagsta = ifyllda.length > 1 ? Math.min(...ifyllda) : null;

  return (
    <div className="skylt relative mt-7 overflow-x-auto p-5 sm:p-7">
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <caption className="sr-only">Jämförelse av offerter på hemsida</caption>
        <thead>
          <tr>
            <th
              scope="col"
              className="sticky left-0 z-10 bg-[#f3f0e7] w-[42%] pb-3 align-bottom text-sm font-bold text-ink"
            >
              Fyll i från offerterna
            </th>
            {offerter.map((o, i) => (
              <th key={i} scope="col" className="px-1.5 pb-3 align-bottom">
                <label className="sr-only" htmlFor={`${id}-namn-${i}`}>
                  Namn på offert {i + 1}
                </label>
                <input
                  id={`${id}-namn-${i}`}
                  value={o.namn}
                  onChange={(e) => andra(i, { namn: e.target.value })}
                  className="w-full border-b border-ink/30 bg-transparent px-1 py-1 font-bold text-ink focus:border-ink focus:outline-none"
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-[0.95rem]">
          {(
            [
              ["engang", "Engångspris (kr)"],
              ["manad", "Löpande per månad (kr)"],
            ] as const
          ).map(([falt, etikett]) => (
            <tr key={falt} className="border-t border-line">
              <th
                scope="row"
                className="sticky left-0 z-10 bg-[#f3f0e7] py-2.5 pr-3 font-normal text-ink/85"
              >
                {etikett}
              </th>
              {offerter.map((o, i) => (
                <td key={i} className="px-1.5 py-2.5">
                  <label className="sr-only" htmlFor={`${id}-${falt}-${i}`}>
                    {etikett}, {o.namn}
                  </label>
                  <input
                    id={`${id}-${falt}-${i}`}
                    inputMode="numeric"
                    placeholder="0"
                    value={o[falt]}
                    onChange={(e) => andra(i, { [falt]: e.target.value })}
                    className="w-full rounded-md border border-line bg-white/70 px-2 py-1.5 text-right tabular-nums text-ink focus:border-ink focus:outline-none"
                  />
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-t-2 border-ink/70">
            <th
              scope="row"
              className="sticky left-0 z-10 bg-[#f3f0e7] py-3 pr-3 font-bold text-ink"
            >
              Kostnad på {AR} år
            </th>
            {totaler.map((t, i) => (
              <td
                key={i}
                className={`px-1.5 py-3 text-right font-bold tabular-nums ${
                  lagsta !== null && t === lagsta ? "text-guld-mork" : "text-ink"
                }`}
                aria-live="polite"
              >
                {t > 0 ? kr(Math.round(t)) : "–"}
              </td>
            ))}
          </tr>
          {FRAGOR.map((f, r) => (
            <tr key={f} className="border-t border-line">
              <th
                scope="row"
                className="sticky left-0 z-10 bg-[#f3f0e7] min-w-[9.5rem] py-2 pr-3 font-normal text-ink/85"
              >
                {f}
              </th>
              {offerter.map((o, i) => {
                const s = o.svar[r] ?? "?";
                return (
                  <td key={i} className="px-1.5 py-2">
                    <button
                      type="button"
                      onClick={() =>
                        andra(i, { svar: o.svar.map((x, k) => (k === r ? NASTA[x] : x)) })
                      }
                      aria-label={`${f}, ${o.namn}: ${SVAR_TEXT[s]}. Klicka för att ändra.`}
                      className={`w-full rounded-md border px-2 py-1.5 text-sm font-bold transition-colors ${SVAR_STIL[s]}`}
                    >
                      {SVAR_TEXT[s]}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
          <tr className="border-t-2 border-ink/70">
            <th
              scope="row"
              className="sticky left-0 z-10 bg-[#f3f0e7] pt-3 pr-3 font-bold text-ink"
            >
              Frågor med ja
            </th>
            {offerter.map((o, i) => (
              <td key={i} className="px-1.5 pt-3 text-right font-bold tabular-nums text-ink">
                {o.svar.filter((s) => s === "ja").length} av {FRAGOR.length}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
        Klicka på en ruta för att växla mellan Ja, Nej och Vet ej. Står det Vet ej – fråga byrån
        innan du skriver på. Inget du fyller i sparas eller skickas.
      </p>
    </div>
  );
}
