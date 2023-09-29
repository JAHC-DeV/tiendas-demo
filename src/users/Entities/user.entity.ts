import { data } from 'cheerio/lib/api/attributes';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Timestamp, BeforeInsert, ManyToOne } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

@Entity('users') // Puedes omitir el nombre si coincide con el nombre de la clase
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
 public name: string;

  @Column({ length: 10, nullable: false })
  nickname: string;

  @Column({ length: 50, unique: true }) // Añadir la opción unique para garantizar correos electrónicos únicos
 public email: string;

  @Column({ length: 500, nullable: false })

  password: string;

  @Column({ default: false })
  isEnable: boolean;

  @Column({ default: false })
  isBan: boolean;
  @ManyToOne(() => Role, role => role.id) // Define la relación muchos a uno con Role
  role: Role;

  @BeforeInsert()
  validateName() {    
    if (!this.name || this.name.trim() === '') {
      throw new Error('El campo "name" es requerido y no puede estar vacío.');
    }
  }
}
