import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

interface Contact {
  id: number;
  Name: string;
  phoneNumber: string;
  Email: string;
  Address: string;
  Category: string;
}

function Update() {
  //   const [data, setData] = useState<Contact | null>(null); // Change state type

  const { id } = useParams<{ id: string }>(); // Parse id as a string

  const [values, setValues] = useState({
    Name: "",
    phoneNumber: "",
    Email: "",
    Address: "",
    Category: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get<Contact>("http://localhost:3000/contacts/" + id) // Specify the response type
      .then((res) => {
        setValues(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]); // Include id in the dependency array to refetch when id changes

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await axios
      .put("http://localhost:3000/contacts/" + id, values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {values && (
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
          <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
            <form className="row g-3" onSubmit={handleUpdate}>
              <h2>Update Contact</h2>
              <div className="col-md-6">
                <label htmlFor="Name" className="form-label">
                  Name
                </label>
                <input
                  type="name"
                  className="form-control"
                  id="Name"
                  value={values.Name}
                  onChange={(e) =>
                    setValues({ ...values, Name: e.target.value })
                  }
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
                  value={values.phoneNumber}
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
                  value={values.Email}
                  onChange={(e) =>
                    setValues({ ...values, Email: e.target.value })
                  }
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
                  value={values.Address}
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
                  value={values.Category}
                  onChange={(e) =>
                    setValues({ ...values, Category: e.target.value })
                  }
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-success">
                  Update
                </button>
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

export default Update;
