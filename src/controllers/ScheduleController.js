import ScheduleEntity from '../entities/ScheduleEntity.js'
import DefaultHTTPReturn from '../utils/returnTypes/DefaultHTTPReturn.js'
import scheduleService from '../services/ScheduleService.js'
import CompareData from '../utils/CompareData.js'

class ScheduleController {

	async checkAllSchedules() {

		const data = await scheduleService.checkAllSchedules()
		return data

	}

	async createSchedule(body) {

		const { date, company_id, frequency } = body

		const { error, message } = new ScheduleEntity({ date, frequency, monthRange: 2 }).validateAll()

		const { error: error2, message: message2 } = new CompareData({ value1: company_id, type: 'number' }).compareOneType()

		if (error || error2) {
			return new DefaultHTTPReturn({ statusCode: 400, message: message || message2, error: error || error2 })
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

		const { error, message } = new CompareData({ value1: schedules, type: 'object' }).compareOneType()

		if (error) {
			return new DefaultHTTPReturn({ statusCode: 400, message, error })
		}


		if (schedules.length > 1) {
			schedules.forEach((item) => {
				const { error, message } = new CompareData({ value1: item, type: 'number' }).compareOneType()

				if (error) {
					return new DefaultHTTPReturn({ statusCode: 400, message, error })
				}
			})

			const data = await scheduleService.cancelSchedules(schedules)
			return data

		} else if (schedules.length == 1) {

			const { error, message } = new CompareData({ value1: schedules[0], type: 'number' }).compareOneType()

			if (error) {
				return new DefaultHTTPReturn({ statusCode: 400, message, error })
			}

			const data = await scheduleService.cancelSchedule(schedules[0])
			return data

		} else {
			return new DefaultHTTPReturn({ statusCode: 400, message: 'Identificador inválido', error: true })
		}

	}

	async getCompanySchedule(company_id1, company_id2) {

		const { error, message } = new CompareData({ data1: company_id1, data2: company_id2, type: 'number' }).compareTwoStrict()

		if (error) {
			return new DefaultHTTPReturn({ statusCode: 400, message, error })
		}

		const data = await scheduleService.getCompanySchedule(company_id1)
		return data

	}


}

export default new ScheduleController()
