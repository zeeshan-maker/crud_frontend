import React, { useEffect, useState } from "react";

import API from "./services/api";

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
      const res = await API.post("/users",formData);
      setFormData({name:"", email:"",phone:""})
      alert(res.data.message);
      fetchUsers()
    } catch (error) {
      console.log(error);
    }
  }


  


  useEffect(() => {
    fetchUsers();
  }, []);


  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">
        User Management System
      </h1>

        <div className="row">
          <div className="col-lg-7 col-md-7 col-8">
             <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>

        {
          users.map((user)=>(
           <tr key={user.user_id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
           </tr>
          ))
        }
            </tbody>
          </table>
          </div>

          <div className="col-lg-5 col-md-5 col-4">
              <h3 className="text-center">Add New User</h3>
             <div className="row">
                 <form onSubmit={handleSubmit}>
                  <div  className="col-12 mb-2">
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      placeholder="Enter Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                    <div className="col-12 mb-2">
                      <input
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    </div>
                    
                    <div className="col-12 mb-2">
                      <input
                      className="form-control"
                      type="phone"
                      name="phone"
                      placeholder="Enter Phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    </div>

                    <button className="btn btn-success" type="submit">Add</button>
              </form>
             </div>
          </div>
        </div>
    </div>
  );
}

export default App;