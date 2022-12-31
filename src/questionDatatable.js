import Avatar from "@mui/material/Avatar";

export const writingQuestionColumns = [
  {
    field: "user",
    headerName: "Submitted by",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.submittedByImg ? (
            <img
              className="cellImg"
              src={params.row.submittedByImg}
              alt="avator"
            />
          ) : (
            <Avatar sx={{ width: 32, height: 32 }} className="avator"></Avatar>
          )}
          {params.row.submittedBy}
        </div>
      );
    },
  },
  {
    field: "testType",
    headerName: "Test Type",
    width: 150,
  },
  {
    field: "skill",
    headerName: "Skill",
    width: 150,
  },
  {
    field: "title",
    headerName: "Title",
    width: 250,
  },
  {
    field: "date",
    headerName: "Created on",
    width: 300,
  },
];