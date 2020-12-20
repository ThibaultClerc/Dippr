import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StoreIcon from '@material-ui/icons/Store';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid, Button, ButtonGroup } from '@material-ui/core';
import MyTransactions from '../MyTransactions'
import MyMarketDishes from '../MyMarketDishes'

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
  },
  tabsContainers: {
    paddingRight: 15,
    paddingLeft: 15,
    marginRight: 'auto',
    marginLeft: 'auto',

    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: {  // medium: 960px or larger
        width: 920,
    },
    [theme.breakpoints.up('lg')]: {  // large: 1280px or larger
        width: 1170,
    },
    [theme.breakpoints.up('xl')]: {  // extra-large: 1920px or larger
        width: 1366,
    },
  }
}));

const Swap = ()=> {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          <Tab label="Mes demandes" icon={<StoreIcon />} {...a11yProps(0)} />
          <Tab label="Mes plats" icon={<FavoriteIcon />} {...a11yProps(1)} />
        </Tabs>
        </Grid>
      </AppBar>
      <TabPanel value={value} index={0} className={classes.tabsContainers}>
        <MyTransactions/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MyMarketDishes/>
      </TabPanel>
    </div>
  );
}

export default Swap