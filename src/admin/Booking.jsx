import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import { format, parseISO } from 'date-fns';
import { getPaymentStatusCssClass } from '../Utils';
import { useEffect } from 'react';
import BookingModal from './BookingModal';
import { faAngleLeft, faBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Booking(props) {
    const navigate = useNavigate();
    const [modalPaymentStatusToggle, setModalPaymentStatusToggle] = useState(false);
    const [bookingTmp, setBookingTmp] = useState({})
    const location = useLocation()
    const { booking } = location.state
    const { room } = booking

    const handleShowModalPaymentStatusToggle = () => {
        setModalPaymentStatusToggle(true);
    }
    useEffect(() => {
        setBookingTmp(booking)
    }, []);
    const handleShowModalPaymentStatusSuccess = (booking) => {
        const b = { ...booking }
        setBookingTmp(b)
    }

    return (
        <div>
            <div className='row d-flex justify-content-center'>
                <div className='col-lg-12 col-md-12 col-sm-12'>
                    <div className='border rounded p-4 pt-1 mt-1'>
                        <div>
                            <span className='fs-5'>BOOKING DETAILS</span>
                        </div>
                        <div className='row'>
                            <div className='col-lg-2 col-md-2 col-sm-2 text-center'>
                                <div className='fw-bold'>Order #</div>
                                <div>{bookingTmp.id}</div>
                            </div>
                            <div className='col-lg-2 col-md-2 col-sm-2 text-center'>
                                <div className='fw-bold'>Order date</div>
                                <div>{(bookingTmp.bookingRequestOn) ? (format(parseISO(bookingTmp.bookingRequestOn), 'dd-MMM hh:mm a')).toLocaleLowerCase() : ''}</div>
                            </div>
                            <div className='col-lg-2 col-md-2 col-sm-2 text-center'>
                                <div className='fw-bold'>Payment method</div>
                                <div>{bookingTmp.paymentMethod}</div>
                            </div>
                            <div className='col-lg-2 col-md-2 col-sm-2 text-center'>
                                <div className='fw-bold'>Payment status</div>
                                <div>
                                    <a href='' onClick={(event) => { event.preventDefault(); handleShowModalPaymentStatusToggle() }} className={getPaymentStatusCssClass(bookingTmp.paymentStatus)} style={{ width: "120px" }}>
                                        {bookingTmp.paymentStatus}
                                    </a>
                                </div>
                            </div>
                            <div className='col-lg-2 col-md-2 col-sm-2 text-center'>
                                <div className='fw-bold'>Amount</div>
                                <div>
                                    <NumericFormat value={bookingTmp.paymentAmount} displayType={'text'} thousandSeparator={true} prefix={'₹'} decimalScale={2} />
                                </div>
                            </div>
                            <div className='col-lg-2 col-md-2 col-sm-2 text-center'>
                                <div className='fw-bold'>Amt Recd Date</div>
                                <div>{(bookingTmp.paymentReceivedOn) ? (format(new Date(bookingTmp.paymentReceivedOn), 'dd-MMM')).toLocaleLowerCase() : ''}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row d-flex justify-content-center mt-3'>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <div className='border rounded p-4'>
                        <div className='text-center bg-light border rounded p-1'>
                            <span className='fs-5'>DEVOTEE DETAILS</span>
                        </div>
                        <table>
                            <tbody>
                                <tr>
                                    <td className='text-end fw-light'>Registration Ticket :</td>
                                    <td className='text-start ps-2'>{bookingTmp.checksum}</td>
                                </tr>
                                <tr>
                                    <td className='text-end fw-light'>First name :</td>
                                    <td className='text-start ps-2'>{bookingTmp.firstName}</td>
                                </tr>
                                <tr>
                                    <td className='text-end fw-light'>Last name :</td>
                                    <td className='text-start ps-2'>{bookingTmp.lastName}</td>
                                </tr>
                                <tr>
                                    <td className='text-end fw-light'>Initiated name :</td>
                                    <td className='text-start ps-2'>{bookingTmp.initiatedName}</td>
                                </tr>
                                <tr>
                                    <td className='text-end fw-light'>Center :</td>
                                    <td className='text-start ps-2'>{bookingTmp.centerName}</td>
                                </tr>
                                <tr>
                                    <td className='text-end fw-light'>Email :</td>
                                    <td className='text-start ps-2'>{bookingTmp.email}</td>
                                </tr>
                                <tr>
                                    <td className='text-end fw-light'>Phone number :</td>
                                    <td className='text-start ps-2'>{bookingTmp.phoneNumber}</td>
                                </tr>
                                <tr>
                                    <td className='text-end fw-light'>City :</td>
                                    <td className='text-start ps-2'>{bookingTmp.city}</td>
                                </tr>
                                <tr>
                                    <td className='text-end fw-light'>State :</td>
                                    <td className='text-start ps-2'>{bookingTmp.state}</td>
                                </tr>
                                <tr>
                                    <td className='text-end fw-light'>Country :</td>
                                    <td className='text-start ps-2'>{bookingTmp.country}</td>
                                </tr>
                                <tr>
                                    <td className='text-end fw-light'>Special requirement :</td>
                                    <td className='text-start ps-2'>{bookingTmp.customerSpecialRequirement}</td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <a href={process.env.REACT_APP_rgsevaUrl + "/book/retry?id=" + bookingTmp.id + "&t=" + bookingTmp.uniqueFormId}>Retry</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <div className='border rounded p-4'>
                        <div className='text-center bg-light border rounded p-1'>
                            <span className='fs-5'>ROOM DETAILS</span>
                        </div>
                        <table>
                            <tbody>
                                <tr>
                                    <td className='text-end fw-light'>Rate :</td>
                                    <td className='text-start ps-2'>
                                        <NumericFormat value={room.rentSale} displayType={'text'} thousandSeparator={true} prefix={'₹'} decimalScale={2} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='text-end fw-light'>ILS Rate :</td>
                                    <td className='text-start ps-2'>
                                        <NumericFormat value={room.rentWholeIls} displayType={'text'} thousandSeparator={true} prefix={'₹'} decimalScale={2} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='text-end fw-light'>Guesthouse :</td>
                                    <td className='text-start ps-2 ps-2'>{room.hotelName}</td>
                                </tr>
                                <tr>
                                    <td className='text-end fw-light'>Type :</td>
                                    <td className='text-start ps-2 ps-2'>{room.roomType}</td>
                                </tr>
                                <tr>
                                    <td className='text-end fw-light'>Beds :</td>
                                    <td className='text-start ps-2'>{room.beds}</td>
                                </tr>
                                <tr>
                                    <td className='text-end fw-light'>Capacity :</td>
                                    <td className='text-start ps-2'>{room.maxAdult} + {room.maxChild} (Child)</td>
                                </tr>
                                <tr>
                                    <td className='text-end fw-light'>Lift :</td>
                                    <td className='text-start ps-2'>{room.lift}</td>
                                </tr>
                                <tr>
                                    <td className='text-end fw-light'>Floor :</td>
                                    <td className='text-start ps-2'>{room.whichFloor}</td>
                                </tr>
                                <tr>
                                    <td className='text-end fw-light'>Bathroom :</td>
                                    <td className='text-start ps-2'>{room.bathroomType}</td>
                                </tr>
                                <tr>
                                    <td className='text-end fw-light'>Toilet :</td>
                                    <td className='text-start ps-2'>{room.toiletType}</td>
                                </tr>
                                <tr>
                                    <td className='text-end fw-light'>Hotwater :</td>
                                    <td className='text-start ps-2'>{room.hotWater}</td>
                                </tr>
                                <tr>
                                    <td className='text-end fw-light'>Available :</td>
                                    <td className='text-start ps-2'>{room.roomCountAvailable} rooms</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className='row d-flex justify-content-center mt-3'>
                <div className='col-sm-12'>
                    <div className='border rounded pt-2 mt-1 pb-2 text-center'>
                        <button className='btn btn-primary' onClick={() => navigate(-1)}><FontAwesomeIcon icon={faAngleLeft} /> Go back</button>
                    </div>
                </div>
            </div>
            <BookingModal
                show={modalPaymentStatusToggle}
                booking={bookingTmp}
                onSuccess={handleShowModalPaymentStatusSuccess}
                onHide={() => setModalPaymentStatusToggle(false)}
            />
        </div>
    );
}

export default Booking;