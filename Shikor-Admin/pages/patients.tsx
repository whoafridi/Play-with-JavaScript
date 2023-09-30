import Head from "next/head";

import Layout from "../components/_Layout";
import ListView from "../components/ListView";
import usePatients from "../hooks/usePatients";

// type Patient = {
//   id: number;
//   name: string;
//   deviceId: string;
//   dateAdded: Date;
// };

// const patients: Patient[] = new Array<Patient>(25)
//   .fill({
//     id: 0b1010111101,
//     dateAdded: new Date(),
//     name: "Something Khatun",
//     deviceId: "0x8754fa46",
//   })
//   .map((patient, i) => ({ ...patient, id: patient.id + i }));

const PatientsList: React.FC = () => {
  const { patientFetchStatus, patientFetchData } = usePatients();

  return (
    <>
      <Head>
        <title>Patients List - Shikor</title>
      </Head>
      <ListView
        loading={patientFetchStatus === "LOADING"}
        items={patientFetchData || []}
      />
    </>
  );
};

PatientsList.Layout = Layout;
export default PatientsList;
