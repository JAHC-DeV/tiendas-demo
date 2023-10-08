import { data } from 'cheerio/lib/api/attributes';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Timestamp, BeforeInsert, ManyToOne, OneToOne } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Business } from 'src/business/entities/business.entity';

@Entity('users') // Puedes omitir el nombre si coincide con el nombre de la clase
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  public name: string;

  @Column({ length: 20, nullable: false })
  public nickname: string;

  @Column({ length: 100, unique: true }) // Añadir la opción unique para garantizar correos electrónicos únicos
  public email: string;

  @Column({ length: 500, nullable: false })

  public password: string;

  @Column({ default: false })
  public  isEnable: boolean;

  @Column({ default: false })
  public isBan: boolean;

  @ManyToOne(() => Role, role => role.id) // Define la relación muchos a uno con Role
  public  role: Role;

  @Column({ default: "" })
  public photo_profile: string
  
  @OneToOne(() => Business,business => business.owner)
  public business: Business;

  @BeforeInsert()
  validateName() {
    if (!this.name || this.name.trim() === '') {
      throw new Error('El campo "name" es requerido y no puede estar vacío.');
    }
  }
}
