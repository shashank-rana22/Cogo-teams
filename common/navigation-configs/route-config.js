import cogoOne from './config/cogo-one';
import notifications from './config/notifications';
import supplyDashboard from './config/supply-dashboards';
import ticketManagement from './config/ticket-management';

const routeConfig = {
	...supplyDashboard,
	...cogoOne,
	...ticketManagement,
	...notifications,
};

export default routeConfig;
