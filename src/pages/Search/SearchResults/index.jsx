import React from 'react'
import CardColumns from 'react-bootstrap/CardColumns';

import DishCard from '../../../components/DishCard';
import Loader from '../../../components/UI/Loader';

const SearchResults = ({data, loading}) => {

  return (
    <>
      {data.length > 0 ?
      <CardColumns>
        {data.map(dish => {
          const dishData = dish.meta.user_dish
          return (
            <DishCard
              key={dish.id}
              market_dish_id={dishData.id}
              name={dishData.name}
              description={dishData.description}
              dish_rating={dishData.dish_rating}
              user_id={dishData.user_id}
              created_at={dishData.created_at}
              type={dish.attributes.market_dish_type}
            />
          )})}
      </CardColumns>
      : <h1>Y'a R</h1>
      }
    </>
  )
}

export default SearchResults
