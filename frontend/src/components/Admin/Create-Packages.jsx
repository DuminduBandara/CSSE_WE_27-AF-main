import React, { useState, useEffect } from 'react';
import Header from '../Payment/Header';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './admin-styles.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Packages = () => {
  //Create Packages
  const [formData, setFormData] = useState({
    requestid: '',
    userid: '',
    package_no: '',
    price: '',
    description: '',
    details: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      requestid: request._id,
      userid: request.userid,
      isPurchased: false
    };

    console.log(data);

    axios
      .post('http://localhost:8080/package/add', data)
      .then((res) => {
        console.log(res);
        Swal.fire('Done!', 'Package added successfully...', 'success').then(
          () => {
            window.location.href = '/travel-plan';
          }
        );
      })
      .catch((err) => {
        console.log(err);
        alert("Can't add a new package");
      });
  };

  //Get Request
  const [request, setRequest] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get('http://localhost:8080/requests/' + id)
      .then((response) => {
        setRequest(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      <div className="background-pic"></div>
      <div className="package-create-main-form">
        <Header title="PACKAGES" subtitle="Create new packages for requests" />
        <br />
        <div className="package-form">
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
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  fontFamily: 'Lucida Sans',
                }}
              >
                Request ID
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  
                  value={request._id}
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 100,
                    fontFamily: 'Lucida Sans',
                    width: 240,
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
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  fontFamily: 'Lucida Sans',
                }}
              >
                User ID
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  value={request.userid}
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 100,
                    fontFamily: 'Lucida Sans',
                    width: 240,
                  }}
                />
              </Col>
            </Form.Group>
          </Form>
          <div className="middle-form-div">
            This traveller has a desire to visit {request.districts}, situated
            in the {request.province} of Sri Lanka, and will be spending{' '}
            {request.days} days there. And from {request.date} the journey
            begins.
          </div>
          <br />
          <div>
            <Form onSubmit={handleSubmit}>
              <input type="hidden" name="requestid" value={request._id} />
              <input type="hidden" name="userId" value={request.userid} />
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalName"
              >
                <Form.Label
                  column
                  sm={2}
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    fontFamily: 'Lucida Sans',
                  }}
                >
                  Package Number
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="number"
                    onChange={(e) =>
                      setFormData({ ...formData, package_no: e.target.value })
                    }
                    placeholder="Package Number"
                    value={formData.package_no}
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: 100,
                      fontFamily: 'Lucida Sans',
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
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    fontFamily: 'Lucida Sans',
                  }}
                >
                  Package Price (Rs.)
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="number"
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    value={formData.price}
                    placeholder="Package price in Sri Lankan Rupees (Ex: 3500.00)"
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: 100,
                      fontFamily: 'Lucida Sans',
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
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    fontFamily: 'Lucida Sans',
                  }}
                >
                  Description
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Enter small description about the package"
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    value={formData.description}
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: 100,
                      fontFamily: 'Lucida Sans',
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
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    fontFamily: 'Lucida Sans',
                  }}
                >
                  Package Details
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    onChange={(e) =>
                      setFormData({ ...formData, details: e.target.value })
                    }
                    value={formData.details}
                    placeholder="Enter your package details"
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: 100,
                      fontFamily: 'Lucida Sans',
                      width: 972,
                    }}
                  />
                </Col>
              </Form.Group>

              <div className="package_form_button_div">
                <button
                  type="submit"
                  className="package_form_button"
                  style={{
                    fontSize: '1rem',
                    fontWeight: 100,
                    fontFamily: 'Lucida Sans',
                    marginRight: '1.3rem',
                  }}
                >
                  SUBMIT
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
