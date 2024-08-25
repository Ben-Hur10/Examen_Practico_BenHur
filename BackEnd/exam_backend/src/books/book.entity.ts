import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'books'})
export class Book{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string;

    @Column()
    author:string;

    @Column( {unique:true} )
    isbn:string;

    @Column({ type: 'date' })
    release_date: Date;

    @Column()
    userId:number;

    @ManyToOne(() => User, (user) => user.books)
    user:User;
}