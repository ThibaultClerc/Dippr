import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import SearchBar from '../../components/Autocomplete'
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Announcement = () => {

  const classes = useStyles();

  const [currentUser, setCurrentUser] = useState(useSelector(state => state.user));
  const [ingredients, setIngredients] = useState([]);
  const [tags, setTags] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [redirection, setRedirection] = useState(false);

  const [currentTags, setCurrentTags] = useState([]);
  const [currentIngredients, setCurrentIngredients] = useState([]);

  const data = {
    user_dish: {
      name: name,
      description: description,
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

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`https://dippr-api-development.herokuapp.com/api/users/${currentUser.id}/user_dishes`, {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": Cookies.get("token")
      },
      "body": JSON.stringify(data)
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      console.log(response)
      currentIngredients.forEach(element =>{
        handleIngredients(response.id, element.id );
      })
      currentTags.forEach(element =>{
        handleTags(response.id, element.id );
      })
      setRedirection(true)
    }).catch(error => {
      console.log(error)
    })
  };

  const handleIngredients = (dish, ingredient) => {
    fetch(`https://dippr-api-development.herokuapp.com/api/user_dish_ingredients`, {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": Cookies.get("token")
      },
      "body": JSON.stringify(
        
        {
          user_dish_ingredient: {
            user_dish_id: dish,
            ingredient_id: ingredient
          }
        }
      )
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  };

  const handleTags = (dish, tags) => {
    fetch(`https://dippr-api-development.herokuapp.com/api/user_dish_tags`, {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": Cookies.get("token")
      },
      "body": JSON.stringify(
        
        {
          user_dish_tag: {
            user_dish_id: dish,
            tag_id: tags
          }
        }
      )
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  };


  const handleIngredientData = (content) =>{
    setCurrentIngredients(content)
  }

  const handleTagData = (content) =>{
    setCurrentTags(content)
  }

  useEffect(() => {
    fetchIngredient();
    fetchTag();
    console.log(currentUser.id)
  }, []);

  return(
    <div className={classes.root}>
      <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}>
          <Paper className={classes.paper}>

            {redirection && <Redirect to='/'/>}
            <h3>Proposer un plat</h3>
            <TextField
                  required
                  id="outlined-required"
                  label="Titre"
                  style={{ width: 300 }}
                  variant="outlined"
                  onChange={ e => setName(e.target.value) }
                />

            <br/>
            <br/>

            <TextField
              id="outlined-required"
              label="Description"
              required
              multiline
              style={{ width: 300 }}
              rows={2}
              rowsMax={4}
              variant="outlined"
              onChange={ e => setDescription(e.target.value) }
            />
            <br/>
            <br/>

            {ingredients.length !==0 && <SearchBar content={ ingredients } title="Ingredients" data={(content=>handleIngredientData(content))}/>}
            <br/>
            {tags.length !==0  && <SearchBar content={ tags } title="Type de plat" data={(content=>handleTagData(content))}/>}
            <br/>
          <Button
            variant="contained"
            color="primary"
            endIcon={<SendIcon/>}
            onClick={handleSubmit}
          >
            Poster mon annonce
          </Button>
        </Paper>
    </Grid>

    </div>
  )
}

export default Announcement