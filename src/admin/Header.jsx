import { faEnvelopeCircleCheck, faGear, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ApiContext } from '../contexts/ApiContext';
function Header() {
  const {user, setUser} = useContext(ApiContext)
  const navigate = useNavigate()
  const renderUser = () => {
    return(
      <>
        <NavDropdown title={
          <img src={user.pictureUrl} alt='U' className='rounded-circle' style={{width:'50px', height:'50px'}}></img>
          } 
          id="basic-nav-dropdown" className='d-flex flex-row me-1'>
          <NavDropdown.Item href=""><FontAwesomeIcon icon={faEnvelopeCircleCheck}></FontAwesomeIcon> Email: {user.email}</NavDropdown.Item>
          <NavDropdown.Item href=""><FontAwesomeIcon icon={faKey}></FontAwesomeIcon> Userid: {user.userid}</NavDropdown.Item>
          <NavDropdown.Item href=""><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Name: {user.name}</NavDropdown.Item>
          <NavDropdown.Divider />
          <Link to="settings" relative="/admin" className='dropdown-item'><FontAwesomeIcon icon={faGear}></FontAwesomeIcon> Settings</Link>
          <NavDropdown.Divider />
          <NavDropdown.Item href={process.env.REACT_APP_rgsevaUrl + "/signout/"}>Logout</NavDropdown.Item>
        </NavDropdown>          
      </>
    )
  }
  const renderNoUser = () => {
    return(
      <>
        <a href={process.env.REACT_APP_rgsevaUrl + "/signin/"} className='d-flex flex-row me-1'>Signin</a>
      </>
    )
  }
  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#" onClick={()=>navigate('/admin/')}>
            <img src='/logo.png' style={{height:"80px"}}></img>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to={'/admin/'} end relative className={"nav-link"}>Dashboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={'/admin/roomList'} end relative className={"nav-link"}>Rooms</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={'/admin/bookingList'} end relative className={"nav-link"}>Bookings</NavLink>
              </li>
            </ul>
          </div>
          {user?renderUser():renderNoUser()}
        </div>
      </nav> 
    </>
  );
}

export default Header;