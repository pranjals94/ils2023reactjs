import React from 'react';
import Footer from './Footer';
import MyHeader from './MyHeader';
import { Navbar } from 'react-bootstrap';

const CancellationRefundPolicy = () => {
    return (
        <div className="container py-3">
            <MyHeader />
            <main className="flex-shrink-0">
                <div className="container">
                    <h5>Cancellation policy</h5>
                    <ul>
                       <li>For cancelation please write an email to ilsmayapur@gmail.com</li> 
                       <li>
                            Cancellation charges will be applied as follows:
                            <ul>
                                <li>If cancel 60 to 46 days before check in a cancellation fee of 25% on total amount will be charged. </li>
                                <li>If cancel 60 to 46  days before check in a cancellation fee of 25% on total amount will be charged. </li>
                                <li>If cancel 45 to 31 days before check in a cancellation fee  of 50% on total amount will be charged. </li>
                                <li>If cancel 30 to 16 days before check in a cancellation fee  of 75% on total amount will be charged. </li>
                                <li>If cancel 15 days before check-in a cancellation fee  of 100% on total amount will be charged. </li>
                            </ul>
                       </li>
                       <il>
                            <b>Please note:</b> The total amount is calculated by deducting the payment gateway charges.
                       </il>
                    </ul>
                    <h5>Refund policy</h5>
                    <ul>
                        <li>
                            On cancellation of refundable booking the refund processing will take time between 10 to 15 days.
                        </li>
                    </ul>
                </div>
            </main>
            <Navbar fixed="bottom">
                <Footer/>
            </Navbar>
        </div>
    );
};
export default CancellationRefundPolicy;