import { IReadableRepository } from "./readableRepository";
export interface IReadWriteRepository<T> extends IReadableRepository<T> {
    save(data: T): Promise<void | Error>;
    update(id: number, data: T): Promise<void | Error>;
}
