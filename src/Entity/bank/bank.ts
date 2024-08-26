import { User } from "@Entity/user/user"
import { BaseEntity, Column, OneToMany, PrimaryColumn } from "typeorm"

export class Bank extends BaseEntity {
  @PrimaryColumn({ type: "varchar" })
  idBank!: string

  @Column({ type: "decimal" })
  capital!: number

  @OneToMany(() => User, (user:User) => user.bank)
  users!: User
}
