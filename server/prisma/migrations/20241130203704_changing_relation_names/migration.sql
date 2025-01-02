/*
  Warnings:

  - You are about to drop the `_UserWorks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_UserWorks";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_user_works" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_user_works_A_fkey" FOREIGN KEY ("A") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_user_works_B_fkey" FOREIGN KEY ("B") REFERENCES "work" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_user_works_AB_unique" ON "_user_works"("A", "B");

-- CreateIndex
CREATE INDEX "_user_works_B_index" ON "_user_works"("B");
