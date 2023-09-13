import DefaultReturn from "../utils/DefaultReturn.js";

class UserService {

	getAllUsers(req, res) {
		// Lógica para buscar e retornar todos os usuários
		return new DefaultReturn('', false, 200, {})
	}
}

export default new UserService();
