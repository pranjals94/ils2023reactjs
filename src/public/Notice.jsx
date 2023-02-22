import React from 'react';
import { Navbar, Modal, Button } from 'react-bootstrap';
import Footer from './Footer';
import MyHeader from './MyHeader';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import parse from 'html-react-parser';
function Notice(props) {
    const location = useLocation()
    const {message} = location.state
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);    
    useEffect(() => {
    }, []);

    return (
        <>
            <div className="container py-3 vh-100">
                <MyHeader />
                <main className="flex-shrink-0">
                    <div className="container">
                        <div className='row'>
                            <div className='col-12'>
                                <div className='text-center pt-4'>
                                    <h2>Book your Accommodation</h2>
                                    <p className="fs-5 mt-4">
                                        After your Registration for ILS-2023 is confirmed, you can book your accommodation here. 
                                    </p>
                                    <div className="mb-5 fs-5">
                                        <div className='alert alert-danger'>
                                            <div className='fs-4'>{parse(message)}</div>
                                        </div>
                                    <div className="col-md-4 col-lg-4 mx-auto mt-3">
                                        </div>
                                    </div>
                                    <h3>Not yet registered?</h3>
                                    <div className="col-md-4 col-lg-4 mx-auto mt-4">
                                        <div className='mt-2'>
                                            <a href='https://ilsglobal.org/register/#reg' className="btn btn-success btn-md col-12">Register now</a>
                                        </div>
                                    </div>                        
                                </div>

                            </div>
                        </div>
                        {/* <div className="row d-flex align-items-center" style={{height:"40vh"}}>
                            <div className="col-12 text-center">
                                <h1>Sorry, the site is nunder maintance</h1>
                            </div>
                        </div>  */}
                    </div>
                </main>
                <Navbar fixed="bottom">
                    <Footer/>
                </Navbar>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Body>
                    {parse(message)}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary">Understood</Button> */}
                </Modal.Footer>                
            </Modal>            
        </>
    );
}

export default Notice;