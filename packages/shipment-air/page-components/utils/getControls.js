import airCustomControls from '../constants/air-custom-controls';
import domesticAirFreightControls from '../constants/air-domestic-filter-controls';
import airFreightControls from '../constants/air-freight-filter-controls';
import airFreightLocalControls from '../constants/air-freight-local-controls';
import filterCommonControls from '../constants/filter-common-controls';

const getFilterControls = ({ serviceActiveTab }) => {
	let controls = [];

	switch (serviceActiveTab) {
		case 'air_freight':
			controls = [...filterCommonControls, ...airFreightControls];
			break;
		case 'air_customs':
			controls = [...filterCommonControls, ...airCustomControls];
			break;
		case 'air_freight_local':
			controls = [...filterCommonControls, ...airFreightLocalControls];
			break;
		case 'domestic_air_freight':
			controls = [...filterCommonControls, ...domesticAirFreightControls];
			break;
		default:
			controls = [...filterCommonControls];
	}
	return controls;
};
export default getFilterControls;
