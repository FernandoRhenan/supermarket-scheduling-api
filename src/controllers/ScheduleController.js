import ScheduleEntity from '../entities/ScheduleEntity.js'
import DefaultHTTPReturn from '../utils/returnTypes/DefaultHTTPReturn.js'
import scheduleService from '../services/ScheduleService.js'

class ScheduleController {

	async checkAllSchedules() {

		const data = await scheduleService.checkAllSchedules()
		return data

	}

	async createSchedule(body) {

		const { date, company_id, frequency } = body

		const schedule = new ScheduleEntity({ date, company_id, frequency })
		const { error, message } = schedule.validateAll()
		if (error) {
			return new DefaultHTTPReturn({ statusCode: 400, message, error })
		}

		// Se for um agendamento unico, é chamado o service 'createSchedule', se não, é chamado o 'createSchedules'
		if (frequency === 'once') {
			const data = await scheduleService.createSchedule({ ...body, isActive: true })
			return data
		} else {
			const data = await scheduleService.createSchedules({ ...body, isActive: true })
			return data
		}

	}

	async cancelSchedule(schedules) {

		if (typeof schedules !== 'object') {
			return new DefaultHTTPReturn({ statusCode: 400, message: 'Identificador inválido', error: true })
		}

		if (schedules.length > 1) {
			schedules.forEach((item) => {
				if (typeof item !== 'number') {
					return new DefaultHTTPReturn({ statusCode: 400, message: 'Identificador inválido', error: true })
				}
			})

			const data = await scheduleService.cancelSchedules(schedules)
			return data

		} else if (schedules.length == 1) {
			if (typeof schedules[0] !== 'number') {
				return new DefaultHTTPReturn({ statusCode: 400, message: 'Identificador inválido', error: true })
			}
			const data = await scheduleService.cancelSchedule(schedules[0])
			return data

		} else {
			return new DefaultHTTPReturn({ statusCode: 400, message: 'Identificador inválido', error: true })
		}

	}

}

export default new ScheduleController()
