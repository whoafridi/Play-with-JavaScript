import Link from "next/link";
import { useRouter } from "next/router";

import DashboardFooterIcon from "../assets/images/dashboard-footer.svg";
import DashboardFooterActiveIcon from "../assets/images/dashboard-footer-active.svg";
import QRScannerIcon from "../assets/images/qr_code_scanner.svg";
import CareGiverIcon from "../assets/images/caregiver.svg";
import CareGiverActiveIcon from "../assets/images/caregiver-active.svg";

import { imageSizes } from "./CONSTANTS";
import ExportableImage, { StaticImageData } from "./ExportableImage";
import SITEMAP from "./SITEMAP";

type FooterIconProps = {
  alt: string;
  src: string | StaticImageData;
  srcActive: string | StaticImageData;
  text: string;
  path: string;
};

const FooterIcon: React.FC<FooterIconProps> = ({
  alt,
  src,
  srcActive,
  text,
  path,
}) => {
  const router = useRouter();
  return (
    <Link
      href={path}
      className={`text-decoration-none ${
        router.pathname !== path ? "text-muted" : "text-dark"
      }`}
    >
      <div className="text-center">
        <ExportableImage
          src={router.pathname !== path ? src : srcActive}
          alt={alt}
          placeholder="blur"
          sizes={imageSizes.md_6_col}
          className="img-fluid"
        />
        <br />
        {text}
      </div>
    </Link>
  );
};

const Footer: React.FC = () => {
  const router = useRouter();

  if ([SITEMAP.dashboard, SITEMAP.qr].includes(router.pathname))
    return (
      <div className="container container-mobile bg-light fixed-bottom py-1">
        <div className="row d-flex align-items-center">
          <div className="col-4">
            <FooterIcon
              src={DashboardFooterIcon}
              srcActive={DashboardFooterActiveIcon}
              alt="dashboard footer"
              text="Dashboard"
              path={SITEMAP.dashboard}
            />
          </div>
          <div className="col-4 d-flex justify-content-center">
            <Link href={SITEMAP.qr}>
              <div
                className="p-3 d-inline-block bg-primary border border-primary rounded-circle shadow-lg position-relative"
                style={{ top: "-2rem" }}
              >
                <ExportableImage
                  src={QRScannerIcon}
                  alt="dashboard footer"
                  placeholder="blur"
                  sizes={imageSizes.md_6_col}
                  className="img-fluid"
                />
              </div>
            </Link>
          </div>
          <div className="col-4 d-flex justify-content-end">
            <FooterIcon
              src={CareGiverIcon}
              srcActive={CareGiverActiveIcon}
              alt="dashboard caregiver"
              text="caregivers list"
              path={SITEMAP.caregiversList}
            />
          </div>
        </div>
      </div>
    );
  return <></>;
};

export default Footer;
