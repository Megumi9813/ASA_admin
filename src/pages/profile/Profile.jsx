import { Link } from "react-router-dom";
import Table from "../../components/table/Table";
import "./profile.scss";

function Profile({ currentUserData }) {

  console.log(currentUserData);
  return (
    <div className="profile">
      <div className="profile_container">
        <div className="top">
          <div className="left">
            <Link to="/edit">
              <div className="editButton">Edit</div>
            </Link>
            <h2 className="title">Information</h2>
            <div className="item">
              <img src={currentUserData.img} alt="" />
              <div className="details">
                <h3 className="itemTitle"></h3>
                <div className="detailItem">
                  <span className="itemKey">
                    Email: {currentUserData.email}
                  </span>
                  <span className="itemValue"></span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">
                    Phone: {currentUserData.phone}
                  </span>
                  <span className="itemValue"></span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">
                    First Language: {currentUserData.language}
                  </span>
                  <span className="itemValue"></span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">
                    Test Type: {currentUserData.testType}
                  </span>
                  <span className="itemValue"></span>
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
          <Table />
        </div>
      </div>
    </div>
  );
}

export default Profile;
