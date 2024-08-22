import { IsNotEmpty, IsString, Length } from "class-validator"

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @Length(10, 10)
  phoneNumber!: string

  @IsNotEmpty()
  @Length(8, 30)
  password!: string
}
