class DefaultReturn {

	constructor(message = '', error = false, statusCode = 0, data = {}) {
		return { message, error, statusCode, data }
	}
}

export default DefaultReturn
