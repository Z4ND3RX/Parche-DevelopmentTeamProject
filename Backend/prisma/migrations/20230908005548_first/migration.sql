-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "nicknameUser" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "EventCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idEvent" INTEGER NOT NULL,
    "idCategory" INTEGER NOT NULL,
    CONSTRAINT "EventCategory_idEvent_fkey" FOREIGN KEY ("idEvent") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EventCategory_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idEvent" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "Image_idEvent_fkey" FOREIGN KEY ("idEvent") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
