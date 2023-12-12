import auth from './auth-apis';
import login_apis from './login_apis';
import partner from './partner-apis';

const apis = {
	...partner,
	...auth,
	login_apis,
};

export default apis;
