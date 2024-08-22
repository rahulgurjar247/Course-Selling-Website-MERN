import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Signup = () => {
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = async (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  // onsubmit handle data
  async function handlesubmit(e) {
    e.preventDefault();
    if (formdata.email != "" && formdata.password != "") {
      try {
        const res = await fetch("http://localhost:8000/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ formdata }),
        });

        const data = await res.json();
        console.log(data);
        if (data.success) {
          toast("wow you create a new account ")
          const deley = new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve()
            },2000)
          })
          navigate("/login");
        }
      } catch (error) {
        console.log("error is :", error);
        
      }
    } else {
      toast.warn(" please fill form first",{
        autoClose: 5000,
        progress: true,
        position: "top-center",
      });
    }
  }

  useEffect(() => {
    async function islogin() {
      const res = await axios("http://localhost:8000/users/authentication", {
        method:"post",        
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials : true,
      });
      console.log(res.data);
      if (res.data.success) {
        toast("you already signIn in this devics", {
          autoClose:true,
          progress: true,
          position :"top-center"
        });
        navigate("/home");
        return
      } else {
        toast("create a good looking account", {
          autoClose: true,
          position : "top-center"
        });        
      }
    };
    islogin()
  }, []);

  return (
    <div className="w-full m-auto pt-28 Loginform h-[calc(100vh-60px)] flex flex-col items-center gap-2 p-3 text-lg font-mono bg-slate-50 ">
      <h1 className="font-semibold text-2xl ">SignUp </h1>
      <form className=" w-80 flex flex-col gap-8 ">
        <div className="flex flex-col">
          <label htmlFor="email" className="font-medium">
            Email:
          </label>
          <input
            type="text"
            name="email"
            value={formdata.email}
            placeholder="Enter your email"
            className="outline-none bg-slate-50 border-b"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="font-medium">
            Password:
          </label>
          <input
            type="text"
            name="password"
            placeholder="Enter your password"
            className="outline-none bg-slate-50 border-b"
            value={formdata.password}
            onChange={handleChange}
          />
        </div>

        <div className="">
          <button
            className="text-center font-medium w-full bg-slate-200 "
            onClick={handlesubmit}
          >
            SignUp
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
