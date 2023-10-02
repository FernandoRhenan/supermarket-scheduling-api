import ScheduleEntity from '../entities/ScheduleEntity.js'
import DefaultHTTPReturn from '../utils/returnTypes/DefaultHTTPReturn.js'
import scheduleService from '../services/ScheduleService.js'

class ScheduleController {

	async checkAllSchedules() {

		const data = await scheduleService.checkAllSchedules()
		return data

	}

	async createSchedule(body) {

		const schedule = new ScheduleEntity(body)
		const { error, message } = schedule.validateAll()

		if (error) {
			return new DefaultHTTPReturn({ statusCode: 400, message, error })
		}

		const data = await scheduleService.createSchedule(schedule)
		return data

	}

}

export default new ScheduleController()
