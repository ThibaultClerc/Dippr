import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import SearchResults from './SearchResults';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MapIcon from '@material-ui/icons/Map';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { Grid, Button, ButtonGroup } from '@material-ui/core';
import './index.scss';

const Search = () => {
  const location = useLocation();
  const [filteredData, setFilteredData] = useState([]);
  const [categoryValue, setCategoryValue] = useState(1);
  const [listOrMaps, setListOrMaps] = useState("list");
  const [isSearching, setIsSearching] = useState(false);
  const [data, setData] = useState([]);
  const isMounted = useRef(false)

  console.log(location.search)
  useEffect(
    () => {
      isMounted.current = true
      if (location.search !== "") {
        const query = location.search.split('?').pop()
        setIsSearching(true);
        fetch(`https://dippr-api-production.herokuapp.com/api/marketdishes/search?query=${query}`, {
          "method": "GET",
          "headers": {
            "Content-Type": "application/json"
          },
        })
        .then((response) => {
          return response.json()
        })
        .then((response) => {
          if (isMounted.current) {
            setData(response.data)
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          if (isMounted.current) {
            setIsSearching(false);
          }
        });
      }
    },
    [location.search]
  );

  useEffect(() => {
      changeCategory(categoryValue)
  }, [categoryValue, data])

  const changeCategory = (category) => {
    switch(category) {
      case 1:
        setFilteredData(data.filter(dish => dish.attributes.market_dish_type === "troc"))
        break;
      case 2:
        setFilteredData(data.filter(dish => dish.attributes.market_dish_type === "donation"))
        break;
    }
  }

  return (
    <>
    <Paper square style={{backgroundColor: "rgb(241 243 247)"}}>
      <Grid container item justify='center' alignItems='center'>
        <Tabs
          value={categoryValue}
          indicatorColor="primary"
          aria-label="disabled tabs example"
        >
          <Tab value={1} label="Trocs" onClick={(e) => setCategoryValue(1)} style={{outline: 'none'}}/>
          <Tab value={2} label="Dons" onClick={(e) => setCategoryValue(2)} style={{outline: 'none'}}/>
        </Tabs>
        <ButtonGroup size="small" color="primary" aria-label="outlined primary button group">
            <Button onClick={(e) => setListOrMaps("list")}>
              <FormatListBulletedIcon/>
            </Button>
            <Button onClick={(e) => setListOrMaps("map")}>
              <MapIcon/>
            </Button>
          </ButtonGroup>
      </Grid>
    </Paper>
      {data.length > 0 &&
        <> 
          <SearchResults
            data={filteredData}
            listOrMapValue={listOrMaps}
            isSearching={isSearching}
            className="searchResults"
          />
        </>
      }
    </>
  );
};

export default Search;
