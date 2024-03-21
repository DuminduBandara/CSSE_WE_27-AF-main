import React, { useState } from 'react';
import Header from '../Payment/Header';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function Places() {
  const [province, setProvince] = React.useState('');
  const [district, setDistrict] = React.useState('');

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };

  console.log(province, district);

  const [newPlace, setNewPlace] = useState({
    placeName: '',
    province: '',
    district: '',
    description: '',
    image: '',
  });

  const handleImage = ({ target }) => {
    setNewPlace({ ...newPlace, image: target.files[0] });
    console.log(newPlace.image);
  };

  console.log(newPlace);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('placeName', newPlace.placeName);
    formData.append('province', newPlace.province);
    formData.append('district', newPlace.district);
    formData.append('description', newPlace.description);
    formData.append('image', newPlace.image);

    console.log(formData.image);

    await axios
      .post('http://localhost:8080/places/upload', formData)
      .then((res) => {
        console.log(formData);
        alert('Place added successfully...');
      })
      .catch((err) => {
        console.log(err);
        alert("Can't add a new place");
      });
  };

  return (
    <div>
      <Header title="TRAVEL PLACES" subtitle="Add new places" />
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label
            column
            sm={2}
            style={{
              fontSize: '0.9rem',
              fontWeight: 500,
              fontFamily: 'Lucida Sans',
            }}
          >
            Name of the Place
          </Form.Label>
          <Col sm={10}>
            <TextField
              id="filled-basic"
              label="Name of the Place"
              value={newPlace.placeName}
              onChange={(e) =>
                setNewPlace({ ...newPlace, placeName: e.target.value })
              }
              variant="filled"
              sx={{ minWidth: 700 }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label
            column
            sm={2}
            style={{
              fontSize: '0.9rem',
              fontWeight: 500,
              fontFamily: 'Lucida Sans',
            }}
          >
            Province
          </Form.Label>
          <Col sm={10}>
            <FormControl variant="filled" sx={{ minWidth: 700 }}>
              <InputLabel id="demo-simple-select-filled-label">
                Province
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={newPlace.province}
                onChange={(e) =>
                  setNewPlace({ ...newPlace, province: e.target.value })
                }
              >
                <MenuItem value={'Central Province'}>Central Province</MenuItem>
                <MenuItem value={'Eastern Province'}>Eastern Province</MenuItem>
                <MenuItem value={'Northern Province'}>Northern Province</MenuItem>
                <MenuItem value={'Southern Province'}>Southern Province</MenuItem>
                <MenuItem value={'Western Province'}>Western Province</MenuItem>
                <MenuItem value={'North Western Province'}>North Western Province</MenuItem>
                <MenuItem value={'North Central Province'}>North Central Province</MenuItem>
                <MenuItem value={'Uva Province'}>Uva Province</MenuItem>
                <MenuItem value={'Sabaragamuwa Province'}>Sabaragamuwa Province</MenuItem>
              </Select>
            </FormControl>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label
            column
            sm={2}
            style={{
              fontSize: '0.9rem',
              fontWeight: 500,
              fontFamily: 'Lucida Sans',
            }}
          >
            District
          </Form.Label>
          <Col sm={10}>
            <FormControl variant="filled" sx={{ minWidth: 700 }}>
              <InputLabel id="demo-simple-select-filled-label">
                District
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={newPlace.district}
                onChange={(e) =>
                  setNewPlace({ ...newPlace, district: e.target.value })
                }
              >
                <MenuItem value={'Jaffna'}>Jaffna</MenuItem>
                <MenuItem value={'Kilinochchi'}>Kilinochchi</MenuItem>
                <MenuItem value={'Mannar'}>Mannar</MenuItem>
                <MenuItem value={'Mullaitivu'}>Mullaitivu</MenuItem>
                <MenuItem value={'Vavuniya'}>Vavuniya</MenuItem>
                <MenuItem value={'Puttalam'}>Puttalam</MenuItem>
                <MenuItem value={'Kurunegala'}>Kurunegala</MenuItem>
                <MenuItem value={'Gampaha'}>Gampaha</MenuItem>
                <MenuItem value={'Colombo'}>Colombo</MenuItem>
                <MenuItem value={'Kalutara'}>Kalutara</MenuItem>
                <MenuItem value={'Anuradhapura'}>Anuradhapura</MenuItem>
                <MenuItem value={'Polonnaruwa'}>Polonnaruwa</MenuItem>
                <MenuItem value={'Matale'}>Matale</MenuItem>
                <MenuItem value={'Kandy'}>Kandy</MenuItem>
                <MenuItem value={'Nuwara Eliya'}>Nuwara Eliya</MenuItem>
                <MenuItem value={'Kegalle'}>Kegalle</MenuItem>
                <MenuItem value={'Ratnapura'}>Ratnapura</MenuItem>
                <MenuItem value={'Trincomalee'}>Trincomalee</MenuItem>
                <MenuItem value={'Batticaloa'}>Batticaloa</MenuItem>
                <MenuItem value={'Ampara'}>Ampara</MenuItem>
                <MenuItem value={'Badulla'}>Badulla</MenuItem>
                <MenuItem value={'Monaragala'}>Monaragala</MenuItem>
                <MenuItem value={'Hambantota'}>Hambantota</MenuItem>
                <MenuItem value={'Matara'}>Matara</MenuItem>
                <MenuItem value={'Galle'}>Galle</MenuItem>
              </Select>
            </FormControl>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label
            column
            sm={2}
            style={{
              fontSize: '0.9rem',
              fontWeight: 500,
              fontFamily: 'Lucida Sans',
            }}
          >
            Description
          </Form.Label>
          <Col sm={10}>
            <TextField
              id="filled-multiline-static"
              label="Description about the place"
              multiline
              value={newPlace.description}
              onChange={(e) =>
                setNewPlace({ ...newPlace, description: e.target.value })
              }
              rows={4}
              variant="filled"
              sx={{ minWidth: 700 }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formFile" className="mb-3">
          <Form.Label
            column
            sm={2}
            style={{
              fontSize: '0.9rem',
              fontWeight: 500,
              fontFamily: 'Lucida Sans',
            }}
          >
            Image Upload
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="file"
              onChange={handleImage}
              style={{ width: 700 }}
            />
          </Col>
        </Form.Group>
        <div className="places_form_button_div">
          <Button
            variant="primary"
            type="submit"
            className="places_form_button"
            style={{
              fontSize: '1rem',
              fontWeight: 100,
              fontFamily: 'Lucida Sans',
            }}
          >
            ADD PLACE
          </Button>
        </div>
      </Form>
    </div>
  );
}
