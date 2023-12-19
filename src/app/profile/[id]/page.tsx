import { and, eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { users, reservations, reviews } from "~/server/db/schema";
import Image from "next/image";
import { getInitials } from "~/utils/helpers";
import { revalidatePath } from "next/cache";

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

  if (profile === null || profile === undefined) {
    return notFound();
  }

  const reservation = await db.query.reservations.findFirst({
    where: and(
      eq(reservations.studentId, session.user.id),
      eq(reservations.tutorId, profile.id),
    ),
  });
  const hadReservation = !!reservation;

  const reviewsData = await db.query.reviews.findMany({
    where: eq(reviews.leftForId, profile.id),
    with: {
      leftBy: true,
    },
  });

  async function addReview(formData: FormData) {
    "use server";

    if (session === null) {
      redirect("/api/auth/signin");
    }

    if (profile === null || profile === undefined) {
      return notFound();
    }

    await db.insert(reviews).values({
      leftById: session.user.id,
      leftForId: profile.id,
      comment: formData.get("description")?.toString(),
      rating: parseInt(formData.get("rating")?.toString() ?? "5"),
    });

    revalidatePath(`/profile/${params.id}`);
    redirect(`/profile/${params.id}`);
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
          <p className="text-2xl font-bold">{profile.name}</p>
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

                <div className="flex flex-col items-center justify-center">
                  <h2 className="mb-4 mt-8 text-3xl font-bold">Atsiliepimai</h2>
                  {reviewsData.length === 0 ? (
                    <div>Dėja šis korepetitorius dar neturi atsiliepimų</div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {reviewsData.map((review) => (
                        <div className="flex min-w-[20rem] flex-col items-center justify-center gap-4 border border-black bg-white p-4 text-lg shadow-sharp">
                          <div className="flex items-center justify-center gap-4">
                            {review.leftBy.image ? (
                              <Image
                                src={review.leftBy.image}
                                alt={`${review.leftBy.name} Profilio Nuotrauka`}
                                width={32}
                                height={32}
                                className="rounded-full"
                              ></Image>
                            ) : (
                              <div className="relative inline-flex h-[32px] w-[32px] items-center justify-center overflow-hidden rounded-full border border-black">
                                <span className="font-medium">
                                  {getInitials(review.leftBy.name)}
                                </span>
                              </div>
                            )}
                            <p className="text-lg font-bold">
                              {review.leftBy.name}
                            </p>
                          </div>
                          <div>
                            <p className="font-bold">Atsiliepimas: </p>
                            <p className="text-center">{review.comment}</p>
                          </div>
                          <div>
                            <p className="font-bold">Įvertinimas: </p>
                            <p className="text-center">{review.rating}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {hadReservation ? (
                  <div className="mt-4 flex flex-col items-center justify-center gap-4">
                    <h3 className="text-2xl font-bold">Palikti atsiliepimą</h3>
                    <p className="max-w-sm text-center">
                      Kadangi turėjai pamokų su šiuo korepetitoriu, gali palikti
                      atsiliepimą apie jį.
                    </p>
                    <form
                      action={addReview}
                      className="flex flex-col items-center justify-center gap-4"
                    >
                      <textarea
                        name="description"
                        placeholder="Aprašyk savo patirtį su šiuo korepetitoriumi"
                        rows={4}
                        cols={30}
                        className="border border-black px-4 py-2 shadow-sharp"
                      />
                      <input
                        required
                        type="number"
                        name="rating"
                        placeholder="Penkiabalis įvetinimas"
                        min={0}
                        max={5}
                        className="border border-black px-4 py-2 shadow-sharp"
                      />
                      <button className="border border-black bg-white px-16 py-4 font-bold shadow-sharp">
                        Palikti atsiliepimą
                      </button>
                    </form>
                  </div>
                ) : null}
              </>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
