import { Test, TestingModule } from '@nestjs/testing';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('MemberController', () => {
  let controller: MemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberController],
      providers: [MemberService],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<MemberController>(MemberService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
