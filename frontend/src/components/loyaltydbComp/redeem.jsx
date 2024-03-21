import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import "./styles.css";

export default function Redeem({ points }) {
  const [buttonDisabled, setButtonDisabled] = useState(true); // Button is disabled by default
  //toast
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);
  //model
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  
  //get vouchers
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/vouchers")
      .then((response) => {
        setVouchers(response.data);
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

  const requiredPoints = vouchers.map((voucher) => voucher.voucherPoints); // Required points to claim the vouchers

  // Handle button click
  const handleClaimVoucher = (voucher) => {
    if (progress >= voucher.voucherPoints) {
      console.log(`Voucher ${voucher.voucherName} claimed!`);
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
  const DecreasePoints = (voucher) => {
    axios
      .post('http://localhost:8080/blog/decrease-points', {
        username: localStorage.getItem("username"),
        points: voucher.voucherPoints,
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //voucher button - model
  const handleBothClicksOne = (voucher) => {
    handleClaimVoucher(voucher);
    handleShow();
  };

  //model - toast
  const handleBothClicksTwo = (voucher) => {
    toggleShowA();
    handleClose();
    DecreasePoints(voucher);
  };

  return (
    <div className="cards_styles color_div card_flex_loyalty">
      {vouchers.map((voucher) => (
        <div key={voucher._id}>
          <div className="card_flex">
            <Card style={{ width: "18rem", height: "20rem" }}>
              {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
              <Card.Body>
                <Card.Title>{voucher.voucherName}</Card.Title>
                <div className="card_overflow">
                  <Card.Text>{voucher.voucherDetails}</Card.Text>
                </div>
                <br />
                <ProgressBar
                  now={userDetails.userPoints}
                  max={voucher.voucherPoints}
                  label={`${userDetails.userPoints}`}
                  variant="success"
                />
                <Button
                  variant="primary"
                  style={{ margin: "1rem 0" }}
                  onClick={() => handleBothClicksOne(voucher)}
                  disabled={buttonDisabled || progress < voucher.voucherPoints}
                  className="button_styles"
                >
                  Claim Voucher
                </Button>
              </Card.Body>
            </Card>
          </div>

          {/* Model */}
          <div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{voucher.voucherName}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {voucher.voucherDetails}
                <br />
                <br />
                <Card.Subtitle className="mb-2 text-muted">
                  Voucher Code: {voucher.voucherCode}
                </Card.Subtitle>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleBothClicksTwo(voucher)}
                >
                  Redeem
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
                  Woohoo, you claimed {voucher.voucherName} voucher!
                </Toast.Body>
              </Toast>
            </Col>
          </div>
        </div>
      ))}
    </div>
  );
}
