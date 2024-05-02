import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Payment/Header';
import Box from '@mui/material/Box';
import * as formik from 'formik';
import * as yup from 'yup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './payment-style.css';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Payment = ({ packageId }) => {
  //get user details
  const [userDetails, setUserDetails] = useState({});
  const uid = localStorage.getItem('username');
  const navigate = useNavigate();

  const loadUserData = async () => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/get-user-details',
      data: {
        username: uid,
      },
    }).then((data) => {
      console.log(data.data);
      setUserDetails(data.data);
    });
  };

  useEffect(() => {
    loadUserData();
  }, []);

  //Create Packages
  const [formData, setFormData] = useState({
    userID: userDetails.id || '',
    // packageID: packages[0]._id || "",
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
  });

  const handleSubmit = (values) => {
    const data = {
      ...formData,
      userID: userDetails.id,
      // packageID: packages[0]._id,
      cardName: values.CardName,
      cardNumber: values.CardNumber,
      expDate: values.ExpiryDate,
      cvv: values.CVV,
    };

    axios
      .post('http://localhost:8080/payment/add', data)
      .then((res) => {
        console.log(res);
        Swal.fire('Done!', 'Payment done successfully...', 'success').then(
          () => {
            navigate(`/paymentSummary/${packageId}`);
            // window.location.href = `/paymentSummary/${packageId}`;
            
          }
        );
      })
      .catch((err) => {
        console.log(err);
        Swal.fire('Oops!', 'Payment Unsuccessful...', 'error');
      });

    axios
      .put(`http://localhost:8080/package/packages/${packageId}`)
      .then((res) => {
        console.log(res);
        Swal.fire('Done!', 'Payment done successfully...', 'success').then(
          () => {
            // window.location.href = `/paymentSummary/${packageId}`;
            navigate(`/paymentSummary/${packageId}`);
          }
        );
      })
      .catch((err) => {
        console.log(err);
        Swal.fire('Oops!', 'Payment Unsuccessful...', 'error');
      });
  };

  //Get Package
  const [packages, setPackages] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/package/' + id)
      .then((response) => {
        setPackages(response.data);
        console.log(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  // validation
  const { Formik } = formik;
  const schema = yup.object().shape({
    CardName: yup.string().required(),
    CardNumber: yup
      .string()
      .matches(/[0-9]/, 'Card number is not valid')
      .min(16, 'Card Number must be 16 characters')
      .max(16, 'Card Number must be 16 characters')
      .required(),
    ExpiryDate: yup.string().required(),
    CVV: yup
      .string()
      .min(3, 'CVV code must be 3 characters long')
      .max(3, 'CVV code must be 3 characters long')
      .matches(/[0-9]/, 'CVV code requires numbers')
      .required(),
  });

  return (
    <Box m="0.0rem 0.0rem">
      <Header
        title="PAYMENT"
        subtitle="Pay for your package here and experience the ultimate in convenience and comfort on your trip."
      />
      <br />
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          userID: userDetails.id,
          packageID: packages._id,
          CardName: '',
          CardNumber: '',
          ExpiryDate: '',
          CVV: '',
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationFormik01">
                <input type="hidden" name="userId" value={userDetails.id} />
                {/* <input type="text" name="packageId" value={packages[0]._id} /> */}
                <Form.Label className="formLabel">Name on card</Form.Label>
                <Form.Control
                  type="text"
                  name="CardName"
                  placeholder="Ex: A.B.C.Perera"
                  onChange={handleChange}
                  isInvalid={touched.CardName && !!errors.CardName}
                  value={values.CardName}
                  required
                  style={{
                    fontSize: '1rem',
                    fontFamily: 'Lucida Sans',
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.CardName}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationFormik02">
                <Form.Label className="fromLabel">Card Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex: 4215896300000000"
                  name="CardNumber"
                  onChange={handleChange}
                  isInvalid={touched.CardNumber && !!errors.CardNumber}
                  value={values.CardNumber}
                  required
                  style={{
                    fontSize: '1rem',
                    fontFamily: 'Lucida Sans',
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.CardNumber}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationFormik03">
                <Form.Label className="fromLabel">Expiry Date</Form.Label>
                <Form.Control
                  type="text"
                  name="ExpiryDate"
                  placeholder="MM/YYYY"
                  onChange={handleChange}
                  isInvalid={touched.ExpiryDate && !!errors.ExpiryDate}
                  value={values.ExpiryDate}
                  required
                  style={{
                    fontSize: '1rem',
                    fontFamily: 'Lucida Sans',
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.ExpiryDate}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationFormik04">
                <Form.Label className="fromLabel">CVV Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last three digits on signature strip"
                  name="CVV"
                  onChange={handleChange}
                  isInvalid={touched.CVV && !!errors.CVV}
                  value={values.CVV}
                  required
                  style={{
                    fontSize: '1rem',
                    fontFamily: 'Lucida Sans',
                  }}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.CVV}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <button
              type="submit"
              className="btn2 btn-light"
              style={{
                fontSize: '1rem',
                fontFamily: 'Lucida Sans',
              }}
            >
              PAY NOW
            </button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Payment;
