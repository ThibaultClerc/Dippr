import React, { useState, useEffect } from 'react'
import MyMarketDishesDisplay from './MyMarketDishesDisplay';
import { useSelector } from 'react-redux';

const MyMarketDishes = () => {
  const [data, setData] = useState([]);
  const user = useSelector(state => state.user.user);

  useEffect(
    () => {
      fetch(`https://dippr-api-production.herokuapp.com/api/users/${user.id}/market_dishes`, {
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
      }).catch(error => {
        console.log(error)
      })
    },
    []
  );

  return (
    <>
      <MyMarketDishesDisplay
        data={data}
        style={{marginTop: "5em"}}
      />
    </>
  );
};

export default MyMarketDishes;
