class DefaultValidationReturn {
	constructor({ message = '', error = false, state = 'error' }) {
		return { message, error, state }
	}
}

export default DefaultValidationReturn
