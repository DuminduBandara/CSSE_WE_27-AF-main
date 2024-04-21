import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

const UpdateBlog = ({ show, onHide, selectedBlog }) => {
  const [formData, setFormData] = useState({
    blogName: selectedBlog.blogName,
    blogPlaces: selectedBlog.blogPlaces,
    bloggerName: selectedBlog.bloggerName,
    blogContent: selectedBlog.blogContent,
    username: localStorage.getItem('username'),
  });

  const { blogName, blogPlaces, bloggerName, blogContent } = formData;

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/blog/update/${selectedBlog._id}`,
        formData
      );
      window.location.reload();
      if (response.data.message) {
        setSuccessMessage(response.data.message);
        setTimeout(() => {
          setSuccessMessage('');
          onHide();
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setFormData({
      blogName: selectedBlog.blogName,
      blogPlaces: selectedBlog.blogPlaces,
      bloggerName: selectedBlog.bloggerName,
      blogContent: selectedBlog.blogContent,
    });
  }, [selectedBlog]);

  return (
    <div>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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

            <Row
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                alignItems: 'center',
                padding: '1rem',
              }}
            >
              <Col>
                <Button
                  className="accordian_button"
                  variant="secondary"
                  onClick={onHide}
                >
                  Cancel
                </Button>
              </Col>
              <Col>
                <Button
                  className="accordian_button"
                  variant="primary"
                  type="submit"
                >
                  Update Blog
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
      <div className="blog_message">
        {successMessage && <h5>{successMessage}</h5>}
      </div>
    </div>
  );
};

export default UpdateBlog;
