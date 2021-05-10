import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["name"])
export class Character extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column("text")
    public name: string = "";

    @Column("int4")
    public account: number = 0;

    @Column("boolean")
    public goldTransferred: boolean = false;

    @Column("boolean")
    public matsTransferred: boolean = false;

    @Column("boolean")
    public tbc: boolean = false;

    @Column("boolean")
    public classic: boolean = false;
}