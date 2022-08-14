import { MigrationInterface, QueryRunner } from 'typeorm';

export class createVerificatioCodeTable1659618878154 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE verification_codes (`id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, user_id INT UNSIGNED NOT NULL, `code` VARCHAR(6) NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE verification_codes');
  }
}
