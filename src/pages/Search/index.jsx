import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import SearchResults from './SearchResults';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MapIcon from '@material-ui/icons/Map';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import './index.scss';
import { Grid, Button, ButtonGroup } from '@material-ui/core';

const Search = () => {
  const location = useLocation();
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryValue, setCategoryValue] = useState('1');
  const [listOrMaps, setListOrMaps] = useState("list");

  useEffect(() => {
    if (typeof location.state !== 'undefined') {
      changeCategory(categoryValue)
    }
  }, [categoryValue, location.state])

  const changeCategory = (category) => {
    switch(category) {
      case "1":
        setFilteredData(location.state.data.filter(dish => dish.attributes.market_dish_type === "troc"))
        break;
      case "2":
        setFilteredData(location.state.data.filter(dish => dish.attributes.market_dish_type === "donation"))
        break;
      case "3":
        console.log("wishes")
      break;
    }
  }

  return (
    <>
    <Paper square>
      <Grid container item justify='center' alignItems='center'>
        <Tabs
          value={categoryValue}
          indicatorColor="primary"
          textColor="primary"
          onChange={(e) => setCategoryValue(e.currentTarget.value)}
          aria-label="disabled tabs example"
        >
          <Tab label="Trocs" onClick={(e) => setCategoryValue("1")}/>
          <Tab label="Dons" onClick={(e) => setCategoryValue("2")}/>
          <Tab label="Demandes" onClick={(e) => setCategoryValue("3")}/>
          <ButtonGroup size="small" className="react-switch" color="primary" aria-label="outlined primary button group">
            <Button onClick={(e) => setListOrMaps("list")}>
              <FormatListBulletedIcon/>
            </Button>
            <Button onClick={(e) => setListOrMaps("map")}>
              <MapIcon/>
            </Button>
          </ButtonGroup>
        </Tabs>
      </Grid>
    </Paper>
      <SearchResults data={filteredData} listOrMapValue={listOrMaps} className="searchResults"/>
    </>
  )
}

export default Search




