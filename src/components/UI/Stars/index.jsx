import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  star: {
    fontSize: "1rem"
  }
})
);

const Stars = ({dish_rating}) => {
  const classes = useStyles();

  const starsRender = (dish_rating) => {
    const stars = []
    for(let i=1; i <= dish_rating ; i++) {
      stars.push(<StarIcon key={i} className={classes.star}/>)
    }
    return stars
  }

  return (
    <div>
      {starsRender(dish_rating)}
    </div>
  )
}

export default Stars
