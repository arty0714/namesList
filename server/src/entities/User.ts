import { 
	Column, 
	PrimaryGeneratedColumn, 
	Entity, 
	BaseEntity,
	OneToMany
} from "typeorm";
import NamesOrder from "./NamesOrder";

@Entity('user')
class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	password: string;

	@OneToMany(() => NamesOrder, namesOrder => namesOrder.user, {
		onDelete: 'CASCADE'
	})
	names: NamesOrder[];
}

export default User;
