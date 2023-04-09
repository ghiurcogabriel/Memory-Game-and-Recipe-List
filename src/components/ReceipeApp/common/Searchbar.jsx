import { useState } from "react";
import "./Searchbar.css";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [term, setTerm] = useState("");

  const navigation = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(term && term.length !== " "){
      navigation(`/cooking/search?q=${term}`);  
    }
    setTerm("");
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          onChange={(e) => setTerm(e.target.value.trim())}
          value={term}
        />
      </form>
    </div>
  );
};

export default Searchbar;
