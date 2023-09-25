import axios from 'axios'
import DefaultHTTPReturn from '../utils/returnTypes/DefaultHTTPReturn.js'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

class CompanyService {
	async checkCnpj(cnpj) {
		try {
			const { data } = await axios.get(`https://receitaws.com.br/v1/cnpj/${cnpj}`)

			switch (data.status) {
				case 'ERROR':
					return new DefaultHTTPReturn({ error: true, message: data.message, statusCode: 400 })
				case 'OK':
					const optimizedData = {
						name: data.nome,
						email: data.email,
						phone: data.telefone,
						cnpj: data.cnpj
					}
					return new DefaultHTTPReturn({ error: false, statusCode: 200, data: optimizedData })
				default:
					return new DefaultHTTPReturn({ error: true, message: 'Ocorreu um erro, por favor, tente novamente mais tarde', statusCode: 500 })
			}

		} catch {
			return new DefaultHTTPReturn({ error: true, message: 'Ocorreu um erro, por favor, tente novamente mais tarde', statusCode: 500 })
		}
	}

	async register(company) {

		const { _name, _email, _cnpj, _corporateName, _phone, _altPhone, _password } = company
		try {

			const savedCompany = await prisma.company.create({
				data: {
					name: _name,
					email: _email,
					cnpj: _cnpj,
					corporateName: _corporateName,
					phone: _phone,
					altPhone: _altPhone,
					password: _password
				},
				select: { email: true }
			})

			return new DefaultHTTPReturn({ error: false, statusCode: 200, data: savedCompany })

		} catch {
			return new DefaultHTTPReturn({ error: true, message: 'Ocorreu um erro, por favor, tente novamente mais tarde', statusCode: 500 })

		}
	}
}

export default new CompanyService();
