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
		confimedAccount = false,
		isAdmin = false
	}) {
		this._name = name
		this._email = email
		this._cnpj = cnpj
		this._corporateName = corporateName
		this._phone = phone
		this._altPhone = altPhone
		this._password = password
		this._confirmedAccount = confimedAccount
		this._isAdmin = isAdmin
	}

	validateAll() {
		const password = this.validatePassword()
		const name = this.validateName()
		const email = this.validateEmail()
		const cnpj = this.validateCnpj()
		const phone = this.validatePhone()
		const altPhone = this.validateAltPhone()

		if (password.error || name.error || email.error || cnpj.error || phone.error || altPhone.error) {

			let invalidArray = []

			const array = [name, email, password, cnpj, phone, altPhone]

			array.forEach((item) => {
				if (item.error) {
					invalidArray.push(item.message)
				}
			})

			return new DefaultValidationReturn({ message: invalidArray, error: true, state: 'warning' })
		} else {
			return new DefaultValidationReturn({ message: '', error: false, state: 'success' })
		}

	}

	validatePassword() {
		// RegEx que permite apenas a-z A-Z 0-9 ! @ # $ % & * ( )
		// .test() retorna um boolean indicando se a password passada está de acordo com as regras do RegEx.
		const passwordRegex = /^[a-zA-Z0-9!@#$%&*()\s]{6,32}$/.test(this._password)
		// OBS: passwordRegex está permitindo espaços em branco " ".

		if (this._password.length === 0) {
			return new DefaultValidationReturn({ message: 'Preencha o campo senha', error: true, state: 'warning' })
		} else if (this._password.length < 6) {
			return new DefaultValidationReturn({ message: 'A senha deve conter pelo menos 6 caracteres', error: true, state: 'warning' })
		} else if (this._password.length > 32) {
			return new DefaultValidationReturn({ message: 'A senha não pode conter mais que 32 caracteres', error: true, state: 'warning' })
		} else if (!passwordRegex) {
			return new DefaultValidationReturn({ message: 'Há caracteres não permitidos na senha', error: true, state: 'warning' })
		} else {
			return new DefaultValidationReturn({ message: '', error: false, state: 'success' })
		}
	}

	validateName() {
		const nameRegex = /^[a-zA-Z0-9\s]+$/.test(this._name)
		if (this._name.length === 0) {
			return new DefaultValidationReturn({ message: 'Preecha o campo de nome', error: true, state: 'warning' })
		} else if (this._name.length < 2) {
			return new DefaultValidationReturn({ message: 'O nome deve conter pelo menos 2 caracteres', error: true, state: 'warning' })
		} else if (this._name.length > 26) {
			return new DefaultValidationReturn({ message: 'O nome não pode conter mais que 26 caracteres', error: true, state: 'warning' })
		} else if (!nameRegex) {
			return new DefaultValidationReturn({ message: 'Há caracteres não permitidos no nome', error: true, state: 'warning' })
		} else {
			return new DefaultValidationReturn({ message: '', error: false, state: 'success' })
		}
	}

	validateEmail() {
		const emailRegex = /^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,4}$/.test(this._email)

		if (this._email.length === 0) {
			return new DefaultValidationReturn({ message: 'Preencha o campo E-mail', error: true, state: 'warning' })
		} else if (this._email.length < 8) {
			return new DefaultValidationReturn({ message: 'O email deve conter pelo menos 8 caracteres', error: true, state: 'warning' })
		} else if (this._email.length > 50) {
			return new DefaultValidationReturn({ message: 'O email não pode conter mais que 50 caracteres', error: true, state: 'warning' })
		} else if (!emailRegex) {
			return new DefaultValidationReturn({ message: 'O email está mal formatado ou contém caracteres não permitidos', error: true, state: 'warning' })
		} else {
			return new DefaultValidationReturn({ message: '', error: false, state: 'success' })
		}
	}

	validateCnpj() {
		const cnpjRegex = /^[0-9]{14}$/.test(this._cnpj)

		if (this._cnpj.length === 0) {
			return new DefaultValidationReturn({ message: 'Preencha o campo CNPJ', error: true, state: 'warning' })
		} else if (this._cnpj.length !== 14) {
			return new DefaultValidationReturn({ message: 'O CNPJ deve conter 14 números', error: true, state: 'warning' })
		} else if (!cnpjRegex) {
			return new DefaultValidationReturn({ message: 'O campo CNPJ aceita apenas números', error: true, state: 'warning' })
		} else {
			return new DefaultValidationReturn({ message: '', error: false, state: 'success' })
		}
	}

	validatePhone() {
		const phoneRegex = /^[0-9]+$/.test(this._phone)

		if (this._phone.length === 0) {
			return new DefaultValidationReturn({ message: 'Preencha o campo telefone', error: true, state: 'warning' })
		} else if (this._phone.length > 11) {
			return new DefaultValidationReturn({ message: 'O telefone não pode conter mais que 11 números', error: true, state: 'warning' })
		} else if (this._phone.length < 10) {
			return new DefaultValidationReturn({ message: 'O telefone deve conter pelo menos 10 números', error: true, state: 'warning' })
		} else if (!phoneRegex) {
			return new DefaultValidationReturn({ message: 'O campo telefone aceita apenas números', error: true, state: 'warning' })
		} else {
			return new DefaultValidationReturn({ message: '', error: false, state: 'success' })
		}
	}

	validateAltPhone() {
		const altPhoneRegex = /^[0-9]+$/.test(this._altPhone)

		if (this._altPhone.length === 0) {
			return new DefaultValidationReturn({ message: 'Preencha o campo telefone secundário', error: true, state: 'warning' })
		} else if (this._altPhone.length > 11) {
			return new DefaultValidationReturn({ message: 'O telefone secundário não pode conter mais que 11 números', error: true, state: 'warning' })
		} else if (this._altPhone.length < 10) {
			return new DefaultValidationReturn({ message: 'O telefone secundário deve conter pelo menos 10 números', error: true, state: 'warning' })
		} else if (!altPhoneRegex) {
			return new DefaultValidationReturn({ message: 'O campo telefone secundário aceita apenas números', error: true, state: 'warning' })
		} else {
			return new DefaultValidationReturn({ message: '', error: false, state: 'success' })
		}
	}

}


export default CompanyEntity

