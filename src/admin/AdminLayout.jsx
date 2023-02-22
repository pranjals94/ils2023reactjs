import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import '../App.css';
import { ApiContext } from '../contexts/ApiContext';
import { useEffect, useContext } from 'react';
import Footer from '../public/Footer';
function AdminLayout(props) {
    const {user, setUser} = useContext(ApiContext)
    const navigate = useNavigate()
    useEffect(() => {
        if(!user){
            navigate("/signin/index", {replace:true, state: {message: "Something went wrong..."} })
        }
    }, []);
    return (
        <>
            <Header />
            <main className="flex-shrink-0">
                <div className="container-fluid" style={{minHeight:"73vh"}}>
                    <Outlet/>
                </div>
            </main>
            <Navbar className='p-0'>
                <Footer/>
            </Navbar>
        </>
    );
}
export default AdminLayout;
