import GrandRoute from './GrandRoute.js';
import userController from '../controllers/UserController.js';

class UserRoutes extends GrandRoute {
	constructor() {
		super()
		this.initializeRoutes()
	}

	initializeRoutes() {

		this.router.get('/', (req, res) => {
			const { message, error, statusCode, data } = userController.getAllUsers(req)
			res.status(statusCode).json({ message, error, statusCode, data })
		})

	}
}

export default new UserRoutes;




