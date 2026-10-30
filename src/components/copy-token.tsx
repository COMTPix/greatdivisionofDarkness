"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyToken({ token }: { token: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(token);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 transition-colors hover:text-cyan-200"
      aria-label="Скопировать токен"
    >
      {copied ? <Check className="size-3.5 text-emerald-300" /> : <Copy className="size-3.5" />}
      {copied ? "Скопировано" : "Скопировать ID"}
    </button>
  );
}
