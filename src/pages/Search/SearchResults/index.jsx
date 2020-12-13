import React, { useEffect } from 'react'
import CardDeck from 'react-bootstrap/CardDeck';
import Row from 'react-bootstrap/Row'

import DishCard from '../../../components/DishCard';
import Loader from '../../../components/UI/Loader';
import Map from '../../../components/Map';
import dishSearch1 from '../../../assets/img/dishSearch1.png'
import './index.scss'

const SearchResults = ({data, listOrMapValue}) => {

  const displayRouter = () => {
    if (data.length > 0 && listOrMapValue === "list") {
      return (
        <Row>
        <CardDeck className="mt-5">
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
        </CardDeck>
        </Row>
      )
    } else if (data.length > 0 && listOrMapValue === "map") {
      return <Map data={data}/>
    } else {
      return <img src={dishSearch1} alt="search-logo" className="dishImg"/>;
    }   
  }

  useEffect(
    () => {
    displayRouter()
  },
    [data]
  )

  return (
    <>
      {displayRouter()}
    </>
  )
}

export default SearchResults
