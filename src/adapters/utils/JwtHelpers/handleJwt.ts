import { config } from "dotenv"
import * as jwt from "jsonwebtoken"

config()

const { JSON_KEY_TOKEN } = process.env

export const tokenSing = async (phoneNumber: string) => {
  try {
    return jwt.sign(
      {
        phoneNumber,
      },
      JSON_KEY_TOKEN as string,
      {
        expiresIn: "10m",
      },
    )
  } catch (error) {
    throw new Error("No se pudo crear el token")
  }
}

export const TokenProccesing = async (token: string | undefined) => {
  try {
    const data = jwt.verify(token as string, JSON_KEY_TOKEN as string)
    return data
  } catch (error) {
    throw new Error("Bad preccesing the token")
  }
}
