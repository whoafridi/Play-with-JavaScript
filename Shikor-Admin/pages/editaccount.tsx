import Head from "next/head";
import Button from "../components/Button";
import Layout from "../components/_Layout";
import Input from "../components/Input";
import Link from "next/link";
import SITEMAP from "../components/SITEMAP";
import { useRouter } from "next/router";

const Edit: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Edit account details - Shikor</title>
      </Head>
      <div className="container-mobile container mx-auto">
        <Input id="name" label="Name" type="text" />
        <Input id="email" label="Email" type="email" />
        <Input id="phone" label="Phone" type="text" />
        <Input id="address" label="Address" type="text" />
        <Link
          href={SITEMAP.account + `?id=` + router.query.id}
          className="text-decoration-none"
        >
          <Button
            type="submit"
            className="d-flex justify-content-end ms-auto px-5 py-3 mt-5"
          >
            <i className="fa fa-arrow-right text-white" />
          </Button>
        </Link>
      </div>
    </>
  );
};

Edit.Layout = Layout;
export default Edit;
