import React, { useState, useEffect } from 'react'
import MyMarketDishesDisplay from './MyMarketDishesDisplay';
import { useSelector } from 'react-redux';
import Loader from '../../components/UI/Loader'


const MyMarketDishes = () => {
  const [data, setData] = useState([]);
  const user = useSelector(state => state.user.user);
  const [isSearching, setIsSearching] = useState(false)

  useEffect(
    () => {
      setIsSearching(true)
      fetch(`https://dippr-api-development.herokuapp.com/api/users/${user.id}/market_dishes`, {
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
      }).finally(() => setIsSearching(false))
    },
    []
  );

  return (
    <>
      {!isSearching > 0 ?
        <> 
          <MyMarketDishesDisplay
            data={data}
            style={{marginTop: "5em"}}
          />
        </>
      : <Loader/>
      }
    </>
  );
};

export default MyMarketDishes;
