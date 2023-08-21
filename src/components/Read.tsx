import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface Contact {
  id: number;
  Name: string;
  phoneNumber: string;
  Email: string;
  Address: string;
  Category: string;
}

function Read() {
  const [data, setData] = useState<Contact | null>(null); // Change state type

  const { id } = useParams<{ id: string }>(); // Parse id as a string

  useEffect(() => {
    axios
      .get<Contact>("http://localhost:3000/contacts/" + id) // Specify the response type
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id]); // Include id in the dependency array to refetch when id changes

  return (
    <div>
      {data && (
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
          <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
            <form className="row g-3">
              <h2>Contact Information</h2>
              <div className="col-md-6">
                <label htmlFor="Name" className="form-label">
                  <strong>Name:</strong>
                </label>
                <p> {data.Name}</p>
              </div>
              <div className="col-md-6">
                <label htmlFor="phoneNumber" className="form-label">
                  <strong>Phone Number</strong>
                </label>
                <p> {data.phoneNumber}</p>
              </div>
              <div className="col-12">
                <label htmlFor="Email" className="form-label">
                  <strong>Email</strong>
                </label>
                <p> {data.Email}</p>
              </div>
              <div className="col-12">
                <label htmlFor="Address" className="form-label">
                  <strong>Address</strong>
                </label>
                <p> {data.Address}</p>
              </div>
              <div className="col-12">
                <label htmlFor="Category" className="form-label">
                  <strong>Category</strong>
                </label>
                <p> {data.Category}</p>
              </div>
              <div className="col-12">
                <Link to={`/update/${id}`} className="btn btn-success">
                  Edit
                </Link>
                <Link to="/" className="btn btn-primary ms-3">
                  Back
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Read;
