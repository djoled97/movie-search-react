import React, { useState } from "react";

import "./App.css";
import Content from "./components/Content";
import Search from "./components/Search";

import SortMovies from "./components/SortMovies";
import LinearProgress from "@material-ui/core/LinearProgress";
function App() {
  const [movies, setMovies] = useState([]);
  const [load, setLoad] = useState();
  const [sorted, setSorted] = useState();

  return (
    <div className="bg">
      <Search
        sorted={sorted}
        movies={movies}
        setMovies={setMovies}
        setLoad={setLoad}
        setSorted={setSorted}
      />
  
      {movies.length>1 && (
        <SortMovies
          movies={movies}
          setMovies={setMovies}
          setSorted={setSorted}
        />
      )}
     {/* mapping over each movie that we get and if still loading show loading component */}
      {!load ? (
        movies.length>1 &&
        movies.map((movie) => (
          <Content key={movie.imdbID} movie={movie} setSorted={setSorted} />
        ))
      ) : (
        <LinearProgress className="linear" />
      )}
      {}
    </div>
  );
}



export default App;

