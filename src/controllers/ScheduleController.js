import ScheduleEntity from '../entities/ScheduleEntity.js'
import DefaultHTTPReturn from '../utils/returnTypes/DefaultHTTPReturn.js'
import scheduleService from '../services/ScheduleService.js'

class ScheduleController {

	async checkAllSchedules() {

		const data = await scheduleService.checkAllSchedules()
		return data

	}

	async createSchedule(body) {

		const { date, company_id, frequency, isActive } = body

		const schedule = new ScheduleEntity({ date, company_id, frequency, isActive })
		const { error, message } = schedule.validateAll()
		if (error) {
			return new DefaultHTTPReturn({ statusCode: 400, message, error })
		}
		const data = await scheduleService.createSchedule(body)
		return data

	}

}

export default new ScheduleController()
