export const writingQuestionColumns = [
  {
    field: "user",
    headerName: "Submitted by",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
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
    field: "task",
    headerName: "Task",
    width: 150,
  },
  {
    field: "title",
    headerName: "Title",
    width: 300,
  },
];
