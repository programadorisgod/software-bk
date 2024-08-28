import { TokenProccesing } from "@utils/JwtHelpers/handleJwt"
import { NextFunction, Request, Response } from "express"


export const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tokenExtraction = extractTokenFromHeader(req)
    const tokeData = await TokenProccesing(tokenExtraction)
    if (tokeData) next()
  } catch (error) {
    res.status(409).send({ error: "ERROR TYPE authorization" })
  }
}

const extractTokenFromHeader = (req: Request): string | undefined => {
  const [type, token] = req.headers.authorization?.split(" ") ?? []
  return type === "Bearer" ? token : undefined
}
