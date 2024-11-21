import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, varchar, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  image: text("image"),
  password: varchar("password", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
