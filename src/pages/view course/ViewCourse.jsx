import React from "react";
import AddCelpipWriting from "../add celpip writing/AddCelpipWriting";
import AddIeltsSpeaking from "../add ielts speaking/AddIeltsSpeaking";
import AddIeltsWriting from "../add ielts writing/AddIeltsWriting";
import UpdateSpeaking from "../update speaking/UpdateSpeaking";

function ViewCourse({ course }) {
  return (
    <div className="viewCourse">
      {course.courseType === "CELPIP Writing" ? (
        <AddCelpipWriting course={course} courseTitle="CELPIP Writing Course" />
      ) : (
        <>
          {course.courseType === "CELPIP Speaking" ? (
            <UpdateSpeaking
              course={course}
              courseTitle="CELPIP Speaking Course"
            />
          ) : (
            <>
              {course.courseType === "IELTS Speaking" ? (
                <AddIeltsSpeaking
                  course={course}
                  courseTitle="IELTS Speaking Course"
                />
              ) : (
                <AddIeltsWriting
                  course={course}
                  courseTitle="IELTS Writing Course"
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ViewCourse;
