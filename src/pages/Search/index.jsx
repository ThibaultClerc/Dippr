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
  const [radioValue, setRadioValue] = useState('1');
  let { query } = useParams();

  const radios = [
    { name: 'TROCS', value: '1' },
    { name: 'DONS', value: '2' },
    { name: 'DEMANDES', value: '3' },
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
    changeCategory(radioValue)
  }, [radioValue, data])

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
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            type="radio"
            variant="secondary"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <SearchResults data={filteredData}/>
    </>
  )
}

export default Search
