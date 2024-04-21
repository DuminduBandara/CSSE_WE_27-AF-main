import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UpdateBlog from './UpdateBlog';
import DeleteBlog from './DeleteBlog';

export default function BlogCard() {
  const [blog, setBlog] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState({});
  const [blogId, setBlogId] = useState('');
  const [deleteShow, setDeleteShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setDeleteShow(false);
    setSelectedBlog({});
  };
  const handleShow = (selectedBlog) => {
    setShow(true);
    setSelectedBlog(selectedBlog);
  };

  const handleDeleteShow = (blogId) => {
    setDeleteShow(true);
    setBlogId(blogId);
  };

  useEffect(() => {
    axios
      .get('http://localhost:8080/blog')
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {blog.map((blog) => (
        <div key={blog._id} style={{ marginBottom: '2rem' }}>
          <Card>
            <Card.Header as="h5">{blog.blogName}</Card.Header>
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted">
                {blog.blogPlaces}
              </Card.Subtitle>
              <Card.Text>{blog.blogContent}</Card.Text>
              <footer className="blockquote-footer">
                by {blog.bloggerName}
              </footer>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                  gap: '1rem',
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <Button variant="danger" onClick={() => handleDeleteShow(blog._id)}>
                  Delete Blog
                </Button>
                <Button variant="primary" onClick={() => handleShow(blog)}>
                  Update Blog
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
      <UpdateBlog
        show={show}
        onHide={handleClose}
        selectedBlog={selectedBlog}
      />
      <DeleteBlog
        show={deleteShow}
        onHide={handleClose}
        blogId={blogId}
      />
    </div>
  );
}
