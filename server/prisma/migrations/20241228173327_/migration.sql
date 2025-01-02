/*
  Warnings:

  - You are about to drop the column `orderId` on the `batch` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_OrderBatches" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_OrderBatches_A_fkey" FOREIGN KEY ("A") REFERENCES "batch" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_OrderBatches_B_fkey" FOREIGN KEY ("B") REFERENCES "order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_batch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quantity" INTEGER NOT NULL,
    "manufactureDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expire_date" DATETIME
);
INSERT INTO "new_batch" ("expire_date", "id", "manufactureDate", "quantity") SELECT "expire_date", "id", "manufactureDate", "quantity" FROM "batch";
DROP TABLE "batch";
ALTER TABLE "new_batch" RENAME TO "batch";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_OrderBatches_AB_unique" ON "_OrderBatches"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderBatches_B_index" ON "_OrderBatches"("B");
