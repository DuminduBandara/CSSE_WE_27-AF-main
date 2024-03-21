import React from "react";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";

const Feedback =()=> {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [feedbackmsg, setFeedbackmsg] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

   //add vouchers
  //  const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   subject: "",
  //   feedback: "",
  // });

  // const { name, email, subject, feedback } = formData;

  // const [successMessage, setSuccessMessage] = useState("");

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = {
        name,
        email,
        subject,
        feedbackmsg
       }
      // Send a POST request
      await axios.post("http://localhost:8080/feedback/add", response)
      .then(res => {
        console.log(response);
        alert("Feedback Added");
    })
    .catch(err => {
        console.log(err);
        alert("Can't add Feedback");
    });

      if (response.ok) {
        // Feedback submitted successfully
        console.log("Feedback submitted successfully");
        // Clear form fields
        setName("");
        setEmail("");
        setSubject("");
        setFeedbackmsg("");
      } else {
        // Handle error case
        console.log("Feedback submission failed");
      }
    } catch (error) {
      console.log("Error:", error);
    }

    // axios
    //   .post("http://localhost:8080/feedback/add", formData)
    //   .then((res) => {
    //     setSuccessMessage("Feedback added successfully!");
    //   })
    //   .catch((err) => console.log(err));

    // setFormData({
    //   name: "",
    //   email: "",
    //   subject: "",
    //   feedback: "",
    // });

  };

  //get feedback
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/feedback")
      .then((response) => {
        setFeedback(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //delete feedback
  const deleteFeedback = (id) => {
    const feedbackToDelete = feedback.filter((feedback) => id !== feedback._id);
    if (window.confirm("Are you sure you want to delete this voucher?")) {
    axios.delete(`http://localhost:8080/feedbacks/${id}`).then((res) => {
      const del = feedback.filter((feedback) => id !== feedback._id);
      setFeedback(del);
      setSuccessMessage(`${feedbackToDelete.feedbackName} Voucher deleted successfully!`);
    });
  }
  };

  return (
    <div>
      <div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
      <label class="form-label" for="form3Example3">Feedback Form</label>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control
         type="text"
         placeholder="your name"
         value={name}
        onChange={(e) => setName(e.target.value)}
          // onChange={handleChange}
         />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email</Form.Label>
        <Form.Control 
        type="email" 
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        // onChange={handleChange}
         />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Subject</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="subject" 
        value={subject}
         onChange={(e) => setSubject(e.target.value)}
        // onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Your Feedback</Form.Label>
        <Form.Control 
        as="textarea" 
        rows={4}
        value={feedbackmsg}
        onChange={(e) => setFeedbackmsg(e.target.value)}
        // onChange={handleChange}
         />
      </Form.Group>
      <Button type = "submit">Submit</Button>
    </Form>
    <div className="vd_successmessage">
          {successMessage && <h5>{successMessage}</h5>}
        </div>
    </div>
      </div>

      <div className="display_vouchers">
        <div>
          <h4 className="voucher_heading">
            <span className="voucher_text">Feedbacks</span>
          </h4>
        </div>
        <div className="card_flex">
          {feedback.map((feedback) => (
            <div key={feedback._id}>
              <Card style={{ width: "18rem", height: "20rem" }}>
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                  <Card.Title>{feedback.name}</Card.Title>
                  <div className="card_overflow">
                    <Card.Text>{feedback.feedbackmsg}
                    <p>
                    {feedback.email} <br/>
                    {feedback.subject}
                    </p>
                    
                    </Card.Text>
                  </div>
                  <div className="flex_voucherButton">
                    {/* <Button
                      variant="primary"
                      style={{ margin: "1rem 0" }}
                      className="update__button"
                    >
                      Update
                    </Button> */}
                    {/* <Button
                      variant="primary"
                      style={{ margin: "1rem 0" }}
                      onClick={() => deleteFeedback(feedback._id)}
                      className="delete__button delete_voucher"
                    >
                      Delete
                    </Button> */}
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Feedback;
