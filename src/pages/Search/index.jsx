import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Loader from '../../components/UI/Loader';
import SearchResults from './SearchResults'


const Search = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryValue, setCategoryValue] = useState('1');
  const [listOrMapValue, setListOrMapValue] = useState('list');

  let { query } = useParams();

  const categories = [
    { name: 'TROCS', value: '1' },
    { name: 'DONS', value: '2' },
    { name: 'DEMANDES', value: '3' },
  ];

  const listMapButtons = [
    { name: 'List', value: 'list' },
    { name: 'Map', value: 'map' },
  ];

  const fetchData = () => {
    setLoading(true)
    fetch(`https://dippr-api-development.herokuapp.com/api/marketdishes/search?query=${query}`, {
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
    if (typeof query !== undefined) {
      fetchData()
    }
  }, [query])

  useEffect(() => {
    changeCategory(categoryValue)
  }, [categoryValue, data])

  const changeCategory = (category) => {
    switch(category) {
      case "1":
        setFilteredData(data.filter(dish => dish.attributes.market_dish_type === "troc"))
        break;
      case "2":
        setFilteredData(data.filter(dish => dish.attributes.market_dish_type === "donation"))
        break;
      case "3":
        console.log("wishes")
      break;
    }
  }

  return (
    <>
    <ButtonGroup toggle>
        {categories.map((radio, idx) => (
          <ToggleButton
            key={idx}
            type="radio"
            variant="secondary"
            name="radio"
            value={radio.value}
            checked={categoryValue === radio.value}
            onChange={(e) => setCategoryValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <ButtonGroup toggle>
        {listMapButtons.map((radio, idx) => (
          <ToggleButton
            key={idx}
            type="radio"
            variant="secondary"
            name="radio"
            value={radio.value}
            checked={listOrMapValue === radio.value}
            onChange={(e) => setListOrMapValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <SearchResults data={filteredData} listOrMapValue={listOrMapValue}/>
    </>
  )
}

export default Search
