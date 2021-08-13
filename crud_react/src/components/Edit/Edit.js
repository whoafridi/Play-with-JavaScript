import React from 'react';
//import './Edit.css';
import { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";
const Edit = () => {
    const [users, setUsers] = useContext(UserContext);
    const {id} = useParams();
    const user = users.filter(user => user.id == id);


  const [name, setName] = useState(user[0].name);
  const [position, setPosition] = useState(user[0].position);
  const [salary, setSalary] = useState(user[0].salary);
  

  const editName = (e) => {
    setName(e.target.value);
    const edited_name = name;
    user[0].name = edited_name;
  };

  const editPosition = (e) => {
    setPosition(e.target.value);
    const edited_position = position;
    user[0].position = edited_position;
  };

  const editSalary = (e) => {
    setSalary(e.target.value);
    const edited_salary = salary;
    user[0].salary = edited_salary;
  };

  const editUser = (e ) => {
    e.preventDefault();
    setUsers([...users ]);
  };
    
    return (
        <div className="container">
            <h2 className="second">Edit User {user[0].id}</h2>
            <form>
               
                <div className="form-group">
                    <label for="name">Enter valid Name</label>
                    <input type="text" value={name} 
                        className="form-control" placeholder={user[0].name}
                        onChange={editName}/>
                </div>
                <div className="form-group">
                    <label for="position">Enter valid position</label>
                    <input type="text" value={position} 
                        className="form-control" placeholder={user[0].position}
                        onChange={editPosition}/>
                </div>
                <div className="form-group">
                    <label for="salary">Salary</label>
                    <input type="number" value={salary} 
                        className="form-control" placeholder={user[0].salary}
                        onChange={editSalary}/>
                </div>
                <div className="form-group">
                
                <Link to="/">
                    <button type="submit" className="btn btn-primary" onSubmit={() => editUser()}>Update User</button>
                    <button type="button" className="btn btn-secondary dlt-btn">Back to Home</button>
                </Link>
                </div>
            </form>
        </div>
    )
}

export default Edit;