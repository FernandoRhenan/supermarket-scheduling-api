import { describe, expect, it } from "vitest";
import ScheduleEntity from "../../entities/ScheduleEntity";
import DefaultValidationReturn from "../../utils/returnTypes/DefaultValidationReturn";


const x = new Date()
const defaultDate = new Date(x.setDate(x.getDate() + 5)).toISOString()

describe('Validate schedule validade companyId', () => {

	it('should validate company_id', () => {
		const companyId = new ScheduleEntity({ company_id: 152 }).validateCompanyId()

		expect(companyId).toEqual(new DefaultValidationReturn({ message: '', error: false }))
	})

	it('should returns an type error company_id (1)', () => {
		const companyId = new ScheduleEntity({ company_id: '156' }).validateCompanyId()

		expect(companyId).toEqual(new DefaultValidationReturn({ message: 'Identificador inválido', error: true }))
	})

	it('should returns an type error company_id (2)', () => {
		const companyId = new ScheduleEntity({}).validateCompanyId()

		expect(companyId).toEqual(new DefaultValidationReturn({ message: 'Identificador inválido', error: true }))
	})

})

describe('Validate schedule validate date', () => {

	it('should validate date', () => {
		const companyId = new ScheduleEntity({ date: defaultDate }).validateDate()

		expect(companyId).toEqual(new DefaultValidationReturn({ message: '', error: false }))
	})

	it('should returns a formatation error (1)', () => {
		const companyId = new ScheduleEntity({ date: defaultDate + '1' }).validateDate()

		expect(companyId).toEqual(new DefaultValidationReturn({ message: 'Há algum erro de formatação na data', error: true }))
	})

})

describe('Validate schedule validade all', () => {

	it('should validate company_id', () => {
		const companyId = new ScheduleEntity({ company_id: 1, date: defaultDate }).validateAll()

		expect(companyId).toEqual(new DefaultValidationReturn({ message: '', error: false }))
	})

	it('should returns an array with errors (1)', () => {
		const companyId = new ScheduleEntity({ company_id: '156', date: '' }).validateAll()

		expect(companyId).toEqual(new DefaultValidationReturn({ message: ["Identificador inválido", "Há algum erro de formatação na data"], error: true }))
	})

	it('should returns an array with id validation error', () => {
		const companyId = new ScheduleEntity({ company_id: {}, date: defaultDate }).validateAll()

		expect(companyId).toEqual(new DefaultValidationReturn({ message: ["Identificador inválido"], error: true }))
	})

	it('should returns an array with id date error', () => {
		const companyId = new ScheduleEntity({ company_id: 25, date: defaultDate + 'd' }).validateAll()

		expect(companyId).toEqual(new DefaultValidationReturn({ message: ["Há algum erro de formatação na data"], error: true }))
	})

})
