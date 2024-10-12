import { infoUserDto } from "@Dtos/users/userInfoDtos"
import { IsDate, IsNotEmpty, IsNumber, IsObject, IsString, Length } from "class-validator"

export class movementRealizedDto{
    @IsString()
    @IsNotEmpty()
    idMovement!:string
    
    @IsString()
    @Length(0,20)
    description!:string

    @IsDate()
    @IsNotEmpty()
    dateMovement!:Date

    @IsNumber()
    @IsNotEmpty()
    omuntMovement!:number

    @IsNotEmpty()
    @IsObject()
    user!:infoUserDto
    
    @IsString()
    @IsNotEmpty()
    typeTransfer!:string    
} 