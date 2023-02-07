import businessFinance from './config/business-finance';
import myProfile from './config/my-profile';
import rolesAndPermissions from './config/roles-n-permission';

const routeConfig = {
	...rolesAndPermissions,
	...businessFinance,
	...myProfile,
};

export default routeConfig;
