import { redirect, notFound } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Page() {
  const session = await getServerAuthSession();

  const user = await api.users.getUserInfo.query();
  if (!user) {
    return notFound();
  }

  if (!session) {
    redirect("/api/auth/signin");
  } else if (user.accountType === null) {
    redirect("/dashboard/setup");
  } else if (user.accountType === "student") {
    redirect("/dashboard/student");
  } else if (user.accountType === "tutor") {
    redirect("/dashboard/tutor");
  }

  return notFound();
}
