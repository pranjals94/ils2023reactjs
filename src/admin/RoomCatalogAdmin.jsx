import React from 'react';
import { useEffect, useState } from 'react';
import httpService from '../services/httpService'
import { NumericFormat } from 'react-number-format';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
const RoomCatalogAdmin = () => {
  const [roomCatList, setRoomCatList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    httpService.get(process.env.REACT_APP_rgsevaUrl + "/accom/listRoomsPublic").then((response) => {
        setRoomCatList(response.data.roomList)        
      });
    }, []);
    const bookRoom = (room) => {
        if(room){
            let booking = {}
            booking.paymentAmount = room.rentWholeIls
            booking.selectedRoomId = room.id
            navigate("/admin/billingInfo", {replace:false, state: {booking: booking, room:room}})
        }
    }
    return (
        <div>
            <h5>Room details</h5>
            <p>Following rooms available for ILS-2023 participants (from Feb 11th to Feb 16th, 6 days)</p>
            <div className="col-lg-12 mx-auto text-center">
                <main className='mt-3'>
                    <div className='row'>
                        <div className='col-12'>
                            <Row xs={1} md={3} className="g-4">
                                {roomCatList.map((it, idx) => (
                                    <Col key={it.id}>
                                        <Card>
                                            <Card.Header>
                                                <div>
                                                    <span className='fs-5'>{it.hotelName}</span> (code: {it.roomCategory})
                                                    <button className='btn btn-sm btn-outline-secondary float-end' onClick={()=>{bookRoom(it)}}><FontAwesomeIcon icon={faCheck}/> Book</button>
                                                </div>
                                            </Card.Header>
                                            <Card.Body>
                                            <div>
                                                <table class="table table-borderless product-public">
                                                    <tbody>
                                                        <tr>
                                                            <td className='text-end fw-light'>Amount :</td>
                                                            <td className='text-start ps-2'>
                                                            <NumericFormat value={it.rentWholeIls} displayType={'text'} thousandSeparator={true} prefix={'₹'} decimalScale={2}/>
                                                            &nbsp;(<NumericFormat value={it.rentSale} displayType={'text'} thousandSeparator={true} prefix={'₹'} decimalScale={2}/>/Day * 6 days)
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
                                                            <td className='text-start ps-2'>{it.hotWater} </td>
                                                        </tr>
                                                        <tr>
                                                            <td className='text-end fw-light'>Total :</td>
                                                            <td className='text-start ps-2'>{it.roomCountTotal} rooms</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='text-end fw-light'>Booked :</td>
                                                            <td className='text-start ps-2'>{it.roomCountBooked} rooms</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='text-end fw-light'>Available :</td>
                                                            <td className='text-start ps-2'>{it.roomCountAvailable} rooms</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
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
};
export default RoomCatalogAdmin;