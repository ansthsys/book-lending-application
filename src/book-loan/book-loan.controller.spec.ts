import { Test, TestingModule } from '@nestjs/testing';
import { BookLoanController } from './book-loan.controller';
import { BookLoanService } from './book-loan.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('BookLoanController', () => {
  let controller: BookLoanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookLoanController],
      providers: [BookLoanService],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<BookLoanController>(BookLoanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
