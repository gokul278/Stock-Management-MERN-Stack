import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import cragxlogo from "../Assets/Images/Cragx Text-Logo - Light.png";
import { changeLoadingStatus } from "../slices/LoadingStatus";
import { useDispatch } from "react-redux";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({ username: "", password: "" });
  const [passwordShow, setpasswordShow] = useState(false);
  const [error, setError] = useState({ status: false, message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Stock Management - Login";
  });

  useEffect(() => {
    Axios.get(process.env.REACT_APP_API_URL + "/check", {
      headers: {
        Authorization: localStorage.getItem("JWTtoken"),
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.data.status === "success") {
        navigate("/dashboard");
      }
    });
  });

  const handleinput = (event) => {
    setError({ status: false, message: "" });

    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = () => {
    if (!loading) {
      setLoading(true);
      if (input.username.length > 0 && input.password.length > 0) {
        Axios.post(process.env.REACT_APP_API_URL + "login/", {
          username: input.username,
          password: input.password,
        }).then((res) => {
          if (res.data.status === "error") {
            setError({ status: true, message: res.data.message });
            setLoading(false);
          } else if (res.data.status === "success") {
            localStorage.setItem("JWTtoken", "Bearer " + res.data.token + "");
            dispatch(changeLoadingStatus(true));
            navigate("/dashboard");
          }
        });
      } else {
        setError({ status: true, message: "Enter Username & Password" });
        setLoading(false);
      }
    }
  };

  return (
    <div className="logincontainer flex flex-col items-center justify-center">
      <div
        className="bg-[#ffffff] w-[90%] md:w-[600px] rounded-[5px] flex flex-col items-center justify-center"
        style={{ boxShadow: "0px 0px 76px #000000" }}
      >
        <img src={cragxlogo} className="w-[200px]" alt="company Logo" />
        <div align="start" className="w-[90%]">
          <h1 className="text-[35px] font-dancing">Login</h1>
        </div>
        <div align="start" className="w-[90%] mt-[30px]">
          <label
            className="text-[17px] font-ptserif font-semibold text-[#444444]"
            htmlFor="useremail"
          >
            &nbsp;User Email
          </label>
          <input
            id="useremail"
            name="username"
            type="text"
            onInput={handleinput}
            value={input.username}
            placeholder="Enter User Email"
            className="peer mt-[2px] relative h-14 w-full font-ptserif font-semibold rounded border-[3px] border-transparent bg-[#D9D9D9] px-3 text-[16px] text-[#444444]  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-[3px] focus:border-[#1679AB] focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          />
        </div>
        <div align="start" className="w-[90%] mt-[20px]">
          <label
            className="text-[17px] font-ptserif font-semibold text-[#444444]"
            htmlFor="password"
          >
            &nbsp;Password
          </label>
          <div className="flex items-center justify-center">
            <input
              id="password"
              name="password"
              type={passwordShow ? "text" : "password"}
              onInput={handleinput}
              value={input.password}
              placeholder="Enter Password"
              className="peer mt-[2px] relative h-14 w-full font-ptserif font-semibold rounded border-[3px] border-transparent bg-[#D9D9D9] px-3 text-[16px] text-[#444444] outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-[3px] focus:border-[#1679AB] focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            />
            <div
              className="w-[50px] ml-[5px] h-[60px] rounded text-[20px] text-[#444444] bg-[#D9D9D9] flex items-center justify-center cursor-pointer"
              onClick={() => {
                passwordShow ? setpasswordShow(false) : setpasswordShow(true);
              }}
            >
              {passwordShow ? (
                <i className="fa-solid fa-eye-slash"></i>
              ) : (
                <i className="fa-solid fa-eye"></i>
              )}
            </div>
          </div>
        </div>
        <div className="w-[85%] mt-[20px]">
          {error.status ? (
            <div className="ml-[5px] py-[13px] rounded text-[18px] font-ptserif font-bold text-[white] bg-[#C40C0C] flex justify-center items-center transition-opacity duration-300 ease-in-out opacity-100">
              {error.message}
            </div>
          ) : null}
        </div>
        <div className="w-[90%] mt-[10px] mb-[30px]" align="center">
          <button
            className="pushable w-[200px] mt-[20px]"
            onClick={handleLogin}
          >
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front">
              {loading ? (
                <div className="flex">
                  <span>Loading </span> &nbsp;&nbsp;&nbsp;
                  <div className="btnloader">
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                    <div className="bar4"></div>
                    <div className="bar5"></div>
                    <div className="bar6"></div>
                    <div className="bar7"></div>
                    <div className="bar8"></div>
                    <div className="bar9"></div>
                    <div className="bar10"></div>
                    <div className="bar11"></div>
                    <div className="bar12"></div>
                  </div>
                </div>
              ) : (
                "Submit"
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
