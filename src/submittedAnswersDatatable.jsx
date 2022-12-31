import Avatar from "@mui/material/Avatar";

export const submittedAnswersColumns = [
  {
    field: "user",
    headerName: "Submitted by",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.img ? (
            <img className="cellImg" src={params.row.img} alt="avator" />
          ) : (
            <Avatar
              sx={{ width: 32, height: 32 }}
              className="avator cellImg"
            ></Avatar>
          )}
          {params.row.submittedByName}
        </div>
      );
    },
  },
  {
    field: "testType",
    headerName: "Test Type",
    width: 120,
  },
  {
    field: "skill",
    headerName: "Skill",
    width: 150,
  },
  {
    field: "date",
    headerName: "Submitted on",
    width: 300,
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
  },
];
