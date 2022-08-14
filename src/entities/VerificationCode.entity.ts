import { Column, Entity, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity({ name: 'verification_codes' })
class VerificationCode {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
  })
  public id?: number;

  @Column({
    name: 'user_id',
    type: 'bigint',
  })
  public userId: number;

  @Column({
    type: 'varchar',
    length: 6,
  })
  public code: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt?: Date;
}

export default VerificationCode;
