import { eq } from "drizzle-orm";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { getInitials } from "~/utils/helpers";
import { GenericButton } from "./generic-button";
import { revalidatePath } from "next/cache";

export default async function TutorProfile() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/api/auth/signin");
  }

  const tutor = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
    with: {
      subjects: {
        with: {
          subject: true,
        },
      },
      languages: true,
      studyTypes: true,
    },
  });

  if (!tutor) {
    console.error("No user found in db");
    return <div>Something went wrong</div>;
  }

  if (!(tutor.accountType === "tutor")) {
    redirect("/dashboard");
  }

  async function deactivateAccount() {
    "use server";
    if (session === null) {
      redirect("/api/auth/signin");
    }

    await db
      .update(users)
      .set({
        isAvailable: 0,
      })
      .where(eq(users.id, session.user.id));

    revalidatePath("/profile");
    redirect("/profile");
  }

  async function activateAccount() {
    "use server";
    if (session === null) {
      redirect("/api/auth/signin");
    }

    await db
      .update(users)
      .set({
        isAvailable: 1,
      })
      .where(eq(users.id, session.user.id));

    revalidatePath("/profile");
    redirect("/profile");
  }

  return (
    <>
      <h1 className="mb-20 text-5xl font-extrabold">Sveiki, {tutor.name}!</h1>
      <div className="flex flex-col items-center justify-center gap-4 border border-black p-16 text-center shadow-sharp">
        <h2 className="mb-6 text-3xl font-bold">Profilio informacija</h2>

        <div className="mb-8 flex items-center justify-center gap-4">
          {tutor.image ? (
            <Image
              src={tutor.image}
              alt={`${tutor.name} Profilio Nuotrauka`}
              width={64}
              height={64}
              className="rounded-full"
            ></Image>
          ) : (
            <div className="relative inline-flex h-[64px] w-[64px] items-center justify-center overflow-hidden rounded-full border border-black">
              <span className="font-medium">{getInitials(tutor.name)}</span>
            </div>
          )}
          <p className="text-lg font-bold">{tutor.name}</p>
        </div>

        <p className="text-lg font-bold">
          El. paštas:{" "}
          <span className="font-normal text-black">{tutor.email}</span>
        </p>

        <p className="text-lg">
          <span className="font-bold">Telefono numeris: </span>
          {tutor.phoneNumber}
        </p>

        <p className="text-lg">
          <span className="font-bold">Valandinis įkainis: </span>
          {tutor.pricePerHour} Eur
        </p>

        <p className="text-lg">
          <span className="font-bold">Paskyros tipas: </span>
          Korepetitorius
        </p>

        <p className="max-w-md text-center text-lg">
          <span className="font-bold">Dalykai, kuriuos mokysite: </span>
          {tutor.subjects.map((subject) => subject.subject.name).join(", ")}
        </p>

        <p className="max-w-md text-lg">
          <span className="font-bold">Kalbos: </span>
          {tutor.languages.map((language) => language.language).join(", ")}
        </p>

        <p className="max-w-md text-lg">
          <span className="font-bold">Mokymo būdai: </span>
          {tutor.studyTypes.map((studyType) => studyType.studyType).join(", ")}
        </p>

        <div className="mb-8 flex max-w-md flex-col items-center justify-center text-lg">
          <p className="font-bold">Aprašymas: </p>
          <p>{tutor.description}</p>
        </div>

        {tutor.isAvailable === 1 ? (
          <GenericButton
            clickHandler={deactivateAccount}
            innerText="Deaktyvuoti paskyrą"
          />
        ) : null}

        {tutor.isAvailable === 0 ? (
          <GenericButton
            clickHandler={activateAccount}
            innerText="Aktyvuoti paskyrą"
          />
        ) : null}
      </div>
    </>
  );
}
