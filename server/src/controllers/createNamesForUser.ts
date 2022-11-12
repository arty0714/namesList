import NamesOrder from '../entities/NamesOrder';
import Name from '../entities/Name';

import { getRepository } from 'typeorm';

export const createNamesForUser = async (user: any) => {
	let names: any;
	const nameRepository = getRepository(Name);
	const namesOrderRepository = getRepository(NamesOrder);

	try {
		names = await nameRepository.find();
	} catch (error) {
		throw error;
	}

	for (let i = 0; i < names.length; ++i) {
		const name = names[i];

		try {
			namesOrderRepository.insert({
				user,
				name,
				orderVal: i
			});
		} catch (error) {
			throw error;
		}
	}
}