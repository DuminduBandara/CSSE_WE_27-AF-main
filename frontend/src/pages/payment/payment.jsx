import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from 'react-router-dom';
import axios from "axios";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Footer from "../../components/Home/footer.jsx";
import PaymentDetails from "../../components/Payment/package-payment.jsx";
import "./payment.css";

const Payment = () => {
  //get packages
  const [packages, setPackages] = useState([]);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('pak');
  useEffect(() => {
    axios
      .get(`http://localhost:8080/package/package/${id}`)
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
              <PaymentDetails packageId={id}/>
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
                    Package Number : {packages.package_no}
                  </Card.Title>
                  <Card.Title
                    style={{
                      marginBottom: "1.5rem",
                      fontWeight: "600",
                      fontFamily: "monospace",
                    }}
                  >
                    Package Price : {packages.price}
                  </Card.Title>
                  <Card.Subtitle
                    style={{
                      marginBottom: "0.5rem",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      fontFamily: "monospace",
                    }}
                  >
                    Package Description:
                  </Card.Subtitle>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      fontFamily: "Lucida Sans",
                    }}
                  >
                    {packages.description}
                  </p>
                  <Card.Subtitle
                    style={{
                      marginBottom: "0.5rem",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      fontFamily: "monospace",
                    }}
                  >
                    Details of the Package:
                  </Card.Subtitle>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      fontFamily: "Lucida Sans",
                    }}
                  >
                    {packages.description}
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
