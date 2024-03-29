import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(private prismaServie: PrismaService) {}

  async listBooks(): Promise<BookEntity[]> {
    return await this.prismaServie.book.findMany();
  }

  async listBookAvailable(): Promise<BookEntity[]> {
    return await this.prismaServie.book.findMany({
      where: {
        stock: { gt: 0 },
      },
    });
  }

  async listBookNotAvailable(): Promise<BookEntity[]> {
    return await this.prismaServie.book.findMany({
      where: {
        stock: { equals: 0 },
      },
    });
  }
}
