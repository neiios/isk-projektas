import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await api.users.getUserInfo.query();
  if (!user) {
    redirect("/404");
  }
  if (user.accountType !== "tutor") {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
