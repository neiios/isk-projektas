import Image from "next/image";

export default async function Home() {
  return (
    <>
      <div className="flex flex-col gap-12 md:flex-row">
        <div className="flex flex-col gap-4 ">
          <h1 className="text-5xl font-bold">Lorem ipsum dolor sit amet.</h1>
          <h2 className="text-xl">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit,
            magni.
          </h2>
        </div>
        <Image
          src="https://cataas.com/cat/says/Taip, aš irgi korepetitorius"
          width={500}
          height={500}
          alt="God's fanciest tutor"
        />
      </div>
    </>
  );
}
