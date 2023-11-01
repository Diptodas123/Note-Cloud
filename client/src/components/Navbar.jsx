import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate=useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>Note@Cloud</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={"nav-link"} aria-current="page" to={"/"}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className={"nav-link"} to={"/about"}>About</Link>
            </li>
          </ul>
          {
            !localStorage.getItem("token") ?
              <form className='d-flex'>
                <Link to={"/login"} className='btn btn-primary mx-1' role='button'>Login</Link>
                <Link to={"/signup"} className='btn btn-primary mx-1' role='button'>Signup</Link>
              </form>
              :
              <button className='btn btn-primary mx-1' onClick={handleLogout}>Logout</button>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar;