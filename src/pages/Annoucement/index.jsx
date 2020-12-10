import React, { useState, useEffect } from 'react'

import AutocompleteSearchBar from '../../components/Autocomplete'

const Announcement = () => {
  const [ingredients, setIngredients] = useState([]);

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

  useEffect(() => {
    fetchIngredient();
  }, []);

  useEffect(() => {
    console.log(ingredients)
  }, [ingredients]);


  return(
    <>
    {ingredients.length !== 0 && <AutocompleteSearchBar value={ ingredients }/>}
    </>
  )
}

export default Announcement