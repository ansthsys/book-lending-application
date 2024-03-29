import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MemberService } from './member.service';
import { MemberEntity } from './entities/member.entity';

@Controller('member')
@ApiTags('member')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get()
  @ApiOkResponse({
    type: [MemberEntity],
    description: 'Get list member with count borrowed book',
  })
  async listMember(): Promise<MemberEntity[]> {
    return await this.memberService.listMember();
  }
}
