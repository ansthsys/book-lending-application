import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BookService } from './book.service';
import { BookController } from './book.controller';

@Module({
  providers: [BookService],
  controllers: [BookController],
  imports: [PrismaModule],
})
export class BookModule {}
