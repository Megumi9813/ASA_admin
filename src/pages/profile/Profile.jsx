import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Table from "../../components/table/Table";
import "./profile.scss";

function Profile() {
  return (
    <div className="profile">
      <Sidebar />
      <main>
        <Navbar />
        <div className="profile_container">
          <div className="top">
            <div className="left">
              <div className="editButton">Edit</div>
              <h2 className="title">Information</h2>
              <div className="item">
                <img src="" alt="" />
                <div className="details">
                  <h3 className="itemTitle"></h3>
                  <div className="detailItem">
                    <span className="itemKey">Email: </span>
                    <span className="itemValue"></span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone: </span>
                    <span className="itemValue"></span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">First Language: </span>
                    <span className="itemValue"></span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Test Type: </span>
                    <span className="itemValue"></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="right"></div>
          </div>
          <div className="bottom">
            <h2 className="title">Last Activities</h2>
            <Table />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
