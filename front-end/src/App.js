import About from "./About";
import Navbar from "./Navbar";
import Login from "./Login";
import HomePage from "./HomePage";
import Register from "./Register";
import SpotListItem from "./SpotListItem";
import Start from "./Start";
import SpotsForm from "./SpotsForm";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "./config/axios";
import Loading from "./Loading";
import MutualList from "./MutualList";
import GenerateList from "./GenerateList";

export default function App() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    axios.get("/spots").then((res) => {
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
              <Link to="/login"> Login</Link>

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
          <Route path="/spots/detail" component={SpotListItem}></Route>
          <Route path="/start">
            <Start />
          </Route>
          <Route path="/generatelist">
            <GenerateList spots={spots} />
          </Route>
          <Route path="/spotsform">
            <SpotsForm spots={spots} />
          </Route>
          <Route path="/loading">
            <Loading />
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
