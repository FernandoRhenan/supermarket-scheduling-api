import GrandRoute from './GrandRoute.js'
import scheduleController from '../controllers/ScheduleController.js'
import verifyToken from '../middlewares/VerifyJWT.js'

class ScheduleRoutes extends GrandRoute {
	constructor() {
		super()
		this.initializeRoutes()
	}

	initializeRoutes() {

		this.router.get('/check-month-schedules/:month', async (req, res) => {

			const data = await scheduleController.checkMonthSchedules(req.params.month)
			res.status(data.statusCode).json(data)
		})

		this.router.post('/create-schedule', verifyToken, async (req, res) => {
			const body = { ...req.body, company_id: req.companyId }
			const data = await scheduleController.createSchedule(body)
			res.status(data.statusCode).json(data)
		})

		this.router.patch('/confirm-schedule', verifyToken, async (req, res) => {
			const data = await scheduleController.confirmSchedule(req.body.schedule)
			res.status(data.statusCode).json(data)
		})

	}

}

export default new ScheduleRoutes()
