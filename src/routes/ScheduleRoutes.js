import GrandRoute from './GrandRoute.js'
import scheduleController from '../controllers/ScheduleController.js'
import verifyToken from '../middlewares/VerifyJWT.js'
import isAdmin from '../middlewares/isAdmin.js'

class ScheduleRoutes extends GrandRoute {
	constructor() {
		super()
		this.initializeRoutes()
	}

	initializeRoutes() {

		this.router.get('/check-all-schedules', verifyToken, isAdmin, async (req, res) => {

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

		this.router.patch('/active-schedule', verifyToken, async (req, res) => {
			const data = await scheduleController.activeSchedule(req.body.schedule)
			res.status(data.statusCode).json(data)
		})

		this.router.get('/get-company-schedule', verifyToken, async (req, res) => {

			const company_id = req.companyId

			const data = await scheduleController.getCompanySchedule(company_id)
			res.status(data.statusCode).json(data)
		})

		this.router.get('/check-schedule/:date', verifyToken, async (req, res) => {

			const date = req.params.date

			const data = await scheduleController.checkSchedule(date)
			res.status(data.statusCode).json(data)
		})

	}

}

export default new ScheduleRoutes()
