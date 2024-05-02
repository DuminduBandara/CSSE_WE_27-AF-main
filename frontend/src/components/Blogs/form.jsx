import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import "./styles.css";

export default function Blogform() {
  const [formData, setFormData] = useState({
    userId: localStorage.getItem('userID'),
    blogName: "",
    blogPlaces: "",
    bloggerName: "",
    blogContent: "",
    username: localStorage.getItem("username")
  });

  const { blogName, blogPlaces, bloggerName, blogContent } = formData;

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/blog/add", formData)
      .then((res) => {
        setSuccessMessage("Blog added successfully!");
        window.location.reload();
      })
      .catch((err) => console.log(err));

    setFormData({
      blogName: "",
      blogPlaces: "",
      bloggerName: "",
      blogContent: "",
    });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Blog Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="blogName"
              placeholder="Enter a name for your blog"
              onChange={handleChange}
              value={blogName}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Places
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter what places includes in your blog"
              name="blogPlaces"
              value={blogPlaces}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Your Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="bloggerName"
              value={bloggerName}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Blog
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter your blog here"
              name="blogContent"
              value={blogContent}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Row>
          <Col>
            <Button
              className="accordian_button"
              variant="primary"
              type="submit"
            >
              Submit Blog
            </Button>
          </Col>
        </Row>
      </Form>
      <div className="blog_message">
        {successMessage && <h5>{successMessage}</h5>}
      </div>
    </div>
  );
}
