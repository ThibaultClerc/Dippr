import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import SearchBar from '../../components/Autocomplete'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import SendIcon from '@material-ui/icons/Send';
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Connection from '../../pages/Login'
import CameraDialog from '../../components/CameraDialog'

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

const Announcement = ({value, visibleModal, alert, visibleAlert}) => {
  const classes = useStyles();

  const [currentUser, setCurrentUser] = useState(useSelector(state => state.user));
  const [ingredients, setIngredients] = useState([]);
  const [tags, setTags] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = React.useState(value);
  const [publishSuccess, setPublishSuccess] = React.useState(alert)

  const user = useSelector(state => state.user.user);
  const [currentTags, setCurrentTags] = useState([]);
  const [currentIngredients, setCurrentIngredients] = useState([]);

  const data = {
    user_dish: {
      name: name,
      description: description,
    }
  };

  const handleClose = () => {
    setOpen(false);
    visibleModal(false)
  };

  const handlePublishSuccess = () => {
    setPublishSuccess(true);
    visibleAlert(true)
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
      currentIngredients.forEach(element =>{
        handleIngredients(response.id, element.id );
      })
      currentTags.forEach(element =>{
        handleTags(response.id, element.id );
      })
      handlePublishSuccess();
      handleClose();
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
    }).catch(error => {
      console.log(error)
    })
  };

  const announceContent = () => (
    <>
    <h5>Proposer un plat</h5>
    <TextField
      required
      autoFocus
      margin="dense"
      id="name"
      label="Titre"
      type="text"
      onChange={ e => setName(e.target.value) }
      style={{ width: 270 }}
      />
      <br/>
    <TextField
        id="outlined-required"
        label="Description"
        required
        autoFocus
        multiline
        style={{ width: 270 }}
        rows={2}
        rowsMax={4}
        onChange={ e => setDescription(e.target.value) }
      />
      <br/>
      <br/>
      {ingredients.length !==0 && <SearchBar content={ ingredients } title="Ingredients" data={(content=>handleIngredientData(content))}/>}
      <br/>
      {tags.length !==0  && <SearchBar content={ tags } title="Type de plat" data={(content=>handleTagData(content))}/>}
      <br/>
      <CameraDialog/>
      </>
    );

    const announceAction = () => (
      <>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Annuler
        </Button>
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon/>}
          onClick={handleSubmit}
          style={{ height: 50 }}
        >
          Poster mon annonce
        </Button>
        </DialogActions>
      </>
    )

    const loginContent = () => (
      <>
        <h5>Connectes-toi et propose ta spécialité</h5>
        <Connection/>
      </>

    );

  const handleIngredientData = (content) =>{
    setCurrentIngredients(content)
  }

  const handleTagData = (content) =>{
    setCurrentTags(content)
  }

  useEffect(() => {
    fetchIngredient();
    fetchTag();
  }, []);

  return(
      <div className={classes.root}>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          {user.length === 0 && loginContent()}
          {user.length !== 0 && announceContent()}
        </DialogContent>
          {user.length !== 0 && announceAction()}
      </Dialog>
    </div>
  )
}

export default Announcement