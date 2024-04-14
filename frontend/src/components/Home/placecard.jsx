import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Kandy from '../../images/maligawa.jpeg';
import Kurunegala from '../../images/kurunegala.jpg';
import Galle from '../../images/galle2.jpg';
import Anuradapura from '../../images/anuradapura.jpg';
import Polonnaruwa from '../../images/polonnaruwa.jpeg';
import Nuwaraeliy from '../../images/nuwaraeliya.jpeg';
import Hambnthota from '../../images/hmbnthota.jpeg';
import Jaffna from '../../images/jaffna.jpeg';
import axios from 'axios';

export default function PlaceCard() {
  const [places, setPlaces] = useState([]);

  const fetchPlaces = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/places/places`);
      const { data } = response;
      setPlaces(data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  console.log(places);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        padding: '5rem'
      }}
    >
      <div
        class="container text-center"
        
      >
        <div
          class="row row-cols-4 gap-7"
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            alignItems: 'center',
          }}
        >
          {places.map((place, index) => (
            <div key={index} class="col">
              <Card style={{ width: '100%' }}>
                <Card.Img variant="top" src={place.image} />
                <Card.Body>
                  <Card.Title>{place.placeName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {place.district} | {place.province}
                  </Card.Subtitle>
                  <Button variant="primary">View</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
