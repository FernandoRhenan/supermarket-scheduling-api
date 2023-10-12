import DefaultValidationReturn from "../utils/returnTypes/DefaultValidationReturn.js"
import DefaultInternalReturn from '../utils/returnTypes/DefaultInternalReturn.js'

class ScheduleEntity {
	constructor({
		monthRange = 2,
		date = '',
		frequency = 'once',
		isActive = true
	}) {
		this._date = date
		this._monthRange = monthRange
		this._frequency = frequency
		this._isActive = isActive
	}

	validateAll() {

		const date = this.validateDate()
		const frequency = this.validateFrequency()


		if (date.error || frequency.error) {

			let invalidArray = []

			const array = [date, frequency]

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

	validateFrequency() {
		if (this._frequency == 'once' || this._frequency == 'weekly' || this._frequency == 'biweekly' || this._frequency == 'monthly') {
			return new DefaultValidationReturn({ message: '', error: false, state: 'success' })
		} else {
			return new DefaultValidationReturn({ message: 'Periodicidade não permitida', error: true, state: 'warning' })
		}

	}

	validateDate() {

		// Garante o padrão ISO8601, para salvar datas no banco de dados
		const dateRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}[.][0-9]{3}Z$/.test(this._date)
		if (!dateRegex) {
			return new DefaultValidationReturn({ message: 'Há algum erro de formatação na data', error: true, state: 'warning' })
		}
		const dateNow = new Date()

		const minRange = new Date(dateNow.setUTCDate(dateNow.getUTCDate() + 1))
		const scheduleDate = new Date(this._date)
		// retorna uma nova data 2 meses depois da minRange
		const maxRange = new Date(new Date(minRange).setUTCMonth(minRange.getUTCMonth() + this._monthRange))

		if (scheduleDate < minRange) {
			return new DefaultValidationReturn({ message: 'Data de agendamento restringida', error: true, state: 'warning' })
		}
		if (scheduleDate > maxRange) {
			return new DefaultValidationReturn({ message: 'Data de agendamento excedida', error: true, state: 'warning' })
		}

		return new DefaultValidationReturn({ message: '', error: false, state: 'success' })

	}

	calcSchedules() {

		const baseDate = new Date(this._date);
		const maxDate = new Date(new Date(this._date).setUTCMonth(baseDate.getUTCMonth() + this._monthRange));

		const dates = [];
		switch (this._frequency) {

			case 'weekly':

				while (baseDate < maxDate) {
					dates.push({ date: new Date(baseDate) })

					baseDate.setUTCDate(baseDate.getUTCDate() + 7);
				}

				return new DefaultInternalReturn({ error: false, data: dates, state: 'success' })


			case 'biweekly':

				while (baseDate < maxDate) {
					dates.push({ date: new Date(baseDate) })

					baseDate.setUTCDate(baseDate.getUTCDate() + 14);
				}

				return new DefaultInternalReturn({ error: false, data: dates, state: 'success' })

			case 'monthly':


				while (baseDate < maxDate) {
					dates.push({ date: new Date(baseDate) })

					baseDate.setUTCDate(baseDate.getUTCDate() + 28);
				}

				return new DefaultInternalReturn({ error: false, data: dates, state: 'success' })

			default:
				return new DefaultInternalReturn({ error: true, message: 'Periodicidade não permitida', state: 'warning' })

		}

	}

	monthRange() {

		const minRange = new Date(new Date().setUTCDate(new Date().getUTCDate() + 1))

		const maxRange = new Date(new Date(minRange).setUTCMonth(minRange.getUTCMonth() + this._monthRange))

		return new DefaultInternalReturn({ error: true, message: '', state: 'success', data: { minRange, maxRange } })

	}

}

export default ScheduleEntity
