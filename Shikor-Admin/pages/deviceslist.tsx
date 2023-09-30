import Head from "next/head";
import Layout from "../components/_Layout";
import Tab from "../components/Tab";
import Card from "../components/Card";
import ListView from "../components/ListView";

type Device = {
  deviceId: number;
  token: string;
};

const device: Device[] = new Array<Device>(25)
  .fill({
    deviceId: 0b10101111,
    token: "12erer3",
  })
  .map((device, i) => ({
    ...device,
    deviceId: device.deviceId + i,
    token: device.token + String.fromCharCode("3".charCodeAt(0) + i),
  }));

const DevicesList: React.FC = () => {
  return (
    <>
      <Head>
        <title>Devices list - Shikor</title>
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
        {device.slice(0,5).map(({ deviceId, token }) => (
          <Card className="mt-3 py-2">
            <table className="table mb-0">
              <tbody className="border-white">
                <tr className="text-primary h5">
                  <td className="align-top">CareGiver ID</td>
                  <td className="align-top text-end">Registration token</td>
                </tr>
                <tr className="text-muted">
                  <td className="text-start align-top">{deviceId}</td>
                  <td className="text-end align-top">{token}</td>
                </tr>
              </tbody>
            </table>
          </Card>
        ))}
        {/* <ListView items={device}/> */}
      </div>
    </>
  );
};

DevicesList.Layout = Layout;
export default DevicesList;
