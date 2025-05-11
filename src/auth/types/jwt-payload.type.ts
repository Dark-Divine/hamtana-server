import { RoleEnum } from '@/user/enums/role.enum';

export type JwtPayloadType = {
  context: {
    id: number;
    username: string;
    role: RoleEnum;
  };
  iat: number;
  exp: number;
};
