// const app = require("../server")
// const supertest = require ("supertest")
// const mongoose = ("mongoose")
import { config } from "dotenv";
import supertest from "supertest";
import mongoose from "mongoose";
import app from "../server.js";

config();

describe("Loyalty Management System Test Cases", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb+srv://kaveenuththara:ebwQqH4Zx0QPHcLD@plannify.nprz6wl.mongodb.net/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("Donations", () => {
    it("Donation Get Method", async () => {
      const response = await supertest(app).get("/donations");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });

    it("Donation Post Method", async () => {
      const response = await supertest(app)
        .post("/donations/add")
        .send({
          donateName: "Test Donation",
          donatePoints: 100,
          donateAmount: 1000,
          donateDetails: "Test Donation Details",
        });

      expect(response.status).toBe(200);
    });

    // it("Donation Update Method", async () => {
    //   const donationID = 1;

    //   const response = await supertest(app)
    //     .put(`/donations/update/${donationID}`)
    //     .send({
    //       donateName: "Test Donation Updated",
    //       donatePoints: 100,
    //       donateAmount: 1000,
    //       donateDetails: "Test Donation Details Updated",
    //     });

    //   expect(response.status).toBe(200);
    // });

    // it("Donation Delete Method", async () => {
    //   // const donationID = 1;

    //   // const response = await supertest(app).delete(`/donations/${donationID}`);
    //   // expect(response.status).toBe(200);

    //   try {
    //     const user = await User.findById(req.params.id);
    //     if (!user) {
    //       return res.status(404).json({ msg: "User not found" });
    //     }
    //     await user.deleteOne();

    //     res.json({ msg: "User removed" });
    //   }
    //   catch (err) {
    //     console.error(err.message);
    //     res.status(500).send("Server Error");
    //   }

    // });
  });

  describe("Vouchers", () => {
    it("Voucher Get Method", async () => {
      const response = await supertest(app).get("/vouchers");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });

    it("Voucher Post Method", async () => {
      const response = await supertest(app)
        .post("/vouchers/add")
        .send({
          voucherName: "Test Voucher",
          voucherPoints: 100,
          voucherCode: 1000,
          voucherDetails: "Test Voucher Details",
        });

      expect(response.status).toBe(200);
    });
  });
});
