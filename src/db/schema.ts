import {
  boolean,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  login: varchar("login", { length: 32 }).notNull().unique(),
  fullName: varchar("full_name", { length: 160 }).notNull(),
  balance: numeric("balance", { precision: 12, scale: 2 })
    .notNull()
    .default("1500.00"),
  ageVerified: boolean("age_verified").notNull().default(false),
  qrToken: text("qr_token").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type User = typeof users.$inferSelect;
