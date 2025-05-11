import { BaseEntity } from '@/base';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { RoleEnum } from '../enums/role.enum';
import bcrypt from 'bcrypt';

@Entity()
export class User extends BaseEntity {
  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar', { select: false })
  password: string;

  @Column('varchar', { nullable: true })
  googleId?: string;

  @Column('enum', { default: RoleEnum.USER, enum: RoleEnum })
  role: RoleEnum;

  @Column('varchar', { nullable: true })
  avatar?: string;

  @Column('boolean', { default: false })
  emailVerified: boolean;

  @Column('boolean', { default: true })
  isActive: boolean;

  @BeforeInsert()
  private async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
