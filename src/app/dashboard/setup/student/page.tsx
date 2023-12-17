import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

export default async function Page() {
  async function handleSubmit(formData: FormData) {
    "use server";
    console.log(formData.getAll("subjects"));
    revalidatePath("/dashboard");
    redirect("/dashboard");
  }

  const subjects = await api.subjects.getSubjects.query();

  return (
    <div className="flex max-w-2xl flex-col items-center gap-24 border border-black p-8 shadow-sharp md:p-16">
      <div className="flex flex-col items-center justify-center gap-16">
        <h1 className="text-3xl font-extrabold md:text-5xl">
          Student setup page
        </h1>

        <form
          action={handleSubmit}
          className="flex flex-col items-center gap-8"
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border border-black px-4 py-2"
            />
            <select
              name="subjects"
              className="row-span-5 border border-black bg-white px-4 py-2"
              defaultValue=""
              multiple
            >
              <option value="" disabled>
                Select study subjects
              </option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border border-black px-4 py-2"
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              className="border border-black px-4 py-2"
            />
            <input
              type="text"
              name="studyYear"
              placeholder="Study Year"
              className="border border-black px-4 py-2"
            />
            <input
              type="text"
              name="averageGrade"
              placeholder="Average Grade"
              className="border border-black px-4 py-2"
            />
          </div>

          <div className="flex gap-4">
            <Link
              href="/dashboard"
              className="border border-black px-16 py-4 font-bold shadow-sharp"
            >
              Go Back
            </Link>
            <button className="border border-black px-16 py-4 font-bold shadow-sharp">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
