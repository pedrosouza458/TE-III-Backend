-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_work" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "work_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_work" ("description", "id", "image", "title", "userId") SELECT "description", "id", "image", "title", "userId" FROM "work";
DROP TABLE "work";
ALTER TABLE "new_work" RENAME TO "work";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
