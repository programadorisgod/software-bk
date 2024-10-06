import { IsEmail, IsNotEmpty, IsString, Matches, ValidateIf } from "class-validator"

export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsString()
  @ValidateIf(o => o.input.includes('@'))
  @IsEmail({},{message: 'Input must be a valid email address'})
  @ValidateIf(o => !o.input.includes('@'))
  @Matches(/^[0-9]{10}$/, { message: 'Input must be a valid 10-digit phone number' })
  input!: string
}
