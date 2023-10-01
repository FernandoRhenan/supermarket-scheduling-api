import 'dotenv/config'
import jwt from 'jsonwebtoken'

function verifyToken(req, res, next) {

	if (!req.headers.authorization) {
		return res.status(401).json({ message: 'Acesso negado', error: true })

	}

	const [type, token] = req.headers.authorization.split(' ')

	if (type !== 'Bearer') {
		return res.status(401).json({ message: 'Acesso negado', error: true })

	}

	if (!token) {
		return res.status(401).json({ message: 'Acesso negado', error: true })

	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		req.companyId = decoded.companyId
		req.isAdmin = decoded.isAdmin
		next()
	} catch (err) {
		return res.status(401).json({ message: 'Acesso negado', error: true })
	}

}

export default verifyToken
