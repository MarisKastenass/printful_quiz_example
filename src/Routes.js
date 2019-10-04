import React from "react";
import { Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import Homepage from "./containers/Homepage";
import Questions from "./containers/Questions";
import Results from "./containers/Results";

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={Homepage} props={childProps} />
    <AppliedRoute
      path="/questions"
      exact
      component={Questions}
      props={childProps}
    />
    <AppliedRoute
      path="/results"
      exact
      component={Results}
      props={childProps}
    />
  </Switch>
);
