import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsersTable1659463178255 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `users` (`id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(150) NOT NULL, last_name VARCHAR(150) NOT NULL, other_name VARCHAR(150) DEFAULT NULL, full_name VARCHAR(255) NOT NULL, email VARCHAR(200) NOT NULL, `phone` VARCHAR(15) DEFAULT NULL, `password` VARCHAR(200) DEFAULT NULL, email_verified DATETIME DEFAULT NULL, deleted_at DATETIME DEFAULT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE users');
  }
}
