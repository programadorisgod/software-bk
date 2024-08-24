import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity('payments')
export class Payment extends BaseEntity{
    @PrimaryColumn()
    idPayment!: string

    @Column()
    date!: Date

    @Column()
    amount !: number

    @Column()
    fees_number!: number
}