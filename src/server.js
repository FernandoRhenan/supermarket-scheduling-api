import 'dotenv/config'
import app from './App.js'

app.listen(process.env.PORT, () => {
	console.log('Servidor rodando')
})
