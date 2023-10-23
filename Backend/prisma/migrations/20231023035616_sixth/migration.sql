-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "date" DATETIME NOT NULL,
    "cantAsistentes" INTEGER NOT NULL DEFAULT 0,
    "nicknameUser" TEXT NOT NULL,
    "latitude" TEXT,
    "longitude" TEXT
);
INSERT INTO "new_Event" ("active", "cantAsistentes", "content", "createdAt", "date", "id", "latitude", "longitude", "nicknameUser", "title") SELECT "active", "cantAsistentes", "content", "createdAt", "date", "id", "latitude", "longitude", "nicknameUser", "title" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
