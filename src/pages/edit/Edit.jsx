import "../new student/new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const Edit = ({ title, currentUserData, inputs }) => {
  return (
    <div className="edit">
      <div className="top">
        <h1>{title}</h1>
      </div>
      <div className="bottom">
        <div className="left">
          <img src={currentUserData.img} />
        </div>
        <div className="right">
          <form>
            <div className="formInput">
              <label htmlFor="file">
                Image: <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input />
            </div>
            {inputs.map((input) => (
              <div className="formInput" key={input.id}>
                <label>{input.label}</label>
                <input id={input.id} type={input.type} />
              </div>
            ))}
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
