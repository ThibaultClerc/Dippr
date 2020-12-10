import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { Badge } from "react-bootstrap";


const AutocompleteSearchBar = ({value}) =>{
  let array = [];
  const [ingredients, setIngredients] = useState(value);
  const [ingredient, setIngredient] = useState("");
  const [disheIngredients, setDisheIngredients] = useState(array);

  const addElement = () => {
    console.log(ingredient)
    let ingredient_id;
    ingredients.map(element =>{
      if(element.type === ingredient) {
        return ingredient_id = element.id
        }
      }
    );
    setDisheIngredients(array =>[...array,ingredient_id]);
  };

  const removeElement = (element) => {
    let array2 = disheIngredients;

    const index = array2.indexOf(element);
    console.log(index)
    if(index > -1){
      array2.splice(index, 1)
    }
    document.getElementById(element).innerHTML=""
    setDisheIngredients(array2);
    };

  const ingredientBadges = () => {
    let table = []
    console.log("hello")
    disheIngredients.forEach(element =>{ 
      ingredients.map(value =>{
        if(value.id == element) {
            return table.push(
            <>
            <Badge variant="secondary" id={element}>{value.type}<CloseIcon onClick={()=>removeElement(element)} style={{cursor: "pointer"}}  id={element + "a"}/></Badge>
            </>
            )
          }
        }
      );
      
    })
    return table

  };

  useEffect(() => {
    console.log(value)
  }, []);

  useEffect(() => {
    console.log(disheIngredients)
  }, [disheIngredients]);

  useEffect(() => {
    return () => {
      removeElement()
    }
  }, []);

  return(
    <>
    <Autocomplete
    id="combo-box-demo"
    options={ingredients}
    getOptionLabel={(options) => options.type}
    style={{ width: 300 }}
    renderInput={(params) => <TextField {...params} label="Ingredients" variant="outlined" onSelect={e => setIngredient(e.target.value)}/>}
  /><Button variant="contained" onClick={addElement} >Ajouter</Button> <br></br>{ingredientBadges()}

  </>

  )
};

export default AutocompleteSearchBar;