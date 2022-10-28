import './students.scss'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from '../../components/datatable/Datatable'

const Students = () => {
  return (
    <div className="students">
      <Sidebar />
      <main>
        <Navbar />
        <div className="student_container">
          <Datatable />
        </div>
      </main>
    </div>
  );
}

export default Students;
