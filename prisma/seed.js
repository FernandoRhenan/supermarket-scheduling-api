import 'dotenv/config'
import bcrypt from 'bcryptjs'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {

	const environment = process.env.NODE_ENV

	switch (environment) {
		case 'dev':

			const adm = await prisma.company.upsert({
				where: { cnpj: process.env.ADMIN_CNPJ },
				update: {

					password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 8),
					name: process.env.ADMIN_NAME,
					corporateName: process.env.ADMIN_CORPORATENAME,
					email: process.env.ADMIN_EMAIL,
					cnpj: process.env.ADMIN_CNPJ,
					phone: process.env.ADMIN_PHONE,
					altPhone: process.env.ADMIN_ALTPHONE,
					confirmedAccount: Boolean(process.env.ADMIN_CONFIRMEDACCOUNT),
					isAdmin: Boolean(process.env.ADMIN_ISADMIN)
				},
				create: {
					password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 8),
					name: process.env.ADMIN_NAME,
					corporateName: process.env.ADMIN_CORPORATENAME,
					email: process.env.ADMIN_EMAIL,
					cnpj: process.env.ADMIN_CNPJ,
					phone: process.env.ADMIN_PHONE,
					altPhone: process.env.ADMIN_ALTPHONE,
					confirmedAccount: Boolean(process.env.ADMIN_CONFIRMEDACCOUNT),
					isAdmin: Boolean(process.env.ADMIN_ISADMIN)
				},
			})

			console.log({ adm })

			break
		case 'prod':
			break
		default:
			break
	}
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
