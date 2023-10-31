import GrandRoute from './GrandRoute.js'
import companyController from '../controllers/CompanyController.js'
import verifyToken from '../middlewares/VerifyJWT.js'

class CompanyRoutes extends GrandRoute {
	constructor() {
		super()
		this.initializeRoutes()
	}

	initializeRoutes() {

		this.router.get('/check-cnpj/:cnpj', async (req, res) => {
			const { cnpj } = req.params
			const data = await companyController.checkCnpj({ cnpj })
			res.status(data.statusCode).json(data)
		})

		this.router.post('/register', async (req, res) => {
			const body = req.body
			const data = await companyController.register(body)
			res.status(data.statusCode).json(data)
		})

		this.router.post('/send-email-validation', async (req, res) => {
			const token = req.body.token

			const data = await companyController.sendEmailValidation(token)
			res.status(data.statusCode).json(data)
		})

		this.router.patch('/confirm-email', async (req, res) => {
			const { token } = req.body

			const data = await companyController.confirmEmail(token)
			res.status(data.statusCode).json(data)
		})

		this.router.post('/login', async (req, res) => {
			const body = req.body
			const data = await companyController.login(body)
			res.status(data.statusCode).json(data)
		})

		this.router.get('/get-company', verifyToken, async (req, res) => {

			const data = await companyController.getCompany(req.companyId)
			res.status(data.statusCode).json(data)
		})

		this.router.patch('/change-data-company', verifyToken, async (req, res) => {

			const companyId = req.companyId

			const data = await companyController.changeDataCompany({ ...req.body, companyId })
			res.status(data.statusCode).json(data)
		})
	}
}

export default new CompanyRoutes()
