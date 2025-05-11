import { RoleEnum } from '@/user/enums/role.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roless = (...roles: RoleEnum[]) => {
  SetMetadata(ROLES_KEY, roles);
};
