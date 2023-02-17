import businessFinance from './config/business-finance';
import contracts from './config/contracts';
import rolesAndPermissions from './config/roles-n-permission';
import supplyDashboard from './config/supply-dashboards';
import cogoAcademy from './config/cogo-academy';

const routeConfig = {
	...rolesAndPermissions,
	...supplyDashboard,
	...contracts,
	...businessFinance,
	...cogoAcademy,
};

export default routeConfig;
