import React, { useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
 
 
} from "@material-ui/core";
import style from "./sort.module.css";
function SortMovies({ movies, setMovies, setSorted }) {
  const [sortType, setSortType] = useState(" ");

  let compareValues = null;
// comparator function which will be used for sorting out all the data 
  compareValues = (key, order = "asc") => {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
  };

  const handleChangeSort = (e) => {
    setSortType(e.target.value);
  };
// inside sortFunc we are calling our comparator function e.g. compareValues("name","asc")
  const sortFunc = (value, order) => {
    setMovies(movies.sort(compareValues(value, order)));
    setSorted(true);
  };

  return (
    <div>
      <div style={{ marginLeft: 20 }}>
        <FormControl variant="outlined">
        {/* here we are basically using select just as a type of container 
        Menu item is actually doing all the work with it's onCLick listner */}
          <Select
            className={style.root}
            disabled={!movies}
            name="sortType"
            value={sortType}
            onChange={handleChangeSort}
          >
            <MenuItem value=" ">Sort</MenuItem>
            <MenuItem
              value={"titleasc"}
              onClick={() => sortFunc("Title", "asc")}
            >
              Name A-Z
            </MenuItem>
            <MenuItem
              value={"titledesc"}
              onClick={() => sortFunc("Title", "desc")}
            >
              Name Z-A
            </MenuItem>
            
            <MenuItem value={"actorasc"} onClick={() => sortFunc("Actors","asc")}>
              Actor A-Z
            </MenuItem>
            <MenuItem value={"actordesc"} onClick={() => sortFunc("Actors","desc")}>
              Actor Z-A
            </MenuItem>
            <MenuItem value={"actorasc"} onClick={() => sortFunc("Genre","asc")}>
              Genre A-Z
            </MenuItem>
            <MenuItem value={"actordesc"} onClick={() => sortFunc("Genre","desc")}>
              Genre Z-A
            </MenuItem>
            <MenuItem value={"yearasc"} onClick={() => sortFunc("Year", "asc")}>
              Year ASC
            </MenuItem>
            <MenuItem
              value={"yeardesc"}
              onClick={() => sortFunc("Year", "desc")}
            >
              Year DESC
            </MenuItem>
            <MenuItem value={"ratingasc"} onClick={() => sortFunc("imdbRating", "asc")}>
              Rating ASC
            </MenuItem>
            <MenuItem
              value={"ratingdesc"}
              onClick={() => sortFunc("imdbRating", "desc")}
            >
              Rating DESC
            </MenuItem>
          </Select>
        </FormControl>
      </div>

      <hr className={style.hrGradient} />
    </div>
  );
}
export default SortMovies;
