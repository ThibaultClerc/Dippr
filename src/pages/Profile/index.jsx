import Cookies from 'js-cookie'
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Loader from '../../components/UI/Loader';


const Profile = () => {
  const user = useSelector(state => state.user);
  const [data, setData] = useState([])

  const fetchData = () => {
    fetch(`https://dippr-api-development.herokuapp.com/api/users/${user.id}`, {
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
      console.log(response.data)
      setData(response.data.attributes)
    }).catch(error => {
      console.log(error)
    })
  };

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="text-center mt-3 mb-3">
      {data.length !== 0 ?
        <>
          <h2> Prenom : {data.first_name !== "" ? data.first_name : ""} </h2>
          <h2> Nom : {data.last_name !== "" ? data.last_name : ""} </h2>
          <h2> Email : {data.email} </h2>
          <h3> Référence utilisateur : {user.id} </h3>
          <h3>Pays : {data.country !== "" ? data.country  : ""} </h3>
          <h3>Ville : {data.city !== "" ? data.city  : ""} </h3>
          <h3>Code postale : {data.zip_code !== "" ? data.zip_code  : ""} </h3>
          <h3>Rue : {data.street !== "" ? data.street  : ""} </h3>
          <h3>Numéro de téléphone : {data.phone_number !== "" ? data.phone_number  : ""} </h3>
          <h3>Description : {data.description !== "" ? data.description  : ""} </h3>
          <h3>Vous avez {data.dippers !== "" ? data.dippers + " dippers"  : "aucun dippers"} </h3>

          <Button as={Link} to="/profile/edit" variant="primary">Modifier mon profil</Button>
        </>
        : <Loader/>
       }
    </div>
  );
}
export default Profile;
