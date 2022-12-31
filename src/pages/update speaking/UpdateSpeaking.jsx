import { useEffect, useState } from "react";
import "./updateSpeaking.scss";
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
import { useNavigate } from "react-router-dom";
import { FortTwoTone } from "@mui/icons-material";
import ImageIcon from "@mui/icons-material/Image";
import { Modal } from "react-bootstrap";

function UpdateSpeaking({ title, currentUserData, course, courseTitle }) {
  const [data, setData] = useState([]);
  const [file, setFile] = useState("");
  const [per, setPerc] = useState(null);
  const [test, setTest] = useState([]);
  const [question, setQuestion] = useState([]);
  const [input, setInput] = useState([]);
  const [task1, setTask1] = useState({});
  const [task2, setTask2] = useState({});
  const [task3, setTask3] = useState({});
  const [task4, setTask4] = useState({});
  const [task5, setTask5] = useState({});
  const [task6, setTask6] = useState({});
  const [task7, setTask7] = useState({});
  const [task8, setTask8] = useState({});
  const [listOfQuestions, setListOfQuestions] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [numOfClass, setNumOfClass] = useState([]);
  const [fileName, setFileName] = useState("");
  const [img3, setImg3] = useState("");
  const [showImg3, setShowImg3] = useState(false);

  const handleCloseImg3 = () => setShowImg3(false);
  const handleShowImg3 = () => setShowImg3(true);

  const navigate = useNavigate();

  //   function uploadFile() {
  //     const name = new Date().getTime() + file.name;

  //     const storageRef = ref(storage, file.name);

  //     const uploadTask = uploadBytesResumable(storageRef, file);

  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log("Upload is " + progress + "% done");
  //         setPerc(progress);
  //         switch (snapshot.state) {
  //           case "paused":
  //             console.log("Upload is paused");
  //             break;
  //           case "running":
  //             console.log("Upload is running");
  //             break;
  //           default:
  //             break;
  //         }
  //       },
  //       (error) => {
  //         console.log(error);
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //           setData((prev) => ({ ...prev, imgPic: downloadURL }));
  //         });
  //       }
  //     );
  //   }

  const handleInput1 = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const value = e.target.value;
    setTask1({ task: value, label: "Task 1: Giving Advice" });
  };

  const handleInput2 = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const value = e.target.value;
    setTask2({
      task: value,
      label: "Task 2: Talking about a Personal Experience",
    });
  };

  const handleInput3 = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const value = e.target.value;
    setTask3({ task: value, label: "Task 3: Describing a Scene" });
  };

  const handleInput4 = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const value = e.target.value;
    setTask4({ task: value, label: "Task 4: Making Predictions" });
  };

  const handleInput5 = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const value = e.target.value;
    setTask5({ task: value, label: "Task 5: Comparing and Persuading" });
  };

  const handleInput6 = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const value = e.target.value;
    setTask6({
      task: value,
      label: "Task 6: Dealing with a Difficult Situation",
    });
  };

  const handleInput7 = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const value = e.target.value;
    setTask7({ task: value, label: "Task 7: Expressing Opinions" });
  };

  const handleInput8 = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const value = e.target.value;
    setTask8({ task: value, label: "Task 8: Describing an Unusual Situation" });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "courses"), {
        tasks: [task1, task2, task3, task4, task5, task6, task7, task8],
        title: "CELPIP Speaking " + (numOfClass.length + 1).toString(),
        timeStamp: serverTimestamp(),
        courseType: "CELPIP Speaking",
        submittedBy: currentUserData.displayName,
        submittedByImg: currentUserData.img,
        priceId: "price_1MDYECIfN2xQhHBI9KPGHwBO",
        price: 5500,
        testType: "CELPIP",
        skill: "Speaking",
        lessonImg:
          "https://firebasestorage.googleapis.com/v0/b/auth-development-676e2.appspot.com/o/celpip%20logo.png?alt=media&token=b14b0cf9-357d-4800-8267-ae38d1d29754",
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

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.then(() => {
        getDownloadURL(storageRef).then((downloadURL) => {
          setData([...data, { img: downloadURL }]);
        });
      });
    };
    file && uploadFile();
  }, [file]);

  console.log(data);

  return (
    <>
      <div className="updateSpeaking">
        <div className="top">
          {course ? (
            <div className="updateSpeaking-title">{courseTitle}</div>
          ) : (
            <>
              <div className="updateSpeaking-title">{title}</div>
              <div className="submit-btn">
                <button onClick={handleAdd}>Submit</button>
              </div>
            </>
          )}
        </div>
        <div className="bottom">
          <form>
            <div className="tasks">
              <div className="task">
                <label className="task-title">Task 1: Giving Advice</label>
                <div className="task-body">
                  {course ? (
                    <p>{course.tasks[0].task}</p>
                  ) : (
                    <textarea
                      onChange={handleInput1}
                      placeholder="Question for Task 1"
                      id="task1"
                    />
                  )}
                </div>
              </div>
              <div className="task">
                <label className="task-title">
                  Task 2: Talking about a Personal Experience
                </label>
                <div className="task-body">
                  {course ? (
                    <p>{course.tasks[1].task}</p>
                  ) : (
                    <textarea
                      onChange={handleInput2}
                      placeholder="Question for Task 2"
                      id="task2"
                    />
                  )}
                </div>
              </div>
              <div className="task">
                <div className="task-title-wrapper">
                  <div className="task-title">Task 3: Describing a Scene</div>
                  {/* {img3 ? (
                    <ImageIcon onClick={handleShowImg3} />
                  ) : ( */}
                  <label htmlFor="file">
                    <DriveFolderUploadOutlinedIcon />
                  </label>
                  {/* )} */}
                  <input
                    type="file"
                    // id="file"
                    filename="task3"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      // setFileName("task3");
                    }}
                  />
                </div>
                <div className="task-body">
                  {course ? (
                    <p>{course.tasks[2].task}</p>
                  ) : (
                    <textarea
                      onChange={handleInput3}
                      placeholder="Question for Task 3"
                      id="task3"
                    />
                  )}
                </div>
              </div>
              <div className="task">
                <div className="task-title-wrapper">
                  <div className="task-title">Task 4: Making Predictions</div>
                  <label htmlFor="file">
                    <DriveFolderUploadOutlinedIcon />
                  </label>
                  <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      setFileName("task4");
                    }}
                  />
                </div>
                <div className="task-body">
                  {course ? (
                    <p>{course.tasks[3].task}</p>
                  ) : (
                    <textarea
                      onChange={handleInput4}
                      placeholder="Question for Task 4"
                      id="task4"
                    />
                  )}
                </div>
              </div>
              <div className="task">
                <label className="task-title">
                  Task 5: Comparing and Persuading
                </label>
                <div className="task-body">
                  {course ? (
                    <p>{course.tasks[4].task}</p>
                  ) : (
                    <textarea
                      onChange={handleInput5}
                      placeholder="Question for Task 5"
                      id="task5"
                    />
                  )}
                </div>
              </div>
              <div className="task">
                <label className="task-title">
                  Task 6: Dealing with a Difficult Situation
                </label>
                <div className="task-body">
                  {course ? (
                    <p>{course.tasks[5].task}</p>
                  ) : (
                    <textarea
                      onChange={handleInput6}
                      placeholder="Question for Task 6"
                      id="task6"
                    />
                  )}
                </div>
              </div>
              <div className="task">
                <label className="task-title">
                  Task 7: Expressing Opinions
                </label>
                <div className="task-body">
                  {course ? (
                    <p>{course.tasks[6].task}</p>
                  ) : (
                    <textarea
                      onChange={handleInput7}
                      placeholder="Question for Task 7"
                      id="task7"
                    />
                  )}
                </div>
              </div>
              <div className="task">
                <label className="task-title">
                  Task 8: Describing an Unusual Situation
                </label>
                <div className="task-body">
                  {course ? (
                    <p>{course.tasks[7].task}</p>
                  ) : (
                    <textarea
                      onChange={handleInput8}
                      placeholder="Question for Task 8"
                      id="task8"
                    />
                  )}
                </div>
              </div>
            </div>
            {/* <div className="submit-btn">
              {course ? <></> : <button>Submit</button>}
            </div> */}
          </form>
        </div>
      </div>
      <Modal show={showImg3} onHide={handleCloseImg3}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <img src={img3} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UpdateSpeaking;
