-- CreateTable
CREATE TABLE "SongVersion" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "price" MONEY NOT NULL,

    CONSTRAINT "SongVersion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SongVersion_key_key" ON "SongVersion"("key");

-- CreateIndex
CREATE UNIQUE INDEX "SongVersion_label_key" ON "SongVersion"("label");
