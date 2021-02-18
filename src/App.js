import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import Slider from "./components/Slider";
function App() {
  return (
    <div className="main">
      <Navigation />
      <Slider />
    </div>
  );
}

export default App;
