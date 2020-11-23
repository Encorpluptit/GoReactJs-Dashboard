import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './login.js';
import ButtonAppBar from './dashboard.js';
import Register from './register.js'
// import {GetRequestSetHeaders} from './About.js'
import About from './About.js'


export default function App() {
  return (
    <Router>
      <div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/">
            <About />
          </Route>
          {/*<Route path="/dashboard">*/}
          {/*  <ButtonAppBar />*/}
          {/*</Route>*/}
          {/*<Route path="/register">*/}
          {/*  <Register />*/}
          {/*</Route>*/}
          {/*<Route path="/">*/}
          {/*  <Login />*/}
          {/*</Route>*/}
        </Switch>
      </div>
    </Router>
  );
}