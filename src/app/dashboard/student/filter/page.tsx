import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import ReservationButton from "~/app/_components/reservation-button";
import TutorsFormFilter from "~/app/_components/tutors-form-filter";
import { api } from "~/trpc/server";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    name?: string;
    desc?: string;
    subject?: string;
    lang?: string;
    type?: string;
    rate?: number;
  };
}) {
  const tutors = await api.users.getAvailableTutors.query();
  const subjects = await api.subjects.getSubjects.query();
  const reservations = await api.reservations.getStudentReservations.query();
  const reservedTutorIds = reservations.map(
    (reservation) => reservation.tutorId,
  );

  async function handleReservation(tutorId: string) {
    "use server";
    await api.reservations.addReservation.query({ tutorId: tutorId });
    revalidatePath("/dashboard/student");
    redirect("/dashboard/student");
  }

  const nameSearchParamValue = searchParams?.name ?? "";
  const descSearchParamValue = searchParams?.desc ?? "";
  const subjectSearchParamValue = searchParams?.subject ?? "";
  const langSearchParamValue = searchParams?.lang ?? "";
  const typeSearchParamValue = searchParams?.type ?? "";
  const priceSearchParamValue = searchParams?.rate ?? Infinity;

  const filteredTutors = tutors.filter(
    (tutor) =>
      tutor.name.toLowerCase().includes(nameSearchParamValue.toLowerCase()) &&
      tutor.description
        ?.toLowerCase()
        .includes(descSearchParamValue.toLowerCase()) &&
      tutor.subjects.some(
        (subject) =>
          subjects[subject.subjectId - 1]?.name
            .toLowerCase()
            .includes(subjectSearchParamValue.toLowerCase()),
      ) &&
      tutor.languages.some(
        (language) =>
          language.language
            ?.toLowerCase()
            .includes(langSearchParamValue.toLowerCase()),
      ) &&
      tutor.studyTypes.some(
        (type) =>
          type.studyType
            ?.toLowerCase()
            .includes(typeSearchParamValue.toLowerCase()),
      ) &&
      (tutor.pricePerHour ?? 0) <= priceSearchParamValue &&
      !reservedTutorIds.includes(tutor.id),
  );

  return (
    <div className="mt-16 text-center">
      <h2 className="mb-8 text-3xl font-bold">Susirask korepetitorių</h2>
      <table className="border-separate border border-black p-4 shadow-sharp [border-spacing:0.75rem]">
        <thead>
          <tr>
            <th>Korepetitorius</th>
            <th>Aprašas</th>
            <th>Mokomi dalykai</th>
            <th>Kalbos</th>
            <th>Mokymo būdai</th>
            <th>Įkainis (€/h)</th>
          </tr>
          <tr>
            <th>
              <TutorsFormFilter
                searchParam="name"
                placeholder="Filtruoti pagal vardą"
              />
            </th>
            <th>
              <TutorsFormFilter
                searchParam="desc"
                placeholder="Filtruoti pagal aprašymą"
              />
            </th>
            <th>
              <TutorsFormFilter
                searchParam="subject"
                placeholder="Filtruoti pagal dalykus"
              />
            </th>
            <th>
              <TutorsFormFilter
                searchParam="lang"
                placeholder="Filtruoti pagal kalbas"
              />
            </th>
            <th>
              <TutorsFormFilter
                searchParam="type"
                placeholder="Filtruoti pagal mokymo būdus"
              />
            </th>
            <th>
              <TutorsFormFilter
                searchParam="rate"
                placeholder="Filtruoti pagal mokymo kainą"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {tutors.map((tutor) => (
            <tr key={tutor.id}>
              <td>{tutor.name}</td>
              <td>{tutor.description}</td>
              <td>
                {tutor.subjects
                  .map((subject) => subjects[subject.subjectId - 1]?.name)
                  .join(", ")}
              </td>
              <td>
                {tutor.languages
                  .map((language) => language.language)
                  .join(", ")}
              </td>
              <td>
                {tutor.studyTypes.map((type) => type.studyType).join(", ")}
              </td>
              <td>{tutor.pricePerHour}</td>
              <td>
                <button className="border border-black p-2 shadow-sharp bg-white">
                  Rezervuoti
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
