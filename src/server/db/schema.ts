import { relations, sql } from "drizzle-orm";
import {
  bigint,
  int,
  mysqlEnum,
  mysqlTableCreator,
  index,
  text,
  timestamp,
  primaryKey,
  varchar,
} from "drizzle-orm/mysql-core";
import { type AdapterAccount } from "next-auth/adapters";

export const mysqlTable = mysqlTableCreator((name) => `isk_projektas_${name}`);

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: varchar("image", { length: 255 }),
  accountType: varchar("accountType", { length: 255 }), // student, tutor
  phoneNumber: varchar("phoneNumber", { length: 255 }), // from students and tutors
  studyYear: int("studyYear"), // specific to students
  averageGrade: int("averageGrade"), // specific to students
  description: text("description"), // specific to tutors
  pricePerHour: int("pricePerHour"), // specific to tutors
  isAvailable: int("isAvailable"), // specific to tutors
});

export const userLanguages = mysqlTable("user_languages", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  userId: varchar("userId", { length: 255 }).notNull(),
  language: mysqlEnum("language", ["Lietuvių", "Anglų", "Rusų", "Lenkų"]),
});

export const userStudyTypes = mysqlTable("user_study_type", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  userId: varchar("userId", { length: 255 }).notNull(),
  studyType: mysqlEnum("studyType", ["Kontaktiniu", "Nuotoliu"]),
});

export const subjects = mysqlTable("subjects", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const userSubjects = mysqlTable("user_subjects", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  userId: varchar("userId", { length: 255 }).notNull(),
  subjectId: bigint("subjectId", { mode: "number" }).notNull(),
});

export const reservations = mysqlTable("reservation", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  studentId: varchar("studentId", { length: 255 }).notNull(),
  tutorId: varchar("tutorId", { length: 255 }).notNull(),
  approved: int("approved").notNull(),
  completed: int("finished").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const reviews = mysqlTable("review", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  leftById: varchar("leftById", { length: 255 }).notNull(),
  leftForId: varchar("leftForId", { length: 255 }).notNull(),
  rating: int("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const subjectsRelations = relations(subjects, ({ many }) => ({
  userSubjects: many(userSubjects),
}));

export const userSubjectsRelations = relations(userSubjects, ({ one }) => ({
  subject: one(subjects, {
    fields: [userSubjects.subjectId],
    references: [subjects.id],
  }),
  user: one(users, {
    fields: [userSubjects.userId],
    references: [users.id],
  }),
}));

export const userLanguagesRelations = relations(userLanguages, ({ one }) => ({
  user: one(users, {
    fields: [userLanguages.userId],
    references: [users.id],
  }),
}));

export const userStudyTypesRelations = relations(userStudyTypes, ({ one }) => ({
  user: one(users, {
    fields: [userStudyTypes.userId],
    references: [users.id],
  }),
}));

export const usersRelationsMany = relations(users, ({ many }) => ({
  reservations: many(reservations),
  languages: many(userLanguages),
  studyTypes: many(userStudyTypes),
  subjects: many(userSubjects),
  reviews: many(reviews),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  leftBy: one(users, {
    fields: [reviews.leftById],
    references: [users.id],
  }),
  leftFor: one(users, {
    fields: [reviews.leftForId],
    references: [users.id],
  }),
}));

export const reservationsRelations = relations(reservations, ({ one }) => ({
  student: one(users, {
    fields: [reservations.studentId],
    references: [users.id],
  }),
  tutor: one(users, {
    fields: [reservations.tutorId],
    references: [users.id],
  }),
}));

/// OAUTH

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index("userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = mysqlTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);
