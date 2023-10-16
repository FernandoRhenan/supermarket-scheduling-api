import companyService from '../services/CompanyService.js'
import CompanyEntity from '../entities/CompanyEntity.js'
import DefaultHTTPReturn from '../utils/returnTypes/DefaultHTTPReturn.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

class CompanyController {

	async checkCnpj(req) {

		const { cnpj } = req

		const { error, message, state } = new CompanyEntity({ cnpj }).validateCnpj()

		if (error) {
			return new DefaultHTTPReturn({ statusCode: 400, message, error, state })
		}

		const data = await companyService.checkCnpj(cnpj)
		return data
	}

	async register(body) {

		const company = new CompanyEntity(body)

		const { message, error, state } = company.validateAll()

		if (error) {
			return new DefaultHTTPReturn({ statusCode: 400, message, error, state })
		}

		const hash = bcrypt.hashSync(company.password, 8);
		company.password = hash

		const data = await companyService.register(company)
		return data

	}

	async sendEmailValidation(token) {

		const data = await companyService.sendEmailValidation(token)
		return data

	}

	async confirmEmail(token) {

		const data = await companyService.confirmEmail(token)
		return data

	}

	async login(body) {

		const { cnpj, password } = body

		const company = new CompanyEntity({ cnpj, password })
		const cnpjValidation = company.validateCnpj()
		const passValidation = company.validatePassword()

		if (cnpjValidation.error || passValidation.error) {
			return new DefaultHTTPReturn({ statusCode: 400, message: 'Credenciais inválidas', error: true, state: 'error' })
		}

		const data = await companyService.login(body)
		return data

	}
}

export default new CompanyController()
