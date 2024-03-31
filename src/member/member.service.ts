import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MemberEntity } from './entities/member.entity';

@Injectable()
export class MemberService {
  constructor(private prismaService: PrismaService) {}

  async listMember(): Promise<MemberEntity[]> {
    const members = await this.prismaService.member.findMany({
      include: {
        _count: {
          select: {
            bookLoan: {
              where: { returned: false },
            },
          },
        },
      },
    });

    const memberEntities: MemberEntity[] = members.map((member) => {
      return {
        code: member.code,
        name: member.name,
        borrowedBook: member._count.bookLoan,
      };
    });

    return memberEntities;
  }
}
