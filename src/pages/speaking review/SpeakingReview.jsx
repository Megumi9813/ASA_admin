import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  serverTimestamp,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import ErrorIcon from "@mui/icons-material/Error";
import ReactAudioPlayer from "react-audio-player";
import "./speakingReview.scss";

function CelpipSpeaking({
  currentUserData,
  submittedAnswers,
  questionId,
  submittedAnswerId,
  answer,
}) {
  const [course, setCourse] = useState([]);
  const [file, setFile] = useState([]);
  const location = useLocation();
  const [audioState, setAudioState] = useState(true);
  const audioRef = useRef();
  const [data, setData] = useState({});
  const [listOfdata, setlistOfdata] = useState([]);
  const [question, setQuestion] = useState([]);
  const [review, setReview] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      let list = [];
      try {
        const docRef = doc(db, "courses", questionId);
        const docSnap = await getDoc(docRef);
        list.push({
          id: docSnap.id,
          ...docSnap.data(),
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

  console.log(answer);

  return (
    <div className="celpipSpeaking">
      {question.length > 0 ? (
        <>
          {question[0].courseType === "CELPIP Speaking" ? (
            <div className="display-area">
              <div id="task">
                <div className="lesson">
                  <div className="lesson-header">
                    <div className="leasson-title">
                      {question[0].tasks[0].label}
                    </div>
                    <div className="lesson-time">
                      Preparation: 30 seconds Recording: 90 seconds
                    </div>
                  </div>
                  <div className="lesson-body">
                    <div className="lesson-question">
                      <ErrorIcon />
                      {question[0].tasks[0].task}
                    </div>
                    <hr />
                    <div className="lesson-timer">
                      <div className="record">
                        <ReactAudioPlayer src={answer.data1.audio} controls />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lesson">
                  <div className="lesson-header">
                    <div className="leasson-title">
                      {question[0].tasks[1].label}
                    </div>
                    <div className="lesson-time">
                      Preparation: 30 seconds Recording: 90 seconds
                    </div>
                  </div>
                  <div className="lesson-body">
                    <div className="lesson-question">
                      <ErrorIcon />
                      {question[0].tasks[1].task}
                    </div>
                    <hr />
                    <div className="lesson-timer">
                      <div className="record">
                        <ReactAudioPlayer src={answer.data2.audio} controls />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lesson">
                  <div className="lesson-header">
                    <div className="leasson-title">
                      {question[0].tasks[2].label}
                    </div>
                    <div className="lesson-time">
                      Preparation: 30 seconds Recording: 90 seconds
                    </div>
                  </div>
                  <div className="lesson-body">
                    <div className="lesson-question">
                      <ErrorIcon />
                      {question[0].tasks[2].task}
                    </div>
                    <hr />
                    <div className="lesson-timer">
                      <div className="record">
                        <ReactAudioPlayer src={answer.data3.audio} controls />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lesson">
                  <div className="lesson-header">
                    <div className="leasson-title">
                      {question[0].tasks[3].label}
                    </div>
                    <div className="lesson-time">
                      Preparation: 30 seconds Recording: 90 seconds
                    </div>
                  </div>
                  <div className="lesson-body">
                    <div className="lesson-question">
                      <ErrorIcon />
                      {question[0].tasks[3].task}
                    </div>
                    <hr />
                    <div className="lesson-timer">
                      <div className="record">
                        <ReactAudioPlayer src={answer.data4.audio} controls />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lesson">
                  <div className="lesson-header">
                    <div className="leasson-title">
                      {question[0].tasks[4].label}
                    </div>
                    <div className="lesson-time">
                      Preparation: 30 seconds Recording: 90 seconds
                    </div>
                  </div>
                  <div className="lesson-body">
                    <div className="lesson-question">
                      <ErrorIcon />
                      {question[0].tasks[4].task}
                    </div>
                    <hr />
                    <div className="lesson-timer">
                      <div className="record">
                        <ReactAudioPlayer src={answer.data5.audio} controls />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lesson">
                  <div className="lesson-header">
                    <div className="leasson-title">
                      {question[0].tasks[5].label}
                    </div>
                    <div className="lesson-time">
                      Preparation: 30 seconds Recording: 90 seconds
                    </div>
                  </div>
                  <div className="lesson-body">
                    <div className="lesson-question">
                      <ErrorIcon />
                      {question[0].tasks[5].task}
                    </div>
                    <hr />
                    <div className="lesson-timer">
                      <div className="record">
                        <ReactAudioPlayer src={answer.data6.audio} controls />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lesson">
                  <div className="lesson-header">
                    <div className="leasson-title">
                      {question[0].tasks[6].label}
                    </div>
                    <div className="lesson-time">
                      Preparation: 30 seconds Recording: 90 seconds
                    </div>
                  </div>
                  <div className="lesson-body">
                    <div className="lesson-question">
                      <ErrorIcon />
                      {question[0].tasks[6].task}
                    </div>
                    <hr />
                    <div className="lesson-timer">
                      <div className="record">
                        <ReactAudioPlayer src={answer.data7.audio} controls />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lesson">
                  <div className="lesson-header">
                    <div className="leasson-title">
                      {question[0].tasks[7].label}
                    </div>
                    <div className="lesson-time">
                      Preparation: 30 seconds Recording: 90 seconds
                    </div>
                  </div>
                  <div className="lesson-body">
                    <div className="lesson-question">
                      <ErrorIcon />
                      {question[0].tasks[7].task}
                    </div>
                    <hr />
                    <div className="lesson-timer">
                      <div className="record">
                        <ReactAudioPlayer src={answer.data8.audio} controls />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="display-area">
              <div id="task">
                {/* <div className="submit-btn">
                  <button className="btn submit" onClick={handleSubmit}>
                    Submit
                  </button>
                </div> */}
                <div className="part">
                  <div className="part-title">Part 1</div>
                  <div className="lesson">
                    <div className="lesson-header">
                      <div className="leasson-title">Question 1</div>
                      <div className="lesson-time">
                        Preparation: 30 seconds Recording: 90 seconds
                      </div>
                    </div>
                    <div className="lesson-body">
                      <div className="lesson-question">
                        <ErrorIcon />
                        {question[0].task1}
                      </div>
                      <hr />
                      <div className="lesson-timer">
                        <div className="record">
                          <ReactAudioPlayer src={answer.data1.audio} controls />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lesson">
                    <div className="lesson-header">
                      <div className="leasson-title">Question 2</div>
                      <div className="lesson-time">
                        Preparation: 30 seconds Recording: 90 seconds
                      </div>
                    </div>
                    <div className="lesson-body">
                      <div className="lesson-question">
                        <ErrorIcon />
                        {question[0].task2}
                      </div>
                      <hr />
                      <div className="lesson-timer">
                        <div className="record">
                          <ReactAudioPlayer src={answer.data2.audio} controls />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lesson">
                    <div className="lesson-header">
                      <div className="leasson-title">Question 3</div>
                      <div className="lesson-time">
                        Preparation: 30 seconds Recording: 90 seconds
                      </div>
                    </div>
                    <div className="lesson-body">
                      <div className="lesson-question">
                        <ErrorIcon />
                        {question[0].task3}
                      </div>
                      <hr />
                      <div className="lesson-timer">
                        <div className="record">
                          <ReactAudioPlayer src={answer.data3.audio} controls />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lesson">
                    <div className="lesson-header">
                      <div className="leasson-title">Question 4</div>
                      <div className="lesson-time">
                        Preparation: 30 seconds Recording: 90 seconds
                      </div>
                    </div>
                    <div className="lesson-body">
                      <div className="lesson-question">
                        <ErrorIcon />
                        {question[0].task4}
                      </div>
                      <hr />
                      <div className="lesson-timer">
                        <div className="record">
                          <ReactAudioPlayer src={answer.data4.audio} controls />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lesson">
                    <div className="lesson-header">
                      <div className="leasson-title">Question 5</div>
                      <div className="lesson-time">
                        Preparation: 30 seconds Recording: 90 seconds
                      </div>
                    </div>
                    <div className="lesson-body">
                      <div className="lesson-question">
                        <ErrorIcon />
                        {question[0].task5}
                      </div>
                      <hr />
                      <div className="lesson-timer">
                        <div className="record">
                          <ReactAudioPlayer src={answer.data5.audio} controls />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="part">
                  <div className="part-title">Part 2</div>
                  <div className="lesson">
                    <div className="lesson-header">
                      <div className="leasson-title">Question </div>
                      <div className="lesson-time">
                        Preparation: 30 seconds Recording: 90 seconds
                      </div>
                    </div>
                    <div className="lesson-body">
                      <div className="lesson-question">
                        <ErrorIcon />
                        {question[0].task6}
                      </div>
                      <hr />
                      <div className="lesson-timer">
                        <div className="record">
                          <ReactAudioPlayer src={answer.data6.audio} controls />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="part">
                  <div className="part-title">Part 3</div>
                  <div className="lesson">
                    <div className="lesson-header">
                      <div className="leasson-title">Question 1</div>
                      <div className="lesson-time">
                        Preparation: 30 seconds Recording: 90 seconds
                      </div>
                    </div>
                    <div className="lesson-body">
                      <div className="lesson-question">
                        <ErrorIcon />
                        {question[0].task7}
                      </div>
                      <hr />
                      <div className="lesson-timer">
                        <div className="record">
                          <ReactAudioPlayer src={answer.data7.audio} controls />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lesson">
                    <div className="lesson-header">
                      <div className="leasson-title">Question 2</div>
                      <div className="lesson-time">
                        Preparation: 30 seconds Recording: 90 seconds
                      </div>
                    </div>
                    <div className="lesson-body">
                      <div className="lesson-question">
                        <ErrorIcon />
                        {question[0].task8}
                      </div>
                      <hr />
                      <div className="lesson-timer">
                        <div className="record">
                          <ReactAudioPlayer src={answer.data8.audio} controls />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lesson">
                    <div className="lesson-header">
                      <div className="leasson-title">Question 3</div>
                      <div className="lesson-time">
                        Preparation: 30 seconds Recording: 90 seconds
                      </div>
                    </div>
                    <div className="lesson-body">
                      <div className="lesson-question">
                        <ErrorIcon />
                        {question[0].task9}
                      </div>
                      <hr />
                      <div className="lesson-timer">
                        <div className="record">
                          <ReactAudioPlayer src={answer.data9.audio} controls />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lesson">
                    <div className="lesson-header">
                      <div className="leasson-title">Question 4</div>
                      <div className="lesson-time">
                        Preparation: 30 seconds Recording: 90 seconds
                      </div>
                    </div>
                    <div className="lesson-body">
                      <div className="lesson-question">
                        <ErrorIcon />
                        {question[0].task9}
                      </div>
                      <hr />
                      <div className="lesson-timer">
                        <div className="record">
                          <ReactAudioPlayer
                            src={answer.data10.audio}
                            controls
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>...loading</p>
      )}
      {answer.status === "reviewed" ? (
        <form className="review-comments">
          <textarea
            id="review"
            value={answer.review}
            style={{ height: "auto" }}
          ></textarea>
          <button
            style={{ backgroundColor: "gray", cursor: "not-allowed" }}
          >
            Review Submitted
          </button>
        </form>
      ) : (
        <form className="review-comments" onSubmit={handleSubmit}>
          <textarea
            id="review"
            onChange={handleInput}
            placeholder="Your comments / review / mark to this submitted answer goes here"
          ></textarea>
          <button type="submit">Submit review</button>
        </form>
      )}
    </div>
  );
}

export default CelpipSpeaking;
