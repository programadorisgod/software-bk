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

export const Failure = <T>(error: T): IFailure<T> => ({
  success: false,
  error,
})
