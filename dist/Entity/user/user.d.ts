import { Bank } from "@Entity/bank/bank";
import { Credit } from "@Entity/credit/credit";
import { Movement } from "@Entity/movement/movement";
import { BaseEntity } from "typeorm";
export declare class User extends BaseEntity {
    idUser: string;
    name: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    age: number;
    faceImage: number[];
    movement: Movement[];
    bank: Bank;
    credit: Credit[];
}
