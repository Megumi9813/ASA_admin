import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../userDatatable";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { studentProfileColumns } from '../../studentProfileDatatable';
// import "./datatable.scss";

const StudentProfileTable = ({ startedCourses }) => {

    console.log(startedCourses);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "students"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
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
      await deleteDoc(doc(db, "students", id));
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
            {params.row.status === "submitted" ||
            params.row.status === "reviewed" ? (
              <Link to={"/" + params.row.id}>
                <div className="viewButton">Review</div>
              </Link>
            ) : (
              <div className="viewButton" style={{ cursor: "not-allowed" }}>
                Review
              </div>
            )}
            {/* <Link to={"/" + params.row.id}>
              {console.log(params.row)}
              <div className="viewButton">View</div>
            </Link> */}
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
    <div className="datatable" style={{ padding: "0" }}>
      <DataGrid
        rows={startedCourses}
        columns={studentProfileColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        // checkboxSelection
      />
    </div>
  );
};

export default StudentProfileTable;
