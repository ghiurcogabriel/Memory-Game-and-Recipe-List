import React from "react";
import { useTheme } from "../hook/useTheme";
import modeIcon from '../assets/mode-icon.svg';

import "./ThemeSelector.css";

const themeColors = ["#58249C", "#249c6b", "#b70233"];

const ThemeSelector = () => {
  const { changeColor, changeMode, mode } = useTheme();

  const toogleMode = () => {
    changeMode(mode === 'dark' ? 'light' : 'dark')
  }

  console.log(mode);

  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img 
          src={modeIcon} 
          alt="mode-icon" 
          onClick={toogleMode}  
          style={{filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)'}}
        />
      </div>
      <div className="theme-buttons">
        {themeColors.map((color) => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <div className="mode-button">
        {themeColors.map((color) => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
