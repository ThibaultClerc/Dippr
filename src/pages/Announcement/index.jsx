import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import SearchBar from '../../components/Autocomplete'
import SendIcon from '@material-ui/icons/Send';
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Connection from '../../pages/Login'
import PublishIcon from '@material-ui/icons/Publish';
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, InputBase, IconButton  } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import useDeviceDetect from '../../components/DeviceDetect';
import moment from 'moment';

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
  const { isMobile } = useDeviceDetect();
  const [ingredients, setIngredients] = useState([]);
  const [tags, setTags] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = React.useState(value);
  const [publishSuccess, setPublishSuccess] = React.useState(alert)
  const [file, setFile] = React.useState(null)
  const imageSrc = React.useRef(null)
  const [announceType, setAnnounceType] = React.useState(0)
  const [date, setDate] = React.useState(moment().format("YYYY-MM-DD"))

  const user = useSelector(state => state.user.user);
  const [currentTags, setCurrentTags] = useState([]);
  const [currentIngredients, setCurrentIngredients] = useState([]);

  const data = {
      name: name,
      description: description
  };

  useEffect(() => {
  }, [isMobile])

  const handlePublishSuccess = () => {
    setPublishSuccess(true);
    visibleAlert(true)
  };

  const handleClose = () => {	
    setOpen(false);	
    visibleModal(false)	
  };

  const handleFile = ({target}) =>{
    setFile(target.files[0]);
  };

  const handleDate = (e) =>{
    setDate(e.target.value);
  };

  const handleAnnounce = (value) =>{
    setAnnounceType(value)
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
    console.log(data.file)
    fetch(`https://dippr-api-development.herokuapp.com/api/users/${user.id}/user_dishes`, {
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
        handleIngredients(response.data.id, element.id );
      })
      currentTags.forEach(element =>{
        handleTags(response.data.id, element.id );
      })
      {(announceType === 0 || announceType === 1) && handleMarketDish(response.data.id)}
      handleFileUpload(response.data.id)
    }).catch(error => {
      console.log(error)
    })
  };

  const handleMarketDish = (dish) => {
    fetch(`https://dippr-api-development.herokuapp.com/api/users/${user.id}/market_dishes`, {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": Cookies.get("token")
      },
      "body": JSON.stringify(
        
        {
          user_dish_id: dish,
          market_dish_type: announceType,
          end_date: date
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

  const handleFileUpload = (user_dish_id) => {
    const formData = new FormData();
    formData.append("file", file);
    fetch(`https://dippr-api-development.herokuapp.com/api/users/${user.id}/user_dishes/${user_dish_id}`, {
      "method": "PUT",
      "headers": {
        "Authorization": Cookies.get("token")
      },
      "body": formData
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    }).finally(() => {
      handlePublishSuccess();
      handleClose();
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

  const dateContent = () => (
      <TextField
      id="date"
      label="Date limite"
      value = {date}
      type="date"
      className={classes.textField}
      onChange={handleDate}
      InputLabelProps={{
        shrink: true,
      }}
    />
  )

  const announceContent = () => (
    <>
    {announceType === 0 && <h5>Proposer un troc</h5>}
    {announceType === 1 && <h5>Proposer un don</h5>}
    {announceType === 2 && <h5>Proposer une spécialité</h5>}

    <ButtonGroup fullWidth size="small" className="react-switch" color="primary" aria-label="outlined primary button group">
      <Button onClick={()=>handleAnnounce(0)}>
        Publier un troc
      </Button>
      <Button onClick={()=>handleAnnounce(1)}>
        Publier un don
      </Button>
      <Button onClick={()=>handleAnnounce(2)}>
        Ajouter une spécialité
      </Button>
    </ButtonGroup>

    <TextField
      required
      autoFocus
      margin="dense"
      id="name"
      label="Titre"
      type="text"
      onChange={ e => setName(e.target.value) }
      fullWidth
      />
      <br/>
    <TextField
        id="outlined-required"
        label="Description"
        required
        autoFocus
        multiline
        fullWidth
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

      <ButtonGroup size="small" className="react-switch" color="primary" aria-label="outlined primary button group">
        <Button onClick={()=>imageSrc.current}>
            <label htmlFor="icon-button-file">
              <IconButton color="primary" className={classes.button} component="span">
                {isMobile? <PhotoCameraIcon/> : <PublishIcon/>}
                {file && <CheckCircleIcon style={{color: "green",}}/> }
              </IconButton>
            </label>        
          </Button>
      </ButtonGroup>

      {(announceType === 0 || announceType === 1) && dateContent()}

      <InputBase accept="image/*" id="icon-button-file" type="file"  hidden ref={imageSrc} onChange={handleFile}/>
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

  useEffect(()=>{
    console.log(file)
  },[file])

  useEffect(()=>{
    console.log(date)
    console.log(announceType)
  },[date, announceType])

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