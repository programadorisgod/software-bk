
import { DataSource } from "typeorm"
import { config } from "dotenv"

import { Bank } from "@Entity/bank/bank"
import { Credit } from "@Entity/credit/credit"
import { Movement } from "@Entity/movement/movement"
import { Payment } from "@Entity/payment/payment"
import { User } from "@Entity/user/user"
config()

export class DataBase {
  private static _intance: DataBase

  private constructor() {}
  public getInstance(): DataBase {
    if (!DataBase._intance) {
      DataBase._intance = new DataBase()
    }
    return DataBase._intance
  }
  public connectDB(): DataSource {
    const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
    const appDataSource = new DataSource({
      type: "postgres",
      host: PGHOST,
      port: 5432,
      password:PGPASSWORD,
      database:PGDATABASE,
      username:PGUSER,
      entities:[User,Credit,Bank,Payment,Movement],
      synchronize:true,
      logging:true
    })
    return appDataSource
  }
}
