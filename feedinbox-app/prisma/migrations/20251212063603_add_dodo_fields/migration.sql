/*
  Warnings:

  - A unique constraint covering the columns `[dodoCustomerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[dodoSubscriptionId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dodoCustomerId" TEXT,
ADD COLUMN     "dodoPlanCadence" TEXT,
ADD COLUMN     "dodoProductId" TEXT,
ADD COLUMN     "dodoSubscriptionId" TEXT,
ADD COLUMN     "dodoSubscriptionStatus" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_dodoCustomerId_key" ON "User"("dodoCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "User_dodoSubscriptionId_key" ON "User"("dodoSubscriptionId");
