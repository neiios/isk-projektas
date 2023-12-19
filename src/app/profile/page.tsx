import { redirect, notFound } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import StudentProfile from "../_components/student-profile";
import TutorProfile from "../_components/tutor-profile";

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

  if (userInfo.accountType === "tutor") {
    return <TutorProfile />;
  } else if (userInfo.accountType === "student") {
    return <StudentProfile />;
  } else {
    return notFound();
  }
}
