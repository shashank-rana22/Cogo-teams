import businessConfig from './config/business-finance';
import homeConfig from './config/home';
import localConfig from './config/locations';

const routeConfig = {
	...homeConfig,
	...businessConfig,
	...localConfig,
};

export default routeConfig;
