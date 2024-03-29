import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BookService } from './book.service';
import { BookEntity } from './entities/book.entity';

@Controller('book')
@ApiTags('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  @ApiOkResponse({
    type: [BookEntity],
    description: 'Get list book (no filter)',
  })
  async listBooks(): Promise<BookEntity[]> {
    return await this.bookService.listBooks();
  }

  @Get('available')
  @ApiOkResponse({
    type: [BookEntity],
    description: 'Get list available books',
  })
  async listBookAvailable(): Promise<BookEntity[]> {
    return await this.bookService.listBookAvailable();
  }

  @Get('not-available')
  @ApiOkResponse({
    type: [BookEntity],
    description: 'Get list not available books',
  })
  async listBookNotAvailable(): Promise<BookEntity[]> {
    return await this.bookService.listBookNotAvailable();
  }
}
