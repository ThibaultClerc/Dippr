import React, { useState, useEffect } from 'react'
import {Container, Row, Col, Form, Button } from "react-bootstrap";
import SearchBar from '../../components/Autocomplete'

const Announcement = () => {
  const [ingredients, setIngredients] = useState([]);
  const [tags, setTags] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const data = {
    user_dishe: {
      user_id: id,
      name: name,
      description: description,
      date: date,
    }
};


  const fetchIngredient = () => {
    fetch("https://dippr-api-development.herokuapp.com/api/ingredients", {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json"
      },
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      const ingredients = response.data;
      const array_ingredients = []
        ingredients.forEach(element =>{
          array_ingredients.push(element);
          }
        )
      setIngredients(array_ingredients)
    }).catch(error => {
      console.log(error)
    })
  };

  const fetchTag = () => {
    fetch("https://dippr-api-development.herokuapp.com/api/tags", {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json"
      },
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      const tag = response.data;
      const array_tags = []
        tag.forEach(element =>{
          array_tags.push(element);
          }
        )
      setTags(array_tags)
    }).catch(error => {
      console.log(error)
    })
  };

  useEffect(() => {
    fetchIngredient();
    fetchTag();
  }, []);

  useEffect(() => {
    console.log(ingredients)
    console.log(tags)
  }, [ingredients]);


  return(
    <>
    {ingredients.length !== 0 && <SearchBar content={ ingredients } title="Ingredients"/>}
    <br/>
    {tags.length !== 0 && <SearchBar content={ tags } title="Type de plat"/>}

    </>
  )
}

export default Announcement