const API_KEY = "3a08c5fd";
const BASE_URL = "http://www.omdbapi.com/?apikey=";

//Since omdbapi doesn't have request variables for actors,genre ...
//I had to make search request first and then from that search request take all the imdbIds
//(with them i can get more info) an loop them and put them in a new array so i can get
// a lot more information about movies.
//I understand this is not the best option in realtime sicne i am consuming too many requests
// at once and that may cause slower performance.On the other hand OMDBApi doesn't provide
// additional info when you do a plain search over a list of movies.

async function searchForMovies(name, year, type) {
  let inital = null;

  if (year !== "") {
    inital = await fetch(`${BASE_URL}${API_KEY}&s=${name}&y=${year}`);
  } else if (type !== "") {
    inital = await fetch(`${BASE_URL}${API_KEY}&s=${name}&type=${type}`);
  } else if (year !== "" && type !== "") {
    inital = await fetch(
      `${BASE_URL}${API_KEY}&s=${name}&y=${year}&type=${type}`
    );
  } else {
    inital = await fetch(`${BASE_URL}${API_KEY}&s=${name}`);
  }
  const data = await inital.json();
  if (data.Response !== "False") {
    const ids = data.Search.map((d) => d.imdbID);
    let arr = [];
    for (let id of ids) {
      let get = await fetch(`${BASE_URL}${API_KEY}&i=${id}`);
      let res = await get.json();
      arr.push(res);
    }

    return arr;
  }
  return [];
}

export { searchForMovies };
