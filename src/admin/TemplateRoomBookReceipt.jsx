import React from 'react';
import { Form } from 'react-bootstrap';
import httpService from '../services/httpService';
import { useState } from 'react';
import { useEffect } from 'react';
import utilService from '../services/utilService';
const TemplateRoomBookReceipt = () => {
    const [template, setTemplate] = useState({})
    const [errors, setErrors] = useState({})
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        httpService.get(process.env.REACT_APP_rgsevaUrl + "/accom/getTemplateReceiptRoomBooking").then((response) => {
            let data = response.data
            setTemplate(data)
        })
    }, []);
    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const tmp = { ...template, ...{ [name]: value } }
        setTemplate(tmp)

        const errorMessageTmp = validateProperty(event)
        const errorsTmp = { ...errors }
        if (errorMessageTmp) {
            errorsTmp[name] = errorMessageTmp
        } else {
            delete errorsTmp[name]
        }
        setErrors(errorsTmp)
        setErrorMessage("")
    }
    const handleFormSubmit = event => {
        event.stopPropagation();
        let errorsTmp = validate(template)
        if (errorsTmp) {
            setErrors(errorsTmp)
            setErrorMessage("Errors in the inputs. Please check *highlighted fields.")
            return
        }
        setErrors({})
        setErrorMessage("")

        httpService.post(process.env.REACT_APP_rgsevaUrl + "/accom/saveTemplateReceiptRoomBooking", template).then((response) => {
            let data = response.data
            console.log(data)
            if (data.errorMessage) {
                utilService.toastifyError(data.errorMessage)
            } else {
                utilService.toastifySuccess(data.myMessage)
                setTemplate(data.sysVar)
            }
        })
    }
    const validate = ({ varMessage }) => {
        const errorsTmp = {}
        if (varMessage.trim() === '') {
            errorsTmp.varMessage = "Required"
        }
        return Object.keys(errorsTmp).length === 0 ? null : errorsTmp
    }
    const validateProperty = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (value.trim() === '') {
            return "Required"
        }
    }
    return (
        <div>
            <h5>Room booking receipt</h5>
            <div className='mb-2'></div>
            <Form>
                <div className="mb-3">
                    <label className="form-label">HTML body {errors.varMessage && <span className='text-danger ms-1'>*</span>}</label>
                    <Form.Control
                        name='varMessage'
                        id='varMessage'
                        as="textarea"
                        value={template.varMessage}
                        onChange={handleInputChange}
                        placeholder="Enter here when booking will start."
                        style={{ height: '200px', width: '96%' }}
                    />
                </div>
                <div className='mb-3'>
                    <label className="col-sm-3 col-form-label"></label>
                    <div className="col-sm-9">
                        <button type='button' onClick={event => { handleFormSubmit(event); event.preventDefault(); }} className="btn btn-sm btn-outline-primary">&nbsp;Save changes&nbsp;</button>
                        &nbsp;<span className='text-danger'>{errorMessage}</span>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default TemplateRoomBookReceipt;