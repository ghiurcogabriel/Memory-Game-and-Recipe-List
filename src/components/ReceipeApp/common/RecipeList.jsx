import React from "react";
import "./RecipeList.css";
import { Link } from "react-router-dom";
import { useTheme } from "../hook/useTheme";

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

import DeleteIcon from "../assets/delete-icon.svg";

const RecipeList = ({ recipes }) => {
  const { mode } = useTheme();

  if (recipes.length === 0 || recipes === null) {
    return <div className="error">No recipes was found...</div>;
  }

  const handleClick = (id) => {
    deleteDoc(doc(db, "recipes", id));
  };
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime}</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/cooking/recipes/${recipe.id}`}>Cook this</Link>
          <img
            id="delete"
            onClick={() => handleClick(recipe.id)}
            src={DeleteIcon}
            alt="delete"
          />
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
