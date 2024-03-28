import { Module } from '@nestjs/common';
import { BookLoanService } from './book-loan.service';
import { BookLoanController } from './book-loan.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [BookLoanService],
  controllers: [BookLoanController],
  imports: [PrismaModule],
})
export class BookLoanModule {}
