import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  ExternalLink,
  Fingerprint,
  Info,
  LockKeyhole,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { verifyAge } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Подтверждение возраста",
};

export default async function GosuslugiPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/?mode=login");

  return (
    <main className="site-shell min-h-screen">
      <header className="relative z-20 border-b border-white/[0.07] bg-[#071324]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] w-full max-w-[1120px] items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center font-display text-xl font-semibold tracking-[-0.04em] text-white">
              <span>гос</span><span className="text-[#4a9cff]">услуги</span>
              <span className="ml-2.5 rounded-md border border-amber-300/20 bg-amber-300/[0.08] px-2 py-1 text-[8px] font-bold uppercase tracking-[0.16em] text-amber-200">
                Симулятор
              </span>
            </div>
          </div>
          <div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex">
            <LockKeyhole className="size-3.5 text-emerald-300" />
            Защищённое соединение
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-5 pb-14 pt-6 sm:px-8 sm:pt-9">
        <Link
          href="/dashboard"
          className="mb-7 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4" />
          Вернуться в «Контур 18»
        </Link>

        <div className="grid items-start gap-6 lg:grid-cols-[1fr_330px]">
          <section className="glass-panel page-enter overflow-hidden rounded-[28px]">
            <div className="border-b border-white/[0.07] px-6 py-7 sm:px-9 sm:py-9">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-300/15 bg-blue-400/[0.07] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-200">
                <Fingerprint className="size-3.5" /> ЕСИА · Подтверждение личности
              </div>
              <h1 className="font-display max-w-xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-[2.5rem] sm:leading-[1.12]">
                Подтверждение возраста для «Контур 18»
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
                Сервис запрашивает только результат проверки: исполнилось ли вам 18 лет. Дата рождения и реквизиты документов не передаются.
              </p>
            </div>

            <div className="px-6 py-7 sm:px-9 sm:py-8">
              {user.ageVerified ? (
                <div className="flex min-h-[310px] flex-col items-center justify-center text-center">
                  <div className="mb-5 grid size-20 place-items-center rounded-full border border-emerald-300/20 bg-emerald-300/[0.08] text-emerald-300 shadow-[0_0_50px_rgba(110,231,183,0.1)]">
                    <CheckCircle2 className="size-9" />
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-white">Возраст уже подтверждён</h2>
                  <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                    Повторная проверка не нужна. Цифровой QR-пропуск активирован в вашем кабинете.
                  </p>
                  <Link
                    href="/dashboard"
                    className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#1769e0] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#2579ec]"
                  >
                    Перейти к QR-коду <ArrowRight className="size-4" />
                  </Link>
                </div>
              ) : (
                <>
                  <div className="rounded-2xl border border-white/[0.08] bg-black/15 p-5 sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue-400 to-blue-700 text-sm font-bold text-white">
                          {user.fullName
                            .split(" ")
                            .slice(0, 2)
                            .map((part) => part[0])
                            .join("")
                            .toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{user.fullName}</p>
                          <p className="mt-1 flex items-center gap-1.5 text-xs text-emerald-300">
                            <BadgeCheck className="size-3.5" /> Учётная запись найдена
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <UserRound className="size-3.5" /> Профиль ЕСИА
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Сервис получит
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3.5">
                        <span className="grid size-7 place-items-center rounded-full bg-emerald-300/10 text-emerald-300">
                          <Check className="size-3.5" />
                        </span>
                        <span className="text-sm text-slate-300">Статус «старше 18 лет»</span>
                      </div>
                      <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3.5">
                        <span className="grid size-7 place-items-center rounded-full bg-emerald-300/10 text-emerald-300">
                          <Check className="size-3.5" />
                        </span>
                        <span className="text-sm text-slate-300">Уникальный ответ проверки</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-300/10 bg-blue-300/[0.045] px-4 py-3.5">
                    <Info className="mt-0.5 size-4 shrink-0 text-blue-300" />
                    <p className="text-xs leading-5 text-slate-500">
                      Это конкурсный симулятор интеграции. Он не отправляет запросы на официальный портал и использует только тестовую запись в базе проекта.
                    </p>
                  </div>

                  <form action={verifyAge} className="mt-7">
                    <SubmitButton variant="gosuslugi" pendingLabel="Проверяем данные…" className="w-full sm:w-auto sm:min-w-[270px]">
                      Подтвердить и продолжить
                      <ExternalLink className="size-4" />
                    </SubmitButton>
                  </form>

                  <p className="mt-4 text-[11px] leading-5 text-slate-600">
                    Нажимая кнопку, вы разрешаете передать сервису только результат проверки возраста.
                  </p>
                </>
              )}
            </div>
          </section>

          <aside className="space-y-4">
            <div className="rounded-[22px] border border-emerald-300/10 bg-emerald-300/[0.035] p-5">
              <div className="mb-4 grid size-10 place-items-center rounded-xl bg-emerald-300/10 text-emerald-300">
                <ShieldCheck className="size-5" />
              </div>
              <h2 className="text-sm font-semibold text-white">Безопасный обмен</h2>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                Результат сохраняется в профиле как логический статус. Копии документов не создаются.
              </p>
            </div>

            <div className="rounded-[22px] border border-white/[0.07] bg-white/[0.025] p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">Этапы проверки</p>
              <ol className="mt-5 space-y-5">
                <li className="flex gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-blue-500 text-[10px] font-bold text-white">1</span>
                  <div>
                    <p className="text-xs font-medium text-slate-300">Согласие пользователя</p>
                    <p className="mt-1 text-[11px] text-slate-600">Вы на этом этапе</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full border border-white/10 text-[10px] font-bold text-slate-600">2</span>
                  <div>
                    <p className="text-xs font-medium text-slate-500">Проверка возраста</p>
                    <p className="mt-1 text-[11px] text-slate-700">Автоматически</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full border border-white/10 text-[10px] font-bold text-slate-600">3</span>
                  <div>
                    <p className="text-xs font-medium text-slate-500">Возврат в сервис</p>
                    <p className="mt-1 text-[11px] text-slate-700">QR станет доступен</p>
                  </div>
                </li>
              </ol>
            </div>
          </aside>
        </div>

        <footer className="mt-8 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.16em] text-slate-700">
          <LockKeyhole className="size-3" /> Учебная среда · Не является официальным сайтом Госуслуг
        </footer>
      </div>
    </main>
  );
}
