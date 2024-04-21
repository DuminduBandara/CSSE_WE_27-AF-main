import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import Welcome from "../images/loginbanner.jpg";
import axios from "axios";

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const checkLogin = async () => {
    await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login Sucessfull",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/")
          return res.json();
        }
      })
      .then(async (data) => {
        console.log(data.refreshToken);
        localStorage.setItem("rfkey", data.refreshToken);
        localStorage.setItem("isLogged", true);
        await setUsername();
        window.location.reload(false);
      })
      .catch(() => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Login Failed",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const setUsername = async () => {
    await fetch("http://localhost:8080/api/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("username", data.username);
        console.log(data.username);
      });
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom h-100">
        <div className="" style={{display: "flex", justifyContent: "space-between"}}>
          <div className="d-flex justify-content-center align-items-center" style={{height: "1fr", width: "100%"}}>
            <img src={Welcome} className="img-fluid" alt="Sample" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1" style={{margin: "10rem 10rem"}}>
            <form>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <label className="form-label" for="form3Example3">
                  Email address
                </label>
              </div>

              <div className="form-outline mb-3">
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <label className="form-label" for="form3Example4">
                  Password
                </label>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form2Example3"
                  />
                  <label className="form-check-label" for="form2Example3">
                    Remember me
                  </label>
                </div>
                <a href="#!" className="text-body">
                  Forgot password?
                </a>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  onClick={() => {
                    checkLogin();
                  }}
                >
                  Login
                </button>

                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                  <a href="/register" className="link-danger">
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
