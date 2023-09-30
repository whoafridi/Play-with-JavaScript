import { useRouter } from "next/router";
import { useEffect } from "react";
import SITEMAP from "../components/SITEMAP";

const Index: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    router.push(SITEMAP.login);
  }, []);
  return <></>;
};

export default Index;
