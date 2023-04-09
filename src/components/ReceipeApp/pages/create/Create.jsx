import React, { useRef, useState } from "react";
import "./Create.css";

import { useTheme } from "../../hook/useTheme";
import { useNavigate } from "react-router-dom";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Create = () => {
  const { mode } = useTheme();
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);

  let navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(title, method, cookingTime, ingredients);
    try {
      await addDoc(collection(db, 'recipes'), {
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minuites",
    });
    setTimeout(() => { 
       navigate("/cooking");
      }, 1000)
    } catch (error) {
      console.log(error);
    }
    
    setTitle("");
    setMethod("");
    setCookingTime("");
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing]);
    }
    setNewIngredient("");
    ingredientInput.current.focus();
    console.log(ing);
  };

  return (
    <div className={`create ${mode}`}>
      <div className="page-title">Add new Recipe</div>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title: </span>
          <input
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe Ingresients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => {
                setNewIngredient(e.target.value);
              }}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button onClick={handleAdd} className="btn">
              add
            </button>
          </div>
        </label>
        <p>
          Currect Ingredients:{" "}
          {ingredients.map((one) => (
            <em key={one}>{one}, </em>
          ))}
        </p>

        <label>
          <span>Recipe method: </span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking Time (minutes): </span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default Create;
