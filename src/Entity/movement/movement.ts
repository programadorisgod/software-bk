import { User } from "@Entity/user/user"
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm"

@Entity("movements")
export class Movement extends BaseEntity {
  @PrimaryColumn({ type: "varchar" })
  idMovement!: string

  @Column({ type: "varchar" })
  description!: string

  @Column({ type: 'timestamp' })
  dateMovement!: Date

  @Column({ type: 'decimal' })
  omuntMovement!: number

  @Column({ type: "varchar" })
  destination!: string

  @ManyToOne(() => User, (user:User) => user.movement)
  user!: User
}
