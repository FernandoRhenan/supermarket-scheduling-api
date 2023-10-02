import 'dotenv/config.js'
import axios from 'axios'
import DefaultHTTPReturn from '../utils/returnTypes/DefaultHTTPReturn.js'
import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

class ScheduleService {
	constructor() {
		this.prisma = new PrismaClient();
	}

	async checkAllSchedules() {

		try {
			// Pega a data atual e adiciona mais 1 dia
			const date = new Date(new Date().setDate(new Date().getDate() + 1))

			const dates = await this.prisma.schedule.findMany({
				where: {
					date: { gt: date.toISOString() },
					isActive: true
				},
				select: { date: true, id: true }
			})

			return new DefaultHTTPReturn({ error: false, statusCode: 200, data: { dates } })

		} catch {
			return new DefaultHTTPReturn({ error: true, message: 'Ocorreu um erro, por favor, tente novamente mais tarde', statusCode: 500 })
		}

	}

	async createSchedule(schedule) {

		// const usersToInsert = [
		// 	{ name: 'Alice', email: 'alice@example.com' },
		// 	{ name: 'Bob', email: 'bob@example.com' },
		// 	{ name: 'Charlie', email: 'charlie@example.com' },
		// ];

		// async function insertUsers() {
		// 	try {
		// 		const insertedUsers = await prisma.user.createMany({
		// 			data: usersToInsert,
		// 		});

		switch (schedule.frequency) {
			case 'once':
				try {
					await this.prisma.schedule.create({
						data: { date: schedule.date, frequency: schedule.frequency, isActive: schedule.isActive, company_id: schedule.company_id },
					})
					return new DefaultHTTPReturn({ error: false, statusCode: 200, message: 'Agendamento criado' })
				} catch {
					return new DefaultHTTPReturn({ error: true, message: 'Ocorreu um erro, por favor, tente novamente mais tarde', statusCode: 500 })
				}
			case 'weekly':
			case 'biweekly':
			case 'monthly':
			case 'bimonthly':
		}






	}

}

export default new ScheduleService();
