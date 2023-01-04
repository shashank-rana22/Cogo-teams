import airFields from './air-controls';
import fclCfsControls from './fcl-cfs';
import fclControl from './fcl-controls';
import fclLocals from './fcl-local-charges';
import freeDaysSection from './free-days-section';
import lclFields from './lcl-controls';

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
			field.push(...freeDaysSection({
				heading : 'Destination Detention Days',
				unit    : units[service?.service],
			}));
		}
	} else if (service?.service === 'fcl_cfs') {
		field.push(...fclCfsControls);
	} else if (service?.service === 'air_freight') {
		field.push({ ...airFields });
	} else if (service?.service === 'lcl_freight') {
		field.push({ ...lclFields });
		if (service?.data?.destination_storage_free_days > 0) {
			field.push(...freeDaysSection({
				heading : 'Origin Storage Days',
				unit    : units[service?.service],
			}));
		}
		if (service?.data?.origin_storage_free_days > 0) {
			field.push(...freeDaysSection({
				heading : 'Destination Storage Days',
				unit    : units[service?.service],
			}));
		}
	}
	return field;
};

export default Config;
