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
import Admin from "./views/Admin";
import PrivateRoute from "./views/PrivateRoute";
import LoginRender from "./views/LoginRender";

function App() {
  const [width, setWidth] = useState(null);

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
            <Route exact path="/music" component={Music} />
            <Route exact path="/services" component={Services} />
            <PrivateRoute rdr="/login" exact path="/admin" component={Admin} />
            <Route exact path="/login" component={LoginRender} />
            <Route exact path="/">
              <Home width={width} />
            </Route>
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
