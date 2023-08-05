-- CreateTable
CREATE TABLE "SongRequest" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SongRequest_pkey" PRIMARY KEY ("id")
);
