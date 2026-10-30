"use server";

import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { users } from "@/db/schema";
import {
  createSession,
  destroySession,
  getCurrentUser,
} from "@/lib/session";

const LOGIN_PATTERN = /^[\p{L}\p{N}._-]+$/u;

function field(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function normalizedLogin(value: string) {
  return value.toLocaleLowerCase("ru-RU");
}

export async function registerUser(formData: FormData) {
  const login = normalizedLogin(field(formData, "login"));
  const fullName = field(formData, "fullName").replace(/\s+/g, " ");
  const consent = formData.get("consent") === "on";

  if (login.length < 3 || login.length > 32 || !LOGIN_PATTERN.test(login)) {
    redirect("/?error=invalid-login");
  }

  if (fullName.length < 5 || fullName.length > 160 || !fullName.includes(" ")) {
    redirect("/?error=invalid-name");
  }

  if (!consent) {
    redirect("/?error=consent");
  }

  const [existingUser] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.login, login))
    .limit(1);

  if (existingUser) {
    redirect("/?mode=login&error=login-taken");
  }

  let createdUser: { id: number } | undefined;

  try {
    [createdUser] = await db
      .insert(users)
      .values({
        login,
        fullName,
        qrToken: randomUUID(),
      })
      .returning({ id: users.id });
  } catch (error) {
    const databaseError = error as { code?: string };
    if (databaseError.code === "23505") {
      redirect("/?mode=login&error=login-taken");
    }
    throw error;
  }

  if (!createdUser) {
    redirect("/?error=registration-failed");
  }

  await createSession(createdUser.id);
  redirect("/dashboard?welcome=1");
}

export async function loginUser(formData: FormData) {
  const login = normalizedLogin(field(formData, "login"));

  if (!login) {
    redirect("/?mode=login&error=login-required");
  }

  const [user] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.login, login))
    .limit(1);

  if (!user) {
    redirect("/?mode=login&error=user-not-found");
  }

  await createSession(user.id);
  redirect("/dashboard");
}

export async function logoutUser() {
  await destroySession();
  redirect("/");
}

export async function verifyAge() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/?mode=login");
  }

  if (!user.ageVerified) {
    await db
      .update(users)
      .set({ ageVerified: true })
      .where(eq(users.id, user.id));
  }

  revalidatePath("/dashboard");
  revalidatePath("/gosuslugi");
  redirect("/dashboard?verified=1");
}
