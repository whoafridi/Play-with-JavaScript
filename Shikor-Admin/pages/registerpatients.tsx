import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Button from "../components/Button";
import Input from "../components/Input";
import SITEMAP from "../components/SITEMAP";
import Layout from "../components/_Layout";
import usePatients, { Patient } from "../hooks/usePatients";
import useFetch from "../hooks/useFetch";
import { Satisfies } from "../libs/utils";

const RegisterPatients: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    primaryName: "",
    primaryPhone: "",
    relation: "",
    illness: "",
    age: 0,
    dateAdded: new Date().toISOString(),
  });

  const { commit: addPatient, status: addPatientStatus } = useFetch(
    "/patients/",
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
      ignore: true,
    }
  );

  useEffect(() => {
    if (addPatientStatus === "SUCCESS") {
      alert("ADD SUCCESS");
      router.push(SITEMAP.qr);
    } else if (addPatientStatus === "ERROR") alert("ERROR");
  }, [addPatientStatus]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { name, value },
  }) => setFormData({ ...formData, [name]: value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPatient();
  };

  return (
    <>
      <Head>
        <title>Register Patients - Shikor</title>
      </Head>
      <div className="container-mobile container mx-auto">
        <form onSubmit={handleSubmit}>
          <Input
            id={Satisfies<keyof Patient>("name")}
            label="Name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <Input
            id={Satisfies<keyof Patient>("phone")}
            label="Phone"
            type="text"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          <Input
            id={Satisfies<keyof Patient>("address")}
            label="Address"
            type="text"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
          <Input
            id={Satisfies<keyof Patient>("primaryName")}
            label="Primary contact name"
            type="text"
            value={formData.primaryName}
            onChange={handleInputChange}
            required
          />
          <Input
            id={Satisfies<keyof Patient>("primaryPhone")}
            label="Primary contact phone"
            type="text"
            value={formData.primaryPhone}
            onChange={handleInputChange}
            required
          />
          <Input
            id={Satisfies<keyof Patient>("relation")}
            label="Relation"
            type="text"
            value={formData.relation}
            onChange={handleInputChange}
            required
          />
          <Input
            id={Satisfies<keyof Patient>("illness")}
            label="Illness"
            type="text"
            value={formData.illness}
            onChange={handleInputChange}
            required
          />
          <Input
            id={Satisfies<keyof Patient>("age")}
            label="Age"
            type="number"
            min="0"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
          <Button
            type="submit"
            disabled={addPatientStatus === "LOADING"}
            className="d-flex justify-content-end align-items-center ms-auto px-5 py-3 mt-5"
          >
            <i className="fa fa-arrow-right text-white" />
            {addPatientStatus === "LOADING" && (
              <div className="spinner-border text-light ms-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

RegisterPatients.Layout = Layout;
export default RegisterPatients;
