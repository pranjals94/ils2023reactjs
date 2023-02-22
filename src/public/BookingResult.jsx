import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import utilService from '../services/utilService';
import { NumericFormat } from 'react-number-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEnvelope, faPrint, faReceipt } from '@fortawesome/free-solid-svg-icons';
function BookingResult(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [booking, setBooking] = useState({})
    const [room, setRoom] = useState({})
    const [errorMessage, setErrorMessage] = useState("")
    const [myMessage, setMyMessage] = useState("")

    const navigate = useNavigate();
    const homeBtnHandler = (event) => {
        navigate("/welcome", { replace: true })
    }
    useEffect(() => {
        let p = searchParams.get("p")
        const json = utilService.decryptP(p)
        setBooking(json.booking)
        setErrorMessage(json.errorMessage)
        setMyMessage(json.myMessage)
        setRoom(json.room)
        console.log(json)

    }, []);
    return (
        <div>
            <div className='fw-bold text-center'>
                <span dangerouslySetInnerHTML={{ __html: myMessage }}></span>
            </div>
            <div className='row d-flex justify-content-center mt-3'>
            </div>
            <div className='row d-flex justify-content-center mt-4'>
                <div className='col-sm-12  d-flex justify-content-center'>
                    <button type='button' onClick={homeBtnHandler} className='btn btn-sm btn-outline-primary' style={{ minWidth: "100px", width: "150px" }}>Book anotther room</button>
                    &nbsp;&nbsp;<a href={process.env.REACT_APP_rgsevaUrl + "/payment/printReceipt?id=" + booking.id} className='btn btn-sm btn-outline-danger' style={{ minWidth: "100px", width: "150px" }}><FontAwesomeIcon icon={faReceipt} /> Open receipt </a>
                </div>
            </div>
        </div>
    );
}
export default BookingResult;