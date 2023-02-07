import businessFinance from './config/business-finance';
import feedbackSystem from './config/hr-management';
import rolesAndPermissions from './config/roles-n-permission';

const routeConfig = {
	...rolesAndPermissions,
	...businessFinance,
	...feedbackSystem,
};

export default routeConfig;
