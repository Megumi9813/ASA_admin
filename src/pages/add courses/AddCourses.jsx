import { useState } from "react";

function AddCourses({ title }) {
   const [data, setData] = useState({});

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };
  return (
    <div className="addCourses">
      <div className="top">
        <div className="addCourses-title">{title}</div>
      </div>
      <div className="bottom">
        <form>
          <div className="form-input">
            <div className="selections">
              <div className="selection">
                <select id="courseType" onChange={handleInput}>
                  <option value="">Select Course</option>
                  <option id="courseType" value="IELTS Writing">
                    IELTS Writing
                  </option>
                  <option id="courseType" value="CELPIP Writing">
                    CELPIP Writing
                  </option>
                  <option id="courseType" value="Basic Computer Skill">
                    Basic Computer Skill
                  </option>
                </select>
              </div>
              <div className="selection">
                <select id="testType" onChange={handleInput}>
                  <option value="">Select Test Type</option>
                  <option id="testType" value="IELTS">
                    IELTS
                  </option>
                  <option id="testType" value="CELPIP">
                    CELPIP
                  </option>
                </select>
              </div>
              <div className="selection">
                <select id="task" onChange={handleInput}>
                  <option value="">Select Task</option>
                  <option id="task" value="Task1">
                    Task 1
                  </option>
                  <option id="task" value="Task2">
                    Task 2
                  </option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCourses;
