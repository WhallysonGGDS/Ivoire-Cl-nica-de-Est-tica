"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { Cta, Lines, TextLink } from "./ui";

/**
 * Cena 01 — Impacto.
 * Abre num véu de luz; a fotografia é revelada por uma cortina que sobe,
 * o título emerge linha a linha. No scroll a foto se aproxima levemente e o texto se afasta.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from("[data-veil]", { scale: 1.18, duration: 2.6, ease: "power2.out" }, 0)
          .fromTo("[data-frame]", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.9, ease: "expo.inOut" }, 0.25)
          .from("[data-photo]", { scale: 1.3, duration: 2.6 }, 0.25)
          .from("[data-line]", { yPercent: 115, stagger: 0.09, duration: 1.5 }, 1.05)
          .from("[data-fade]", { autoAlpha: 0, y: 18, stagger: 0.08, duration: 1.3 }, 1.4);

        gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        })
          .to("[data-par]", { scale: 1.1, yPercent: 8, ease: "none" }, 0)
          .to("[data-copy]", { yPercent: -18, autoAlpha: 0, ease: "none" }, 0);
      });
    },
    { scope: root },
  );

  return (
    <section id="top" ref={root} className="relative h-[100svh] min-h-[640px] overflow-hidden">
      {/* Véu de luz: primeiro frame da página, permanece como atmosfera */}
      <div data-veil className="absolute inset-0 opacity-70">
        <Image src="/img/veu.webp" alt="" fill priority sizes="100vw" className="object-cover" />
      </div>

      {/* Fotografia principal — no mobile vira um plano inferior, no desktop ocupa a tela */}
      <div data-frame className="absolute inset-x-0 bottom-0 h-[54svh] overflow-hidden lg:inset-0 lg:h-auto">
        <div data-par className="absolute inset-0 will-change-transform">
        <div data-photo className="absolute inset-0">
          <Image
            src="/img/hero.webp"
            alt="Mulher de olhos fechados, relaxada em uma poltrona de tratamento em uma sala clara"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[72%_50%] lg:object-[60%_50%]"
          />
        </div>
        </div>
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(243,238,231,.78)_0%,rgba(243,238,231,.35)_38%,rgba(243,238,231,0)_60%)] lg:block" />
      </div>

      <div data-copy className="relative flex h-[46svh] flex-col justify-end px-5 pb-8 md:px-10 lg:h-full lg:justify-center lg:pb-0 lg:pt-10">
        <p data-fade className="eyebrow mb-6 text-ink/55 lg:mb-8">Clínica de estética avançada</p>
        <h1 className="display text-[clamp(3.4rem,13vw,5rem)] lg:text-[clamp(5rem,8.6vw,9.5rem)]">
          <Lines lines={["Beleza feita", <em key="i" className="italic">para você.</em>]} />
        </h1>
        <p data-fade className="mt-5 max-w-[36ch] text-[0.9375rem] leading-relaxed text-ink-soft lg:mt-9 lg:text-[1.0625rem]">
          Tratamentos personalizados para realçar sua beleza com precisão, cuidado e naturalidade.
        </p>
        <div data-fade className="mt-10 hidden items-center gap-9 lg:flex">
          <Cta>Agendar avaliação</Cta>
          <TextLink href="#tratamentos">Conhecer tratamentos</TextLink>
        </div>
      </div>

      {/* Rodapé do hero */}
      <div className="absolute inset-x-0 bottom-0 hidden items-end justify-between px-10 pb-9 lg:flex">
        <p data-fade className="eyebrow text-ink/50">Goiânia · desde 2014</p>
        <a data-fade href="#manifesto" className="eyebrow flex items-center gap-4 text-ink/70">
          Role para descobrir
          <span className="relative block h-10 w-px overflow-hidden bg-ink/15">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollhint_2.4s_cubic-bezier(.16,1,.3,1)_infinite] bg-ink" />
          </span>
        </a>
      </div>

      {/* CTA flutuante no mobile, ancorado sobre a foto */}
      <div data-fade className="absolute inset-x-5 bottom-5 flex items-center justify-between lg:hidden">
        <Cta>Agendar avaliação</Cta>
        <a href="#tratamentos" className="eyebrow rounded-full bg-ivory/80 px-4 py-3 text-ink backdrop-blur-md">Tratamentos</a>
      </div>
    </section>
  );
}
