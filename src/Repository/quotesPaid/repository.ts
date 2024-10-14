import { QuotesPaid } from "@Entity/quotesPaid/quotesPaid"
import { ICRUDRepository } from "@interfaces/Repository/crudRespository"

export class QuotesPaidRepository implements ICRUDRepository<QuotesPaid> {
  async save(data: QuotesPaid): Promise<void | Error> {
    await QuotesPaid.save(data)
  }
  async update(id: string, data: QuotesPaid): Promise<QuotesPaid | Error> {
    await QuotesPaid.findOneBy({ idQuotesPaid: id })
    const quotesPaidUpdated = await QuotesPaid.save(data)
    return quotesPaidUpdated
  }
  async delete(id: string): Promise<void | Error> {
    await QuotesPaid.delete({ idQuotesPaid: id })
  }
  async findById(id: string): Promise<QuotesPaid | Error | null> {
    const quotesPaid = await QuotesPaid.findOne({ where: { idQuotesPaid: id }, relations: { credit: true } })
    return quotesPaid
  }

  async findByCredit(creditId: string): Promise<QuotesPaid | Error | null> {
    const quotesPaid = await QuotesPaid.findOne({ where: { credit: { idCredit: creditId } }, relations: { credit: true } })
    return quotesPaid
  }

  async findAll(): Promise<Error | QuotesPaid[]> {
    const quotesPaid = await QuotesPaid.find({
      relations: { credit: true },
    })
    return quotesPaid
  }
}   