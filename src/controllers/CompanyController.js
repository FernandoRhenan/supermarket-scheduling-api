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

	async sendEmailValidation(credentials) {

		const { email, id } = credentials

		const company = new CompanyEntity({ email })

		const { message, error, state } = company.validateEmail()

		if (error) {
			return new DefaultHTTPReturn({ statusCode: 400, message, error, state })
		}

		const token = jwt.sign({ email, id }, process.env.JWT_SECRET, { expiresIn: '1d' });

		const data = await companyService.sendEmailValidation({ email, token })
		return data

	}

	async confirmEmail(token) {

		try {
			const { email, id } = jwt.verify(token, process.env.JWT_SECRET);

			const data = await companyService.confirmEmail({ email, id })
			return data

		} catch {
			return new DefaultHTTPReturn({ statusCode: 500, message: 'Ocorreu um erro, por favor, tente novamente mais tarde', error: true, state: 'error' })
		}

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
