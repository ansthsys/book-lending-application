import { ApiProperty } from '@nestjs/swagger';

export class ReturnBookDto {
  @ApiProperty()
  memberCode: string;

  @ApiProperty()
  bookCode: string;
}
