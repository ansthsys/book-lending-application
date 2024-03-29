import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './member/member.module';
import { PrismaModule } from './prisma/prisma.module';
import { BookModule } from './book/book.module';
import { BookLoanModule } from './book-loan/book-loan.module';

@Module({
  imports: [MemberModule, PrismaModule, BookModule, BookLoanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
