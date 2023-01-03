import fclCfsControls from './fcl-cfs';
import fclControl from './fcl-controls';
import fclLocals from './fcl-local-charges';

const config = ({ service }) => {
	const field = [];
	if (service?.service === 'fcl_freight') {
		field.push(...fclControl);
		if (service?.data?.include_destination_local) {
			field.push(fclLocals({ heading: 'Add Destination Local Charges' }));
		}
		if (service?.data?.include_origin_local) {
			field.push(fclLocals({ heading: 'Add Origin Local Charges' }));
		}
	}
	if (service?.service === 'fcl_cfs') {
		field.push(fclCfsControls);
	}
	console.log(field, 'values');

	return field;
};

export default config;
