import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import {
  userLanguages,
  userStudyTypes,
  userSubjects,
  users,
} from "~/server/db/schema";
import { api } from "~/trpc/server";

export default async function Page() {
  const session = await getServerAuthSession();
  if (session === null) {
    redirect("/api/auth/signin");
  }

  async function handleSubmit(formData: FormData) {
    "use server";

    if (session === null) {
      redirect("/api/auth/signin");
    }

    await db
      .update(users)
      .set({
        name: formData.get("name")?.toString() ?? "",
        email: formData.get("email")?.toString(),
        phoneNumber: formData.get("phoneNumber")?.toString(),
        studyYear: parseInt(formData.get("studyYear")?.toString() ?? "0"),
        averageGrade: parseFloat(
          formData.get("averageGrade")?.toString() ?? "0",
        ),
        accountType: "student",
      })
      .where(eq(users.id, session.user.id));

    const userSubjectsData = formData.getAll("subjects").map((subjectId) => ({
      userId: session.user.id,
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      subjectId: parseInt(subjectId.toString()),
    }));

    await db
      .delete(userSubjects)
      .where(eq(userSubjects.userId, session.user.id));
    await db.insert(userSubjects).values(userSubjectsData);

    type StudyType = "Kontaktiniu" | "Nuotoliu";

    const userStudyTypesData = formData.getAll("studyTypes").map((st) => ({
      userId: session.user.id,
      studyType: st as StudyType,
    }));

    await db
      .delete(userStudyTypes)
      .where(eq(userStudyTypes.userId, session.user.id));
    await db.insert(userStudyTypes).values(userStudyTypesData);

    type AvailableLanguages = "Lietuvių" | "Anglų" | "Rusų" | "Lenkų";

    const userLanguagesData = formData.getAll("languages").map((language) => ({
      userId: session.user.id,
      language: language as AvailableLanguages,
    }));

    await db
      .delete(userLanguages)
      .where(eq(userLanguages.userId, session.user.id));
    await db.insert(userLanguages).values(userLanguagesData);

    revalidatePath("/dashboard");
    redirect("/dashboard");
  }

  const user = await api.users.getUserInfo.query();
  if (!user) {
    return notFound();
  }

  const subjects = await api.subjects.getSubjects.query();

  return (
    <div className="flex max-w-2xl flex-col items-center gap-24 border border-black p-8 shadow-sharp md:p-16">
      <div className="flex flex-col items-center justify-center gap-16">
        <h1 className="text-3xl font-extrabold md:text-5xl">
          Registracija mokiniui
        </h1>

        <form
          action={handleSubmit}
          className="flex flex-col items-center gap-8"
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              required
              type="text"
              name="name"
              placeholder="Tavo vardas ir pavardė"
              defaultValue={user.name}
              className="border border-black px-4 py-2"
            />
            <input
              required
              type="email"
              name="email"
              placeholder="El. paštas"
              defaultValue={user.email}
              className="border border-black px-4 py-2"
            />
            <select
              required
              name="subjects"
              className="row-span-4 border border-black bg-white px-4 py-2"
              defaultValue={[""]}
              multiple
            >
              <option value="" disabled>
                Pasirink dominančius dalykus
              </option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
            <select
              required
              name="studyTypes"
              className="border border-black bg-white px-4 py-2"
              defaultValue={[""]}
              multiple
            >
              <option value="" disabled>
                Pasirink mokymosi būdus
              </option>
              <option value="Kontaktiniu">Kontaktiniu</option>
              <option value="Nuotoliu">Nuotoliu</option>
            </select>

            <select
              required
              name="languages"
              className="row-span-2 border border-black bg-white px-4 py-2"
              defaultValue={[""]}
              multiple
            >
              <option value="" disabled>
                Pasirink kalbas
              </option>
              <option value="Lietuvių">Lietuvių</option>
              <option value="Anglų">Anglų</option>
              <option value="Rusų">Rusų</option>
              <option value="Lenkų">Lenkų</option>
            </select>

            <input
              required
              type="tel"
              name="phoneNumber"
              placeholder="Telefono numeris"
              defaultValue={user.phoneNumber ?? ""}
              className="border border-black px-4 py-2"
            />
            <input
              required
              type="number"
              name="studyYear"
              min={0}
              max={12}
              placeholder="Klasė"
              className="border border-black px-4 py-2"
            />
            <input
              required
              type="number"
              name="averageGrade"
              min={0}
              max={10}
              placeholder="Apytikslis pažymių vidurkis"
              className="border border-black px-4 py-2"
            />
          </div>

          <div className="flex gap-4">
            <Link
              href="/dashboard"
              className="border border-black bg-white px-16 py-4 font-bold shadow-sharp"
            >
              Grįžti atgal
            </Link>
            <button className="border border-black bg-white px-16 py-4 font-bold shadow-sharp">
              Baigti registraciją
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
