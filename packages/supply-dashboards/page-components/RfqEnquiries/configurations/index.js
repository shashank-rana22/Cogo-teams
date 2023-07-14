import airChildControlsFunc from './air-child-controls';
import airFields from './air-controls';
import chargeContolsFunc from './charge-controls';
import commonControlsFunc from './common-controls';
import fclControl from './fcl-controls';
import freeDaysSection from './free-days-section';
import lclChildControlsFunc from './lcl-child-controls';
import lclFields from './lcl-controls';
import locationControls from './locationControls';
import TrailerControls from './trailer-controls';

const chargeCodeMapping = {
	fcl_cfs         : 'cfs_charge_codes',
	fcl_customs     : 'customs_charge_codes',
	haulage_freight : 'haulage_charge_codes',
	trailer_freight : 'freights_charge_codes',
};

const Config = ({ data }) => {
	const field = commonControlsFunc({ service: data?.service });

	if (data?.service === 'fcl_freight') {
		field.push(...fclControl({ data }));

		if (data?.data?.include_destination_local) {
			field.push(chargeContolsFunc({
				heading          : 'add_destination_local_charges',
				charge_code_name : 'destination_local_charge_codes',
			}));
		}

		if (data?.data?.include_origin_local) {
			field.push(chargeContolsFunc({
				heading          : 'add_origin_local_charges',
				charge_code_name : 'origin_local_charge_codes',
			}));
		}

		if (data?.data?.free_days_detention_destination > 0) {
			field.push(...freeDaysSection({
				heading : 'Destination Detention Days',
				unit    : 'per_container',
				data,
			}));
		}
	} else if (data?.service === 'air_freight') {
		field.push(...airFields);
		if (data?.data?.include_destination_local) {
			field.push(airChildControlsFunc({
				heading          : 'Add Destination Local Charges',
				charge_code_name : 'destination_local_charge_codes',
			}));
		}

		if (data?.data?.include_origin_local) {
			field.push(airChildControlsFunc({
				heading          : 'Add Origin Local Charges',
				charge_code_name : 'origin_local_charge_codes',
			}));
		}
		if (data?.data?.origin_storage_free_days > 0) {
			field.push(...freeDaysSection({
				heading : 'Origin Storage Hours',
				unit    : 'per_kg_per_hour',
				type    : 'origin_air',
			}));
		}
		if (data?.data?.destination_storage_free_days > 0) {
			field.push(...freeDaysSection({
				heading : 'Destination Storage Hours',
				unit    : 'per_kg_per_hour',
				type    : 'destination_air',
				data,
			}));
		}
	} else if (data?.service === 'lcl_freight') {
		field.push(...lclFields());
		if (data?.data?.include_destination_local) {
			field.push(lclChildControlsFunc({
				heading          : 'Add Destination Local Charges',
				charge_code_name : 'destination_local_charge_codes',
			}));
		}

		if (data?.data?.include_origin_local) {
			field.push(lclChildControlsFunc({
				heading          : 'Add Origin Local Charges',
				charge_code_name : 'origin_local_charge_codes',
			}));
		}
		if (data?.data?.destination_storage_free_days > 0) {
			field.push(...freeDaysSection({
				heading : 'Origin Storage Days',
				unit    : 'per_kg_per_day',
				data,
			}));
		}
	} else if (['trailer_freight', 'haulage_freight'].includes(data?.service)) {
		field.push(...TrailerControls({ data, charge_code_name: chargeCodeMapping[data?.service] }));
	} else if (['ltl_freight', 'ftl_freight'].includes(data?.service)) {
		field.push(...locationControls(data));
	} else if (['fcl_cfs', 'fcl_customs'].includes(data?.service)) {
		field.push(chargeContolsFunc({ heading: '', charge_code_name: chargeCodeMapping[data?.service] }));
	} else if (data?.service === 'lcl_customs') {
		field.push(lclChildControlsFunc({ heading: '', charge_code_name: 'customs_charge_codes' }));
	} else if (data?.service === 'air_customs') {
		field.push(airChildControlsFunc({ heading: '', charge_code_name: 'customs_charge_codes' }));
	}

	return field;
};

export default Config;
