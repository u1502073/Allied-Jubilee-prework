// import React from "react";
import Loadable from "react-loadable";

import PageLoading from "../components/PageLoading";

export default function loadable(loader, options_ = {}) {
  const options = {
    loading: PageLoading,
    loader,
    ...options_,
  };

  return Loadable(options);
}

// loadable.Noop = () => <span />;
