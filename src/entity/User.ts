import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique:true})
    email:String

    @Column()
    password:String

    @Column({
        nullable:true,
        type: "text"
    })
    logo:String

}
