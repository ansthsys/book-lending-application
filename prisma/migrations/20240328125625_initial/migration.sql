-- CreateTable
CREATE TABLE `members` (
    `code` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `members_code_key`(`code`),
    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `books` (
    `code` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `author` VARCHAR(255) NOT NULL,
    `stock` INTEGER NOT NULL,

    UNIQUE INDEX `books_code_key`(`code`),
    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `book_loans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `borrowDate` TIMESTAMP(0) NOT NULL,
    `dueDate` TIMESTAMP(0) NOT NULL,
    `returned` BOOLEAN NOT NULL DEFAULT false,
    `returnedAt` TIMESTAMP(0) NULL,
    `memberCode` VARCHAR(191) NOT NULL,
    `bookCode` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `book_loans` ADD CONSTRAINT `book_loans_bookCode_fkey` FOREIGN KEY (`bookCode`) REFERENCES `books`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `book_loans` ADD CONSTRAINT `book_loans_memberCode_fkey` FOREIGN KEY (`memberCode`) REFERENCES `members`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;
