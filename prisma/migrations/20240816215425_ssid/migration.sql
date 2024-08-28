-- CreateTable
CREATE TABLE `prof` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user` VARCHAR(191) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `add_cour` INTEGER NOT NULL DEFAULT 0,
    `admin` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `prof_user_key`(`user`),
    UNIQUE INDEX `prof_password_key`(`password`),
    UNIQUE INDEX `prof_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cour` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user` VARCHAR(191) NOT NULL,
    `titre` VARCHAR(191) NOT NULL,
    `niveau` VARCHAR(191) NOT NULL,
    `video` VARCHAR(191) NULL,
    `image` LONGBLOB NULL,

    UNIQUE INDEX `cour_titre_key`(`titre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user` VARCHAR(50) NOT NULL,
    `phone` INTEGER NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `willaya` VARCHAR(191) NOT NULL,
    `image` LONGBLOB NULL,
    `add_etudiant` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `delete_etudiant` DATETIME(3) NOT NULL,
    `add_prof` INTEGER NOT NULL DEFAULT 0,
    `delete_prof` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `admin_password_key`(`password`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `etudiant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user` TEXT NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `phone` INTEGER NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `niveau` VARCHAR(191) NOT NULL,
    `admin` VARCHAR(191) NOT NULL,
    `add_etudiant` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `delete_etudiant` DATETIME(3) NOT NULL,
    `expiration_date` DATETIME(3) NOT NULL,

    UNIQUE INDEX `etudiant_password_key`(`password`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `etudiant_admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user` TEXT NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `phone` INTEGER NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `niveau` VARCHAR(191) NOT NULL,
    `admin` VARCHAR(191) NOT NULL,
    `add_etudiant` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `delete_etudiant` DATETIME(3) NOT NULL,
    `expiration_date` DATETIME(3) NOT NULL,

    UNIQUE INDEX `etudiant_admin_password_key`(`password`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `delete_etudiant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user` TEXT NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `phone` INTEGER NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `niveau` VARCHAR(191) NOT NULL,
    `admin` VARCHAR(191) NOT NULL,
    `add_etudiant` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `delete_etudiant` DATETIME(3) NOT NULL,

    UNIQUE INDEX `delete_etudiant_password_key`(`password`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user` VARCHAR(20) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `Message` VARCHAR(100) NOT NULL,
    `Details` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
