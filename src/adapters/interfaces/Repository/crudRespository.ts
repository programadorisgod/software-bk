import { IReadableRepository } from "./readableRepository"

export interface ICRUDRepository<T> extends IReadableRepository<T> {
  save(data: T): Promise<void | Error>
  update(id: string, data: T): Promise<T | Error>
  delete(id: string): Promise<void | Error>
}
