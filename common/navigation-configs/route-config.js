import businessFinance from './config/business-finance';
import omniChannel from './config/omni-channel';
import rolesAndPermissions from './config/roles-n-permission';

const routeConfig = {
	...rolesAndPermissions,
	...businessFinance,
	...omniChannel,
};

export default routeConfig;
