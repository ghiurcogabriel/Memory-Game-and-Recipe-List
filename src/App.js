import { NavLink, Routes, Route } from "react-router-dom";

import "./App.css";
import MainApp from "./components/MemoryGame/MainApp";
import CookingApp from "./components/ReceipeApp/CookingApp";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="App">
      <nav className="navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="./game">Game</NavLink>
        <NavLink to="./cooking">Cooking app</NavLink>
      </nav>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/game" element={<MainApp />} />
        <Route path="/cooking/*" element={<CookingApp />} />
      </Routes>
    </div>
  );
}

export default App;
