import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  /**---------------------------------------------------
   * columns
   *--------------------------------------------------*/

  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
  })
  readonly id?: number;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'first_name',
  })
  readonly firstName: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'last_name',
  })
  readonly lastName: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'other_name',
    nullable: true,
  })
  readonly otherName: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'full_name',
  })
  readonly fullName: string;

  @Column({
    type: 'varchar',
    length: 14,
  })
  readonly phone: string;

  @Index('email_unique', { unique: true })
  @Column({
    type: 'varchar',
    length: 200,
  })
  readonly email: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  readonly password: string;

  @Column({
    type: 'datetime',
    default: null,
    name: 'email_verified',
    nullable: true,
  })
  emailVerified: Date | null = null;

  @Column({
    type: 'datetime',
    name: 'deleted_at',
    nullable: true,
    default: null,
  })
  readonly deletedAt: Date;

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

  /**---------------------------------------------------
   * relations
   *--------------------------------------------------*/

  /**---------------------------------------------------
   * constructor
   *--------------------------------------------------*/

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    otherName: string = null,
    fullName: string,
    email: string,
    phone: string,
    emailVerified: Date = null,
    password: string,
    deletedAt: Date = null,
  ) {
    super();
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    (this.otherName = otherName), (this.fullName = fullName), (this.email = email);
    this.phone = phone;
    this.password = password;
    this.emailVerified = emailVerified;
    this.deletedAt = deletedAt;
  }
}
