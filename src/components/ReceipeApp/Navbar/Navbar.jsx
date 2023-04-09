import React from "react";
import { Link } from "react-router-dom";
import Searchbar from "../common/Searchbar";

import "./Navbar.css";
import { useTheme } from "../hook/useTheme";

const Navbar = () => {
  const { color } = useTheme();
  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link to="/cooking" className="brand">
          Cookie, the cooking Cat
        </Link>
        <Searchbar />
        <Link to="/cooking/create">Create Receipe</Link>
      </nav>
    </div>
  );
};

export default Navbar;
