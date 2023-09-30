import Head from "next/head";

import Card from "../components/Card";
import Layout from "../components/_Layout";
import CaregiverChart from "../components/CaregiverChart";
import DeviceChart from "../components/DeviceChart";

const Dashboard: React.FC = () => {
  return (
    <>
      <Head>
        <title>Dashboard - Shikor</title>
      </Head>
      <Card className="p-2">
        <div className="row align-items-center">
          <div className="col-9">
            <h6 className="fs-6">Registered devices assigned to patients</h6>
            <h2 className="text-primary fw-semibold">180</h2>
            <h6 className="text-muted">In last 7 months</h6>
          </div>
          <div className="col-3 text-end">
            <i className="fa-2xl text-primary fa-solid fa-circle-check"></i>
          </div>
        </div>
      </Card>
      <Card className="p-2 mt-3">
        <div className="row align-items-center">
          <div className="col-9">
            <h6 className="fs-6">
              Registered devices not assigned to patients
            </h6>
            <h2 className="text-primary fw-semibold text-danger">03</h2>
            <h6 className="text-muted">In last 7 months</h6>
          </div>
          <div className="col-3 text-end">
            <i className="fa-2xl text-danger fa-solid fa-circle-xmark"></i>
          </div>
        </div>
      </Card>

      <CaregiverChart />
      <DeviceChart />

      <div className="row">
        <div className="col-6">
          <Card className="p-2">
            <h6 className="small">Registered Patients</h6>
            <h2 className="text-primary fw-semibold">180</h2>
            <h6 className="text-muted small">In last 7 months</h6>
          </Card>
        </div>
        <div className="col-6">
          <Card className="p-2">
            <h6 className="small">Registered Devices</h6>
            <h2 className="text-primary fw-semibold">177</h2>
            <h6 className="text-muted small">In last 7 months</h6>
          </Card>
        </div>
        <div className="col-6 mt-4">
          <Card className="p-2">
            <h6 className="small">Registered Caregivers</h6>
            <h2 className="text-primary fw-semibold">167</h2>
            <h6 className="text-muted small">In last 7 months</h6>
          </Card>
        </div>
      </div>
    </>
  );
};

Dashboard.Layout = Layout;

export default Dashboard;
