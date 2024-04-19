-- CreateTable
CREATE TABLE "todos" (
    "id" TEXT NOT NULL,
    "text" VARCHAR NOT NULL,
    "completedAt" TIMESTAMP,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);
