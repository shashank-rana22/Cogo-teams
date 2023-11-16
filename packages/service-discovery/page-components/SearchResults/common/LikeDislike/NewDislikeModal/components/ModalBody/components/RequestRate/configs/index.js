import getCustomsControls from './customs';
import getMainServiceControls from './main-service';

const getServiceWiseConfig = ({ service_type = '' }) => {
	const MAPPING = {
		fcl_freight           : getMainServiceControls(),
		lcl_freight           : getMainServiceControls(),
		air_freight           : getMainServiceControls(),
		lcl_customs           : getCustomsControls(),
		fcl_customs           : getCustomsControls(),
		air_customs           : getCustomsControls(),
		ftl_freight           : getMainServiceControls(),
		ltl_freight           : getMainServiceControls(),
		haulage_freight       : getMainServiceControls(),
		trailer_freight       : getMainServiceControls(),
		fcl_freight_local     : getMainServiceControls(),
		lcl_freight_local     : getMainServiceControls(),
		air_freight_local     : getMainServiceControls(),
		rail_domestic_freight : getMainServiceControls(),
		fcl_cfs               : getMainServiceControls(),
		subsidiary            : getMainServiceControls(),
	};

	return MAPPING[service_type] || [];
};

export default getServiceWiseConfig;
