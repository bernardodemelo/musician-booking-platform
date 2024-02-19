/* Packages Import */
import { Router, Request, Response } from "express";
import { Prisma, BookingSession} from "@prisma/client";

import prisma from '../client';

const prismaService = prisma;

/* Type Import */
import { SessionData } from "../types/types";

/* Start Express Router for this Musician Route */
export const sessionRoutes = Router();

// POST "/api/session" --> post a booked session
sessionRoutes.post("/session", async (req: Request, res: Response) => {
  try {
    // ES6 Object Destructuring
    const { client, musicianId, schedule, serviceId }: SessionData = req.body;
    // If there are missing properties.
    if (!client || !musicianId || !schedule || !serviceId) {
      return res
        .status(400)
        .json("Bad Request: Missing properties to book a session");
    }
    // If schedule is not a string.
    if (typeof schedule !== "string") {
      return res
        .status(422)
        .json("Unprocessable Entity: Schedule must be a string data type");
    }
    // Split Hours TimeSlot to a New Array, so we can register a date.
    const [hours, minutes]: string[] = schedule.split(":");
    
    // If Hours and Minutes are not in the format we want.
    if (hours.length !== 2 || minutes.length !== 2) {
      return res
        .status(406)
        .json("Not Acceptable : Schedule is not in a HH:MM format");
    }

    // Convert into Date
    let date: Date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    date.setSeconds(0);
    date.setMilliseconds(0);

    // Convert date's data type into string, so it fits the SQLite3 Model
    const stringedDate: string = date.toString();

    // Create a New Session with Prisma ORM
    const newSession: BookingSession = await prismaService.bookingSession.create({
      data: {
        client,
        musician: { connect: { id: musicianId } },
        date: stringedDate,
        service: { connect: { id: serviceId } },
      },
    });

    // Send REST API 201 (created) Response
    res.status(201).json(newSession);
  } catch (error) {
    console.log(error);
    // Send REST API Response
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET "/api/sessions" --> get all booked sessions
sessionRoutes.get("/sessions", async (req: Request, res: Response) => {
  try {
    // Add our queries to match type validation.
    type SessionWithRecords = Prisma.BookingSessionGetPayload<{
      select: {
        date: true;
        client: true;
        musician: {
          select: { name: true };
        };
        service: {
          select: { name: true };
        };
      };
    }>;


    const today = new Date();
    const formattedToday = today.toDateString();

    const sessions: SessionWithRecords[] = await prismaService.bookingSession.findMany(
      {
        where: {
          date: {
            // Check if the booking session's date starts with today's date. 
            // We only want today' sessions.
            startsWith: formattedToday,
          },
        },
        select: {
          date: true,
          client: true,
          musician: {
            select: { name: true },
          },
          service: {
            select: { name: true },
          },
        },
      }
    );

    if (sessions.length === 0) {
      return res.status(200).json({});
    }
    
    // Then, get only hours and minutes timeslot from date, so we can present it in UI
    const sessionswithSchedule = sessions.map((session) => {
      let typedDate = new Date(session.date);
      const hours:string = typedDate.getHours().toString();
      const minutes:string = typedDate.getMinutes().toString().padStart(2, "0");

      const scheduleArr:string[] = [hours, minutes];
      const schedule:string = scheduleArr.join(":");

      return { ...session, hours: schedule };
    });

    // Send REST API Response
    res.status(201).json(sessionswithSchedule);
  } catch (error) {
    console.log(error);
    // Send REST API Response
    res.status(500).json({ message: "Internal Server Error" });
  }
});
