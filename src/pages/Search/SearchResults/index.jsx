import React from 'react'
import CardColumns from 'react-bootstrap/CardColumns';

import DishCard from '../../../components/DishCard';
import Loader from '../../../components/UI/Loader';
import Map from '../../../components/Map';

const SearchResults = ({data, listOrMapValue}) => {

  console.log(listOrMapValue)

  const displayRouter = () => {
    if (data.length > 0 && listOrMapValue === "list") {
      return (
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
      )
    } else if (data.length > 0 && listOrMapValue === "map") {
      return <Map/>
    } else {
      return <Loader/>
    }   
  }

  return (
    <>
      {displayRouter()}
    </>
  )
}

export default SearchResults
