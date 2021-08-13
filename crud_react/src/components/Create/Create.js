import React from 'react';
import './Create.css';
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";
const Create = () => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [salary, setSalary] = useState("");

    const [users, setUser] = useContext(UserContext);

    const updateId = (e) => {
        setId(e.target.value);
        console.log(id)
      };
    
      const updateName = (e) => {
        setName(e.target.value);
      };
    
      const updatePosition = (e) => {
        setPosition(e.target.value);
      };
    
      const updateSalary = (e) => {
        setSalary(e.target.value);
      };
    
      const addUser = (e) => {
          e.preventDefault();
          setUser([...users, {id:id, name:name, position:position, salary:salary}])
      }

    return (
        <div className="container">
            <h2 className="second">Create User</h2>
            <form onSubmit={addUser}>
                <div className="form-group">
                    <label for="id">ID</label>
                    <input type="number" value={id} 
                        className="form-control" placeholder="Enter ID"
                        onChange={updateId}/>
                </div>
                <div className="form-group">
                    <label for="name">Enter valid Name</label>
                    <input type="text" value={name} 
                        className="form-control" placeholder="Enter valid name"
                        onChange={updateName}/>
                </div>
                <div className="form-group">
                    <label for="position">Enter valid position</label>
                    <input type="text" value={position} 
                        className="form-control" placeholder="Enter position"
                        onChange={updatePosition}/>
                </div>
                <div className="form-group">
                    <label for="salary">Salary</label>
                    <input type="number" value={salary} 
                        className="form-control" placeholder="Salary"
                        onChange={updateSalary}/>
                </div>
                <div className="form-group">
                <button type="submit" className="btn btn-primary">Create User</button>
                <Link to="/">
                    <button type="button" className="btn btn-secondary dlt-btn">Back to Home</button>
                </Link>
                </div>
            </form>
        </div>
    )
}

export default Create;