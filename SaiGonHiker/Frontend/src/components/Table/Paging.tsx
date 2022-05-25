import { isFulfilled } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
library.add(faEllipsis);

export type PageType = {
  currentPage?: number;
  totalPage?: number;
  handleChange: (page: number) => void;
};

const Paging: React.FC<PageType> = ({
  currentPage = 1,
  totalPage = 1,
  handleChange,
}) => {
  const prePageStyle =
    currentPage !== 1 ? "pagination__link" : "pagination__link link-disable";

  const nextPageStyle =
    currentPage + 1 <= totalPage
      ? "pagination__link"
      : "pagination__link link-disable";

  const pageStyle = (page: number) => {
    if (page === currentPage) return "pagination__link link-active";
    return "pagination__link";
  };

  let limitPage = 0;
  const pageLength = 3;
  if (totalPage > pageLength) {
    limitPage = pageLength;
  } else {
    limitPage = totalPage;
  }

  const onPrev = (e) => {
    e.preventDefault();

    if (currentPage !== 1) {
      handleChange(currentPage - 1);
    }
  };

  const onNext = (e) => {
    e.preventDefault();

    if (currentPage + 1 <= totalPage) {
      handleChange(currentPage + 1);
    }
  };

  const onPageNumber = (e, page: number) => {
    e.preventDefault();
    handleChange(page);
  };

  return (
    <div className="w-100 d-flex align-items-center mt-3">
      <ul className="pagination">
        <li>
          <a onClick={onPrev} className={prePageStyle}>
            Previous
          </a>
        </li>
        {currentPage < pageLength ? (
          <></>
        ) : (
          <>
            {totalPage > 3 ? (
              <li>
                <a onClick={(e) => onPageNumber(e, 1)} className={pageStyle(1)}>
                  1
                </a>
              </li>
            ) : (
              <></>
            )}
            {currentPage > pageLength && totalPage > pageLength + 1 ? (
              <li>
                <a
                  onClick={(e) =>
                    onPageNumber(
                      e,
                      currentPage - pageLength < 1
                        ? 1
                        : currentPage - pageLength
                    )
                  }
                  className={pageStyle(currentPage - pageLength)}
                >
                  <FontAwesomeIcon icon="ellipsis" />
                </a>
              </li>
            ) : (
              <></>
            )}
          </>
        )}

        {[...Array(limitPage).keys()]
          .map((i) => {
            const limitPerSide = Math.floor(pageLength / 2);
            if (currentPage <= limitPerSide)
              return i + Math.ceil(currentPage / limitPerSide);
            if (currentPage > totalPage - limitPerSide)
              return i + totalPage + 1 - limitPage;
            return i + currentPage - limitPerSide;
          })
          .map((i) => (
            <li key={i}>
              <a onClick={(e) => onPageNumber(e, i)} className={pageStyle(i)}>
                {i}
              </a>
            </li>
          ))}

        {currentPage > totalPage - pageLength + 1 ? (
          <></>
        ) : (
          <>
            {currentPage < totalPage - pageLength + 1 &&
            totalPage > pageLength + 1 ? (
              <li>
                <a
                  onClick={(e) =>
                    onPageNumber(
                      e,
                      currentPage + pageLength > totalPage
                        ? totalPage
                        : currentPage + pageLength
                    )
                  }
                  className={pageStyle(-1)}
                >
                  <FontAwesomeIcon icon="ellipsis" />
                </a>
              </li>
            ) : (
              <></>
            )}
            {totalPage > 3 ? (
              <li>
                <a
                  onClick={(e) => onPageNumber(e, totalPage)}
                  className={pageStyle(totalPage)}
                >
                  {totalPage}
                </a>
              </li>
            ) : (
              <></>
            )}
          </>
        )}

        <li>
          <a onClick={onNext} className={nextPageStyle}>
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Paging;
