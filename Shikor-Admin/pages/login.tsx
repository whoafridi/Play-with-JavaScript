import Head from "next/head";
import Link from "next/link";

import logoSvg from "../assets/images/logo.svg";

import Button from "../components/Button";
import { imageSizes } from "../components/CONSTANTS";
import ExportableImage from "../components/ExportableImage";
import Input from "../components/Input";
import SITEMAP from "../components/SITEMAP";

const Login = () => {
  return (
    <>
      <Head>
        <title>Login - Shikor</title>
      </Head>

      <div className="container-mobile mx-auto bg-light">
        <div className="d-flex justify-content-center py-5">
          <Link href={SITEMAP.login}>
            <ExportableImage
              src={logoSvg}
              placeholder="blur"
              sizes={imageSizes.md_6_col}
              alt="shikor logo"
              className="img-fluid"
            />
          </Link>
        </div>
        <div className="container container-mobile bg-white pt-5 rounded-corner p-3">
          <Input id="email" label="Email" type="email" />
          <Input
            id="password"
            label="Password"
            type="password"
            className="position-relative"
          />

          <p className="py-3 small">
            <Link
              href={SITEMAP.adddevice}
              className="text-decoration-none text-dark"
            >
              Forgot password?
            </Link>
          </p>
          <Link href={SITEMAP.dashboard} className="text-decoration-none">
            <Button className="d-flex justify-content-end ms-auto px-5 py-3">
              <i className="fa fa-arrow-right text-white" />
            </Button>
          </Link>
          <p className="text-center py-5">
            Don't have account?
            <Link href={SITEMAP.register} className="text-decoration-none">
              <span className="text-primary opacity-75 ms-2">
                Register here
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
