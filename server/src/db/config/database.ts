import { Sequelize } from "sequelize";
require('dotenv').config();

export const sequelizeDB = new Sequelize(
	process.env.DB_NAME || '',
	process.env.DB_USER || '',
	process.env.DB_PASSWORD || '',
	{
		host: process.env.DB_HOST || '',
		dialect: "postgres",
		timezone: "+05:45",
		logging: false,
	}
);

export class SequelizeClass {
	async syncDatabase() {
		try {
			console.log("Database connection has been established successfully.");
			await sequelizeDB.sync();
		} catch (error) {
			console.error("Unable to connect to the database:", error);
		}
	}
}