import React from 'react';
import Footer from './Footer';
import MyHeader from './MyHeader';
import { Navbar } from 'react-bootstrap';

const TermsConditions = () => {
    return (
        <div className="container py-3">
            <MyHeader />
            <main className="flex-shrink-0">
                <div className="container">
                    <h5>Terms and conditions</h5>
                    <h5>General</h5>
                    <ul>
                        <li>The ISKCON Mayapur campus is a fully sanctified arena with a totally spiritual atmosphere and expects the visitors to maintain its decoram.</li>
                        <li>No smoking or drinking or any type of intoxication is allowed in the campus( not even coffee).</li>
                        <li>Eating or carrying any type of non vegetarian items inside the campus is strictly forbidden.</li>
                        <li>Playing any mundane music loudly is not allowed within the campus.</li>
                        <li>Married couples must have marriage registration certificate or legally matching ID's with them to avail accommodations (EXCEPTION FOR FOREIGN NATIONALS)</li>
                        <li>Life Member discount is not applicable during this period</li>
                        <li>No Pets are allowed inside the campus</li>
                    </ul>
                    <h5>Check-In Policies</h5>
                    <ul>
                        <li>Check in at 9 A.M.</li>
                        <li>Visitors must carry a valid photo ID without which their booking stands invalid and they would not be allowed to check in.</li>
                        <li>After arrival, please contact the Bhavan's Reception to fill your Pilgrim Registration Form, to get your room key.</li>
                    </ul>
                    <h5>Check-Out Policies</h5>
                    <ul>
                        <li>Check Out 9 A.M.</li>
                    </ul>
                </div>
            </main>
            <Navbar fixed="bottom">
                <Footer/>
            </Navbar>
        </div>
    );
};
export default TermsConditions;