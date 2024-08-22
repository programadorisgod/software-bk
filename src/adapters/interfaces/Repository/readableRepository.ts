export interface IReadableRepository<T, ID = number> {
  findById(id: ID): Promise<T | Error>
  findAll(): Promise<T[] | Error>
}
