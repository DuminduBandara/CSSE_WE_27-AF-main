import React, { useState } from "react";
import Header from "../Payment/Header";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function Places() {
  const [province, setProvince] = React.useState("");
  const [district, setDistrict] = React.useState("");

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };

  const [newPlace, setNewPlace] = useState({
    placeName: "",
    province: "",
    district: "",
    description: "",
    image: "",
  });

  const handleChange = ({ target }) => {
    setNewPlace({ ...newPlace, [target.name]: target.value });
  };

  const handleImage = ({ target }) => {
    setNewPlace({ ...newPlace, image: target.files[0] });
    console.log(newPlace.image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("placeName", newPlace.placeName);
    formData.append("province", newPlace.province);
    formData.append("district", newPlace.district);
    formData.append("description", newPlace.description);
    formData.append("image", newPlace.image);

    console.log(formData.image);

    await axios
      .post("http://localhost:8080/places/upload", formData)
      .then((res) => {
        console.log(formData);
        alert("Place added successfully...");
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
              fontSize: "0.9rem",
              fontWeight: 500,
              fontFamily: "Lucida Sans",
            }}
          >
            Name of the Place
          </Form.Label>
          <Col sm={10}>
            <TextField
              id="filled-basic"
              label="Name of the Place"
              value={newPlace.placeName}
              onChange={handleChange}
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
              fontSize: "0.9rem",
              fontWeight: 500,
              fontFamily: "Lucida Sans",
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
                value={province}
                onChange={handleProvinceChange}
              >
                <MenuItem value={10}>Central Province</MenuItem>
                <MenuItem value={20}>Eastern Province</MenuItem>
                <MenuItem value={30}>Northern Province</MenuItem>
                <MenuItem value={40}>Southern Province</MenuItem>
                <MenuItem value={50}>Western Province</MenuItem>
                <MenuItem value={60}>North Western Province</MenuItem>
                <MenuItem value={70}>North Central Province</MenuItem>
                <MenuItem value={80}>Uva Province</MenuItem>
                <MenuItem value={90}>Sabaragamuwa Province</MenuItem>
              </Select>
            </FormControl>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label
            column
            sm={2}
            style={{
              fontSize: "0.9rem",
              fontWeight: 500,
              fontFamily: "Lucida Sans",
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
                value={district}
                onChange={handleDistrictChange}
              >
                <MenuItem value={10}>Jaffna</MenuItem>
                <MenuItem value={20}>Kilinochchi</MenuItem>
                <MenuItem value={30}>Mannar</MenuItem>
                <MenuItem value={40}>Mullaitivu</MenuItem>
                <MenuItem value={50}>Vavuniya</MenuItem>
                <MenuItem value={60}>Puttalam</MenuItem>
                <MenuItem value={70}>Kurunegala</MenuItem>
                <MenuItem value={80}>Gampaha</MenuItem>
                <MenuItem value={90}>Colombo</MenuItem>
                <MenuItem value={100}>Kalutara</MenuItem>
                <MenuItem value={110}>Anuradhapura</MenuItem>
                <MenuItem value={120}>Polonnaruwa</MenuItem>
                <MenuItem value={130}>Matale</MenuItem>
                <MenuItem value={140}>Kandy</MenuItem>
                <MenuItem value={150}>Nuwara Eliya</MenuItem>
                <MenuItem value={160}>Kegalle</MenuItem>
                <MenuItem value={170}>Ratnapura</MenuItem>
                <MenuItem value={180}>Trincomalee</MenuItem>
                <MenuItem value={190}>Batticaloa</MenuItem>
                <MenuItem value={200}>Ampara</MenuItem>
                <MenuItem value={210}>Badulla</MenuItem>
                <MenuItem value={220}>Monaragala</MenuItem>
                <MenuItem value={230}>Hambantota</MenuItem>
                <MenuItem value={240}>Matara</MenuItem>
                <MenuItem value={250}>Galle</MenuItem>
              </Select>
            </FormControl>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label
            column
            sm={2}
            style={{
              fontSize: "0.9rem",
              fontWeight: 500,
              fontFamily: "Lucida Sans",
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
              onChange={handleChange}
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
              fontSize: "0.9rem",
              fontWeight: 500,
              fontFamily: "Lucida Sans",
            }}
          >
            Image Upload
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="file" onChange={handleImage} style={{ width: 700 }} />
          </Col>
        </Form.Group>
        <div className="places_form_button_div">
          <Button
            variant="primary"
            type="submit"
            className="places_form_button"
            style={{
              fontSize: "1rem",
              fontWeight: 100,
              fontFamily: "Lucida Sans",
            }}
          >
            ADD PLACE
          </Button>
        </div>
      </Form>
    </div>
  );
}
