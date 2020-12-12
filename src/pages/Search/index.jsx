import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Loader from '../../components/UI/Loader';
import SearchResults from './SearchResults'


const Search = () => {
  const location = useLocation();
  // const [data, setData] = useState(location.state.data);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryValue, setCategoryValue] = useState('1');
  const [listOrMapValue, setListOrMapValue] = useState('list');


  console.log(location)

  const categories = [
    { name: 'TROCS', value: '1' },
    { name: 'DONS', value: '2' },
    { name: 'DEMANDES', value: '3' },
  ];

  const listMapButtons = [
    { name: 'List', value: 'list' },
    { name: 'Map', value: 'map' },
  ];


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
