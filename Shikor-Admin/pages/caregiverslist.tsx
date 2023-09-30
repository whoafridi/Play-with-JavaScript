import Head from "next/head";

import Layout from "../components/_Layout";
import Tab from "../components/Tab";
import Card from "../components/Card";

type Caregiver = {
  id: number;
  name: string;
  email: string;
  phone: string;
  token: string;
};

const caregiver: Caregiver[] = new Array<Caregiver>(25)
  .fill({
    id: 0b1010111101,
    name: "Something Khatun",
    email: "something@gmail.com",
    phone: "019210291082",
    token: "12erer3",
  })
  .map((giver, i) => ({
    ...giver,
    id: giver.id + i,
    name: giver.name + String.fromCharCode("A".charCodeAt(0) + i),
    email: giver.email + String.fromCharCode("s".charCodeAt(0) + i),
    token: giver.token + String.fromCharCode("3".charCodeAt(0) + i),
    phone: giver.phone + String.fromCharCode("1".charCodeAt(0) + i),
  }));

const CareGiversList: React.FC = () => {
  return (
    <>
      <Head>
        <title>Caregivers list - Shikor</title>
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
        {caregiver.slice(0, 5).map(({ id, token, name, email, phone }) => (
          <Card className="mt-3 py-2">
            <h5 className="text-primary mb-3">{name}</h5>
            <h6 className="text-muted">ID: {id}</h6>
            <h6 className="text-muted">Email: {email}</h6>
            <h6 className="text-muted">Phone: {phone}</h6>
            <h6 className="text-muted">Registration token: {token}</h6>
            <div className="d-flex justify-content-center align-align-items-center py-3">
              <div
                className="alert alert-success d-flex justify-content-center h6"
                role="alert"
              >
                Registered device : Yes{" "}
                <i className="ms-2 2xl fa-regular fa-circle-check"></i>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

CareGiversList.Layout = Layout;

export default CareGiversList;
