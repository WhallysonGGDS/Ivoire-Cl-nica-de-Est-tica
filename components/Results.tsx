"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { results } from "@/lib/data";
import { Lines } from "./ui";

type Result = (typeof results)[number];

/**
 * Comparação antes/depois por máscara horizontal.
 * Ao entrar na tela a máscara desliza sozinha até o meio; depois o usuário arrasta.
 */
function Compare({ r, sizes }: { r: Result; sizes: string }) {
  const box = useRef<HTMLDivElement>(null);

  const setPos = (clientX: number) => {
    const el = box.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = Math.min(96, Math.max(4, ((clientX - rect.left) / rect.width) * 100));
    gsap.to(el, { "--pos": `${p}%`, duration: 0.6, ease: "power3.out", overwrite: true });
  };

  return (
    <div
      ref={box}
      data-compare
      className="group relative aspect-[4/5] cursor-ew-resize touch-pan-y select-none overflow-hidden [--pos:50%]"
      onPointerMove={(e) => (e.pointerType === "mouse" || e.buttons) && setPos(e.clientX)}
      onPointerDown={(e) => setPos(e.clientX)}
      role="img"
      aria-label={`Comparação antes e depois — ${r.treatment}`}
    >
      <Image src={r.img} alt="" fill sizes={sizes} className="object-cover" style={{ objectPosition: r.pos }} />
      {/* "Antes": mesma fotografia, mascarada — substituir pela foto real do caso */}
      <div className="absolute inset-0 [clip-path:inset(0_calc(100%-var(--pos))_0_0)]">
        <Image src={r.img} alt="" fill sizes={sizes} className="object-cover [filter:saturate(.7)_contrast(.88)_brightness(.95)_sepia(.12)]" style={{ objectPosition: r.pos }} />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-[var(--pos)] w-px bg-ivory/90">
        <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ivory shadow-[0_8px_30px_rgba(0,0,0,.18)] transition-transform duration-500 ease-lux group-hover:scale-110">
          <svg viewBox="0 0 20 10" className="w-4 text-ink" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M5 1 1 5l4 4M15 1l4 4-4 4" /></svg>
        </span>
      </div>
      <span className="eyebrow pointer-events-none absolute left-4 top-4 text-ivory">Antes</span>
      <span className="eyebrow pointer-events-none absolute right-4 top-4 text-ivory">Depois</span>
    </div>
  );
}

function Caption({ r, i }: { r: Result; i: number }) {
  return (
    <div data-r-cap className="mt-6 grid grid-cols-[auto_1fr] gap-x-5">
      <span className="eyebrow pt-2 text-ink/40">Caso 0{i + 1}</span>
      <div>
        <h3 className="display text-[1.9rem] lg:text-[2.2rem]">{r.treatment}</h3>
        <p className="mt-2 max-w-[40ch] text-[0.9375rem] leading-relaxed text-ink-soft">{r.text}</p>
        <p className="eyebrow mt-4 text-champagne">{r.time}</p>
      </div>
    </div>
  );
}

/** Cena 06 — prova. Sem estética de "antes e depois" de panfleto: composição editorial. */
export default function Results() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from("[data-line]", {
          yPercent: 115, stagger: 0.1, duration: 1.4,
          scrollTrigger: { trigger: "[data-r-head]", start: "top 80%" },
        });
        gsap.utils.toArray<HTMLElement>("[data-compare]").forEach((el) => {
          gsap.fromTo(el, { "--pos": "100%" }, {
            "--pos": "50%", duration: 2.2, ease: "expo.inOut",
            scrollTrigger: { trigger: el, start: "top 65%" },
          });
          gsap.fromTo(el, { clipPath: "inset(10% 0% 0% 0%)" }, {
            clipPath: "inset(0% 0% 0% 0%)", ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "top 40%", scrub: true },
          });
        });
        gsap.to("[data-r-offset]", {
          yPercent: -12, ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="resultados" ref={root} className="relative px-5 pb-[10vh] pt-[16vh] md:px-10 lg:pb-[14vh] lg:pt-[24vh]">
      <div data-r-head className="grid grid-cols-12 gap-x-8">
        <div className="col-span-12 lg:col-span-7">
          <p className="eyebrow mb-10 flex items-center gap-4 text-ink/50">
            <span className="h-px w-10 bg-ink/30" /> Resultados
          </p>
          <h2 className="display text-[clamp(2.9rem,10.5vw,4.5rem)] lg:text-[clamp(4.5rem,6.6vw,7.75rem)]">
            <Lines lines={["Resultados que", <em key="i" className="italic">falam por si.</em>]} />
          </h2>
        </div>
        <p className="col-span-12 mt-8 max-w-[34ch] self-end text-[0.9375rem] leading-relaxed text-ink-soft lg:col-span-4 lg:col-start-9 lg:mt-0">
          Arraste para comparar. Mudanças que as pessoas percebem em você — sem conseguir dizer exatamente o quê.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-12 gap-x-8 gap-y-20 lg:mt-28">
        <div className="col-span-12 md:col-span-7">
          <Compare r={results[0]} sizes="(min-width:768px) 58vw, 100vw" />
          <Caption r={results[0]} i={0} />
        </div>
        <div data-r-offset className="col-span-11 col-start-2 md:col-span-5 md:col-start-8 md:mt-[38vh] lg:col-span-4 lg:col-start-9">
          <Compare r={results[1]} sizes="(min-width:768px) 33vw, 90vw" />
          <Caption r={results[1]} i={1} />
        </div>
      </div>

      <p className="eyebrow mt-20 text-ink/35">Imagens ilustrativas. Resultados variam de pessoa para pessoa.</p>
    </section>
  );
}
