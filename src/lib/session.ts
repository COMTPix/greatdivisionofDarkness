import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cache } from "react";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";

const SESSION_COOKIE = "future_engineer_session";
const SESSION_LIFETIME = 60 * 60 * 24 * 30;

function getSigningKey() {
  const key = process.env.AUTH_SECRET?.trim() || process.env.DATABASE_URL;

  if (!key) {
    throw new Error("Для работы сессий требуется AUTH_SECRET или DATABASE_URL");
  }

  return key;
}

function signature(value: string) {
  return createHmac("sha256", getSigningKey()).update(value).digest("hex");
}

function verifySession(rawValue: string | undefined) {
  if (!rawValue) return null;

  const [userId, receivedSignature] = rawValue.split(".");
  if (!userId || !receivedSignature || !/^\d+$/.test(userId)) return null;

  const expectedSignature = signature(userId);
  const expected = Buffer.from(expectedSignature, "utf8");
  const received = Buffer.from(receivedSignature, "utf8");

  if (expected.length !== received.length || !timingSafeEqual(expected, received)) {
    return null;
  }

  return Number(userId);
}

export async function createSession(userId: number) {
  const cookieStore = await cookies();
  const value = String(userId);

  cookieStore.set(SESSION_COOKIE, `${value}.${signature(value)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_LIFETIME,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export const getCurrentUser = cache(async () => {
  const cookieStore = await cookies();
  const userId = verifySession(cookieStore.get(SESSION_COOKIE)?.value);

  if (!userId) return null;

  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  return user ?? null;
});
