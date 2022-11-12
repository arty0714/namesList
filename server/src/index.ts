import express from "express";
import { createConnection } from "typeorm";
import dotenv from 'dotenv';

dotenv.config();

import authRoute from "./router/authRoute";
import userRoute from './router/userRoute';
import Name from "./entities/Name";
import User from "./entities/User";
import NamesOrder from "./entities/NamesOrder";

createConnection({
	type: 'mysql',
	database: process.env.DB_NAME,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	entities: [Name, User, NamesOrder],
	logging: true,
	synchronize: true
})
console.log(process.env.JWT_SECRET)


const app = express();

app.listen(5000, () => {
	console.log("Server listening");
});

app.use(express.json());

app.use("/api/auth", authRoute);
app.use('/api/user', userRoute);