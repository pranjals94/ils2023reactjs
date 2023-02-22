import React, { useState, useEffect } from "react";
import Paginate from "./Pagination";
import Table from "react-bootstrap/Table";
import httpService from "../services/httpService";
import UserModal from "./UserModal";

const Users = () => {
  const pageSize = 10; // offsetItems and pageSize of pagination are inter related test it b4 changing
  const [totalRecords, setTotalrecords] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [userList, setUserList] = useState([]);
  const [showUserModel, setShowUserModel] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    httpService
      .post(process.env.REACT_APP_rgsevaUrl + "/test/listAllUsers", {
        currentPage: currentPage,
        pageSize: pageSize,
      })
      .then((response) => {
        // currentPage
        // pageSize
        setUserList(response.data.userList);
        setTotalrecords(response.data.totalUsers);
      });
  }, []);

  // console.log("userlist", userList);

  function paginationClicked(Currentpage) {
    console.log("Pagination clicked", Currentpage);
    // httpService
    //   .post(process.env.REACT_APP_rgsevaUrl + "/accom/listRooms", {
    //     currentPage: Currentpage,
    //     pageSize: pageSize,
    //     filterEntries: filterEntries,
    //   })
    //   .then((response) => {
    //     // currentPage
    //     // pageSize
    //     setRoomCatList(response.data.roomList);
    //     setTotalrecords(response.data.totalCount);
    //   });
    setCurrentPage(Currentpage);
  }

  function handleClick(user) {
    httpService
      .get("http://localhost:8080/test/getUserData?id=" + user.id)
      .then((response) => {
        console.log(response.data);
      });
      setUser(user);
    setShowUserModel(true);
  }

  return (
    <>
      <UserModal
        show={showUserModel}
        onHide={() => setShowUserModel(false)}
        user={user}
      ></UserModal>
      <h5>Users</h5>
      <div>
        {userList.length ? (
          <div className="mt-3">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sl No.</th>
                  <th>Id No.</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((it, index) => (
                  <tr
                    key={index}
                    onClick={() => handleClick(it)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{(currentPage - 1) * pageSize + index + 1}</td>
                    <td>{it.id}</td>
                    <td>{it.username}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <h4>No Results Found</h4>
        )}
      </div>
    </>
  );
};

export default Users;
