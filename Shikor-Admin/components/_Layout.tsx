import Head from "next/head";
import { useRouter } from "next/router";

import Footer from "./Footer";
import HeadSEO from "./HeadSEO";
import SITEMAP from "./SITEMAP";
import Navbar from "./Navbar";
import PopUp from "./PopUp";

const Layout: React.FC = ({ children }) => {
  const router = useRouter();

  return (
    <div className="d-flex flex-column min-vh-100 container-mobile mx-auto container">
      <Head>
        <HeadSEO />
        <link
          rel="canonical"
          href={`https://${SITEMAP.host}${router.pathname}/`}
        />
      </Head>
      <Navbar />
      <main className="flex-grow-1 py-5 my-5">
        <PopUp />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
