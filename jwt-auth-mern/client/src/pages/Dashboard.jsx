import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const [cookies,removeCookie] = useCookies([]);

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = axios.post(
          "http://localhost:3000",
          {},
          { withCredentials: true }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else {
          toast(`hi ${data.user}`);
        }
      }
    };

    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };
  return (
    <>
      <div className="container">
        Dashboard 
        <Button onClick={logOut}>logout</Button>;
        <ToastContainer />
      </div>
    </>
  );
};

export default Dashboard;
