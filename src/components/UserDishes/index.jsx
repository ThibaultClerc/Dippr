import Cookies from 'js-cookie'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Loader from '../../components/UI/Loader';
import {Link, useParams} from "react-router-dom";
import UserDishCard from '../UserDishCard'
import CardColumns from 'react-bootstrap/CardColumns'

const UserDishes = (profileId) => {

    const [data, setData] = useState([])
    console.log("depuis userdishes")
    console.log(profileId)

    const fetchData = (url) => {
        console.log(url)
        fetch(url, {
          "method": "GET",
          "headers": {
            "Content-Type": "application/json",
            'Authorization': `${Cookies.get('token')}`
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
      };

      useEffect(() => {
        fetchData(`https://dippr-api-development.herokuapp.com/api/users/${profileId.profileId}/user_dishes`)
      }, []);

    return (
        <div>
          <CardColumns>
            {data.map(dish => {
              return (
                <UserDishCard 
                  key={dish.id}
                  name={dish.attributes.name}
                  description={dish.attributes.description}
                  dish_rating={dish.attributes.dish_rating}
                  user_id={dish.attributes.user_id}
                /> 
              );
            })}
          </CardColumns>
        </div>
    );
}

export default UserDishes