"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

const phrase = [
  { w: "Não transformamos você.", italic: false },
  { w: "Realçamos o que já existe.", italic: true },
];

/** Cena 02 — Contexto. A frase se acende palavra por palavra no ritmo do scroll. */
export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-word]",
          { opacity: 0.13 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: "[data-phrase]", start: "top 78%", end: "bottom 45%", scrub: true },
          },
        );

        gsap.fromTo(
          "[data-mask]",
          { clipPath: "inset(18% 12% 18% 12%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: { trigger: "[data-mask]", start: "top 95%", end: "center 55%", scrub: true },
          },
        );
        gsap.fromTo("[data-mimg]", { scale: 1.25, yPercent: -6 }, {
          scale: 1, yPercent: 6, ease: "none",
          scrollTrigger: { trigger: "[data-mask]", start: "top bottom", end: "bottom top", scrub: true },
        });
        // Parallax relativo: imagem e texto se movem em velocidades diferentes
        gsap.to("[data-mwrap]", {
          yPercent: -14, ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="manifesto" ref={root} className="relative px-5 py-[18vh] md:px-10 lg:py-[26vh]">
      <div className="grid grid-cols-12 gap-x-5 md:gap-x-8">
        <div className="col-span-12 lg:col-span-7">
          <p className="eyebrow mb-10 flex items-center gap-4 text-ink/50">
            <span className="h-px w-10 bg-ink/30" /> Manifesto
          </p>
          <h2 data-phrase className="display text-[clamp(2.9rem,10.5vw,4.5rem)] lg:text-[clamp(4.5rem,6.6vw,7.75rem)]">
            {phrase.map((p, i) => (
              <span key={i} className={`block ${p.italic ? "italic" : ""} ${i === 1 ? "mt-2 lg:pl-[1.2em]" : ""}`}>
                {p.w.split(" ").map((w, j) => (
                  <span key={j} data-word className="inline-block pr-[0.22em]">
                    {w}
                  </span>
                ))}
              </span>
            ))}
          </h2>
          <p className="mt-12 max-w-[42ch] text-[1.0625rem] leading-relaxed text-ink-soft lg:mt-16 lg:ml-[12%]">
            Cada rosto tem sua própria arquitetura. Nosso trabalho é entendê-la — e intervir só onde a sua beleza pede.
            O resultado não aparece como procedimento. Aparece como você, num dia muito bom.
          </p>
        </div>

        <div data-mwrap className="col-span-10 col-start-3 mt-16 sm:col-span-6 sm:col-start-7 lg:col-span-4 lg:col-start-9 lg:mt-[22vh]">
          <div data-mask className="relative aspect-[4/5] overflow-hidden">
            <div data-mimg className="absolute inset-0">
              <Image src="/img/manifesto.webp" alt="Mulher em roupão branco sentada em um sofá, em um ambiente calmo e iluminado" fill sizes="(min-width:1024px) 33vw, 80vw" className="object-cover" />
            </div>
          </div>
          <p className="eyebrow mt-4 flex justify-between text-ink/45">
            <span>Ritual Ivoire</span>
            <span>Pausa · 90 min</span>
          </p>
        </div>
      </div>
    </section>
  );
}
