import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Form from '../../components/Blogs/form';
import Banner from '../../components/Blogs/banner';
import BlogCard from '../../components/Blogs/BlogCard';
import Footer from '../../components/Home/footer';
import './styles.css';

export default function blogmain() {
  return (
    <div>
      <div className="banner">
        <Banner />
      </div>
      <div className="blog_container">
        <div className="color_blog">
          {localStorage.getItem('isLogged') && (
            <div className="accordiandiv">
              <Accordion className="accordian_div">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    Click here to post your BLOG
                  </Accordion.Header>
                  <Accordion.Body>
                    <Form />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>{' '}
            </div>
          )}
          <div style={{paddingTop: '2rem'}}>
            <h3 className="blog_heading">
              <span className="blog_text">Blogs Posted by Other Tourists</span>
            </h3>
          </div>
          <div className="blog_cards">
            <BlogCard />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
