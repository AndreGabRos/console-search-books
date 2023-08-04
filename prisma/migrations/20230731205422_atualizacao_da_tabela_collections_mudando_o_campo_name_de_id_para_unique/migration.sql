/*
  Warnings:

  - The primary key for the `Collections` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Collections" (
    "name" TEXT NOT NULL
);
INSERT INTO "new_Collections" ("name") SELECT "name" FROM "Collections";
DROP TABLE "Collections";
ALTER TABLE "new_Collections" RENAME TO "Collections";
CREATE UNIQUE INDEX "Collections_name_key" ON "Collections"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
