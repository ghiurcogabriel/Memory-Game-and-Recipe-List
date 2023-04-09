import React from "react";
import "./Receipe.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "../../hook/useTheme";

import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Recipe = () => {
  const { mode } = useTheme();
  const { idParam } = useParams();
  let navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/cooking");
      }, 5000);
    }
  }, [error, navigate]);

  useEffect(() => {
    setIsPending(true);

    getDoc(doc(db, `recipes/${idParam}`)).then((snap) => {
      // console.log(snap);
      if (snap.exists) {
        console.log('good')
        setIsPending(false)
        setRecipe(snap.data())
      } else {
        console.log('error')
        setIsPending(false)
        setError(`Could not find that recipe`)
      }
    });
  }, [idParam]);

  const updateRecipe = () => {
    getDoc(doc(db, `recipes/${idParam}`))
  }

  return (
    <div className={`recipe ${mode}`}>
      {isPending && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li className="ingredient" key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <p>{recipe.method}</p>
          <button onClick={updateRecipe}>Update recipe</button>
        </>
      )}
    </div>
  );
};

export default Recipe;
