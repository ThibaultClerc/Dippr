import React, { useEffect, useState } from 'react'
import DishCard from '../../../components/DishCard';
import Loader from '../../../components/UI/Loader';
import Map from '../../../components/Map';
import dishSearch1 from '../../../assets/img/dishSearch1.png';
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core/'
import './index.scss'

const useStyles = makeStyles(theme => ({
    cardContainer: {
        flexGrow: 1,
        padding: theme.spacing(2)
    }
}))

const SearchResults = ({data, listOrMapValue, isSearching}) => {
  const classes = useStyles()

  const displayRouter = () => {
    if (data.length > 0 && listOrMapValue === "list") {
      return (
        <>
          <div className={classes.cardContainer}>
            <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
              {data.map(dish => {
              const dishData = dish.meta.user_dish
              return (
                <Grid item xs={6} sm={4} md={3} lg={2} key={dish.id} width={300}>
                  <DishCard
                    market_dish_id={dishData.id}
                    user_first_name={dish.meta.user_first_name}
                    name={dishData.name}
                    description={dishData.description}
                    dish_rating={dishData.dish_rating}
                    user_id={dishData.user_id}
                    created_at={dishData.created_at}
                    type={dish.attributes.market_dish_type}
                  />
                </Grid>
              )})}
            </Grid>
          </div>
        </>
      )
    } else if (data.length > 0 && listOrMapValue === "map") {
      return (
          <Map data={data}/>
      )
    } else {
      return <img src={dishSearch1} alt="search-logo" className="dishImg"/>;
    }   
  }

  useEffect(() => {
    displayRouter()
  }, [data])

  return (
    <>
      {!isSearching ?
        displayRouter()
        : <Loader/>
      }
    </>
  )
}

export default SearchResults
