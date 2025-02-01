import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('orders', {
  schema: 'public',
  synchronize: false
})
class Order {
  @PrimaryGeneratedColumn({ name: 'order_id' })
  order_id!: string;

  @Column({ type: 'varchar', nullable: true })
  name!: string;

  @Column({ type: 'float', nullable: true })
  price!: number;

  @Column({ type: 'bigint', nullable: true })
  qty!: number;
}

export default Order;