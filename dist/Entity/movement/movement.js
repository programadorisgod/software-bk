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
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
let Movement = class Movement extends BaseEntity {
};
__decorate([
    PrimaryColumn({ type: "varchar" }),
    __metadata("design:type", String)
], Movement.prototype, "idMovement", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], Movement.prototype, "description", void 0);
__decorate([
    Column({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Movement.prototype, "dateMovement", void 0);
__decorate([
    Column({ type: 'decimal' }),
    __metadata("design:type", Number)
], Movement.prototype, "omuntMovement", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], Movement.prototype, "destination", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.movement),
    __metadata("design:type", User)
], Movement.prototype, "user", void 0);
Movement = __decorate([
    Entity("movements")
], Movement);
export { Movement };
