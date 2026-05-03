-- CreateTable
CREATE TABLE "sleep_log" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sleep_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "sleep_log_userId_idx" ON "sleep_log"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "sleep_log_userId_date_key" ON "sleep_log"("userId", "date");

-- AddForeignKey
ALTER TABLE "sleep_log" ADD CONSTRAINT "sleep_log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
