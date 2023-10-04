import { Role } from "src/roles/entities/role.entity";
import { User } from "src/users/Entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('business')
export class Business {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false })
    name: string;
    @Column({default:""})
    logo_URL: string;
    @Column({default:""})
    cover_URL: string;
    @Column({ default: false,nullable:false })
    isActive: boolean;
    @Column()
    tag: string;
    @Column()
    description: string;
    @Column({default:"",nullable:false})
    slug: string;
    @ManyToOne(() => User, user => user.id)
    owner: User;
    @Column({ nullable: false })
    category: string;
    @Column({ default: 0 })
    plan: number;
    @Column({nullable:false})
    province:string;
    @Column({nullable:false})
    town:string;
    @Column({nullable:false})
    street:string;
    @Column({default:false})
    delivery:boolean;
    @Column()
    deliveryLocation:string;    
    @CreateDateColumn({type:'timestamp'})
    created_at: Date; 
    @Column({ type: 'timestamp',nullable:true})
    lastPayment: Date;
    @Column({ type: 'timestamp',nullable:true})
    nextPayment: Date;
}
