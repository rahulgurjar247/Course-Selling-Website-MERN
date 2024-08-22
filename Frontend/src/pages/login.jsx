import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { LoginContext } from "../Component/context";
import axios from "axios";

export default function Login() {

  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  
  async function handlesubmit(e) {
    e.preventDefault();
    if (formdata.email != "" && formdata.password != "") {
      try {
        const response = await fetch("http://localhost:8000/users/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials : "include",
          body: JSON.stringify({ formdata }),
        });

        const data = await response.json()
        console.log(data);
        if (data.success) { 
          toast("login success")
          const deley = new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve()
            },2000)
          })
          navigate("/home")
        }

      } catch (error) {
        console.log("error :",error)
      }
      
    } else {
      toast("fill the form first", {
        rtl: true,
        progress: 5000,
        position :"top-center"
      })
    }
  }

  useEffect(() => {
    (async function islogin() {
      const res = await axios("http://localhost:8000/users/authentication", {
        method : "post",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials : true,
        data : JSON.stringify(),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        navigate("/home");
      }
    })();
  }, []);

  return (
    <div className="w-full m-auto pt-28 Loginform h-[calc(100vh-60px)] flex flex-col items-center gap-2 p-3 text-lg font-mono bg-slate-50 ">
      <h1 className="font-semibold text-2xl ">Login </h1>
      <form className="flex flex-col gap-2 w-80">
        <div className="flex flex-col">
          <label htmlFor="email" className="font-medium">
            Email:
          </label>
          <input
            type="text"
            name="email"
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
            onChange={handleChange}
          />
        </div>

        <div className="submitLogin flex flex-col gap-1">
          <button
            className="text-center font-medium w-full bg-slate-200"
            onClick={handlesubmit}
          >
            Login
          </button>
          <p>
            dont have an account <Link to="/signup">SignIn</Link>{" "}
          </p>
        </div>
      </form>
    </div>
  );
}
