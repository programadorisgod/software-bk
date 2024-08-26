import { DataSource } from "typeorm";
export declare class DataBase {
    private static _intance;
    private constructor();
    static get Instance(): DataBase;
    connectDB(): DataSource | undefined;
}
