var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { User } from "@Entity/user/user";
import { BaseEntity, Column, OneToMany, PrimaryColumn } from "typeorm";
export class Bank extends BaseEntity {
}
__decorate([
    PrimaryColumn({ type: "varchar" }),
    __metadata("design:type", String)
], Bank.prototype, "idBank", void 0);
__decorate([
    Column({ type: "decimal" }),
    __metadata("design:type", Number)
], Bank.prototype, "capital", void 0);
__decorate([
    OneToMany(() => User, (user) => user.bank),
    __metadata("design:type", User)
], Bank.prototype, "users", void 0);
