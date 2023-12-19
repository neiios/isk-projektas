import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import Image from "next/image";
import { api } from "~/trpc/server";
import { getInitials } from "~/utils/helpers";
import StudentProfile from "../_components/student-profile";

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
    return <div>Not implemented</div>;
  }

  if (userInfo.accountType === "student") {
    return <StudentProfile />;
  }

  redirect("/404");
}
