import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  QrCode,
  ScanLine,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  WalletCards,
} from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { CopyToken } from "@/components/copy-token";
import { UserQr } from "@/components/user-qr";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

function initials(fullName: string) {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function greetingName(fullName: string) {
  const parts = fullName.split(" ").filter(Boolean);
  return parts[1] ?? parts[0] ?? "инженер";
}

type DashboardProps = {
  searchParams: Promise<{ welcome?: string; verified?: string }>;
};

export default async function DashboardPage({ searchParams }: DashboardProps) {
  const user = await getCurrentUser();
  if (!user) redirect("/?mode=login");

  const params = await searchParams;
  const balance = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
  }).format(Number(user.balance));
  const createdAt = new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(user.createdAt);

  return (
    <div className="site-shell dashboard-grid min-h-screen">
      <AppHeader />
      <main className="relative z-10 mx-auto w-full max-w-[1240px] px-5 pb-14 pt-8 sm:px-8 sm:pt-12">
        {(params.welcome === "1" || params.verified === "1") && (
          <div className="page-enter mb-7 flex items-start gap-3 rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.07] px-4 py-3.5 text-sm text-emerald-100 sm:items-center">
            <div className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-emerald-300/15 sm:mt-0">
              <Check className="size-3.5" />
            </div>
            <p>
              {params.verified === "1"
                ? "Возраст успешно подтверждён. Ваш постоянный QR-пропуск уже активен."
                : "Профиль создан. Остался один шаг — подтвердить возраст через Госуслуги."}
            </p>
          </div>
        )}

        <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300/75">
              Личный кабинет
            </p>
            <h1 className="font-display text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Добрый день, {greetingName(user.fullName)}!
            </h1>
            <p className="mt-2 text-sm text-slate-500">Ваш цифровой профиль и пропуск 18+</p>
          </div>
          <div
            className={`inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium ${
              user.ageVerified
                ? "border-emerald-300/15 bg-emerald-300/[0.07] text-emerald-200"
                : "border-amber-300/15 bg-amber-300/[0.06] text-amber-200"
            }`}
          >
            <span className={`size-2 rounded-full ${user.ageVerified ? "bg-emerald-300" : "bg-amber-300 pulse-soft"}`} />
            {user.ageVerified ? "Профиль подтверждён" : "Требуется проверка"}
          </div>
        </section>

        <section className="mb-5 grid gap-4 md:grid-cols-3">
          <div className="glass-panel rounded-2xl p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">Баланс</p>
                <p className="font-display mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">{balance}</p>
              </div>
              <div className="grid size-10 place-items-center rounded-xl bg-cyan-300/[0.08] text-cyan-300">
                <WalletCards className="size-[19px]" />
              </div>
            </div>
            <p className="mt-4 text-[11px] text-slate-600">Учебные средства проекта</p>
          </div>

          <div className="glass-panel rounded-2xl p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">Возрастной статус</p>
                <p className="font-display mt-2 text-lg font-semibold text-white">
                  {user.ageVerified ? "18+ подтверждено" : "Не подтверждено"}
                </p>
              </div>
              <div className={`grid size-10 place-items-center rounded-xl ${user.ageVerified ? "bg-emerald-300/[0.08] text-emerald-300" : "bg-amber-300/[0.08] text-amber-300"}`}>
                <UserRoundCheck className="size-[19px]" />
              </div>
            </div>
            <p className="mt-4 text-[11px] text-slate-600">Источник: ЕСИА / Госуслуги</p>
          </div>

          <div className="glass-panel rounded-2xl p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">Цифровой ID</p>
                <p className="mt-2 font-mono text-lg font-semibold tracking-[0.05em] text-white">
                  {user.qrToken.slice(0, 8).toUpperCase()}
                </p>
              </div>
              <div className="grid size-10 place-items-center rounded-xl bg-blue-400/[0.08] text-blue-300">
                <Fingerprint className="size-[19px]" />
              </div>
            </div>
            <div className="mt-4">
              <CopyToken token={user.qrToken} />
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.52fr_0.8fr]">
          <article className="glass-panel relative min-h-[490px] overflow-hidden rounded-[26px]">
            <div className="absolute right-0 top-0 size-64 rounded-full bg-cyan-400/[0.045] blur-3xl" />
            <div className="relative border-b border-white/[0.07] px-6 py-5 sm:px-7">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl border border-cyan-300/15 bg-cyan-300/[0.06] text-cyan-300">
                    <QrCode className="size-[19px]" />
                  </div>
                  <div>
                    <h2 className="font-display text-base font-semibold text-white">Цифровой пропуск</h2>
                    <p className="mt-0.5 text-xs text-slate-500">Постоянный персональный QR-код</p>
                  </div>
                </div>
                {user.ageVerified && (
                  <span className="hidden items-center gap-1.5 rounded-full bg-emerald-300/[0.08] px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-200 sm:inline-flex">
                    <BadgeCheck className="size-3.5" /> Активен
                  </span>
                )}
              </div>
            </div>

            {user.ageVerified ? (
              <div className="relative grid items-center gap-8 px-6 py-8 sm:px-8 md:grid-cols-[310px_1fr] md:py-10">
                <div className="relative mx-auto w-full max-w-[286px]">
                  <UserQr token={user.qrToken} name={user.fullName} />
                  <div className="scan-line pointer-events-none absolute left-5 right-5 top-3 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_12px_#67e8f9]" />
                </div>
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-emerald-300/15 bg-emerald-300/[0.06] px-3 py-2 text-xs font-medium text-emerald-200">
                    <ShieldCheck className="size-4" /> Проверен и готов к использованию
                  </div>
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.035em] text-white">
                    Покажите код для проверки 18+
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    При сканировании сервис подтверждает только возрастной статус. ФИО, дата рождения и другие данные не раскрываются.
                  </p>
                  <div className="mt-6 flex items-center gap-3 border-t border-white/[0.07] pt-5">
                    <ScanLine className="size-4 text-cyan-300" />
                    <p className="text-xs text-slate-500">Код бессрочный и привязан к вашему профилю</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative flex min-h-[390px] flex-col items-center justify-center px-6 py-10 text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full bg-cyan-300/10 blur-2xl" />
                  <div className="relative grid size-20 place-items-center rounded-[24px] border border-white/10 bg-white/[0.035] text-slate-400">
                    <LockKeyhole className="size-8" />
                  </div>
                </div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-200/70">QR пока недоступен</p>
                <h3 className="font-display mt-3 max-w-md text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">
                  Подтвердите возраст, чтобы активировать пропуск
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-6 text-slate-500">
                  Безопасная демонстрационная проверка займёт меньше минуты. Документы загружать не нужно.
                </p>
                <Link
                  href="/gosuslugi"
                  className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-cyan-300 px-6 text-sm font-semibold text-slate-950 shadow-[0_0_32px_rgba(34,211,238,0.18)] transition-all hover:bg-cyan-200 hover:shadow-[0_0_40px_rgba(34,211,238,0.28)]"
                >
                  Подтвердить через Госуслуги
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            )}
          </article>

          <aside className="space-y-5">
            <article className="glass-panel rounded-[26px] p-6">
              <div className="flex items-center gap-4 border-b border-white/[0.07] pb-5">
                <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 to-blue-600 font-display text-lg font-bold text-slate-950 shadow-[0_0_25px_rgba(34,211,238,0.14)]">
                  {initials(user.fullName)}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-display text-base font-semibold text-white">{user.fullName}</p>
                  <p className="mt-1 truncate text-xs text-slate-500">@{user.login}</p>
                </div>
              </div>
              <dl className="mt-5 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <dt className="flex items-center gap-2 text-xs text-slate-500"><KeyRound className="size-3.5" /> ID профиля</dt>
                  <dd className="font-mono text-xs text-slate-300">#{String(user.id).padStart(6, "0")}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="flex items-center gap-2 text-xs text-slate-500"><CalendarDays className="size-3.5" /> Создан</dt>
                  <dd className="text-xs text-slate-300">{createdAt}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="flex items-center gap-2 text-xs text-slate-500"><ShieldCheck className="size-3.5" /> Защита</dt>
                  <dd className="text-xs text-emerald-300">Активна</dd>
                </div>
              </dl>
            </article>

            <article className="rounded-[22px] border border-blue-300/10 bg-gradient-to-br from-blue-500/[0.09] to-cyan-300/[0.035] p-5">
              <div className="flex items-start gap-3">
                <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-blue-400/10 text-blue-300">
                  <Sparkles className="size-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-100">Приватность по умолчанию</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    QR содержит только случайный идентификатор. Персональные данные не зашиты в изображение.
                  </p>
                </div>
              </div>
            </article>

            <a
              id="help"
              href="mailto:support@kontur18.local"
              className="group flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 py-4 transition-colors hover:border-white/[0.12] hover:bg-white/[0.04]"
            >
              <span className="flex items-center gap-3 text-sm text-slate-400">
                <CircleHelp className="size-4 text-slate-500" /> Нужна помощь?
              </span>
              <ChevronRight className="size-4 text-slate-600 transition-transform group-hover:translate-x-0.5 group-hover:text-cyan-300" />
            </a>
          </aside>
        </section>

        <footer className="mt-10 flex flex-col gap-2 border-t border-white/[0.06] pt-6 text-[10px] uppercase tracking-[0.17em] text-slate-700 sm:flex-row sm:items-center sm:justify-between">
          <span>Контур 18 · Конкурс «Инженеры будущего»</span>
          <span>Демонстрационная среда · v1.0</span>
        </footer>
      </main>
    </div>
  );
}
