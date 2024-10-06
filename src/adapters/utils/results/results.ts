import { IFailure, ISuccess } from "@interfaces/Results/results"

/**
 * Create a successful result object.
 *
 * @param value - The value representing the successful result. Can be of any generic `T` type.
 * @returns An object implementing the `ISuccess<T>` interface, indicating success and containing the provided value.
 *
 * @template T - A generic type defining the type of the success value.
 *
 * @example
 * // Creation of a successful result with a number.
 * const result = Success(42);
 * // Result: { success: true, value: 42 }
 *
 * @example
 * // Creating a successful result with an object
 * const result = Success({ id: 1, name: ‘Item’ });
 * // Result: { success: true, value: { id: 1, name: ‘Item’ } }
 */
export const Success = <T>(value: T): ISuccess<T> => ({
  success: true,
  value,
})

/**
 * Creates a failed result object.
 *
 * @param error - The error representing the failed result. Can be of any generic `T` type.
 * @returns An object implementing the `IFailure<T>` interface, indicating failure and containing the provided error.
 *
 * @template T - A generic type defining the type of the failed error.
 *
 * @example
 * // Creation of a failed result with an error message.
 * const result = Failure(‘An error occurred’);
 * // Result: { success: false, error: ‘An error occurred’ }
 *
 * @example
 * // Creating a failed result with an error object
 * const result = Failure({ code: 500, message: ‘Internal Server Error’ });
 * // Result: { success: false, error: { code: 500, message: ‘Internal Server Error’ } }
 */

export const Failure = <E>(error: E): IFailure<E> => ({
  success: false,
  error,
})

/**
 * `Result` is a generic type that represents the outcome of an operation which can either succeed or fail.
 * 
 * @template T - The type of the value in case of success.
 * @template E - The type of the error in case of failure. Defaults to `string`.
 * 
 * This type can be one of the following:
 * - `ReturnType<typeof Success<T>>`: Represents a successful result containing a value of type `T`.
 * - `ReturnType<typeof Failure<E>>`: Represents a failed result containing an error of type `E`.
 * 
 * Example usage:
 * ```typescript
 * const successResult: Result<number> = Success(42);
 * const failureResult: Result<string> = Failure("Something went wrong");
 * ```
 */

export type Result<T, E = string> =
  | ReturnType<typeof Success<T>>
  | ReturnType<typeof Failure<E>>
