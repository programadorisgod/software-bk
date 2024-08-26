var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// These decorators are used to validate data in objects or classes.
// @IsEmail() is used to validate that the value of the field is a valid email address.
// @IsInt() is used to validate that the field value is an integer.
// @IsNotEmpty() is used to ensure that the field value is not empty.
// @Length(min, max) is used to validate that the field value is a specific length.
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
export class RegisterDto {
}
__decorate([
    IsNotEmpty(),
    Length(6, 12),
    IsString(),
    __metadata("design:type", String)
], RegisterDto.prototype, "id", void 0);
__decorate([
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], RegisterDto.prototype, "name", void 0);
__decorate([
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], RegisterDto.prototype, "lastName", void 0);
__decorate([
    IsEmail(),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    IsNotEmpty(),
    IsString(),
    Length(10, 10),
    __metadata("design:type", String)
], RegisterDto.prototype, "phoneNumber", void 0);
__decorate([
    IsNotEmpty(),
    Length(8, 30),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
