import About from "./About";
import Login from "./Login";
import HomePage from "./HomePage";
import Register from "./Register";
import SpotListItem from "./SpotListItem";
import Start from "./Start";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from './config/axios';
import MutualList from "./MutualList";
import GenerateList from "./GenerateList";

export default function App() {

  const [spots, setSpots] = useState([]);

  useEffect(() => {
    axios.get("/spots").then(res => {
      console.log("Response has comeback!");
      console.log(res);
      setSpots(res.data);
    });
  }, []);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/start">Start</Link>
            </li>
            <li>
              <Link to="/generatelist">Generate List</Link>
            </li>
            <li>
              <Link to="/mutuallist">Mutual List</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/spots/detail" component={SpotListItem}>
          </Route>
          <Route path="/start">
            <Start/>
          </Route>
          <Route path="/generatelist">
            <GenerateList spots={spots}/>
          </Route>
          <Route path="/mutuallist">
            <MutualList />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
