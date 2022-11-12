import NamesOrder from '../entities/NamesOrder';
import Name from '../entities/Name';
import User from '../entities/User';

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

export const getNames = async (req: Request, res: Response, next: any) => {
	const namesOrderRepository = getRepository(NamesOrder);
	
	interface Name {
		id: number,
		name: string,
		orderVal: number
	}

	let result: Name[] = [];
	const userId: number = req.body.user.id;

	try {
		result = await namesOrderRepository.createQueryBuilder('namesOrder')
			.innerJoin('namesOrder.user', 'user')
			.innerJoin('namesOrder.name', 'name')
			.select(['name.id as id', 'name.name as name', 'namesOrder.orderVal as orderVal'])
			.orderBy('orderVal')
			.where('user_id = :userId', { userId })
			.getRawMany()
	} catch (error) {
		next(error);
	}

	res.status(200).json(result);
}

export const addName = async (req: Request, res: Response, next: any) => {
	const name = req.body.name;
	const userId: number = req.body.user.id;

	const userRepository = getRepository(User);
	const nameRepository = getRepository(Name);
	const namesOrderRepository = getRepository(NamesOrder);

	try {
		await nameRepository.insert({ name });
	} catch (error) {
		next(error);
	}

	try {
		const users = await userRepository.find();
		const nameObj = await nameRepository.findOne({ where: { name } });
		const maxRank = await namesOrderRepository.createQueryBuilder('namesOrder')
			.select('MAX(namesOrder.orderVal)', 'max')
			.where('namesOrder.user_id = :userId', { userId })
			.getRawOne();

		for (let i = 0; i < users.length; ++i) {
			const user = users[i];

			await namesOrderRepository.insert({
				name: nameObj as Name,
				user,
				orderVal: maxRank.max + 1
			});
		}
	} catch (error) {
		next(error);
	}

	res.status(200).send('access');
}

export const changeNameOrder = async (req: Request, res: Response, next: any) => {
	const { oldPos, newPos } = req.body;
	let names: any;
	const userId: number = req.body.user.id;


	const namesOrderRepository = getRepository(NamesOrder);

	try {
		names = await namesOrderRepository.find({
			relations: ['user'],
			where: {
				user: {
					id: userId
				}
			},
			order: { orderVal: 'ASC' }
		});
	} catch (error) {
		next(error);
	}

	names[oldPos].orderVal = names[newPos].orderVal;

	if (oldPos > newPos) {
		for (let i = oldPos - 1; i >= newPos; --i) {
			names[i].orderVal++
		}
	} else if (newPos > oldPos) {
		for (let i = oldPos + 1; i <= newPos; ++i) {
			names[i].orderVal--;
		}
	}

	try {
		names.forEach(async (elem: any) => {
			await namesOrderRepository.update({
				id: elem.id
			}, {
				orderVal: elem.orderVal
			});
		});
	} catch (error) {
		next(error);
	}

	res.status(200).send('success');
}

export const deleteName = async (req: Request, res: Response, next: any) => {
	let result: any;

	const id = parseInt(req.params.id);

	const nameRepository = getRepository(Name);

	try {
		result = await nameRepository.delete({ id });
	} catch(error) {
		next(error);
	}

	res.status(200).send('success');
}

export const updateName = async (req: Request, res: Response, next: any) => {
	let result: any;

	const name = req.body.name;
	const id = parseInt(req.params.id);

	const nameRepository = getRepository(Name);

	try {
		result = await nameRepository.update({ id }, { name });
	} catch (error) {
		next(error);
	}

	res.status(200).send('success');
}