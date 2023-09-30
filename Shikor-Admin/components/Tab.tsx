import Link from "next/link";
import SITEMAP from "./SITEMAP";
import { useRouter } from "next/router";


const Tab: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <hr />
      <ul className="nav justify-content-around">
        <li className="nav-item pe-2 small">
          <Link
            className={`text-decoration-none nav-link ${router.pathname === SITEMAP.devicesList ? "active": ""}`}            
            href={SITEMAP.devicesList}
          >
            Devices list
          </Link>
        </li>
        <li className="nav-item pe-2 small">
          <Link
            className={`text-decoration-none nav-link ${router.pathname === SITEMAP.caregiversList ? "active": ""}`}
            href={SITEMAP.caregiversList}
          >
            Caregivers list
          </Link>
        </li>
        <li className="nav-item pe-2 small">
          <Link
            className={`text-decoration-none nav-link ${router.pathname === SITEMAP.sos ? "active": ""}`}
            href={SITEMAP.sos}
          >
            SOS history
          </Link>
        </li>
      </ul>
      <hr />
    </>
  );
};

export default Tab;
