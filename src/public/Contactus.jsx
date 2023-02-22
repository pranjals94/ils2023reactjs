import React from 'react';
import Footer from './Footer';
import MyHeader from './MyHeader';
import { Navbar } from 'react-bootstrap';
import { faEnvelopeCircleCheck, faLocation, faMapLocation, faPerson, faPhone, faUser, faVoicemail } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Contactus = () => {
    return (
        <div className="container py-3">
            <MyHeader />
            <main className="flex-shrink-0">
                <div className="container">
                    <h5>Contact us</h5>
                    <div className='row'>
                        <div className='col-12'>
                            <table>
                                <tbody>
                                    <tr style={{height:"25pt"}}>
                                        <td className='fw-bold'><FontAwesomeIcon icon={faUser} /> Name </td>
                                        <td>: Sankirtan Nitaicand Das</td>
                                    </tr>
                                    <tr style={{height:"25pt"}}>
                                        <td className='fw-bold'><FontAwesomeIcon icon={faPhone} /> Mobile </td>
                                        <td>: +91 9434191111</td>
                                    </tr>
                                    <tr style={{height:"30pt"}}>
                                        <td className='fw-bold'><FontAwesomeIcon icon={faEnvelopeCircleCheck} /> Email </td>
                                        <td>: ilsmayapur@gmail.com</td>
                                    </tr>
                                    <tr>
                                        <td style={{verticalAlign:"top"}} className='fw-bold'><FontAwesomeIcon icon={faLocation} /> Address </td>
                                        <td style={{verticalAlign:"top"}}>
                                            <span style={{verticalAlign:"top"}}>: </span>
                                            <span style={{display:"inline-block"}}>
                                                ISKCON, Mayapur
                                                <br/>Nadia, West Bengal INDIA 741313
                                                <br/>India
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            <Navbar fixed="bottom">
                <Footer/>
            </Navbar>
        </div>
    );
};
export default Contactus;