import Cookies from 'js-cookie'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Loader from '../../components/UI/Loader';
import {Link, useParams} from "react-router-dom";



const Profile = () => {
  let {profileId} = useParams();
  const [profil, setProfil] = useState()

  const user = useSelector(state => state.user);
  console.log("laaaaaaª")
  console.log(user)
  const [data, setData] = useState([])
  
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
      //console.log(response.data)
      setData(response.data.attributes)
    }).catch(error => {
      console.log(error)
    })
  };



  useEffect(() => {
    fetchData(`https://dippr-api-development.herokuapp.com/api/users/${profileId}`)
  }, [])
  
  useEffect(() => {
    fetchData(`https://dippr-api-development.herokuapp.com/api/users/${profileId}`)
  }, [profileId])

  return (
    <div className="text-center mt-3 mb-3">
      {data.length !== 0 ?
        <>
          <h2> Prenom : {data.first_name !== "" ? data.first_name : ""} </h2>
          <h2> Nom : {data.last_name !== "" ? data.last_name : ""} </h2>
          <h2> Email : {data.email} </h2>
          <h3> Référence utilisateur : {data.id} </h3>
          <h3>Pays : {data.country !== "" ? data.country  : ""} </h3>
          <h3>Ville : {data.city !== "" ? data.city  : ""} </h3>
          <h3> {data.zip_code !== "" && user.id === profileId ? "Code postale : " + data.zip_code  : ""} </h3>
          <h3> {(data.street !== "" && user.id === profileId )? "Rue : " + data.street  : ""} </h3>
          <h3> {data.phone_number !== "" && user.id === profileId ? "Numéro de téléphone : " + data.phone_number  : ""} </h3>
          <h3>Description : {data.description !== "" ? data.description  : ""} </h3>
          <h3> {data.dippers !== "" && user.id === profileId ? "Vous avez " + data.dippers + " dippers"  : ""} </h3>

          <h3>{user.id === profileId ? <Button as={Link} to="/profile/edit" variant="primary">Modifier mon profil</Button> : ""}</h3>
        </>
        : <Loader/>
       }
    </div>


  );
}
export default Profile;
