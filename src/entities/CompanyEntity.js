import DefaultValidationReturn from '../utils/returnTypes/DefaultValidationReturn.js'

class CompanyEntity {
	constructor({
		name = '',
		email = '',
		cnpj = '',
		corporateName = '',
		phone = '',
		altPhone = '',
		password = '',
	}) {
		this._name = name
		this._email = email
		this._cnpj = cnpj
		this._corporateName = corporateName
		this._phone = phone
		this._altPhone = altPhone
		this._password = password
	}

	validateAll() {
		const name = this.validateName()
		const email = this.validateEmail()
		const cnpj = this.validateCnpj()
		const phones = this.validatePhones()
		const password = this.validatePassword()

		const validationArray = [name, email, cnpj, phones, password]

		const invalidFields = validationArray.map((item) => item.error ? item.message : '').filter(item => item)

		if (!name.error && !password.error && !email.error && !cnpj.error && !phones.error) {
			return new DefaultValidationReturn({ error: false })
		} else {
			return new DefaultValidationReturn({
				message: invalidFields[0], error: true
			})
		}

	}

	validatePassword(password = this._password) {
		// RegEx que permite apenas a-z A-Z 0-9 ! @ # $ % & * ( )
		// .test() retorna um boolean indicando se a password passada está de acordo com as regras do RegEx.
		const passwordRegex = /^[a-zA-Z0-9!@#$%&*()\s]+$/.test(password)
		// OBS: passwordRegex está permitindo espaços em branco " ".

		if (password.length < 6) {
			return new DefaultValidationReturn({ message: 'A senha deve conter pelo menos 6 caracteres', error: true })
		} else if (password.length > 26) {
			return new DefaultValidationReturn({ message: 'A senha não pode conter mais que 26 caracteres', error: true })
		} else if (!passwordRegex) {
			return new DefaultValidationReturn({ message: 'Há caracteres não permitidos na senha', error: true })
		} else {
			return new DefaultValidationReturn({ message: '', error: false })
		}
	}

	validateName(name = this._name) {
		const nameRegex = /^[a-zA-Z\s]+$/.test(name)

		if (name.length < 2) {
			return new DefaultValidationReturn({ message: 'O nome deve conter pelo menos 2 caracteres', error: true })
		} else if (name.length > 26) {
			return new DefaultValidationReturn({ message: 'O nome não pode conter mais que 26 caracteres', error: true })
		} else if (!nameRegex) {
			return new DefaultValidationReturn({ message: 'Há caracteres não permitidos no nome', error: true })
		} else {
			return new DefaultValidationReturn({ message: '', error: false })
		}
	}

	validateEmail(email = this._email) {
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
			email,
		)
		if (email.length < 7) {
			return new DefaultValidationReturn({ message: 'O email deve conter pelo menos 7 caracteres', error: true })
		} else if (email.length > 50) {
			return new DefaultValidationReturn({ message: 'O email não pode conter mais que 50 caracteres', error: true })
		} else if (!emailRegex) {
			return new DefaultValidationReturn({ message: 'O email está mal formatado ou contém caracteres não permitidos', error: true })
		} else {
			return new DefaultValidationReturn({ message: '', error: false })
		}
	}

	validateCnpj(cnpj = this._cnpj) {
		const cnpjRegex = /^[0-9]{14}$/.test(cnpj)

		if (cnpj.length > 14) {
			return new DefaultValidationReturn({ message: 'O CNPJ informado tem mais que 14 números', error: true })
		} else if (cnpj.length < 14) {
			return new DefaultValidationReturn({ message: 'O CNPJ informado tem menos que 14 números', error: true })
		} else if (!cnpjRegex) {
			return new DefaultValidationReturn({ message: 'O campo CNPJ aceita apenas números', error: true })
		} else {
			return new DefaultValidationReturn({ message: '', error: false })
		}
	}

	validatePhones(phone = this._phone, altPhone = this._altPhone) {
		const [phoneRegex, altPhoneRegex] = [
			/^[0-9]{11}$/.test(phone),
			/^[0-9]{11}$/.test(altPhone),
		]

		if (phone.length > 11) {
			return new DefaultValidationReturn({ message: 'O telefone informado tem mais que 11 números', error: true })
		} else if (phone.length < 11) {
			return new DefaultValidationReturn({ message: 'O telefone informado tem menos que 11 números', error: true })
		} else if (altPhone.length > 11) {
			return new DefaultValidationReturn({ message: 'O telefone secundário informado tem mais que 11 números', error: true })
		} else if (altPhone.length < 11) {
			return new DefaultValidationReturn({ message: 'O telefone secundário informado tem menos que 11 números', error: true })
		} else if (!phoneRegex) {
			return new DefaultValidationReturn({ message: 'O campo telefone aceita apenas números', error: true })
		} else if (!altPhoneRegex) {
			return new DefaultValidationReturn({ message: 'O campo telefone secundário aceita apenas números', error: true })
		} else {
			return new DefaultValidationReturn({ message: '', error: false })
		}
	}
}

export default CompanyEntity
