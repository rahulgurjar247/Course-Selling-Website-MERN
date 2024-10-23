import { useNavigate } from "react-router-dom";
import devloper from "../assets/developer.png";

const CourseCard = ({
  id = "n",
  title = "hello",
  description = "nothing",
  price = "500",
  key,
}) => {
  const navigate = useNavigate();
  const handleCoursedetail = (e) => {
    e.preventDefault();
    console.log(e.target.id);
    navigate(`/courses/${e.target.id}`);
  };

  return (
    <div
      className="bg-white  w-72 h- rounded-3xl overflow-hidden"
      key={id}
      id={id}
    >
      <img src={devloper} className="bg-slate-400 w-full h-48" />
      <div className="p-4 pt-2 " id={id}>
        <div className="text-center text-wrap text-xl">{title}</div>
        <div className="text-pretty">{description}</div>
        <div className=" text-wrap text-xl">
          price:<span className="text-blue-700">{price}</span>
        </div>
        <div>
          <a
            href=""
            className="text-blue-700"
            id={id}
            onClick={handleCoursedetail}
          >
            checkout...
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
