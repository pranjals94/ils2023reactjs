import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
function RoomDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { room } = location.state;

  console.log("from room details", room);

  function callBack() {
    navigate("/admin/roomList", { state: { room: room } });
  }
  function callEdit(room) {
    navigate("/admin/editroominfo", { state: { room: room } });
  }

  return (
    <>
      <div>
        <h5 className="text-center">Hotel Name: {room.hotelName} </h5>
        <div className="row d-flex justify-content-center border rounded">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <td className="text-end fw-light">Code :</td>
                  <td className="text-start ps-2 ps-2">{room.roomCategory}</td>
                </tr>
                <tr>
                  <td className="text-end fw-light">Type :</td>
                  <td className="text-start ps-2 ps-2">{room.roomType}</td>
                </tr>
                <tr>
                  <td className="text-end fw-light">Beds :</td>
                  <td className="text-start ps-2">{room.beds}</td>
                </tr>
                <tr>
                  <td className="text-end fw-light">Bathroom :</td>
                  <td className="text-start ps-2">{room.bathroomType}</td>
                </tr>
                <tr>
                  <td className="text-end fw-light">Toilet :</td>
                  <td className="text-start ps-2">{room.toiletType}</td>
                </tr>
                <tr>
                  <td className="text-end fw-light">Hotwater :</td>
                  <td className="text-start ps-2">{room.hotWater}</td>
                </tr>
                <tr>
                  <td className="text-end fw-light">Floor :</td>
                  <td className="text-start ps-2">{room.whichFloor}</td>
                </tr>
                <tr>
                  <td className="text-end fw-light">Lift :</td>
                  <td className="text-start ps-2">{room.lift}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <td className="text-end fw-light">Rate/Day :</td>
                  <td className="text-start ps-2">
                    <NumericFormat
                      value={room.rentSale}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₹"}
                      decimalScale={2}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-end fw-light">ILS Rate :</td>
                  <td className="text-start ps-2">
                    <NumericFormat
                      value={room.rentWholeIls}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₹"}
                      decimalScale={2}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-end fw-light">Capacity :</td>
                  <td className="text-start ps-2">
                    {room.maxAdult} + {room.maxChild} (Child)
                  </td>
                </tr>
                <tr>
                  <td className="text-end fw-light">Total Rooms :</td>
                  <td className="text-start ps-2">{room.roomCountTotal}</td>
                </tr>
                <tr>
                  <td className="text-end fw-light">Total Booked :</td>
                  <td className="text-start ps-2">{room.roomCountBooked}</td>
                </tr>
                <tr>
                  <td className="text-end fw-light">Available :</td>
                  <td className="text-start ps-2">{room.roomCountAvailable}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-sm-8">
            <div className="mb-4">
              <div className="hstack gap-3 mt-2">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={callBack}
                  style={{ width: "100px" }}
                >
                  Back
                </button>
                <button
                  className="btn btn-sm btn-outline-primary ms-auto"
                  onClick={() => callEdit(room)}
                  style={{ width: "100px" }}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default RoomDetails;
