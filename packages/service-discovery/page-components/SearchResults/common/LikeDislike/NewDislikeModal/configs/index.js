import { getCfsControls, cfsReasonOptions } from './cfs';
import { getCustomsControls, customsReasonOptions } from './customs';
import { getLocalsControls, localsReasonOptions } from './locals';
import { getMainServiceControls, mainServiceReasonOptions } from './main-service';

export const getServiceWiseOptions = ({ service_type = '' }) => {
	const MAPPING = {
		fcl_freight           : mainServiceReasonOptions,
		lcl_freight           : mainServiceReasonOptions,
		air_freight           : mainServiceReasonOptions,
		lcl_customs           : customsReasonOptions,
		fcl_customs           : customsReasonOptions,
		air_customs           : customsReasonOptions,
		ftl_freight           : mainServiceReasonOptions,
		ltl_freight           : mainServiceReasonOptions,
		haulage_freight       : mainServiceReasonOptions,
		trailer_freight       : mainServiceReasonOptions,
		fcl_freight_local     : localsReasonOptions,
		lcl_freight_local     : localsReasonOptions,
		air_freight_local     : localsReasonOptions,
		rail_domestic_freight : mainServiceReasonOptions,
		fcl_cfs               : cfsReasonOptions,
		subsidiary            : mainServiceReasonOptions,
	};

	return MAPPING[service_type] || [];
};

export const getServiceWiseConfig = ({ service_type = '' }) => {
	const MAPPING = {
		fcl_freight           : getMainServiceControls,
		lcl_freight           : getMainServiceControls,
		air_freight           : getMainServiceControls,
		lcl_customs           : getCustomsControls,
		fcl_customs           : getCustomsControls,
		air_customs           : getCustomsControls,
		ftl_freight           : getMainServiceControls,
		ltl_freight           : getMainServiceControls,
		haulage_freight       : getMainServiceControls,
		trailer_freight       : getMainServiceControls,
		fcl_freight_local     : getLocalsControls,
		lcl_freight_local     : getLocalsControls,
		air_freight_local     : getLocalsControls,
		rail_domestic_freight : getMainServiceControls,
		fcl_cfs               : getCfsControls,
		subsidiary            : getMainServiceControls,
	};

	return MAPPING[service_type] || [];
};
