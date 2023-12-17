import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { getInitials } from "~/utils/helpers";

const tutors = [
  {
    id: 1,
    name: "Leonidas Lopas",
    subjects: ["Math", "Physics", "Chemistry"],
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem maiores modi maxime explicabo nisi quam, dolores pariatur reiciendis labore repellat voluptatibus. Impedit vitae eos eum, rerum ipsa adipisci facere minus expedita? Laborum repudiandae, corrupti molestiae corporis sapiente nisi aut doloremque alias. Quaerat nulla eos facilis. Eum nostrum commodi officiis blanditiis!",
    rating: 5,
    languages: ["Lithuanian", "English"],
    places: ["Online", "Vilnius"],
  },
];

export default async function Page() {
  const session = await getServerAuthSession();

  const user = await api.users.getUserInfo.query();
  if (!user) {
    redirect("/404");
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-5xl font-extrabold">Sveiki, {user.name}!</h1>

      <div>
        <h2 className="mb-8 text-3xl font-bold">Greita Rezervacija</h2>
        <div className="grid gap-8 lg:grid-cols-3">
          {tutors.map((tutor) => (
            <div
              key={tutor.id}
              className="flex flex-col items-center justify-between gap-8 border border-black p-8 shadow-sharp"
            >
              <div className="flex items-center justify-center gap-4">
                <div className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-black">
                  <span className="font-medium">{getInitials(tutor.name)}</span>
                </div>
                <h3 className="text-lg font-bold">{tutor.name}</h3>
              </div>

              <div>
                <div className="grid grid-cols-2">
                  <p className="text-sm font-bold">Dėsto:</p>
                  <p className="text-sm">{tutor.subjects.join(", ")}</p>
                </div>
                <div className="grid grid-cols-2">
                  <p className="text-sm font-bold">Kalbos:</p>
                  <p className="text-sm">{tutor.languages.join(", ")}</p>
                </div>
                <div className="grid grid-cols-2">
                  <p className="text-sm font-bold">Dėstymo vietos:</p>
                  <p className="text-sm">{tutor.places.join(", ")}</p>
                </div>
                <div className="grid grid-cols-2">
                  <p className="text-sm font-bold">Mokinių įvertinimas:</p>
                  <p className="text-sm">{tutor.rating}</p>
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

          <div className="flex h-64 w-64 flex-col items-center border border-black p-8"></div>
          <div className="flex h-64 w-64 flex-col items-center border border-black p-8"></div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold">Susirask korepetitorių</h2>
      </div>
    </div>
  );
}
