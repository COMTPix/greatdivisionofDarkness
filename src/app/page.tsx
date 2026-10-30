import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  AtSign,
  BadgeCheck,
  Fingerprint,
  LockKeyhole,
  QrCode,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { loginUser, registerUser } from "./actions";
import { Brand } from "@/components/brand";
import { SubmitButton } from "@/components/submit-button";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

const errors: Record<string, string> = {
  "invalid-login": "Логин должен содержать 3–32 буквы или цифры. Допустимы ., _ и -.",
  "invalid-name": "Укажите фамилию и имя полностью.",
  consent: "Для регистрации необходимо принять условия обработки данных.",
  "login-taken": "Такой логин уже существует. Войдите в созданный профиль.",
  "registration-failed": "Не удалось создать профиль. Попробуйте ещё раз.",
  "login-required": "Введите логин, указанный при регистрации.",
  "user-not-found": "Профиль с таким логином не найден.",
};

type HomeProps = {
  searchParams: Promise<{ mode?: string; error?: string }>;
};

export default async function HomePage({ searchParams }: HomeProps) {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  const params = await searchParams;
  const mode = params.mode === "login" ? "login" : "register";
  const errorMessage = params.error ? errors[params.error] : null;

  return (
    <main className="site-shell flex min-h-screen flex-col">
      <header className="relative z-10 mx-auto flex w-full max-w-[1240px] items-center justify-between px-5 py-6 sm:px-8 lg:py-8">
        <Brand />
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.06] px-3 py-1.5 text-[11px] font-medium text-emerald-200/80">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-50" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-300" />
          </span>
          Система работает
        </div>
      </header>

      <div className="relative z-10 mx-auto grid w-full max-w-[1240px] flex-1 items-center gap-12 px-5 pb-12 pt-6 sm:px-8 lg:grid-cols-[1.08fr_0.82fr] lg:gap-20 lg:pb-20 lg:pt-10">
        <section className="page-enter max-w-[690px]">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200">
            <Sparkles className="size-3.5" />
            Проект «Инженеры будущего»
          </div>

          <h1 className="font-display max-w-[670px] text-[clamp(2.75rem,6vw,5.6rem)] font-semibold leading-[0.97] tracking-[-0.055em] text-white">
            Твой возраст —
            <span className="mt-2 block bg-gradient-to-r from-cyan-200 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              твои возможности.
            </span>
          </h1>

          <p className="mt-7 max-w-[590px] text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
            Единый цифровой пропуск для безопасного подтверждения 18+. Один раз пройдите проверку — и используйте постоянный QR-код без документов.
          </p>

          <div className="mt-10 grid max-w-[610px] gap-3 sm:grid-cols-3">
            <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-colors hover:border-cyan-300/20 hover:bg-cyan-300/[0.035]">
              <div className="mb-3 grid size-9 place-items-center rounded-xl bg-cyan-300/10 text-cyan-300">
                <Fingerprint className="size-[19px]" />
              </div>
              <p className="text-sm font-semibold text-slate-100">Проверка один раз</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">Через Госуслуги</p>
            </div>
            <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-colors hover:border-cyan-300/20 hover:bg-cyan-300/[0.035]">
              <div className="mb-3 grid size-9 place-items-center rounded-xl bg-blue-400/10 text-blue-300">
                <QrCode className="size-[19px]" />
              </div>
              <p className="text-sm font-semibold text-slate-100">Постоянный QR</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">Всегда под рукой</p>
            </div>
            <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-colors hover:border-cyan-300/20 hover:bg-cyan-300/[0.035]">
              <div className="mb-3 grid size-9 place-items-center rounded-xl bg-violet-400/10 text-violet-300">
                <ShieldCheck className="size-[19px]" />
              </div>
              <p className="text-sm font-semibold text-slate-100">Только минимум</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">Без передачи ФИО</p>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3 text-xs text-slate-600">
            <LockKeyhole className="size-3.5" />
            <span>Защищённая серверная сессия · Данные не передаются третьим лицам</span>
          </div>
        </section>

        <section className="page-enter relative mx-auto w-full max-w-[490px] lg:mx-0 lg:justify-self-end">
          <div className="absolute -inset-12 -z-10 rounded-full bg-cyan-400/[0.055] blur-3xl" />
          <div className="glass-panel overflow-hidden rounded-[26px]">
            <div className="border-b border-white/[0.07] px-6 pt-6 sm:px-8 sm:pt-8">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
                    Безопасный доступ
                  </p>
                  <h2 className="font-display mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">
                    {mode === "login" ? "С возвращением" : "Создать профиль"}
                  </h2>
                </div>
                <div className="grid size-11 shrink-0 place-items-center rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.07] text-cyan-300">
                  {mode === "login" ? <Fingerprint className="size-5" /> : <BadgeCheck className="size-5" />}
                </div>
              </div>

              <nav className="grid grid-cols-2 gap-1 rounded-xl bg-black/20 p-1" aria-label="Выбор формы">
                <Link
                  href="/"
                  className={`rounded-lg px-3 py-2.5 text-center text-sm font-medium transition-all ${
                    mode === "register"
                      ? "bg-white/[0.08] text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  Регистрация
                </Link>
                <Link
                  href="/?mode=login"
                  className={`rounded-lg px-3 py-2.5 text-center text-sm font-medium transition-all ${
                    mode === "login"
                      ? "bg-white/[0.08] text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  Войти
                </Link>
              </nav>
            </div>

            <div className="p-6 sm:p-8">
              {errorMessage && (
                <div className="mb-5 rounded-xl border border-rose-400/20 bg-rose-400/[0.07] px-4 py-3 text-sm leading-5 text-rose-200" role="alert">
                  {errorMessage}
                </div>
              )}

              {mode === "register" ? (
                <form action={registerUser} className="space-y-5">
                  <div>
                    <label htmlFor="fullName" className="mb-2 block text-xs font-medium text-slate-300">
                      Фамилия и имя
                    </label>
                    <div className="relative">
                      <UserRound className="pointer-events-none absolute left-4 top-1/2 size-[17px] -translate-y-1/2 text-slate-600" />
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        minLength={5}
                        maxLength={160}
                        autoComplete="name"
                        placeholder="Иванов Иван"
                        className="field pl-11 pr-4 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="login" className="mb-2 block text-xs font-medium text-slate-300">
                      Придумайте логин
                    </label>
                    <div className="relative">
                      <AtSign className="pointer-events-none absolute left-4 top-1/2 size-[17px] -translate-y-1/2 text-slate-600" />
                      <input
                        id="login"
                        name="login"
                        type="text"
                        required
                        minLength={3}
                        maxLength={32}
                        autoComplete="username"
                        placeholder="future_engineer"
                        className="field pl-11 pr-4 text-sm"
                      />
                    </div>
                    <p className="mt-2 text-[11px] text-slate-600">От 3 символов: буквы, цифры, точка, _ или -</p>
                  </div>

                  <label className="flex cursor-pointer items-start gap-3 text-xs leading-5 text-slate-500">
                    <input
                      name="consent"
                      type="checkbox"
                      required
                      className="mt-0.5 size-4 shrink-0 accent-cyan-300"
                    />
                    <span>
                      Я принимаю условия обработки данных и правила использования учебного сервиса
                    </span>
                  </label>

                  <SubmitButton pendingLabel="Создаём профиль…" className="w-full">
                    Создать цифровой профиль
                    <ArrowRight className="size-4" />
                  </SubmitButton>
                </form>
              ) : (
                <form action={loginUser} className="space-y-5">
                  <div>
                    <label htmlFor="login" className="mb-2 block text-xs font-medium text-slate-300">
                      Ваш логин
                    </label>
                    <div className="relative">
                      <AtSign className="pointer-events-none absolute left-4 top-1/2 size-[17px] -translate-y-1/2 text-slate-600" />
                      <input
                        id="login"
                        name="login"
                        type="text"
                        required
                        autoFocus
                        autoComplete="username"
                        placeholder="future_engineer"
                        className="field pl-11 pr-4 text-sm"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-blue-300/10 bg-blue-300/[0.04] px-4 py-3 text-xs leading-5 text-slate-500">
                    В конкурсном прототипе пароль не требуется — используйте логин, заданный при регистрации.
                  </div>

                  <SubmitButton pendingLabel="Входим…" className="w-full">
                    Открыть личный кабинет
                    <ArrowRight className="size-4" />
                  </SubmitButton>
                </form>
              )}
            </div>
          </div>
          <p className="mt-5 text-center text-[11px] leading-5 text-slate-600">
            Нажимая кнопку, вы используете демонстрационную среду проекта
          </p>
        </section>
      </div>
    </main>
  );
}
