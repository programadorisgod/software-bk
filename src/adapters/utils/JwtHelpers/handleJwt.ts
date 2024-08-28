import { FailureProcess } from "@utils/results/resultsAPI"

import { config } from "dotenv"
import jwt from "jsonwebtoken"

config()

const { JSON_KEY_TOKEN } = process.env

export const tokenSing = async (phoneNumber: string) => {
  try {
    return jwt.sign(
      {
        phoneNumber
      },
      JSON_KEY_TOKEN as string,
      {
        expiresIn: "10m",
      }
    )
  } catch (error) {
    console.log(error)
    return FailureProcess("the token dont have created", 500)
  }
}

export const TokenProccesing = async (token: string | undefined) => {
  try {
    const data = jwt.verify(token as string, JSON_KEY_TOKEN as string)
    return data
  } catch (error) {
    return FailureProcess("Token no procceced", 500)
  }
}
