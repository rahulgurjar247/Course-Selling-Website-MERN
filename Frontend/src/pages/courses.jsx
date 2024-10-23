import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import CourseCard from "../Component/courseCard";

function Courses() {
  const [courses, setcourses] = useState([]);

  useEffect(() => {
    (async function fetchdata() {
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
    })();
  }, []);

  return (
    <>
      <div className="min-h-[calc(100vh-60px)]  bg-slate-100 w-full p-20  pb-10 flex gap-14 flex-wrap font-mono">
        {courses.map((course) => {
          return (
            <CourseCard
              id={course._id}
              title={course.title}
              description={course.description}
              price={course.price}
              key={course._id}
            />
          );
        })}
      </div>
    </>
  );
}

export default Courses;
