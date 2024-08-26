import {
  IFailureProcess,
  ISuccessProcess,
} from "@interfaces/Results/resultsAPI"

export const FailureProcess = <T>(
  error: T,
  statusCode: number,
): IFailureProcess<T> => ({
  error,
  success: false,
  statusCode,
})

export const SuccessProcess = <T>(
  value: T,
  statusCode: number,
): ISuccessProcess<T> => ({
  value,
  success: true,
  statusCode,
})
