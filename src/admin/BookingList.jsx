import React, { useContext, useEffect, useState } from "react";
import Constants from "../Constants";
import httpService from "../services/httpService";
import Table from "react-bootstrap/Table";
import { format } from "date-fns";
import { useNavigate, useLocation } from "react-router-dom";
import { getPaymentStatusCssClass } from "../Utils";
import { NumericFormat } from "react-number-format";
import BookingModal from "./BookingModal";
import { ApiContext } from "../contexts/ApiContext";
import Paginate from "./Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faPlusCircle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Collapse from "react-bootstrap/Collapse";
import utilService from "../services/utilService";
function BookingList(props) {
  const [showModalPaymentStatus, setShowModalPaymentStatus] = useState(false);
  const [curBooking, setCurBooking] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [bookingList, setBookingList] = useState([]);
  const { masterData, setMasterData } = useContext(ApiContext);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);
  const countries = utilService.countries;
  let tmp = {
    paymentMethod: "",
    paymentStatus: "",
    search: "",
    email: "",
    country: "",
    centerName: "",
    roomType: "",
    lift: "",
    bathroomType: "",
    beds: "",
    hotWater: "",
    toiletType: "",
    hotelName: "",
  };
  const [filterParams, setFilterParams] = useState(tmp);

  useEffect(() => {
    refreshList(1);
  }, []);
  const paginationClicked = (currentPage) => refreshList(currentPage);
  const refreshList = (currentPage) => {
    let data = {
      pageSize: pageSize,
      currentPage: currentPage ? currentPage : 1,
      filterParams: filterParams,
    };
    httpService
      .post(process.env.REACT_APP_rgsevaUrl + "/booking/listBookings", data)
      .then((response) => {
        let { list, totalCount, pageSize, currentPage, totalAmount } =
          response.data;
        setBookingList(list);
        setTotalCount(totalCount);
        setPageSize(pageSize);
        setCurrentPage(currentPage);
        setTotalAmount(totalAmount);
      });
  };

  const bookingClickHanddler = (vbooking) => {
    if (vbooking) {
      navigate("/admin/booking", {
        replace: false,
        state: { booking: vbooking },
      });
    }
  };
  const handleShowModalPaymentStatus = (b) => {
    setCurBooking(b);
    setShowModalPaymentStatus(true);
  };
  const handleShowModalPaymentStatusSuccess = (booking) => {
    const bookingListTmp = [...bookingList];
    const bookingTmp = bookingListTmp.find((r) => r.id === booking.id);
    const index = bookingListTmp.indexOf(bookingTmp);
    bookingListTmp[index] = { ...booking };
    setBookingList(bookingListTmp);
  };
  const handleChange = (e) => {
    const temp = { ...filterParams };
    temp[e.target.name] = e.target.value;
    setFilterParams(temp);
  };
  const newBooking = ()=>{navigate("/admin/catalog", {replace: false});}
  
  return (
    <div>
      <div>
        <h5 style={{display:"inline-block"}}>BOOKINGS</h5>
        <button onClick={(event)=>{newBooking()}} className="btn btn-sm btn-outline-danger ms-3">New booking <FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon></button>
      </div>      
      <div>
        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-4">
            <div className="fw-bold">
              Total records: {totalCount}, Total amount:{" "}
              <NumericFormat
                value={totalAmount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₹"}
                decimalScale={2}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4">
            <Paginate
              totalRecords={totalCount}
              paginateClicked={paginationClicked}
              currentPage={currentPage}
              pageSize={pageSize}
            />
          </div>
          <div className="col-12 col-sm-12 col-md-4 col-lg-4">
            <div class="d-flex flex-row-reverse">
              <div className="col-12 col-sm-12 col-md-8 col-lg-8">
                
                <div className="input-group">
                  <input
                    name="search"
                    id="search"
                    onChange={(e) => handleChange(e)}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") refreshList();
                    }}
                    value={filterParams.search}
                    className="form-control form-control-sm"
                    type="text"
                    placeholder="Search"
                  ></input>
                  <button
                    onClick={() => refreshList()}
                    className="btn btn-outline-secondary"
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setOpenFilter(!openFilter)}
                    aria-controls="collapse-search-filter"
                    aria-expanded={openFilter}
                  >
                    {openFilter ? (
                      <FontAwesomeIcon icon={faAngleUp} />
                    ) : (
                      <FontAwesomeIcon icon={faAngleDown} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Collapse in={openFilter}>
              <div
                id="collapse-search-filter"
                className="p-2 mt-1 mb-1 rounded bg-light border"
              >
                <div className="row mb-2">
                  <div className="col-sm-6 col-12 col-md-2 col-lg-2">
                    <select
                      id="paymentMethod"
                      name="paymentMethod"
                      value={filterParams.paymentMethod}
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                      style={{ WebkitAppearance: "menulist" }}
                    >
                      <option value={""}>Payment method</option>
                      {masterData.listPaymentMethods.map((it, index) => (
                        <option key={index} value={it}>
                          {it}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-sm-6 col-12 col-md-2 col-lg-2">
                    <select
                      id="paymentStatus"
                      name="paymentStatus"
                      value={filterParams.paymentStatus}
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                      style={{ WebkitAppearance: "menulist" }}
                    >
                      <option value={""}>Payment status</option>
                      {masterData.listPaymentStausAll.map((it, index) => (
                        <option key={index} value={it}>
                          {it}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-sm-6 col-12 col-md-2 col-lg-2">
                    <select
                      id="country"
                      name="country"
                      value={filterParams.country}
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                      style={{ WebkitAppearance: "menulist" }}
                    >
                      <option value={""}>All countries</option>
                      {countries.map((it, index) => (
                        <option key={index} value={it}>
                          {it}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-sm-6 col-12 col-md-2 col-lg-2">
                    <input
                      type="text"
                      className="form-control"
                      onKeyPress={(event) => {
                        if (event.key === "Enter") refreshList();
                      }}
                      value={filterParams.centerName}
                      id="centerName"
                      name="centerName"
                      placeholder="ISKCON Center"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col-sm-6 col-12 col-md-2 col-lg-2">
                    <input
                      type="text"
                      className="form-control"
                      onKeyPress={(event) => {
                        if (event.key === "Enter") refreshList();
                      }}
                      value={filterParams.email}
                      id="email"
                      name="email"
                      placeholder="Email"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col-sm-6 col-12 col-md-2 col-lg-2">
                    <input
                      type="text"
                      className="form-control"
                      onKeyPress={(event) => {
                        if (event.key === "Enter") refreshList();
                      }}
                      value={filterParams.phoneNumber}
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Mobile"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-12 col-md-2 col-lg-2">
                    <select
                      id="hotelName"
                      className="form-control"
                      name="hotelName"
                      style={{ WebkitAppearance: "menulist" }}
                      onChange={(e) => handleChange(e)}
                      value={filterParams.hotelName}
                    >
                      <option value={""}>All hotels</option>
                      {masterData.listHotels.map((arg) => (
                        <option key={arg.id}>{arg.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-sm-6 col-12 col-md-2 col-lg-2">
                    <select
                      id="roomType"
                      className="form-control"
                      name="roomType"
                      style={{ WebkitAppearance: "menulist" }}
                      onChange={(e) => handleChange(e)}
                      value={filterParams.roomType}
                    >
                      <option value={""}>All room type</option>
                      {masterData.listRoomTypes.map((arg) => (
                        <option key={arg.id}>{arg.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-sm-6 col-12 col-md-2 col-lg-2">
                    <select
                      id="beds"
                      className="form-control"
                      name="beds"
                      style={{ WebkitAppearance: "menulist" }}
                      onChange={(e) => handleChange(e)}
                      value={filterParams.beds}
                    >
                      <option value={""}>Number of beds</option>
                      {masterData.listBedTypes.map((arg) => (
                        <option key={arg.id}>{arg.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-sm-6 col-12 col-md-2 col-lg-2">
                    <select
                      id="lift"
                      className="form-control"
                      name="lift"
                      style={{ WebkitAppearance: "menulist" }}
                      onChange={(e) => handleChange(e)}
                      value={filterParams.lift}
                    >
                      <option value={""}>Elevetor facility</option>
                      <option value={"Yes"}>Yes</option>
                      <option value={"No"}>No</option>
                    </select>
                  </div>
                  <div className="col-sm-6 col-12 col-md-2 col-lg-2">
                    <select
                      id="toiletType"
                      className="form-control"
                      name="toiletType"
                      style={{ WebkitAppearance: "menulist" }}
                      onChange={(e) => handleChange(e)}
                      value={filterParams.toiletType}
                    >
                      <option value={""}>Tolelt types</option>
                      {masterData.listToiletTypes.map((arg) => (
                        <option key={arg.id}>{arg.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-sm-6 col-12 col-md-2 col-lg-2">
                    <select
                      id="hotWater"
                      className="form-control"
                      name="hotWater"
                      style={{ WebkitAppearance: "menulist" }}
                      onChange={(e) => handleChange(e)}
                      value={filterParams.hotWater}
                    >
                      <option value={""}>Hotwater facility</option>
                      {masterData.listHotwaterType.map((arg) => (
                        <option key={arg.id}>{arg.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </Collapse>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  <th className="text-center">Order#</th>
                  <th className="text-center">ILS-Reg</th>
                  <th>Name</th>
                  <th className="text-center">Booking time</th>
                  <th className="text-center">Room</th>
                  <th className="text-end">Amount</th>
                  <th className="text-center">Method</th>
                  <th className="text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookingList.map((it, index) => (
                  <tr key={index}>
                    <td className="text-center">
                      {(currentPage - 1) * pageSize + index + 1}
                    </td>
                    <td className="text-center">
                      <a
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          bookingClickHanddler(it);
                        }}
                      >
                        {it.id}
                      </a>
                    </td>
                    <td className="text-center">
                      <a
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          bookingClickHanddler(it);
                        }}
                      >
                        {it.checksum}
                      </a>
                    </td>
                    <td>
                      <a
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          bookingClickHanddler(it);
                        }}
                        className="fw-bold"
                      >
                        {it.displayName}
                        <br />
                        <span className="fw-light fst-italic">
                          {it.centerName} ({it.country})
                        </span>
                      </a>
                    </td>
                    <td className="text-center">
                      {format(
                        new Date(it.bookingRequestOn),
                        "dd-MMM hh:mm a"
                      ).toLocaleLowerCase()}
                    </td>
                    <td className="text-center">{it.room.roomCategory}</td>
                    <td className="text-end">
                      <NumericFormat
                        value={it.paymentAmount}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₹"}
                        decimalScale={2}
                      />
                    </td>
                    <td className="text-center">{it.paymentMethod}</td>
                    <td className="text-center">
                      <a
                        href=""
                        onClick={(event) => {
                          event.preventDefault();
                          handleShowModalPaymentStatus(it);
                        }}
                        className={getPaymentStatusCssClass(it.paymentStatus)}
                        style={{ width: "120px", color: "white" }}
                      >
                        {it.paymentStatus}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-4"></div>
          <div className="col-sm-12 col-md-4 col-lg-4">
            <Paginate
              totalRecords={totalCount}
              paginateClicked={paginationClicked}
              currentPage={currentPage}
              pageSize={pageSize}
            />
          </div>
          <div className="col-12 col-sm-12 col-md-4 col-lg-4"></div>
        </div>
      </div>
      <BookingModal
        show={showModalPaymentStatus}
        booking={curBooking}
        onSuccess={handleShowModalPaymentStatusSuccess}
        onHide={() => setShowModalPaymentStatus(false)}
      />
    </div>
  );
}

export default BookingList;
