/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `conditionId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `sellingMethodId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `shippingCostId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Condition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SellingMethod` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShippingCost` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `condition` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellingMethod` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingOption` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_conditionId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_locationId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_sellingMethodId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_shippingCostId_fkey`;

-- DropIndex
DROP INDEX `Product_categoryId_fkey` ON `Product`;

-- DropIndex
DROP INDEX `Product_conditionId_fkey` ON `Product`;

-- DropIndex
DROP INDEX `Product_locationId_fkey` ON `Product`;

-- DropIndex
DROP INDEX `Product_sellingMethodId_fkey` ON `Product`;

-- DropIndex
DROP INDEX `Product_shippingCostId_fkey` ON `Product`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `categoryId`,
    DROP COLUMN `conditionId`,
    DROP COLUMN `locationId`,
    DROP COLUMN `sellingMethodId`,
    DROP COLUMN `shippingCostId`,
    ADD COLUMN `category` VARCHAR(191) NOT NULL,
    ADD COLUMN `condition` VARCHAR(191) NOT NULL,
    ADD COLUMN `location` VARCHAR(191) NOT NULL,
    ADD COLUMN `sellingMethod` VARCHAR(191) NOT NULL,
    ADD COLUMN `shippingOption` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Category`;

-- DropTable
DROP TABLE `Condition`;

-- DropTable
DROP TABLE `Location`;

-- DropTable
DROP TABLE `SellingMethod`;

-- DropTable
DROP TABLE `ShippingCost`;
