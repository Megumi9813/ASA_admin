export const studentProfileColumns = [
  {
    field: "title",
    headerName: "Title",
    width: 250,
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
    field: "date",
    headerName: "Submitted on",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];
