import React from "react";
import Qod from "./Qod";
import Liked from "./Liked";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="wrapper">
      <Router>
        <Switch>
          <Route exact path="/">
            <Qod />
          </Route>
          <Route path="/liked">
            <Liked />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
