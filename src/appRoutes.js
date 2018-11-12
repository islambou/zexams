import { Route } from "react-router-dom";

import React, { lazy, Suspense } from "react";
import Questions from "./routes/questions";
import AddQuestions from "./components/addQuestion";
import Tests from "./routes/tests";
import displayTest from "./routes/displayTest";

//routes
const Routes = () => (
  <>
    <div style={{ marginTop: "50px" }} />
    <Route path="/questions/:test?/:testName?" component={Questions} />
    <Route path="/add-question" component={AddQuestions} />
    <Route path="/tests" component={Tests} />
    <Route path="/test/:id?" component={displayTest} />
  </>
);

export default Routes;
