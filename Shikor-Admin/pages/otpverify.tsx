import Head from "next/head";

import forgotPasswordImg from "../assets/images/forgot-password-img.svg";

import ExportableImage from "../components/ExportableImage";
import { imageSizes } from "../components/CONSTANTS";
import Input from "../components/Input";
import Button from "../components/Button";
import Link from "next/link";
import SITEMAP from "../components/SITEMAP";

const Otp = () => {
  return (
    <>
      <Head>
        <title>OTP verification - Shikor</title>
      </Head>
      <div className="container-mobile container py-5">
        <div className="d-flex justify-content-center">
          <ExportableImage
            src={forgotPasswordImg}
            placeholder="blur"
            sizes={imageSizes.md_6_col}
            alt="shikor logo"
            className="img-fluid"
          />
        </div>
        <h3 className="text-center fw-bold opacity-75">OTP Verification</h3>
        <h6 className="text-center fw-bold">
          <span className="opacity-50 lh-base">Enter the OTP sent to</span>
          <br /> <span className="opacity-75">sharifahamed968@gmail.com</span>
        </h6>
        <div className="d-flex justify-content-center pb-3">
          <div className="d-flex flex-row gap-2 w-75">
            <Input id="number_one" type="text" className="border border-primary border-bottom-2"/>
            <Input id="number_two" type="text" />
            <Input id="number_three" type="text" />
            <Input id="number_four" type="text" />
          </div>
        </div>
        <p className="fs-6 text-center opacity-50">
          Didn't you receive the OTP?
          <Link href={SITEMAP.dashboard} className="text-decoration-none">
            <span className="text-primary ms-2">Resend OTP</span>
          </Link>
        </p>
        <Button className="d-flex justify-content-end ms-auto px-5 py-3 mt-5">
          <Link href={SITEMAP.dashboard} className="text-decoration-none">
            <i className="fa fa-arrow-right text-white" />
          </Link>
        </Button>
      </div>
    </>
  );
};

export default Otp;
