

const Cart = ({selectedCourse,remaning,totalCredit,prices}) => {
    console.log(selectedCourse);

    
    return (
        <div  className="w-auto h-auto shadow-xl p-5 rounded-lg">
            <h1 className="text-xl font-bold text-[#2F80ED]">Credit Hour Remaining {remaning}  hr</h1>
              <br />
              <hr />
              <h1 className="font-bold">Course Name: </h1>
              {
                selectedCourse.map((course)=>(<ul className=""> 
                    
                    <li >{course.CourseTitle} </li>
                   
                  </ul>))
              }
              <br />
              <hr />
              <h3>Total Credit hour: {totalCredit}  </h3>
              <hr />
              <h3>Total Price : {prices} USD</h3>

              
            </div>
    );
};

export default Cart;