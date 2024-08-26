import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm"

@Entity("payments")
export class Payment extends BaseEntity {
  @PrimaryColumn({ type: "varchar" })
  idPayment!: string

  @Column({ type: "timestamp" })
  date!: Date

  @Column({ type: "decimal" })
  amount!: number

  @Column({ type: "integer" })
  fees_number!: number
}
