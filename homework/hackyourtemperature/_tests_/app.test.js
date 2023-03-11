import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("Given a correct cityName", () => {
  it("It should respond with a 200 status code", async () => {
    const response = await request.post("/weather").send({
      cityName: "London",
    });
    expect(response.statusCode).toBe(200);
  });

  it("It should specify json in the content type header", async () => {
    const response = await request.post("/weather").send({
      cityName: "London",
    });
    expect(response.header["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
  it("It should respond with temperature of the city", async () => {
    const response = await request.post("/weather").send({
      cityName: "London",
    });
    expect(typeof response.body["Temperature"]).toEqual("number");
  });
  it("It should respond with name of the city", async () => {
    const response = await request.post("/weather").send({
      cityName: "London",
    });
    expect(response.body["City"]).toEqual("London");
  });
});
// When things go wrong scenarios

describe("cityName is missing or wrong", () => {
  it("It should respond with a 400 status code if the cityName is wrong", async () => {
    const response = await request.post("/weather").send({
      cityName: "randomString",
    });
    expect(response.statusCode).toBe(400);
  });
  it("It should respond with a 400 status code if the cityName is missing", async () => {
    const response = await request.post("/weather").send({
      cityName: "",
    });
    expect(response.statusCode).toBe(400);
  });
});
