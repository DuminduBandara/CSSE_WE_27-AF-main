import React from 'react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Inquaries from '../../components/Admin/Inquaries.jsx';
import Packages from '../../components/Admin/Packages.jsx';
import Requests from '../../components/Admin/Requests.jsx';
import Vouchers from '../../components/Admin/Vouchers.jsx';
import Places from '../../components/Admin/Places.jsx';
import Donations from '../../components/Admin/Donations.jsx';
import Footer from '../../components/Home/footer.jsx';
import './travel-style.css';
import { Navigate } from 'react-router-dom';

export default function TravelPlan() {

  return (
    <div>
      <div className="background">
        <div className="heading">
          <h2>Hello Admin</h2>
          <p>Welcome to your Dashboard</p>
        </div>
      </div>
      <div className="side-nav-container">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="tab-board d-flex">
            <Col style={{marginRight: '6rem'}}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item className="nav-item">
                  <Nav.Link
                    className="nav-link"
                    eventKey="first"
                    style={{
                      fontWeight: '100',
                      fontFamily: 'Lucida Sans',
                      fontSize: '15px',
                    }}
                  >
                    Requests
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className="nav-link"
                    eventKey="second"
                    style={{
                      fontWeight: '100',
                      fontFamily: 'Lucida Sans',
                      fontSize: '15px',
                    }}
                  >
                    Packages
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className="nav-link"
                    eventKey="third"
                    style={{
                      fontWeight: '100',
                      fontFamily: 'Lucida Sans',
                      fontSize: '15px',
                    }}
                  >
                    Inquiries
                  </Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                  <Nav.Link
                    className="nav-link"
                    eventKey="fourth"
                    style={{
                      fontWeight: "100",
                      fontFamily: "Lucida Sans",
                      fontSize: "15px",
                    }}
                  >
                    Vouchers
                  </Nav.Link>
                </Nav.Item> */}
                <Nav.Item>
                  <Nav.Link
                    className="nav-link"
                    eventKey="fifth"
                    style={{
                      fontWeight: '100',
                      fontFamily: 'Lucida Sans',
                      fontSize: '15px',
                    }}
                  >
                    Places
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  {/* <Nav.Link
                    className="nav-link"
                    eventKey="sixth"
                    style={{
                      fontWeight: "100",
                      fontFamily: "Lucida Sans",
                      fontSize: "15px",
                    }}
                  >
                    Donations
                  </Nav.Link> */}
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content className="tab-content">
                <Tab.Pane
                  eventKey="first"
                  style={{
                    fontWeight: '100',
                    fontFamily: 'Lucida Sans',
                    fontSize: '15px',
                  }}
                >
                  <Requests />
                </Tab.Pane>
                <Tab.Pane
                  eventKey="second"
                  style={{
                    fontWeight: '100',
                    fontFamily: 'Lucida Sans',
                    fontSize: '15px',
                  }}
                >
                  <Packages />
                </Tab.Pane>
                <Tab.Pane
                  eventKey="third"
                  style={{
                    fontWeight: '100',
                    fontFamily: 'Lucida Sans',
                    fontSize: '15px',
                  }}
                >
                  <Inquaries />
                </Tab.Pane>
                <Tab.Pane
                  eventKey="fourth"
                  style={{
                    fontWeight: '100',
                    fontFamily: 'Lucida Sans',
                    fontSize: '15px',
                  }}
                >
                  <Vouchers />
                </Tab.Pane>
                <Tab.Pane
                  eventKey="fifth"
                  style={{
                    fontWeight: '100',
                    fontFamily: 'Lucida Sans',
                    fontSize: '15px',
                  }}
                >
                  <Places />
                </Tab.Pane>
                <Tab.Pane
                  eventKey="sixth"
                  style={{
                    fontWeight: '100',
                    fontFamily: 'Lucida Sans',
                    fontSize: '15px',
                  }}
                >
                  <Donations />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
      <Footer />
    </div>
  );
}
