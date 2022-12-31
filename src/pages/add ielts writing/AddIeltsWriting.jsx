import { useEffect, useState } from "react";
import "./addIeltsWriting.scss";
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

function AddIeltsWriting({ title, currentUserData, course, courseTitle }) {
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState({});
  const [task1, setTask1] = useState("");
  const [listOfTasks1, setListOfTasks1] = useState([]);
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
        },
        title: "IELTS Writing " + (numOfClass.length + 1).toString(),
        timeStamp: serverTimestamp(),
        courseType: "IELTS Writing",
        submittedBy: currentUserData.displayName,
        submittedByImg: currentUserData.img,
        priceId: "price_1M9I0ZIfN2xQhHBI8HC2VrT7",
        price: 4500,
        testType: "IELTS",
        skill: "Writing",
        lessonImg:
          "https://firebasestorage.googleapis.com/v0/b/auth-development-676e2.appspot.com/o/ielts.svg?alt=media&token=f419bcc3-f0ea-4928-a40d-69b3c2e0ba12",
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
          where("courseType", "==", "IELTS Writing")
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

  return (
    <div className="addIeltsWriting">
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
                  You should spend about 20 minutes on this task.
                </div>
                <div className="classRoom_middle">
                  <div className="question-container">
                    {course ? (
                      <p>{course.Task1.questionTop}</p>
                    ) : (
                      <textarea
                        className="questionTop"
                        id="questionTop"
                        type="text"
                        onChange={handleInput1}
                        placeholder="i.g.) You live in a room in college which you share with another student. However, there are many problems with this arrangement and you find it very difficult to work. "
                      ></textarea>
                    )}
                  </div>
                  <div className="question-container">
                    {course ? (
                      <p>{course.Task1.questionMiddle}</p>
                    ) : (
                      <input
                        type="text"
                        id="questionMiddle"
                        onChange={handleInput1}
                        placeholder="i.g.) Write a letter to the accommodation officer at the college. In the letter, "
                      />
                    )}
                  </div>
                  {course ? (
                    <ul>
                      {course.Task1.questionRightBottom.map((item) => (
                        <li key={item.id}>{item.task}</li>
                      ))}
                    </ul>
                  ) : (
                    <>
                      <div className="question-container question-bottom">
                        <input
                          id="questionBottom"
                          type="text"
                          placeholder="i.g.) describe the situation"
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
                    </>
                  )}
                </div>
                <div className="classRoom_bottom">
                  <p className="classRoom_bottom-text">
                    Write at least 150 words.
                  </p>
                  <p className="classRoom_bottom-text">
                    You do <p className="bold space"> NOT </p> need to write any
                    addresses.
                  </p>
                  <p className="classRoom_bottom-text">
                    Begin your letter as follows:
                  </p>
                  <p className="classRoom_bottom-text">
                    <p className="bold">Dear Sir or Madam,</p>
                  </p>
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
                  <p>You should spend about 40 minutes on this task.</p>
                  <p>Write about the following topic:</p>
                </div>
                <div className="classRoom_middle">
                  <div className="question-container">
                    {course ? (
                      <p>{course.Task2.questionTop}</p>
                    ) : (
                      <textarea
                        className="questionTop"
                        id="questionTop"
                        type="text"
                        onChange={handleInput2}
                        placeholder="i.g.) In Britain, when someone gets old they often go to live in a home with other old people where there are nurses to look after them. Sometimes the government has to pay for this care."
                      ></textarea>
                    )}
                  </div>
                  <div className="question-container">
                    {course ? (
                      <p>{course.Task2.questionMiddle}</p>
                    ) : (
                      <textarea
                        id="questionMiddle"
                        type="text"
                        onChange={handleInput2}
                        placeholder="i.g.) Who do you think should pay for this care, the government or the family?"
                      ></textarea>
                    )}
                  </div>
                  <div className="question-container">
                    {course ? (
                      <p>{course.Task2.questionBottom}</p>
                    ) : (
                      <textarea
                        id="questionBottom"
                        type="text"
                        onChange={handleInput2}
                        placeholder="i.g.) Give reasons for your answer and include any relevant examples from your own knowledge or experience. "
                      ></textarea>
                    )}
                  </div>
                </div>
                <div className="classRoom_bottom">
                  <p className="classRoom_bottom-text">
                    Write at least 250 words.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddIeltsWriting;
