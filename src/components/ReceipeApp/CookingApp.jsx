import React from 'react';
import { Routes, Route } from "react-router-dom";
// import MainReceipeApp from './MainReceipeApp';
import './CookingApp.css';

//pages 
import HomeReceipe from './pages/home/HomeReceipe';
import Search from './pages/search/Search';
import Recipe from './pages/receipe/Recipe';
import Create from './pages/create/Create';

import Navbar from './Navbar/Navbar';
import ThemeSelector from './common/ThemeSelector';
import { useTheme } from './hook/useTheme';

const CookingApp = () => {

  const { mode } = useTheme();

  return (
    <div className={`CookingApp ${mode}`}>
        <Navbar />
        <ThemeSelector />
        {/* <HomeReceipe /> */}
        <Routes>
            <Route exact path='/' element={<HomeReceipe />}></Route>
            <Route path='/create' element={<Create />}></Route>
            <Route path='/search' element={<Search />}></Route>
            <Route path='/recipes/:idParam' element={<Recipe />}></Route>
        </Routes>
    </div>
  )
}

export default CookingApp