-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_distributor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "stockId" TEXT,
    "selledProducts" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "distributor_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "stock" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_distributor" ("address", "createdAt", "id", "name", "status", "stockId", "updatedAt") SELECT "address", "createdAt", "id", "name", "status", "stockId", "updatedAt" FROM "distributor";
DROP TABLE "distributor";
ALTER TABLE "new_distributor" RENAME TO "distributor";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
