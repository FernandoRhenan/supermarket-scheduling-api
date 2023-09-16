import { describe, expect, it } from 'vitest'
import CompanyEntity from '../../entities/CompanyEntity.js'

describe('User funcionalities', () => {
	it('should get a new instance without any validation.', () => {
		const user = new CompanyEntity({
			name: 'comercio de alimentos',
			corporateName: 'alimentos x',
			cnpj: '12345678910123',
			email: 'cax@email.com',
			phone: '48987588462',
			altPhone: '48987588461',
			password: '2p%d_94Hla5#M3*3'
		})

		const expected = {
			_name: 'comercio de alimentos',
			_corporateName: 'alimentos x',
			_cnpj: '12345678910123',
			_email: 'cax@email.com',
			_phone: '48987588462',
			_altPhone: '48987588461',
			_password: '2p%d_94Hla5#M3*3',
		}

		expect(user).toEqual(expected)
	})

	it('should set a new instance and returns a password error validation, appling the validateAll method.', () => {
		const validateAll = new CompanyEntity({
			name: 'comercio de alimentos',
			corporateName: 'alimentos x',
			cnpj: '12345678910123',
			email: 'cax@email.com',
			phone: '48987588462',
			altPhone: '48987588461',
			password: '2p%d_94Hla5#M3*3'
		}).validateAll()

		const expected = { error: true, message: 'Há caracteres não permitidos na senha' }

		expect(validateAll).toEqual(expected)
	})

	it('should set a new instance and returns any validation error, appling the validateAll method.', () => {
		const validateAll = new CompanyEntity({
			name: 'comercio de alimentos',
			corporateName: 'alimentos x',
			cnpj: '12345678910123',
			email: 'cax@email.com',
			phone: '48987588462',
			altPhone: '48987588461',
			password: '2p%d$$94Hla5#M33'
		}).validateAll()

		const expected = { error: false, message: '' }

		expect(validateAll).toEqual(expected)
	})

})
