import DefaultValidationReturn from "./returnTypes/DefaultValidationReturn.js"

class CompareData {
	constructor({ value1, value2, type }) {
		this._value1 = value1
		this._value2 = value2
		this._type = type
	}

	compareTwoTypes() {

		if (typeof this._value1 === this._type && typeof this._value2 === this._type) {
			return new DefaultValidationReturn({ message: '', error: false })
		} else {
			return new DefaultValidationReturn({ message: 'Os dados enviados são inválidos', error: true })
		}
	}

	compareTwoValues() {
		if (this._value1 == this._value2) {
			return new DefaultValidationReturn({ message: '', error: false })
		} else {
			return new DefaultValidationReturn({ message: 'Os dados enviados são inválidos', error: true })
		}
	}

	compareTwoStrict() {
		if (this._value1 === this._value2 && typeof this._value1 === this._type) {
			return new DefaultValidationReturn({ message: '', error: false })
		} else {
			return new DefaultValidationReturn({ message: 'Os dados enviados são inválidos', error: true })
		}
	}

	compareOneType() {
		if (typeof this._value1 === this._type) {
			return new DefaultValidationReturn({ message: '', error: false })
		} else {
			return new DefaultValidationReturn({ message: 'Os dados enviados são inválidos', error: true })
		}
	}

}

export default CompareData
