// Can be used to retuns a successful external request (HTTP request)

class DefaultHTTPReturn {
	constructor({ statusCode = 200, message = '', error = false, data = {}, state = 'error' }) {
		return { statusCode, error, message, data, state }
	}
}

export default DefaultHTTPReturn
