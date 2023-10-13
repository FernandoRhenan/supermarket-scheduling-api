import 'dotenv/config'
import axios from 'axios'
import DefaultHTTPReturn from '../utils/returnTypes/DefaultHTTPReturn.js'
import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

class CompanyService {
	constructor() {
		this.prisma = new PrismaClient();
	}

	async checkCnpj(cnpj) {
		try {
			const { data } = await axios.get(`https://receitaws.com.br/v1/cnpj/${cnpj}`)

			switch (data.status) {
				case 'ERROR':
					return new DefaultHTTPReturn({ error: true, message: data.message, statusCode: 400, state: 'error' })
				case 'OK':
					const optimizedData = {
						name: data.nome,
						email: data.email,
						phone: data.telefone,
						cnpj: data.cnpj
					}
					return new DefaultHTTPReturn({ error: false, statusCode: 200, data: optimizedData, state: 'success' })
				default:
					return new DefaultHTTPReturn({ error: true, message: 'Ocorreu um erro, por favor, tente novamente mais tarde', statusCode: 500, state: 'error' })
			}

		} catch {
			return new DefaultHTTPReturn({ error: true, message: 'Ocorreu um erro, por favor, tente novamente mais tarde', statusCode: 500, state: 'error' })
		}
	}

	async register(company) {

		const { _name, _email, _cnpj, _corporateName, _phone, _altPhone, _password, _confirmedAccount, _isAdmin } = company
		try {
			const companyCount = await this.prisma.company.count({
				where: {
					OR: [
						{
							cnpj: _cnpj
						},
						{
							email: _email
						},
					],
				},
			})

			if (companyCount !== 0) {
				return new DefaultHTTPReturn({ error: true, statusCode: 400, message: 'Empresa já cadastrada', state: 'error' })
			}

			const savedCompany = await this.prisma.company.create({
				data: {
					name: _name,
					email: _email,
					cnpj: _cnpj,
					corporateName: _corporateName,
					phone: _phone,
					altPhone: _altPhone,
					password: _password,
					confirmedAccount: _confirmedAccount,
					isAdmin: _isAdmin
				},
				select: { email: true, id: true }
			})

			return new DefaultHTTPReturn({ error: false, statusCode: 200, data: savedCompany, state: 'success' })

		} catch {
			return new DefaultHTTPReturn({ error: true, message: 'Ocorreu um erro, por favor, tente novamente mais tarde', statusCode: 500, state: 'error' })

		}
	}

	async sendEmailValidation(credentials) {

		const { email, token } = credentials

		try {

			const transporter = nodemailer.createTransport({
				host: process.env.EMAIL_HOST,
				port: process.env.EMAIL_PORT,
				// secure: true,
				auth: {
					user: process.env.EMAIL_USER,
					pass: process.env.EMAIL_PASS,
				},
			});

			await transporter.sendMail({
				from: process.env.EMAIL_SENDER, // sender address
				to: email, // list of receivers
				subject: "Hello ✔", // Subject line
				text: "Hello world?", // plain text body
				html: `<b>Hello world? <a href=${process.env.SITE_URL}/email-validation/${token}>Confimar e-mail</a></b>`, // html body
			});


			return new DefaultHTTPReturn({ error: false, statusCode: 200, message: `Seu e-mail de confirmação foi enviado para ${email}`, state: 'success' })

		} catch {
			return new DefaultHTTPReturn({ error: true, message: 'Ocorreu um erro, por favor, tente novamente mais tarde', statusCode: 500, state: 'error' })

		}
	}

	async confirmEmail(data) {

		const { email, id } = data
		try {

			const company = await this.prisma.company.update({
				where: { email, id: Number(id) },
				data: { confirmedAccount: true },
				select: { id: true }
			})

			const token = jwt.sign({ companyId: company.id, isAdmin: false }, process.env.JWT_SECRET, { expiresIn: '1h' });

			return new DefaultHTTPReturn({ error: false, statusCode: 200, message: 'Sua conta foi confirmada', data: { token }, state: 'success' })

		} catch {
			return new DefaultHTTPReturn({ error: true, message: 'Ocorreu um erro, por favor, tente novamente mais tarde', statusCode: 500, state: 'error' })

		}
	}

	async login(body) {

		const { cnpj, password } = body

		try {
			const company = await this.prisma.company.findUnique({
				where: { cnpj },
				select: { id: true, password: true, confirmedAccount: true, isAdmin: true }
			})

			if (company.password) {
				const unhashedPass = await bcrypt.compare(password, company.password)
				if (!unhashedPass) {
					return new DefaultHTTPReturn({ statusCode: 400, message: 'Credenciais inválidas', error: true, state: 'error' })
				}
			}
			if (!company.confirmedAccount) {
				return new DefaultHTTPReturn({ statusCode: 401, message: 'Sua conta ainda não foi confirmada', error: true, state: 'error' })
			}

			const token = jwt.sign({ companyId: company.id, isAdmin: company.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });

			return new DefaultHTTPReturn({ error: false, statusCode: 200, data: { token }, state: 'success' })


		} catch {
			return new DefaultHTTPReturn({ error: true, statusCode: 500, message: 'Ocorreu um erro, por favor, tente novamente mais tarde', state: 'error' })

		}

	}

}

export default new CompanyService();
