import { useRouter } from "next/router";
import Head from "next/head";

import Layout from "../components/_Layout";
import Button from "../components/Button";
import Link from "next/link";
import SITEMAP from "../components/SITEMAP";

const Account: React.FC = () => {
  const router = useRouter();
  if (router.query.id)
    return (
      <>
        <Head>
          <title>Account Caregiver - Shikor</title>
        </Head>
        <div className="container container-mobile px-3">
          <div className="modal-body py-3">
            <h4 className="text-center">Account details</h4>
            <div className="row px-3">
              <div className="col-6">
                <h6 className="pt-3 text-muted small">Name</h6>
                <h6 className="opacity-75">Ashrafi Ali</h6>
              </div>
              <div className="col-6 text-end">
                <h6 className="pt-3 text-muted small">CareGiver ID</h6>
                <h6 className="opacity-75">{router.query.id}</h6>
              </div>
            </div>
            <div className="row px-3">
              <div className="col-6">
                <h6 className="pt-3 text-muted small">Email</h6>
                <h6 className="opacity-75">ashrafali@gmail.com</h6>
              </div>
              <div className="col-6 text-end">
                <h6 className="pt-3 text-muted small">Phone</h6>
                <h6 className="opacity-75">01723456xxx</h6>
              </div>
              <div className="col-6">
                <h6 className="pt-3 text-muted small">Address</h6>
                <h6 className="opacity-75">212-D, XYZ</h6>
              </div>
            </div>
            <Link href={SITEMAP.editaccount + `?id=` + router.query.id}>
              <Button className="float-end ms-auto px-4">
                Edit account <i className="fa fa-arrow-right"></i>
              </Button>
            </Link>
          </div>
        </div>
      </>
    );

  return <></>;
};

Account.Layout = Layout;
export default Account;
