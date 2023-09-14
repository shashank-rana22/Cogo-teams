import airCustomControls from '../constants/air-custom-controls';
import domesticAirFreightControls from '../constants/air-domestic-filter-controls';
import airFreightControls from '../constants/air-freight-filter-controls';
import airFreightLocalControls from '../constants/air-freight-local-controls';
import filterCommonControls from '../constants/filter-common-controls';

const getFilterControls = ({ serviceActiveTab = 'air_freight', t = () => {} }) => {
	let controls = [];
	const filterCommonControl = filterCommonControls(t);
	const airFreightControl = airFreightControls(t);
	const airCustomControl = airCustomControls(t);
	const airFreightLocalControl = airFreightLocalControls(t);
	const domesticAirFreightControl = domesticAirFreightControls(t);

	switch (serviceActiveTab) {
		case 'air_freight':
			controls = [...filterCommonControl, ...airFreightControl];
			break;
		case 'air_customs':
			controls = [...filterCommonControl, ...airCustomControl];
			break;
		case 'air_freight_local':
			controls = [...filterCommonControl, ...airFreightLocalControl];
			break;
		case 'domestic_air_freight':
			controls = [...filterCommonControl, ...domesticAirFreightControl];
			break;
		default:
			controls = [...filterCommonControl];
	}
	return controls;
};
export default getFilterControls;
