import Head from "next/head";
import Link from "next/link";

import Button from "../components/Button";
import Input from "../components/Input";
import SITEMAP from "../components/SITEMAP";
import Layout from "../components/_Layout";

const Register: React.FC = () => {
  return (
    <>
      <Head>
        <title>Register - Shikor</title>
      </Head>

      <div className="container-mobile container mx-auto">
        <Input id="email" label="Email" type="email" />
        <Input id="phone" label="Phone" type="text" />
        <Input id="address" label="Address" type="text" />
        <Input id="name" label="Name" type="text" />
        <Input id="password" label="Password" type="password" />
        <Input id="confirmpassword" label="Confirm Password" type="password" />

        <Link href={SITEMAP.dashboard} className="text-decoration-none">
          <Button className="d-flex justify-content-end ms-auto px-5 py-3 mt-5">
            <i className="fa fa-arrow-right text-white" />
          </Button>
        </Link>
      </div>
    </>
  );
};

Register.Layout = Layout;
export default Register;
