import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator"

export class infoUserDto{

    @IsNotEmpty()
    @IsString()
    @Length(6,12)
    idUser!: string
    
    @IsNotEmpty()
    @IsString()
    name!: string

    @IsNotEmpty()
    @IsString()
    lastName!: string

    @IsNotEmpty()
    @IsString()
    @Length(10, 10)
    phoneNumber!: string

    @IsNumber()
    balance!:number

}