import React from 'react';
import { useEffect, useState } from 'react';
import Header from '../Payment/Header';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Vouchers = () => {
  // get vouchers
  const [voucher, setVoucher] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/vouchers')
      .then((response) => {
        setVoucher(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // update vouchers
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const handleClaimVoucher = (voucher) => {
    setSelectedVoucher(voucher);
    formik.setValues({
      voucherName: voucher.voucherName,
      voucherPoints: voucher.voucherPoints,
      voucherCode: voucher.voucherCode,
      voucherDetails: voucher.voucherDetails,
    });
  };

  // add vouchers
  const formik = useFormik({
    initialValues: {
      voucherName: '',
      voucherPoints: '',
      voucherCode: '',
      voucherDetails: '',
    },
    validationSchema: Yup.object().shape({
      voucherName: Yup.string().required('Voucher Name is required'),
      voucherPoints: Yup.string().required('Voucher Points is required'),
      voucherCode: Yup.string().required('Voucher Code is required'),
      voucherDetails: Yup.string().required('Voucher Details is required'),
    }),
    onSubmit: handleSubmit,
  });

  const [successMessage, setSuccessMessage] = useState('');

  function handleSubmit(values) {
    if (selectedVoucher) {
      // update voucher
      axios
        .put(`http://localhost:8080/vouchers/update/${selectedVoucher._id}`, values)
        .then((res) => {
          setSuccessMessage('Voucher updated successfully!');
          setSelectedVoucher(null);
        })
        .catch((err) => console.log(err));
    } else {
      // add new voucher
      axios
        .post('http://localhost:8080/vouchers/add', values)
        .then((res) => {
          setSuccessMessage('Voucher added successfully!');
        })
        .catch((err) => console.log(err));
    }

    formik.resetForm();
  }

  // delete vouchers
  const deleteVoucher = (id) => {
    const voucherToDelete = voucher.filter((voucher) => voucher._id === id);
    if (window.confirm('Are you sure you want to delete this voucher?')) {
      axios.delete(`http://localhost:8080/vouchers/${id}`).then((res) => {
        const del = voucher.filter((voucher) => id !== voucher._id);
        setVoucher(del);
        setSuccessMessage('Voucher deleted successfully!');
      });
    }
  };

  return (
    <div className="">
      <Header title="VOUCHERS" subtitle="Add new vouchers" />
      <br />
      <div>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
            <Form.Label
              column
              sm={2}
              style={{
                fontSize: '0.9rem',
                fontWeight: 500,
                fontFamily: 'Lucida Sans',
              }}
            >
              Voucher Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Voucher Name"
                name="voucherName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.voucherName}
                style={{
                  fontSize: '1rem',
                  fontWeight: 100,
                  fontFamily: 'Lucida Sans',
                }}
              />
              {formik.touched.voucherName && formik.errors.voucherName && (
                <div className="error">{formik.errors.voucherName}</div>
              )}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalPoints">
            <Form.Label
              column
              sm={2}
              style={{
                fontSize: '0.9rem',
                fontWeight: 500,
                fontFamily: 'Lucida Sans',
              }}
            >
              Points
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Voucher Points"
                name="voucherPoints"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.voucherPoints}
                style={{
                  fontSize: '1rem',
                  fontWeight: 100,
                  fontFamily: 'Lucida Sans',
                }}
              />
              {formik.touched.voucherPoints && formik.errors.voucherPoints && (
                <div className="error">{formik.errors.voucherPoints}</div>
              )}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalCode">
            <Form.Label
              column
              sm={2}
              style={{
                fontSize: '0.9rem',
                fontWeight: 500,
                fontFamily: 'Lucida Sans',
              }}
            >
              Voucher Code
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Voucher Code"
                name="voucherCode"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.voucherCode}
                style={{
                  fontSize: '1rem',
                  fontWeight: 100,
                  fontFamily: 'Lucida Sans',
                }}
              />
              {formik.touched.voucherCode && formik.errors.voucherCode && (
                <div className="error">{formik.errors.voucherCode}</div>
              )}
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
              Voucher Details
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter your voucher details"
                name="voucherDetails"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.voucherDetails}
                style={{
                  fontSize: '1rem',
                  fontWeight: 100,
                  fontFamily: 'Lucida Sans',
                }}
              />
              {formik.touched.voucherDetails && formik.errors.voucherDetails && (
                <div className="error">{formik.errors.voucherDetails}</div>
              )}
            </Col>
          </Form.Group>

          <div className="admin_form_button_div">
            <Button
              variant="primary"
              type="submit"
              className="admin_form_button"
              style={{
                fontSize: '1rem',
                fontWeight: 100,
                fontFamily: 'Lucida Sans',
              }}
            >
              Save
            </Button>
          </div>
        </Form>
      </div>
      <br />
      <div>
        <Card>
          <Card.Header>Voucher List</Card.Header>
          <Card.Body>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Voucher Name</th>
                  <th scope="col">Voucher Points</th>
                  <th scope="col">Voucher Code</th>
                  <th scope="col">Voucher Details</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {voucher.map((voucher) => (
                  <tr key={voucher._id}>
                    <td>{voucher.voucherName}</td>
                    <td>{voucher.voucherPoints}</td>
                    <td>{voucher.voucherCode}</td>
                    <td>{voucher.voucherDetails}</td>
                    <td>
                      <Button
                        variant="primary"
                        style={{ padding: '5px 20px' }}
                        onClick={() => handleClaimVoucher(voucher)}
                      >
                        Edit
                      </Button>{' '}
                      <Button
                        variant="danger"
                        onClick={() => deleteVoucher(voucher._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Vouchers;
