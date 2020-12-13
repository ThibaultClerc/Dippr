import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../../components/UI/Loader';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from '@material-ui/core/Button';
import CardColumns from 'react-bootstrap/CardColumns'
import DishCard from '../../../components/DishCard'
import welcomeImage2 from '../../../assets/img/welcomeImage2.png'
import dipprMainLogo from '../../../assets/img/dipprMainLogo.png';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  dipprMainLogo: {
    [theme.breakpoints.down('md')]: {
      width: '40vw',
      margin: 'auto',
      display: 'block'
    },
    [theme.breakpoints.down('sm')]: {
      width: '70vw',
      margin: 'auto'
    },
  },
  dipprWelcomeImage: {
    [theme.breakpoints.down('md')]: {
      width: '80vw',
      display: 'block',
      margin: 'auto'
    },
  },
}));

const VisitorHome = () => {
  const classes = useStyles();
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchData = () => {
    setLoading(true)
    fetch(`https://dippr-api-development.herokuapp.com/api/market_dishes`, {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json"
      },
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      setData(response.data)
      setLoading(false)
    }).catch(error => {
      console.log(error)
    })
  };

  useEffect(() => {
    fetchData();
  }, [])
  
  return (
    <>
      <Jumbotron>
        <Container>
          <Row>
            <Col>
              <img alt="dippr-main-logo" src={dipprMainLogo} className={classes.dipprMainLogo}></img>
              <h1>
                Troquez ou donnez des plats maisons avec vos voisins ou des associations.
              </h1>
              <p className="mt-3">
                <Button endIcon={<NavigateNextIcon/>}component={Link} to ="/signup" variant="outlined" color="secondary">
                  proposez votre plat
                </Button>
              </p>
            </Col>
            <Col>
              <img alt="welcome" src={welcomeImage2} className={classes.dipprWelcomeImage}></img>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
      {!loading ?  
      <CardColumns>
        {data.slice(0, 6).map(dish => {
          const dishData = dish.meta.user_dish
          return (
            <DishCard
              key={dish.id}
              market_dish_id={dishData.id}
              name={dishData.name}
              description={dishData.description}
              dish_rating={dishData.dish_rating}
              user_id={dishData.user_id}
              created_at={dishData.created_at}
            />
          )})}
      </CardColumns>
      : <Loader/>
      }
    </>
  )
}

export default VisitorHome