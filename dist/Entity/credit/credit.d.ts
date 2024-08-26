import { BaseEntity } from "typeorm";
import { User } from "@Entity/user/user";
export declare class Credit extends BaseEntity {
    idCredit: string;
    principalAmount: number;
    interestRate: number;
    interestType: string;
    gradientType: string;
    gradientValue: number;
    term: number;
    starDate: Date;
    endDate: Date;
    totalAmountDue: number;
    status: string;
    createdAt: Date;
    updateAr: Date;
    tirType: number;
    uvrType: string;
    investmentAlternativeType: string;
    bondType: string;
    inflationType: string;
    users: User;
}
