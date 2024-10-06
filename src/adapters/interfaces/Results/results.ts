/**
 * Interface representing a successful outcome of an operation.
 * 
 * This interface is used to encapsulate the result of an operation that has completed successfully. 
 * The `success` field is set to `true` to indicate that the operation was successful.
 * 
 * @template T - Generic type representing the success value. Can be any type expected as a result of the operation.
 * 
 * @property {true} success - Indicates that the operation was successful.
 * @property {T} value - The value representing the success result. Can be any type defined by the generic `T` type.
 * 
 * @example
 // Interface representing a successful result with a number.
 * const successResult: ISuccess<number> = {
 * success: true,
 * value: 42
 * };
 * 
 * @example
 * // Interface representing a successful result with an object.
 * const successResult: ISuccess<{ id: number; name: string }> = {
 * success: true,
 * value: { id: 1, name: ‘Item’ }
 * };
 */
export interface ISuccess<T> {
  success: true
  value: T
}

/**
 * Interface representing a failed result of an operation.
 * 
 * This interface is used to encapsulate the result of an operation that has failed. 
 * The `success` field is set to `false` to indicate that the operation failed.
 * 
 * @template E - Generic type representing the error of the failed operation. This can be any type that describes the error.
 * 
 * @property {false} success - Indicates that the operation failed.
 * @ @property {E} error - The error representing the failed result. Can be any type defined by the generic `T` type.
 * 
 * @example
 // Interface representing a failed result with an error message.
 * const failureResult: IFailure<string> = {
 * success: false,
 * error: ‘An error occurred’
 * };
 * 
 * @example
 * // interface representing a failed result with an error object
 * const failureResult: IFailure<{ code: number; message: string }> = {
 * success: false,
 * error: { code: 500, message: ‘Internal Server Error’ }
 * };
 */

export interface IFailure<E> {
  success: false
  error: E
}
