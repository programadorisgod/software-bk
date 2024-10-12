import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm"

import { QuotesPaid } from "@Entity/quotesPaid/quotesPaid"
import { User } from "@Entity/user/user"
@Entity("credits")
export class Credit extends BaseEntity {
  @PrimaryColumn({ type: "varchar", unique: true })
  idCredit!: string

  @ManyToOne(() => User, (user: User) => user.credit)
  user!: User

  @Column({ type: "decimal" })
  amountApproved!: number

  @Column({ type: "varchar" })
  interestType!: string

  @Column({ type: "decimal" })
  interestRate!: number

  @Column({ type: "integer" })
  totalInterest!: number

  @OneToMany(() => QuotesPaid, (quotesPaid: QuotesPaid) => quotesPaid.credit)
  quotesPaid!: QuotesPaid[]

  @Column({ type: "integer" })
  quotesNumber!: number

  @Column({ type: "integer" })
  totalPaid!: number

  @Column({ type: "integer" })
  paidInterest!: number

  @Column({ type: "varchar" })
  period!: string

  @Column({ type: "varchar" })
  startDate!: string

  @Column({ type: "varchar" })
  endDate!: string

  @Column({ type: "varchar" })
  creditStatus!: string
}
