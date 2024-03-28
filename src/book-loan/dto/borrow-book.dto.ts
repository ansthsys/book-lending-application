import { ApiProperty } from '@nestjs/swagger';

export class BorrowBookDto {
  @ApiProperty()
  memberCode: string;

  @ApiProperty()
  bookCode: string;

  @ApiProperty()
  dueDate: Date;
}
