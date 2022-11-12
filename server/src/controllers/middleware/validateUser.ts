import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const validateUser = (req: Request, res: Response, next: any) => {
	const token: string = req.header('auth-token') || '';

	if(!token) res.status(401).send('access denied')

	try {
		const secret: string = process.env.JWT_SECRET || '';
		
		const verified = jwt.verify(token, secret);
		req.body.user = verified;

		next();
	} catch (error) {
		res.status(401).send('invalid token');
	}
}