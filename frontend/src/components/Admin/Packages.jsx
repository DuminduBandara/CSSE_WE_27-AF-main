import React, { useEffect, useState } from "react";
import Header from "../Payment/Header";
import { TextField } from "@mui/material";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "./admin-styles.css";
import axios from "axios";

const Packages = () => {



  return (
    <div>
      <Header title="PACKAGES" subtitle="Create new packages for requests" />
      <br />
      <div className="package-form">
        <TextField
          disabled
          id="outlined-disabled"
          label="Request ID"
          defaultValue="643e3322fe649f9b22de19ef"
          // value={}
          variant="outlined"
          style={{
            marginRight: "1rem",
            width: 375,
          }}
        />
        <TextField
          disabled
          id="outlined-disabled"
          label="User ID"
          defaultValue="64569c01d4d5180affb57eb3"
          // value={}
          variant="outlined"
          style={{
            marginRight: "1rem",
            width: 375,
          }}
        />
        <br />
        <br />
        <TextField
          id="outlined-read-only-input"
          label="Province"
          defaultValue="Central"
          // value={}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
          style={{
            marginRight: "1rem",
            width: 345,
          }}
        />
        <TextField
          id="outlined-read-only-input"
          label="District"
          defaultValue="Kandy, Matale"
          // value={}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
          style={{
            marginRight: "1rem",
            width: 407,
          }}
        />
        <TextField
          id="outlined-read-only-input"
          label="Date"
          defaultValue="2023-05-15"
          // value={}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
          style={{
            marginRight: "1rem",
          }}
        />
        <TextField
          id="outlined-read-only-input"
          label="No of Days"
          defaultValue="5"
          // value={}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
          style={{
            marginRight: "1rem",
            width: 150,
          }}
        />
        <br />
        <br />
        <div>
          <Form>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalName"
            >
              <Form.Label
                column
                sm={2}
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  fontFamily: "Lucida Sans",
                }}
              >
                Package Number
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Package Number"
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 100,
                    fontFamily: "Lucida Sans",
                    width: 972,
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalName"
            >
              <Form.Label
                column
                sm={2}
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  fontFamily: "Lucida Sans",
                }}
              >
                Package Price (Rs.)
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Package price in Sri Lankan Rupees (Ex: 3500.00)"
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 100,
                    fontFamily: "Lucida Sans",
                    width: 972,
                  }}
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
                Description
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="textarea"
                  rows={1}
                  placeholder="Enter small description about the package"
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 100,
                    fontFamily: "Lucida Sans",
                    width: 972,
                  }}
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
                Package Details
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Enter your package details"
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 100,
                    fontFamily: "Lucida Sans",
                    width: 972,
                  }}
                />
              </Col>
            </Form.Group>

            <div className="admin_form_button_div">
              <Button
                variant="primary"
                type="submit"
                className="admin_form_button"
                style={{
                  fontSize: "1rem",
                  fontWeight: 100,
                  fontFamily: "Lucida Sans",
                  marginRight: "1.3rem",
                }}
              >
                SUBMIT
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Packages;
