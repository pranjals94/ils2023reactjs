import React, { useState, Component } from "react";
import Modal from "react-bootstrap/Modal";

function AddToMstrListModal(props) {
  const [inputName, setInputName] = useState("");
  console.log("add to master list modal props.data", props.data);
  function onChangeHandler(e) {
    setInputName(e.target.value);
  }

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h5> Add new {props.data.name} to master list</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row mb-3">
            <label htmlFor="ip" className="col-sm-2 col-form-label text-end">
              Name:{" "}
            </label>
            <div className="col-sm-4">
              <input
                onChange={(e) => onChangeHandler(e)}
                type="text"
                name="rentPurchase"
                className=" form-control"
                id="ip"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            onClick={() => props.onOkClick(inputName)}
            className="btn btn-outline-primary ms-auto"
          >
            Ok
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default AddToMstrListModal;
