"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function TutorsFormFilter({
  searchParam,
  placeholder,
}: {
  searchParam: string;
  placeholder: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(`${searchParam}`, term);
    } else {
      params.delete(`${searchParam}`);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
      <input
        className="border border-black p-2 shadow-sharp"
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get(`${searchParam}`)?.toString()}
      />
    </div>
  );
}
