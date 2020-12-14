import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from '@material-ui/core/Button';
import DishCard from '../../../components/DishCard'
import welcomeImage2 from '../../../assets/img/welcomeImage2.png'
import dipprMainLogo from '../../../assets/img/dipprMainLogo.png';
import search from '../../../assets/img/search.png';
import share from '../../../assets/img/share.png';
import donate from '../../../assets/img/donate.png';
import cooking from '../../../assets/img/cooking.png';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment'
import SimpleCard from '../../../components/UI/SimpleCard';
import './index.scss'


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
  
  return (
    <>
      <Jumbotron>
        <Container>
          <Row>
            <Col>
              <img alt="dippr-main-logo" src={dipprMainLogo} className={classes.dipprMainLogo}></img>
              <h1>
                Troquez ou donnez vos plats maisons à vos voisins ou des associations
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
        <Container className="welcomeCardContainer">
            <Row>
              <Col md={6} xs={12} className="mobileSpacing mx-auto my-auto">
                <DishCard
                  key="welcome-dish-card"
                  name="Gratin de courgettes"
                  first_name="Aline"
                  description="Je vous propose mon grâtin de courgettes maison fait avec amour."
                  dish_rating={5}
                  created_at="il y a 3 heures"
                  className="welcomeCard"
                />
                </Col>
                <Col md={6} xs={12} className="my-auto">
                  <div>
                    <h2>
                      Vous pensez être le spécialiste du gratin de courgettes ? Proposez-le à votre entourage !
                    </h2>
                    <p className="mt-3">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas odio ullam iste veritatis ad fugit maxime error, quaerat, praesentium, impedit iusto? Cumque ut doloremque ea placeat nulla neque? Explicabo, aspernatur?
                    </p>
                  </div>
                </Col>
              
            </Row>
          </Container>
          <Container fluid className="pt-5 bg-dark p-5">
            <Row className="justify-content-center">
              <SimpleCard alt="search" img={search} content="Recherchez des plats aux alentours"/>
              <SimpleCard alt="cook" img={cooking} content="Préparez vos plats fétiches"/>
              <SimpleCard alt="share" img={share} content="Echangez vos plats avec vos voisins"/>
              <SimpleCard alt="donate" img={donate} content="Donnez vos plats à des associations"/>
            </Row>
          </Container>
        
    </>
  )
}

export default VisitorHome