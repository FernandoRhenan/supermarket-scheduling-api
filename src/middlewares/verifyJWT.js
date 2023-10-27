import 'dotenv/config'
import jwt from 'jsonwebtoken'

function verifyToken(req, res, next) {

	if (!req.headers.authorization) {
		return res.status(401).json({ message: 'Acesso negado', error: true, statusCode: 401 })

	}

	const [type, token] = req.headers.authorization.split(' ')

	if (type !== 'Bearer') {
		return res.status(401).json({ message: 'Acesso negado', error: true, statusCode: 401 })

	}

	if (!token) {
		return res.status(401).json({ message: 'Acesso negado', error: true, statusCode: 401 })

	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		req.companyId = decoded.companyId
		req.isAdmin = decoded.isAdmin
		next()
	} catch {
		return res.status(401).json({ message: 'Acesso negado', error: true, statusCode: 401 })
	}

}

export default verifyToken
