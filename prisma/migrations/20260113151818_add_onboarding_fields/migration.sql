-- AlterTable
ALTER TABLE "user" ADD COLUMN     "height" DOUBLE PRECISION,
ADD COLUMN     "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "weight" DOUBLE PRECISION;
