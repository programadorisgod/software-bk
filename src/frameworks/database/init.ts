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
  private appDataSource: DataSource

  private constructor() {
    const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env
    this.appDataSource = new DataSource({
      type: "postgres",
      host: PGHOST,
      port: 5432,
      password: PGPASSWORD,
      database: PGDATABASE,
      username: PGUSER,
      entities: [Bank, Credit, Movement, Payment, User],
      synchronize: true,
      logging: true,
      ssl: { rejectUnauthorized: false },
    })
  }

  public async connectDB(): Promise<DataSource | undefined> {
    try {
      await this.appDataSource.initialize()
      return this.appDataSource
    } catch (error) {
      console.log("error de conexion Bd " + error)
      return undefined
    }
  }

  public static get Instance(): DataBase {
    if (!DataBase._intance) {
      DataBase._intance = new DataBase()
    }
    return DataBase._intance
  }
}
