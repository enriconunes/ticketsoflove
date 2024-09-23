-- CreateTable
CREATE TABLE "SURPRISE" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "emailFrom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "TICKETS" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idSurprise" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "revealday" DATETIME NOT NULL,
    CONSTRAINT "TICKETS_idSurprise_fkey" FOREIGN KEY ("idSurprise") REFERENCES "SURPRISE" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
