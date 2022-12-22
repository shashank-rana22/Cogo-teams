import businessConfig from './config/business-finance';
import homeConfig from './config/home';

const routeConfig = {
	...homeConfig,
	...businessConfig,
};

export default routeConfig;
