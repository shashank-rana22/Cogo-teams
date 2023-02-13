import businessFinance from './config/business-finance';
import rolesAndPermissions from './config/roles-n-permission';
import vendorRM from './config/vendor-rm';

const routeConfig = {
	...rolesAndPermissions,
	...businessFinance,
	...vendorRM,
};

export default routeConfig;
