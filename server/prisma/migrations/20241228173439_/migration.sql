/*
  Warnings:

  - Added the required column `total` to the `batch` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_batch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quantity" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "manufactureDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expire_date" DATETIME
);
INSERT INTO "new_batch" ("expire_date", "id", "manufactureDate", "quantity") SELECT "expire_date", "id", "manufactureDate", "quantity" FROM "batch";
DROP TABLE "batch";
ALTER TABLE "new_batch" RENAME TO "batch";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
