import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  where,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import ErrorIcon from "@mui/icons-material/Error";
import { useLocation, useNavigate } from "react-router-dom";
import "./writingReview.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import useDrivePicker from "react-google-drive-picker";
import IframeResizer from "iframe-resizer-react";

function WritingReview({
  currentUserData,
  submittedAnswers,
  questionId,
  submittedAnswerId,
  answer,
}) {
  const [question, setQuestion] = useState([]);
  const [review, setReview] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [openPicker, authResponse] = useDrivePicker();
  const [fileData, setfileData] = useState([]);

  useEffect(() => {
    const fetchQuestion = async () => {
      let list = [];
      try {
        const docRef = doc(db, "courses", questionId);
        const docSnap = await getDoc(docRef);
        list.push({
          id: docSnap.id,
          task1: docSnap.data().Task1,
          task2: docSnap.data().Task2,
        });
        setQuestion(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchQuestion();
  }, []);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setReview({ ...review, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reviewRef = doc(db, "submittedAnswer", answer.id);
      await setDoc(
        reviewRef,
        {
          ...review,
          file: fileData.docs[0].embedUrl,
          timeStamp: serverTimestamp(),
          status: "reviewed",
          markedByName: currentUserData.displayName,
          markedByImg: currentUserData.img,
        },
        { merge: true }
      );
      navigate("/submitted/answers");
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   const uploadFile = () => {
  //     console.log(fileData.docs[0].name);
  //     const name = fileData.docs[0].name;

  //     const storageRef = ref(storage, fileData.docs[0].name);

  //     const uploadTask = uploadBytesResumable(storageRef, fileData);

  //     uploadTask.then(() => {
  //       getDownloadURL(storageRef).then((downloadURL) => {
  //         console.log(downloadURL);
  //         setReview((prev) => ({
  //           ...prev,
  //           file: downloadURL,
  //           fileName: fileData.docs[0].name,
  //         }));
  //         setData();
  //       });
  //     });

  //     uploadTask.on(
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //           setReview((prev) => ({ ...prev, file: downloadURL }));
  //         });
  //       }
  //     );
  //   };
  //   fileData.docs && uploadFile();
  // }, [fileData]);

  const handleOpenPicker = () => {
    openPicker({
      clientId:
        "636679238977-jbtig2d7odqk8kaknkpuj5g1uh9c3iq2.apps.googleusercontent.com",
      developerKey: "AIzaSyCSqxBqTcdH_zlFNwHC5kC7Df_Kj713BQ0",
      viewId: "DOCS",
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      callbackFunction: (data) => {
        if (data.action === "cancel") {
          console.log("User clicked cancel/close button");
        }
        setfileData(data);
      },
    });
  };

  // console.log(fileData);

  return (
    <div className="writingReview">
      {question.length > 0 ? (
        <>
          {answer.courseType === "CELPIP Writing" ? (
            <>
              <div className="lesson">
                <div className="lesson-header">
                  <div className="lesson-title">
                    Writing Task 1: Writing an Email
                  </div>
                  <div className="lesson-timer">
                    Time remaining: 00 minutes 00 seconds
                  </div>
                </div>
                <div className="lesson-body">
                  <div className="lesson-body-left">
                    <div className="question_intro">
                      <ErrorIcon />
                      Read the following information.
                    </div>
                    <div className="question">
                      {question[0].task1.questionLeft}
                    </div>
                  </div>
                  <div className="lesson-body-right">
                    <div className="question_intro">
                      <ErrorIcon />
                      {question[0].task1.questionRightTop}
                    </div>
                    <ul className="question-option">
                      {question[0].task1.questionRightBottom.map((item) => (
                        <li key={item.id}>{item.task}</li>
                      ))}
                    </ul>
                    <form>
                      <textarea
                        id="answer"
                        type="text"
                        readOnly
                        value={answer.answer1}
                      ></textarea>
                    </form>
                  </div>
                </div>
              </div>
              <div className="lesson">
                <div className="lesson-header">
                  <div className="lesson-title">
                    Writing Task 2: Responding to Survey Questions
                  </div>
                  <div className="lesson-timer">
                    Time remaining: 00 minutes 00 seconds
                  </div>
                </div>
                <div className="lesson-body">
                  <div className="lesson-body-left">
                    <div className="question_intro">
                      <ErrorIcon />
                      Read the following information.
                    </div>
                    <div className="question">
                      {question[0].task2.questionLeft}
                    </div>
                  </div>
                  <div className="lesson-body-right">
                    <div className="question_intro">
                      <ErrorIcon />
                      {question[0].task2.questionRightTop}
                    </div>
                    <ul className="question-option">
                      {question[0].task2.questionRightBottom.map((item) => (
                        <li key={item.id}>{item.task}</li>
                      ))}
                    </ul>
                    <form>
                      <textarea
                        id="answer"
                        type="text"
                        readOnly
                        value={answer.answer2}
                      ></textarea>
                    </form>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="tasks">
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
                          {question[0].task1.questionTop}
                        </div>
                        <div className="question-container question-middle">
                          {question[0].task1.questionMiddle}
                        </div>
                        <ul className="question-container">
                          {question[0].task1.questionRightBottom.map((item) => (
                            <li key={item.id}>{item.task}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="classRoom_bottom">
                        <p className="classRoom_bottom-text">
                          Write at least 150 words.
                        </p>
                        <p className="classRoom_bottom-text">
                          You do <p className="bold space"> NOT </p> need to
                          write any addresses.
                        </p>
                        <p className="classRoom_bottom-text">
                          Begin your letter as follows:
                        </p>
                        <p className="classRoom_bottom-text">
                          <p className="bold">Dear Sir or Madam,</p>
                        </p>
                        <textarea
                          value={answer.answer1}
                          readOnly
                          style={{ height: "auto" }}
                        ></textarea>
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
                        <p>Write about the following topic: </p>
                      </div>
                      <div className="classRoom_middle">
                        <div className="question-container">
                          {question[0].task2.questionTop}
                        </div>
                        <div className="question-container question-middle">
                          {question[0].task2.questionMiddle}
                        </div>
                        <div className="question-container">
                          {question[0].task2.questionBottom}
                        </div>
                      </div>
                      <div className="classRoom_bottom">
                        <p className="classRoom_bottom-text">
                          Write at least 250 words.
                        </p>
                        <textarea
                          value={answer.answer2}
                          readOnly
                          style={{ height: "auto" }}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>...Loading</p>
      )}
      {answer.status === "reviewed" ? (
        <div className="review-container">
          <div className="file-container">
            <button
              onClick={() => handleOpenPicker()}
              style={{ backgroundColor: "gray", cursor: "not-allowed" }}
            >
              Uploaded marked file
            </button>
            <IframeResizer
              src={answer.file}
              style={{
                width: "1px",
                minWidth: "100%",
                minHeight: "100%",
              }}
              scrolling="no"
            />
          </div>
          <form className="review-comments">
            <textarea
              style={{ height: "auto" }}
              id="review"
              value={answer.review}
              readOnly
            ></textarea>
            <button
              type="submit"
              style={{ backgroundColor: "gray", cursor: "not-allowed" }}
            >
              Reviewed
            </button>
          </form>
        </div>
      ) : (
        <div className="review-container">
          <div className="file-container">
            <button onClick={() => handleOpenPicker()}>
              Upload marked file
            </button>
            {/* {fileData.docs && <p>({fileData.docs[0].name})</p>} */}
          </div>
          {fileData.docs && (
            <IframeResizer
              src={fileData.docs[0].embedUrl}
              style={{
                width: "1px",
                minWidth: "100%",
                minHeight: "100%",
              }}
              scrolling="no"
            />
          )}
          <form className="review-comments" onSubmit={handleSubmit}>
            <textarea
              id="review"
              onChange={handleInput}
              placeholder="Your comments / review / mark to this submitted answer goes here"
            ></textarea>
            <button type="submit">Submit review</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default WritingReview;
