import React from 'react';
import Footer from './Footer';
import MyHeader from './MyHeader';
import { Navbar, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import httpService from '../services/httpService'
import { NumericFormat } from 'react-number-format';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const RoomListPublic = () => {
  const [roomCatList, setRoomCatList] = useState([]);
  const [roomCatListStored, setRoomCatListStored] = useState([]);
  useEffect(() => {
    httpService.get(process.env.REACT_APP_rgsevaUrl + "/accom/listRoomsPublic").then((response) => {
        setRoomCatList(response.data.roomList)        
        setRoomCatListStored(response.data.roomList)
      });
    }, []);

    return (
        <div className="container py-3">
            <MyHeader />
            <main className="flex-shrink-0">
              <div className="container mb-5 pb-5">
                <h5>Room details</h5>
                <p>Following rooms available for ILS-2023 participants (From feb 11th to feb 16th, 6 days; check out : 9:00am, feb 17th)</p>
                <div className="col-lg-12 mx-auto text-center">
                  <main className='mt-3'>
                      <div className='row'>
                          <div className='col-12'>
                              <Row xs={1} md={2} className="g-4">
                                  {roomCatList.map((it, idx) => (
                                      <Col key={it.id}>
                                          <Card>
                                              <Card.Header><span className='fs-5'>{it.hotelName}</span> (code: {it.roomCategory})</Card.Header>
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
                                                              <td className='text-start ps-2'>{it.hotWater}</td>
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
            </main>
            <Navbar fixed="bottom">
              <Footer/>
            </Navbar>
        </div>
    );
};
export default RoomListPublic;