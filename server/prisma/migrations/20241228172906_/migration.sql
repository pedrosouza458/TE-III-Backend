/*
  Warnings:

  - You are about to drop the column `status` on the `order` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "userId" TEXT,
    "distributorId" TEXT,
    "approvedByAdminId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "order_distributorId_fkey" FOREIGN KEY ("distributorId") REFERENCES "distributor" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "order_approvedByAdminId_fkey" FOREIGN KEY ("approvedByAdminId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_order" ("address", "approvedByAdminId", "createdAt", "distributorId", "id", "name", "updatedAt", "userId") SELECT "address", "approvedByAdminId", "createdAt", "distributorId", "id", "name", "updatedAt", "userId" FROM "order";
DROP TABLE "order";
ALTER TABLE "new_order" RENAME TO "order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
