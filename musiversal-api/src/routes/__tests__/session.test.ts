import request from "supertest";
import prisma from "../../client";
import app from "../../app";

describe("POST /api/session", () => {
  beforeEach(async () => {
    await prisma.bookingSession.deleteMany({
      where: {
        client: {
          contains: "john doe",
        },
      },
    });
  });

  describe("when submitted a session with client, musicianId, schedule, serviceId ", () => {
    test("should respond with a 201 status code", async () => {
      6;

      const musician = await prisma.musician.findFirst({
        include: {
          services: true,
        },
      });

      const response = await request(app).post("/api/session").send({
        client: "john doe",
        musicianId: musician?.id,
        schedule: "19:00",
        serviceId: musician?.services[0]?.id,
      });

      expect(response.statusCode).toBe(201);

      // Convert into Date
      let date: Date = new Date();
      date.setHours(19);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);

      const stringedDate: string = date.toString();

      expect(
        await prisma.bookingSession.findFirst({
          where: {
            client: "john doe",
            musicianId: 16,
            date: stringedDate,
          },
        })
      ).toEqual(response.body);
    });
  });

  describe("when submitted a session with missing values ", () => {
    test("should respond with a 400 status code", async () => {
      const musician = await prisma.musician.findFirst({
        include: {
          services: true,
        },
      });

      const response = await request(app).post("/api/session").send({
        client: "john doe",
        serviceId: musician?.services[0].id,
      });

      expect(response.statusCode).toBe(400);
    });

    describe("when submitted a session with schedule in a wrong schedule format", () => {
      test("should respond with a 400 status code", async () => {
        const response = await request(app).post("/api/session").send({
          client: "john doe",
          musicianId: 16,
          schedule: "019:00",
          serviceId: 31,
        });

        expect(response.statusCode).toBe(406);
      });
    });

    describe("when submitted a session with schedule in a wrong data type", () => {
      test("should respond with a 400 status code", async () => {
        const response = await request(app).post("/api/session").send({
          client: "john doe",
          musicianId: 16,
          schedule: 1900,
          serviceId: 31,
        });

        expect(response.statusCode).toBe(422);
      });
    });
  });
});

describe("GET /api/sessions", () => {
  beforeEach(async () => {
      await prisma.bookingSession.deleteMany();
  });

  afterAll(async () => {
    await prisma.bookingSession.deleteMany({
      where: {
        client: {
          contains: "john doe",
        },
      },
    });
    prisma.$disconnect
  });

  describe("when called the route", () => {
    describe("with no sessions in db", () => {
      test("it should respond with a 200 status code and an empty object", async () => {
        const response = await request(app).get("/api/sessions");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({});
      });
    });

    describe("with sessions in db", () => {
      test("it should respond with a 201 status code and an Array", async () => {
        const musician = await prisma.musician.findFirst({
          include: {
            services: true,
          },
        });

        await request(app).post("/api/session").send({
          client: "john doe",
          musicianId: musician?.id,
          schedule: "19:00",
          serviceId: musician?.services[0]?.id,
        });

        const getSessionsResponse = await request(app).get("/api/sessions");

        expect(getSessionsResponse.status).toBe(201);
        expect(typeof getSessionsResponse).toBe("object");
        expect(getSessionsResponse.body.length).toBeGreaterThan(0);
      });
    });
  });
});
