import { Credit } from "@Entity/credit/credit"
import { ICRUDRepository } from "@interfaces/Repository/crudRespository"

export class CreditRepository implements ICRUDRepository<Credit> {
  async save(data: Credit): Promise<void | Error> {
    await Credit.save(data)
  }
  async update(id: string, data: Credit): Promise<Credit | Error> {
    await Credit.findOneBy({ idCredit: id })
    const creditUpdated = await Credit.save(data)
    return creditUpdated
  }
  async delete(id: string): Promise<void | Error> {
    await Credit.delete({ idCredit: id })
  }
  async findById(id: string): Promise<Credit | Error | null> {
    const credit = await Credit.findOne({ where: { idCredit: id }, relations: { quotesPaid: true, user: true } })
    return credit
  }
  async findAll(): Promise<Error | Credit[]> {
    const credtis = await Credit.find({
      relations: { quotesPaid: true, user: true },
    })
    return credtis
  }
}