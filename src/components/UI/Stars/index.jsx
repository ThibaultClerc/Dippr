import React from 'react';
import StarIcon from '@material-ui/icons/Star';

const Stars = ({dish_rating}) => {

  const starsRender = (dish_rating) => {
    const stars = []
    for(let i=1; i <= dish_rating ; i++) {
      stars.push(<StarIcon/>)
    }
    console.log(stars)
    return stars
  }

  return (
    <div className="stars">
      {starsRender(dish_rating)}
    </div>
  )
}

export default Stars
