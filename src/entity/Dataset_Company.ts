import {
    Entity,
    ObjectIdColumn,
    Column,
} from "typeorm";
@Entity()
export class Dataset_Company {

    @ObjectIdColumn()
    id: number;

    @Column()
    company:string

    @Column()
    faculty:string

    @Column()
    year: string;

    @Column()
    salary: number

    @Column()
    amount : number

}
