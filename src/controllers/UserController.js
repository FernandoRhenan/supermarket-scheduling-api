import userService from "../services/UserService.js";

class UserController {

	getAllUsers(req, res) {
		const back = userService.getAllUsers(req, res)
		return back
	}

}

export default new UserController;
