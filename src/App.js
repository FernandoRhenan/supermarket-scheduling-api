import express, { urlencoded } from 'express'
import userRoutes from './routes/CompanyRoutes.js'
import companyRoutes from './routes/CompanyRoutes.js'

class App {

	prefix = '/api/v1'
	constructor() {
		this.app = express()
		this.config()
		this.routes()
	}

	config() {
		this.app.use(urlencoded({ extended: true }))
		this.app.use(express.json())
	}

	routes() {
		this.app.use(`${this.prefix}/company`, companyRoutes.router)
	}
}

export default new App().app

// Crie uma instância da classe de roteador
