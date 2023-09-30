import Head from "next/head";
import Link from "next/link";

import addDeviceImg from "../assets/images/add-deivce.png";

import Button from "../components/Button";
import { imageSizes } from "../components/CONSTANTS";
import ExportableImage from "../components/ExportableImage";
import Input from "../components/Input";
import SITEMAP from "../components/SITEMAP";
import Layout from "../components/_Layout";

const AddDevice: React.FC = () => {
  return (
    <>
      <Head>
        <title>Add device - Shikor</title>
      </Head>
      <div className="container-mobile container mx-auto">
        <div className="d-flex justify-content-center">
          <ExportableImage
            src={addDeviceImg}
            placeholder="blur"
            sizes={imageSizes.md_6_col}
            alt="shikor logo"
            className="img-fluid"
          />
        </div>
        <Input id="email" label="Resgistration token" type="email" />
        <Button className="d-flex justify-content-end ms-auto px-5 py-3 mt-5">
          <Link href={SITEMAP.login} className="text-decoration-none">
            <i className="fa fa-arrow-right text-white" />
          </Link>
        </Button>
      </div>
    </>
  );
};

AddDevice.Layout = Layout;
export default AddDevice;
