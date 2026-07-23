import React, { useEffect, useState } from "react";
import "./App.css";
import API from "./services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const [users, setUsers] = useState([]);
  const [formData, setFormData]=useState({
    name:"",
    email:"",
    phone:""
  })



  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };


  const handleChange = (e) =>{
    setFormData({
      ...formData, [e.target.name]:e.target.value,
    });
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      await API.post("/users",formData);
      setFormData({name:"", email:"",phone:""})
      toast.success("🎉 User added successfully!");
      fetchUsers()
    } catch (error) {
      console.log(error);
    }
  }


  


  useEffect(() => {
    fetchUsers();
  }, []);

  return (
  <div className="app-bg">
    <div className="container py-3">
      <div className="text-center mb-3">
        <h1 className="main-title">User Management System</h1>
        <p className="subtitle">
          Manage your users with a clean and modern interface.
        </p>
      </div>

      <div className="row g-4">
        {/* User List */}
        <div className="col-lg-7">
          <div className="custom-card">
            <div className="card-header-custom">
              <h3>Users List</h3>
            </div>

        <div className="table-container">
            <div className="table-responsive">
              <table className="table align-middle custom-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                  </tr>
                </thead>

                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.user_id}>
                        <td>
                          <div className="user-name">
                            <div className="avatar">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <span>{user.name}</span>
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center py-4">
                        No Users Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          </div>
        </div>

        {/* Form */}
        <div className="col-lg-5">
          <div className="custom-card form-card">
            <h3 className="mb-4 text-center">Add New User</h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  className="form-control custom-input"
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <input
                  className="form-control custom-input"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <input
                  className="form-control custom-input"
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <button className="btn add-btn w-100">
                Add User
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer
  position="top-right"
  autoClose={2500}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
  draggable
  theme="colored"
/>
  </div>
);
}

export default App;