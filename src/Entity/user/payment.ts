import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity('payments')
export class Payment extends BaseEntity{
    @PrimaryColumn()
    id!: string

    @Column()
    date!: Date

    @Column()
    amount !: number

    @Column()
    fees_number!: number
}