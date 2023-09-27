import GrandRoute from './GrandRoute.js'
import companyController from '../controllers/CompanyController.js'

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
			const credentials = req.body

			const data = await companyController.sendEmailValidation(credentials)
			res.status(data.statusCode).json(data)
		})

		this.router.post('/confirm-email', async (req, res) => {
			const { token } = req.body
			const data = await companyController.confirmEmail(token)
			res.status(data.statusCode).json(data)
		})
	}
}

export default new CompanyRoutes()
