import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Input from "../components/Input";
import Button from "../components/Button";
import { useCookies } from "react-cookie";

const Login = () => {
  const [cookies] = useCookies(["cookie-name"]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/dashboard");
    }
  }, [cookies, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateError = (err) => {
    toast.error(err, {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/login",
        { ...formData },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/dashboard");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container">
      <h2>Login Account</h2>
      <form onSubmit={handleSubmit}>
        <Input
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <Input
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <Button type="submit" className="bg">
          Submit
        </Button>
      </form>
      <h5 style={{ marginTop: "1.5rem" }}>
        Don't have an account? <Link to="/register">Register</Link>
      </h5>
      <ToastContainer />
    </div>
  );
};

export default Login;