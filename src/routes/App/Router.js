import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import loadable from "../../hocs/loadable";

const route = {
  Main: loadable(() => import("../main/Main")),
  Favorite: loadable(() => import("../favorite/Favorite")),
  Play: loadable(() => import("../play/Play"))
};

const AppRouter = () => {
  return (
    <div>
      <Switch>
        <Route path="/favorite" render={(props) => <route.Favorite {...props} />} />
        <Route path="/play" render={(props) => <route.Play {...props} />} />
        <Route path="/main" render={(props) => <route.Main {...props} />} />
        <Redirect to="/main" />
      </Switch>
    </div>
  );
};

export default AppRouter;