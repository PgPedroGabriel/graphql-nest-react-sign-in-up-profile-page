// import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';
import { IUser } from '../../domain/user.domain';

// @Entity()
export class UserEntity implements IUser {
  // @PrimaryColumn()
  id: string;

  // @Column()
  name: string;

  // @Column()
  email: string;

  // @Column()
  password: string;

  // @CreateDateColumn({
  //   type: 'datetime',
  // })
  created_at: Date;
}
