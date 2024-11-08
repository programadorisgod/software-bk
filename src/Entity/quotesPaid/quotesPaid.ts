import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm"
import { Credit } from "@Entity/credit/credit"

@Entity("QuotesPaid")
export class QuotesPaid extends BaseEntity {
  @PrimaryColumn({ type: "varchar", unique: true })
  idQuotesPaid!: string

  @Column({ type: "integer" })
  number!: number

  @ManyToOne(() => Credit, (credits: Credit) => credits.quotesPaid)
  credit!: Credit

  @Column({ type: "decimal" })
  totalValue!: number

  @Column({ type: "decimal" })
  capital!: number

  @Column({ type: "decimal" })
  interest!: number

  @Column({ type: "varchar" })
  date!: string

  @Column({ type: "varchar" })
  status!: string
}
