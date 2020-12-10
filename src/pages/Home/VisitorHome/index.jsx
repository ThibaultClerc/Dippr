import React, { useState, useEffect } from 'react';
import Loader from '../../../components/UI/Loader'

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button'
import CardColumns from 'react-bootstrap/CardColumns'
import DishCard from '../../../components/DishCard'

const VisitorHome = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchData = () => {
    setLoading(true)
    fetch(`http://localhost:3000/api/market_dishes`, {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json"
      },
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      setData(response.data)
      setLoading(false)
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
      {!loading ?  
      <CardColumns>
        {data.slice(0, 6).map(dish => {
          const dishData = dish.meta.user_dish
          console.log(data.slice(0,6))
          return (
            <DishCard
              key={dish.id}
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