function isAdmin(req, res, next) {

	if (req.isAdmin) {
		next()
	} else {
		return res.status(403).json({ message: 'Acesso restrito', error: true, statusCode: 403 })
	}

}

export default isAdmin
