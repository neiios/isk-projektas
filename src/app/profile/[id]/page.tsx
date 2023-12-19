import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import Image from "next/image";
import { getInitials } from "~/utils/helpers";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/api/auth/signin");
  }

  const profile = await db.query.users.findFirst({
    where: eq(users.id, params.id),
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

  if (!profile) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="mb-12 mt-8 text-5xl font-extrabold">
        Naudotojo {profile.name} profilis
      </h1>

      <div className="flex flex-col gap-4 px-8 py-20 ">
        <div className="mb-8 flex items-center justify-center gap-4">
          {profile.image ? (
            <Image
              src={profile.image}
              alt={`${profile.name} Profilio Nuotrauka`}
              width={64}
              height={64}
              className="rounded-full"
            ></Image>
          ) : (
            <div className="relative inline-flex h-[64px] w-[64px] items-center justify-center overflow-hidden rounded-full border border-black">
              <span className="font-medium">{getInitials(profile.name)}</span>
            </div>
          )}
          <p className="text-lg font-bold">{profile.name}</p>
        </div>

        {profile.accountType === null ? (
          <p className="my-6 text-center">
            Vartotojas dar nebaigė registracijos proceso
          </p>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center text-lg">
              <p className="font-bold">Paskyros tipas: </p>
              <p>
                {profile.accountType === "student"
                  ? "Studentas"
                  : "Korepetitorius"}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center text-lg">
              <p className="font-bold">Paskyros tipas: </p>
              <p>
                {profile.languages
                  .map((language) => language.language)
                  .join(", ")}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center text-lg">
              <p className="font-bold">Paskyros tipas: </p>
              <p>
                {profile.studyTypes
                  .map((studyType) => studyType.studyType)
                  .join(", ")}
              </p>
            </div>

            {profile.accountType === "tutor" ? (
              <>
                <p className="text-center text-lg">
                  <span className="font-bold">Valandinis įkainis: </span>
                  {profile.pricePerHour}
                </p>
                <div className="flex flex-col items-center justify-center text-lg">
                  <p className="font-bold">Aprašymas: </p>
                  <p>{profile.description}</p>
                </div>
              </>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
