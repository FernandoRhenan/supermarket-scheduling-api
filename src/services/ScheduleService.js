import 'dotenv/config.js'
import axios from 'axios'
import DefaultHTTPReturn from '../utils/returnTypes/DefaultHTTPReturn.js'
import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import ScheduleEntity from '../entities/ScheduleEntity.js';

class ScheduleService {
	constructor() {
		this.prisma = new PrismaClient();
	}

	async checkAllSchedules() {

		try {
			const { minRange, maxRange } = new ScheduleEntity({ monthRange: 2 }).monthRange()

			const dates = await this.prisma.schedule.findMany({
				where: {
					AND: [
						{
							date: {
								gte: minRange.toISOString(),
							},
						},
						{
							date: {
								lte: maxRange.toISOString()
							}
						}
					],
					isActive: true
				},
				select: { date: true, id: true }
			})

			return new DefaultHTTPReturn({ error: false, statusCode: 200, data: { dates }, state: 'success' })

		} catch {
			return new DefaultHTTPReturn({ error: true, message: 'Ocorreu um erro, por favor, tente novamente mais tarde', statusCode: 500, state: 'error' })
		}
	}

	async createSchedule(schedule) {

		const { date, company_id, frequency, isActive } = schedule

		try {

			const count = await this.prisma.schedule.count({
				where: {
					date,
					isActive: true
				}
			})

			if (count !== 0) {
				return new DefaultHTTPReturn({ error: true, message: 'Horário indisponível', statusCode: 400, state: 'error' })
			}

			await this.prisma.schedule.create({
				data: { date, company_id, isActive, frequency },
			})

			return new DefaultHTTPReturn({ error: false, statusCode: 200, message: 'Agendamento criado', state: 'success' })
		} catch {
			return new DefaultHTTPReturn({ error: true, message: 'Ocorreu um erro, por favor, tente novamente mais tarde', statusCode: 500, state: 'error' })
		}
	}

	async createSchedules(schedule) {

		const { date, company_id, frequency, isActive } = schedule

		// Classe que gera os seguintes agendamentos baseado nos parâmentros
		const { data, error, message } = new ScheduleEntity({ date, frequency, monthRange: 2 }).calcSchedules()

		if (error) {
			return new DefaultHTTPReturn({ error: true, statusCode: 400, message, state: 'error' })
		}

		try {
			const dataArray = []
			const dateArray = []
			data.forEach((item) => {
				dateArray.push(item.date)
				dataArray.push({ date: item.date, company_id, isActive, frequency })
			});
			const count = await this.prisma.schedule.count({
				where: {
					date: { in: dateArray },
					isActive: true
				}
			})

			if (count !== 0) {
				return new DefaultHTTPReturn({ error: true, message: 'Horário indisponível', statusCode: 400, state: 'error' })
			}

			// Cria vários agendamentos baseado no resultado indicado pelo 'DateScheduler'
			await this.prisma.schedule.createMany({
				data: dataArray
			})

			return new DefaultHTTPReturn({ error: false, statusCode: 200, message: 'Agendamento criado', state: 'success' })
		} catch {
			return new DefaultHTTPReturn({ error: true, message: 'Ocorreu um erro, por favor, tente novamente mais tarde', statusCode: 500, state: 'error' })
		}
	}

	async cancelSchedule(schedule) {

		try {

			await this.prisma.schedule.update({
				where: { id: schedule },
				data: { isActive: false }
			})

			return new DefaultHTTPReturn({ error: false, statusCode: 200, message: 'Agendamento cancelado', state: 'success' })

		} catch {
			return new DefaultHTTPReturn({ error: true, message: 'Ocorreu um erro, por favor, tente novamente mais tarde', statusCode: 500, state: 'error' })
		}
	}

	async cancelSchedules(schedules) {

		try {

			await this.prisma.schedule.updateMany({
				data: { isActive: false },
				where: { id: { in: schedules } }
			})

			return new DefaultHTTPReturn({ error: false, statusCode: 200, message: 'Agendamento cancelado', state: 'success' })

		} catch {
			return new DefaultHTTPReturn({ error: true, message: 'Ocorreu um erro, por favor, tente novamente mais tarde', statusCode: 500, state: 'error' })
		}

	}

	async getCompanySchedule(company_id) {

		try {

			const data = await this.prisma.schedule.findMany({
				where: {
					company_id
				},
				select: { isActive: true, date: true, frequency: true, id: true, company_id: true }
			})

			return new DefaultHTTPReturn({ error: false, statusCode: 200, data, state: 'success' })

		} catch {
			return new DefaultHTTPReturn({ error: true, message: 'Ocorreu um erro, por favor, tente novamente mais tarde', statusCode: 500, state: 'error' })
		}
	}
}


export default new ScheduleService();
