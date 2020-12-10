import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const DishCard = ({market_dish_id, name, description, dish_rating, user_id, created_at}) => {
  return (
    <Card as={Link} to={`/marketdishes/${market_dish_id}`} style={{ textDecoration: 'none' }}>
      <Card.Img variant="top" src="holder.js/100px160" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text as={Link} to={`/profile/${user_id}`}>Qui a fait ce plat ?</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">{dish_rating}</small>
        <small className="text-muted">{created_at}</small>
      </Card.Footer>
    </Card>
  )
}

export default DishCard
