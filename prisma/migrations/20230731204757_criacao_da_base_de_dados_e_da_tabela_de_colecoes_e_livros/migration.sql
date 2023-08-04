-- CreateTable
CREATE TABLE "Collections" (
    "name" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "Books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "collectionName" TEXT NOT NULL,
    CONSTRAINT "Books_collectionName_fkey" FOREIGN KEY ("collectionName") REFERENCES "Collections" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
