/* Packages Import */
import { Router, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import prisma from "../client";

/* Start Express Router for this Musician Route */
export const musicianRoutes = Router();

// GET "/api/musicians" --> get a list of musicians
musicianRoutes.get("/musicians", async (req: Request, res: Response) => {
  try {
    // Need Unit Testing

    // Prisma by itself offers the type Musician. Here we add our queries to match type validation.
    type MusicianWithRecords = Prisma.MusicianGetPayload<{
      include: {
        availability: { select: { timeSlots: true } };
        services: { select: { name: true } };
      };
    }>;

    // Get Musicians. Include Related Records.
    const musicians: MusicianWithRecords[] = await prisma.musician.findMany({
      where: {
        enabled: true,
      },
      include: {
        availability: {
          select: { timeSlots: true },
          where: {
            dayOfWeek: new Date().getDay(),
          },
        },
        services: {
          select: { id: true, name: true },
        },
        bookedSessions: {
          select: { date: true },
        },
      },
    });

    const musiciansforToday = musicians.map((musician) => {
      // If there's no availability 
      if(!musician.availability || musician.availability.length === 0){
        throw new Error(
          "Musician doesn't have availability property or it isn't filled with values. Please check Sqlite DB."
        );
      }
      // If there's more than one availability to a day of a week
      else if (musician.availability.length > 1) {
        throw new Error(
          "Musician has more than one availability array. Please check Sqlite DB."
        );
      } else if (musician.availability && musician.availability.length === 1) {
        // Convert Stringified Array into a Proper Array JS Data Type
        let weekDayAvailability = JSON.parse(
          musician.availability[0].timeSlots
        );

        // Sort the availability time slots array
        weekDayAvailability.sort((timeA: string, timeB: string) => {
          // Split the time slot into an array of [hours, minutes]
          const [hoursA, minutesA] = timeA.split(":");
          const [hoursB, minutesB] = timeB.split(":");

          if (hoursA !== hoursB) {
            // Sort by the hours, if they have different hours
            return parseInt(hoursA) - parseInt(hoursB);
          } else {
            // Else, Sort by the minutes, if they have different minutes
            return parseInt(minutesA) - parseInt(minutesB);
          }
        });

        // Returned sorted timeslots availability, and as an array.
        return { ...musician, availability: weekDayAvailability };
      } else {
        return musician;
      }
    });

    // Send REST API Response
    res.status(201).json(musiciansforToday);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
