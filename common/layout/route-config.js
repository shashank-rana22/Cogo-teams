import businessConfig from './config/business-finance';
import homeConfig from './config/home';
import coeConfig from './config/coe';
import localConfig from './config/locations';

const routeConfig = {
	...homeConfig,
	...businessConfig,
	...coeConfig,
	...localConfig,
};

export default routeConfig;
