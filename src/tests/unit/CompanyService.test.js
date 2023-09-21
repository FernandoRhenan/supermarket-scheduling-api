import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import companyService from '../../services/CompanyService.js'; // Importe sua classe aqui
import DefaultHTTPReturn from '../../utils/returnTypes/DefaultHTTPReturn.js';

describe('CompanyService', () => {
	// Criando uma instância do axios-mock-adapter
	const mock = new MockAdapter(axios);

	afterEach(() => {
		mock.reset(); // Limpa o estado do mock após cada teste
	});

	it('deve retornar um DefaultHTTPReturn com status 200 quando o CNPJ é válido', async () => {
		const cnpj = '47960950000121';

		// Configura o mock para simular uma resposta bem-sucedida
		mock.onGet(`https://receitaws.com.br/v1/cnpj/${cnpj}`).reply(200, {
			status: 'OK',
			nome: 'Empresa Exemplo',
			email: 'empresa@example.com',
			telefone: '1234567890',
			cnpj: cnpj,
		});

		const result = await companyService.checkCnpj(cnpj);


		expect(result).toEqual(
			new DefaultHTTPReturn({
				error: false,
				statusCode: 200,
				data: {
					name: 'Empresa Exemplo',
					email: 'empresa@example.com',
					phone: '1234567890',
					cnpj: cnpj,
				},
			})
		);
	});

	it('deve retornar um DefaultHTTPReturn com status 400 quando o CNPJ não é válido', async () => {
		const cnpj = 'cnpj-invalido';

		// Configura o mock para simular uma resposta de erro
		mock.onGet(`https://receitaws.com.br/v1/cnpj/${cnpj}`).reply(200, {
			status: 'ERROR',
			message: 'CNPJ inválido',
		});

		const result = await companyService.checkCnpj(cnpj);
		console.log(result)

		expect(result).toEqual(
			new DefaultHTTPReturn({
				error: true,
				statusCode: 400,
				message: 'CNPJ inválido',
			})
		);
	});

	it('deve retornar um DefaultHTTPReturn com status 500 em caso de erro na chamada de rede', async () => {
		const cnpj = '47960950000121';

		// Configura o mock para simular uma falha na chamada de rede
		mock.onGet(`https://receitaws.com.br/vx1/cnpj/${1}`).networkError();

		const result = await companyService.checkCnpj(cnpj);
		expect(result).toEqual(
			new DefaultHTTPReturn({
				error: true,
				statusCode: 500,
				message: 'Ocorreu um erro, por favor, tente novamente mais tarde',
			})
		);
	});
});
