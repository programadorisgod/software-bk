import { User } from "@Entity/user/user";
import { BaseEntity } from "typeorm";
export declare class Bank extends BaseEntity {
    idBank: string;
    capital: number;
    users: User;
}
