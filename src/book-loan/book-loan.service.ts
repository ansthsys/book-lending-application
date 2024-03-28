import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DateTime } from 'luxon';
import { PrismaService } from 'src/prisma/prisma.service';
import { BorrowBookDto } from './dto/borrow-book.dto';
import { BookLoanEntity } from './entities/book-loan.entity';
import { ReturnBookDto } from './dto/return-book.dto';

@Injectable()
export class BookLoanService {
  constructor(private prismaService: PrismaService) {}

  async borrowBook(payload: BorrowBookDto): Promise<BookLoanEntity> {
    // Validate memberCode and bookCode
    const book = await this.prismaService.book.findUnique({
      where: { code: payload.bookCode },
    });

    const member = await this.prismaService.member.findUnique({
      where: { code: payload.memberCode },
    });

    if (!book || !member) {
      throw new NotFoundException('Data with the given code does not exist.');
    }

    // Check if member has not reached the maximum number of books to borrow
    const booksBorrowed = await this.prismaService.bookLoan.count({
      where: {
        AND: {
          memberCode: payload.memberCode,
          returned: false,
        },
      },
    });

    if (booksBorrowed >= 2) {
      throw new BadRequestException('Member has limit to borrow books');
    }

    // Check if member is not penalized
    // 1. Check by last returned book date
    // 2. Check by last borrowed book date (not returned yet)
    const memberIsPenalized = await this.prismaService.$executeRawUnsafe(`
      SELECT EXISTS (
        SELECT * FROM book_loans 
        WHERE memberCode = '${payload.memberCode}' 
        AND (
          (
            returned = false 
            AND returnedAt >= dueDate + INTERVAL 7 DAY
          ) OR (
            returned = true 
            AND returnedAt >= dueDate + INTERVAL 7 DAY
          )
        )
      ) AS is_exists;
    `);

    if (memberIsPenalized > 0) {
      throw new BadRequestException('Member is penalized, try again in 3 days');
    }

    if (book.stock === 0) {
      throw new BadRequestException('Book is out of stock');
    }

    // Create a new book loan
    const newBookLoan = await this.prismaService.bookLoan.create({
      data: {
        borrowDate: DateTime.now().toISO(),
        dueDate: DateTime.fromISO(payload.dueDate.toString())
          .endOf('day')
          .plus({ days: 1 })
          .toISO(),
        returned: false,
        returnedAt: null,
        bookCode: payload.bookCode,
        memberCode: payload.memberCode,
      },
    });

    // Decrease book stock
    await this.prismaService.book.update({
      where: { code: newBookLoan.bookCode },
      data: { stock: book.stock - 1 },
    });

    return newBookLoan;
  }

  async returnBook(payload: ReturnBookDto): Promise<BookLoanEntity> {
    // Validate memberCode and bookCode
    const book = await this.prismaService.book.findUnique({
      where: { code: payload.bookCode },
    });

    const member = await this.prismaService.member.findUnique({
      where: { code: payload.memberCode },
    });

    if (!book || !member) {
      throw new NotFoundException('Data with the given code does not exist.');
    }

    // Check if the book is borrowed by the member
    const isBorrowdByMember = await this.prismaService.bookLoan.findFirst({
      where: {
        AND: {
          memberCode: payload.memberCode,
          bookCode: payload.bookCode,
          returned: false,
        },
      },
    });

    if (!isBorrowdByMember) {
      throw new NotFoundException('Book is not borrowed by the member');
    }

    // Update book loan
    const bookLoan = await this.prismaService.bookLoan.update({
      where: { id: isBorrowdByMember.id },
      data: {
        returned: true,
        returnedAt: DateTime.now().toISO(),
        book: {
          update: { stock: book.stock + 1 },
        },
      },
    });

    return bookLoan;
  }
}
