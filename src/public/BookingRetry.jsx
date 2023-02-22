import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import httpService from '../services/httpService';
const BookingRetry = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("")
    useEffect(() => {
        let id = searchParams.get("id")
        let uniqueFormId = searchParams.get("t")
        httpService.post(process.env.REACT_APP_rgsevaUrl + "/booking/retryPayment", { id: id, uniqueFormId: uniqueFormId }).then((response) => {
            let data = response.data
            if (data.result == "NOT_OK") {
                setErrorMessage(data.errorMessage)
            } else {
                let { booking, room } = data
                console.log(booking)
                console.log(room)
                navigate("/book/billingInfo", { replace: false, state: { booking: booking, room: room } })
            }
        });
    }, []);
    return (
        <div>
            <h1>Redirecting....</h1>
            <div className='alert alert-danger'>{errorMessage}</div>
        </div>
    );
};
export default BookingRetry;