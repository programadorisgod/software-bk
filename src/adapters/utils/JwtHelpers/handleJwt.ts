import { ISuccess } from "@interfaces/Results/results"
import { IFailureProcess } from "@interfaces/Results/resultsAPI"
import { Success } from "@utils/results/results"
import { FailureProcess } from "@utils/results/resultsAPI"

import { config } from "dotenv"
import jwt from "jsonwebtoken"

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
    return FailureProcess("the token dont have created", 500)
  }
}

export const TokenProccesing = (
  token: string | undefined,
): IFailureProcess<any> | ISuccess<any> => {
  try {
    const data = jwt.verify(token as string, JSON_KEY_TOKEN as string)
    return Success(data)
  } catch (error) {
    return FailureProcess("Token no procceced", 500)
  }
}
