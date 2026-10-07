"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Cena 04 — Detalhe. Uma fotografia pequena, quase uma janela,
 * que cresce até tomar a tela inteira. A legenda se despede no caminho.
 */
export default function Cinema() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { desktop } = ctx.conditions as { desktop: boolean };
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: root.current, start: "top top", end: "+=170%", pin: true, scrub: 1 },
          });
          tl.fromTo(
            "[data-c-frame]",
            { clipPath: desktop ? "inset(26% 34% 26% 34%)" : "inset(30% 14% 30% 14%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1 },
            0,
          )
            .fromTo("[data-c-img]", { scale: 1.45 }, { scale: 1, duration: 1 }, 0)
            .to("[data-c-cap]", { autoAlpha: 0, y: -30, duration: 0.3 }, 0.18)
            .fromTo("[data-c-side]", { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.3 }, 0)
            .from("[data-c-end]", { autoAlpha: 0, y: 30, duration: 0.3 }, 0.8)
            .to({}, { duration: 0.25 });
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-screen overflow-hidden bg-ivory" aria-label="Precisão em cada detalhe">
      <div data-c-frame className="absolute inset-0 overflow-hidden">
        <div data-c-img className="absolute inset-0 will-change-transform">
          <Image src="/img/cinema.webp" alt="Sala de tratamento com maca, luz natural e vista para o mar" fill sizes="100vw" className="object-cover object-[55%_50%]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      </div>

      {/* Legenda inicial, abaixo da "janela" */}
      <p data-c-cap className="display pointer-events-none absolute inset-x-0 bottom-[14%] text-center text-[clamp(1.6rem,3.2vw,2.6rem)] italic text-ink motion-reduce:hidden lg:bottom-[15%]">
        Precisão em cada detalhe.
      </p>
      <div data-c-side className="pointer-events-none absolute inset-x-5 top-[22%] hidden justify-between motion-reduce:hidden md:inset-x-10 lg:flex">
        <span className="eyebrow text-ink/45">Sala 03</span>
        <span className="eyebrow text-ink/45">Luz natural · 11h</span>
      </div>

      {/* Fecho da cena, quando a foto já ocupa a tela */}
      <div data-c-end className="absolute inset-x-5 bottom-10 flex items-end justify-between text-ivory md:inset-x-10 lg:bottom-12">
        <p className="display max-w-[14ch] text-[clamp(2.2rem,4.6vw,4.4rem)]">Um ambiente pensado para desacelerar.</p>
        <p className="eyebrow hidden opacity-80 md:block">Ivoire · Setor Marista</p>
      </div>
    </section>
  );
}
