import { 
	Entity, 
	PrimaryGeneratedColumn, 
	Column, 
	BaseEntity,
	OneToMany,
} from "typeorm";
import NamesOrder from "./NamesOrder"

@Entity('name')
class Name extends BaseEntity {
	
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@OneToMany(() => NamesOrder, namesOrder => namesOrder.name, {
		onDelete: 'CASCADE'
	})
	users: NamesOrder[];
}

export default Name;