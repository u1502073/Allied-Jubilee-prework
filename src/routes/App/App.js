import React, { useEffect } from "react";

// import { useDispatch } from "react-redux";
// import * as actVideos from "../../actions/videos";
import Bar from "./components/Bar";
import SideBar from './components/SideBar';
import Router from "./Router";

import theme from "./App.scss";

const App = () => {
  // const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(actVideos.get())
  }, []);

  return (
    <div className={theme.app}>
      <Bar />
      <SideBar />
      <div className={theme.router}>
        <Router />
      </div>
    </div>
  );
};

export default App;
