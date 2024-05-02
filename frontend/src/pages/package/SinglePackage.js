import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import jsPDF from 'jspdf';
import Logo from '../../images/LOGO.png';
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';

const SinglePackage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showPackage, setShowPackage] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [unlockedPackage, setUnlockedPackage] = useState(null);
  const [inquiryType, setInquiryType] = useState('');
  const [inquiryTitle, setInquiryTitle] = useState('');
  const [inquiryDescription, setInquiryDescription] = useState('');

  const userId = localStorage.getItem('userID');

  useEffect(() => {
    const checkPayment = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8080/package/check-fields',
          {
            userid: userId,
            id: id,
          }
        );
        const { data } = response.data;

        if (data && data.isPurchased) {
          setUnlockedPackage(data);
          setShowPackage(true);
        } else {
          setShowPackage(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkPayment();
  }, [id]);


  const handleFormButtonClick = () => {
    setShowForm(true);
  };

  const handleInquiryTypeChange = (event) => {
    setInquiryType(event.target.value);
  };

  const handleInquiryTitleChange = (event) => {
    setInquiryTitle(event.target.value);
  };

  const handleInquiryDescriptionChange = (event) => {
    setInquiryDescription(event.target.value);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const inquiryData = {
      userId: localStorage.getItem('username'),
      inquiryType: values.inquiryType,
      packageId: id,
      inquiryTitle: values.inquiryTitle,
      inquiryDescription: values.inquiryDescription,
    };
    try {
      const response = await axios.post(
        'http://localhost:8080/api/inquiry/inquiries',
        inquiryData
      );
      resetForm();
      setShowForm(false);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    } finally {
      setSubmitting(false);
    }
  };

  // Validation schema
  const validationSchema = yup.object().shape({
    inquiryType: yup.string().required('Please select an inquiry type'),
    inquiryTitle: yup.string().required('Please enter a title'),
    inquiryDescription: yup.string().required('Please enter a description'),
  });

  // Formik form
  const formik = useFormik({
    initialValues: {
      inquiryType: '',
      inquiryTitle: '',
      inquiryDescription: '',
    },
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });

  return (
    <div style={{ marginTop: '4rem' }}>
      {showPackage ? (
        <div className="package-details">
          <h4>Package: {unlockedPackage.package_no}</h4>
          <h5>Package Description:</h5>
          <p>{unlockedPackage.description}</p>
          <h5>Package Details:</h5>
          <p>{unlockedPackage.details}</p>
          <p>Price: ${unlockedPackage.price}</p>
          <button
            type="button"
            className="btn btn-dark"
            style={{ width: '250px' }}
            onClick={handleFormButtonClick}
          >
            Not Satisfied (Make Inquiry)
          </button>
          {showForm && (
            <form className="form-control my-4" onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label htmlFor="inquiryType">Inquiry Type:</label>
                <select
                  className="form-control"
                  id="inquiryType"
                  name="inquiryType"
                  value={formik.values.inquiryType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Select an inquiry type</option>
                  <option value="General">General Inquiry</option>
                  <option value="Technical">Technical Inquiry</option>
                  <option value="Billing">Billing Inquiry</option>
                </select>
                {formik.touched.inquiryType && formik.errors.inquiryType && (
                  <div className="error">{formik.errors.inquiryType}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="heading">Package Id:</label>
                <input
                  className="form-control"
                  type="text"
                  id="heading"
                  name="heading"
                  value={id}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="heading">Heading:</label>
                <input
                  className="form-control"
                  type="text"
                  id="heading"
                  name="inquiryTitle"
                  value={formik.values.inquiryTitle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.inquiryTitle && formik.errors.inquiryTitle && (
                  <div className="error">{formik.errors.inquiryTitle}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                  className="form-control"
                  id="message"
                  name="inquiryDescription"
                  value={formik.values.inquiryDescription}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.inquiryDescription &&
                  formik.errors.inquiryDescription && (
                    <div className="error">
                      {formik.errors.inquiryDescription}
                    </div>
                  )}
              </div>
              <button
                className="btn btn-dark"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Submit Inquiry
              </button>
            </form>
          )}
        </div>
      ) : (
        <div className="text-center">
          <h1 className="mt-5">
            You don't have access to view this package unless you purchase it
          </h1>
          <button
            type="submit"
            className="btn btn-dark mt-3"
            style={{ width: '200px' }}
            onClick={() => navigate(`/payment?pak=${id}`)}
          >
            Pay
          </button>
          {showForm && (
            <form className="mt-4">
              {/* Render your form components here */}
            </form>
          )}
        </div>
      )}
    </div>
  );
};
export default SinglePackage;
