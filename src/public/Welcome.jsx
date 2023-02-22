import React from 'react';
import {Navbar} from 'react-bootstrap';
import MyHeader from './MyHeader';
import BookingEntryPoint from './BookingEntryPoint';
import Footer from './Footer';
function Welcome(props) {
    return (
        <>
            <div className="container py-3">
                <MyHeader />
                <main className="flex-shrink-0">
                    <div className="container">
                        <BookingEntryPoint/>
                    </div>
                </main>
                <Navbar fixed="bottom">
                    <Footer/>
                </Navbar>
            </div>
        </>
    );
}

export default Welcome;