import { TokenProccesing } from "@utils/JwtHelpers/handleJwt"
import { NextFunction, Request, Response } from "express"

export const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tokenExtraction = extractTokenFromHeader(req)

    const tokeData = TokenProccesing(tokenExtraction)

    if (!tokeData.success)
      res.status(tokeData.statusCode).json({ error: tokeData.error })

    if (tokeData.success) next()
  } catch (error) {
    res.status(409).send({ error: "ERROR_TYPE: authorization" })
  }
}

const extractTokenFromHeader = (req: Request): string | undefined => {
  const [type, token] = req.headers.authorization?.split(" ") ?? []
  return type === "Bearer" ? token : undefined
}
