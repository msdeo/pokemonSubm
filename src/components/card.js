import React from 'react'
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cards=(data)=>{
    return (
        <Card style={{ width: '8rem' }}>
      <Card.Img variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.data['id']}.png`} />
      <Card.Body>
        <Card.Title>#{data.data['id']} <strong>{data.data['name']}</strong></Card.Title>
        <Card.Text>
          weight: {data.data['weight']}
          <br />
          Height: {data.data['height']}
        </Card.Text>
      </Card.Body>
    </Card>
    );
};

export default Cards;