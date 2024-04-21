import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
  return (
    <div className="container text-center mt-5">
      <div className="row">
        <div className="col">
          <h1 className="display-1">404</h1>
          <p className="lead">This content is only accessible to administrators. If you are not an administrator, you will not be able to view this page.</p>
          <button type="button" class="btn btn-primary" onClick={()=> navigate("/")}>Back to Home</button>
        </div>
      </div>
    </div>
  )
}

export default NotFound;