import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Footer from "../../components/Home/footer.jsx";
import PaymentDetails from "../../components/Payment/package-payment.jsx";
import "./payment.css";

const Payment = () => {
  //get packages
  const [packages, setPackages] = useState([]);
  const { packageId } = useParams(); 
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/package")
      .then((response) => {
        setPackages(response.data);
        console.log(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div>
        <div className="container-payment">
          {/* Payment Form */}
          <Row>
            <div className="payment-form">
              <PaymentDetails packageId={packageId}/>
            </div>
            <div className="package-card">
              <Card style={{ width: "35rem", height: "31rem" }}>
                <Card.Header
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    fontFamily: "monospace",
                  }}
                >
                  TRAVEL PACKAGE
                </Card.Header>
                <Card.Body>
                  <Card.Title
                    style={{
                      marginBottom: "1.5rem",
                      fontWeight: "600",
                      fontFamily: "monospace",
                    }}
                  >
                    Package Number : 01
                  </Card.Title>
                  <Card.Title
                    style={{
                      marginBottom: "1.5rem",
                      fontWeight: "600",
                      fontFamily: "monospace",
                    }}
                  >
                    Package Price : Rs.2500.00
                  </Card.Title>
                  <Card.Subtitle
                    style={{
                      marginBottom: "0.5rem",
                      fontSize: "1rem",
                      fontFamily: "monospace",
                    }}
                  >
                    Details of the Package
                  </Card.Subtitle>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      fontFamily: "Lucida Sans",
                    }}
                  >
                    We are thrilled to present you with a tailor-made travel
                    package that has been created exclusively for your request.
                    This five-day adventure will take you through the scenic and
                    historic provinces of Central Sri Lanka, specifically Kandy
                    and Matale. These districts are rich with cultural and
                    natural attractions that will leave you in awe. The journey
                    begins on May 15th, 2023, and will take you on a captivating
                    journey through the heart of Sri Lanka. You will visit
                    world-famous destinations like the Temple of the Tooth in
                    Kandy, a UNESCO World Heritage Site, Matale Alu Viharaya and
                    explore the scenic beauty of the Knuckles Mountain Range,
                    Sembuwaththa Lake, Hunnas Falls and Mandaram Nuwara. You
                    will also get to experience Sri Lanka's lush tea
                    plantations, spice gardens, and botanical gardens. This
                    travel package has been designed to provide you with an
                    unforgettable experience, giving you a glimpse into Sri
                    Lanka's vibrant culture and natural beauty. We hope you
                    enjoy your journey with us and create memories that will
                    last a lifetime.
                  </p>
                </Card.Body>
              </Card>
            </div>
          </Row>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
