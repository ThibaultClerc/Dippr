import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const UserDishCard = ({name, description, dish_rating, user_id}) => {
  return (
    <Card  style={{ textDecoration: 'none' }}>
      <Card.Img variant="top" src="holder.js/100px160" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text as={Link} to={`/profile/${user_id}`}>Qui a fait ce plat ?</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">{dish_rating}</small> • 
      </Card.Footer>
    </Card>
  )
}

export default UserDishCard
