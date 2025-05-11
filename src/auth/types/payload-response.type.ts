import { User } from '@/user/entities/user.entity';

export type PayloadResponseType = {
  token: string;
  user: Partial<User>;
};
