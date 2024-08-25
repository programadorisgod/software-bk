import { User } from "@Entity/user/user";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('movements')
export class Movement extends BaseEntity{
    @PrimaryColumn()
    idMovement!:string

    @Column()
    description!:string

    @Column()
    dateMovement!: Date

    @Column()
    omuntMovement!:number

    @Column()
    destination!:string

    @ManyToOne(() => User,(user) => user.movement)
    user!:User
}