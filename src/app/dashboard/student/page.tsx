import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Image from "next/image";
import { getInitials } from "~/utils/helpers";

// const tutors = [
//   {
//     id: 1,
//     name: "Leonidas Lopas",
//     subjects: ["Math", "Physics", "Chemistry"],
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem maiores modi maxime explicabo nisi quam, dolores pariatur reiciendis labore repellat voluptatibus. Impedit vitae eos eum, rerum ipsa adipisci facere minus expedita? Laborum repudiandae, corrupti molestiae corporis sapiente nisi aut doloremque alias. Quaerat nulla eos facilis. Eum nostrum commodi officiis blanditiis!",
//     rating: 5,
//     languages: ["Lithuanian", "English"],
//     places: ["Online", "Vilnius"],
//   },
// ];

export default async function Page() {
  const session = await getServerAuthSession();

  const user = await api.users.getUserInfo.query();
  if (!user) {
    redirect("/404");
  }

  const tutors = await api.users.getAvailableTutors.query();
  const threeFirst = tutors.slice(0, 3);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-5xl font-extrabold">Sveiki, {user.name}!</h1>

      <div>
        <h2 className="mb-8 text-3xl font-bold">Greita Rezervacija</h2>
        <div className="grid gap-8 lg:grid-cols-3">
          {threeFirst.map((tutor) => (
            <div
              key={tutor.id}
              className="flex flex-col items-center justify-between gap-8 border border-black p-8 shadow-sharp"
            >
              <div className="flex items-center justify-center gap-4">
                <div className="relative inline-flex h-[64px] w-[64px] items-center justify-center overflow-hidden rounded-full border border-black">
                  <span className="font-medium">{getInitials(tutor.name)}</span>
                </div>
                <p className="text-lg font-bold">{tutor.name}</p>
              </div>

              <div>
                {/* <div className="grid grid-cols-2">
                  <p className="text-sm font-bold">Dėsto:</p>
                  <p className="text-sm">
                    {tutor.user_subject.subjectId.join(", ")}
                  </p>
                </div> */}
                {/* <div className="grid grid-cols-2">
                  <p className="text-sm font-bold">Kalbos:</p>
                  <p className="text-sm">{tutor.languages.join(", ")}</p>
                </div>
                <div className="grid grid-cols-2">
                  <p className="text-sm font-bold">Dėstymo vietos:</p>
                  <p className="text-sm">{tutor.places.join(", ")}</p>
                </div> */}
                {/* <div className="grid grid-cols-2">
                  <p className="text-sm font-bold">Mokinių įvertinimas:</p>
                  <p className="text-sm">{tutor.rating}</p>
                </div> */}

                <div className="flex items-center">
                  <svg
                    className="me-1 h-4 w-4 text-yellow-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <p className="ms-2 text-sm font-bold">4.95</p>
                  <span className="mx-1.5 h-1 w-1 rounded-full"></span>
                  <a href="#" className="text-sm font-medium underline">
                    73 Atsiliepimų
                  </a>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <p className="text-sm font-bold">Aprašymas:</p>
                <p className="text-sm">{tutor.description}</p>
              </div>

              <button className="border border-black px-16 py-4 font-bold shadow-sharp">
                Rezervuoti
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold">Susirask korepetitorių</h2>
      </div>
    </div>
  );
}
