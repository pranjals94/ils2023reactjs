import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import "./Pagination.css";
const Paginate = (props) => {
  const pagesArrey = [];
  if (props.totalRecords === 0) {
    return;
  }
  const noOfPages = Math.ceil(props.totalRecords / props.pageSize);
  const offsetItems = 4; // offsetItems and pageSize of pagination are inter related test it b4 changing
  const noOfItems = offsetItems * 2 + 1; //no of elements in  arrey
  for (
    let number =
      props.currentPage <= offsetItems
        ? 1
        : props.currentPage >= noOfPages - offsetItems
        ? noOfPages - (noOfItems - 1)
        : props.currentPage - offsetItems;
    number <=
    (props.currentPage >= noOfPages - offsetItems
      ? noOfPages
      : props.currentPage <= offsetItems
      ? noOfItems
      : props.currentPage + offsetItems);
    number++
  ) {
    pagesArrey.push(number);
  }
  function handleClick(currentPage) {
    props.paginateClicked(currentPage);
  }
  const renderPagination = () => {
    return (
      <nav aria-label="page navigation">
        <ul class="pagination justify-content-center">
          <li
            class={props.currentPage === 1 ? "page-item disabled" : "page-item"}
            onClick={() => handleClick(1)}
          >
            <b class="page-link">1</b>
          </li>
          <li
            class={props.currentPage === 1 ? "page-item disabled" : "page-item"}
            onClick={() =>
              handleClick(
                props.currentPage < 3
                  ? (props.currentPage = 1)
                  : props.currentPage - 1
              )
            }
          >
            <b class="page-link">
              <FontAwesomeIcon icon={faAnglesLeft} />
            </b>
          </li>
          {pagesArrey.map((item) => (
            <li
              class={
                props.currentPage === item ? "page-item active" : "page-item"
              }
              onClick={() => handleClick(item)}
            >
              <b class="page-link">{item}</b>
            </li>
          ))}
          <li
            class={
              props.currentPage === noOfPages
                ? "page-item disabled"
                : "page-item"
            }
            onClick={() =>
              handleClick(
                props.currentPage >= noOfPages
                  ? (props.currentPage = noOfPages)
                  : props.currentPage + 1
              )
            }
          >
            <b class="page-link">
              <FontAwesomeIcon icon={faAnglesRight} />
            </b>
          </li>
          <li
            class={
              props.currentPage === noOfPages
                ? "page-item disabled"
                : "page-item"
            }
            onClick={() => handleClick(noOfPages)}
          >
            <b class="page-link">{noOfPages}</b>
          </li>
        </ul>
      </nav>
    );
  };
  return <>{props.totalRecords === 0 ? "" : renderPagination()}</>;
};

export default Paginate;
