import Head from "next/head";

import Layout from "../components/_Layout";
import Tab from "../components/Tab";
import Card from "../components/Card";

type Patient = {
  id: number;
  deviceId: string;
  token: string;
  name: string;
  dateAdded: Date;
  Caregiver: Caregiver;
};

type Caregiver = {
  id: number;
  name: string;
};

const patient: Patient[] = new Array<Patient>(6)
  .fill({
    id: 0b1010111101,
    deviceId: "0x8754fa46",
    token: "1232eoi4",
    name: "Something L",
    dateAdded: new Date(),
    Caregiver: { id: 0b10, name: "Ashraf Alia " },
  })
  .map((patient, i) => ({
    ...patient,
    id: patient.id + i,
    name: patient.name + String.fromCharCode("a".charCodeAt(0) + i),
    Caregiver: {
      ...patient.Caregiver,
      name: patient.Caregiver.name + String.fromCharCode("a".charCodeAt(0) + i),
    },
  }));

const SOS: React.FC = () => {
  return (
    <>
      <Head>
        <title>SOS history - Shikor</title>
      </Head>
      <div className="container-mobile container mx-auto">
        <Tab />
        <div className="row py-3">
          <div className="col-8">
            <div className="input-group my-2">
              <span className="input-group-text border-0 bg-light">
                <i className="fa fa-search"></i>
              </span>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control border-start-0"
                  id="search"
                  placeholder="Search ID"
                />
                <label htmlFor="search">Search ID</label>
              </div>
            </div>
          </div>
          <div className="col-4 d-flex align-items-center">
            Sort By
            <div
              className="d-flex flex-column align-items-center ms-auto"
              style={{ width: 25 }}
            >
              <div className="w-100 bg-black mb-1" style={{ height: 2 }} />
              <div className="w-75 bg-black mb-1" style={{ height: 2 }} />
              <div className="w-50 bg-black mb-1" style={{ height: 2 }} />
            </div>
          </div>
        </div>
        {patient.map(({ id, name, dateAdded, Caregiver }) => (
          <Card className="mt-3 py-2">
            <table className="table mb-0">
              <tbody className="border-white">
                <tr className="text-primary h5">
                  <td className="align-top">{name}</td>
                  <td className="align-top text-end">
                    {dateAdded.toISOString().slice(0, 10)}
                  </td>
                </tr>
                <tr className="text-muted">
                  <td className="text-start align-top">{id}</td>
                  <td className="text-end align-top"></td>
                </tr>
                <tr className="text-primary h5">
                  <td className="align-top">{Caregiver.name}</td>
                  <td className="align-top text-end">
                    {dateAdded.toDateString().slice(0, 3)}
                  </td>
                </tr>
                <tr className="text-muted">
                  <td className="text-start align-top">{Caregiver.id}</td>
                  <td className="text-end align-top">
                    {dateAdded.toLocaleTimeString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
        ))}
      </div>
    </>
  );
};

SOS.Layout = Layout;
export default SOS;
