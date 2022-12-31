import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { submittedAnswersColumns } from "../../submittedAnswersDatatable";
import { db } from "../../firebase";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import "./submittedAnswersDatatable.scss";

const SubmittedWritingDatatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "submittedAnswer"));
        querySnapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            ...doc.data(),
            date: doc.data().timeStamp.toDate().toDateString(),
          });
        });
        setData(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "submittedAnswer", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(data)

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {params.row.status === "submitted" ||
            params.row.status === "reviewed" ? (
              <Link to={"/" + params.row.id}>
                <div className="viewButton">Review</div>
              </Link>
            ) : (
                <div className="viewButton" style={{cursor: "not-allowed"}}>Review</div>
            )}
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="submittedWritingDatatable">
      <div className="submittedWritingDatatable_title">
        List of Submitted Answers
      </div>
      <DataGrid
        rows={data}
        columns={submittedAnswersColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
};

export default SubmittedWritingDatatable;
