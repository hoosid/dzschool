
-- CreateTable membres
CREATE TABLE `membres` (
    `id_meb` INTEGER NOT NULL AUTO_INCREMENT,
    `user` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
     ALTER TABLE `membres` ADD COLUMN `image` LONGBLOB NULL;
    UNIQUE INDEX `membres_email_key`(`email`),
    PRIMARY KEY (`id_meb`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE `membres` MODIFY `password` VARCHAR(255) NOT NULL;

-- CreateTable admin
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user` VARCHAR(191) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable cours
CREATE TABLE `cours` (
    `id_cour` INTEGER NOT NULL AUTO_INCREMENT,
    `titre` VARCHAR(100) NOT NULL,
    `description` VARCHAR(25) NOT NULL,
     MODIFY `description` VARCHAR(255) NOT NULL;
    ALTER TABLE `cours` ADD COLUMN `image` LONGBLOB NULL,
    ALTER TABLE `cours` ADD COLUMN `type_cour` VARCHAR(50) NOT NULL;
    ALTER TABLE `cours` ADD COLUMN `video` VARCHAR(191) NULL;
    PRIMARY KEY (`id_cour`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `contact` (
    `id_cont` INTEGER NOT NULL AUTO_INCREMENT,
    `First_Name` VARCHAR(20) NOT NULL,
    `Last_Name` VARCHAR(20) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `Message` VARCHAR(100) NOT NULL,
    `Details` VARCHAR(100) NULL,

    PRIMARY KEY (`id_cont`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE `contact` MODIFY `Details` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `Feedback` (
    `id_feed` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(70) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `Details` VARCHAR(255) NULL,

    PRIMARY KEY (`id_feed`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;



   
