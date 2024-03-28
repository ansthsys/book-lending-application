import { BookLoan } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class BookLoanEntity implements BookLoan {
  @ApiProperty()
  id: number;

  @ApiProperty()
  borrowDate: Date;

  @ApiProperty()
  dueDate: Date;

  @ApiProperty({ default: false })
  returned: boolean;

  @ApiProperty({ required: false })
  returnedAt: Date | null;

  @ApiProperty()
  memberCode: string;

  @ApiProperty()
  bookCode: string;
}
