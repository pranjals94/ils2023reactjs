import React from 'react';
import { Navbar } from 'react-bootstrap';
import { NavLink, Outlet} from 'react-router-dom';
import MyHeader from './MyHeader';
import '../App.css';
import Aboutus from './Aboutus';
import Footer from './Footer';
function MyLayout(props) {
    return (
        <>
            <div className="container p-0">
                <MyHeader />
                <main className="flex-shrink-0">
                    <div className="container" style={{minHeight:"73vh"}}>
                        <Outlet/>
                    </div>
                </main>
                <Navbar className='p-0'>
                    <Footer/>
                </Navbar>
            </div>
        </>
    );
}
export default MyLayout;
