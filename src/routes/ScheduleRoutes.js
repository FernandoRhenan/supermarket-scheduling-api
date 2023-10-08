import GrandRoute from './GrandRoute.js'
import scheduleController from '../controllers/ScheduleController.js'
import verifyToken from '../middlewares/VerifyJWT.js'

class ScheduleRoutes extends GrandRoute {
	constructor() {
		super()
		this.initializeRoutes()
	}

	initializeRoutes() {

		this.router.get('/check-all-schedules', verifyToken, async (req, res) => {

			const data = await scheduleController.checkAllSchedules()
			res.status(data.statusCode).json(data)
		})

		this.router.post('/create-schedule', verifyToken, async (req, res) => {
			const body = { ...req.body, company_id: req.companyId }
			const data = await scheduleController.createSchedule(body)
			res.status(data.statusCode).json(data)
		})

		this.router.patch('/cancel-schedule', verifyToken, async (req, res) => {
			const data = await scheduleController.cancelSchedule(req.body.schedule)
			res.status(data.statusCode).json(data)
		})

	}

}

export default new ScheduleRoutes()
