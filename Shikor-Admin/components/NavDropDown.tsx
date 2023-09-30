import Link from "next/link";

import userPlaceholderImg from "../assets/images/user-placeholder.jpg";

import Button from "./Button";
import SITEMAP from "./SITEMAP";
import ExportableImage from "./ExportableImage";

type Props = {
  dropdownOpen: boolean;
  toggleDropdown: () => void;
  id: string;
  name: string;
  email: string;
};

const NavDropDown: React.FC<Props> = ({
  dropdownOpen,
  toggleDropdown,
  id,
  name,
  email,
}) => {
  if (dropdownOpen)
    return (
      <>
        <div tabIndex={1} onBlur={toggleDropdown}  className="w-65 dropdown-menu dropdown-menu-end border-0 shadow rounded-4 mt-5 show">
          <div className="p-2 text-center">
            <ExportableImage
              src={userPlaceholderImg}
              alt="profile logo"
              className="img-fluid rounded-circle w-25 border btn p-0"
            />
            <div className="mt-3">
              <h6 className="fw-bold">{name}</h6>
              <p className="text-muted">{email}</p>
              <Link href={SITEMAP.account + "?id=" + id}>
                <Button className="fs-6 py-2 px-4" outline>
                  Manage your account
                </Button>
              </Link>
              <br />
              <Link href={SITEMAP.login} className="text-decoration-none">
                <Button className="float-end my-3 px-4" danger>
                  <i className="fa-solid fa-right-from-bracket me-1"></i>
                  LogOut
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  return <></>;
};

export default NavDropDown;
