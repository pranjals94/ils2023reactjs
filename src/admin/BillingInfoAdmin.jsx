import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import httpService from '../services/httpService';
import Constants from '../Constants';
import { NumericFormat } from 'react-number-format';
import { toast } from 'react-toastify';
import utilService from '../services/utilService';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ApiContext } from '../contexts/ApiContext';

function BillingInfoAdmin(props) {
    const navigate = useNavigate();
    const location = useLocation()

    const [booking, setBooking] = useState({})
    const [errors, setErrors] = useState({})
    const [errorMessage, setErrorMessage] = useState("")
    const { masterData, setMasterData } = useContext(ApiContext);
    const [paymentStatusCol, setPaymentStatusCol] = useState([]);
    const { room } = location.state
    const countries = utilService.countries
    useEffect(() => {
        let { booking, room } = location.state
        httpService.get(process.env.REACT_APP_rgsevaUrl + "/booking/getUniqueFormIdBookingPrivate").then((response) => {
            booking.uniqueFormId = response.data.id
            setBooking(booking)
        });

    }, []);
    const resetPaymentStatusCol = (booking) => {
        setPaymentStatusCol([])
        if (booking) {
            if (booking.paymentMethod === "Payment Gateway") {
                setPaymentStatusCol(masterData.listPaymentStausOptionsPg)
            } else if (booking.paymentMethod === "Bank Transfer") {
                setPaymentStatusCol(masterData.listPaymentStausOptionsBt)
            } else if (booking.paymentMethod === "Cash") {
                setPaymentStatusCol(masterData.listPaymentStausOptionsCash)
            }
        }
    }
    const handleSave = (event) => {
        event.stopPropagation();
        const errorsTmp = validate(booking)
        if (errorsTmp) {
            setErrors(errorsTmp)
            setErrorMessage("Errors in the inputs. Please check *highlighted fields.")
            return
        }
        setErrors({})
        setErrorMessage("")
        //const postData = {booking, room:room}
        httpService.post(process.env.REACT_APP_rgsevaUrl + "/booking/saveBooking", booking).then((response) => {
            let data = response.data
            if (data.result === "NOT_OK") {
                utilService.toastifyError(data.errorMessage)
            } else {
                utilService.toastifySuccess(data.myMessage)
                navigate("/admin/bookingList", { replace: true })
            }
        });

    }
    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const tmp = { ...booking, ...{ [name]: value } }

        //Validation
        const errorMessageTmp = validateProperty(event)
        const errorsTmp = { ...errors }
        if (errorMessageTmp) {
            errorsTmp[name] = errorMessageTmp
        } else {
            delete errorsTmp[name]
        }
        //Default value
        if (name === 'paymentMethod') {
            if (value === 'Payment Gateway') {
                tmp.paymentStatus = 'INCOMPLETE'
            } else if (value === 'Bank Transfer') {
                tmp.paymentStatus = 'ON HOLD'
            } else if (value === 'Cash') {
                tmp.paymentStatus = 'COMPLETE'
            } else {
                tmp.paymentStatus = ''
            }
        }
        //Settings 
        setErrors(errorsTmp)
        setBooking(tmp)
        setErrorMessage("")
        resetPaymentStatusCol(tmp)
    }
    const backHandler = () => {
        if (room) {
            navigate("/book/chooseRoom", { replace: false, state: { booking: booking, room: room } })
        }
    }
    const validate = ({ firstName, lastName, email, phoneNumber, centerName, city, state, country, paymentMethod, paymentStatus }) => {
        const errorsTmp = {}
        if (!firstName || firstName.trim() === '') {
            errorsTmp.firstName = "Required"
        }
        if (!lastName || lastName.trim() === '') {
            errorsTmp.lastName = "Required"
        }
        if (!emailValidation(email)) {
            errorsTmp.email = "Required"
        }
        if (!phoneNumber || phoneNumber.trim() === '') {
            errorsTmp.phoneNumber = "Required"
        }
        if (!centerName || centerName.trim() === '') {
            errorsTmp.centerName = "Required"
        }
        if (!city || city.trim() === '') {
            errorsTmp.city = "Required"
        }
        if (!state || state.trim() === '') {
            errorsTmp.state = "Required"
        }
        if (!country || country.trim() === '') {
            errorsTmp.country = "Required"
        }
        if (!paymentMethod || paymentMethod.trim() === '') {
            errorsTmp.paymentMethod = "Required"
        }
        if (!paymentStatus || paymentStatus.trim() === '') {
            errorsTmp.paymentStatus = "Required"
        }

        return Object.keys(errorsTmp).length === 0 ? null : errorsTmp
    }
    const emailValidation = (email) => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!email || regex.test(email) === false) {
            return false;
        }
        return true;
    }
    const validateProperty = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (name === 'email' && !emailValidation(value)) {
            return "Required"
        } else if (value.trim() === '') {
            return "Required"
        }
    }

    return (
        <div>
            <form>
                <div className='row mt-4'>
                    <div className='col-12 col-md-6 col-sm-12 col-lg-6'>
                        <div className='border rounded p-4'>
                            <div>
                                <h5 className='text-center'>Billing</h5>
                            </div>
                            <div className="row">
                                <div className="col-md-6 my-0">
                                    <div className="form-floating mb-3" style={{ width: "60%", display: 'inline-block' }}>
                                        <input type="text" value={booking.checksum} onChange={handleInputChange} className="form-control" id="checksum" name='checksum' placeholder="Ticket number" />
                                        <label for="checksum">ILS iicket number {errors.checksum && <span className='text-danger'>*</span>}</label>
                                    </div>
                                    <div className="mb-3 ps-1" style={{ display: 'inline-block' }}>
                                        <FontAwesomeIcon icon={faSearch} /> <a href='' onClick={(event) => { event.preventDefault(); }}>Check</a>
                                    </div>
                                </div>

                                <div className="col-md-6 my-0">
                                    <div className="form-floating mb-3">
                                        <input type="text" value={booking.firstName} onChange={handleInputChange} className="form-control" id="firstName" name='firstName' placeholder="Your first name" />
                                        <label for="firstName">First name {errors.firstName && <span className='text-danger'>*</span>}</label>
                                    </div>
                                </div>
                                <div className="col-md-6 my-0">
                                    <div className="form-floating mb-3">
                                        <input type="text" value={booking.lastName} onChange={handleInputChange} className="form-control" id="lastName" name='lastName' placeholder="Your last name" />
                                        <label for="lastName">Last name {errors.lastName && <span className='text-danger'>*</span>}</label>
                                    </div>
                                </div>
                                <div className="col-md-6 my-0">
                                    <div className="form-floating mb-3">
                                        <input type="text" value={booking.initiatedName} onChange={handleInputChange} className="form-control" id="initiatedName" name='initiatedName' placeholder="Initiated name" />
                                        <label for="initiatedName">Initiated name</label>
                                    </div>
                                </div>
                                <div className="col-md-6 my-0">
                                    <div className="form-floating mb-3">
                                        <input type="email" value={booking.email} onChange={handleInputChange} className="form-control" id="email" name='email' placeholder="Email" />
                                        <label for="email">Email {errors.email && <span className='text-danger'>*</span>}</label>
                                    </div>
                                </div>
                                <div className="col-md-6 my-0">
                                    <div className="form-floating mb-3">
                                        <input type="text" value={booking.phoneNumber} onChange={handleInputChange} className="form-control" id="phoneNumber" name='phoneNumber' placeholder="Phone number" />
                                        <label for="phoneNumber">Phone number {errors.phoneNumber && <span className='text-danger'>*</span>}</label>
                                    </div>
                                </div>
                                <div className="col-md-6 my-0">
                                    <div className="form-floating mb-3">
                                        <input type="text" value={booking.centerName} onChange={handleInputChange} className="form-control" id="centerName" name='centerName' placeholder="ISKCON Center" />
                                        <label for="centerName">ISKCON Center {errors.centerName && <span className='text-danger'>*</span>}</label>
                                    </div>
                                </div>
                                <div className="col-md-6 my-0">
                                    <div className="form-floating mb-3">
                                        <input type="text" value={booking.city} onChange={handleInputChange} className="form-control" id="city" name='city' placeholder="City" />
                                        <label for="city">City {errors.city && <span className='text-danger'>*</span>}</label>
                                    </div>
                                </div>
                                <div className="col-md-6 my-0">
                                    <div className="form-floating mb-3">
                                        <input type="text" value={booking.state} onChange={handleInputChange} className="form-control" id="state" name='state' placeholder="State" />
                                        <label for="state">State / province {errors.state && <span className='text-danger'>*</span>}</label>
                                    </div>
                                </div>
                                <div className="col-md-6 my-0">
                                    <div className="form-floating mb-3">
                                        <select id="country" name="country" value={booking.country} onChange={handleInputChange} className="form-select">
                                            <option value={''}>Select Country</option>
                                            {countries.map((it, index) => <option key={index} value={it}>{it}</option>)}
                                        </select>
                                        <label for="country">Country {errors.country && <span className='text-danger'>*</span>}</label>
                                    </div>
                                </div>
                                <div className="col-md-12 my-0">
                                    <div className="form-floating mb-3">
                                        <input type="text" value={booking.customerSpecialRequirement} onChange={handleInputChange} className="form-control" id="customerSpecialRequirement" name='customerSpecialRequirement' placeholder="Special requirement" />
                                        <label for="state">Special requirements </label>
                                    </div>
                                </div>

                                <div className="col-md-6 my-0">
                                    <div className="form-floating mb-3">
                                        <select id="paymentMethod" name="paymentMethod" value={booking.paymentMethod} onChange={handleInputChange} className="form-select">
                                            <option value={''}>Select payment method</option>
                                            {masterData.listPaymentMethods.map((it, index) => <option key={index} value={it}>{it}</option>)}
                                        </select>
                                        <label for="paymentMethod">Payment method {errors.paymentMethod && <span className='text-danger'>*</span>}</label>
                                    </div>
                                </div>
                                <div className="col-md-6 my-0">
                                    <div className="form-floating mb-3">
                                        <select id="paymentStatus" name="paymentStatus" value={booking.paymentStatus} onChange={handleInputChange} className="form-select" disabled>
                                            <option value={''}>Select payment status</option>
                                            {paymentStatusCol.map((it, index) => <option key={index} value={it}>{it}</option>)}
                                        </select>
                                        <label for="paymentStatus">Payment status {errors.paymentStatus && <span className='text-danger'>*</span>}</label>
                                    </div>
                                </div>
                                <div className="col-md-12 my-0">
                                    <div className="form-floating mb-3">
                                        <input type="text" value={booking.paymentNote} onChange={handleInputChange} className="form-control" id="paymentNote" name='paymentNote' placeholder="Remarks" />
                                        <label for="state">Remarks </label>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className='text-center'>
                                        {errorMessage && <span className='text-danger'>{errorMessage}</span>}
                                    </div>
                                    <div className='d-flex justify-content-center p-2 mt-2'>
                                        <button type="button" onClick={handleSave} className="btn btn-primary">Save booking</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-sm-12 col-lg-6'>
                        <div>
                            <div className='row'>
                                <div className="col-md-12 my-0">
                                    <Card>
                                        <Card.Header>
                                            <div>
                                                <span className='fs-5'>{room.hotelName}</span> (code: {room.roomCategory})
                                            </div>
                                        </Card.Header>
                                        <Card.Body>
                                            <div>
                                                <table class="table table-borderless product-public">
                                                    <tbody>
                                                        <tr>
                                                            <td className='text-end fw-light'>Amount :</td>
                                                            <td className='text-start ps-2'>
                                                                <NumericFormat value={room.rentWholeIls} displayType={'text'} thousandSeparator={true} prefix={'₹'} decimalScale={2} />
                                                                &nbsp;(<NumericFormat value={room.rentSale} displayType={'text'} thousandSeparator={true} prefix={'₹'} decimalScale={2} />/Day * 6 days)
                                                            </td>
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
                                                            <td className='text-start ps-2'>{room.hotWater} </td>
                                                        </tr>
                                                        <tr>
                                                            <td className='text-end fw-light'>Total :</td>
                                                            <td className='text-start ps-2'>{room.roomCountTotal} rooms</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='text-end fw-light'>Booked :</td>
                                                            <td className='text-start ps-2'>{room.roomCountBooked} rooms</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='text-end fw-light'>Available :</td>
                                                            <td className='text-start ps-2'>{room.roomCountAvailable} rooms</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default BillingInfoAdmin;