import React from 'react';
import './Delete.css'
import { useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Delete = () =>{
    const [users, setUsers] = useContext(UserContext);
    const {id} = useParams();
    
    const deleteUser = (id) => {
        const user = users.filter(user => user.id != id);
        setUsers(user);
    }
    return(
        
     
      <div className="container">
      
          
          <div className="card text-center">
  <div className="card-header">
    Delete User 
  </div>
  <div className="card-body">
    <h5 className="card-title">Are you sure ?</h5>
    <Link to="/">
            <button type="button" className="btn btn-secondary dlt-btn" onClick={() => deleteUser(id)}>Confirm</button>
            <button type="button" className="btn btn-primary dlt-btn">Close</button>
    </Link>
  </div>

</div>

      </div>
 
        
    )
}

export default Delete;