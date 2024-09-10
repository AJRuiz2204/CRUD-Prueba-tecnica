/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/delete/` + id)
      .then((res) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w=50 bg-white rounded p-3">
          <h1>Student list</h1>
          <div className="d-flex justify-content-end">
            <Link to={"/create"} className="btn btn-success">
              Create +
            </Link>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((student, index) => {
                return (
                  <tr key={index}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>
                      <Link
                        to={`/read/${student.id}`}
                        className="btn btn-sm btn-info"
                      >
                        Read
                      </Link>
                      <Link
                        to={`/edit/${student.id}`}
                        className="btn btn-sm btn-primary mx-2"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Home;
