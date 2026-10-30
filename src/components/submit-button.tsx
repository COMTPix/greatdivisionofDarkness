"use client";

import type { ReactNode } from "react";
import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  children: ReactNode;
  pendingLabel: string;
  className?: string;
  variant?: "primary" | "secondary" | "gosuslugi";
};

const variants = {
  primary:
    "bg-cyan-300 text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.18)] hover:bg-cyan-200 hover:shadow-[0_0_38px_rgba(34,211,238,0.3)]",
  secondary:
    "border border-white/10 bg-white/[0.05] text-white hover:border-cyan-300/30 hover:bg-white/[0.08]",
  gosuslugi:
    "bg-[#1769e0] text-white shadow-[0_16px_40px_rgba(23,105,224,0.22)] hover:bg-[#2579ec] hover:shadow-[0_18px_48px_rgba(23,105,224,0.32)]",
};

export function SubmitButton({
  children,
  pendingLabel,
  className = "",
  variant = "primary",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl px-5 text-sm font-semibold transition-all duration-300 disabled:cursor-wait disabled:opacity-70 ${variants[variant]} ${className}`}
    >
      {pending && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
      {pending ? pendingLabel : children}
    </button>
  );
}
