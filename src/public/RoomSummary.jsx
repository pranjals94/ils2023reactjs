import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBackward, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
function RoomSummary(props) {
    const [roomCatList, setRoomCatList] = useState([])

    const navigate = useNavigate();
    const location = useLocation()
    const { booking, room } = location.state
    const { checksum, nameFull, centerName, phoneNumber, city, country } = booking
    useEffect(() => {
        if (!checksum) {
            navigate("/welcome", { replace: true, state: { message: "Something went wrong..." } })
        }
    }, []);
    const continueHandler = () => {
        if (room) {
            navigate("/book/billingInfo", { replace: false, state: { booking: booking, room: room } })
        }
    }
    const backHandler = () => {
        if (room) {
            navigate("/book/chooseRoom", { replace: false, state: { booking: booking, room: room } })
        }
    }
    return (
        <div>
            <h5 className='text-center'>Your order summary</h5>
            <div className='row d-flex justify-content-center'>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <div className='border rounded p-4'>
                        <table className='table table-borderless'>
                            <tbody>
                                <tr>
                                    <td className='text-end fw-light'>Rate :</td>
                                    <td className='text-start ps-2'>
                                        <NumericFormat value={room.rentWholeIls} displayType={"text"} thousandSeparator={true} prefix={"₹"} decimalScale={2} />
                                        (<NumericFormat value={room.rentSale} displayType={'text'} thousandSeparator={true} prefix={'₹'} decimalScale={2} />/Day)
                                    </td>
                                </tr>
                                <tr>
                                    <td className='text-end fw-light'>Hotel/guest house :</td>
                                    <td className='text-start ps-2 ps-2'><span>{room.hotelName}</span> (code: {room.roomCategory})</td>
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
                                    <td className='text-end fw-light'>Floor :</td>
                                    <td className='text-start ps-2'>{room.whichFloor}</td>
                                </tr>

                                <tr>
                                    <td className='text-end fw-light'>Lift :</td>
                                    <td className='text-start ps-2'>{room.lift}</td>
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
                            </tbody>
                        </table>
                        <div className="hstack gap-3 mt-5">
                            <button className='btn btn-sm btn-outline-primary' style={{ width: "100px" }} onClick={backHandler}><FontAwesomeIcon icon={faAngleLeft} />  Back</button>
                            <button className='btn btn-sm btn-outline-primary ms-auto' style={{ width: "100px" }} onClick={continueHandler}>Continue <FontAwesomeIcon icon={faAngleRight} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomSummary;