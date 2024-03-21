import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import "./styles.css";

export default function Donation({ points }) {
  console.log("Points" + points); 
  const [buttonDisabled, setButtonDisabled] = useState(true); // Button is disabled by default
  //toast
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);
  //model
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //get Donations
  const [donate, setDonate] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/donations/")
      .then((response) => {
        setDonate(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      console.log("Points" + points);
  }, []);

  //get user details
  const [userDetails, setUserDetails] = useState({});
  const uid = localStorage.getItem("username");

  const loadUserData = async () => {
    axios({
      method: "post",
      url: "http://localhost:8080/api/get-user-details",
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

  const username = localStorage.getItem("username");

  const [progress, setProgress] = useState(points); // User's current points
  
  const requiredPoints = donate.map((donate) => donate.donatePoints); // Required points to donate

  // Handle button click
  const handleClaimVoucher = (donate) => {
    if (progress >= donate.donatePoints) {
      console.log(`${donate.donatePoints} Donation Succesfull claimed!`);
    }
  };

  useEffect(() => {
    if (requiredPoints.some((points) => progress >= points)) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [progress, requiredPoints]);

 //decrease points
 const DecreasePoints = (donate) => {
  axios
    .post('http://localhost:8080/blog/decrease-points', {
      username: localStorage.getItem("username"),
      points: donate.donatePoints,
    })
    .catch((error) => {
      console.log(error);
    });
};

  //donate button - model
  const handleBothClicksOne = (donate) => {
    handleClaimVoucher(donate);
    handleShow();
  };

  //model - toast
  const handleBothClicksTwo = (donate) => {
    toggleShowA();
    handleClose();
    DecreasePoints(donate);
  };

  return (
    <div className="cards_styles color_div card_flex_loyalty">
      {donate.map((donate) => (
        <div key={donate._id}>
          <div className="card_flex">
            <Card style={{ width: "18rem", height: "20rem" }}>
              {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
              <Card.Body>
                <Card.Title>{donate.donateName}</Card.Title>
                <div className="card_overflow">
                  <Card.Text>{donate.donateDetails}</Card.Text>
                </div>
                <br />
                <ProgressBar
                  now={userDetails.userPoints}
                  max={donate.donatePoints}
                  label={`${userDetails.userPoints}`}
                  variant="success"
                />
                <Button
                  variant="primary"
                  style={{ margin: "1rem 0" }}
                  onClick={() => handleBothClicksOne(donate)}
                  disabled={buttonDisabled || progress < donate.donatePoints}
                  className="button_styles"
                >
                  Donate
                </Button>
              </Card.Body>
            </Card>
          </div>

          {/* Model */}
          <div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{donate.donateName}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {donate.donateDetails}
                <br />
                <br />
                <Card.Subtitle className="mb-2 text-muted">
                  Donation Amount: LKR {donate.donateAmount}
                </Card.Subtitle>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => handleBothClicksTwo(donate)}>
                  Doante
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          {/* Toast */}
          <div>
            <Col md={12} className="mb-2">
              <Toast
                show={showA}
                onClose={toggleShowA}
                className="redeem_toast"
              >
                <Toast.Header className="toast_header">
                  <strong className="me-auto">Notification</strong>
                </Toast.Header>
                <Toast.Body>
                  Thank You for your donation to the{donate.donateName}!
                </Toast.Body>
              </Toast>
            </Col>
          </div>
        </div>
      ))}
    </div>
  );
}
