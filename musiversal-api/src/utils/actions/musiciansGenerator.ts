/* Packages Import */
import { PrismaClient, Musician } from "@prisma/client";

/* Type Import */
import { MusicianData } from "../../types/types";

/* Start Prisma Client */
const prisma = new PrismaClient({
  errorFormat: "pretty",
  log: [
    { level: "warn", emit: "event" },
    { level: "info", emit: "event" },
    { level: "error", emit: "event" },
  ],
});

export const checkAndGenerateMusicians = async (data: MusicianData[]) => {
  // Need Unit Testing
  const existingMusicians: Musician[] | [{}] = await prisma.musician.findMany();

  // If there isn't at least one musician in Db
  if (existingMusicians.length < 1) {
    // Iterate over date
    for (let i = 0; i < data.length; i++) {
      // Set iterated data into variable
      const musician: MusicianData= data[i];

      // ES6 Object Destructuring
      const { name, avatar, enabled, services, availability } = musician;

      // Create stringified timeSlots, so I can store those into sqlite.
      // Of course, I could create just a timeSlot Model for this purpose, and a relation thereafter. But wouldn't this be increbibly complex in its wrong term?
      const stringifiedAvailabiliy = availability.map((schedule) => {
        return { ...schedule, timeSlots: JSON.stringify(schedule.timeSlots) };
      });

      // Create Musician with availability and services.
      await prisma.musician.create({
        data: {
          name,
          avatar,
          enabled,
          availability: {
            create: stringifiedAvailabiliy,
          },
          services: {
            create: services,
          },
        },
      });
    }

    // console.log status
    console.log("Musicians Generated");
  } else {
    // console.log status
    console.log("Musicians already on your Db");
  }
};
