import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./Component/navbar";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Courses from "./pages/courses";
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.css" 



function App() {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/Login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          draggable
          pauseOnHover
        />
      </>
    ); 
}

export default App;