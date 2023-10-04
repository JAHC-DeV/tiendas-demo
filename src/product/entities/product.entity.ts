import { Business } from "src/business/entities/business.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable:false})
    name: string;
    @Column({nullable:false})
    slug: string;
    @Column({default:""})
    description: string;
    @Column({default:""})
    internal_description: string;
    @Column({default:""})
    category: string;
    @Column({default:""})
    photo_URL: string;
    
    @Column({default:0, type:"int"})
    amount: number;
    @Column({default:0, type:"double"})
    final_price: number;
    @Column({default:0, type:"double"})
    price_cost: number;
    @Column({default:0, type:"double"})
    pricePeerQuantity: number;
    
    @Column({default:false})
    isBox: boolean;
    @Column({default:0, type:"int"})
    lote_Box: number; //Cantidad que trae una caja 

    @Column({default:0, type:"int"})
    amount_store: number; //Cantidad en el almacén

    @ManyToOne(() => Business, business => business.products)
    owner: Business;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

}
