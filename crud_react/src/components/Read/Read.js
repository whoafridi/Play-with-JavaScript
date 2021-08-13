import React from 'react';
//import './Read.css'
import { useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Read = () =>{
    const [users, setUsers] = useContext(UserContext);
    const {id} = useParams();
    const user = users.filter(user => user.id == id);

    
    return(
        <div className="container">
      
          
        <div class="card text-center">
            <div class="card-header">
                User Details
            </div>
            <div class="card-body">
                <h5 class="card-title">User_ID: {user[0].id}</h5>
                <h5 class="card-title">User_Name: {user[0].name}</h5>
                <h5 class="card-title">Position: {user[0].position}</h5>
                <h5 class="card-title">Salary: {user[0].salary}</h5>
                <Link to="/">
                    <button type="button" className="btn btn-secondary dlt-btn">Back to Home</button>
                </Link>
            </div>
         </div>
        </div>
        )
    }
    
export default Read;
