import { IsInt, IsNotEmpty, IsString, IsDecimal } from "class-validator"

export class CreditDto {
  @IsNotEmpty()
  @IsString()
  idCredit!: string

  @IsNotEmpty()
  userId!: string

  @IsNotEmpty()
  @IsDecimal()
  amountApproved!: number

  @IsNotEmpty()
  @IsString()
  interestType!: string

  @IsNotEmpty()
  @IsDecimal()
  interestRate!: number

  @IsNotEmpty()
  @IsInt()
  quotesNumber!: number

  @IsNotEmpty()
  @IsString()
  period!: string

}