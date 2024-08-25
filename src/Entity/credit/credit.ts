import { BaseEntity, Column, ManyToOne, PrimaryColumn } from "typeorm";

import { User } from "@Entity/user/user";

export class Credit extends BaseEntity{
    @PrimaryColumn()
    idCredit!:string

    @Column()
    principalAmount!:number

    @Column()
    interestRate!: number

    @Column()
    interestType!:string

    @Column()
    gradientType!:string

    @Column()
    gradientValue!:number

    @Column()
    term!: number

    @Column()
    starDate!:Date

    @Column()
    endDate!:Date

    @Column()
    totalAmountDue!:number

    @Column()
    status!:string

    //createdAt!:
    // updateAr!:
    @Column()
    tirType!:number
    
    @Column()
    uvrType!:string

    @Column()
    investmentAlternativeType!:string

    @Column()
    bondType!:string

    @Column()
    inflationType!:string
    
    @ManyToOne(()=>User,(user)=>user.credit)
    users!:User
}