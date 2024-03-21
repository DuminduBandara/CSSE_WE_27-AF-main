import Card from "react-bootstrap/Card";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

export default function BlogCard() {

  const [blog, setBlog] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/blog")
      .then(response => {
        setBlog(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      {blog.map((blog) => (
        <div key={blog._id} style={{marginBottom:"2rem"}}>
      <Card >
        
        <Card.Header as="h5">{blog.blogName}</Card.Header>
        <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">{blog.blogPlaces}</Card.Subtitle>
          <Card.Text>
            {blog.blogContent}
          </Card.Text>
          <footer className="blockquote-footer">
            by {blog.bloggerName} 
          </footer>
        </Card.Body>
        
        
      </Card>
      </div>
      ))}
    </div>
  );
}
