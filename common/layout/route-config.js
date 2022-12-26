import businessConfig from './config/business-finance';
import homeConfig from './config/home';
import coeConfig from './config/coe';

const routeConfig = {
	...homeConfig,
	...businessConfig,
	...coeConfig
};

export default routeConfig;
