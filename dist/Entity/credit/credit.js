var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseEntity, Column, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "@Entity/user/user";
export class Credit extends BaseEntity {
}
__decorate([
    PrimaryColumn({ type: "varchar" }),
    __metadata("design:type", String)
], Credit.prototype, "idCredit", void 0);
__decorate([
    Column({ type: "decimal" }),
    __metadata("design:type", Number)
], Credit.prototype, "principalAmount", void 0);
__decorate([
    Column({ type: "decimal" }),
    __metadata("design:type", Number)
], Credit.prototype, "interestRate", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], Credit.prototype, "interestType", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], Credit.prototype, "gradientType", void 0);
__decorate([
    Column({ type: "decimal" }),
    __metadata("design:type", Number)
], Credit.prototype, "gradientValue", void 0);
__decorate([
    Column({ type: "integer" }),
    __metadata("design:type", Number)
], Credit.prototype, "term", void 0);
__decorate([
    Column({ type: "timestamp" }),
    __metadata("design:type", Date)
], Credit.prototype, "starDate", void 0);
__decorate([
    Column({ type: "timestamp" }),
    __metadata("design:type", Date)
], Credit.prototype, "endDate", void 0);
__decorate([
    Column({ type: "decimal" }),
    __metadata("design:type", Number)
], Credit.prototype, "totalAmountDue", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], Credit.prototype, "status", void 0);
__decorate([
    Column({ type: "timestamp" }),
    __metadata("design:type", Date)
], Credit.prototype, "createdAt", void 0);
__decorate([
    Column({ type: "timestamp" }),
    __metadata("design:type", Date)
], Credit.prototype, "updateAr", void 0);
__decorate([
    Column({ type: "decimal" }),
    __metadata("design:type", Number)
], Credit.prototype, "tirType", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], Credit.prototype, "uvrType", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], Credit.prototype, "investmentAlternativeType", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], Credit.prototype, "bondType", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], Credit.prototype, "inflationType", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.credit),
    __metadata("design:type", User)
], Credit.prototype, "users", void 0);
