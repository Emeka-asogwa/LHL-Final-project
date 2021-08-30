import About from "./About";
import Navbar from "./Navbar";

import Login from "./Login";
import HomePage from "./HomePage";

import Register from "./Register";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/login"> Login</Link>
            </li>
            <li>
              <Link to="/"> Home</Link>

              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <Navbar>
              <About />
            </Navbar>
          </Route>

          <Route path="/login">
            <Navbar>
              <Login />
            </Navbar>
          </Route>
          <Route path="/">
            <Navbar>
              <HomePage />
            </Navbar>
          </Route>

          <Route path="/register">
            <Navbar>
              <Register />
            </Navbar>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
