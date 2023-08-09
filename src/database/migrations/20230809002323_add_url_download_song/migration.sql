-- CreateTable
CREATE TABLE "URLDownloadSong" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "songVersionId" TEXT,
    "songId" TEXT,

    CONSTRAINT "URLDownloadSong_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "URLDownloadSong_url_key" ON "URLDownloadSong"("url");

-- AddForeignKey
ALTER TABLE "URLDownloadSong" ADD CONSTRAINT "URLDownloadSong_songVersionId_fkey" FOREIGN KEY ("songVersionId") REFERENCES "SongVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "URLDownloadSong" ADD CONSTRAINT "URLDownloadSong_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE SET NULL ON UPDATE CASCADE;
