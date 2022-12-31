import { useEffect, useState } from "react";
import "./addIeltsSpeaking.scss";
import { celpipSpeakingInputs } from "../../celpipSpeakingFormSourse";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { db, storage } from "../../firebase";
import {
  serverTimestamp,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAsyncValue, useNavigate } from "react-router-dom";
import { FortTwoTone } from "@mui/icons-material";

function AddIeltsSpeaking({ title, currentUserData, course, courseTitle }) {
  const [data, setData] = useState({});
  const [file, setFile] = useState("");
  const [per, setPerc] = useState(null);
  const [test, setTest] = useState([]);
  const [question, setQuestion] = useState([]);
  const [task1, setTask1] = useState("");
  const [task2, setTask2] = useState("");
  const [task3, setTask3] = useState("");
  const [task4, setTask4] = useState("");
  const [task5, setTask5] = useState("");
  const [task6, setTask6] = useState("");
  const [task7, setTask7] = useState("");
  const [task8, setTask8] = useState("");
  const [task9, setTask9] = useState("");
  const [task10, setTask10] = useState("");
  const [listOfQuestions, setListOfQuestions] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [numOfClass, setNumOfClass] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      const storageRef = ref(storage, file.name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
            setFile("");
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleInput1 = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const value = e.target.value;
    setTask1(value);
  };

  const handleInput2 = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const value = e.target.value;
    setTask2(value);
  };

  const handleInput3 = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const value = e.target.value;
    setTask3(value);
  };

  const handleInput4 = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const value = e.target.value;
    setTask4(value);
  };

  const handleInput5 = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const value = e.target.value;
    setTask5(value);
  };

  const handleInput6 = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const value = e.target.value;
    setTask6(value);
  };

  const handleInput7 = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const value = e.target.value;
    setTask7(value);
  };

  const handleInput8 = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const value = e.target.value;
    setTask8(value);
  };

  const handleInput9 = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const value = e.target.value;
    setTask9(value);
  };

  const handleInput10 = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const value = e.target.value;
    setTask10(value);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "courses"), {
        task1,
        task2,
        task3,
        task4,
        task5,
        task6,
        task7,
        task8,
        task9,
        task10,
        title: "IELTS Speaking " + (numOfClass.length + 1).toString(),
        timeStamp: serverTimestamp(),
        courseType: "IELTS Speaking",
        submittedBy: currentUserData.displayName,
        submittedByImg: currentUserData.img,
        priceId: "price_1MFTgvIfN2xQhHBIqvHA5wmg",
        price: 5500,
        testType: "IELTS",
        skill: "Speaking",
        lessonImg:
          "https://firebasestorage.googleapis.com/v0/b/auth-development-676e2.appspot.com/o/ielts.svg?alt=media&token=f419bcc3-f0ea-4928-a40d-69b3c2e0ba12",
      });
      navigate("/" + "questions" + "/" + "writing");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchNumberOfCelpipSpeaking = async () => {
      let list = [];
      try {
        const collectionRef = collection(db, "courses");
        const q = query(
          collectionRef,
          where("courseType", "==", "CELPIP Speaking")
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
    fetchNumberOfCelpipSpeaking();
  }, []);

  return (
    <div className="addIeltsSpeaking">
      {course ? (
        <div className="top">
          <div className="updateSpeaking-title">{courseTitle}</div>
        </div>
      ) : (
        <div className="top">
          <div className="updateSpeaking-title">{title}</div>
          <button onClick={handleAdd}>Submit</button>
        </div>
      )}

      <div className="bottom">
        <form>
          <div className="tasks">
            <div className="task">
              <div className="task-title">Part 1</div>
              <div className="question-container">
                <label>Question 1</label>
                {course ? (
                  <p>{course.task1}</p>
                ) : (
                  <textarea
                    placeholder="Question for Part 1 Question 1"
                    onChange={handleInput1}
                    id="task1"
                  ></textarea>
                )}
              </div>
              <div className="question-container">
                <label>Question 2</label>
                {course ? (
                  <p>{course.task2}</p>
                ) : (
                  <textarea
                    placeholder="Question for Part 1 Question 2"
                    onChange={handleInput2}
                    id="task2"
                  ></textarea>
                )}
              </div>
              <div className="question-container">
                <label>Question 3</label>
                {course ? (
                  <p>{course.task3}</p>
                ) : (
                  <textarea
                    placeholder="Question for Part 1 Question 3"
                    onChange={handleInput3}
                    id="task3"
                  ></textarea>
                )}
              </div>
              <div className="question-container">
                <label>Question 4</label>
                {course ? (
                  <p>{course.task4}</p>
                ) : (
                  <textarea
                    placeholder="Question for Part 1 Question 4"
                    onChange={handleInput4}
                    id="task4"
                  ></textarea>
                )}
              </div>
              <div className="question-container">
                <label>Question 5</label>
                {course ? (
                  <p>{course.task5}</p>
                ) : (
                  <textarea
                    placeholder="Question for Part 1 Question 5"
                    onChange={handleInput5}
                    id="task5"
                  ></textarea>
                )}
              </div>
            </div>
            <div className="task">
              <div className="task-title">Part 2</div>
              <div className="question-container">
                <label>Question</label>
                {course ? (
                  <p>{course.task6}</p>
                ) : (
                  <textarea
                    className="part2"
                    placeholder="Question for Part 2"
                    onChange={handleInput6}
                    id="task6"
                  ></textarea>
                )}
              </div>
            </div>
            <div className="task">
              <div className="task-title">Part 3</div>
              <div className="question-container">
                <label>Question 1</label>
                {course ? (
                  <p>{course.task7}</p>
                ) : (
                  <textarea
                    placeholder="Question for Part 3 Question 1"
                    onChange={handleInput7}
                    id="task7"
                  ></textarea>
                )}
              </div>
              <div className="question-container">
                <label>Question 2</label>
                {course ? (
                  <p>{course.task8}</p>
                ) : (
                  <textarea
                    placeholder="Question for Part 3 Question 2"
                    onChange={handleInput8}
                    id="task8"
                  ></textarea>
                )}
              </div>
              <div className="question-container">
                <label>Question 3</label>
                {course ? (
                  <p>{course.task9}</p>
                ) : (
                  <textarea
                    placeholder="Question for Part 3 Question 3"
                    onChange={handleInput9}
                    id="task9"
                  ></textarea>
                )}
              </div>
              <div className="question-container">
                <label>Question 4</label>
                {course ? (
                  <p>{course.task10}</p>
                ) : (
                  <textarea
                    placeholder="Question for Part 3 Question 4"
                    onChange={handleInput10}
                    id="task10"
                  ></textarea>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddIeltsSpeaking;
