import React, { useContext, Component, useRef } from "react";
import { ApiContext } from "../contexts/ApiContext";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Overlay from "react-bootstrap/Overlay";
import AddToMstrListModal from "./AddToMstrListModal";
import httpService from "../services/httpService";
import { toast } from "react-toastify";
import { useEffect } from "react";

function EditRoomInfo() {
  const { masterData, setMasterData } = useContext(ApiContext);
  const location = useLocation();
  const navigate = useNavigate();
  const room = location.state.room;
  const [formParams, setFormParams] = useState(room);
  console.log("masterdata", masterData);

  const [showToolTip, setShowToolTip] = useState(false);
  const [targetRefTooltip, setTargetRefTooltip] = useState(false);
  const [toolTipMsg, setToolTipMsg] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [masterListTempData, setMasterListTempData] = useState({ name: "" });

  const target3 = useRef(null);
  const target4 = useRef(null);
  const target5 = useRef(null);
  const target6 = useRef(null);
  const target7 = useRef(null);

  useEffect(() => {
    const temp = { ...formParams };
    temp["updatedBy"] = "Test";
    temp["description"] = "Test";
    temp["createdBy"] = "Test";
    // console.log("temp value", temp);
    setFormParams(temp);
  }, []);

  const toastify = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  function handleGoBack() {
    navigate("/admin/showRoomDetails", { state: { room: room } });
  }
  function ToolTipTimeout() {
    const timerId = setTimeout(() => {
      setShowToolTip(false);
      // clearInterval(timerId);
    }, 2000);
  }
  function onTextChange(e) {
    const temp = { ...formParams };
    temp[e.target.name] = e.target.value; // the name attribute in the input should match the key in the state
    // console.log("temp value", temp);
    setFormParams(temp);
  }

  function onNumberChange(e, targetRefTooltip) {
    console.log("e.terget.value = ", e.target.value);
    setTargetRefTooltip(targetRefTooltip.target);
    if (e.target.value === "") {
      setToolTipMsg("Cannot be blank.");
      setShowToolTip(true);
      ToolTipTimeout();
    } else {
      if (!/^[0-9]*\.?[0-9]*$/.test(e.target.value)) {
        //if alphabet detected
        // console.log("Alfa Detected");
        setToolTipMsg("Enter numbers Only.");
        setShowToolTip(true);
        ToolTipTimeout();
        return;
      }
    }
    const temp = { ...formParams };
    temp[e.target.name] = e.target.value; // the name attribute in the input should match the key in the state
    console.log("temp value", temp);
    setFormParams(temp);
  }

  function handleChange(e) {
    const temp = { ...formParams };
    temp[e.target.name] = e.target.value; // the name attribute in the input should match the key in the state
    console.log("temp value", temp);
    setFormParams(temp);
  }

  function addToMasterList(e) {
    // console.log("add to master list",e)
    setShowModal(true);
    setMasterListTempData(e);
  }
  // console.log("maasterlist temp data", masterListTempData);

  function handleUpdate() {
    let emty = false;
    console.log(formParams);
    Object.entries(formParams).map(([key, value]) => {
      if (!(key === "roomCountBooked" || key === "selected")) {
        if (!value) {
          console.log(key, value);
          emty = true;
        }
      }
    });
    if (emty) {
      toast.error("No Fields can be Empty", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    httpService
      .post(process.env.REACT_APP_rgsevaUrl + "/test/update", formParams)
      .then((response) => {
        toastify("Updated Successfully");
        navigate("/admin/roomList");
      });
  }

  function addToMstrListModalOkClicked(e) {
    const temp = { ...masterData };
    console.log(masterListTempData);
    if (!(e === null || e === undefined || e === "")) {
      if (masterListTempData.name === "Beds") {
        // console.log("beds")
        temp.listBedTypes.push({ id: temp.listBedTypes.length + 1, name: e });
      }
      if (masterListTempData.name === "Hot Water") {
        // console.log("Hot Water")
        temp.listHotwaterType.push({
          id: temp.listHotwaterType.length + 1,
          name: e,
        });
      }
      if (masterListTempData.name === "Room Type") {
        // console.log("Room Type")
        temp.listRoomTypes.push({ id: temp.listRoomTypes.length + 1, name: e });
      }
      if (masterListTempData.name === "Toilet Type") {
        // console.log("Room Type")
        temp.listToiletTypes.push({
          id: temp.listToiletTypes.length + 1,
          name: e,
        });
      }
      if (masterListTempData.name === "Bathroom Type") {
        // console.log("Room Type")
        temp.listBathroomTypes.push({
          id: temp.listBathroomTypes.length + 1,
          name: e,
        });
      }
      if (masterListTempData.name === "Which Floor") {
        // console.log("Room Type")
        temp.listFloors.push({
          id: temp.listFloors.length + 1,
          name: e,
        });
      }
      setMasterData(temp);
      console.log("set master list temp data after update", temp);
    }
    setShowModal(false);
  }

  return (
    <>
      <AddToMstrListModal
        show={showModal}
        onHide={() => setShowModal(false)}
        data={masterListTempData}
        onOkClick={addToMstrListModalOkClicked}
      />
      <Overlay target={targetRefTooltip} show={showToolTip} placement="top">
        {(props) => (
          <div
            {...props}
            style={{
              position: "absolute",
              backgroundColor: "rgba(255, 100, 100, 0.85)",
              padding: "2px 10px",
              color: "white",
              borderRadius: 3,
              ...props.style,
            }}
          >
            {toolTipMsg}
          </div>
        )}
      </Overlay>
      <div>
        <h5 className="text-center">Edit Hotel Name: {room.hotelName} </h5>
        <div className="row d-flex justify-content-center border rounded">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <td className="text-end fw-light">Code :</td>
                  <td className="text-start ps-2 ps-2">
                    <input
                      type="text"
                      name="roomCategory"
                      onChange={(e) => onTextChange(e)}
                      value={formParams.roomCategory}
                      className=" form-control"
                      id="roomCategory"
                    />
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td className="text-end fw-light">Hotel name :</td>
                  <td className="text-start ps-2 ps-2">
                    <input
                      type="text"
                      name="hotelName"
                      onChange={(e) => onTextChange(e)}
                      value={formParams.hotelName}
                      className=" form-control"
                      id="hotelName"
                    />
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td className="text-end fw-light">Type :</td>
                  <td className="text-start ps-2 ps-2">
                    <select
                      id="roomType"
                      className="form-control"
                      name="roomType"
                      onChange={(e) => handleChange(e)}
                      value={formParams.roomType}
                      style={{ WebkitAppearance: "menulist" }}
                    >
                      <option value={""}>select one...</option>
                      {masterData ? (
                        masterData.listRoomTypes.map((arg) => (
                          <option key={arg.id}>{arg.name}</option>
                        ))
                      ) : (
                        <option>Loading...</option>
                      )}
                    </select>
                  </td>
                  <td className="align-middle">
                    <a
                      href=""
                      onClick={(event) => {
                        addToMasterList({ name: "Room Type" });
                        event.preventDefault();
                      }}
                    >
                      Add
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="text-end fw-light">Beds :</td>
                  <td className="text-start ps-2">
                    <select
                      id="beds"
                      className="form-control"
                      name="beds"
                      onChange={(e) => handleChange(e)}
                      value={formParams.beds}
                      style={{ WebkitAppearance: "menulist" }}
                    >
                      <option value={""}>select one...</option>
                      {masterData ? (
                        masterData.listBedTypes.map((arg) => (
                          <option key={arg.id}>{arg.name}</option>
                        ))
                      ) : (
                        <option>Loading...</option>
                      )}
                    </select>
                  </td>
                  <td className="align-middle">
                    <a
                      href=""
                      onClick={(event) => {
                        addToMasterList({ name: "Beds" });
                        event.preventDefault();
                      }}
                    >
                      Add
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="text-end fw-light">Bathroom :</td>
                  <td className="text-start ps-2">
                    <select
                      id="bathroomType"
                      className="form-control"
                      name="bathroomType"
                      onChange={(e) => handleChange(e)}
                      value={formParams.bathroomType}
                      style={{ WebkitAppearance: "menulist" }}
                    >
                      <option value={""}>select one...</option>
                      {masterData ? (
                        masterData.listBathroomTypes.map((arg) => (
                          <option key={arg.id}>{arg.name}</option>
                        ))
                      ) : (
                        <option>Loading...</option>
                      )}
                    </select>
                  </td>
                  <td className="align-middle">
                    <a
                      href=""
                      onClick={(event) => {
                        addToMasterList({ name: "Bathroom Type" });
                        event.preventDefault();
                      }}
                    >
                      Add
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="text-end fw-light">Toilet :</td>
                  <td className="text-start ps-2">
                    <select
                      id="toiletType"
                      className="form-control"
                      name="toiletType"
                      onChange={(e) => handleChange(e)}
                      value={formParams.toiletType}
                      style={{ WebkitAppearance: "menulist" }}
                    >
                      <option value={""}>select one...</option>
                      {masterData ? (
                        masterData.listToiletTypes.map((arg) => (
                          <option key={arg.id}>{arg.name}</option>
                        ))
                      ) : (
                        <option>Loading...</option>
                      )}
                    </select>
                  </td>
                  <td className="align-middle">
                    <a
                      href=""
                      onClick={(event) => {
                        addToMasterList({ name: "Toilet Type" });
                        event.preventDefault();
                      }}
                    >
                      Add
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="text-end fw-light">Hotwater :</td>
                  <td className="text-start ps-2">
                    <select
                      id="hotWater"
                      className="form-control"
                      name="hotWater"
                      onChange={(e) => handleChange(e)}
                      value={formParams.hotWater}
                      style={{ WebkitAppearance: "menulist" }}
                    >
                      <option value={""}>select one...</option>
                      {masterData ? (
                        masterData.listHotwaterType.map((arg) => (
                          <option key={arg.id}>{arg.name}</option>
                        ))
                      ) : (
                        <option>Loading...</option>
                      )}
                    </select>
                  </td>
                  <td className="align-middle">
                    <a
                      href=""
                      onClick={(event) => {
                        addToMasterList({ name: "Hot Water" });
                        event.preventDefault();
                      }}
                    >
                      Add
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* -----------------------------right table-------------------------------          */}
          <div className="col-lg-6 col-md-6 col-sm-6">
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <td className="text-end fw-light">Rate/Day :</td>
                  <td className="text-start ps-2">
                    <input
                      ref={target3}
                      type="text"
                      name="rentSale"
                      onChange={(e) =>
                        onNumberChange(e, { target: target3.current })
                      }
                      value={formParams.rentSale}
                      className=" form-control"
                      id="rentSale"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-end fw-light">ILS Rate :</td>
                  <td className="text-start ps-2">
                    <input
                      ref={target4}
                      type="text"
                      name="rentWholeIls"
                      onChange={(e) =>
                        onNumberChange(e, { target: target4.current })
                      }
                      value={formParams.rentWholeIls}
                      className=" form-control"
                      id="rentWholeIls"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-end fw-light">Max Adult:</td>
                  <td className="text-start ps-2">
                    <input
                      ref={target5}
                      type="text"
                      name="maxAdult"
                      onChange={(e) =>
                        onNumberChange(e, { target: target5.current })
                      }
                      value={formParams.maxAdult}
                      className=" form-control"
                      id="maxAdult"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-end fw-light">Max Child :</td>
                  <td className="text-start ps-2">
                    <input
                      ref={target6}
                      type="text"
                      name="maxChild"
                      onChange={(e) =>
                        onNumberChange(e, { target: target6.current })
                      }
                      value={formParams.maxChild}
                      className=" form-control"
                      id="maxChild"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-end fw-light">Total Rooms :</td>
                  <td className="text-start ps-2">
                    <input
                      ref={target7}
                      type="text"
                      name="roomCountAvailable"
                      onChange={(e) =>
                        onNumberChange(e, { target: target7.current })
                      }
                      value={formParams.roomCountAvailable}
                      className=" form-control"
                      id="roomCountAvailable"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-end fw-light">Lift :</td>
                  <td className="text-start ps-2">
                    {" "}
                    <select
                      id="lift"
                      className="form-control"
                      name="lift"
                      onChange={(e) => handleChange(e)}
                      value={formParams.lift}
                      style={{ WebkitAppearance: "menulist" }}
                    >
                      <option value={""}>select one...</option>
                      <option value={"Yes"}>Yes</option>
                      <option value={"No"}>No</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="text-end fw-light">Floor :</td>
                  <td className="text-start ps-2">
                    <select
                      id="whichFloor"
                      className="form-control"
                      name="whichFloor"
                      onChange={(e) => handleChange(e)}
                      value={formParams.whichFloor}
                      style={{ WebkitAppearance: "menulist" }}
                    >
                      <option value={""}>select one...</option>
                      {masterData ? (
                        masterData.listFloors.map((arg) => (
                          <option key={arg.id}>{arg.name}</option>
                        ))
                      ) : (
                        <option>Loading...</option>
                      )}
                    </select>
                  </td>
                  <td className="align-middle">
                    <a
                      href=""
                      onClick={(event) => {
                        addToMasterList({ name: "Which Floor" });
                        event.preventDefault();
                      }}
                    >
                      Add
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-sm-8">
            <div className="mb-4">
              <div className="hstack gap-3 mt-2">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={handleGoBack}
                  style={{ width: "100px" }}
                >
                  Back
                </button>
                <button
                  className="btn btn-sm btn-outline-primary ms-auto"
                  onClick={handleUpdate}
                  style={{ width: "100px" }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default EditRoomInfo;
