import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import companyService from '../../services/CompanyService.js';
import DefaultHTTPReturn from '../../utils/returnTypes/DefaultHTTPReturn.js';
import { describe, it, afterEach, expect } from 'vitest';
import companyController from '../../controllers/CompanyController.js';

describe('CompanyService', () => {
	// Criando uma instância do axios-mock-adapter
	const mock = new MockAdapter(axios);

	afterEach(() => {
		mock.reset(); // Limpa o estado do mock após cada teste
	});

	it('should return a DefaultHTTPReturn with status 200 when CNPJ is valid', async () => {
		const cnpj = '47960950000121';

		// Configura o mock para simular uma resposta bem-sucedida
		mock.onGet(`https://receitaws.com.br/v1/cnpj/${cnpj}`).reply(200, {
			status: 'OK', // (Simulação de todos os dados retornados da chamada do endpoint acima)
			nome: "MAGAZINE LUIZA S/A",
			email: "fiscal.estadual@magazineluiza.com.br",
			telefone: "(16) 3711-2002",
			cnpj: "47.960.950/0001-21"
		});

		const result = await companyController.checkCnpj({ cnpj });

		expect(result).toEqual(
			new DefaultHTTPReturn({
				error: false,
				statusCode: 200,
				data: {
					name: "MAGAZINE LUIZA S/A",
					email: "fiscal.estadual@magazineluiza.com.br",
					phone: "(16) 3711-2002",
					cnpj: '47.960.950/0001-21',
				},
			})
		);
	});

	it('shoulf return a DefaultHTTPReturn with status 400 when CNPJ is not valid', async () => {
		const cnpj = '00000000000000';

		// Configura o mock para simular uma resposta de erro
		mock.onGet(`https://receitaws.com.br/v1/cnpj/${cnpj}`).reply(200, {
			status: 'ERROR', // (Simulação de todos os dados retornados da chamada do endpoint acima)
			message: 'CNPJ inválido',
		});

		const result = await companyController.checkCnpj({ cnpj });

		expect(result).toEqual(
			new DefaultHTTPReturn({
				error: true,
				statusCode: 400,
				message: 'CNPJ inválido',
			})
		);
	});

	it('should return a DefaultHTTPReturn with status 500 if have a network problem', async () => {
		const cnpj = '47960950000121';

		// Configura o mock para simular uma falha na chamada de rede
		mock.onGet(`https://receitaws.com.br/vx1/cnpj/${1}`).networkError();

		const result = await companyService.checkCnpj(cnpj);
		expect(result).toEqual(
			new DefaultHTTPReturn({
				error: true, // (Simulação de todos os dados retornados da chamada do endpoint acima)
				statusCode: 500,
				message: 'Ocorreu um erro, por favor, tente novamente mais tarde',
			})
		);
	});
});
