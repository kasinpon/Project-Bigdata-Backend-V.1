import {
    Entity,
    ObjectIdColumn,
    Column,
} from "typeorm";
@Entity()
export class Dataset_Student {

    @ObjectIdColumn()
    id: number;

    @Column()
    university_name:string

    @Column()
    faculty:string

    @Column()
    year: string;

    @Column()
    amount: number

}
