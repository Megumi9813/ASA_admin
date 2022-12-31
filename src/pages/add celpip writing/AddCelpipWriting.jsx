import { useEffect, useState } from "react";
import "./addCelpipWriting.scss";
import ErrorIcon from "@mui/icons-material/Error";
import { db } from "../../firebase";
import {
  serverTimestamp,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function AddCelpipWriting({ title, currentUserData, course, courseTitle }) {
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState({});
  const [task1, setTask1] = useState("");
  const [listOfTasks1, setListOfTasks1] = useState([]);
  const [task2, setTask2] = useState("");
  const [listOfTasks2, setListOfTasks2] = useState([]);
  const [numOfClass, setNumOfClass] = useState([]);
  const navigate = useNavigate();

  const handleInput1 = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData1({ ...data1, [id]: value });
  };
  const handleInput2 = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData2({ ...data2, [id]: value });
  };

  const handleArrayInput1 = (e) => {
    e.preventDefault();
    const arrayValue = e.target.value;
    setTask1(arrayValue);
  };
  const handleArrayInput2 = (e) => {
    e.preventDefault();
    const arrayValue = e.target.value;
    setTask2(arrayValue);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "courses"), {
        Task1: {
          ...data1,
          questionRightBottom: listOfTasks1,
        },
        Task2: {
          ...data2,
          questionRightBottom: listOfTasks2,
        },
        title: "CELPIP Writing " + (numOfClass.length + 1).toString(),
        timeStamp: serverTimestamp(),
        courseType: "CELPIP Writing",
        submittedBy: currentUserData.displayName,
        submittedByImg: currentUserData.img,
        priceId: "price_1MCuWGIfN2xQhHBINfYfbeOG",
        price: 4500,
        testType: "CELPIP",
        skill: "Writing",
        lessonImg:
          "https://firebasestorage.googleapis.com/v0/b/auth-development-676e2.appspot.com/o/celpip%20logo.png?alt=media&token=b14b0cf9-357d-4800-8267-ae38d1d29754",
      });
      navigate("/" + "questions" + "/" + "writing");
      console.log("success!");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchNumberOfCelpipWriting = async () => {
      let list = [];
      try {
        const collectionRef = collection(db, "courses");
        const q = query(
          collectionRef,
          where("courseType", "==", "CELPIP Writing")
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((courseDoc) => {
          list.push({ id: courseDoc.id });
        });
        setNumOfClass(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNumberOfCelpipWriting();
  }, []);

  console.log(course);

  return (
    <div className="addCelpipWriting">
      {course ? (
        <div className="top">
          <div className="addCelpipWriting-title">{courseTitle}</div>
        </div>
      ) : (
        <div className="top">
          <div className="addCelpipWriting-title">{title}</div>
          <button onClick={handleAdd}>Submit</button>
        </div>
      )}
      <div className="bottom">
        <div className="task-container">
          <div className="task-title">Task1</div>
          <form>
            <div className="formInput update_form">
              <div className="classRoom_container">
                <div className="classRoom_header">
                  <div className="header_left">
                    <label>Writing Task 1: Writing an Email</label>
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
                    {course ? (
                      <div className="question_area">
                        {course.Task1.questionLeft}
                      </div>
                    ) : (
                      <>
                        <label>Explanation of the situation: </label>
                        <div className="question_area">
                          <textarea
                            id="questionLeft"
                            type="text"
                            onChange={handleInput1}
                            placeholder="i.g.) You recently made reservation for dinner at a very famous and expensive restaurant in town. However..."
                          ></textarea>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="writing_question-right">
                    {course ? (
                      <div className="right-top">
                        <div className="question_area">
                          {course.Task1.questionRightTop}
                        </div>
                      </div>
                    ) : (
                      <div className="right-top">
                        <label>Main question including words limit: </label>
                        <div className="question_area">
                          <textarea
                            id="questionRightTop"
                            type="text"
                            onChange={handleInput1}
                            placeholder="i.g.) Write an email to the restaurant's manager in about 150 - 200 words."
                          ></textarea>
                        </div>
                      </div>
                    )}
                    {course ? (
                      <div className="right-bottom">
                        <ul>
                          {course.Task1.questionRightBottom.map((item) => (
                            <li key={item.id}>{item.task}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="right-bottom">
                        <label>Tasks or Options: </label>
                        <div className="task_input">
                          <input
                            id="questionRightBottom"
                            type="text"
                            value={task1}
                            onChange={handleArrayInput1}
                          />
                          <button
                            type="button"
                            className="task-button"
                            onClick={() => {
                              setTask1("");
                              setListOfTasks1([
                                ...listOfTasks1,
                                {
                                  id:
                                    Number(
                                      listOfTasks1
                                        .slice(-1)
                                        .map((item) => item.id)
                                    ) + 1,
                                  task: task1,
                                },
                              ]);
                            }}
                          >
                            Add
                          </button>
                        </div>
                        <ul>
                          {listOfTasks1.map((listOfTask1) => (
                            <div key={listOfTasks1.id}>
                              <li>{listOfTask1.task}</li>
                            </div>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="task-container">
          <div className="task-title">Task2</div>
          <form>
            <div className="formInput update_form">
              <div className="classRoom_container">
                <div className="classRoom_header">
                  <div className="header_left">
                    <label>
                      Writing Task 2: Responding to Survey Questions
                    </label>
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
                    {course ? (
                      <div className="question_area">
                        {course.Task2.questionLeft}
                      </div>
                    ) : (
                      <>
                        <label>Explanation of the situation: </label>
                        <div className="question_area">
                          <textarea
                            id="questionLeft"
                            type="text"
                            onChange={handleInput2}
                            placeholder="i.g.) You recently made reservation for dinner at a very famous and expensive restaurant in town. However..."
                          ></textarea>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="writing_question-right">
                    {course ? (
                      <div className="right-top">
                        <div className="question_area">
                          {course.Task2.questionRightTop}
                        </div>
                      </div>
                    ) : (
                      <div className="right-top">
                        <label>Main question including words limit: </label>
                        <div className="question_area">
                          <textarea
                            id="questionRightTop"
                            type="text"
                            onChange={handleInput2}
                            placeholder="i.g.) Write an email to the restaurant's manager in about 150 - 200 words."
                          ></textarea>
                        </div>
                      </div>
                    )}
                    {course ? (
                      <div className="right-bottom">
                        <ul>{course.Task2.questionRightBottom.map((item) => (
                          <li key={item.id}>{item.task}</li>
                        ))}</ul>
                      </div>
                    ) : (
                      <div className="right-bottom">
                        <label>Tasks or Options: </label>
                        <div className="task_input">
                          <input
                            id="questionRightBottom"
                            type="text"
                            value={task2}
                            onChange={handleArrayInput2}
                          />
                          <button
                            type="button"
                            className="task-button"
                            onClick={() => {
                              setTask2("");
                              setListOfTasks2([
                                ...listOfTasks2,
                                {
                                  id:
                                    Number(
                                      listOfTasks2
                                        .slice(-1)
                                        .map((item) => item.id)
                                    ) + 1,
                                  task: task2,
                                },
                              ]);
                            }}
                          >
                            Add
                          </button>
                        </div>
                        <ul>
                          {listOfTasks2.map((listOfTask2) => (
                            <div key={listOfTasks2.id}>
                              <li>{listOfTask2.task}</li>
                            </div>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* <div className="submit-btn">
                      <button type="submit">Add this question</button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCelpipWriting;
