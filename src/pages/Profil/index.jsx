import Cookies from 'js-cookie'
import React, {useState, useEffect} from 'react'
import {Link, useParams} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';

const Profil = () => {
  const user = useSelector(state => state.user);
  console.log("user la")

  console.log(user)
  const dispatch = useDispatch();

  const [mail, setMail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.attributes.first_name);
  const [lastName, setLastName] = useState(user.attributes.last_name);



  useEffect( () => {
    console.log(Cookies.get('token'))
    fetch(`https://dippr-api-development.herokuapp.com/api/users/${user.id}`, {
      method: 'get',
      headers: {
        'Authorization': `${Cookies.get('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then(response => {
      console.log(response);
      // const data = {
      //   first_name: response.data.attributes.first_name,
      //   last_name: response.data.attributes.last_name,
      // }
    })
    .catch((error) => console.error(error));
  }, [])

  return (
    <div className="text-center mt-3 mb-3">
      <h2> Prenom : {firstName} </h2>
      <h2> Nom : {lastName} </h2>
      <h2> Email : {mail} </h2>
      <h3> Utilisateur numéro : {user.id} </h3>
      <Button href="#" variant="primary">Modifier profil</Button> 
    </div>
  );
}
export default Profil;
