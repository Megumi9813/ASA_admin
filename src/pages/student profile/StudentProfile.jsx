import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase';
import Avatar from "@mui/material/Avatar";
import '../profile/profile.scss';
import StudentProfileTable from '../../components/student profile table/StudentProfileTable';

function StudentProfile({ studentId, submittedAnswers }) {
  const [startedCourses, setStartedCourses] = useState([]);
  const [paidCourseId, setPaidCourseId] = useState([]);
  const [studentInfo, setStudentInfo] = useState([]);

  useEffect(() => {
    const filteSubmittedAnswers = () => {
      let list = [];
      submittedAnswers.filter((item) => {
        if (item.submittedById === studentId) {
          list.push({ ...item, date: item.timeStamp.toDate().toDateString()});
        }
      });
      setStartedCourses(list);
    };
    filteSubmittedAnswers();

    const checkPaidCourse = async () => {
      try {
        const collectionRef = collection(db, "students", studentId, "payments");
        const paymentSnapshot = await getDocs(collectionRef);
        let list = [];
        paymentSnapshot.forEach(async (paidCourse) => {
          list.push(Object.values(paidCourse.data().metadata));
        });
        setPaidCourseId(list);
      } catch (err) {
        console.log(err);
      }
    };
    checkPaidCourse();

    const fetchStudentInfo = async () => {
      try {
        let list = [];
        const docRef = doc(db, "students", studentId);
        const docSnapshot = await getDoc(docRef);
          list.push({
            email: docSnapshot.data().email,
            name: docSnapshot.data().name,
            date: docSnapshot.data().timeStamp.toDate().toDateString(),
          });
        setStudentInfo(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchStudentInfo();
  }, []);

  //   console.log(paidCourseId.flat());
    // console.log(studentInfo.length);

  return (
    <div className="studentProfile">
      <div className="profile_container">
        <div className="top">
          <div className="left">
            <h2 className="title">Information</h2>
            <div className="item">
              <Avatar
                sx={{ width: "100px", height: "100px" }}
                className="avator"
              ></Avatar>
              <div className="details">
                <div className="detailItem">
                  <span className="itemKey">Name: </span>
                  {studentInfo.length > 0 && (
                    <span className="itemValue">{studentInfo[0].name}</span>
                  )}
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email: </span>
                  {studentInfo.length > 0 && (
                    <span className="itemValue">{studentInfo[0].email}</span>
                  )}
                </div>
                <div className="detailItem">
                  <span className="itemKey">Created on: </span>
                  {studentInfo.length > 0 && (
                    <span className="itemValue">{studentInfo[0].date}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="chart"></div>
          </div>
        </div>
        <div className="bottom">
          <h2 className="title">Last Activities</h2>
          <StudentProfileTable startedCourses={startedCourses} />
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
