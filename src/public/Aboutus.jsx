import React from 'react';
import Footer from './Footer';
import MyHeader from './MyHeader';
import { Navbar } from 'react-bootstrap';

const Aboutus = () => {
    return (
        <div className="container py-3">
            <MyHeader />
            <main className="flex-shrink-0">
                <div className="container">
                    <h5>About us</h5>
                    <p>Hare Krishna</p>
                    <p>
                        We are the room booking team from ISKCON Sri Dham Mayapur. The room bookings are done for ISKCON Leadership Sanga - 2023 (ILS) in following guest houses:
                    </p>
                    <p>
                        1. Gita Bhavan
                        <br/>2. Vamsi Bhavan
                        <br/>3. Namahatta Bhavan
                        <br/>4. Oriya Math (near Namahatta bhavan)
                    </p>
                </div>
            </main>
            <Navbar fixed="bottom">
                <Footer/>
            </Navbar>
        </div>
    );
};
export default Aboutus;