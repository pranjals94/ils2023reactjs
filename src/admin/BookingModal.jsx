import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ApiContext } from '../contexts/ApiContext';
import httpService from '../services/httpService';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
function BookingModal(props) {
    const { onSuccess, ...rest } = props
    const [booking, setBooking] = useState({})
    const [errors, setErrors] = useState({})
    const [paymentStatusCol, setPaymentStatusCol] = useState([]);
    const { masterData, setMasterData } = useContext(ApiContext)
    useEffect(() => {
    }, []);
    const refreshData = () => {
        let bookingx = props.booking
        setBooking(bookingx)
        if (bookingx) {
            if (bookingx.paymentMethod === "Payment Gateway") {
                setPaymentStatusCol(masterData.listPaymentStausOptionsPg)
            } else if (bookingx.paymentMethod === "Bank Transfer") {
                setPaymentStatusCol(masterData.listPaymentStausOptionsBt)
            }
        }
    }
    const validate = ({ paymentStatus, paymentReceivedOn, paymentNote, paymentMethod }) => {
        const errorsTmp = {}
        if (paymentStatus === '') {
            errorsTmp.paymentStatus = "Required"
        }
        if (paymentStatus == 'COMPLETE') {
            if (paymentReceivedOn == '') {
                errorsTmp.paymentReceivedOn = "Required"
            }
        }
        return Object.keys(errorsTmp).length === 0 ? null : errorsTmp
    }

    const handleOkClick = () => {
        const errorsTmp = validate(booking)
        if (errorsTmp) {
            setErrors(errorsTmp)
            return
        }
        setErrors({})
        //Update in the server first
        const postData = { booking: booking }
        httpService.post(process.env.REACT_APP_rgsevaUrl + "/booking/updatePaymentStatus", postData).then(res => {
            let data = res.data
            if (data.result === "OK") {
                onSuccess(data.booking)
                props.onHide()
            } else if (data.result === "NOT_OK") {
                toast.error(data.errorMessage);
            }
        }
        )
    }
    const updateTransacton = booking => {
        const postData = { booking: booking }
        httpService.post(process.env.REACT_APP_rgsevaUrl + "/payment/updatePaymentStatusPgApi", postData).then(res => {
            let data = res.data
            if (!data.errorMessage) {
                onSuccess(data.booking)
                props.onHide()
            } else {
                toast.error(data.errorMessage);
            }
        })
    }
    const validateProperty = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (name === 'paymentStatus' && value == '') {
            return "Required"
        }
    }

    const handleOnChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const tmp = { ...booking, ...{ [name]: value } }
        const errorMessage = validateProperty(event)
        const errorsTmp = { ...errors }
        if (errorMessage) {
            errorsTmp[name] = errorMessage
        } else {
            delete errorsTmp[name]
        }
        setErrors(errorsTmp)
        setBooking(tmp)
    }
    const handleOnChangePaymentReceivedOn = (date) => {
        const tmp = { ...booking, ...{ paymentReceivedOn: date } }
        let errorMessage = ''
        if (booking.paymentStatus == 'COMPLETE') {
            if (date == '') {
                errorMessage = "Required"
            }
        }
        const errorsTmp = { ...errors }
        if (errorMessage) {
            errorsTmp.paymentReceivedOn = errorMessage
        } else {
            delete errorsTmp.paymentReceivedOn
        }
        setErrors(errorsTmp)
        setBooking(tmp)
    }
    const renderModal = () => {
        return (
            <Modal {...rest} onShow={() => refreshData()} centered >
                <Modal.Header closeButton>
                    <Modal.Title>Payment status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label text-end">Payment method :</label>
                        <div className="col-sm-8 col-form-label fw-bolder">
                            {booking.paymentMethod}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label text-end">Payment status :</label>
                        <div className="col-sm-8 pe-5">
                            <Form.Select value={booking?.paymentStatus} onChange={handleOnChange} name="paymentStatus" id="paymentStatus" style={{ width: "80%", display: "inline-block" }} disabled={booking.paymentMethod === "Payment Gateway"}>
                                <option value={''}>Select status</option>
                                {paymentStatusCol.map((it, index) => <option key={index} value={it}>{it}</option>)}
                            </Form.Select>
                            {errors.paymentStatus && <span className='fs-4 text-danger ms-1'>*</span>}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label text-end">Received date :</label>
                        <div className="col-sm-8">
                            <DatePicker selected={(booking?.paymentReceivedOn ? new Date(booking?.paymentReceivedOn) : new Date())} onChange={(date) => handleOnChangePaymentReceivedOn(date)} dateFormat="dd-MMM-yyyy" disabled={booking.paymentMethod === "Payment Gateway"} />
                            {errors.paymentReceivedOn && <span className='fs-4 text-danger ms-1'>*</span>}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label text-end">Remarks :</label>
                        <div className="col-sm-8">
                            <Form.Control type="text" onChange={handleOnChange} value={booking?.paymentNote || ''} name='paymentNote' id="paymentNote" />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='container'>
                        <div className="hstack gap-3">
                            <button className="btn btn-sm btn-danger" onClick={() => updateTransacton(props.booking)} disabled={booking.paymentMethod !== "Payment Gateway"} >Update from payment gateway</button>
                            <button className="btn btn-sm btn-secondary ms-auto" onClick={() => { props.onHide() }} style={{ width: "80px" }}>Cancel</button>
                            <button className='btn btn-sm btn-primary' onClick={() => handleOkClick()} style={{ width: "80px" }} disabled={booking.paymentMethod === "Payment Gateway"} >OK</button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <>
            {paymentStatusCol ? renderModal() : <div>Please wait...</div>}
        </>
    );
}

export default BookingModal;