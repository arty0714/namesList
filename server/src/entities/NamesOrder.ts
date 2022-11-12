import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	BaseEntity,
	ManyToOne,
	JoinColumn
} from "typeorm";
import Name from "./Name";
import User from "./User";

@Entity('namesOrder')
class NamesOrder extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User, (user: User) => user.names, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'user_id' })
	user: User;

	@ManyToOne(() => Name, (name: Name) => name.users, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'name_id' })
	name: Name;

	@Column()
	orderVal: number;
}

export default NamesOrder;