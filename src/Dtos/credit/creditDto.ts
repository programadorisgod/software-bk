import { IsInt, IsNotEmpty, IsString, } from "class-validator"

export class CreditDto {
  @IsNotEmpty()
  @IsString()
  userId!: string

  @IsNotEmpty()
  @IsString()
  amountApproved!: string

  @IsNotEmpty()
  @IsString()
  interestType!: string

  @IsNotEmpty()
  @IsString()
  interestRate!: string

  @IsNotEmpty()
  @IsInt()
  quotesNumber!: number

  @IsNotEmpty()
  @IsString()
  period!: string

}