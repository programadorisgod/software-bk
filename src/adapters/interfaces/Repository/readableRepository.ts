export interface IReadableRepository<T> {
  findById(id: string): Promise<T | Error | null >
  findAll(): Promise<T[] | Error>
}
