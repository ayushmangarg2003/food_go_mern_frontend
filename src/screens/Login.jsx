import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handelSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://foodgomernbackend.onrender.com/api/loginuser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    const json = await response.json();

    if (!json.success) {
      alert("Enter valid Credentials");
    }
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      navigate("/");
    }
  };

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="fullheight">
      <Navbar />
      <div className="container mt-5">
        <form onSubmit={handelSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              value={credentials.email}
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={onchange}
            />
          </div>
          <button type="submit" className="btn text-white btn-info">
            Login
          </button>
          <Link to="/createuser" className="m-3 text-white btn btn-info">
            New User
          </Link>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
