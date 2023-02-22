import React, { useContext, useEffect, useState } from "react";
import httpService from "../services/httpService";
import Table from "react-bootstrap/Table";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";
import { ApiContext } from "../contexts/ApiContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faSearch,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Paginate from "./Pagination";

function RoomList(props) {
  const [importFile, setImportFile] = useState(null);
  const [roomCatList, setRoomCatList] = useState([]);
  const [open, setOpen] = useState(false);
  const { masterData, setMasterData } = useContext(ApiContext);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // offsetItems and pageSize of pagination are inter related test it b4 changing
  const [totalRecords, setTotalrecords] = useState(1);
  const [filterEntries, setFilterEntries] = useState({
    search: "",
    roomType: "",
    lift: "",
    bathroomType: "",
    beds: "",
    hotWater: "",
    toiletType: "",
    hotelName: "",
    whichFloor: "",
  });

  useEffect(() => {
    httpService
      .post(process.env.REACT_APP_rgsevaUrl + "/accom/listRooms", {
        currentPage: currentPage,
        pageSize: pageSize,
        filterEntries: filterEntries,
      })
      .then((response) => {
        // currentPage
        // pageSize
        console.log(response.data);
        setRoomCatList(response.data.roomList);
        setTotalrecords(response.data.totalCount);
      });
  }, []);

  const importFileUrl = process.env.REACT_APP_roomListUploadUrl;
  const handleFileChange = (e) => {
    setImportFile(e.target.files[0]);
  };

  const uploadNow = (e) => {
    if (importFile) {
      const formData = new FormData();
      formData.append("file", importFile);
      formData.append("fileName", importFile.name);
      httpService.post(importFileUrl, formData).then((response) => {
        console.log(response.data);
      });
    }
  };

  const navigate = useNavigate();
  const handleClick = (it) => {
    // console.log("item from table list",it)
    navigate("/admin/showRoomDetails", { state: { room: it } });
  };
  function handleChange(e) {
    const temp = { ...filterEntries };
    temp[e.target.name] = e.target.value;
    setFilterEntries(temp);
    // console.log("filterEntries", filterEntries);
  }

  function handleFilter() {
    //filter search button clicked
    console.log("search buttam clicked");
    setCurrentPage(1);
    httpService
      .post(process.env.REACT_APP_rgsevaUrl + "/accom/listRooms", {
        currentPage: 1,
        pageSize: pageSize,
        filterEntries: filterEntries,
      })
      .then((response) => {
        // currentPage
        // pageSize
        console.log("response.data searche clicked", response.data);
        setRoomCatList(response.data.roomList);
        setTotalrecords(response.data.totalCount);
      });
  }

  // console.log("Room cat list", roomCatList);
  // console.log("context dTA", masterData);

  function handleClearFilter() {
    setFilterEntries({
      search: "",
      roomType: "",
      lift: "",
      bathroomType: "",
      beds: "",
      hotWater: "",
      toiletType: "",
      hotelName: "",
      whichFloor: "",
    });
    setCurrentPage(1);
    httpService
      .post(process.env.REACT_APP_rgsevaUrl + "/accom/listRooms", {
        currentPage: 1,
        pageSize: pageSize,
        filterEntries: {
          search: "",
          roomType: "",
          lift: "",
          bathroomType: "",
          beds: "",
          hotWater: "",
          toiletType: "",
          hotelName: "",
          whichFloor: "",
        },
      })
      .then((response) => {
        console.log(response.data);
        setRoomCatList(response.data.roomList);
        setTotalrecords(response.data.totalCount);
      });
  }

  function paginationClicked(Currentpage) {
    console.log("Pagination clicked", Currentpage);
    httpService
      .post(process.env.REACT_APP_rgsevaUrl + "/accom/listRooms", {
        currentPage: Currentpage,
        pageSize: pageSize,
        filterEntries: filterEntries,
      })
      .then((response) => {
        // currentPage
        // pageSize
        setRoomCatList(response.data.roomList);
        setTotalrecords(response.data.totalCount);
      });
    setCurrentPage(Currentpage);
  }

  return (
    <>
      <h5>ROOMS</h5>
      <div>
        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-4">
            <div className="fw-bold">Total records: {totalRecords}</div>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4">
            <Paginate
              totalRecords={totalRecords}
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
                      if (event.key === "Enter") handleFilter();
                    }}
                    value={filterEntries.search}
                    className="form-control form-control-sm"
                    type="text"
                    placeholder="Search"
                  ></input>
                  <button
                    onClick={() => handleFilter()}
                    className="btn btn-outline-secondary"
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setOpen(!open)}
                    aria-controls="collapse-search-filter"
                    aria-expanded={open}
                  >
                    {open ? (
                      <FontAwesomeIcon icon={faAngleUp} />
                    ) : (
                      <FontAwesomeIcon icon={faAngleDown} />
                    )}
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/admin/addnewroom")}
                    aria-controls="collapse-search-filter"
                    aria-expanded={open}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Add New Room"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Collapse in={open}>
              <div
                id="collapse-search-filter"
                className="p-2 mt-1 mb-1 rounded bg-light border"
              >
                <div className="row mb-2">
                  <div className="col-sm-6 col-12 col-md-2 col-lg-2">
                    <select
                      id="roomType"
                      className="form-control"
                      name="roomType"
                      style={{ WebkitAppearance: "menulist" }}
                      onChange={(e) => handleChange(e)}
                      value={filterEntries.roomType}
                    >
                      <option value={""}>Room Types (All)</option>
                      {masterData ? (
                        masterData.listRoomTypes.map((arg) => (
                          <option key={arg.id}>{arg.name}</option>
                        ))
                      ) : (
                        <option>Loading...</option>
                      )}
                    </select>
                  </div>
                  <div className="col-sm-6 col-12 col-md-2 col-lg-2">
                    <select
                      id="lift"
                      className="form-control"
                      name="lift"
                      style={{ WebkitAppearance: "menulist" }}
                      onChange={(e) => handleChange(e)}
                      value={filterEntries.lift}
                    >
                      <option value={""}>Lift (All)</option>
                      <option value={"Yes"}>Yes</option>
                      <option value={"No"}>No</option>
                    </select>
                  </div>
                  <div className="col-sm-6 col-12 col-md-2 col-lg-2">
                    <select
                      id="beds"
                      className="form-control"
                      name="beds"
                      style={{ WebkitAppearance: "menulist" }}
                      onChange={(e) => handleChange(e)}
                      value={filterEntries.beds}
                    >
                      <option value={""}>Beds (All)</option>
                      {masterData ? (
                        masterData.listBedTypes.map((arg) => (
                          <option key={arg.id}>{arg.name}</option>
                        ))
                      ) : (
                        <option>Loading...</option>
                      )}
                    </select>
                  </div>
                  <div className="col-sm-6 col-12 col-md-2 col-lg-2">
                    <select
                      id="hotWater"
                      className="form-control"
                      name="hotWater"
                      style={{ WebkitAppearance: "menulist" }}
                      onChange={(e) => handleChange(e)}
                      value={filterEntries.hotWater}
                    >
                      <option value={""}>Hot Water (All)</option>
                      {masterData ? (
                        masterData.listHotwaterType.map((arg) => (
                          <option key={arg.id}>{arg.name}</option>
                        ))
                      ) : (
                        <option>Loading...</option>
                      )}
                    </select>
                  </div>
                  <div className="col-sm-6 col-12 col-md-2 col-lg-2">
                    <select
                      id="toiletType"
                      className="form-control"
                      name="toiletType"
                      style={{ WebkitAppearance: "menulist" }}
                      onChange={(e) => handleChange(e)}
                      value={filterEntries.toiletType}
                    >
                      <option value={""}>Toilet Type (All)</option>
                      {masterData ? (
                        masterData.listToiletTypes.map((arg) => (
                          <option key={arg.id}>{arg.name}</option>
                        ))
                      ) : (
                        <option>Loading...</option>
                      )}
                    </select>
                  </div>
                  <div className="col-sm-6 col-12 col-md-2 col-lg-2">
                    <select
                      id="hotelName"
                      className="form-control"
                      name="hotelName"
                      style={{ WebkitAppearance: "menulist" }}
                      onChange={(e) => handleChange(e)}
                      value={filterEntries.hotelName}
                    >
                      <option value={""}>Hotels (All)</option>
                      {masterData ? (
                        masterData.listHotels.map((arg) => (
                          <option key={arg.id}>{arg.name}</option>
                        ))
                      ) : (
                        <option>Loading...</option>
                      )}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-12 col-md-2 col-lg-2">
                    <select
                      id="bathroomType"
                      className="form-control"
                      name="bathroomType"
                      style={{ WebkitAppearance: "menulist" }}
                      onChange={(e) => handleChange(e)}
                      value={filterEntries.bathroomType}
                    >
                      <option value={""}>Bathroom Type (All)</option>
                      {masterData ? (
                        masterData.listBathroomTypes.map((arg) => (
                          <option key={arg.id}>{arg.name}</option>
                        ))
                      ) : (
                        <option>Loading...</option>
                      )}
                    </select>
                  </div>
                  <div className="col-sm-6 col-12 col-md-2 col-lg-2">
                    <select
                      id="whichFloor"
                      className="form-control"
                      name="whichFloor"
                      style={{ WebkitAppearance: "menulist" }}
                      onChange={(e) => handleChange(e)}
                      value={filterEntries.whichFloor}
                    >
                      <option value={""}>Which Floor (All)</option>
                      {masterData ? (
                        masterData.listFloors.map((arg) => (
                          <option key={arg.id}>{arg.name}</option>
                        ))
                      ) : (
                        <option>Loading...</option>
                      )}
                    </select>
                  </div>
                  <div
                    style={{ textAlignLast: "end" }}
                    className="col-sm-6 col-12 col-md-2 col-lg-2  ms-auto"
                  >
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={handleClearFilter}
                      style={{ width: "100px" }}
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            </Collapse>
          </div>
        </div>
        {!(roomCatList.length === 0) ? (
          <div className="mt-3">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sl No.</th>
                  <th>Id No.</th>
                  <th>Hotel</th>
                  <th>Category</th>
                  <th className="text-end">Rate</th>
                  <th className="text-center">Total Rooms</th>
                  <th className="text-center">Booked paid</th>
                  <th className="text-center">Booked notpaid</th>
                  <th className="text-center">Available</th>
                </tr>
              </thead>
              <tbody>
                {roomCatList.map((it, index) => (
                  <tr
                    key={index}
                    onClick={() => handleClick(it)}
                    style={{ cursor: "pointer" }}
                  >
                    <td className="text-center">
                      {(currentPage - 1) * pageSize + index + 1}
                    </td>
                    <td>{it.id}</td>
                    <td>{it.hotelName}</td>
                    <td>{it.roomCategory}</td>
                    <td className="text-end">
                      <NumericFormat
                        value={it.rentSale}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₹"}
                        decimalScale={2}
                      />
                    </td>
                    <td className="text-center">{it.roomCountTotal}</td>
                    <td className="text-center">{it.roomCountBooked}</td>
                    <td className="text-center">{it.roomCountBooked}</td>
                    <td className="text-center">{it.roomCountAvailable}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <h4>No Results Found</h4>
        )}

        {/* <Paginate data={{ totalRecords: roomCatList.length }} /> */}
        <Paginate
          totalRecords={totalRecords}
          paginateClicked={paginationClicked}
          currentPage={currentPage}
          pageSize={pageSize} // offsetItems and pageSize are inter related test it b4 changing
        />

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="row border-top pt-4">
            <div className="text-primary fw-bold">Import from excel:</div>
            <div className="col-6">
              <div className="input-group mb-3">
                <input
                  type="file"
                  name="roomlListFile"
                  onChange={handleFileChange}
                  className="form-control"
                  id="inputGroupFile02"
                />
                <button
                  className="btn btn-primary input-group-text"
                  onClick={uploadNow}
                >
                  Upload now
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default RoomList;
