import { describe, expect, it } from 'vitest'
import CompanyEntity from '../../entities/CompanyEntity.js'

describe('Validate company validateCnpj method', () => {
	it('should validate cnpj', () => {
		const cnpjValidation = new CompanyEntity({ cnpj: '12345678912345' }).validateCnpj()

		const expected = { error: false, message: '' }

		expect(cnpjValidation).toEqual(expected)
	})
})

describe('Validate company validatePhone method', () => {

	it('should validate phone', () => {

		const company = new CompanyEntity({ phone: '12345678912' }).validatePhone()

		const expected = { error: false, message: '' }

		expect(company).toEqual(expected)
	})

	it('should return a low length phone error', () => {

		const company = new CompanyEntity({ phone: '4898758846' }).validatePhone()

		const expected = { error: true, message: 'O telefone informado tem menos que 11 números' }

		expect(company).toEqual(expected)
	})

	it('should return a over length phone error', () => {

		const company = new CompanyEntity({ phone: '489875884612' }).validatePhone()

		const expected = { error: true, message: 'O telefone informado tem mais que 11 números' }

		expect(company).toEqual(expected)
	})

	it('should return a bad formatting phone error', () => {
		const company = new CompanyEntity({ phone: '4898758E461' }).validatePhone()

		const expected = { error: true, message: 'O campo telefone aceita apenas números' }

		expect(company).toEqual(expected)
	})

	it('should return an invalid characters phone error ', () => {
		const company = new CompanyEntity({ phone: '     d     ' }).validatePhone()

		const expected = { error: true, message: 'O campo telefone aceita apenas números' }

		expect(company).toEqual(expected)
	})

	it('should return an invalid characters phone error (2)', () => {
		const company = new CompanyEntity({ phone: '           ' }).validatePhone()

		const expected = { error: true, message: 'O campo telefone aceita apenas números' }

		expect(company).toEqual(expected)
	})

})

describe('Validate company validateAltPhone method', () => {

	it('should validate altPhone', () => {

		const company = new CompanyEntity({ altPhone: '48987588461' }).validateAltPhone()

		const expected = { error: false, message: '' }

		expect(company).toEqual(expected)
	})

	it('should return a low length altPhone error', () => {

		const company = new CompanyEntity({ altPhone: '4898758846' }).validateAltPhone()

		const expected = { error: true, message: 'O telefone secundário informado tem menos que 11 números' }

		expect(company).toEqual(expected)
	})

	it('should return a bad formatting altPhone error', () => {
		const company = new CompanyEntity({ altPhone: '4898758846g' }).validateAltPhone()

		const expected = { error: true, message: 'O campo telefone secundário aceita apenas números' }

		expect(company).toEqual(expected)
	})

	it('should return a over length altPhone error', () => {

		const company = new CompanyEntity({ altPhone: '489875884611' }).validateAltPhone()

		const expected = { error: true, message: 'O telefone secundário informado tem mais que 11 números' }

		expect(company).toEqual(expected)
	})

	it('should return an invalid characters altPhone error ', () => {
		const company = new CompanyEntity({ altPhone: '     d     ' }).validateAltPhone()

		const expected = { error: true, message: 'O campo telefone secundário aceita apenas números' }

		expect(company).toEqual(expected)
	})

	it('should return an invalid characters altPhone error (2)', () => {
		const company = new CompanyEntity({ altPhone: '           ' }).validateAltPhone()

		const expected = { error: true, message: 'O campo telefone secundário aceita apenas números' }

		expect(company).toEqual(expected)
	})

})
