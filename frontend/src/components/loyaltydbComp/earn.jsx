import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import "./styles.css";

export default function Earn() {



  return (
    <div>
      <div className="cards_styles color_div card_flex_loyalty">
        <div className="card_flex">
          {/* Feedback */}
          <div>
            <Card style={{ width: "18rem" }}>
              <Card.Header>Feedback</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Your feedback is vital in shaping unforgettable experiences
                  for future travelers. Share your valuable insights and help us
                  create enchanting adventures that exceed expectations!
                  <br />
                  <br />
                  <Button className="button_styles">
                  <Link className="link_path_button" to="/feedback">
                    Give Feedback
                  </Link>
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </div>

          {/* Blog */}
          <div>
            <Card style={{ width: "18rem" }}>
              <Card.Header>Blog</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Your blog is vital in shaping unforgettable experiences for
                  future travelers. Share your valuable insights and help us
                  create enchanting adventures that exceed expectations!
                  <br />
                  <br />
                  <Button className="button_styles">
                    <Link className="link_path_button" to="/blogs">
                      Post a Blog
                    </Link>
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </div>
          <br />
        </div>
      </div>
      <h5 style={{textAlign: "center", marginLeft:"7rem"}}>
          More earning methods coming soon!!! <hr />
        </h5>
    </div>
  );
}
