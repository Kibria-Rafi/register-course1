import { useState } from "react";
import { useEffect } from "react";
import Cart from "../Cart/Cart";
import { FaDollarSign } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [allCourse, setAllCourse] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [remaning, setRemaing] = useState(20);
  const [totalCredit, setTotalCredit] = useState(0);
  const [prices, setprices] = useState(0);

  useEffect(() => {
    fetch("Course.json")
      .then((res) => res.json())
      .then((data) => setAllCourse(data));
  }, []);

  const handleSelectCourse = (course) => {
    const isExist = selectedCourse.find((item) => item.id == course.id);

    let count = course.creditHour;
    let prices = course.price;

    if (isExist) {
      toast('Already Selected!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } else {
      selectedCourse.forEach((item) => {
        count = count + item.creditHour;
        prices = prices + item.price;
      });
      const totalRemaing = 20 - count;
      if (count > 20) {
       return toast('Total Credit maximum Reached!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      } else {
        setTotalCredit(count);
        setprices(prices);
        setRemaing(totalRemaing);
        setSelectedCourse([...selectedCourse, course]);
      }
    }
  };
  // console.log(selectedCourse)

  return (
    <div>
      <h2 className="text-3xl font-bold text-center m-6">
        Course Registration
      </h2>
      <div className="flex gap-10">
        <div className="grid grid-cols-3 gap-6 ms-40">
          {allCourse.map((course) => (
            <div
              key={course.id}
              className="w-64 h-80 shadow-xl p-5  rounded-lg"
            >
              <img src={course.Course_img} alt="" />
              <h1 className="font-bold">{course.CourseTitle}</h1>
              <p>
                <small>{course.description}</small>
              </p>

              <div className="flex gap-4 items-center">
                <FaDollarSign></FaDollarSign>
                <p>Price: {course.price}</p>
                <img src={course.icon} alt="" />
                <p> Credit:{course.creditHour} hr</p>
                </div>
              
              <button
                onClick={() => handleSelectCourse(course)}
                className="mt-3 rounded-lg px-10 py-1 w-full text-white bg-[#2F80ED]"
              >
                Select
              </button>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              {/* Same as */}
              <ToastContainer />
            </div>
          ))}
        </div>
        {/* slider */}
        <div className="">
          <Cart
            selectedCourse={selectedCourse}
            remaning={remaning}
            totalCredit={totalCredit}
            prices={prices}
          ></Cart>
        </div>
      </div>
    </div>
  );
};

export default Header;
