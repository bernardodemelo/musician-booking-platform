import request from "supertest";
import app from "../../app"; 

describe("GET /api/musicians", () => {
  describe("when called the route", () => {
    test("it should a return a list of musicians", async () => {
      const response = await request(app).get("/api/musicians");
      expect(response.body.length >= 1).toBe(true);
    });

    test("it should include availability property in the musicians array", async () => {
      const response = await request(app).get("/api/musicians");
      expect(response.body[0]).toHaveProperty("availability");
      expect(response.body[response.body.length - 1]).toHaveProperty(
        "availability"
      );
    });

    test("it should include services in the musicians array", async () => {
      const response = await request(app).get("/api/musicians");
      expect(response.body[0]).toHaveProperty("services");
      expect(response.body[response.body.length - 1]).toHaveProperty(
        "services"
      );
    });

    test("it should return status code 201", async () => {
      const response = await request(app).get("/api/musicians");
      expect(response.status).toBe(201);
    });
  });
});
