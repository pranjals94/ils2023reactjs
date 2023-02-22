import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import httpService from '../services/httpService';
import Constants from '../Constants';
import { NumericFormat } from 'react-number-format';
import { toast } from 'react-toastify';
import utilService from '../services/utilService';
function BillingInfoBak(props) {
    const [registrationForm, setRegistrationForm] = useState([])
    const [errors, setErrors] = useState({})
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate();
    const location = useLocation()
    const { booking, room } = location.state
    const { checksum } = booking
    //const countries = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua & Deps', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Rep', 'Chad', 'Chile', 'People\'s Republic of China', 'Republic of China', 'Colombia', 'Comoros', 'Democratic Republic of the Congo', 'Republic of the Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Danzig', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gaza Strip', 'The Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Holy Roman Empire', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Republic of Ireland', 'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jonathanland', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'North Korea', 'South Korea', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mount Athos', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Newfoundland', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Ottoman Empire', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Prussia', 'Qatar', 'Romania', 'Rome', 'Russian Federation', 'Rwanda', 'St Kitts & Nevis', 'St Lucia', 'Saint Vincent & the', 'Grenadines', 'Samoa', 'San Marino', 'Sao Tome & Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad & Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States of America', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'];
    const countries = utilService.countries
    useEffect(() => {
        if (!checksum) {
            navigate("/welcome", { replace: true, state: { message: "Something went wrong..." } })
        }
        setRegistrationForm(booking)
    }, []);
    const handlePgSubmit = (event, v) => {
        //event.stopPropagation();
        event.stopPropagation();
        const errorsTmp = validate(registrationForm)
        if (errorsTmp) {
            setErrors(errorsTmp)
            setErrorMessage("Errors in the inputs. Please check *highlighted fields.")
            return
        }
        setErrors({})
        setErrorMessage("")
        const postData = { booking: registrationForm, room: room, paymentMethod: 'PG' }
        if (v === 'bt') {
            document.forms[0].action = "/checkout/bookByBt"
        } else if (v === 'pg') {
            document.forms[0].action = "/checkout/index"
        }
        document.forms[0].submit()
    }
    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const tmp = { ...registrationForm, ...{ [name]: value } }
        const errorMessageTmp = validateProperty(event)
        const errorsTmp = { ...errors }
        if (errorMessageTmp) {
            errorsTmp[name] = errorMessageTmp
        } else {
            delete errorsTmp[name]
        }
        setErrors(errorsTmp)
        setRegistrationForm(tmp)
        setErrorMessage("")
    }
    const backHandler = () => {
        if (room) {
            navigate("/book/chooseRoom", { replace: false, state: { booking: booking, room: room } })
        }
    }
    const renderPg = () => {
        return (
            <>
                <div className='text-center'>
                    <button type='button' onClick={e => handlePgSubmit(e, 'pg')} className="btn btn-primary">&nbsp;&nbsp;&nbsp;Pay online (credit card, UPI, netbanking etc.) &nbsp;&nbsp;&nbsp;</button>
                </div>
            </>
        )
    }
    const renderBt = () => {
        return (
            <>
                <div className='rounded border p-2 px-4 bg-light text-center'>
                    <h5>Pay by direct bank transfer</h5>
                    <div className='text-start'>
                        <div>
                            In case you can not pay online, you can directly transfer the amount to our following bank account.
                        </div>
                        <table>
                            <tbody>
                                <tr>
                                    <td className='text-end'>Account number : </td>
                                    <td>xyz dfs fdsj </td>
                                </tr>
                                <tr>
                                    <td className='text-end'>Account holder name : </td>
                                    <td>xyz dfs fdsj </td>
                                </tr>
                                <tr>
                                    <td className='text-end'>Bank : </td>
                                    <td>Xzyfds fdk  </td>
                                </tr>
                                <tr>
                                    <td className='text-end'>IFSC : </td>
                                    <td>Xzyfds fdk  </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='text-start alert alert-danger px-3 py-1 rounded bordered'>
                            Until we receive the amount, you booking status will be kept as "ON HOLD".
                            &nbsp;You have to make the bank transfer within 3 days from the you book the room or else
                            your booking will be cancelled.
                            &nbsp;
                        </div>
                    </div>
                    <div className='text-center'>
                        <button type='button' onClick={e => handlePgSubmit(e, 'bt')} className="btn btn-primary">&nbsp;&nbsp;I will pay by bank transfer&nbsp;&nbsp;</button>
                    </div>
                    {/* <div className='mt-3 mb-3'>
                        <button className='btn btn-outline-primary' onClick={backHandler}>Go back</button>
                        <button type='button' className='btn btn-danger' onClick={(event)=>handleBankTransfer(event)}>&nbsp;&nbsp;I will pay by bank transfer&nbsp;&nbsp;</button>
                    </div> */}
                </div>
            </>
        )
    }
    const validate = ({ firstName, lastName, email, phoneNumber, centerName, city, state, country }) => {
        const errorsTmp = {}
        if (firstName.trim() === '') {
            errorsTmp.firstName = "Required"
        }
        if (lastName.trim() === '') {
            errorsTmp.lastName = "Required"
        }
        if (!emailValidation(email)) {
            errorsTmp.email = "Required"
        }
        if (phoneNumber.trim() === '') {
            errorsTmp.phoneNumber = "Required"
        }
        if (centerName.trim() === '') {
            errorsTmp.centerName = "Required"
        }
        if (city.trim() === '') {
            errorsTmp.city = "Required"
        }
        if (state.trim() === '') {
            errorsTmp.state = "Required"
        }
        if (country.trim() === '') {
            errorsTmp.country = "Required"
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
            <h4 className='text-center'>Make your payment</h4>
            <div className='row d-flex justify-content-center mt-4'>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <div className='border rounded p-4'>
                        <div className='text-center'>
                            <h5>Billing information</h5>
                        </div>
                        <form method='post'>
                            <input type="text" name='checksum' id='checksum' value={registrationForm.checksum} />
                            <input type="text" name='paymentAmount' id='paymentAmount' value={registrationForm.paymentAmount} />
                            <input type="text" name='selectedRoomId' id='selectedRoomId' value={registrationForm.selectedRoomId} />
                            <input type="text" name='uniqueFormId' id='uniqueFormId' value={registrationForm.uniqueFormId} />
                            <div className="row mb-3">
                                <label htmlFor="firstName" className="col-sm-4 col-form-label text-end">Registration# :</label>
                                <div className="col-sm-8 col-form-label fw-bold">
                                    {registrationForm.checksum}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-4 col-form-label text-end">Amount :</label>
                                <div className="col-sm-8 col-form-label fw-bold">
                                    <NumericFormat value={registrationForm.paymentAmount} displayType={'text'} thousandSeparator={true} prefix={'₹'} decimalScale={2} style={{ width: '95%', display: "inline-block" }} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="firstName" className="col-sm-4 col-form-label text-end">First name :</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" value={registrationForm.firstName} id="firstName" name='firstName' onChange={handleInputChange} style={{ width: '95%', display: "inline-block" }} />
                                    {errors.firstName && <span className='fs-4 text-danger ms-1'>*</span>}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="lastName" className="col-sm-4 col-form-label text-end">Last name :</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" value={registrationForm.lastName} id="lastName" name="lastName" onChange={handleInputChange} style={{ width: '95%', display: "inline-block" }} />
                                    {errors.lastName && <span className='fs-4 text-danger ms-1'>*</span>}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="initiatedName" className="col-sm-4 col-form-label text-end">Initiated name :</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" value={registrationForm.initiatedName} id="initiatedName" name="initiatedName" onChange={handleInputChange} style={{ width: '95%', display: "inline-block" }} />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="email" className="col-sm-4 col-form-label text-end">Email :</label>
                                <div className="col-sm-8">
                                    <input type="email" className="form-control" value={registrationForm.email} id="email" name="email" onChange={handleInputChange} style={{ width: '95%', display: "inline-block" }} />
                                    {errors.email && <span className='fs-4 text-danger ms-1'>*</span>}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="phoneNumber" className="col-sm-4 col-form-label text-end">Phone :</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" value={registrationForm.phoneNumber} id="phoneNumber" name="phoneNumber" onChange={handleInputChange} style={{ width: '95%', display: "inline-block" }} />
                                    {errors.phoneNumber && <span className='fs-4 text-danger ms-1'>*</span>}
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="centerName" className="col-sm-4 col-form-label text-end">ISKCON Center :</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" value={registrationForm.centerName} id="centerName" name="centerName" onChange={handleInputChange} style={{ width: '95%', display: "inline-block" }} />
                                    {errors.centerName && <span className='fs-4 text-danger ms-1'>*</span>}
                                </div>
                            </div>
                            {/*
                            <div className="row mb-3">
                                <label htmlFor="address" className="col-sm-4 col-form-label text-end">Address :</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" value={registrationForm.address} id="address" name="address" onChange={handleInputChange}/>
                                </div>
                            </div> 
                            */}
                            <div className="row mb-3">
                                <label htmlFor="city" className="col-sm-4 col-form-label text-end">City :</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" value={registrationForm.city} id="city" name="city" onChange={handleInputChange} style={{ width: '95%', display: "inline-block" }} />
                                    {errors.city && <span className='fs-4 text-danger ms-1'>*</span>}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="state" className="col-sm-4 col-form-label text-end">State/Provience :</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" value={registrationForm.state} id="state" name="state" onChange={handleInputChange} style={{ width: '95%', display: "inline-block" }} />
                                    {errors.state && <span className='fs-4 text-danger ms-1'>*</span>}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="country" className="col-sm-4 col-form-label text-end">Country :</label>
                                <div className="col-sm-8">
                                    <select id="country" name="country" value={registrationForm.country} onChange={handleInputChange} className="form-select" style={{ width: '95%', display: "inline-block" }}>
                                        <option value={''}>Select Country</option>
                                        {countries.map((it, index) => <option key={index} value={it}>{it}</option>)}
                                    </select>
                                    {errors.country && <span className='fs-4 text-danger ms-1'>*</span>}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="customerSpecialRequirement" className="col-sm-4 col-form-label text-end">Specific requirements :</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" value={registrationForm.customerSpecialRequirement} id="customerSpecialRequirement" name="customerSpecialRequirement" onChange={handleInputChange} style={{ width: '95%', display: "inline-block" }} />
                                </div>
                            </div>
                            <div className='text-danger text-center'>
                                {errorMessage}
                            </div>
                            {registrationForm.country == "India" ? renderPg() : ''}
                            {/* {registrationForm.country != "India"? <div className='text-center p-1 fs-3 text-primary'>OR</div> : ''} */}
                            {registrationForm.country != "India" ? renderBt() : ''}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default BillingInfoBak;