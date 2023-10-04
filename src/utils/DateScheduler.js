import DefaultInternalReturn from "./returnTypes/DefaultInternalReturn.js";


class DateScheduler {
	constructor({ date, monthRange, frequency }) {
		this.date = date
		this.monthRange = monthRange
		this.frequency = frequency
	}

	calcSchedules() {

		const baseDate = new Date(this.date);
		const maxDate = new Date(new Date(this.date).setUTCMonth(baseDate.getUTCMonth() + this.monthRange));

		const dates = [];

		switch (this.frequency) {

			case 'weekly':

				while (baseDate < maxDate) {
					dates.push({ date: new Date(baseDate) })

					baseDate.setUTCDate(baseDate.getUTCDate() + 7);
				}

				return new DefaultInternalReturn({ error: false, data: dates })


			case 'biweekly':

				while (baseDate < maxDate) {
					dates.push({ date: new Date(baseDate) })

					baseDate.setUTCDate(baseDate.getUTCDate() + 14);
				}

				return new DefaultInternalReturn({ error: false, data: dates })

			case 'monthly':


				while (baseDate < maxDate) {
					dates.push({ date: new Date(baseDate) })

					baseDate.setUTCDate(baseDate.getUTCDate() + 28);
				}

				return new DefaultInternalReturn({ error: false, data: dates })

			default:
				return new DefaultInternalReturn({ error: true, message: 'Periodicidade não permitida' })

		}

	}
}

export default DateScheduler
