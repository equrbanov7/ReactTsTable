import { useEffect, useState } from "react";
import { deleteStudentInfo, getStudentInfo } from "../../api/studentInfo";
import Form from "../../components/Form";
import Table from "../../components/Table";
import Search from "../../components/Search";
import "./index.scss";

type Student = {
  id: number;
  name: string;
  email: string;
  gpa: number;
  createDate: string;
};

const StundentInfo = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const tableColumns = ["ID", "Student Name", "Email", "GPA", "Actions"];
  const emptyTableMessage = "No Students Available";

  const fetchData = async () => {
    const data: Student[] = await getStudentInfo();
    data.sort(
      (a, b) =>
        new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
    );
    setStudents(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number, name: string) => {
    const confirmMessage = confirm(`Are you sure you want to delete ${name}?`);
    if (confirmMessage) {
      try {
        await deleteStudentInfo(id);
        fetchData();
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="StundentInfo">
      <Form formTitle="Add Student Info" fetchData={fetchData} />
      <hr className="StundentInfoBreakLine" />
      <Search setSearchValue={setSearchValue} />
      <hr className="StundentInfoBreakLine" />
      <Table
        tableColumns={tableColumns}
        tableItems={filteredStudents}
        deleteFunction={handleDelete}
        emptyTableMessage={emptyTableMessage}
      />
    </div>
  );
};

export default StundentInfo;
