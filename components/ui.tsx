import type { ReactNode } from "react";
import { WHATSAPP } from "@/lib/data";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`display text-[1.65rem] leading-none tracking-[-0.01em] ${className}`}>
      Ivoire<span className="text-champagne">.</span>
    </span>
  );
}

/** Divide um texto em linhas mascaradas para reveal (cada linha sobe de dentro da sua máscara). */
export function Lines({ lines, className = "" }: { lines: ReactNode[]; className?: string }) {
  return (
    <>
      {lines.map((l, i) => (
        <span key={i} className={`line-mask ${className}`}>
          <span data-line>{l}</span>
        </span>
      ))}
    </>
  );
}

type CtaProps = {
  children: ReactNode;
  href?: string;
  tone?: "ink" | "ivory";
  size?: "sm" | "md";
  className?: string;
};

/**
 * CTA principal: o círculo da seta cresce e preenche o botão no hover.
 * Por padrão leva ao WhatsApp — o próximo passo real do paciente.
 */
export function Cta({ children, href = WHATSAPP, tone = "ink", size = "md", className = "" }: CtaProps) {
  const external = href.startsWith("http");
  const base =
    tone === "ink" ? "bg-ink text-ivory [--fill:var(--color-ivory)] hover:text-ink" : "bg-ivory text-ink [--fill:var(--color-ink)] hover:text-ivory";
  const pad = size === "sm" ? "h-10 pl-5 pr-1.5 text-[0.8125rem]" : "h-14 pl-7 pr-2 text-[0.9375rem]";
  const dot = size === "sm" ? "size-7" : "size-10";

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative isolate inline-flex items-center gap-4 overflow-hidden rounded-full font-medium tracking-[-0.005em] transition-colors duration-700 ease-lux ${base} ${pad} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <span className={`relative grid ${dot} place-items-center`}>
        <span className="absolute inset-0 -z-0 rounded-full bg-[var(--fill)] transition-transform duration-700 ease-lux group-hover:scale-[14]" />
        <svg viewBox="0 0 16 16" className={`relative z-10 size-3.5 transition-transform duration-700 ease-lux group-hover:translate-x-0.5 ${tone === "ink" ? "text-ink" : "text-ivory"} group-hover:text-current`} fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M2 8h11M9 4l4 4-4 4" />
        </svg>
      </span>
    </a>
  );
}

export function TextLink({ children, href, light = false }: { children: ReactNode; href: string; light?: boolean }) {
  return (
    <a href={href} className={`group inline-flex items-center gap-3 text-[0.9375rem] font-medium ${light ? "text-ivory" : "text-ink"}`}>
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-100 bg-current opacity-40 transition-transform duration-700 ease-lux group-hover:origin-left group-hover:scale-x-0" />
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform delay-150 duration-700 ease-lux group-hover:scale-x-100" />
      </span>
    </a>
  );
}
