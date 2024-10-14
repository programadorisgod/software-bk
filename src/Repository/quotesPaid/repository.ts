import { QuotesPaid } from "@Entity/quotesPaid/quotesPaid"

export class QuotesPaidRepository {
  async save(data: QuotesPaid): Promise<void | Error> {
    await QuotesPaid.save(data)
  }
  async update(id: number, data: QuotesPaid): Promise<QuotesPaid | Error> {
    await QuotesPaid.findOneBy({ idQuotesPaid: id })
    const quotesPaidUpdated = await QuotesPaid.save(data)
    return quotesPaidUpdated
  }
  async delete(id: number): Promise<void | Error> {
    await QuotesPaid.delete({ idQuotesPaid: id })
  }
  async findById(id: number): Promise<QuotesPaid | Error | null> {
    const quotesPaid = await QuotesPaid.findOne({ where: { idQuotesPaid: id }, relations: { credit: true } })
    return quotesPaid
  }

  async findByCredit(creditId: string): Promise<QuotesPaid[] | Error | null> {
    const quotesPaid = await QuotesPaid.find({ where: { credit: { idCredit: creditId } }, relations: { credit: true } })
    return quotesPaid
  }

  async findAll(): Promise<Error | QuotesPaid[]> {
    const quotesPaid = await QuotesPaid.find({
      relations: { credit: true },
    })
    return quotesPaid
  }
}   