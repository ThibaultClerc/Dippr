import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import StarIcon from '@material-ui/icons/Star';
import RestaurantIcon from '@material-ui/icons/Restaurant'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid, Button, ButtonGroup } from '@material-ui/core';
import { useSelector } from 'react-redux';
import DishCard from '../../components/DishCard';
import Cookies from 'js-cookie'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },  grow: {
    flexGrow: 1,
  }, cardContainer: {
    flexGrow: 1,
    padding: theme.spacing(2)
  }
}));

const Dish = ()=> {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [data, setData] = useState([])
  const [marketData, setMarketData] = useState([])
  const user = useSelector(state => state.user.user);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const cardsDiplays = (value, type) =>(
    <>
    <div className={classes.cardContainer}>
      <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
      >
        {value.map(dish => {
          
          let dishData = dish.attributes
            if (type === "marketdish"){
              dishData = dish.meta.user_dish
            }
        return (
          <Grid item xs={6} sm={4} md={3} lg={2} key={dish.id} width={300}>
            <DishCard
              market_dish_id={dishData.id}
              name={dishData.name}
              description={dishData.description}
              dish_rating={dishData.dish_rating}
              created_at={dishData.created_at}
              type_of_card='user_dish'
              photo_url={dishData.photo_url}
            />
          </Grid>
        )})}
      </Grid>
    </div>
  </>
  );

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
      setData(response.data)
    }).catch(error => {
      console.log(error)
    })
  };

  const fetchMarketData = (url) => {
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
      setMarketData(response.data)
    }).catch(error => {
      console.log(error)
    })
  };
  
  useEffect(() => {
    fetchData(`http://localhost:3090/api/users/${user.id}/user_dishes`);
    fetchMarketData(`http://localhost:3090/api/users/${user.id}/market_dishes`)
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Grid container item justify='center' alignItems='center'>

        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          
          <Tab label="Mes spécialités" icon={<StarIcon />} {...a11yProps(0)} />
          <Tab label="Mes annonces" icon={<RestaurantIcon />} {...a11yProps(1)} />
        </Tabs>
        </Grid>
      </AppBar>
      <TabPanel value={value} index={0}>
        {cardsDiplays(data, "dish")}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {cardsDiplays(marketData, "marketdish")}
      </TabPanel>
    </div>
  );
}

export default Dish