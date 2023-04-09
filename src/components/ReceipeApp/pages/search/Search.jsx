import React from "react";
import { useLocation } from "react-router-dom";
import "./Search.css";

import RecipeList from "../../common/RecipeList";

import { useFetch } from "../../hook/useFetch";

const Search = () => {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q");

  const url = "http://localhost:3000/recipes?q=" + query;
  const { data, error, isPending } = useFetch(url);

  return (
    <div>
      <h1 className="page-title">Recipes including "{query}"</h1>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recepies={data} />}
    </div>
  );
};

export default Search;
