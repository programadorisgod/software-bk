export interface IFailureProcess<T> {
  error: T
  success: false
  statusCode: number
}

export interface ISuccessProcess<T> {
  success: true
  value: T
  statusCode: number
}
