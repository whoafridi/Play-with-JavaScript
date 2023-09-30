import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import logoSvg from "../assets/images/logo.svg";
import userPlaceholderImg from "../assets/images/user-placeholder.jpg";

import { imageSizes } from "./CONSTANTS";
import ExportableImage from "./ExportableImage";
import NavDropDown from "./NavDropDown";
import SITEMAP from "./SITEMAP";

const Navbar: React.FC = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const onRouteChange = () =>
      setTitle(document.getElementsByTagName("title")[0]?.innerText);
    onRouteChange();
    router.events.on("routeChangeComplete", onRouteChange);
    return () => router.events.off("routeChangeComplete", onRouteChange);
  }, []);

  return (
    <div className="container container-mobile bg-white fixed-top">
      <div className="row py-3 px-2 align-items-center">
        <div
          className={router.pathname === SITEMAP.dashboard ? "col-4" : "col-12"}
        >
          <button
            type="button"
            className="btn btn-transparent position-relative"
          >
            {(router.pathname === SITEMAP.dashboard && (
              <>
                <Link href={SITEMAP.notifications}>
                  <i className="fa fa-bell"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    9<span className="visually-hidden">unread messages</span>
                  </span>
                </Link>
              </>
            )) || (
              <span onClick={router.back}>
                <i className="fa fa-arrow-left me-2"></i> {title}
              </span>
            )}
          </button>
        </div>
        {router.pathname === SITEMAP.dashboard && (
          <>
            <div className="col-4 d-flex justify-content-center">
              <Link href={SITEMAP.dashboard}>
                <ExportableImage
                  src={logoSvg}
                  placeholder="blur"
                  sizes={imageSizes.md_6_col}
                  alt="shikor logo"
                  className="img-fluid"
                />
              </Link>
            </div>
            <div className="col-4 d-flex justify-content-end">
              <span
                className="d-flex justify-content-end"
                // onClick={toggleDropdown}
              >
                <ExportableImage
                  onClick={toggleDropdown}
                  src={userPlaceholderImg}
                  alt="profile logo"
                  className="img-fluid rounded-circle w-25 border btn p-0"
                />
              </span>
              <NavDropDown
                dropdownOpen={dropdownOpen}
                toggleDropdown={toggleDropdown}
                id="21234"
                name="Ashraf Ali"
                email="ashrafali@gmail.com"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
