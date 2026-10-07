"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { Lines } from "./ui";

const pillars = [
  { t: "Precisão", d: "Mapeamento facial digital e doses calculadas por região. Nada é aplicado no olho." },
  { t: "Personalização", d: "Cada protocolo nasce de um diagnóstico individual da sua pele, anatomia e rotina." },
  { t: "Segurança", d: "Equipamentos com registro na Anvisa, insumos rastreáveis e médicos responsáveis em cada sessão." },
];

/** Cena 05 — a clínica escurece: o momento técnico da narrativa. */
export default function Technology() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from("[data-line]", {
          yPercent: 115, stagger: 0.1, duration: 1.4,
          scrollTrigger: { trigger: "[data-tech-head]", start: "top 78%" },
        });
        // Reveal horizontal: a imagem se abre da esquerda para a direita
        gsap.fromTo("[data-tech-frame]", { clipPath: "inset(0% 100% 0% 0%)" }, {
          clipPath: "inset(0% 0% 0% 0%)", duration: 2, ease: "expo.inOut",
          scrollTrigger: { trigger: "[data-tech-frame]", start: "top 75%" },
        });
        gsap.fromTo("[data-tech-img]", { scale: 1.2, xPercent: -4 }, {
          scale: 1.05, xPercent: 4, ease: "none",
          scrollTrigger: { trigger: "[data-tech-frame]", start: "top bottom", end: "bottom top", scrub: true },
        });
        gsap.from("[data-pillar]", {
          autoAlpha: 0, y: 30, stagger: 0.12,
          scrollTrigger: { trigger: "[data-pillars]", start: "top 82%" },
        });
        gsap.from("[data-rule]", {
          scaleX: 0, transformOrigin: "left", stagger: 0.12, duration: 1.6, ease: "expo.inOut",
          scrollTrigger: { trigger: "[data-pillars]", start: "top 82%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="tecnologia" ref={root} data-dark className="relative bg-night px-5 py-[16vh] text-ivory md:px-10 lg:py-[22vh]">
      <div data-tech-head className="grid grid-cols-12 items-end gap-x-8 gap-y-10">
        <div className="col-span-12 lg:col-span-8">
          <p className="eyebrow mb-10 flex items-center gap-4 text-ivory/45">
            <span className="h-px w-10 bg-ivory/30" /> Tecnologia
          </p>
          <h2 className="display text-[clamp(2.8rem,10vw,4.5rem)] lg:text-[clamp(4.5rem,6.4vw,7.5rem)]">
            <Lines lines={["Tecnologia que respeita", <em key="i" className="italic text-ivory/70">a sua individualidade.</em>]} />
          </h2>
        </div>
        <p className="col-span-12 max-w-[36ch] text-[1rem] leading-relaxed text-ivory/60 lg:col-span-4 lg:pb-3">
          Ultrassom microfocado, radiofrequência e lasers de última geração — escolhidos pelo que fazem pela sua pele, não pelo nome.
        </p>
      </div>

      <div data-tech-frame className="relative mt-16 aspect-[4/5] overflow-hidden sm:aspect-[16/9] lg:mt-24 lg:aspect-[21/9]">
        <div data-tech-img className="absolute inset-0 will-change-transform">
          <Image src="/img/tecnologia.webp" alt="Profissional usando equipamento de ultrassom no rosto de uma paciente, com tela de mapeamento facial ao fundo" fill sizes="100vw" className="object-cover object-[45%_45%]" />
        </div>
        <span className="eyebrow absolute bottom-5 left-5 text-ivory/85 md:bottom-7 md:left-7">Mapeamento facial · Ultrassom microfocado</span>
      </div>

      <div data-pillars className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8 lg:mt-24">
        {pillars.map((p, i) => (
          <div key={p.t}>
            <span data-rule className="block h-px w-full bg-ivory/20" />
            <div data-pillar className="pt-7">
              <span className="eyebrow text-champagne">0{i + 1}</span>
              <h3 className="display mt-5 text-[2.4rem] lg:text-[2.9rem]">{p.t}</h3>
              <p className="mt-4 max-w-[34ch] text-[0.9375rem] leading-relaxed text-ivory/55">{p.d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
