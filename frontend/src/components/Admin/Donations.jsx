import React, { useState, useEffect } from "react";
import Header from "../Payment/Header";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const Donations = () => {
  const [donate, setDonate] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/donations")
      .then((response) => {
        setDonate(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const validationSchema = Yup.object({
    donateName: Yup.string().required("Donation Name is required"),
    donatePoints: Yup.number()
      .typeError("Points must be a number")
      .integer("Points must be an integer")
      .positive("Points must be a positive number")
      .required("Points is required"),
    donateAmount: Yup.number()
      .typeError("Donation Amount must be a number")
      .positive("Donation Amount must be a positive number")
      .required("Donation Amount is required"),
    donateDetails: Yup.string().required("Donation Details is required"),
  });

  const formik = useFormik({
    initialValues: {
      donateName: "",
      donatePoints: "",
      donateAmount: "",
      donateDetails: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (selectedDonation) {
        // Update donation
        axios
          .put(`http://localhost:8080/donations/update/${selectedDonation._id}`, values)
          .then((res) => {
            setSuccessMessage(`Donation updated successfully!`);
            setSelectedDonation(null);
          })
          .catch((err) => console.log(err));
      } else {
        // Add donation
        axios
          .post("http://localhost:8080/donations/add", values)
          .then((res) => {
            setSuccessMessage("Donation added successfully!");
          })
          .catch((err) => console.log(err));
      }
      resetForm();
    },
  });

  const handleClaimDonation = (donate) => {
    setSelectedDonation(donate);
    formik.setValues({
      donateName: donate.donateName,
      donateAmount: donate.donateAmount,
      donatePoints: donate.donatePoints,
      donateDetails: donate.donateDetails,
    });
  };

  const deleteDonation = (id) => {
    const donationToDelete = donate.find((donation) => donation._id === id);
    if (window.confirm("Are you sure you want to delete this donation?")) {
      axios.delete(`http://localhost:8080/donations/${id}`).then((res) => {
        const del = donate.filter((donate) => id !== donate._id);
        setDonate(del);
        setSuccessMessage(`${donationToDelete.donateName} Donation deleted successfully!`);
      });
    }
  };

  return (
    <div>
      <Header title="DONATIONS" subtitle="Add Donations" />
      <div>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
            <Form.Label column sm={2}>
              Donation Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Donation Name"
                name="donateName"
                value={formik.values.donateName}
                onChange={formik.handleChange}
                isInvalid={formik.touched.donateName && formik.errors.donateName}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.donateName}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalPoints">
            <Form.Label column sm={2}>
              Points
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Donation Points"
                name="donatePoints"
                value={formik.values.donatePoints}
                onChange={formik.handleChange}
                isInvalid={formik.touched.donatePoints && formik.errors.donatePoints}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.donatePoints}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalAmount">
            <Form.Label column sm={2}>
              Donation Amount
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Donation Amount LKR:"
                name="donateAmount"
                value={formik.values.donateAmount}
                onChange={formik.handleChange}
                isInvalid={formik.touched.donateAmount && formik.errors.donateAmount}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.donateAmount}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Donation Details
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter your Donation details"
                name="donateDetails"
                value={formik.values.donateDetails}
                onChange={formik.handleChange}
                isInvalid={formik.touched.donateDetails && formik.errors.donateDetails}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.donateDetails}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <div className="admin_form_button_div">
            <Button
              variant="primary"
              type="submit"
              className="admin_form_button"
            >
              {selectedDonation ? "Update Donation" : "Add Donation"}
            </Button>
          </div>
        </Form>
        <div className="vd_successmessage">
          {successMessage && <h5>{successMessage}</h5>}
        </div>
      </div>
      <div className="display_donation">
        <div>
          <h4 className="donation_heading">
            <span className="donation_text">Donations</span>
          </h4>
        </div>
        <div className="card_flex">
          {donate.map((donate) => (
            <div key={donate._id}>
              <Card style={{ width: "18rem", height: "20rem" }}>
                <Card.Body>
                  <Card.Title>{donate.donateName}</Card.Title>
                  <div className="card_overflow">
                    <Card.Text>{donate.donateDetails}</Card.Text>
                  </div>
                  <br />
                  <Card.Subtitle className="mb-2 text-muted">
                    Donation Amount: LKR {donate.donateAmount}
                  </Card.Subtitle>
                  <div className="flex_voucherButton">
                    <Button
                      variant="primary"
                      style={{ margin: "1rem 0" }}
                      className="update__button"
                      onClick={() => handleClaimDonation(donate)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="primary"
                      style={{ margin: "1rem 0" }}
                      onClick={() => deleteDonation(donate._id)}
                      className="delete__button delete_voucher"
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Donations;
