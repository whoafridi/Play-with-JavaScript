import React from 'react';
import './Home.css'
import { useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';
import { Link } from "react-router-dom";

const Home = () => {
const [users, setUsers] = useContext(UserContext);
console.log(users);

    return (
        <div className="container">
          <Link to="/create">
            <button type="button" className="btn btn-primary user">Create User</button>
            </Link>
            <table className="table table-striped">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Position</th>
      <th>Salary</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
      {
          users.map(user => 
            <tr key={user.id}>
            <th>{user.id}</th>
            <td>{user.name}</td>
            <td>{user.position}</td>
            <td>{user.salary}</td>
            <td>
            <Link to={"/read/" + user.id}>
            <button type="button" className="btn btn-success action-btn">Read</button>
            </Link>
            <Link to={"/edit/" + user.id}>
            <button type="button" className="btn btn-info action-btn">Edit</button>
            </Link>
            <Link to={"/delete/" + user.id}>
                <button type="button" className="btn btn-danger action-btn">Delete</button>
            </Link>
            </td>
          </tr>
          
          )
      }
    </tbody>
</table>
        </div>
    )
}

export default Home;