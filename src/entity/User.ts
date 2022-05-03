import { Entity, PrimaryGeneratedColumn, Column, ViewEntity, Index} from "typeorm"
import { Geometry } from "geojson";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

}
@Entity()
export class socioambientais {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    gid: number

    @Column({
        type:"varchar",
        length: 100,
        collation: "default",
    })
    tipo: string

    @Column({
        type:"varchar",
        length: 255,
        collation: "default",
    })
    nome: string

    @Column()
    codigo: number

    @Index({ spatial: true })
    @Column({
        type: 'geometry',
        spatialFeatureType: 'MultiPolygon', 
        srid: 4674,
        nullable: true,
    })
    geom: Geometry
}

