import { Test, TestingModule } from '@nestjs/testing';
import { BookLoanService } from './book-loan.service';
import { PrismaService } from '../prisma/prisma.service';

describe('BookLoanService', () => {
  let service: BookLoanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookLoanService, PrismaService],
    }).compile();

    service = module.get<BookLoanService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
