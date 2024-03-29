import { Member } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class MemberEntity implements Member {
  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  borrowedBook: number;
}
