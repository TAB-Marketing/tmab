import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { usePrisval } from "@/components/Prisval";
import {
  DELAR,
  ENGANGSJOBB,
  kr,
  MANGDRABATT,
  MOMS_TEXT,
  raknaEngang,
  type Engangsjobb,
} from "@/lib/priser";

/**
 * Engångsjobben på prissidan: en utfällbar lista per del där kunden kryssar i det hen vill ha.
 * Jobb i samma grupp utesluter varandra. Sammanfattningen visar summa, mängdrabatt och vad
 * nästa jobb skulle ge. Valen delas med resten av prissidan (Prisval).
 */
export function Engangsvaljare() {
  const { valda, vaxla: vaxlaId, oppnaFormular } = usePrisval();
  const [oppen, setOppen] = useState<string | null>(DELAR[0]?.id ?? null);

  const valdaJobb = useMemo(() => ENGANGSJOBB.filter((j) => valda.includes(j.id)), [valda]);
  const r = raknaEngang(valdaJobb);

  function vaxla(j: Engangsjobb) {
    vaxlaId(j.id);
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
      <div className="space-y-3">
        {DELAR.map((d) => {
          const jobb = ENGANGSJOBB.filter((j) => j.del === d.id);
          const antalValda = jobb.filter((j) => valda.includes(j.id)).length;
          const arOppen = oppen === d.id;
          return (
            <div key={d.id} className="skylt-liten">
              <button
                type="button"
                aria-expanded={arOppen}
                aria-controls={`engang-${d.id}`}
                onClick={() => setOppen(arOppen ? null : d.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7"
              >
                <span>
                  <span className="block font-sans text-xs font-bold tracking-[0.22em] text-guld-mork uppercase">
                    {d.namn}
                  </span>
                  <span className="mt-1 block font-bold text-ink">{d.vad}</span>
                </span>
                <span className="flex items-center gap-3">
                  {antalValda > 0 && (
                    <span className="rounded-full bg-sun px-2.5 py-0.5 text-xs font-bold text-ink">
                      {antalValda} valda
                    </span>
                  )}
                  <ChevronDown
                    className={`size-5 shrink-0 text-ink transition-transform ${arOppen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </span>
              </button>
              {arOppen && (
                <div id={`engang-${d.id}`} className="border-t-2 border-line px-5 pb-5 sm:px-7">
                  <fieldset>
                    <legend className="sr-only">{d.namn} – engångsjobb</legend>
                    <ul className="divide-y-2 divide-line">
                      {jobb.map((j) => {
                        const vald = valda.includes(j.id);
                        return (
                          <li key={j.id}>
                            <label className="flex min-h-11 cursor-pointer items-center gap-4 py-4">
                              <input
                                type="checkbox"
                                checked={vald}
                                onChange={() => vaxla(j)}
                                className="size-5 shrink-0 accent-[var(--ink)]"
                              />
                              <span className="flex-1">
                                <span className="block font-bold text-ink">{j.namn}</span>
                                {j.not && (
                                  <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">
                                    {j.not}
                                  </span>
                                )}
                                {j.uppstart && (
                                  <span className="mt-1 block text-xs font-bold text-guld-mork">
                                    Startjobb – ingår inte i mängdrabatten
                                  </span>
                                )}
                              </span>
                              <span className="font-display text-lg whitespace-nowrap text-ink">
                                {j.fran ? `från ${kr(j.belopp)}` : kr(j.belopp)}
                              </span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </fieldset>
                  <p className="mt-2 text-sm text-ink/80">
                    <span className="font-bold">Större jobb:</span> {d.skraddarsytt.text} – offert
                    från {kr(d.skraddarsytt.pris)}
                    {d.skraddarsytt.enhet === "mån" ? "/mån" : ""}.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <aside
        aria-labelledby="engang-summa"
        aria-live="polite"
        className="mork-kort p-7 text-elfenben sm:p-8 lg:sticky lg:top-28"
      >
        <h3 id="engang-summa" className="caps text-sun">
          Era engångsjobb
        </h3>

        {valdaJobb.length === 0 ? (
          <p className="mt-4 leading-relaxed text-white/80">
            Kryssa i det ni vill ha. Ju fler jobb, desto större rabatt.
          </p>
        ) : (
          <ul className="mt-4 space-y-2">
            {valdaJobb.map((j) => (
              <li key={j.id} className="flex justify-between gap-4 text-sm">
                <span className="flex gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-sun" aria-hidden="true" />
                  {j.namn}
                </span>
                <span className="whitespace-nowrap">{j.fran ? "offert" : kr(j.belopp)}</span>
              </li>
            ))}
          </ul>
        )}

        <ol className="mt-6 grid grid-cols-3 gap-2" aria-label="Mängdrabatt">
          {MANGDRABATT.map((s) => {
            const aktiv = r.procent === s.procent;
            return (
              <li
                key={s.antal}
                className={`rounded-lg border px-2 py-2 text-center text-xs ${
                  aktiv ? "border-sun bg-sun font-bold text-ink" : "border-white/25 text-white/80"
                }`}
              >
                <span className="block">
                  {s.antal}
                  {s === MANGDRABATT[MANGDRABATT.length - 1] ? "+" : ""} jobb
                </span>
                <span className="block text-sm font-bold">−{s.procent} %</span>
              </li>
            );
          })}
        </ol>
        {r.nasta && r.antal > 0 && (
          <p className="mt-3 text-sm text-white/80">
            Lägg till {r.nasta.antal - r.antal} till för {r.nasta.procent} % rabatt.
          </p>
        )}

        <dl className="mt-6 space-y-2 border-t border-white/25 pt-5 text-sm">
          <div className="flex justify-between gap-4">
            <dt>Summa</dt>
            <dd>{kr(r.summa)}</dd>
          </div>
          {r.procent > 0 && (
            <div className="flex justify-between gap-4 text-sun">
              <dt>Mängdrabatt {r.procent} %</dt>
              <dd>−{kr(r.rabatt)}</dd>
            </div>
          )}
          <div className="flex items-baseline justify-between gap-4 pt-2">
            <dt className="font-bold">Totalt</dt>
            <dd className="font-display text-4xl leading-none">{kr(r.total)}</dd>
          </div>
        </dl>
        {r.offert.length > 0 && (
          <p className="mt-3 text-sm text-white/70">
            {r.offert.map((j) => j.namn).join(", ")} får ni fast pris på efter genomgången.
          </p>
        )}
        <p className="mt-3 text-xs text-white/60">{MOMS_TEXT} Engångspris, ingen bindning.</p>

        <button
          type="button"
          disabled={valda.length === 0}
          onClick={oppnaFormular}
          className="btn-base btn-white mt-6 w-full disabled:cursor-default disabled:opacity-60"
        >
          {valda.length > 0 ? "Skicka förfrågan" : "Välj minst ett jobb"}
          {valda.length > 0 && <ArrowRight className="size-4" aria-hidden="true" />}
        </button>
      </aside>
    </div>
  );
}
