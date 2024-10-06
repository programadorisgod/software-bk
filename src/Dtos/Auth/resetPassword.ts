import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class resetPasswordDto {
  @IsNotEmpty()
  @IsString()
  token!: string
  @IsEmail()
  email!: string
  @IsNotEmpty()
  @Length(8, 30)
  newPassword!: string
  @IsNotEmpty()
  @IsString()
  ip!: string
  @IsNotEmpty()
  @IsString()
  userAgent!: string
}
