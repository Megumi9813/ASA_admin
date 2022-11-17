import './students.scss'
import Datatable from '../../components/datatable/Datatable'

const Students = () => {
  return (
    <div className="students">
        <div className="student_container">
          <Datatable />
        </div>
    </div>
  );
}

export default Students;
