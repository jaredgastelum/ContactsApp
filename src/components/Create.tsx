import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Create() {
  const [values, setValues] = useState({
    Name: "",
    phoneNumber: "",
    Email: "",
    Address: "",
    Category: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await axios
      .post("http://localhost:3000/contacts", values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <form className="row g-3" onSubmit={handleSubmit}>
          <h2>Add Contact</h2>
          <div className="col-md-6">
            <label htmlFor="Name" className="form-label">
              Name
            </label>
            <input
              type="name"
              className="form-control"
              id="Name"
              onChange={(e) => setValues({ ...values, Name: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="phone"
              className="form-control"
              id="phoneNumber"
              onChange={(e) =>
                setValues({ ...values, phoneNumber: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="Email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="Email"
              onChange={(e) => setValues({ ...values, Email: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="Address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="Address"
              placeholder="1234 Main St"
              onChange={(e) =>
                setValues({ ...values, Address: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="Category" className="form-label">
              Category
            </label>
            <input
              type="text"
              className="form-control"
              id="Category"
              placeholder="Family, friend, or co-worker"
              onChange={(e) =>
                setValues({ ...values, Category: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
            <Link to="/" className="btn btn-primary ms-3">
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
