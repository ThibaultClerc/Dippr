import Cookies from 'js-cookie'
import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {loginUser} from '../../store/actions';
import { Form, Button } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import {Link, useParams} from "react-router-dom";

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
  

const EditProfileAdmin = () => {
  let {userId} = useParams();

    const userStore = useSelector(state => state.user.user);
    const [data, setData] = useState([])

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [street, setStreet] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const dippers = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    const [redirection, setRedirection] = useState(false);
    const classes = useStyles();

    const datas = {
        
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
        
    };
    
    const fetchData = (url) => {
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
        setFirstName(response.data.attributes.first_name)
        setLastName(response.data.attributes.last_name)
        setEmail(response.data.attributes.email)
        setCountry(response.data.attributes.country)
        setCity(response.data.attributes.city)
        setZipCode(response.data.attributes.zip_code)
        setStreet(response.data.attributes.street)
        setPhoneNumber(response.data.attributes.phone_number)
        setDescription(response.data.attributes.description)

        console.log('lalalalalalalalal')
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    };
    
    useEffect(() => {
      fetchData(`https://dippr-api-development.herokuapp.com/api/users/${userId}`)
    }, [])
  
   
    // const dispatch = useDispatch();
  
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`https://dippr-api-development.herokuapp.com/api/users/${userId}`, {
          "method": "PUT",
          "headers": {
            "Content-Type": "application/json",
            'Authorization': `${Cookies.get('token')}`

          },
          "body": JSON.stringify(datas)
        })
        .then((response) => {
          console.log(response)
          return response.json()
        })
        .then((response) => {
          console.log("laaaa");
          console.log(response);
          // dispatch(loginUser( { "id": userStore.id, "attributes": {
          //     email: email,
          //     first_name: firstName,
          //     last_name: lastName,
          //     country: country,
          //     city: city,
          //     zip_code: zipCode,
          //     street: street,
          //     description: description,
          //     phone_number: phoneNumber,
          //     dippers: dippers
          // }}))
          console.log('updated')
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
            {redirection && <Redirect to={`/admin}`}/>}
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

export default EditProfileAdmin