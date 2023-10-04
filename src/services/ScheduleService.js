import 'dotenv/config.js'
import axios from 'axios'
import DefaultHTTPReturn from '../utils/returnTypes/DefaultHTTPReturn.js'
import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import DateScheduler from '../utils/DateScheduler.js';

class ScheduleService {
	constructor() {
		this.prisma = new PrismaClient();
	}

	async checkAllSchedules() {

		try {
			// Pega a data atual e adiciona mais 1 dia
			const date = new Date(new Date().setUTCDate(new Date().getUTCDate() + 1))

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

		const { date, company_id, frequency, isActive } = schedule

		if (frequency === 'once') {

			try {

				await this.prisma.schedule.create({
					data: { date, company_id, isActive, frequency }
				})

				return new DefaultHTTPReturn({ error: false, statusCode: 200, data: data, message: 'Confirme seu agendamento' })
			} catch {
				return new DefaultHTTPReturn({ error: true, message: 'Ocorreu um erro, por favor, tente novamente mais tarde', statusCode: 500 })
			}

		} else {

			const { data, error, message } = new DateScheduler({ date, frequency, monthRange: 2 }).calcSchedules()

			if (error) {
				return new DefaultHTTPReturn({ error: true, statusCode: 400, message })
			}

			try {
				const dataArray = []
				data.forEach((item) => {
					dataArray.push({ date: item.date, company_id, isActive, frequency })
				});

				await this.prisma.schedule.createMany({
					data: dataArray
				})

				return new DefaultHTTPReturn({ error: false, statusCode: 200, data: data, message: 'Confirme seu agendamento' })
			} catch {
				return new DefaultHTTPReturn({ error: true, message: 'Ocorreu um erro, por favor, tente novamente mais tarde', statusCode: 500 })
			}

		}

	}

	async confirmSchedule(schedule) {

		try {

			await this.prisma.schedule.update({
				where: { id: schedule },
				data: { isActive: true }
			})

			return new DefaultHTTPReturn({ error: false, statusCode: 200, message: 'Agendamento confirmado' })

		} catch {
			return new DefaultHTTPReturn({ error: true, message: 'Ocorreu um erro, por favor, tente novamente mais tarde', statusCode: 500 })
		}

	}

	async confirmSchedules(schedules) {

		try {

			await this.prisma.schedule.updateMany({
				data: { isActive: true },
				where: { id: { in: schedules } }
			})

			return new DefaultHTTPReturn({ error: false, statusCode: 200, message: 'Agendamento confirmado' })

		} catch {
			return new DefaultHTTPReturn({ error: true, message: 'Ocorreu um erro, por favor, tente novamente mais tarde', statusCode: 500 })
		}

	}

}

export default new ScheduleService();
