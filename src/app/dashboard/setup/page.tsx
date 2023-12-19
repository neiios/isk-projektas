import { RiParentFill } from "react-icons/ri";
import { GiGraduateCap } from "react-icons/gi";
import { PiBackpackFill } from "react-icons/pi";
import { FaChildren } from "react-icons/fa6";
import SetupCard from "~/app/_components/setup-card";

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-8 text-5xl font-extrabold">
        Kas geriausiai jus apibūdina?
      </h1>
      <div className="grid gap-8 md:grid-cols-2 md:grid-rows-">
        <SetupCard
          title="Mokinys < 16 m."
          href="/dashboard/setup/child"
          icon={<FaChildren size={128} />}
        />
        <SetupCard
          title="Mokinys > 16 m."
          href="/dashboard/setup/student"
          icon={<PiBackpackFill size={128} />}
        />
        <SetupCard
          title="Korepetitorius"
          href="/dashboard/setup/tutor"
          icon={<GiGraduateCap size={128} />}
        />
        <SetupCard
          title="Tėvas"
          href="/dashboard/setup/student"
          icon={<RiParentFill size={128} />}
        />
      </div>
    </div>
  );
}
