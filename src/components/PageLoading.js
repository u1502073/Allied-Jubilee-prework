import React from "react";
// import classNames from "classnames";
import Spinner from 'react-bootstrap/spinner';
// import theme from "./PageLoading.scss";

const PageLoading = () => {
  return (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default PageLoading;
