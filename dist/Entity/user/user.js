var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Bank } from "@Entity/bank/bank";
import { Credit } from "@Entity/credit/credit";
import { Movement } from "@Entity/movement/movement";
import { Entity, Column, PrimaryColumn, BaseEntity, OneToMany, ManyToOne } from "typeorm";
//the established inheritance is made for the ease of the methods offered by Typeorm
let User = class User extends BaseEntity {
};
__decorate([
    PrimaryColumn({ type: "varchar" }),
    __metadata("design:type", String)
], User.prototype, "idUser", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Column({ type: 'int' }),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
    Column("simple-array"),
    __metadata("design:type", Array)
], User.prototype, "faceImage", void 0);
__decorate([
    OneToMany(() => Movement, (movement) => movement.user),
    __metadata("design:type", Array)
], User.prototype, "movement", void 0);
__decorate([
    ManyToOne(() => Bank, (bank) => bank.users),
    __metadata("design:type", Bank)
], User.prototype, "bank", void 0);
__decorate([
    OneToMany(() => Credit, (credit) => credit.users),
    __metadata("design:type", Array)
], User.prototype, "credit", void 0);
User = __decorate([
    Entity("users")
], User);
export { User };
