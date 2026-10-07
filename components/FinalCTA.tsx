"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { INSTAGRAM, WHATSAPP } from "@/lib/data";
import { Cta, Lines, Logo } from "./ui";

/** Cena 08 — conversão. Ela caminha em direção à luz; o convite é um só. */
export default function FinalCTA() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo("[data-f-img]", { scale: 1.18 }, {
          scale: 1, ease: "none",
          scrollTrigger: { trigger: "[data-f-stage]", start: "top bottom", end: "top top", scrub: true },
        });
        gsap.from("[data-line]", {
          yPercent: 115, stagger: 0.1, duration: 1.5,
          scrollTrigger: { trigger: "[data-f-stage]", start: "top 35%" },
        });
        gsap.from("[data-f-fade]", {
          autoAlpha: 0, y: 20, stagger: 0.1, delay: 0.4,
          scrollTrigger: { trigger: "[data-f-stage]", start: "top 35%" },
        });
        gsap.from("[data-wordmark]", {
          yPercent: 40, ease: "none",
          scrollTrigger: { trigger: "[data-footer]", start: "top bottom", end: "bottom bottom", scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} data-dark className="relative bg-night text-ivory">
      <div data-f-stage className="relative h-[100svh] min-h-[620px] overflow-hidden">
        <div data-f-img className="absolute inset-0 will-change-transform">
          <Image src="/img/final.webp" alt="Mulher caminhando pelo corredor iluminado da clínica" fill sizes="100vw" className="object-cover object-[58%_50%]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,13,12,.05)_0%,rgba(14,13,12,.15)_45%,rgba(14,13,12,.72)_100%)]" />

        <div className="absolute inset-x-5 bottom-10 md:inset-x-10 lg:bottom-14">
          <h2 className="display text-[clamp(3.2rem,12vw,5rem)] lg:text-[clamp(5rem,8vw,9rem)]">
            <Lines lines={["Comece pelo seu", <em key="i" className="italic">melhor momento.</em>]} />
          </h2>
          <div className="mt-10 flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
            <div data-f-fade>
              <Cta tone="ivory">Agendar avaliação</Cta>
            </div>
            <p data-f-fade className="eyebrow text-ivory/70">Resposta em até 2 horas · pelo WhatsApp</p>
          </div>
        </div>
      </div>

      <footer data-footer className="overflow-hidden px-5 pt-16 md:px-10">
        <div className="grid grid-cols-2 gap-10 border-b border-ivory/12 pb-14 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-[26ch] text-[0.875rem] leading-relaxed text-ivory/50">Clínica de estética avançada. Responsável técnica: Dra. Helena Duarte.</p>
          </div>
          <div>
            <p className="eyebrow text-ivory/40">Endereço</p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-ivory/80">Setor Marista<br />Goiânia — GO</p>
          </div>
          <div>
            <p className="eyebrow text-ivory/40">Contato</p>
            <ul className="mt-4 space-y-2 text-[0.9375rem] text-ivory/80">
              <li><a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-champagne">WhatsApp</a></li>
              <li><a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-champagne">Instagram</a></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow text-ivory/40">Horário</p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-ivory/80">Seg a sex · 9h–20h<br />Sáb · 9h–14h</p>
          </div>
        </div>
        <div className="flex items-center justify-between py-6 text-[0.75rem] text-ivory/35">
          <span>© {new Date().getFullYear()} Ivoire</span>
          <a href="#top" className="transition-colors hover:text-ivory">Voltar ao topo ↑</a>
        </div>
        <div aria-hidden className="pointer-events-none -mb-[0.2em] select-none">
          <p data-wordmark className="display text-center text-[27vw] leading-[0.8] text-ivory/[0.06]">Ivoire</p>
        </div>
      </footer>
    </section>
  );
}
