import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import Heading from "./components/Heading";

function App() {
  return (
    <div className="main">
      <Navigation />
      <Heading />
    </div>
  );
}

export default App;
