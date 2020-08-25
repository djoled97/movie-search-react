import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import Rating from '@material-ui/lab/Rating';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import style from "./Content.module.css";
import {
  CardHeader,
  CardMedia,
  CardContent,
  Typography,

  CardActions,
  IconButton,
  Collapse,
} from "@material-ui/core";
 function Content({ movie, setSorted }) {
 //we are using this placeholder whenever our poster is N/A to display this image instead
  const placeholder="https://via.placeholder.com/300x443/0000?text=No%20poster"
  const [expanded, setExpanded] = React.useState(false);
  useEffect(() => {
    setSorted(false);
  });
  return (
    //This is our card component that holds all our data
   <Card className={style.root}>

   
      <CardHeader className={style.title} title={movie.Title} subheader={movie.Year}  />
     {!expanded &&
      <CardMedia className={style.media} image={movie.Poster!=="N/A" ? movie.Poster : placeholder }/>
     }
      <CardContent>
      <Typography variant="subtitle2">Rating:</Typography>
      <Rating value={(parseFloat(movie.imdbRating)/2)}  precision={0.2} readOnly></Rating>
        <Typography variant="subtitle2">Type: {movie.Type}</Typography>
        <Typography variant="subtitle2">Genre: {movie.Genre}</Typography>
        <Typography variant="subtitle2">Actors: {movie.Actors}</Typography>
        <hr />
      </CardContent>
    <CardActions >
      <IconButton onClick={()=>setExpanded(!expanded)}>
        {
          expanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>
        }

      </IconButton>
    </CardActions>
        <Collapse in={expanded}>
        <CardContent clasname={style.cardHeight} >
         <Typography variant="h6" >Plot</Typography>
          <Typography className={style.text}>
          {movie.Plot}
          </Typography>
          <Typography variant="h6">Additional Details</Typography>
          <Typography variant="subtitle2">Country: {movie.Country}</Typography>
          <Typography variant="subtitle2">Director: {movie.Director}</Typography>
          <Typography variant="subtitle2">Production: {movie.Production}</Typography>
          <Typography variant="subtitle2">Released: {movie.Released}</Typography>
          <Typography variant="subtitle2">Length: {movie.Runtime}</Typography>
          
        
        </CardContent>
        </Collapse>
    </Card>
  );
}

export default Content;