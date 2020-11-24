import React, {Component} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './login.js';
import ButtonAppBar from './dashboard.js';
import Register from './register.js'
import About from './About.js'


// class App extends Component {
//   render() {
//     return (
//         <Router>
//           <div>
//
//             {/* A <Switch> looks through its children <Route>s and
//             renders the first one that matches the current URL. */}
//             <Switch>
//               <Route path="/about.json">
//                 <About style={{styled}}/>
//               </Route>
//               {/*<Route path="/dashboard">*/}
//               {/*  <ButtonAppBar />*/}
//               {/*</Route>*/}
//               {/*<Route path="/register">*/}
//               {/*  <Register />*/}
//               {/*</Route>*/}
//               {/*<Route path="/">*/}
//               {/*  <Login />*/}
//               {/*</Route>*/}
//             </Switch>
//           </div>
//         </Router>
//     );
//   }
// }
// export default App;

export default function App() {
  return (
    <Router>
      <div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about.json">
            <About />
          </Route>
          <Route path="/dashboard">
            <ButtonAppBar />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
