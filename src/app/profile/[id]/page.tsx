import { useSession } from "next-auth/react";

export default function Page({ params }: { params: { id: string } }) {
  const session = useSession();

  return (
    <div>
      <h1>Profile</h1>
      <p>This is the user profile for user {params.id}.</p>
    </div>
  );
}
