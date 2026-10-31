import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Brand";
import { FORETAG } from "@/lib/foretag";
import { BEHOVER_SAMTYCKE, VISA_BANNER, oppnaInstallningar } from "@/lib/samtycke";
import { mejlKlick } from "@/lib/sparning";
import { TJANSTER, tjanstSokvag } from "@/lib/tjanster";

const LANK =
  "rounded-sm underline decoration-transparent decoration-2 underline-offset-4 transition-colors duration-200 hover:decoration-sun";

export function Footer() {
  return (
    <footer className="p-3 pt-0 sm:px-6">
      <div className="mx-auto max-w-[88rem] overflow-hidden rounded-[2rem] bg-ink text-white">
        <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo ljus storlek="stor" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/75">
              {FORETAG.beskrivning}
            </p>
          </div>

          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-sun uppercase">Tjänster</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/85">
              {TJANSTER.map((t) => (
                <li key={t.slug}>
                  <Link to={tjanstSokvag(t)} className={LANK}>
                    {t.titel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-sun uppercase">Sidor</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/85">
              <li>
                <Link to="/priser" className={LANK}>
                  Priser
                </Link>
              </li>
              <li>
                <Link to="/guider" className={LANK}>
                  Resurser
                </Link>
              </li>
              <li>
                <Link to="/om-oss" className={LANK}>
                  Om oss
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className={LANK}>
                  Boka gratis genomgång
                </Link>
              </li>
              <li>
                <Link to="/villkor" className={LANK}>
                  Allmänna villkor
                </Link>
              </li>
              <li>
                <Link to="/integritetspolicy" className={LANK}>
                  Integritetspolicy
                </Link>
              </li>
              {(VISA_BANNER || BEHOVER_SAMTYCKE) && (
                <li>
                  <button type="button" onClick={oppnaInstallningar} className={LANK}>
                    Cookieinställningar
                  </button>
                </li>
              )}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-sun uppercase">Kontakt</p>
            <ul className="mt-4 space-y-3 text-sm text-white/85">
              {FORETAG.telefon && (
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-sun" aria-hidden="true" />
                  <a href={`tel:${FORETAG.telefonLank}`} className={LANK}>
                    {FORETAG.telefon}
                  </a>
                </li>
              )}
              {FORETAG.epost && (
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-sun" aria-hidden="true" />
                  <a
                    href={`mailto:${FORETAG.epost}`}
                    onClick={() => mejlKlick(window.location.pathname)}
                    className={LANK}
                  >
                    {FORETAG.epost}
                  </a>
                </li>
              )}
              {FORETAG.gata && (
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-sun" aria-hidden="true" />
                  <address className="not-italic">
                    {FORETAG.gata}
                    <br />
                    {FORETAG.postnummer} {FORETAG.ort}
                  </address>
                </li>
              )}
              {!FORETAG.gata && !FORETAG.epost && (
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-sun" aria-hidden="true" />
                  <Link to="/kontakt" className={LANK}>
                    Skriv till oss
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/15">
          <div className="container-page flex flex-wrap justify-between gap-2 py-6 text-xs text-white/70">
            <span>
              © {new Date().getFullYear()} {FORETAG.namn} · Drivs av {FORETAG.juridisktNamn}
              {FORETAG.orgnr && ` · Org.nr\u00a0${FORETAG.orgnr}`}
            </span>
            <span>Godkänd för F-skatt</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
