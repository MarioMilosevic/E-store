-- CreateTable
CREATE TABLE `ProductImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imageUrl` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ProductImage_imageUrl_productId_key`(`imageUrl`, `productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductImage` ADD CONSTRAINT `ProductImage_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
