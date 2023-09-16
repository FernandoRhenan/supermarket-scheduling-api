import axios from 'axios'
import CompanyEntity from '../entities/CompanyEntity.js'
import DefaultHTTPReturn from '../utils/returnTypes/DefaultHTTPReturn.js'

class CompanyService {
	async getAllUsers(req, res) {
		const company = await axios.get(`https://receitaws.com.br/v1
		/cnpj/47960950000121`)

		return new DefaultHTTPReturn({ error: true, message: 'Ocorreu um error', statusCode: 503 })
	}
}

export default new CompanyService();
