import styled from "styled-components";
import { useCallback } from "react";
import { blue, white, earth } from "../utils/colors";

const PaginatorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0;
`;

const FoldPages = styled.div`
  border: none;
  cursor: default;
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin: 5px;
  font-size: 14px;
  border-radius: 5px;
`;

const ChangePage = styled(FoldPages)`
  border: 1px solid rgba(60, 63, 78, 0.1);
  cursor: pointer;
  color: ${blue.dark};

  :hover {
    background: ${white.beidge};
  }
`;

const Page = styled(ChangePage)`
  ${(props) =>
    props.$current &&
    `
    color: ${white.white};
    background: ${earth.wood};

    :hover {
      cursor: default;
      background: ${earth.wood};
    }
  `}
`;

function isPositiveInteger(val) {
  return /^[0-9]*[1-9][0-9]*$/.test(val);
}

function Paginator({ currentPage, setCurrentPage, totalPage }) {
  const handleChangeCurrentPage = useCallback(
    (newPageInfo) => {
      if (!newPageInfo) return;

      if (newPageInfo === "+" || newPageInfo === "-") {
        setCurrentPage((prevState) =>
          newPageInfo === "+" ? prevState + 1 : prevState - 1
        );
        return;
      }

      if (isPositiveInteger(newPageInfo) && newPageInfo <= totalPage) {
        setCurrentPage(newPageInfo);
      }
    },
    [totalPage]
  );

  if (currentPage < 1) return;

  return (
    <PaginatorContainer>
      {currentPage > 1 && (
        <ChangePage
          onClick={() => {
            handleChangeCurrentPage("-");
          }}
        >
          {"<"}
        </ChangePage>
      )}
      {currentPage > 2 && (
        <Page
          onClick={() => {
            handleChangeCurrentPage(1);
          }}
        >
          1
        </Page>
      )}
      {currentPage > 3 && <FoldPages>...</FoldPages>}
      {currentPage !== 1 && (
        <Page
          onClick={() => {
            handleChangeCurrentPage("-");
          }}
        >
          {currentPage - 1}
        </Page>
      )}
      <Page $current={true}>{currentPage}</Page>
      {currentPage !== totalPage && totalPage > 1 && (
        <Page
          onClick={() => {
            handleChangeCurrentPage("+");
          }}
        >
          {currentPage + 1}
        </Page>
      )}
      {currentPage < totalPage - 2 && <FoldPages>...</FoldPages>}
      {currentPage < totalPage - 1 && (
        <Page
          onClick={() => {
            handleChangeCurrentPage(totalPage);
          }}
        >
          {totalPage}
        </Page>
      )}
      {currentPage < totalPage && (
        <ChangePage
          onClick={() => {
            handleChangeCurrentPage("+");
          }}
        >
          {">"}
        </ChangePage>
      )}
    </PaginatorContainer>
  );
}

export default Paginator;
