import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { skickaBokning } from "@/lib/bokning";
import { FORETAG } from "@/lib/foretag";
import { metaKonvertering } from "@/lib/samtycke";
import { bokningSkickad, bokningSteg } from "@/lib/sparning";
import { DELAR } from "@/lib/priser";
import { delForTjanst } from "@/lib/tjanster";

/** Valen i formuläret: de fyra delarna i prislistan, t.ex. "Studio – bilder och video". */
const KORT: Record<string, string> = {
  studio: "bilder och video",
  annonser: "Facebook och Instagram",
  synlighet: "SEO och GEO",
  webb: "hemsida",
};
const VAL = DELAR.map((d) => ({ id: d.id, etikett: `${d.namn} – ${KORT[d.id] ?? d.vad}` }));

// Bokningsformuläret, en fråga i taget. Det lätta (vad ni vill ha hjälp med) kommer först och
// kontaktuppgifterna sist, när besökaren redan har kommit en bit. Varje steg är ett eget
// formulärutskick, så Enter tar en vidare och webbläsarens egen kontroll av obligatoriska fält
// gäller bara det steg som syns.

type Svar = {
  tjanster: string[];
  meddelande: string;
  webbplats: string;
  namn: string;
  epost: string;
  telefon: string;
  falla: string;
};

const STEG = ["hjalp", "hemsida", "vem", "kontakt"] as const;
type StegId = (typeof STEG)[number];

export function Bokningsformular({
  tjanst,
  paket,
  meddelande,
}: {
  tjanst?: string | undefined;
  paket?: string | undefined;
  /** Förifyllt meddelande, t.ex. valda engångsjobb från prissidan. */
  meddelande?: string | undefined;
}) {
  const navigate = useNavigate();
  const [steg, setSteg] = useState(0);
  const [skickar, setSkickar] = useState(false);
  const [fel, setFel] = useState(false);
  const [svar, setSvar] = useState<Svar>(() => ({
    tjanster: VAL.filter((v) => v.id === delForTjanst(tjanst)).map((v) => v.etikett),
    meddelande: meddelande ?? "",
    webbplats: "",
    namn: "",
    epost: "",
    telefon: "",
    falla: "",
  }));
  const stegRef = useRef<HTMLDivElement>(null);
  const forstaVisning = useRef(true);

  const id: StegId = STEG[steg] ?? "hjalp";
  const sista = steg === STEG.length - 1;

  // Flytta fokus till det nya stegets första fält. Inte vid sidladdning – då ska sidan inte hoppa.
  useEffect(() => {
    if (forstaVisning.current) {
      forstaVisning.current = false;
      return;
    }
    const rot = stegRef.current;
    const mal =
      rot?.querySelector<HTMLElement>("input:not([type=checkbox])") ??
      rot?.querySelector<HTMLElement>("[data-rubrik]");
    mal?.focus({ preventScroll: true });
    rot?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [steg]);

  function satt<K extends keyof Svar>(nyckel: K, varde: Svar[K]) {
    setSvar((s) => ({ ...s, [nyckel]: varde }));
  }

  function vaxla(titel: string) {
    setSvar((s) => ({
      ...s,
      tjanster: s.tjanster.includes(titel)
        ? s.tjanster.filter((t) => t !== titel)
        : [...s.tjanster, titel],
    }));
  }

  function nasta() {
    bokningSteg(id);
    setSteg((s) => s + 1);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!sista) return nasta();
    setFel(false);
    setSkickar(true);
    try {
      await skickaBokning({ data: { ...svar, paket: paket ?? "" } });
      bokningSkickad(svar.tjanster);
      metaKonvertering("Lead");
      // Egen tacksida: varje besök där räknas som en bokning i statistiken.
      await navigate({ to: "/tack" });
    } catch {
      setFel(true);
    } finally {
      setSkickar(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      // Clarity spelar aldrig in det som skrivs här, oavsett inställningar.
      data-clarity-mask="true"
      className="rounded-[2rem] border-2 border-line bg-white p-7 sm:p-10"
    >
      <div className="flex items-center justify-between gap-4 text-sm font-bold text-muted-foreground">
        <span aria-live="polite">
          Steg {steg + 1} av {STEG.length}
        </span>
        {steg > 0 && (
          <button
            type="button"
            onClick={() => setSteg((s) => s - 1)}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-ink underline-offset-4 hover:underline"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Tillbaka
          </button>
        )}
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line" aria-hidden="true">
        <div
          className="h-full rounded-full bg-brand transition-[width] duration-500 ease-out motion-reduce:transition-none"
          style={{ width: `${((steg + 1) / STEG.length) * 100}%` }}
        />
      </div>

      <div ref={stegRef} key={id} className="mt-8 scroll-mt-28">
        {id === "hjalp" && (
          <Fraga
            rubrik="Vad vill ni ha hjälp med?"
            hjalp="Välj så många ni vill, eller gå vidare direkt."
          >
            <div className="flex flex-wrap gap-2">
              {VAL.map((t) => (
                <label
                  key={t.id}
                  className="flex min-h-11 cursor-pointer items-center rounded-full border-2 border-line px-4 py-2 text-sm font-bold transition-colors duration-200 hover:border-brand has-[:checked]:border-brand has-[:checked]:bg-brand has-[:checked]:text-white has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-light"
                >
                  <input
                    type="checkbox"
                    checked={svar.tjanster.includes(t.etikett)}
                    onChange={() => vaxla(t.etikett)}
                    className="sr-only"
                  />
                  {t.etikett}
                </label>
              ))}
            </div>
            <label htmlFor="meddelande" className="mt-6 block text-sm font-bold">
              Något annat eller något vi bör veta? (valfritt)
            </label>
            <textarea
              id="meddelande"
              rows={3}
              value={svar.meddelande}
              onChange={(e) => satt("meddelande", e.target.value)}
              className="field mt-2"
            />
          </Fraga>
        )}

        {id === "hemsida" && (
          <Fraga rubrik="Har ni en hemsida i dag?" hjalp="Då kan vi titta på den innan vi ses.">
            <Inmatning
              id="webbplats"
              etikett="Adress till hemsidan"
              varde={svar.webbplats}
              onAndra={(v) => satt("webbplats", v)}
              autoComplete="url"
              inputMode="url"
              platshallare="t.ex. foretaget.se"
            />
          </Fraga>
        )}

        {id === "vem" && (
          <Fraga rubrik="Vem bokar?" hjalp="Företaget, ditt namn eller båda – skriv som ni vill.">
            <Inmatning
              id="namn"
              etikett="Företag/namn"
              varde={svar.namn}
              onAndra={(v) => satt("namn", v)}
              autoComplete="organization"
              platshallare="t.ex. Café Linnéa AB, Anna Berg"
              kravs
            />
          </Fraga>
        )}

        {id === "kontakt" && (
          <Fraga
            rubrik="Sist: var når vi dig?"
            hjalp="Vi hör av oss inom en arbetsdag för att boka en tid."
          >
            <div className="grid gap-5">
              <Inmatning
                id="epost"
                etikett="E-post"
                typ="email"
                varde={svar.epost}
                onAndra={(v) => satt("epost", v)}
                autoComplete="email"
                kravs
              />
              <Inmatning
                id="telefon"
                etikett="Telefon (valfritt)"
                typ="tel"
                varde={svar.telefon}
                onAndra={(v) => satt("telefon", v)}
                autoComplete="tel"
              />
            </div>

            {/* Dolt fält mot skräppost – riktiga besökare ser det aldrig. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
              <label htmlFor="falla">Lämna tomt</label>
              <input
                id="falla"
                tabIndex={-1}
                autoComplete="off"
                value={svar.falla}
                onChange={(e) => satt("falla", e.target.value)}
              />
            </div>
          </Fraga>
        )}
      </div>

      {fel && (
        <p role="alert" className="mt-6 text-sm font-bold text-destructive">
          Förfrågan kunde inte skickas. Försök igen om en stund
          {FORETAG.epost ? ` eller mejla ${FORETAG.epost}` : ""}.
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button type="submit" disabled={skickar} className="btn-base btn-dark">
          {sista ? (
            skickar ? (
              "Skickar …"
            ) : (
              "Boka gratis genomgång"
            )
          ) : (
            <>
              Nästa <ArrowRight className="size-4" aria-hidden="true" />
            </>
          )}
        </button>
        {id === "hemsida" && !svar.webbplats && (
          <button
            type="button"
            onClick={nasta}
            className="min-h-11 text-sm font-bold text-ink underline"
          >
            Nej, inte än
          </button>
        )}
      </div>

      {sista && (
        <p className="mt-6 text-sm text-muted-foreground">
          Vi använder uppgifterna bara för att boka och förbereda genomgången. Läs mer i{" "}
          <Link to="/integritetspolicy" className="font-bold text-brand underline">
            integritetspolicyn
          </Link>
          .
        </p>
      )}
    </form>
  );
}

function Fraga({
  rubrik,
  hjalp,
  children,
}: {
  rubrik: string;
  hjalp?: string;
  children: ReactNode;
}) {
  return (
    <fieldset>
      <legend className="contents">
        <h2 data-rubrik tabIndex={-1} className="text-2xl outline-none sm:text-3xl">
          {rubrik}
        </h2>
      </legend>
      {hjalp && <p className="mt-2 text-muted-foreground">{hjalp}</p>}
      <div className="mt-6">{children}</div>
    </fieldset>
  );
}

function Inmatning({
  id,
  etikett,
  varde,
  onAndra,
  typ = "text",
  autoComplete,
  inputMode,
  platshallare,
  kravs = false,
}: {
  id: string;
  etikett: string;
  varde: string;
  onAndra: (varde: string) => void;
  typ?: "text" | "email" | "tel";
  autoComplete: string;
  inputMode?: "url";
  platshallare?: string;
  kravs?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold">
        {etikett}
      </label>
      <input
        id={id}
        name={id}
        type={typ}
        value={varde}
        onChange={(e) => onAndra(e.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={platshallare}
        required={kravs}
        className="field mt-2"
      />
    </div>
  );
}
