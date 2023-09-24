class DefaultInternalReturn {
	constructor({ message = '', error = false, data = {} }) {
		return { message, error, data }
	}
}

export default DefaultInternalReturn
