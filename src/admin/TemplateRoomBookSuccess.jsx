import React from 'react';
import { Form } from 'react-bootstrap';
import httpService from '../services/httpService';
import { useState } from 'react';
import { useEffect } from 'react';
import utilService from '../services/utilService';
const TemplateRoomBookSuccess = () => {
    const [template, setTemplate] = useState({})
    const [errors, setErrors] = useState({})
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        httpService.get(process.env.REACT_APP_rgsevaUrl + "/accom/getTemplateBookSuccess").then((response) => {
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

        httpService.post(process.env.REACT_APP_rgsevaUrl + "/accom/saveTemplateBookSuccess", template).then((response) => {
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
    const validate = ({ varSender, varSubject, varMessage }) => {
        const errorsTmp = {}
        if (!emailValidation(varSender)) {
            errorsTmp.varSender = "Required"
        }
        if (varSubject.trim() === '') {
            errorsTmp.varSubject = "Required"
        }
        if (varMessage.trim() === '') {
            errorsTmp.varMessage = "Required"
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
        if (name === 'varSender' && !emailValidation(value)) {
            return "Required"
        } else if (value.trim() === '') {
            return "Required"
        }
    }
    return (
        <div>
            <h5>Email template - room booking successfull</h5>
            <div className='mb-2'>When the room booking is done successfully with payment status "complete" this email is send to the devotee.</div>
            <Form>
                <div className="mb-3">
                    <label className="form-label mb-1">Sender email address{errors.varSender && <span className='text-danger ms-1'>*</span>}</label>
                    <div className='col-12 col-sm-8 col-md-6 col-lg-6'>
                        <input value={template.varSender} onChange={handleInputChange} type="email" className="form-control" name='varSender' id="varSender" placeholder="sender@yourdomain.com" style={{ width: "96%" }} />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label mb-1">Subject{errors.varSubject && <span className='text-danger ms-1'>*</span>}</label>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-12'>
                        <input value={template.varSubject} onChange={handleInputChange} type="text" className="form-control" name='varSubject' id="varSubject" placeholder="Enter the subject here" style={{ width: "96%" }} />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email body {errors.varMessage && <span className='text-danger ms-1'>*</span>}</label>
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

export default TemplateRoomBookSuccess;