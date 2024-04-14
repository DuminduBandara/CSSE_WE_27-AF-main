import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Inquiry = () => {
  const userId = localStorage.getItem('username');

  const [inquiryType, setInquiryType] = useState('');
  const [inquiryTitle, setInquiryTitle] = useState('');
  const [inquiryDescription, setInquiryDescription] = useState('');

  const handleInquiryType = (event) => {
    setInquiryType(event.target.value);
  };

  const handleInquiryTitle = (event) => {
    setInquiryTitle(event.target.value);
  };

  const handleInquiryDescription = (event) => {
    setInquiryDescription(event.target.value);
  };

  console.log(userId, inquiryType, inquiryDescription, inquiryTitle);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = {
        userId,
        inquiryType,
        inquiryTitle,
        inquiryDescription,
      };
      // Send a POST request
      await axios
        .post('http://localhost:8080/api/inquiry/inquiries', response)
        .then((res) => {
          console.log(response);
          // alert("Request Added");
          Swal.fire('Done!', 'Inquiry added successfully...', 'success').then(
            () => {
              window.location.href = '/';
            }
          );
        })
        .catch((err) => {
          console.log(err);
          alert("Can't send inquiry");
        });
    } catch (error) {
      console.log('Error:', error);
    }
  };
  return (
    <div class="package-booking p-4">
      <h3>Make an Inquiry</h3>
      <form onSubmit={handleSubmit}>
        <label for="email">User ID</label>
        <input type="email" id="userId" name="userId" value={userId} readOnly />
        <label for="inquiry-type">Inquiry Type</label>
        <select
          id="inquiry-type"
          name="inquiryType"
          value={inquiryType}
          onChange={handleInquiryType}
        >
          <option value="General inquiries">General inquiries</option>
          <option value="Booking inquiries">Booking inquiries</option>
          <option value="Itinerary inquiries">Itinerary inquiries</option>
          <option value="Visa and immigration inquiries">
            Visa and immigration inquiries
          </option>
          <option value="Customer service inquiries">
            Customer service inquiries
          </option>
          <option value="Group travel inquiries">Group travel inquiries</option>
          <option value="Business travel inquiries">
            Business travel inquiries
          </option>
          <option value="Accessible travel inquiries">
            Accessible travel inquiries
          </option>
        </select>

        <label for="email">Inquiry Title</label>
        <input
          type="text"
          id="inqTitle"
          name="inquiryTitle"
          value={inquiryTitle}
          onChange={handleInquiryTitle}
        />

        <label for="phone">Inquiry Description</label>
        <textarea name="inquiryDescription" value={inquiryDescription} onChange={handleInquiryDescription}></textarea>

        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Inquiry;
