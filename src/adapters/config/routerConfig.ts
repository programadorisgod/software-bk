import { Router } from "express"
import { BASE_URL } from "@constants/constants"
import { validateDto } from "@middlewares/validator"

export const router: Router = Router()

export const registerRoute = (
  router: Router,
  path: string,
  dto: any,
  handler: any,
  middleware?: any,
) => {
  if (middleware) {
    router.post(`${BASE_URL}${path}`, middleware, validateDto(dto), handler)
    return
  }
  router.post(`${BASE_URL}${path}`, validateDto(dto), handler)
}
