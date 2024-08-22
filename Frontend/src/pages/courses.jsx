import { toast } from "react-toastify";
import devloper from "../assets/developer.png";
import { useEffect, useState } from "react";

export function CourseCard( id="n",title="hello",description="nothing",price="500") {
  return (
    <>
     <div className="bg-white  w-72 h- rounded-3xl overflow-hidden">
              <img src={devloper} className="bg-slate-400 w-full h-48" />
              <div className="p-4 pt-2 ">
                <div className="text-center text-wrap text-xl">{title}</div>
                <div className="text-pretty">
                  {description}
                </div>
                <div className=" text-wrap text-xl">
                  price:<span className="text-blue-700">{price}</span>
                </div>
              </div>
            </div>
    </>
  )
}  

function Courses() {
  const [courses, setcourses] = useState([]);
  
  useEffect(() => {
    (async function fetchdata(){
      try {
        const res = await fetch("http://localhost:8000/users/courses", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
  
        const data = await res.json();
        const result = await data.course;
        setcourses(result);
        console.log(result);
      } catch (err) {
        toast.error(err);
      }
    }());    
  },[])

  return (
    <>
      <div
        className="min-h-[calc(100vh-60px)]  bg-slate-100 w-full p-20  pb-10 flex gap-14 flex-wrap font-mono"
      >
        {courses.map((course) => {
          return (
            <div
              className="bg-white  w-72 h- rounded-3xl overflow-hidden"
              key={course.title}
            >
              <img src={devloper} className="bg-slate-400 w-full h-48" />
              <div className="p-4 pt-2 ">
                <div className="text-center text-wrap text-xl">
                  {course.title}
                </div>
                <div className="text-pretty">{course.description}</div>
                <div className=" text-wrap text-xl">
                  price:<span className="text-blue-700">{course.price}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Courses;
