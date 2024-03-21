import { config } from "dotenv";
import supertest from "supertest";
import mongoose from "mongoose";
import app from "../server.js";

config();

describe("User Management System Test Cases", () => {
    beforeAll(async () => {
      await mongoose.connect("mongodb+srv://kaveenuththara:ebwQqH4Zx0QPHcLD@plannify.nprz6wl.mongodb.net/test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    });
  
    afterAll(async () => {
      await mongoose.connection.close();
    });

    it("Inquiry Get Method", async () => {
        const response = await supertest(app).get("/api/inquiry/inquiries");
        expect(response.body).toBeInstanceOf(Array);
        expect(response.status).toBe(200);
    });

    // it("Inquiry Post Method", async () => {
    //     const response = await supertest(app).post("/api/inquiry/add").send({
    //         userId: "60e5b0b9d6b0c00f2c0e1999",
    //         inquiryType: "Package",
    //         packageId: "60e5b0b9d6b0c00f2c0e1999",
    //         inquiryTitle: "test",
    //         inquiryDescription: "test",
    //         // addedDate: "2021-07-07T00:00:00.000+00:00",
    //     });

    //     expect(response.status).toBe(201);
    // });
});