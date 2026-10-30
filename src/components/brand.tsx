import Link from "next/link";
import { Hexagon, Zap } from "lucide-react";

type BrandProps = {
  compact?: boolean;
};

export function Brand({ compact = false }: BrandProps) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3" aria-label="Контур 18 — на главную">
      <span className="relative grid size-10 place-items-center text-cyan-300">
        <Hexagon className="absolute size-10 stroke-[1.4] transition-transform duration-500 group-hover:rotate-30" />
        <Zap className="size-4 fill-cyan-300 stroke-[2.2]" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[15px] font-semibold tracking-[0.18em] text-white">
            КОНТУР <b className="text-cyan-300">18</b>
          </span>
          <span className="mt-1 text-[8px] font-medium uppercase tracking-[0.34em] text-slate-500">
            цифровой пропуск
          </span>
        </span>
      )}
    </Link>
  );
}
