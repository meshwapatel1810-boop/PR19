
import { useState } from "react";
import "./App.css";

const initialStudents = [
  {
    id: 1,
    name: "Rahul Patel",
    course: "BCA",
    email: "rahul@example.com",
  },
  {
    id: 2,
    name: "Priya Shah",
    course: "BBA",
    email: "priya@example.com",
  },
  {
    id: 3,
    name: "Amit Kumar",
    course: "BSc IT",
    email: "amit@example.com",
  },
];

function App() {
  const [students, setStudents] = useState(initialStudents);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("BCA");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Add new student
  const handleAdd = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !course) {
      setMessage("Please fill in all fields.");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      course,
      email: email.trim(),
    };

    setStudents((previousStudents) => [
      ...previousStudents,
      newStudent,
    ]);

    setName("");
    setCourse("BCA");
    setEmail("");
    setMessage("Student added successfully!");
  };

  // Delete student
  const handleDelete = (id) => {
    setStudents((previousStudents) =>
      previousStudents.filter((student) => student.id !== id)
    );

    setMessage("Student deleted successfully!");
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Student Management System</h1>
        <p>Add and delete student records</p>
      </header>

      <main className="container">
        {/* Add Student Form */}
        <section className="card">
          <h2>Add New Student</h2>

          <form onSubmit={handleAdd}>
            <div className="form-group">
              <label>Student Name</label>
              <input
                type="text"
                placeholder="Enter student name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Course</label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              >
                <option value="BCA">BCA</option>
                <option value="BBA">BBA</option>
                <option value="BSc IT">BSc IT</option>
                <option value="MCA">MCA</option>
                <option value="MBA">MBA</option>
              </select>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="add-btn">
              + Add Student
            </button>
          </form>

          {message && (
            <p className="message" role="status">
              {message}
            </p>
          )}
        </section>

        {/* Student List */}
        <section className="card">
          <h2>Student List</h2>

          <p className="total">
            Total Students: {students.length}
          </p>

          {students.length === 0 ? (
            <p className="empty">No students available.</p>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((student, index) => (
                    <tr key={student.id}>
                      <td>{index + 1}</td>
                      <td>{student.name}</td>
                      <td>{student.course}</td>
                      <td>{student.email}</td>
                      <td>
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() => handleDelete(student.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
