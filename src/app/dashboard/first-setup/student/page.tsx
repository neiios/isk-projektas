import Link from "next/link";

export default async function StudentSetupPage() {
  return (
    <div className="flex max-w-2xl flex-col items-center gap-24 border border-black p-8 shadow-sharp md:p-16">
      <div className="flex flex-col items-center justify-center gap-16">
        <h1 className="text-3xl font-extrabold md:text-5xl">
          Student setup page
        </h1>
        <form action="" className="flex flex-col items-center gap-8">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="border border-black px-4 py-2"
            />
            <input
              type="text"
              placeholder="Email"
              className="border border-black px-4 py-2"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="border border-black px-4 py-2"
            />
            <input
              type="text"
              placeholder="School"
              className="border border-black px-4 py-2"
            />
            <input
              type="text"
              placeholder="Year"
              className="border border-black px-4 py-2"
            />
            <input
              type="text"
              placeholder="Average Grade"
              className="border border-black px-4 py-2"
            />
            <input
              type="text"
              placeholder="List of Subjects"
              className="col-span-2 border border-black px-4 py-2"
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
