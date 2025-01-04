/*
  Warnings:

  - You are about to drop the column `expire_date` on the `batch` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_batch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quantity" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "manufactureDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expireDate" DATETIME
);
INSERT INTO "new_batch" ("id", "manufactureDate", "quantity", "total") SELECT "id", "manufactureDate", "quantity", "total" FROM "batch";
DROP TABLE "batch";
ALTER TABLE "new_batch" RENAME TO "batch";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
