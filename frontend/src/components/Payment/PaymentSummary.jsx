import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import Logo from '../../images/LOGO.png';
import autoTable from 'jspdf-autotable';

export default function PaymentSummary() {
  const { packageId } = useParams();
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/package/package/${packageId}`)
      .then((response) => {
        setPackages(response.data);
        console.log(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, [packageId]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/${packages.userid}`)
      .then((response) => {
        setUsers(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, [packages]);

  const [currentTime, setCurrentTime] = useState(new Date());

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.addImage(Logo, 'PNG', 85, 10, 50, 20);

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(`Payment Receipt`, 85, 50);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Payment Invoice - 102-2024`, 83, 60);

    doc.setFont('times', 'normal');
    doc.setFontSize(14);
    doc.text(`Data & Time:`, 10, 80);
    doc.text(currentTime.toLocaleString(), 150, 80);

    doc.text(`Customer Email Address:`, 10, 95);
    doc.text(users.email, 150, 95);

    doc.text(`Package No: `, 10, 110);
    doc.text(`${packages.package_no}`, 150, 110);

    doc.text(`Amount: `, 10, 125);
    doc.text(`${packages.price.toFixed(2)}`, 150, 125);

    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.text(`Total Payment: `, 10, 140);
    doc.text(`${packages.price.toFixed(2)}`, 150, 140);

    doc.setFont('times', 'normal');
    doc.setFontSize(14);
    doc.text(`100/5, Colombo, Sri Lanka`, 10, 280);
    doc.text(`+(94) 0112 345 679`, 90, 280);
    doc.text(`info@gmail.com`, 155, 280);

    doc.save('package_report.pdf');
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        gap: '2rem',
      }}
    >
      <button
        type="button"
        className="btn btn-dark"
        style={{
          width: '150px',
          position: 'absolute',
          top: '2rem',
          left: '2rem',
        }}
        onClick={() => navigate('/profile')}
      >
        Back to Profile
      </button>

      <Typography variant="h4" sx={{ marginTop: '2rem' }}>
        Payment Summary
      </Typography>

      <Box sx={{ position: 'relative' }}>
        <Box sx={{ textAlign: 'right', marginBottom: '2rem' }}>
          <button
            type="button"
            className="btn btn-dark"
            style={{
              width: '200px',
              position: 'absolute',
              top: '-1rem',
              right: '0',
            }}
            onClick={generatePDF} // Call the PDF generation function
          >
            Download Receipt
          </button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ width: 500 }} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell align="left">Date & Time:</TableCell>
                <TableCell align="left" sx={{ fontSize: '1.2rem' }}>
                  {currentTime.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Package No:</TableCell>
                <TableCell align="left" sx={{ fontSize: '1.2rem' }}>
                  {packages.package_no}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">User Email Address:</TableCell>
                <TableCell align="left" sx={{ fontSize: '1.2rem' }}>
                  {users.email}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Description:</TableCell>
                <TableCell align="left" sx={{ fontSize: '1.2rem' }}>
                  {packages.description}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Amount:</TableCell>
                <TableCell align="left" sx={{ fontSize: '1.2rem' }}>
                  LKR.{packages.price && packages.price.toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Total Payment</TableCell>
                <TableCell align="right" sx={{ fontSize: '1.4rem' }}>
                  LKR.{packages.price && packages.price.toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
