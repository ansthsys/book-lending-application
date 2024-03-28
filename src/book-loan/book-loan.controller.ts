import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BookLoanService } from './book-loan.service';
import { BorrowBookDto } from './dto/borrow-book.dto';
import { BookLoanEntity } from './entities/book-loan.entity';
import { ReturnBookDto } from './dto/return-book.dto';

@Controller('book-loan')
@ApiTags('book-loan')
export class BookLoanController {
  constructor(private bookLoanService: BookLoanService) {}

  @Post('borrow')
  @ApiCreatedResponse({ type: BookLoanEntity })
  async borrowBook(@Body() borrowBook: BorrowBookDto): Promise<BookLoanEntity> {
    return await this.bookLoanService.borrowBook(borrowBook);
  }

  @Post('return')
  @ApiOkResponse({ type: BookLoanEntity })
  async returnBook(@Body() returnBook: ReturnBookDto): Promise<BookLoanEntity> {
    return await this.bookLoanService.returnBook(returnBook);
  }
}
