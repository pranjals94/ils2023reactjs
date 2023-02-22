import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, Outlet, useNavigate, NavLink } from 'react-router-dom';
import Header from './Header';
import '../App.css';
import { ApiContext } from '../contexts/ApiContext';
import { useEffect, useContext } from 'react';
function AdminLayoutSettings(props) {
    const { user, setUser } = useContext(ApiContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate("/signin/index", { replace: true, state: { message: "Something went wrong..." } })
        }
    }, []);
    return (
        <>
            <div className='row'>
                <div className='col-2 col-sm-2 col-md-2 col-lg-2'>
                    <div className='border-right bg-light ' style={{ minHeight: "73vh" }}>
                        <div class="flex-column nav">
                            <NavLink to="general" preventScrollReset={true} className="nav-link">General</NavLink>
                            <NavLink to="template-roombook-receipt" preventScrollReset={true} className="nav-link">Receipt template</NavLink>
                            <NavLink to="template-roombook-success" preventScrollReset={true} className="nav-link">Success template</NavLink>
                            <NavLink to="template-roombook-onhold" preventScrollReset={true} className="nav-link">Onhold template</NavLink>
                            <NavLink to="users" preventScrollReset={true} className="nav-link">Users</NavLink>
                            <NavLink to="roles" preventScrollReset={true} className="nav-link">Roles</NavLink>
                        </div>
                    </div>
                </div>
                <div className='col-10 col-sm-10 col-md-10 col-lg-10'>
                    <Outlet />
                </div>
            </div>
        </>
    );
}
export default AdminLayoutSettings;
