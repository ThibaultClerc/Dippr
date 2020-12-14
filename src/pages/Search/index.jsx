import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import SearchResults from './SearchResults';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MapIcon from '@material-ui/icons/Map';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { Grid, Button, ButtonGroup } from '@material-ui/core';
import useDebounce from './use-debounce';
import './index.scss';

const Search = () => {
  const location = useLocation();
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryValue, setCategoryValue] = useState(1);
  const [listOrMaps, setListOrMaps] = useState("list");
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState(location.search)
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [data, setData] = useState([]);
  const [lastSearch, setLastSearch] = useState('')

  const fetchData = () => {
    setIsSearching(true);
    fetch(`https://dippr-api-development.herokuapp.com/api/marketdishes/search?query=${debouncedSearchTerm}`, {
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
    }).catch(error => {
      console.log(error)
    }).finally(() => {
      changeCategory(categoryValue)
      setIsSearching(false);
    });
  };

  useEffect(
    () => {
      if (debouncedSearchTerm && debouncedSearchTerm.length > 1) {
        fetchData()
      }
    },
    [debouncedSearchTerm]
  );

  useEffect(
    () => {
      setLastSearch(location.search)
      if (!(lastSearch.length > location.search.length)) {
        setSearchTerm(location.search)
      }
    },
    [location.search]
  );

  useEffect(() => {
      changeCategory(categoryValue)
  }, [categoryValue])

  const changeCategory = (category) => {
    switch(category) {
      case 1:
        setFilteredData(data.filter(dish => dish.attributes.market_dish_type === "troc"))
        break;
      case 2:
        setFilteredData(data.filter(dish => dish.attributes.market_dish_type === "donation"))
        break;
      case 3:
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
          aria-label="disabled tabs example"
        >
          <Tab value={1} label="Trocs" onClick={(e) => setCategoryValue(1)} style={{outline: 'none'}}/>
          <Tab value={2} label="Dons" onClick={(e) => setCategoryValue(2)} style={{outline: 'none'}}/>
          <Tab value={3} label="Demandes" onClick={(e) => setCategoryValue(3)} style={{outline: 'none'}}/>
        </Tabs>
        <ButtonGroup size="small" className="react-switch" color="primary" aria-label="outlined primary button group">
            <Button onClick={(e) => setListOrMaps("list")}>
              <FormatListBulletedIcon/>
            </Button>
            <Button onClick={(e) => setListOrMaps("map")}>
              <MapIcon/>
            </Button>
          </ButtonGroup>
      </Grid>
    </Paper>
      <SearchResults
        data={filteredData}
        listOrMapValue={listOrMaps}
        isSearching={isSearching}
        className="searchResults"/>
    </>
  )
}

export default Search
