import { Link } from "@tanstack/react-router";
import { AiSammanfattning } from "@/components/AiSammanfattning";
import { FORETAG } from "@/lib/foretag";
import { BEHOVER_SAMTYCKE, VISA_BANNER, oppnaInstallningar } from "@/lib/samtycke";
import { mejlKlick } from "@/lib/sparning";
import { TJANSTER, tjanstSokvag } from "@/lib/tjanster";

/**
 * Sidfoten: en graverad mässingsskylt som hänger på väggen under fyrmålningen (Fyrscen.tsx) –
 * som skylten under en tavla på ett museum. Titel, "konstnär" (bolaget), en rad om verket,
 * och längst ner katalognumret (org.nr). Allt ritas i CSS (.plakett i styles.css); inga bilder.
 */
export function Footer() {
  return (
    <footer className="plakett-vagg px-6 pt-12 pb-14 sm:pt-16 sm:pb-20">
      <div className="plakett mx-auto max-w-[66rem]">
        <span aria-hidden="true" className="plakett-skruv" />
        <span aria-hidden="true" className="plakett-skruv" />
        <span aria-hidden="true" className="plakett-skruv" />
        <span aria-hidden="true" className="plakett-skruv" />

        <div className="plakett-huvud">
          <p className="font-display text-[clamp(1.9rem,3.2vw,2.6rem)] leading-none">
            {FORETAG.namn}
          </p>
          <p className="plakett-caps">
            {FORETAG.juridisktNamn} · {FORETAG.ort}
          </p>
        </div>
        <p className="mt-4 max-w-2xl font-display text-[1.05rem] leading-relaxed italic sm:text-lg">
          {FORETAG.beskrivning}
        </p>

        <div className="plakett-kolumner">
          <div>
            <p className="plakett-caps">Tjänster</p>
            <ul className="plakett-lista">
              {TJANSTER.map((t) => (
                <li key={t.slug}>
                  <Link to={tjanstSokvag(t)} className="plakett-lank">
                    {t.titel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="plakett-caps">Sidor</p>
            <ul className="plakett-lista">
              <li>
                <Link to="/priser" className="plakett-lank">
                  Priser
                </Link>
              </li>
              <li>
                <Link to="/guider" className="plakett-lank">
                  Resurser
                </Link>
              </li>
              <li>
                <Link to="/om-oss" className="plakett-lank">
                  Om oss
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="plakett-lank">
                  Boka gratis genomgång
                </Link>
              </li>
              <li>
                <Link to="/villkor" className="plakett-lank">
                  Allmänna villkor
                </Link>
              </li>
              <li>
                <Link to="/integritetspolicy" className="plakett-lank">
                  Integritetspolicy
                </Link>
              </li>
              {(VISA_BANNER || BEHOVER_SAMTYCKE) && (
                <li>
                  <button type="button" onClick={oppnaInstallningar} className="plakett-lank">
                    Cookieinställningar
                  </button>
                </li>
              )}
            </ul>
          </div>

          <div>
            <p className="plakett-caps">Kontakt</p>
            <ul className="plakett-lista">
              {FORETAG.telefon && (
                <li>
                  <a href={`tel:${FORETAG.telefonLank}`} className="plakett-lank">
                    {FORETAG.telefon}
                  </a>
                </li>
              )}
              {FORETAG.epost && (
                <li>
                  <a
                    href={`mailto:${FORETAG.epost}`}
                    onClick={() => mejlKlick(window.location.pathname)}
                    className="plakett-lank"
                  >
                    {FORETAG.epost}
                  </a>
                </li>
              )}
              {FORETAG.gata && (
                <li>
                  <address className="not-italic">
                    {FORETAG.gata}
                    <br />
                    {FORETAG.postnummer} {FORETAG.ort}
                  </address>
                </li>
              )}
              {!FORETAG.gata && !FORETAG.epost && (
                <li>
                  <Link to="/kontakt" className="plakett-lank">
                    Skriv till oss
                  </Link>
                </li>
              )}
            </ul>
            <AiSammanfattning />
          </div>
        </div>

        <div className="plakett-fot">
          <span>
            © {new Date().getFullYear()} {FORETAG.namn} · Drivs av {FORETAG.juridisktNamn}
            {FORETAG.orgnr && ` · Org.nr\u00a0${FORETAG.orgnr}`}
          </span>
          <span>Godkänd för F-skatt</span>
        </div>
      </div>
    </footer>
  );
}
