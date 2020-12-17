import Cookies from 'js-cookie'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Loader from '../../components/UI/Loader';
import {Link, useParams} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Row, Col } from 'react-bootstrap';
import './index.css';
import UserDishes from '../../components/UserDishes';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

const Profile = () => {
  const user = useSelector(state => state.user.user);
  const [data, setData] = useState([])
  let {profileId} = useParams();
  const classes = useStyles();

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
      setData(response.data.attributes)
    }).catch(error => {
      console.log(error)
    })
  };
  
  useEffect(() => {
    fetchData(`https://dippr-api-development.herokuapp.com/api/users/${profileId}`)
  }, [profileId])
 console.log("dataaaaaaaaaaa")
 console.log(data)

  return (
    
      
      <div className="text">
        {data.length !== 0 ?
          <>
          <br/><br/><br/>
          <Container xs="8" className="">
          <Row className="block border-dark">
           
           <Col xs="4">
              <Avatar alt="Remy Sharp" src="../../assets/img/dishLogo.png" className={classes.large} />
              <p> {data.first_name !== "" ? data.first_name : ""}{' '}{data.last_name !== "" ? data.last_name : ""} 
               <br/> {data.email} 
               <br/> {data.dippers !== "" ? "Vous avez " + data.dippers + " dippers"  : ""}
               </p>
           </Col>
            <Col xs="4">
              <p> Pays : {data.country !== "" ? data.country  : ""} <br/>
               Ville : {data.city !== "" ? data.city  : ""} <br/>
               {data.zip_code !== "" ? "Code postale : " + data.zip_code  : ""} <br/>
               {data.street !== "" ? "Rue : " + data.street  : ""} <br/>
              {data.phone_number !== "" ? "Numéro de téléphone : " + data.phone_number  : ""} </p> 
            </Col>   
            <Col xs="4">
            <h5>Description : </h5>
              {data.description !== "" ? data.description  : ""} 
              <br/><br/>
              {user.id === profileId ? <Button as={Link} to="/users/edit" variant="primary">Modifier mon profil</Button> : ""}
            </Col>
         
          </Row>
          <br/><br/>
          
          <h3>{user.id === profileId ? <UserDishes profileId={user.id}/> : ""}</h3>

        </Container>
          </>
          : <Loader/>
        }
      </div>
     
      
  );
}
export default Profile;
