import companyService from '../services/CompanyService.js'
import CompanyEntity from '../entities/CompanyEntity.js'
import DefaultHTTPReturn from '../utils/returnTypes/DefaultHTTPReturn.js'
import bcrypt from 'bcryptjs'

class CompanyController {

	async checkCnpj(req) {

		const { cnpj } = req

		const { error, message } = new CompanyEntity({ cnpj }).validateCnpj()

		if (error) {
			return new DefaultHTTPReturn({ statusCode: 400, message, error })
		}

		const data = await companyService.checkCnpj(cnpj)
		return data
	}

	async register(body) {

		const company = new CompanyEntity(body)

		const { message, error } = company.validateAll()

		if (error) {
			return new DefaultHTTPReturn({ statusCode: 400, message, error })
		}

		const hash = bcrypt.hashSync(company.password, 8);
		company.password = hash

		const data = await companyService.register(company)
		return data

	}
}

export default new CompanyController()
