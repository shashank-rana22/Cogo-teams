import businessFinance from './config/business-finance';
import incidentManagement from './config/incident-management';
import rolesAndPermissions from './config/roles-n-permission';

const routeConfig = {
	...rolesAndPermissions,
	...businessFinance,
	...incidentManagement,
};

export default routeConfig;
