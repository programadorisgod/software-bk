import { Bank } from "@Entity/bank/bank"
import { Credit } from "@Entity/credit/credit"
import { Movement } from "@Entity/movement/movement"
import { Entity, Column, PrimaryColumn, BaseEntity, OneToMany, ManyToOne } from "typeorm"

//the established inheritance is made for the ease of the methods offered by Typeorm
@Entity("users")
export class User extends BaseEntity {
  //the decorators of typeOrm with respect to attributes already designed in the database
  @PrimaryColumn()
  id!: string
    
  @Column()
  name!: string

  @Column()
  lastName!: string

  @Column()
  email!: string

  @Column()
  phoneNumber!: string

  @Column()
  password!: string
  
  @Column({ type:'int' })
  age!: number

  @Column("simple-array")
  faceImage!: number[]

  @OneToMany(()=> Movement,( movement: Movement ) => movement.user)
  movement!:Movement[]

  @ManyToOne(()=> Bank,(bank: Bank)=>bank.users)
  bank!:Bank

  @OneToMany(()=> Credit,(credit: Credit)=>credit.users)
  credit!:Credit[]
}
