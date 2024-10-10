import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm"
import { Credit } from "@Entity/credit/credit"

@Entity("QuotesPaid")
export class QuotesPaid extends BaseEntity {
  @PrimaryColumn({ type: "varchar" })
  idQuotesPaid!: string

  @ManyToOne(() => Credit, (credits: Credit) => credits.quotesPaid)
  credit!: Credit

  @Column({ type: "decimal" })
  totalValue!: number

  @Column({ type: "decimal" })
  capital!: number

  @Column({ type: "decimal" })
  interest!: number

  @Column({ type: "varchar" })
  period!: string

  @Column({ type: "timestamp" })
  date!: Date

  @Column({ type: "varchar" })
  status!: string
}
