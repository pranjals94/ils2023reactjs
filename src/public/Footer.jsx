import React from 'react';
import { useNavigate } from 'react-router-dom';
const Footer = () => {
    const navigate = useNavigate()
    return (
        <>
            <footer className="text-muted border-top text-center pt-2 pb-0" style={{width:"100%"}}>
                <ul className="nav justify-content-center pb-2 mb-0">
                    <li className="nav-item"><a href="" onClick={(event)=>{navigate("/public/about-us");event.preventDefault()}} className="nav-link px-2 text-muted">About us</a></li>
                    <li className="nav-item"><a href="" onClick={(event)=>{navigate("/public/contact-us");event.preventDefault()}} className="nav-link px-2 text-muted">Contact us</a></li>
                    <li className="nav-item"><a href="" onClick={(event)=>{navigate("/public/cancellation-refund-policy");event.preventDefault()}} className="nav-link px-2 text-muted">Refund policy</a></li>
                    <li className="nav-item"><a href="" onClick={(event)=>{navigate("/public/cancellation-refund-policy");event.preventDefault()}} className="nav-link px-2 text-muted">Cancellation policy</a></li>
                    <li className="nav-item"><a href="" onClick={(event)=>{navigate("/public/terms-conditions"); event.preventDefault()}} className="nav-link px-2 text-muted">Terms and condition</a></li>
                    <li className="nav-item"><a href="" onClick={(event)=>{navigate("/public/room-details"); event.preventDefault()}} className="nav-link px-2 text-muted">Room details</a></li>
                    <li className="nav-item"><a href="" onClick={(event)=>{navigate("/book/"); event.preventDefault()}} className="nav-link px-2 text-muted">Book room</a></li>
                </ul>
            </footer>
        </>
    );
};
export default Footer;