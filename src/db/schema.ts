import {pgTable , uuid , varchar , text , timestamp , boolean} from "drizzle-orm/pg-core"


export const userTable = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),

    firstName: varchar("first_name", {length: 50}).notNull(),
    lastName: varchar("last_name", {length: 50}),

    email: varchar("email", {length: 322}).notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),

    password: varchar("password", {length: 66}).notNull(),
    salt:text("salt"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
})
