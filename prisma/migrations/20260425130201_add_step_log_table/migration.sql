-- CreateTable
CREATE TABLE "step_log" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "step_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "step_log_userId_idx" ON "step_log"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "step_log_userId_date_key" ON "step_log"("userId", "date");

-- AddForeignKey
ALTER TABLE "step_log" ADD CONSTRAINT "step_log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
