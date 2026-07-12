"use client";

import { useEffect, useRef, useState } from "react";
import "./SiteChrome.css";

export type SlideKey =
  | "fine-art"
  | "case-studies"
  | "about"
  | "home"
  | "tldr"
  | "coaching"
  | "services";

const IMG = "/images";
const ASSET = {
  calendar: `${IMG}/65e832d86357fb7d95537bdd_calendar-icon.svg`,
  mail: `${IMG}/65e832e23db58cff7458f5bd_mail-icon.svg`,
  insta: `${IMG}/65e832e61bd6c485189056d9_insta-icon.svg`,
  infinite: `${IMG}/65eea8979ab6ae7f1225eb96_infinite-sign.svg`,
  menu: `${IMG}/65f436262685d6ff60ebc088_menu-icon.svg`,
  cross: `${IMG}/65f80422c44b3a07dcf552c9_menu-cross-btn.svg`,
  evilEye: `${IMG}/65f02f3b9675f40235dc846a_evil-eye-icon.png`,
} as const;

const iconVar = (url: string) =>
  ({ "--icon": `url("${url}")` }) as React.CSSProperties;

type Social = { href: string; icon: string; alt: string; blank: boolean };
const SOCIALS: Social[] = [
  { href: "tel:4000155158", icon: ASSET.calendar, alt: "Call FCC — 400 015 5158", blank: false },
  { href: "https://funshinecareerconsulting.com/", icon: ASSET.mail, alt: "Funshine Career Consulting website", blank: true },
  { href: "https://funshinecareerconsulting.com/", icon: ASSET.insta, alt: "Funshine Career Consulting", blank: true },
];

type NavItem = { key: SlideKey; label: string };

// Bottom nav order (Swiper pagination in the original): Fine Art → Services.
const FOOTER_ITEMS: NavItem[] = [
  { key: "fine-art", label: "Team" },
  { key: "case-studies", label: "Cases" },
  { key: "about", label: "About" },
  { key: "home", label: "Home" },
  { key: "tldr", label: "Why FCC" },
  { key: "coaching", label: "FAQ" },
  { key: "services", label: "Services" },
];

// Mobile menu order (from mobile-nav.source.html).
const MOBILE_ITEMS: NavItem[] = [
  { key: "home", label: "HOME" },
  { key: "tldr", label: "WHY FCC" },
  { key: "coaching", label: "FAQ" },
  { key: "services", label: "SERVICES" },
  { key: "fine-art", label: "TEAM" },
  { key: "case-studies", label: "CASES" },
  { key: "about", label: "ABOUT" },
];

function MaskIcon({ icon, className }: { icon: string; className: string }) {
  return <span className={`${className} sc-mask`} style={iconVar(icon)} aria-hidden="true" />;
}

// FCC inline wordmark (replaces the two dabbledee floral PNGs). The red "FCC"
// block is constant; the accent frame + three-line wordmark ride --chrome-accent
// so they flip with the two-theme chrome (yellow on the red header, red on cream).
function FccLogo() {
  return (
    <span className="sc-fcc-logo" aria-hidden="true">
      <span className="sc-fcc-mark">FCC</span>
      <span className="sc-fcc-words">
        <span>Funshine</span>
        <span>Career</span>
        <span>Consulting</span>
      </span>
    </span>
  );
}

function SocialLinks({ variant }: { variant?: "mobile" }) {
  return (
    <ul className={`sc-hdr-link-list${variant === "mobile" ? " mobile" : ""}`}>
      {SOCIALS.map((s) => (
        <li className="sc-hdr-link-item" key={s.icon}>
          <a
            className="sc-hdr-link-iblck"
            href={s.href}
            aria-label={s.alt}
            target={s.blank ? "_blank" : undefined}
            rel={s.blank ? "noreferrer" : undefined}
          >
            <MaskIcon icon={s.icon} className="sc-hdr-link-iblck-img" />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function SiteChrome({
  activeKey,
  onNavigate,
}: {
  activeKey: SlideKey;
  onNavigate: (k: SlideKey) => void;
}): React.JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pos, setPos] = useState<{ left: number; ready: boolean }>({ left: 0, ready: false });
  const [animate, setAnimate] = useState(false);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const dotRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const rawIndex = FOOTER_ITEMS.findIndex((i) => i.key === activeKey);
  const activeIndex = rawIndex < 0 ? 3 : rawIndex; // default to HOME

  // Measure the active dot's centre (within the wrapper) and slide the evil-eye there.
  useEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current;
      const dot = dotRefs.current[activeIndex];
      if (!wrap || !dot) return;
      const wr = wrap.getBoundingClientRect();
      const dr = dot.getBoundingClientRect();
      if (wr.width === 0) return; // footer hidden (mobile) — skip
      setPos({ left: dr.left - wr.left + dr.width / 2, ready: true });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeIndex]);

  // Enable the sliding transition only after the first placement (no slide-in on load).
  useEffect(() => {
    const id = window.setTimeout(() => setAnimate(true), 90);
    return () => window.clearTimeout(id);
  }, []);

  const go = (k: SlideKey) => {
    onNavigate(k);
    setMenuOpen(false);
  };

  return (
    <>
      {/* ---------- Header ---------- */}
      <header className="sc-hdr" role="banner">
        <div className="sc-container">
          <div className="sc-hdr-in">
            <div className="sc-logo-wrap">
              <button className="sc-brand-logo" onClick={() => go("home")} aria-label="Funshine Career Consulting — home">
                <FccLogo />
              </button>
            </div>

            <SocialLinks />

            <button
              className="sc-menu-toggler"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <MaskIcon icon={ASSET.menu} className="sc-menu-toggler-img" />
            </button>
          </div>
        </div>
      </header>

      {/* ---------- Bottom nav (desktop) ---------- */}
      <footer className="sc-footer">
        <div className="sc-container">
          <div className="sc-footer-in">
            <div className="sc-arw-wpr left">
              <MaskIcon icon={ASSET.infinite} className="sc-infinite" />
            </div>

            <div className="sc-footer-menu-wpr">
              <div className="sc-footer-menu-wpr-in" ref={wrapRef}>
                <ul className="sc-footer-menu-list">
                  {FOOTER_ITEMS.map((it, i) => {
                    const active = it.key === activeKey;
                    return (
                      <li className="sc-footer-menu-list-item" key={it.key}>
                        <button
                          className={`sc-footer-menu${active ? " active" : ""}`}
                          data-slide={i}
                          aria-current={active ? "true" : undefined}
                          onClick={() => onNavigate(it.key)}
                        >
                          <span className="sc-footer-menu-label">{it.label}</span>
                          <span
                            className="sc-footer-menu-dot"
                            ref={(el) => {
                              dotRefs.current[i] = el;
                            }}
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <img
                  className={`sc-active-menu-indicator-img${pos.ready ? " ready" : ""}${animate ? " is-animate" : ""}`}
                  src={ASSET.evilEye}
                  alt=""
                  aria-hidden="true"
                  style={{ left: `${pos.left}px` }}
                />
              </div>
            </div>

            <div className="sc-arw-wpr right">
              <MaskIcon icon={ASSET.infinite} className="sc-infinite mirror" />
            </div>
          </div>
        </div>
      </footer>

      {/* ---------- Mobile menu overlay ---------- */}
      <div className={`sc-mobile-nav${menuOpen ? " show" : ""}`} aria-hidden={!menuOpen}>
        <div className="sc-mobile-nav-in">
          <button
            className="sc-menu-toggler in"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <MaskIcon icon={ASSET.cross} className="sc-menu-toggler-img" />
          </button>

          <ul className="sc-nav-list">
            {MOBILE_ITEMS.map((it, i) => {
              const active = it.key === activeKey;
              return (
                <li
                  className="sc-nav-list-item"
                  key={it.key}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <button
                    className={`sc-nav-link${active ? " active" : ""}`}
                    onClick={() => go(it.key)}
                    aria-current={active ? "true" : undefined}
                  >
                    {it.label}
                  </button>
                  <div className="sc-nav-menu-line" />
                </li>
              );
            })}
          </ul>

          <SocialLinks variant="mobile" />
        </div>
      </div>
    </>
  );
}
