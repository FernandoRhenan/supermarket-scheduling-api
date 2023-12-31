import express, { urlencoded } from 'express'
import companyRoutes from './routes/CompanyRoutes.js'
import scheduleRoutes from './routes/ScheduleRoutes.js'
import cors from 'cors'
import CronJob from './CronJob.js'
import cron from 'node-cron'

class App {

	prefix = '/api/v1'
	constructor() {
		this.app = express()
		this.config()
		this.routes()
		// this.cron()
	}

	config() {

		const corsOptions = {
			origin: process.env.SITE_URL,
			methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
			credentials: true, // Permite cookies e autenticação
			optionsSuccessStatus: 204, // Código de status de sucesso para requisições OPTIONS
		};

		this.app.use(urlencoded({ extended: true }))
		this.app.use(express.json())
		this.app.use(cors(corsOptions))
	}

	routes() {
		this.app.use(`${this.prefix}/company`, companyRoutes.router)
		this.app.use(`${this.prefix}/schedule`, scheduleRoutes.router)
	}

	cron() {

		cron.schedule('0 01 * * *', async () => {

			const cronJob = new CronJob()
			await cronJob.updateSchedules()

		}, {
			scheduled: true,
			timezone: "America/Sao_Paulo",
			runOnInit: true
		});

	}

}

export default new App().app

// Crie uma instância da classe de roteador
