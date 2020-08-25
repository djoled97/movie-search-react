import React, { useState } from "react";
import {
  FormControl,
  OutlinedInput,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { searchForMovies } from "../api";

import styles from "./search.styles";

export default function Search({ movies, setMovies, setLoad, setSorted }) {
  const classStyles = styles();
  const [search, setSearch] = useState("");
  const currentYear = new Date().getFullYear();
  const [type, setType] = useState("");
  const [year, setYear] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setLoad(true);

    searchForMovies(search, year, type).then((d) => {
      return (setMovies(d), setLoad(false));
    });
  };
  const centerSearchBar = (
    <div className={classStyles.center}>
      <form onSubmit={handleSearch}>
        <OutlinedInput
          className={classStyles.size}
          placeholder="Enter movie name"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <OutlinedInput
          className={classStyles.sizeSmall}
          placeholder="Year"
          type="number"
          name="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          inputProps={{
            min: "1",
            max: currentYear,
          }}
        />
        <FormControl variant="outlined">
          <InputLabel className={classStyles.selectLabel}>Type</InputLabel>
          <Select
            className={classStyles.select}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value={""}>---</MenuItem>
            <MenuItem value={"series"}>Series</MenuItem>
            <MenuItem value={"movie"}>Movie</MenuItem>
            <MenuItem value={"game"}>Game</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          className={classStyles.buttonSearch}
          variant="contained"
          color="primary"
        >
          <SearchIcon fontSize="large" />
        </Button>
      </form>
    </div>
  );
  const topSearchBar = (
    <div className={classStyles.centerHor}>
      <form onSubmit={handleSearch}>
        <OutlinedInput
          placeholder="Search by movie name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          style={{ background: "white" }}
        />
        <OutlinedInput
          className={classStyles.gap}
          placeholder="Year"
          type="number"
          name="year"
          style={{ background: "white" }}
          value={year}
          onChange={(e) => setYear(e.target.value)}
          inputProps={{
            min: "1",
            max: currentYear,
          }}
        />

        <FormControl className={classStyles.gap}>
          <InputLabel>Type</InputLabel>
          <Select
            style={{ background: "white" }}
            variant="outlined"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value={""}>---</MenuItem>
            <MenuItem value={"series"}>Series</MenuItem>
            <MenuItem value={"movie"}>Movie</MenuItem>
            <MenuItem value={"game"}>Game</MenuItem>
          </Select>
        </FormControl>

        <Button
          style={{ height: 58 }}
          className={classStyles.gap}
          type="submit"
          variant="contained"
          color="primary"
        >
          <SearchIcon />
        </Button>
      </form>
    </div>
  );

  return (
   
   // if we dont have anyting inside of our movie array we will have our 
   // search bar in center othwerise on top
   <div>
      {movies.length === 0 ? (
         centerSearchBar
      ) : (
        topSearchBar
      )}
    </div>
  );
}
