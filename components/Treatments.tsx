"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { treatments } from "@/lib/data";

/**
 * Cena 03 — Proposta. Um editorial vertical: a seção fica fixa e cada tratamento
 * assume a tela — a nova fotografia sobe por uma máscara enquanto a anterior se afasta.
 * No mobile, vira uma sequência de capítulos com reveal individual (sem pin).
 */
export default function Treatments() {
  const root = useRef<HTMLElement>(null);
  const total = treatments.length;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.desktop, () => {
        const imgs = gsap.utils.toArray<HTMLElement>("[data-t-img]");
        const inner = gsap.utils.toArray<HTMLElement>("[data-t-inner]");
        const texts = gsap.utils.toArray<HTMLElement>("[data-t-text]");

        gsap.set(imgs.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(texts.slice(1), { autoAlpha: 0, y: 40 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: "[data-t-stage]",
            start: "top top",
            end: () => `+=${window.innerHeight * (total - 1) * 1.1}`,
            pin: true,
            scrub: 1,
            snap: { snapTo: "labelsDirectional", duration: { min: 0.4, max: 1 }, delay: 0.08, ease: "power2.inOut" },
          },
        });

        tl.addLabel("t0");
        for (let i = 1; i < total; i++) {
          const at = `t${i - 1}+=0.15`;
          tl.to(imgs[i], { clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, at)
            .fromTo(inner[i], { scale: 1.08, yPercent: 8 }, { scale: 1, yPercent: 0, duration: 1 }, at)
            .to(inner[i - 1], { yPercent: -10, scale: 1.04, duration: 1 }, at)
            .to(texts[i - 1], { autoAlpha: 0, y: -40, duration: 0.45 }, at)
            .to(texts[i], { autoAlpha: 1, y: 0, duration: 0.55 }, `${at}+=0.45`)
            .to("[data-t-num]", { yPercent: (-100 / total) * i, duration: 1 }, at)
            .to("[data-t-bar]", { scaleX: (i + 1) / total, duration: 1 }, at)
            .addLabel(`t${i}`, "+=0.15");
        }
      });

      mm.add(MQ.mobile, () => {
        gsap.utils.toArray<HTMLElement>("[data-tm]").forEach((el) => {
          const img = el.querySelector("[data-tm-img]");
          const txt = el.querySelectorAll("[data-tm-txt]");
          gsap.fromTo(img, { clipPath: "inset(14% 8% 14% 8%)" }, {
            clipPath: "inset(0% 0% 0% 0%)", ease: "none",
            scrollTrigger: { trigger: el, start: "top 92%", end: "top 30%", scrub: true },
          });
          gsap.fromTo(img!.firstElementChild, { scale: 1.2 }, {
            scale: 1, ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
          gsap.from(txt, { autoAlpha: 0, y: 24, stagger: 0.08, scrollTrigger: { trigger: el, start: "top 45%" } });
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="tratamentos" ref={root} className="relative">
      {/* ---------- Desktop: editorial fixo ---------- */}
      <div data-t-stage className="relative hidden h-screen overflow-hidden lg:grid lg:grid-cols-12 motion-reduce:lg:hidden">
        <div className="relative col-span-5 flex flex-col justify-between px-10 pb-12 pt-32">
          <div className="flex items-center justify-between">
            <p className="eyebrow flex items-center gap-4 text-ink/50">
              <span className="h-px w-10 bg-ink/30" /> Tratamentos
            </p>
            <p className="eyebrow text-ink/40">0{total} protocolos</p>
          </div>

          <div className="relative">
            {/* Número em rolo: só um dígito visível por vez */}
            <div className="h-[clamp(7rem,13vw,13rem)] overflow-hidden">
              <div data-t-num className="display text-[clamp(7rem,13vw,13rem)] leading-none text-champagne/90">
                {treatments.map((t) => (
                  <div key={t.n} className="h-[clamp(7rem,13vw,13rem)]">{t.n}</div>
                ))}
              </div>
            </div>

            <div className="relative mt-8 h-[19rem]">
              {treatments.map((t) => (
                <div key={t.n} data-t-text className="absolute inset-0">
                  <h3 className="display text-[clamp(2.75rem,4.2vw,4.5rem)]">{t.title}</h3>
                  <p className="mt-6 max-w-[38ch] text-[1rem] leading-relaxed text-ink-soft">{t.text}</p>
                  <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                    {t.meta.map((m) => (
                      <li key={m} className="eyebrow flex items-center gap-2 text-ink/55">
                        <span className="size-1 rounded-full bg-champagne" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <span className="eyebrow text-ink/40">01</span>
            <span className="relative h-px flex-1 bg-ink/12">
              <span data-t-bar className="absolute inset-0 origin-left bg-ink" style={{ transform: `scaleX(${1 / total})` }} />
            </span>
            <span className="eyebrow text-ink/40">0{total}</span>
          </div>
        </div>

        <div className="relative col-span-7 h-full overflow-hidden">
          {treatments.map((t, i) => (
            <div key={t.n} data-t-img className="absolute inset-0 overflow-hidden" style={{ zIndex: i }}>
              <div data-t-inner className="absolute inset-0 will-change-transform">
                <Image src={t.img} alt={t.alt} fill sizes="60vw" className="object-cover" style={{ objectPosition: t.pos }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Mobile / tablet: capítulos ---------- */}
      <div className="px-5 pb-12 pt-8 md:px-10 lg:hidden motion-reduce:lg:block">
        <p className="eyebrow mb-10 flex items-center gap-4 text-ink/50">
          <span className="h-px w-10 bg-ink/30" /> Tratamentos
        </p>
        <div className="flex flex-col gap-24">
          {treatments.map((t, i) => (
            <article key={t.n} data-tm className={i % 2 ? "md:pl-[18%]" : "md:pr-[18%]"}>
              <div data-tm-img className="relative aspect-[4/5] overflow-hidden">
                <div className="absolute inset-0">
                  <Image src={t.img} alt={t.alt} fill sizes="(min-width:768px) 80vw, 100vw" className="object-cover" style={{ objectPosition: t.pos }} />
                </div>
              </div>
              <div className="mt-6 flex items-start gap-5">
                <span data-tm-txt className="display text-[3.5rem] leading-[0.8] text-champagne">{t.n}</span>
                <div>
                  <h3 data-tm-txt className="display text-[2.4rem]">{t.title}</h3>
                  <p data-tm-txt className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">{t.text}</p>
                  <p data-tm-txt className="eyebrow mt-5 text-ink/50">{t.meta.join(" · ")}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
