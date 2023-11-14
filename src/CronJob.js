import { PrismaClient } from "@prisma/client";
import ScheduleEntity from "./entities/ScheduleEntity.js";

class CronJob {
	constructor() {
		this.prisma = new PrismaClient();
	}

	async updateSchedules() {

		const dates = await this.getDateToday()

		dates.forEach(async (item) => {

			if (item.frequency !== 'once') {
				try {
					const { data } = new ScheduleEntity({ date: item.date, frequency: item.frequency, monthRange: 2 }).calcSchedules()

					const count = await this.prisma.schedule.count({
						where: {
							date: data[data.length - 1].date,
							isActive: true
						}
					})

					if (count !== 0) {
						return console.log('Ocorreu um erro na execução do cronjob: Horário já existente ' + data[data.length - 1].date)
					}

					await this.prisma.schedule.create({
						data: {
							date: new Date(data[data.length - 1].date).toISOString(),
							frequency: item.frequency,
							isActive: item.isActive,
							company_id: item.company_id
						}
					})

					console.log(new Date().toISOString() + ' - cron')

				} catch (err) {
					console.log('Ocorreu um erro na execução do cronjob:' + err.message)
				}
			}
		})
	}

	async getDateToday() {

		const date = new Date()
		const minRange = new Date(new Date(date).setUTCHours(0))
		const maxRange = new Date(new Date(date).setUTCHours(23))

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
			},
			select: { company_id: true, date: true, frequency: true, isActive: true }
		})

		return dates
	}

}

export default CronJob
