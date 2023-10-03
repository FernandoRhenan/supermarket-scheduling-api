import DefaultValidationReturn from "../utils/returnTypes/DefaultValidationReturn.js"

class ScheduleEntity {
	constructor({
		company_id = null,
		date = '',
		frequency = 'once',
		isActive = false
	}) {
		this._date = date
		this._company_id = company_id
		this._frequency = frequency
		this._isActive = isActive
	}

	validateAll() {

		const date = this.validateDate()
		const companyId = this.validateCompanyId()
		const frequency = this.validateFrequency()


		if (date.error || companyId.error || frequency.error) {

			let invalidArray = []

			const array = [companyId, date, frequency]

			array.forEach((item) => {
				if (item.error) {
					invalidArray.push(item.message)
				}
			})

			return new DefaultValidationReturn({ message: invalidArray, error: true })
		} else {
			return new DefaultValidationReturn({ message: '', error: false })
		}

	}

	validateFrequency() {
		if (this._frequency == 'once' || this._frequency == 'weekly' || this._frequency == 'biweekly' || this._frequency == 'monthly') {
			return new DefaultValidationReturn({ message: '', error: false })
		} else {
			return new DefaultValidationReturn({ message: 'Periodicidade não permitida', error: true })
		}

	}

	validateDate() {

		// Garante o padrão ISO8601, para salvar datas no banco de dados
		const dateRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}[.][0-9]{3}Z$/.test(this._date)
		if (!dateRegex) {
			return new DefaultValidationReturn({ message: 'Há algum erro de formatação na data', error: true })
		}
		const dateNow = new Date()

		const minRange = new Date(dateNow.setUTCDate(dateNow.getUTCDate() + 1))
		const scheduleDate = new Date(this._date)
		// retorna uma nova data 2 meses depois da minRange
		const maxRange = new Date(new Date(minRange).setUTCMonth(minRange.getUTCMonth() + 2))

		if (scheduleDate < minRange) {
			return new DefaultValidationReturn({ message: 'Data de agendamento restringida', error: true })
		}
		if (scheduleDate > maxRange) {
			return new DefaultValidationReturn({ message: 'Data de agendamento excedida', error: true })
		}

		return new DefaultValidationReturn({ message: '', error: false })

	}

	validateCompanyId() {

		if (typeof this._company_id === 'number') {
			return new DefaultValidationReturn({ message: '', error: false })
		} else {
			return new DefaultValidationReturn({ message: 'Identificador inválido', error: true })
		}
	}

}

export default ScheduleEntity
