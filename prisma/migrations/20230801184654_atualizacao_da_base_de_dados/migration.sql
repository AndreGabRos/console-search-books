/*
  Warnings:

  - You are about to drop the column `collectionName` on the `Books` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_BooksToCollection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_BooksToCollection_A_fkey" FOREIGN KEY ("A") REFERENCES "Books" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BooksToCollection_B_fkey" FOREIGN KEY ("B") REFERENCES "Collections" ("name") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Collections" (
    "name" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_Collections" ("name") SELECT "name" FROM "Collections";
DROP TABLE "Collections";
ALTER TABLE "new_Collections" RENAME TO "Collections";
CREATE UNIQUE INDEX "Collections_name_key" ON "Collections"("name");
CREATE TABLE "new_Books" (
    "id" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_Books" ("id") SELECT "id" FROM "Books";
DROP TABLE "Books";
ALTER TABLE "new_Books" RENAME TO "Books";
CREATE UNIQUE INDEX "Books_id_key" ON "Books"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_BooksToCollection_AB_unique" ON "_BooksToCollection"("A", "B");

-- CreateIndex
CREATE INDEX "_BooksToCollection_B_index" ON "_BooksToCollection"("B");
