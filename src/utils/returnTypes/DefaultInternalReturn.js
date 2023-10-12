class DefaultInternalReturn {
	constructor({ message = '', error = false, data = {}, state = 'error' }) {
		return { message, error, data, error }
	}
}

export default DefaultInternalReturn
