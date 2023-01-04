import airFields from './air-controls';
import fclControl from './fcl-controls';
import fclDetetionFreeDays from './fcl-detetion-free-days';
import fclLocals from './fcl-local-charges';

const Config = ({ service }) => {
	const field = [];
	if (service?.service === 'fcl_freight') {
		field.push(...fclControl);
		if (service?.data?.include_destination_local) {
			field.push(fclLocals({ heading: 'Add Destination Local Charges' }));
		}
		if (service?.data?.include_origin_local) {
			field.push(fclLocals({ heading: 'Add Origin Local Charges' }));
		}
		if (service?.data?.free_days_detention_destination > 0) {
			field.push(...fclDetetionFreeDays({ heading: 'Destination Detention Days' }));
		}
	} else if (service?.service === 'air_freight') {
		field.push({ ...airFields });
	}
	return field;
};

export default Config;
