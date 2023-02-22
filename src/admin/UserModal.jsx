import React, { Component } from "react";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
const UserModal = (props) => {
  useEffect(() => {}, []);

  console.log("props.user", props.user);

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h5>
              username: {props.user.username} Id: {props.user.id}
            </h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="Role"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="Role" title="Role">
              {/* //------------------------------------------------ */}
              <div className="row d-flex justify-content-center ">
                <div className="col d-flex justify-content-center border rounded m-2">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <table class="table table-borderless">
                      <tbody>
                        <tr>
                          <td className="text-end fw-light">Code :</td>
                          <td className="text-start ps-2 ps-2">Hello</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td className="text-end fw-light">Hotel name :</td>
                          <td className="text-start ps-2 ps-2">hello2</td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* -----------------------------right table-------------------------------          */}
                <div className="col d-flex justify-content-center border rounded m-2">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <table class="table table-borderless">
                      <tbody>
                        <tr>
                          <td className="text-end fw-light">Rate/Day :</td>
                          <td className="text-start ps-2">Welcome1</td>
                        </tr>
                        <tr>
                          <td className="text-end fw-light">ILS Rate :</td>
                          <td className="text-start ps-2">Welcome2</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* //-------------------------------------------------- */}
            </Tab>
            <Tab eventKey="profile" title="Profile">
              profile
            </Tab>
            <Tab eventKey="Settings" title="Settings">
              Settings
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserModal;
