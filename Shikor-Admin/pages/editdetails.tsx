import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import Button from "../components/Button";
import Input from "../components/Input";
import Layout from "../components/_Layout";
import useFetch from "../hooks/useFetch";
import { Patient } from "../hooks/usePatients";
import { Satisfies } from "../libs/utils";

const initialPatientData: Patient = {
  name: "",
  phone: "",
  address: "",
  primaryName: "",
  primaryPhone: "",
  relation: "",
  illness: "",
  age: 0,
  dateAdded: new Date().toISOString(),
  caregivers: [],
  deviceids: [],
  id: 0,
};

const EditDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [patientData, setPatientData] = useState<Patient>({
    ...initialPatientData,
    id: parseInt(id as string) || 0,
  });

  const { data: fetchPatientData, status: fetchPatientStatus } =
    useFetch<Patient>(`/patients/${id}`);

  useEffect(() => {
    if (fetchPatientStatus === "SUCCESS" && fetchPatientData)
      setPatientData(fetchPatientData);
    else if (fetchPatientStatus === "ERROR") alert("ERROR");
  }, [fetchPatientStatus]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { name, value },
  }) =>
    setPatientData({
      ...patientData,
      [name]: value,
    });

  const { commit: updatePatient, status: updatePatientStatus } = useFetch(
    `/patients/${id}`,
    {
      method: "PUT",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(patientData),
      ignore: true,
    }
  );

  useEffect(() => {
    if (updatePatientStatus === "SUCCESS") {
      alert("update SUCCESS");
      router.back();
    } else if (updatePatientStatus === "ERROR") alert("ERROR");
  }, [updatePatientStatus]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePatient();
  };

  return (
    <>
      <Head>
        <title>Edit Patients details - Shikor</title>
      </Head>
      <div className="container-mobile container mx-auto">
        <form onSubmit={handleFormSubmit}>
          <Input
            id={Satisfies<keyof Patient>("name")}
            label="Name"
            type="text"
            value={patientData.name}
            onChange={handleInputChange}
          />
          <Input
            id={Satisfies<keyof Patient>("phone")}
            label="Phone"
            type="text"
            value={patientData.phone}
            onChange={handleInputChange}
          />
          <Input
            id={Satisfies<keyof Patient>("address")}
            label="Address"
            type="text"
            value={patientData.address}
            onChange={handleInputChange}
          />
          <Input
            id={Satisfies<keyof Patient>("primaryName")}
            label="Primary contact name"
            value={patientData.primaryName}
            type="text"
            onChange={handleInputChange}
          />
          <Input
            id={Satisfies<keyof Patient>("primaryPhone")}
            label="Primary contact phone"
            value={patientData.primaryPhone}
            type="text"
            onChange={handleInputChange}
          />
          <Input
            id={Satisfies<keyof Patient>("relation")}
            label="Relation"
            type="text"
            value={patientData.relation}
            onChange={handleInputChange}
          />
          <Input
            id={Satisfies<keyof Patient>("illness")}
            label="Illness"
            type="text"
            value={patientData.illness}
            onChange={handleInputChange}
          />
          <Input
            id={Satisfies<keyof Patient>("age")}
            label="Age"
            type="number"
            min="0"
            value={patientData.age}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            className="d-flex justify-content-end ms-auto px-5 py-3 mt-5"
          >
            <i className="fa fa-arrow-right text-white" />
          </Button>
        </form>
      </div>
    </>
  );
};

EditDetails.Layout = Layout;
export default EditDetails;
