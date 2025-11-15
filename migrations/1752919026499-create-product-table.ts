import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductTable1752919026499 implements MigrationInterface {
    name = 'CreateProductTable1752919026499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE product (
                id uuid NOT NULL, 
                name character varying(150) NOT NULL, 
                price numeric(14,2) NOT NULL, 
                CONSTRAINT pk_product_id PRIMARY KEY (id)
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product"`);
    }

}