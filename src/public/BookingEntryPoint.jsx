import React, {useState, useEffect, useContext} from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { ApiContext } from '../contexts/ApiContext';
import httpService from '../services/httpService';
function BookingEntryPoint(props) {
    const {user, setUser} = useContext(ApiContext)
    const [ticketNumber, setTicketNumber] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)
    const navigate = useNavigate();
    useEffect(() => {
        httpService.get(process.env.REACT_APP_rgsevaUrl + "/accommodation/bookingOn").then((response) => {
            let data = response.data
            if(!user && data.varValue === false){
                navigate("/notice", {replace:true, state: {message: data.varMessage} })
            }
        })
    }, []);

    const checkTicketNumber = ()=>{
        if(!ticketNumber || ticketNumber.trim() === ''){
            setErrorMessage("Please enter your registration ticket number.")
            return
        }
        setErrorMessage("")
        let url = process.env.REACT_APP_rgsevaUrl + "/accommodation/validateRegistrationTicket?t=" + ticketNumber
        if(ticketNumber){
            httpService.get(url).then((response) => {
                let data = response.data
                if(data.result === "OK"){
                    navigate("/book/chooseRoom", {replace:true, state: {booking: data.booking}})
                }else if(data.result === "NOT_OK"){
                    setErrorMessage(data.message);    
                }
            })          
        }
    }
    return (
        <div className='text-center pt-4'>
            <h2>Book your Accommodation</h2>
            <p className="fs-5 mt-4">
                After your Registration for ILS-2023 is confirmed, you can book your accommodation here. 
            </p>
            <div className="mb-5 fs-5">
                <h4>To continue please enter your valid ILS registration ticket number</h4>
                {errorMessage?<div className='alert alert-danger'>{errorMessage}</div>:""}
                <div className="col-md-4 col-lg-4 mx-auto mt-3">
                    <input type="text" value={ticketNumber} onChange={e=>setTicketNumber(e.target.value)} className="form-control text-center fw-bold fs-4" maxLength={20}></input>
                    <div className='mt-1'>
                        <Button variant="primary" onClick={checkTicketNumber} style={{width:"100%"}}>Verify and book room</Button>                                    
                    </div>
                </div>
            </div>
            <h3>Not yet registered?</h3>
            <div className="col-md-4 col-lg-4 mx-auto mt-4">
                <div className='mt-2'>
                    <a href='https://ilsglobal.org/register/#reg' className="btn btn-success btn-md col-12">Register now</a>
                </div>
            </div>                        
        </div>
    );
}

export default BookingEntryPoint;