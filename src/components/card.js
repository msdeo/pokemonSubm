import React, {useState} from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cards=(data)=>{
  // console.log(data);
  // console.log(data.weight);
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
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
    );
};

export default Cards;