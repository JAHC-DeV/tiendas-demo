import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({nullable:false,unique:true})
  type: string;
  @Column({default:false})
  isAdmin:boolean;
  @Column({default:false})
  publish:boolean;
  @Column({default:false})
  createUser:boolean;
  @Column({default:false})
  assignUser: boolean
}