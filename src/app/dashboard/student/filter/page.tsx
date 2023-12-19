import { api } from "~/trpc/server";

export default async function Page() {
  const tutors = await api.users.getAvailableTutors.query();
  const subjects = await api.subjects.getSubjects.query();

  return (
    <div className="mt-16 text-center">
      <h2 className="mb-8 text-3xl font-bold">Susirask korepetitorių</h2>
      <table className="border-separate border border-black shadow-sharp [border-spacing:0.75rem]">
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
            <form action="">
              <th>Name</th>
              <th>Description</th>
              <th>Subjects</th>
              <th>Languages</th>
              <th>Study Types</th>
              <th>Hourly Rate</th>
            </form>
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
