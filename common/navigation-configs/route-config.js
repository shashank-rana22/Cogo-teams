import businessFinance from './config/business-finance';
import cogoOne from './config/cogo-one';
import rolesAndPermissions from './config/roles-n-permission';

const routeConfig = {
	...rolesAndPermissions,
	...businessFinance,
	...cogoOne,
};

export default routeConfig;
