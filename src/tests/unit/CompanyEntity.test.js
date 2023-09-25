import { describe, it, expect } from 'vitest'
import CompanyEntity from '../../entities/CompanyEntity.js'

describe('Validate company validateAll method', () => {
	it('should validate all', () => {
		const allValidation = new CompanyEntity({
			name: 'nome teste',
			email: 'teste@teste.com',
			cnpj: '47960950000121',
			phone: '16937112002',
			altPhone: '16937112001',
			corporateName: 'teste_teste',
			password: 't123123'
		}).validateAll()

		const expected = { error: false, message: '' }

		expect(allValidation).toEqual(expected)
	})

	it('should return a password and altPhone error', () => {
		const allValidation = new CompanyEntity({
			name: 'nome teste',
			email: 'teste@teste.com',
			cnpj: '47960950000121',
			phone: '16937112002',
			altPhone: '169371120022',
			corporateName: 'teste_teste',
			password: '1'
		}).validateAll()

		const expected = {
			error: true, message: [
				"A senha deve conter pelo menos 6 caracteres",
				"O telefone secundário informado tem mais que 11 números"
			]
		}
		expect(allValidation).toEqual(expected)
	})

	it('should return a phone and name error', () => {
		const allValidation = new CompanyEntity({
			name: 'nome%',
			email: 'teste@teste.com',
			cnpj: '47960950000121',
			phone: '1693711200$',
			altPhone: '16937112002',
			corporateName: 'teste_teste',
			password: '123456'
		}).validateAll()

		const expected = {
			error: true, message: [
				"Há caracteres não permitidos no nome",
				"O campo telefone aceita apenas números"
			]
		}
		expect(allValidation).toEqual(expected)
	})

	it('should return a email, password and cnpj error', () => {
		const allValidation = new CompanyEntity({
			name: 'nome',
			email: 'testeteste.com',
			cnpj: '479609500001212',
			phone: '16937112002',
			altPhone: '16937112004',
			corporateName: 'teste_teste',
			password: '123456+'
		}).validateAll()

		const expected = {
			error: true, message: [
				"O email está mal formatado ou contém caracteres não permitidos",
				"Há caracteres não permitidos na senha",
				"O CNPJ informado tem mais que 14 números",
			]
		}
		expect(allValidation).toEqual(expected)
	})
})

describe('Validate company validatePassword method', () => {

	it('should validate password', () => {
		const passwordValidation = new CompanyEntity({ password: 'test#$%e7619&*4328!@() ' }).validatePassword()

		const expected = { error: false, message: '' }

		expect(passwordValidation).toEqual(expected)
	})

	it('should return a low length password error', () => {
		const passwordValidation = new CompanyEntity({ password: '12345' }).validatePassword()

		const expected = { error: true, message: 'A senha deve conter pelo menos 6 caracteres' }

		expect(passwordValidation).toEqual(expected)
	})

	it('should return an over length password error', () => {
		const passwordValidation = new CompanyEntity({ password: '012345678901234567890123456' }).validatePassword()

		const expected = { error: true, message: 'A senha não pode conter mais que 26 caracteres' }

		expect(passwordValidation).toEqual(expected)
	})

	it('should return an bad email formatting error (1)', () => {
		const passwordValidation = new CompanyEntity({ password: '0123456=23+' }).validatePassword()

		const expected = { error: true, message: 'Há caracteres não permitidos na senha' }

		expect(passwordValidation).toEqual(expected)
	})

})

describe('Validate company validateName method', () => {

	it('should validate name', () => {
		const nameValidation = new CompanyEntity({ name: 'teste teste10' }).validateName()

		const expected = { error: false, message: '' }

		expect(nameValidation).toEqual(expected)
	})

	it('should return a low length email error', () => {
		const nameValidation = new CompanyEntity({ name: 't' }).validateName()

		const expected = { error: true, message: 'O nome deve conter pelo menos 2 caracteres' }

		expect(nameValidation).toEqual(expected)
	})

	it('should return an over length email error', () => {
		const nameValidation = new CompanyEntity({ name: 'abcdefghijklmnopqrstuvwxyza' }).validateName()

		const expected = { error: true, message: 'O nome não pode conter mais que 26 caracteres' }

		expect(nameValidation).toEqual(expected)
	})

	it('should return an bad email formatting error (1)', () => {
		const nameValidation = new CompanyEntity({ name: 'teste#' }).validateName()

		const expected = { error: true, message: 'Há caracteres não permitidos no nome' }

		expect(nameValidation).toEqual(expected)
	})

	it('should return an bad email formatting error (2)', () => {
		const nameValidation = new CompanyEntity({ name: 'teste.' }).validateName()

		const expected = { error: true, message: 'Há caracteres não permitidos no nome' }

		expect(nameValidation).toEqual(expected)
	})

})

describe('Validate company validateEmail method', () => {

	it('should validate email', () => {
		const emailValidation = new CompanyEntity({ email: 'teste@teste.com' }).validateEmail()

		const expected = { error: false, message: '' }

		expect(emailValidation).toEqual(expected)
	})

	it('should return a low length email error', () => {
		const emailValidation = new CompanyEntity({ email: 'ab@i.io' }).validateEmail()

		const expected = { error: true, message: 'O email deve conter pelo menos 8 caracteres' }

		expect(emailValidation).toEqual(expected)
	})

	it('should return an over length email error', () => {
		const emailValidation = new CompanyEntity({ email: 'abcdefghijklmnopqrstuvwxyz@abcdefghijklmnopqrstuvwxyz.io' }).validateEmail()

		const expected = { error: true, message: 'O email não pode conter mais que 50 caracteres' }

		expect(emailValidation).toEqual(expected)
	})

	it('should return an bad email formatting error (1)', () => {
		const emailValidation = new CompanyEntity({ email: 'teste@teste.i' }).validateEmail()

		const expected = { error: true, message: 'O email está mal formatado ou contém caracteres não permitidos' }

		expect(emailValidation).toEqual(expected)
	})

	it('should return an bad email formatting error (2)', () => {
		const emailValidation = new CompanyEntity({ email: 'tes)te@teste.io' }).validateEmail()

		const expected = { error: true, message: 'O email está mal formatado ou contém caracteres não permitidos' }

		expect(emailValidation).toEqual(expected)
	})

	it('should return an bad email formatting error (3)', () => {
		const emailValidation = new CompanyEntity({ email: 'testeteste.io' }).validateEmail()

		const expected = { error: true, message: 'O email está mal formatado ou contém caracteres não permitidos' }

		expect(emailValidation).toEqual(expected)
	})

	it('should return an bad email formatting error (4)', () => {
		const emailValidation = new CompanyEntity({ email: 'teste@teste' }).validateEmail()

		const expected = { error: true, message: 'O email está mal formatado ou contém caracteres não permitidos' }

		expect(emailValidation).toEqual(expected)
	})

	it('should return an bad email formatting error (5)', () => {
		const emailValidation = new CompanyEntity({ email: 'teste@te ste' }).validateEmail()

		const expected = { error: true, message: 'O email está mal formatado ou contém caracteres não permitidos' }

		expect(emailValidation).toEqual(expected)
	})

})

describe('Validate company validateCnpj method', () => {

	it('should validate cnpj', () => {
		const cnpjValidation = new CompanyEntity({ cnpj: '47960950000121' }).validateCnpj()

		const expected = { error: false, message: '' }

		expect(cnpjValidation).toEqual(expected)
	})

	it('should return an low length cnpj error', () => {
		const cnpjValidation = new CompanyEntity({ cnpj: '4796095000012' }).validateCnpj()

		const expected = { error: true, message: 'O CNPJ informado tem menos que 14 números' }

		expect(cnpjValidation).toEqual(expected)
	})

	it('should return an over length cnpj error', () => {
		const cnpjValidation = new CompanyEntity({ cnpj: '479609500001212' }).validateCnpj()

		const expected = { error: true, message: 'O CNPJ informado tem mais que 14 números' }

		expect(cnpjValidation).toEqual(expected)
	})

	it('should return an bad cnpj formatting error (1)', () => {
		const cnpjValidation = new CompanyEntity({ cnpj: '47960950p00121' }).validateCnpj()

		const expected = { error: true, message: 'O campo CNPJ aceita apenas números' }

		expect(cnpjValidation).toEqual(expected)
	})

	it('should return an bad cnpj formatting error (2)', () => {
		const cnpjValidation = new CompanyEntity({ cnpj: 'k234567891234 ' }).validateCnpj()

		const expected = { error: true, message: 'O campo CNPJ aceita apenas números' }

		expect(cnpjValidation).toEqual(expected)
	})

	it('should return an bad cnpj formatting error (3)', () => {
		const cnpjValidation = new CompanyEntity({ cnpj: '              ' }).validateCnpj()

		const expected = { error: true, message: 'O campo CNPJ aceita apenas números' }

		expect(cnpjValidation).toEqual(expected)
	})

})

describe('Validate company validatePhone method', () => {

	it('should validate phone', () => {

		const company = new CompanyEntity({ phone: '16937112002' }).validatePhone()

		const expected = { error: false, message: '' }

		expect(company).toEqual(expected)
	})

	it('should return a low length phone error', () => {

		const company = new CompanyEntity({ phone: '1693711202' }).validatePhone()

		const expected = { error: true, message: 'O telefone informado tem menos que 11 números' }

		expect(company).toEqual(expected)
	})

	it('should return a over length phone error', () => {

		const company = new CompanyEntity({ phone: '169371120022' }).validatePhone()

		const expected = { error: true, message: 'O telefone informado tem mais que 11 números' }

		expect(company).toEqual(expected)
	})

	it('should return a bad phone formatting error (1)', () => {
		const company = new CompanyEntity({ phone: '169371120q2' }).validatePhone()

		const expected = { error: true, message: 'O campo telefone aceita apenas números' }

		expect(company).toEqual(expected)
	})

	it('should return a bad phone formatting error (2)', () => {
		const company = new CompanyEntity({ phone: '     d    d' }).validatePhone()

		const expected = { error: true, message: 'O campo telefone aceita apenas números' }

		expect(company).toEqual(expected)
	})

	it('should return a bad phone formatting error (3)', () => {
		const company = new CompanyEntity({ phone: '           ' }).validatePhone()

		const expected = { error: true, message: 'O campo telefone aceita apenas números' }

		expect(company).toEqual(expected)
	})

})

describe('Validate company validateAltPhone method', () => {

	it('should validate altPhone', () => {

		const company = new CompanyEntity({ altPhone: '16937112002' }).validateAltPhone()

		const expected = { error: false, message: '' }

		expect(company).toEqual(expected)
	})

	it('should return a low length altPhone error', () => {

		const company = new CompanyEntity({ altPhone: '1693711200' }).validateAltPhone()

		const expected = { error: true, message: 'O telefone secundário informado tem menos que 11 números' }

		expect(company).toEqual(expected)
	})

	it('should return a over length altPhone error', () => {

		const company = new CompanyEntity({ altPhone: '169371120022' }).validateAltPhone()

		const expected = { error: true, message: 'O telefone secundário informado tem mais que 11 números' }

		expect(company).toEqual(expected)
	})

	it('should return an invalid characters altPhone error (1)', () => {
		const company = new CompanyEntity({ altPhone: '169371120k2' }).validateAltPhone()

		const expected = { error: true, message: 'O campo telefone secundário aceita apenas números' }

		expect(company).toEqual(expected)
	})

	it('should return an invalid characters altPhone error (2)', () => {
		const company = new CompanyEntity({ altPhone: '     d     ' }).validateAltPhone()

		const expected = { error: true, message: 'O campo telefone secundário aceita apenas números' }

		expect(company).toEqual(expected)
	})

	it('should return an invalid characters altPhone error (3)', () => {
		const company = new CompanyEntity({ altPhone: '           ' }).validateAltPhone()

		const expected = { error: true, message: 'O campo telefone secundário aceita apenas números' }

		expect(company).toEqual(expected)
	})

})
