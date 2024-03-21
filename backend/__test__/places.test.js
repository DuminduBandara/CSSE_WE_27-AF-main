// const app = require("../server")
// const supertest = require ("supertest")
// const mongoose = ("mongoose")

import supertest from "supertest";
import mongoose from "mongoose";
import app from "../server.js";

describe("Places Management System Test Cases", () => {
  beforeAll(async () => {
    await mongoose.connect(
      "mongodb+srv://kaveenuththara:ebwQqH4Zx0QPHcLD@plannify.nprz6wl.mongodb.net/test",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("Feedback get", async () => {
    const response = await supertest(app).get("/feedback");
    expect(response.body).toBeInstanceOf(Array);
    expect(response.status).toBe(200);
  });

  it("Feedback post", async () => {
    const response = await supertest(app).post("/feedback/add").send({
      name: "Jhon",
      email: "john@gmail.com",
      subject: "test",
      feedbackmsg: "test",
    });

    expect(response.status).toBe(200);
  });

  it("Request get", async () => {
    const response = await supertest(app).get("/requests");
    expect(response.body).toBeInstanceOf(Array);
    expect(response.status).toBe(200);
  });

  test("Request post", async () => {
    const response = await supertest(app)
      .post("/requests/add")
      .send({
        userid: "60e5b0b9d6b0c00f2c0e1999",
        province: "Western Province",
        districts: ["Colombo", "Gampaha", "Kalutara"],
        date: "2021-07-07T00:00:00.000+00:00",
        days: 3,
      });

    //Assertion 1: Check the response body
    // expect(response.body).toBeInstanceOf(Object);
    //Assertion 2: Check the response status
    expect(response.status).toBe(200);
  });
});
