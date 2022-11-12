import { Request, Response } from "express";
import { getRepository } from "typeorm";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from "../entities/User";

import { createNamesForUser } from './createNamesForUser';

export const logIn = async (req: Request, res: Response, next: any) => {
	let user: any;

	const { username, password } = req.body;

	const userRepository = getRepository(User);

	if (!username || !password) {
		res.status(400).send('Username or password is null');

		return;
	}

	try {
		user = await userRepository.findOneBy({ name: username });
	} catch (error) {
		next(error);
	}

	if (!user) {
		res.status(400).send('User not found');
	} else {
		const validPass = bcrypt.compare(password, user.password);

		if (!validPass) {
			res.status(400).send('password is incorrect');
		}
		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

		res.status(200).json(token);
	}
}
export const signUp = async (req: Request, res: Response, next: any) => {
	let user: any

	const { username, password } = req.body;

	// Validations

	if (!username) {
		res.status(400).send('username is null');

		return;
	} else if (!password) {
		res.status(400).send('password is null');

		return;
	}

	try {
		user = await User.find({ where: { name: username as string } });
	} catch (error) {
		next(error);
	}

	if (user.length) {
		res.status(400).send('username exists');

		return;
	}

	// Hashing password

	const salt = await bcrypt.genSalt(5);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Registing user

	user = User.create({ name: username, password: hashedPassword });
	try {
		await user.save();
	} catch (error) {
		next(error);
	}

	// Creating list of names for user

	try {
		await createNamesForUser(user);
	} catch (error) {
		next(error);
	}

	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

	res.status(200).json(token);
}