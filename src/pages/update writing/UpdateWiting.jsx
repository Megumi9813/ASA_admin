import { useEffect, useState } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import "./updateWriting.scss";
import { db } from "../../firebase";
import {
  serverTimestamp,
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const UpdateWriting = ({ title, user }) => {
  const [data, setData] = useState({});
  const [task, setTask] = useState("");
  const [listOfTasks, setListOfTasks] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const [teacher, setTeacher] = useState([]);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };

  const handleArrayInput = (e) => {
    e.preventDefault();
    const arrayValue = e.target.value;
    setTask(arrayValue);
  };

  const currentUserImg = teacher
    .filter((item) => item.id === user.uid)
    .map((data) => data.img);

  const currentUserName = teacher
    .filter((item) => item.id === user.uid)
    .map((data) => data.displayName);

  function getRandomInt() {
    return Math.floor(Math.random() * (999 - 100 + 1) + 100);
  }

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "courses"), {
        ...data,
        timeStamp: serverTimestamp(),
        questionRightBottom: listOfTasks,
        submittedBy: currentUserName,
        submittedByImg: currentUserImg,
        path: getRandomInt(),
        type: "lesson",
        lessonImg:
          data.testType === "CELPIP"
            ? "https://firebasestorage.googleapis.com/v0/b/auth-development-676e2.appspot.com/o/celpip%20logo.png?alt=media&token=b14b0cf9-357d-4800-8267-ae38d1d29754"
            : "https://firebasestorage.googleapis.com/v0/b/auth-development-676e2.appspot.com/o/ielts.svg?alt=media&token=f419bcc3-f0ea-4928-a40d-69b3c2e0ba12",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user !== null) {
      setUserLoading(false);
    }
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "teachers"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setTeacher(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [user]);

  return (
    <div className="updateWriting">
      <div className="top">
        <div className="updateWriting_title">{title}</div>
      </div>
      <div className="bottom">
        <form onSubmit={handleAdd}>
          <div className="formInput">
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
                  <option id="courseType" value="basic-computer-skill">
                    Basic Computer Skill
                  </option>
                </select>
              </div>
              <div className="selection">
                <select id="testType" onChange={handleInput}>
                  <option value="">Select Test Type</option>
                  <option id="testType" value="CELPIP">
                    CELPIP
                  </option>
                  <option id="testType" value="IELTS">
                    IELTS
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
          <div className="formInput update_form">
            <div className="classRoom_container">
              <div className="classRoom_header">
                <div className="header_left">
                  <label>Title: </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="i.g.) Writing Task 1: Writing an Email"
                    onChange={handleInput}
                  />
                </div>
                <div className="timer">
                  <p>Time remaining: -- minutes -- seconds</p>
                </div>
              </div>
              <div className="classRoom_body">
                <div className="writing_question-left">
                  <div className="question_intro">
                    <ErrorIcon className="icon" />
                    Read the following information.
                  </div>
                  <label>Explanation of the situation: </label>
                  <div className="question_area">
                    <textarea
                      id="questionLeft"
                      type="text"
                      onChange={handleInput}
                      placeholder="i.g.) You recently made reservation for dinner at a very famous and expensive restaurant in town. However..."
                    ></textarea>
                  </div>
                </div>
                <div className="writing_question-right">
                  <div className="right-top">
                    <label>Main question including words limit: </label>
                    <div className="question_area">
                      <textarea
                        id="questionRightTop"
                        type="text"
                        onChange={handleInput}
                        placeholder="i.g.) Write an email to the restaurant's manager in about 150 - 200 words."
                      ></textarea>
                    </div>
                  </div>
                  <div className="right-bottom">
                    <label>Tasks or Options: </label>
                    <div className="task_input">
                      <input
                        id="questionRightBottom"
                        type="text"
                        value={task}
                        onChange={handleArrayInput}
                      />
                      <button
                        type="button"
                        className="task-button"
                        onClick={() => {
                          setTask("");
                          setListOfTasks([
                            ...listOfTasks,
                            {
                              id:
                                Number(
                                  listOfTasks.slice(-1).map((item) => item.id)
                                ) + 1,
                              task: task,
                            },
                          ]);
                        }}
                      >
                        Add
                      </button>
                    </div>
                    <ul>
                      {listOfTasks.map((listOfTask) => (
                        <div key={listOfTasks.id}>
                          <li>{listOfTask.task}</li>
                        </div>
                      ))}
                    </ul>
                  </div>
                  <div className="submit-btn">
                    <button type="submit">Add this question</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateWriting;
