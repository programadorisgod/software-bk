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

  @Column({type:'varchar',nullable:true})
  origin!: string
  
  @Column({ type: "varchar",nullable:true})
  destination!: string

  @Column({type:'varchar'})
  typeTransfer!:string

  @ManyToOne(() => User, (user:User) => user.movement)
  user!: User
}
