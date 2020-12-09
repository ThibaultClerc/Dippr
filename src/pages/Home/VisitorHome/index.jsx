import React, { useState, useEffect } from 'react';
import Loader from '../../../components/UI/Loader'

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button'
import CardColumns from 'react-bootstrap/CardColumns'
import DishCard from '../../../components/DishCard'

const VisitorHome = () => {
  const [data, setData] = useState([])

  const fetchData = () => {
    fetch(`https://dippr-api-development.herokuapp.com/api/market_dishes`, {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json"
      },
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      console.log(response.data)
      setData(response.data)
    }).catch(error => {
      console.log(error)
    })
  };

  useEffect(() => {
    fetchData();
  }, [])
  
  return (
    <>
      <Jumbotron>
        <h1>Bienvenue sur DIPPR</h1>
        <p>
          Echangez ou donnez des plats maisons entre voisins !
        </p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </Jumbotron>
      {data.length !== 0 ?  
      <CardColumns>
        {data.slice(0, 6).map(dish => {
          const dishData = dish.meta.user_dish
          return (
            <DishCard
              market_dish_id={dishData.id}
              name={dishData.name}
              description={dishData.description}
              dish_rating={dishData.dish_rating}
              user_id={dishData.user_id}
              created_at={dishData.created_at}
            />
          )})}
      </CardColumns>
      : <Loader/>
      }
    </>
  )
}

export default VisitorHome