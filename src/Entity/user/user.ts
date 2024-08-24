import { Entity, Column, PrimaryColumn, BaseEntity } from "typeorm"

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
}
