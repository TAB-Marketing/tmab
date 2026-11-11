import { ChevronDown, Plus } from "lucide-react";
import { useState } from "react";
import { MedLankar } from "@/components/MedLankar";
import type { Fraga } from "@/lib/priser";

/** Hur många frågor som syns innan "Visa fler". */
const SYNLIGA = 6;

/**
 * Vanliga frågor som inbyggda <details>-element: svaren finns i HTML:en från start, så
 * sökmotorer och AI-assistenter kan läsa dem. De första sex syns; resten finns i HTML:en
 * men döljs tills besökaren klickar på "Visa fler", så att sidan inte blir en vägg av frågor.
 * Lägg faqSchema() med samma frågor i sidans head().
 */
export function VanligaFragor({ fragor }: { fragor: readonly Fraga[] }) {
  const [alla, setAlla] = useState(false);
  const dolda = fragor.length - SYNLIGA;
  return (
    <div>
      <div className="border-t border-ink/20">
        {fragor.map((f, i) => (
          <details
            key={f.fraga}
            className={`group border-b border-ink/20 ${!alla && i >= SYNLIGA ? "hidden" : ""}`}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
              <h3 className="text-xl leading-snug text-ink sm:text-[1.4rem]">{f.fraga}</h3>
              <span className="grid size-9 shrink-0 place-items-center rounded-full border border-guld text-guld-mork transition-transform duration-300 group-open:rotate-45">
                <Plus className="size-4" strokeWidth={1.5} aria-hidden="true" />
              </span>
            </summary>
            <p className="max-w-3xl pb-6 text-base leading-relaxed text-ink/80">
              <MedLankar text={f.svar} />
            </p>
          </details>
        ))}
      </div>
      {dolda > 0 && !alla && (
        <button
          type="button"
          onClick={() => setAlla(true)}
          className="btn-base btn-outline mt-6"
          aria-expanded={false}
        >
          Visa {dolda} frågor till
          <ChevronDown className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
