import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import CardColumns from 'react-bootstrap/CardColumns';
import DishCard from '../../components/DishCard';
import Loader from '../../components/UI/Loader';


const Search = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  let { query } = useParams();

  const fetchData = () => {
    setLoading(true)
    fetch(`http://localhost:3000/api/marketdishes/search?query=${query}`, {
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
      if (response.data.length === 0) {

      }
    }).catch(error => {
      console.log(error)
    })
  };

  useEffect(() => {
    fetchData()
  }, [query])


  return (
    <>
    {(!loading && data.length > 0) ?  
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
            />
          )})}
      </CardColumns>
      : <Loader/>
      }
    </>

  )
}

export default Search
