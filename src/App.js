import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Music from "./views/Music";
import Gallery from "./views/Gallery";
import Admin from "./views/Admin";
import PrivateRoute from "./views/PrivateRoute";
import LoginRender from "./views/LoginRender";
import Category1 from "./views/categories/Category1";
import Category2 from "./views/categories/Category2";
import Category3 from "./views/categories/Category3";
import Category4 from "./views/categories/Category4";

import ScrollToTop from "./components/ScrollToTop";
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
      <ScrollToTop />
      <AuthProvider>
        <div style={{ position: "relative" }} className="main">
          <Navigation width={width} />
          <Switch>
            <Route exact path="/gallery" component={Gallery} />
            <PrivateRoute rdr="/login" exact path="/admin" component={Admin} />
            <Route exact path="/login" component={LoginRender} />
            <Route exact path="/music" component={Music} />
            <Route exact path="/music/remix" component={Category1} />
            <Route exact path="/music/original-music" component={Category2} />
            <Route exact path="/music/dj-sets" component={Category3} />
            <Route exact path="/music/projects" component={Category4} />
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
