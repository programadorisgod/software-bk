import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm"

import { User } from "@Entity/user/user"
@Entity("credits")
export class Credit extends BaseEntity {
  @PrimaryColumn({ type: "varchar" })
  idCredit!: string

  @Column({ type: "decimal" })
  principalAmount!: number

  @Column({ type: "decimal" })
  interestRate!: number

  @Column({ type: "varchar" })
  interestType!: string

  @Column({ type: "varchar" })
  gradientType!: string

  @Column({ type: "decimal" })
  gradientValue!: number

  @Column({ type: "integer" })
  term!: number

  @Column({ type: "timestamp" })
  starDate!: Date

  @Column({ type: "timestamp" })
  endDate!: Date

  @Column({ type: "decimal" })
  totalAmountDue!: number

  @Column({ type: "varchar" })
  status!: string

  @Column({ type: "timestamp" })
  createdAt!: Date

  @Column({ type: "timestamp" })
  updateAr!: Date

  @Column({ type: "decimal" })
  tirType!: number

  @Column({ type: "varchar" })
  uvrType!: string

  @Column({ type: "varchar" })
  investmentAlternativeType!: string

  @Column({ type: "varchar" })
  bondType!: string

  @Column({ type: "varchar" })
  inflationType!: string

  @ManyToOne(() => User, (user: User) => user.credit)
  users!: User
}
