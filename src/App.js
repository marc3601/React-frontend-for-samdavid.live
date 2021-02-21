import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Music from "./views/Music";
import Services from "./views/Services";
import Login from "./views/Login";
import Admin from "./views/Admin";
import PrivateRoute from "./views/PrivateRoute";

function App() {
  const [width, setWidth] = useState(null);
  //const [auth, setAuth] = useState(false);

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
      <AuthProvider>
        <div className="main">
          <Navigation width={width} />
          <Switch>
            <Route exact path="/">
              <Home width={width} />
            </Route>
            <Route path="/music" component={Music} />
            <Route path="/services" component={Services} />
            <Route path="/login" component={Login} />
            <PrivateRoute exact path="/admin" component={Admin} />
            <Route path="*">
              <h2 className="custom_h2 lead display-3 text-dark text-center pt-3 pb-5">
                404 - page not found :(
              </h2>
            </Route>
          </Switch>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
