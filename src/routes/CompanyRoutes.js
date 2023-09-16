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
			const data = await companyController.getAllUsers({ cnpj })
			console.log(data)
			res.status(data.statusCode).json(data)
		})
	}
}

export default new CompanyRoutes()
