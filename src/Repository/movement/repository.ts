import { Movement } from "@Entity/movement/movement";
import { ICRUDRepository } from "@interfaces/Repository/crudRespository";

export class movementRepository implements ICRUDRepository<Movement>{

    async save(data: Movement): Promise<void | Error> {
        await Movement.save(data)
    }

    async update(id: string, data: Movement): Promise<Error | Movement> {
        await Movement.findOneBy({idMovement:id})
        const updateMovement = await Movement.save(data)
        return updateMovement
    }

    async delete(id: string): Promise<void | Error> {
        await Movement.delete({idMovement:id})
    }

    async findById(id: string): Promise<Error | Movement | null> {
        const find = await Movement.findOneBy({idMovement:id})
        return find
    }

    async findByNumberPhone(phoneNumber:string):Promise<any>{
        const movementFind = Movement.find( { where:{ user:{ phoneNumber } } } )
        return movementFind
    }

    async findAll(): Promise<Error | Movement[]> {
        const movement = await Movement.find({relations:{
            user:true
        }})

        return movement
    }

}