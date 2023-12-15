import SetupCard from "../_components/setup-card";

import { RiParentFill } from "react-icons/ri";
import { GiGraduateCap } from "react-icons/gi";
import { PiBackpackFill } from "react-icons/pi";
import { FaChildren } from "react-icons/fa6";

const user = {
  id: 1,
  name: "John Doe",
  email: "johndoe@example.com",
  age: 30,
  accountType: null,
  // accountType: "student",
};

export default function Page() {
  if (user.accountType === null) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-8 text-5xl font-extrabold">
          Kas geriausiai jus apibūdina?
        </h1>
        <div className="grid gap-8 md:grid-cols-2 md:grid-rows-2">
          <SetupCard
            title="Mokinys < 16 m."
            href="/dashboard/first-setup/child"
            icon={<FaChildren size={128} />}
          />
          <SetupCard
            title="Mokinys > 16 m."
            href="/dashboard/first-setup/student"
            icon={<PiBackpackFill size={128} />}
          />
          <SetupCard
            title="Korepetitorius"
            href="/dashboard/first-setup/tutor"
            icon={<GiGraduateCap size={128} />}
          />
          <SetupCard
            title="Tėvas"
            href="/dashboard/first-setup/parent"
            icon={<RiParentFill size={128} />}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      First setup was completed. Your account type is: {user.accountType}.
    </div>
  );
}
