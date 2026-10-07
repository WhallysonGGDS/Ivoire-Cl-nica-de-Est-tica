"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { nav } from "@/lib/data";
import { Cta, Logo } from "./ui";

export default function Header() {
  const root = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const darks = Array.from(document.querySelectorAll<HTMLElement>("[data-dark]"));
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      // Header inverte quando passa sobre uma cena escura
      setDark(darks.some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= 40 && r.bottom >= 40;
      }));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Entrada discreta, depois que o hero já se revelou
  useGSAP(
    () => {
      gsap.from("[data-h]", { autoAlpha: 0, y: -12, stagger: 0.06, duration: 1.2, delay: 1.9 });
    },
    { scope: root },
  );

  // Menu mobile em tela cheia: links sobem em sequência
  useGSAP(
    () => {
      if (!open) return;
      gsap.fromTo("[data-m]", { yPercent: 110 }, { yPercent: 0, stagger: 0.07, duration: 1.1, delay: 0.15 });
    },
    { scope: root, dependencies: [open] },
  );

  return (
    <header ref={root} className="fixed inset-x-0 top-0 z-50">
      <div
        className={`relative z-10 mx-auto flex items-center justify-between px-5 transition-all duration-700 ease-lux md:px-10 ${
          scrolled ? "h-16 backdrop-blur-xl backdrop-saturate-150" : "h-20 md:h-24"
        } ${scrolled && !open ? (dark ? "bg-night/55" : "bg-ivory/72") : ""} ${dark && !open ? "text-ivory" : "text-ink"
        }`}
      >
        <a href="#top" data-h aria-label="Ivoire — início" className="relative z-10">
          <Logo />
        </a>

        <nav data-h className="hidden items-center gap-10 lg:flex" aria-label="Principal">
          {nav.map((l) => (
            <a key={l.href} href={l.href} className="group relative text-[0.8125rem] opacity-70 transition-opacity duration-500 hover:opacity-100">
              {l.label}
              <span className="absolute -bottom-1.5 left-1/2 size-[3px] -translate-x-1/2 scale-0 rounded-full bg-champagne transition-transform duration-500 ease-lux group-hover:scale-100" />
            </a>
          ))}
        </nav>

        <div data-h className="hidden lg:block">
          <Cta size="sm" tone={dark ? "ivory" : "ink"}>Agendar avaliação</Cta>
        </div>

        <button
          data-h
          onClick={() => setOpen((v) => !v)}
          className="relative z-10 flex h-10 items-center gap-3 text-[0.8125rem] font-medium lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
        >
          {open ? "Fechar" : "Menu"}
          <span className="relative block h-2.5 w-6">
            <span className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ease-lux ${open ? "top-1/2 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ease-lux ${open ? "top-1/2 -rotate-45" : "top-full"}`} />
          </span>
        </button>
      </div>

      {/* Menu mobile fullscreen */}
      <div
        id="menu-mobile"
        className={`fixed inset-0 flex flex-col justify-between bg-ivory px-5 pb-10 pt-28 transition-[clip-path] duration-[900ms] ease-lux lg:hidden ${
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <nav className="flex flex-col" aria-label="Menu">
          {nav.map((l, i) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 border-b border-ink/10 py-4">
              <span className="eyebrow text-ink/40">0{i + 1}</span>
              <span className="line-mask">
                <span data-m className="display text-[3.25rem]">{l.label}</span>
              </span>
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-6">
          <p className="max-w-[28ch] text-sm text-ink-soft">Avaliação individual, com diagnóstico e plano de tratamento feitos para você.</p>
          <Cta className="self-start">Agendar avaliação</Cta>
        </div>
      </div>
    </header>
  );
}
