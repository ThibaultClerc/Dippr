import Cookies from 'js-cookie'
import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {loginUser} from '../../store/actions';
import { Form, Button } from "react-bootstrap";
import { Redirect } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  }));
  

const EditProfile = () => {
    const userStore = useSelector(state => state.user.user);

    const [firstName, setFirstName] = useState(userStore.attributes.first_name);
    const [lastName, setLastName] = useState(userStore.attributes.last_name);
    const [country, setCountry] = useState(userStore.attributes.country);
    const [city, setCity] = useState(userStore.attributes.city);
    const [zipCode, setZipCode] = useState(userStore.attributes.zip_code);
    const [street, setStreet] = useState(userStore.attributes.street);
    const [phoneNumber, setPhoneNumber] = useState(userStore.attributes.phone_number);
    const [description, setDescription] = useState(userStore.attributes.description);
    const dippers = useState(userStore.attributes.dippers);
    const [email, setEmail] = useState(userStore.attributes.email);
    const [password, setPassword] = useState();
    const [redirection, setRedirection] = useState(false);
    const classes = useStyles();

    const data = {
        user: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          country: country,
          city: city,
          zip_code: zipCode,
          street: street,
          phone_number: phoneNumber,
          description: description
        }
    };
  
   
    const dispatch = useDispatch();
  
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`https://dippr-api-development.herokuapp.com/api/users/${userStore.id}`, {
          "method": "PUT",
          "headers": {
            "Content-Type": "application/json",
            'Authorization': `${Cookies.get('token')}`

          },
          "body": JSON.stringify(data)
        })
        .then((response) => {
          console.log(response)
          return response.json()
        })
        .then((response) => {
          console.log("laaaa");
          console.log(data)
          console.log(response);
          dispatch(loginUser( { "id": userStore.id, "attributes": {
              email: email,
              first_name: firstName,
              last_name: lastName,
              country: country,
              city: city,
              zip_code: zipCode,
              street: street,
              description: description,
              phone_number: phoneNumber,
              dippers: dippers
          }}))
          console.log('updated')
          console.log(userStore)
          setRedirection(true);
        }).catch(error => {
          console.log(error)
        })
      };
      
    return (
        <div>
            <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        >
            {redirection && <Redirect to={`/profile/${userStore.id}`}/>}
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                <Form onSubmit={handleSubmit}>
                <Form.Group controlId="firstName">
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control type="firstName" value={firstName !== '' ? firstName : "Prénom"} onChange={e => setFirstName(e.target.value)}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="lastName">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control type="lastName" placeholder={lastName !== '' ? lastName : "Nom"} value={lastName} onChange={e => setLastName(e.target.value)}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder={email} value={email} onChange={e => setEmail(e.target.value)}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="password">
                <Form.Label>Mot de passe</Form.Label>
                    <Form.Control type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="country">
                    <Form.Label>Pays</Form.Label>
                    <Form.Control type="country" placeholder={country !== '' ? country : "Pays"} value={country} onChange={e => setCountry(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label>Ville</Form.Label>
                    <Form.Control type="city" placeholder={city !== '' ? city : "Ville"} value={city} onChange={e => setCity(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="zipCode">
                    <Form.Label>Code Postal</Form.Label>
                    <Form.Control type="zipCode" placeholder={zipCode !== '' ? zipCode : "Code Postal"} value={zipCode} onChange={e => setZipCode(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="street">
                    <Form.Label>Rue</Form.Label>
                    <Form.Control type="street" placeholder={street !== '' ? street : "Rue"} value={street} onChange={e => setStreet(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} type="description" placeholder={description !== '' ? description : "Description"} value={description} onChange={e => setDescription(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="phoneNumber">
                    <Form.Label>Numéro de téléphone</Form.Label>
                    <Form.Control type="phoneNumber" placeholder={phoneNumber !== '' ? phoneNumber : "Numéro de téléphone"} value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Enregistrer
                </Button>
                </Form>
                </Paper>
            </Grid> 
        </Grid> 
        </div>
    );
}

export default EditProfile