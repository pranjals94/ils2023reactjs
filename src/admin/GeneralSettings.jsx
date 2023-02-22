import React from 'react';
import { Form } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import httpService from '../services/httpService';
import utilService from '../services/utilService';
const GeneralSettings = () => {
    const [bookingOpenStatus, setBookingOpenStatus] = useState({})
    useEffect(() => {
        httpService.get(process.env.REACT_APP_rgsevaUrl + "/accom/getBookingOpenStatus").then((response) => {
            let data = response.data
            console.log(data)
            setBookingOpenStatus(data)
        })
    }, []);
    const handleInputChange =(event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const tmp = {...bookingOpenStatus, ...{[name]:value}}
        setBookingOpenStatus(tmp)
    }
    const handleFormSubmit = event => {
        event.stopPropagation();
        httpService.post(process.env.REACT_APP_rgsevaUrl + "/accom/saveBookingOpenStatus", bookingOpenStatus).then((response) => {
            let data = response.data
            console.log(data)
            if(data.errorMessage){
                utilService.toastifyError(data.errorMessage)
            }else{
                utilService.toastifySuccess(data.myMessage)
                setBookingOpenStatus(data.sysVar)
            }
        })
    }
    return (
        <div>
            <h5>General settings</h5>
            <Form>
                <div className="row mb-3">
                    <label for="inputEmail3" className="col-sm-3 col-form-label">Booking of accommodation is open?</label>
                    <div className="col-sm-9">
                        <div className='pt-2'>
                            <span>No&nbsp;&nbsp;</span>
                            <Form.Check 
                                type="switch"
                                id="varValue"
                                name='varValue'
                                checked={bookingOpenStatus.varValue}
                                onChange={handleInputChange}
                                style={{display:"inline-block"}}
                            />
                            <span>&nbsp;Yes</span>
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="inputEmail3" className="col-sm-3 col-form-label">Message to be displayed on the notice board</label>
                    <div className="col-sm-9">
                        <div className='pt-2'>
                            <Form.Control
                                name='varMessage'
                                id='varMessage'
                                as="textarea"
                                value={bookingOpenStatus.varMessage}
                                onChange={handleInputChange}
                                placeholder="Enter here when booking will start."
                                style={{ height: '100px' }}
                            />                        
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-3 col-form-label"></label>
                    <div className="col-sm-9">
                        <button type='button' onClick={event =>{handleFormSubmit(event); event.preventDefault();}} className="btn btn-sm btn-outline-primary">&nbsp;Save changes&nbsp;</button>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default GeneralSettings;