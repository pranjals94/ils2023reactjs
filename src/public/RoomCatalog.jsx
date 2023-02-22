import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import httpService from '../services/httpService';
import Constants from '../Constants';
import { NumericFormat } from 'react-number-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
function RoomCatalog(props) {
    const [roomCatList, setRoomCatList] = useState([])

    const navigate = useNavigate();
    const location = useLocation()
    const {booking} = location.state
    const {checksum, nameFull, centerName, phoneNumber, city, country} = booking
    useEffect(() => {
        if(!checksum){
            navigate("/welcome", {replace:true, state: {message: "Something went wrong..."} })
        }else{
            httpService.get(process.env.REACT_APP_rgsevaUrl + "/accom/listRooms").then((response) => {
                setRoomCatList(response.data.roomList)
            })
        }
    }, []);
    const bookNow = (room) => {
        if(room){
            booking.paymentAmount = room.rentWholeIls
            booking.selectedRoomId = room.id
            navigate("/book/orderSummary", {replace:false, state: {booking: booking, room:room}})
        }
    }
    return (
        <div>
            <div className="col-lg-12 mx-auto text-center">
                <main className='mt-3'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='mb-3'>
                                <h5>FOLLOWING ROOMS ARE AVAILBLE FOR BOOKING</h5>
                                <div className='fw-bold'>From feb 11th to feb 16th, 6 days (check out : 9:00am, feb 17th)</div>
                                <div className='text-primary'>Click "Book" button to book the room</div>
                            </div>
                            <Row xs={1} md={3} className="g-4">
                                {roomCatList.map((it, idx) => (
                                    <Col key={it.id}>
                                        <Card>
                                            <Card.Header><span className='fs-5'>{it.hotelName}</span> (code: {it.roomCategory})</Card.Header>
                                            <Card.Body>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td className='text-end fw-light'>Rate :</td>
                                                                <td className='text-start ps-2'>
                                                                    <NumericFormat value={it.rentWholeIls} displayType={"text"} thousandSeparator={true} prefix={"₹"} decimalScale={2}/>
                                                                     (<NumericFormat value={it.rentSale} displayType={'text'} thousandSeparator={true} prefix={'₹'} decimalScale={2}/>/Day)
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className='text-end fw-light'>Type :</td>
                                                                <td className='text-start ps-2 ps-2'>{it.roomType}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='text-end fw-light'>Beds :</td>
                                                                <td className='text-start ps-2'>{it.beds}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='text-end fw-light'>Capacity :</td>
                                                                <td className='text-start ps-2'>{it.maxAdult} + {it.maxChild} (Child)</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='text-end fw-light'>Floor :</td>
                                                                <td className='text-start ps-2'>{it.whichFloor}</td>
                                                            </tr>

                                                            <tr>
                                                                <td className='text-end fw-light'>Lift :</td>
                                                                <td className='text-start ps-2'>{it.lift}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='text-end fw-light'>Bathroom :</td>
                                                                <td className='text-start ps-2'>{it.bathroomType}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='text-end fw-light'>Toilet :</td>
                                                                <td className='text-start ps-2'>{it.toiletType}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='text-end fw-light'>Hotwater :</td>
                                                                <td className='text-start ps-2'>{it.hotWater}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='text-end fw-light'>Available :</td>
                                                                <td className='text-start ps-2'>{it.roomCountAvailable} rooms</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <button className='btn btn-sm btn-outline-primary' onClick={() => bookNow(it)} > <FontAwesomeIcon  icon={faCheck}/> &nbsp;Book&nbsp;</button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default RoomCatalog;