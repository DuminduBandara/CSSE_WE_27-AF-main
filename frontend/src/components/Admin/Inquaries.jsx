import React from 'react';
import { Box, Button } from "@mui/material";
import Header from "../Payment/Header";
import axios from "axios";
import { Component } from "react";

const Inquaries = (props) => (
  <tr>
    <td> {props.Inquaries._id}</td>
    <td> {props.Inquaries.userId}</td>
    <td> {props.Inquaries.inquiryType}</td>
    <td> {props.Inquaries.inquiryTitle}</td>
    <td> {props.Inquaries.inquiryDescription}</td>
    <td>
      <a
        href=" "
        onClick={() => {
          props.deleteInquiry(props.exercise._id);
        }}
      >
        REMOVE
      </a>
    </td>
  </tr>
);

export default class Inquiries_Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Inquaries: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/api/inquiry/inquiries")
      .then((response) => {
        this.setState({ Inquaries: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getPosts() {
    axios
      .get("http://localhost:8080/api/inquiry/inquiries")
      .then((response) => {
        this.setState({ Inquaries: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteInquiry(id) {
    if (window.confirm("Are you sure?")) {
      axios
        .delete("http://localhost:8080/api/inquiry/inquiries/" + id)
        .then((response) => {
          console.log(response.data);
        });

      this.setState({
        Inquaries: this.state.Inquaries.filter((el) => el._id !== id),
      });
    }
  }

  InquariesList() {
    return this.state.Inquaries.map((currentInquaries) => {
      return (
        <Inquaries
          Inquaries={currentInquaries}
          deleteInquiry={this.deleteInquiry}
          key={currentInquaries._id}
        />
      );
    });
  }

  render() {
    return (
      <Box m="0.0rem 0.0rem">
        <Header title="INQUIRIES" subtitle="Custom Package Inquaries" />
        <div className="container">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Inquire ID</th>
                <th>User ID</th>
                <th>Inquiry Type</th>
                <th>Title</th>
                <th>Description</th>
                <th className="tbody">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.Inquaries.map((props) => (
                <tr>
                  <td>{props._id}</td>
                  <td>{props.userId}</td>
                  <td>{props.inquiryType}</td>
                  <td>{props.inquiryTitle}</td>
                  <td>{props.inquiryDescription}</td>
                  <td className="tbody">
                    <a
                      href=""
                      onClick={() => {
                        this.deleteInquiry(props._id);
                      }}
                    >
                      <Button
                        variant="contained"
                        style={{
                          fontSize: "0.9rem",
                          fontWeight: 500,
                          fontFamily: "Lucida Sans",
                        }}
                      >
                        REMOVE
                      </Button>{" "}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>
    );
  }
}