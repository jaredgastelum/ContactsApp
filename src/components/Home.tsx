import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Contact {
  id: number;
  Name: string;
  phoneNumber: string;
  Email: string;
  Address: string;
  Category: string;
}

function Home() {
  const [data, setData] = useState<Contact[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get<Contact[]>("http://localhost:3000/contacts") // Specify the response type
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id: number) => {
    const confirm = window.confirm("would you like to Delete?");
    if (confirm) {
      axios
        .delete("http://localhost:3000/contacts/" + id)
        .then((res) => {
          location.reload();
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <h1>List of Contacts</h1>
      <div className="w-75 rounded bg-white border shadow p-4">
        <div className="d-flex justify-content-end">
          <Link to="/create" className="btn btn-success">
            Add +
          </Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Address</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                {/* <td>{d.id}</td> */}
                <td>{d.Name}</td>
                <td>{d.phoneNumber}</td>
                <td>{d.Email}</td>
                <td>{d.Address}</td>
                <td>{d.Category}</td>
                <td>
                  <Link
                    to={`/read/${d.id}`}
                    className="btn btn-sm btn-info me-2"
                  >
                    Read
                  </Link>
                  <Link
                    to={`/update/${d.id}`}
                    className="btn btn-sm btn-primary me-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={(e) => handleDelete(d.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
