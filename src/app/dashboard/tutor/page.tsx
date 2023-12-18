import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

export default async function Page() {
  const user = await api.users.getUserInfo.query();
  if (!user) {
    redirect("/404");
  }

  return (
    <>
      <h1 className="text-5xl font-extrabold">Sveiki, {user.name}!</h1>
    </>
  );
}
