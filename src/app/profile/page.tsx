import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import Image from "next/image";
import { api } from "~/trpc/server";
import { getInitials } from "~/utils/helpers";

export default async function Page() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/api/auth/signin");
  }

  const userInfo = await api.users.getUserInfo.query();
  if (!userInfo) {
    console.error("No user found in db");
    return <div>Something went wrong</div>;
  }

  const userSubjects = await api.subjects.getUserSubjects.query();

  const userSubjectsNames = userSubjects
    .filter((item) => item.subject !== null)
    .map((item) => item.subject?.name);

  if (userInfo.accountType !== "student") {
    return <div>Not implemented</div>;
  }

  return (
    <>
      <h1 className="mb-20 text-5xl font-extrabold">
        Sveiki, {userInfo.name}!
      </h1>
      <div className="flex flex-col items-center justify-center gap-8 border border-black p-16 shadow-sharp">
        <div className="flex items-center justify-center gap-4">
          {userInfo.image ? (
            <Image
              src={userInfo.image}
              alt={`${userInfo.name} Profilio Nuotrauka`}
              width={64}
              height={64}
              className="rounded-full"
            ></Image>
          ) : (
            <div className="relative inline-flex h-[64px] w-[64px] items-center justify-center overflow-hidden rounded-full border border-black">
              <span className="font-medium">{getInitials(userInfo.name)}</span>
            </div>
          )}
          <p className="text-lg font-bold">{userInfo.name}</p>
        </div>
        <h2 className="text-3xl font-bold">Your Info</h2>
        <p className="text-lg font-bold">
          Email:{" "}
          <span className="font-normal text-black">{userInfo.email}</span>
        </p>
        <p className="text-lg font-bold">
          Account Type:{" "}
          <span className="font-normal text-black">
            {userInfo.accountType ?? "Unset"}
          </span>
        </p>
        {/* <p className="text-lg font-bold">
          Account Type:{" "}
          <span className="font-normal text-black">
            {userInfo.studyYear ?? "Unset"}
          </span>
        </p>
        <p className="text-lg font-bold">
          Average Grade:{" "}
          <span className="font-normal text-black">
            {userInfo.averageGrade ?? "Unset"}
          </span>
        </p> */}
        <p className="text-lg font-bold">
          Subjects you want to study:{" "}
          <span className="font-normal text-black">
            {userSubjectsNames.join(", ") ?? "Unset"}
          </span>
        </p>
      </div>
    </>
  );
}
