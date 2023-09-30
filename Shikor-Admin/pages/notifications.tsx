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
//   .map((patient, i) => ({
//     ...patient,
//     id: patient.id + i,
//     name: patient.name + String.fromCharCode("A".charCodeAt(0) + i),
//     dateAdded: (() => {
//       const newDate = new Date();
//       newDate.setDate(newDate.getDate() - i * 3);
//       return newDate;
//     })(),
//   }));

const Notifications: React.FC = () => {
  const { patientFetchData, patientFetchStatus } = usePatients();

  return (
    <>
      <Head>
        <title>Notifications - Shikor</title>
      </Head>
      <ListView
        loading={patientFetchStatus === "LOADING"}
        items={patientFetchData || []}
      />
    </>
  );
};

Notifications.Layout = Layout;
export default Notifications;
