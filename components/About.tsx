"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { Lines } from "./ui";

const stats = [
  { v: 12, prefix: "+", suffix: "", label: "anos de experiência" },
  { v: 18, prefix: "+", suffix: " mil", label: "procedimentos realizados" },
  { v: 6, prefix: "+", suffix: " mil", label: "clientes atendidas" },
];

/** Cena 07 — confiança. Quem cuida, e onde. */
export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo("[data-a-frame]", { clipPath: "inset(100% 0% 0% 0%)" }, {
          clipPath: "inset(0% 0% 0% 0%)", duration: 1.8, ease: "expo.inOut",
          scrollTrigger: { trigger: "[data-a-frame]", start: "top 80%" },
        });
        gsap.fromTo("[data-a-img]", { scale: 1.2, yPercent: -5 }, {
          scale: 1.02, yPercent: 5, ease: "none",
          scrollTrigger: { trigger: "[data-a-frame]", start: "top bottom", end: "bottom top", scrub: true },
        });
        gsap.from("[data-line]", {
          yPercent: 115, stagger: 0.1, duration: 1.4,
          scrollTrigger: { trigger: "[data-a-copy]", start: "top 80%" },
        });
        gsap.fromTo("[data-a-small]", { yPercent: 20 }, {
          yPercent: -20, ease: "none",
          scrollTrigger: { trigger: "[data-a-small]", start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      // Contadores: rodam uma vez quando entram na tela (também com motion reduzido, sem duração)
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end, duration: reduce ? 0 : 2.4, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => (el.textContent = String(Math.round(obj.v))),
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="sobre" ref={root} className="relative bg-ivory-2/60 px-5 py-[16vh] md:px-10 lg:py-[22vh]">
      <div className="grid grid-cols-12 gap-x-8 gap-y-14">
        <div className="col-span-12 md:col-span-6 lg:col-span-5">
          <div data-a-frame className="relative aspect-[3/4] overflow-hidden">
            <div data-a-img className="absolute inset-0 will-change-transform">
              <Image src="/img/profissional.webp" alt="Dra. Helena Duarte, diretora clínica, em uniforme branco na clínica" fill sizes="(min-width:768px) 42vw, 100vw" className="object-cover object-[50%_25%]" />
            </div>
          </div>
          <p className="eyebrow mt-4 flex justify-between text-ink/45">
            <span>Dra. Helena Duarte</span>
            <span>Diretora clínica</span>
          </p>
        </div>

        <div data-a-copy className="col-span-12 flex flex-col md:col-span-6 lg:col-span-6 lg:col-start-7 lg:pt-[12vh]">
          <p className="eyebrow mb-10 flex items-center gap-4 text-ink/50">
            <span className="h-px w-10 bg-ink/30" /> Sobre a Ivoire
          </p>
          <h2 className="display text-[clamp(2.7rem,9.5vw,4rem)] lg:text-[clamp(3.75rem,5.2vw,6rem)]">
            <Lines lines={["Seu cuidado começa", <em key="i" className="italic">antes do tratamento.</em>]} />
          </h2>
          <p className="mt-10 max-w-[44ch] text-[1rem] leading-relaxed text-ink-soft">
            A Ivoire nasceu de uma convicção simples: estética de alto padrão é, antes de tudo, escuta. Toda jornada começa com uma
            avaliação sem pressa, um diagnóstico honesto e um plano que pode — e às vezes deve — dizer não.
          </p>

          <dl className="mt-14 grid grid-cols-3 gap-4 border-t border-ink/12 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dd className="display whitespace-nowrap text-[clamp(2.2rem,7vw,4.25rem)] leading-none">
                  {s.prefix}
                  <span data-count={s.v}>{s.v}</span>
                  <span className="text-[0.5em] italic">{s.suffix}</span>
                </dd>
                <dt className="mt-3 text-[0.8125rem] leading-snug text-ink-soft">{s.label}</dt>
              </div>
            ))}
          </dl>

          <div data-a-small className="relative mt-16 aspect-[16/10] w-[78%] self-end overflow-hidden lg:mt-24 lg:w-[70%]">
            <Image src="/img/recepcao.webp" alt="Recepção da clínica em mármore claro com luz natural" fill sizes="(min-width:1024px) 30vw, 70vw" className="object-cover" />
          </div>
          <p className="eyebrow mt-4 self-end text-ink/45">Nossa casa · Setor Marista, Goiânia</p>
        </div>
      </div>
    </section>
  );
}
