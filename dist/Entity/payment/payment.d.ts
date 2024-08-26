import { BaseEntity } from "typeorm";
export declare class Payment extends BaseEntity {
    idPayment: string;
    date: Date;
    amount: number;
    fees_number: number;
}
