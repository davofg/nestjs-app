import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('product')
export class TypeOrmProduct {
    @PrimaryColumn('uuid')
    id: string;

    @Column({ length: 150 })
    name: string;

    @Column('decimal', { precision: 14, scale: 2 })
    price: number;
}
