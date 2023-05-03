import React, { useEffect, useState } from "react";
import "./Home.css";
import RecipeList from "../../common/RecipeList";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../../firebase/firebase";

const HomeReceipe = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);

    const recipesCollection = collection(db, "recipes");
    getDocs(recipesCollection)
      .then((snapshot) => {
        if (snapshot.empty) {
          setError("No recipes to load");
          setIsPending(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id });
          });
          setData(results);
          setIsPending(false);
        }
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, []);

  return (
    <div className="home">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
};

export default HomeReceipe;
