import { IsDate, IsInt, IsNotEmpty, IsString, Length } from "class-validator"

export class transferDto{

  @IsString()
  @Length(0,20)
  description!: string

  @IsNotEmpty()
  @IsInt()
  omuntMovement!: number
  
  @IsString()
  @Length(10,10)
  destination!: string

  @IsNotEmpty()
  @IsString()
  @Length(10, 10)
  phoneNumber!:string
}