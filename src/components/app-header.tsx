import Link from "next/link";
import { CircleHelp, LogOut } from "lucide-react";
import { logoutUser } from "@/app/actions";
import { Brand } from "./brand";

export function AppHeader() {
  return (
    <header className="relative z-20 border-b border-white/[0.06] bg-[#030812]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] w-full max-w-[1240px] items-center justify-between px-5 sm:px-8">
        <Brand />
        <div className="flex items-center gap-2 sm:gap-5">
          <Link
            href="/dashboard#help"
            className="hidden items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white sm:inline-flex"
          >
            <CircleHelp className="size-4" />
            Поддержка
          </Link>
          <span className="hidden h-5 w-px bg-white/10 sm:block" />
          <form action={logoutUser}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-white"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Выйти</span>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
