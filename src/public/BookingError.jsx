import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import utilService from '../services/utilService';
function BookingError(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [booking, setBooking] = useState({})
    const [room, setRoom] = useState({})
    const [errorMessage, setErrorMessage] = useState("")
    const [errorCode, setErrorCode] = useState(0)

    const navigate = useNavigate();
    const errorButtonClickHandler = (event, code) => {
        if (code === 1) { //Startover
            navigate("/welcome", { replace: true })
        } else if (code === 2) { //Go to choose roorm
            navigate("/book/chooseRoom", { replace: true, state: { booking: booking } })
        } else if (code === 3) { //Go to check out page
            navigate("/book/billingInfo", { replace: true, state: { booking: booking, room: room } })
        }
    }
    /*
    checksum: "2300001"
    errorCode: 2
    errorMessage: "You canot go head...THis is errors."
    selectedRoomId: 2
    uniqueFormId: "NC2QEP415VFYQVOXUUNGNKJKRDMARPJQTXNWIRI7FBAICUKJAEZC8FTOJ4GZTRE1"    
    */
    useEffect(() => {
        let p = searchParams.get("p")
        const json = utilService.decryptP(p)
        setErrorCode(json.errorCode)
        setErrorMessage(json.errorMessage)
        setBooking(json.booking)
        setRoom(json.room)

    }, []);
    //erorrcode = 1 = go home; 2=Go to payment; 3=select new room.
    const renderBtn = (code) => {
        if (code === 1) { //Start over
            return "Book again"
        } else if (code === 2) { //Biilling info wrong
            return "Try again"
        } else if (code === 3) { //Choose a room
            return "Try another room"
        }
    }
    return (
        <div>
            <div className='row d-flex justify-content-center mt-4'>
                <div className='col-lg-12 col-md-12 col-sm-12'>
                    <div className="alert alert-danger" role="alert">
                        {errorMessage} (code : {errorCode})
                    </div>
                </div>
            </div>
            <div className='text-center mt-3'>
                <button type='button' onClick={(event) => errorButtonClickHandler(event, errorCode)} className='btn btn-link' >{renderBtn(errorCode)}</button>
            </div>
        </div>
    );
}
export default BookingError;