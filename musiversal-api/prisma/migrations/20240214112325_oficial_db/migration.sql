/*
  Warnings:

  - You are about to drop the column `service` on the `BookingSession` table. All the data in the column will be lost.
  - Added the required column `serviceId` to the `BookingSession` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BookingSession" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "client" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "musicianId" INTEGER NOT NULL,
    CONSTRAINT "BookingSession_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BookingSession_musicianId_fkey" FOREIGN KEY ("musicianId") REFERENCES "Musician" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BookingSession" ("client", "date", "id", "musicianId") SELECT "client", "date", "id", "musicianId" FROM "BookingSession";
DROP TABLE "BookingSession";
ALTER TABLE "new_BookingSession" RENAME TO "BookingSession";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
