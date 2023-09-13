import express, { urlencoded } from 'express';
import userRoutes from './routes/UserRoutes.js';

class App {
	constructor() {
		this.app = express();
		this.config();
		this.routes()
	}

	config() {
		this.app.use(urlencoded({ extended: true }));
		this.app.use(express.json());
	}

	routes() {
		this.app.use('/users', userRoutes.router);
	}

}

export default new App().app;


// Crie uma instância da classe de roteador


