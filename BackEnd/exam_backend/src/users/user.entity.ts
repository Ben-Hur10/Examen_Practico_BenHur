import { Book } from "src/books/book.entity"
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"

@Entity({ name:'users'}) 
 export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name: string

    @Column({unique:true})
    email: string

    @Column()
    password: string

    @OneToMany(() => Book, book => book.user)
    books: Book[]

}