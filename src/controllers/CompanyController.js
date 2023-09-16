import companyService from '../services/CompanyService.js'
import CompanyEntity from '../entities/CompanyEntity.js'
import DefaultHTTPReturn from '../utils/returnTypes/DefaultHTTPReturn.js'

class CompanyController {
	async getAllUsers(req) {

		const { cnpj } = req

		const { error, message } = new CompanyEntity().validateCnpj(cnpj)

		if (error) {
			return new DefaultHTTPReturn({ statusCode: 400, message, error })
		}

		const data = await companyService.getAllUsers(req)
		return data
	}
}

export default new CompanyController()
