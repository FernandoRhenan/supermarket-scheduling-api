class ThisMonth {

	constructor({ month }) {
		this.month = month
	}

	lastDayOfMonth() {

		const baseDate = new Date(new Date().setUTCDate(new Date().getUTCDate() + 1))
		if (baseDate.getUTCMonth() === Number(this.month)) {

			const date = new Date(new Date(baseDate).setUTCDate(new Date().getUTCDate() + 1))
			// Adiciona um mês ao baseDate
			const baseDateNextMonth = new Date(baseDate.setUTCMonth(baseDate.getUTCMonth() + 1))
			// Subtraí todos os dias de baseDateNextMonth para chegar no último dia do mes do baseDate
			const lastDayOfMonth = new Date(baseDateNextMonth.setUTCDate(baseDate.getUTCDate() - baseDate.getUTCDate()))

			return { date, lastDayOfMonth }

		} else {

			const baseDate = new Date(baseDate.setUTCMonth(baseDate.getUTCMonth() + 1))

			console.log(baseDate)

		}

	}

}

export default ThisMonth
