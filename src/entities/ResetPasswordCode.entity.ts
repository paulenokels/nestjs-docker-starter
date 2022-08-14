import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'reset_password_codes' })
export default class ResetPasswordCode {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
  })
  readonly id?: number;

  @Column({
    type: 'int',
    name: 'user_id',
  })
  public userId: number;

  @Column({
    type: 'varchar',
    length: 6,
    name: 'reset_code',
  })
  public resetCode: string;

  @CreateDateColumn({
    type: 'datetime',
    name: 'created_at',
  })
  readonly createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    name: 'updated_at',
  })
  readonly updatedAt: Date;
}
