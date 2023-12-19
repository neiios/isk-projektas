import { eq } from "drizzle-orm";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { getInitials } from "~/utils/helpers";

export default async function StudentProfile() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/api/auth/signin");
  }

  const studentInfo = await db.query.users.findFirst({
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

  if (!studentInfo) {
    console.error("No user found in db");
    return <div>Something went wrong</div>;
  }

  if (!(studentInfo.accountType === "student")) {
    redirect("/dashboard");
  }

  console.log(studentInfo.subjects);

  return (
    <>
      <h1 className="mb-20 text-5xl font-extrabold">
        Sveiki, {studentInfo.name}!
      </h1>
      <div className="flex flex-col items-center justify-center gap-8 border border-black p-16 shadow-sharp">
        <div className="flex items-center justify-center gap-4">
          {studentInfo.image ? (
            <Image
              src={studentInfo.image}
              alt={`${studentInfo.name} Profilio Nuotrauka`}
              width={64}
              height={64}
              className="rounded-full"
            ></Image>
          ) : (
            <div className="relative inline-flex h-[64px] w-[64px] items-center justify-center overflow-hidden rounded-full border border-black">
              <span className="font-medium">
                {getInitials(studentInfo.name)}
              </span>
            </div>
          )}
          <p className="text-lg font-bold">{studentInfo.name}</p>
        </div>
        <h2 className="text-3xl font-bold">Profilio informacija</h2>

        <p className="text-lg font-bold">
          El. paštas:{" "}
          <span className="font-normal text-black">{studentInfo.email}</span>
        </p>

        <p className="text-lg">
          <span className="font-bold">Telefono numeris: </span>
          {studentInfo.phoneNumber}
        </p>

        <p className="text-lg">
          <span className="font-bold">Pažymių vidurkis: </span>
          {studentInfo.averageGrade}
        </p>

        <p className="text-lg">
          <span className="font-bold">Paskyros tipas:</span> Studentas
        </p>

        <p className="max-w-md text-lg">
          <span className="font-bold">Dominantys dalykai: </span>
          {studentInfo.subjects
            .map((subject) => subject.subject.name)
            .join(", ")}
        </p>
      </div>
    </>
  );
}
