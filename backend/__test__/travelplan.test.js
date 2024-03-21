import supertest from "supertest";
import mongoose from "mongoose";
import app from "../server.js";

describe("Travel Plan Test Cases", () => {
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

  it("Packages Get", async () => {
    const response = await supertest(app).get("/api/package/");
    expect(response.body).toBeInstanceOf(Array);
    expect(response.status).toBe(200);
  });

  it("Packages Post", async () => {
    const response = await supertest(app).post("/api/package/add").send({
      requestid: "3213246545",
      userid: "3213246545",
      package_no: 1,
      price: 1000,
      description: "Test Package",
      details: "Test Package Details",
      isPurchased: false,
    });
    expect(response.status).toBe(200);
  });

  it("Payment Get", async () => {
    const response = await supertest(app).get("/api/payment");
    expect(response.body).toBeInstanceOf(Array);
    expect(response.status).toBe(200);
  });

//   it("Payment Post", async () => {
//     const response = await supertest(app).post("/api/payment/add").send({
//       userid: "3213246545",
//       cardName: "Test Card",
//       cardNumber: "1234567891234567",
//       expDate: "10/2025",
//       cvv: 123,
//     });
//     expect(response.status).toBe(200);
//   });
});
