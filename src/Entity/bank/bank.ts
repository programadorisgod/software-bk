import { User } from "@Entity/user/user";
import { BaseEntity, Column, OneToMany, PrimaryColumn } from "typeorm";

export class Bank extends BaseEntity{
    @PrimaryColumn()
    idBank!:string

    @Column()
    capital!: number

    @OneToMany(()=> User,(user)=> user.bank)
    users!:User
}