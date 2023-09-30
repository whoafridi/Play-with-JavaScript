import Head from "next/head";

import SITEMAP from "../components/SITEMAP";
import Layout from "../components/_Layout";

const Page404: React.FC = () => (
  <>
    <Head>
      <title>Not Found - Shikor</title>
      <link rel="canonical" href={`https://${SITEMAP.host}/404`} />
    </Head>
    <section className="py-5">
      <div className="container mt-5">
        <h2 className="text-center">Page Not Found</h2>
      </div>
    </section>
  </>
);

Page404.Layout = Layout;

export default Page404;
