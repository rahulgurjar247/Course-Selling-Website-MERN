import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../Hooks/Fetch";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState("");
  const [login, setlogin] = useState(false);
  const [purchaseCourse, setpurchaseCourse] = useState([]);
  const url = "http://localhost:8000/users/authentication"      
   
 
  useEffect(() => {
    function fetch(){
      axios(url, {
        method: "post",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({"hello":"hyy"}),
      })
        .then((response) => {
          console.log(response);          
          if (response.data.success) {
            setlogin(true);
            setuser(response.data.user);
          } else {
            navigate("/login")
          }
        })
        .catch((err) => {
          console.log("requset err", err);
        });
    };
    fetch()
  }, [url]);
  
  

  async function showcourse() {
     const res = await fetch("http://localhost:8000/users/purchased", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       credentials: "include",
       body: JSON.stringify({ email: user }),
     });
        const data = await res.json();
        console.log(data);
        if (!data.success) {
          navigate("/login");
        }
    setpurchaseCourse(data.courses);
    console.log(purchaseCourse)
  }

  const handleLogout = (e) => {
    const cookie = document.cookie
    const cookiearray = cookie.split("=")
    console.log(cookiearray)
    
  }

  return (
    <>
      <div className="bg-slate-100 min-h-[calc(100vh-60px)]">
        <button className="absolute right-5 mt-4 bg-yellow-500  p-2 rounded-3xl" onClick={handleLogout}>
          {""}
          Logout
        </button>
        <h1 className="text-center pt-12 text-4xl">
          dear <span className="text-green-600">{user}</span>
        </h1>
        <h1 className="text-center text-4xl">Pratics makes you perfect</h1>
        <h1 className="text-center text-4xl">
          that why learn from good mentor
        </h1>

        <div className="flex flex-col gap-6 mt-14 p-10 border-2">
          <h2 className="text-center text-3xl text-slate-700">
            Purchase courses 
            <button
              className="bg-blue-800 text-black "
              onClick = {showcourse}
            > Show course</button>
          </h2>
          <div className="flex gap-10">
            {purchaseCourse.map((course) => {
              return (
                <>
                  <div className="w-64 h-80 border-2 flex flex-col gap-4">
                    <div>{course.title}</div>
                    <div> {course.description} </div>
                    <div> {course.price} </div>
                  </div>
                </>
              )
              
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
