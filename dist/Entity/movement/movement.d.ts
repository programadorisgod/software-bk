import { User } from "@Entity/user/user";
import { BaseEntity } from "typeorm";
export declare class Movement extends BaseEntity {
    idMovement: string;
    description: string;
    dateMovement: Date;
    omuntMovement: number;
    destination: string;
    user: User;
}
