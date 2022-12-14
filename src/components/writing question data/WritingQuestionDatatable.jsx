import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { writingQuestionColumns } from "../../questionDatatable";
import { db } from "../../firebase";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import "./writingQuestionDatatable.scss";

const WritingQuestionDatatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        querySnapshot.forEach((doc) => {
          list.push({ 
            id: doc.id, 
            ...doc.data(),
            date: doc.data().timeStamp.toDate().toDateString(),
           });
        });
        setData(list.filter((item) => item.courseType));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "courses", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={"/" + params.row.id}>
              <div className="viewButton">View</div>
            </Link>
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
    <div className="writingQuestionDatatable">
      <div className="writingQuestionDatatable_title">
        List of Courses
        {/* <Link to="/update/Writing" className="link">
          Add New
        </Link> */}
      </div>
      <DataGrid
        rows={data}
        columns={writingQuestionColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default WritingQuestionDatatable;
