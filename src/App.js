import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Music from "./views/Music";
import Services from "./views/Services";

import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import Private from "./views/Private";
function App() {
  const [width, setWidth] = useState(null);
  const [auth, setAuth] = useState(!true);
  useEffect(() => {
    window.addEventListener("load", () => {
      setWidth(parseInt(window.innerWidth.toFixed(0)));
    });
    window.addEventListener("resize", () => {
      setWidth(parseInt(window.innerWidth.toFixed(0)));
    });
  }, [width]);

  return (
    <Router>
      <div className="main">
        <Navigation width={width} />
        <Switch>
          <Route exact path="/">
            <Home width={width} />
          </Route>
          <Route exact path="/music">
            <Music />
          </Route>
          <Route exact path="/services">
            <Services />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Private authed={auth} path="/admin" component={Dashboard} />
          <Route path="*">
            <h2 className="custom_h2 lead display-3 text-dark text-center pt-3 pb-5">
              404 - page not found :(
            </h2>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
