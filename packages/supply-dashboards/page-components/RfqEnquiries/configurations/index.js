import airChildControlsFunc from './air-child-controls';
import airFields from './air-controls';
import fclCfsControls from './fcl-cfs';
import fclChildContolsFunc from './fcl-child-controls';
import fclControl from './fcl-controls';
import freeDaysSection from './free-days-section';
import lclChildControlsFunc from './lcl-child-controls';
import lclFields from './lcl-controls';

const Config = ({ service }) => {
	const field = [];

	if (service?.service === 'fcl_freight') {
		field.push(...fclControl, fclChildContolsFunc());

		if (service?.data?.include_destination_local) {
			field.push(fclChildContolsFunc({ heading: 'Add Destination Local Charges' }));
		}

		if (service?.data?.include_origin_local) {
			field.push(fclChildContolsFunc({ heading: 'Add Origin Local Charges' }));
		}

		if (service?.data?.free_days_detention_destination > 0) {
			field.push(...freeDaysSection({
				heading : 'Destination Detention Days',
				unit    : 'per_container',
			}));
		}
	} else if (service?.service === 'fcl_cfs') {
		field.push(...fclCfsControls);
		if (service?.data?.include_destination_local) {
			field.push(fclChildContolsFunc({ heading: 'Add Destination Local Charges' }));
		}

		if (service?.data?.include_origin_local) {
			field.push(fclChildContolsFunc({ heading: 'Add Origin Local Charges' }));
		}
	} else if (service?.service === 'air_freight') {
		field.push(...airFields, airChildControlsFunc());
		if (service?.data?.include_destination_local) {
			field.push(airChildControlsFunc({ heading: 'Add Destination Local Charges' }));
		}

		if (service?.data?.include_origin_local) {
			field.push(airChildControlsFunc({ heading: 'Add Origin Local Charges' }));
		}
		if (service?.data?.destination_storage_free_days > 0) {
			field.push(...freeDaysSection({
				heading : 'Origin Storage Hours',
				unit    : 'per_kg_per_hour',
			}));
		}
		if (service?.data?.origin_storage_free_days > 0) {
			field.push(...freeDaysSection({
				heading : 'Destination Storage Hours',
				unit    : 'per_kg_per_hour',
			}));
		}
	} else if (service?.service === 'lcl_freight') {
		field.push(...lclFields, lclChildControlsFunc());
		if (service?.data?.include_destination_local) {
			field.push(lclChildControlsFunc({ heading: 'Add Destination Local Charges' }));
		}

		if (service?.data?.include_origin_local) {
			field.push(lclChildControlsFunc({ heading: 'Add Origin Local Charges' }));
		}
		if (service?.data?.destination_storage_free_days > 0) {
			field.push(...freeDaysSection({
				heading : 'Origin Storage Days',
				unit    : 'per_kg_per_day',
			}));
		}
		if (service?.data?.origin_storage_free_days > 0) {
			field.push(...freeDaysSection({
				heading : 'Destination Storage Days',
				unit    : 'per_kg_per_day',
			}));
		}
	}
	return field;
};

export default Config;
