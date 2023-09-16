class DefaultValidationReturn {
	constructor({ message = '', error = false }) {
		return { message, error }
	}
}

export default DefaultValidationReturn
