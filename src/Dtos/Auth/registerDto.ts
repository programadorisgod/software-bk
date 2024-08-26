// These decorators are used to validate data in objects or classes.
// @IsEmail() is used to validate that the value of the field is a valid email address.
// @IsInt() is used to validate that the field value is an integer.
// @IsNotEmpty() is used to ensure that the field value is not empty.
// @Length(min, max) is used to validate that the field value is a specific length.
import { IsEmail, IsInt, IsNotEmpty, IsString, Length } from "class-validator"

export class RegisterDto {
  @IsNotEmpty()
  @Length(6, 12)
  @IsInt()
  id!: string

  @IsNotEmpty()
  @IsString()
  name!: string

  @IsNotEmpty()
  @IsString()
  lastName!: string
  
  @IsEmail()
  email!: string

  @IsNotEmpty()
  @IsString()
  @Length(10, 10)
  phoneNumber!: string

  @IsNotEmpty()
  @Length(8, 30)
  password!: string

  //validations will be posted later, as there is no biometric verification at the moment.
  faceImage: string | undefined
}
