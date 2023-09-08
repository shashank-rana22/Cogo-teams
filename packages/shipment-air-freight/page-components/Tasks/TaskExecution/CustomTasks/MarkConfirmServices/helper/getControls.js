import CustomOptions from '@cogoport/air-modules/common/CustomOptions';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const air_lines = {
	type     : 'async-select',
	asyncKey : 'list_operators',
	params   : {
		filters: { operator_type: 'airline', status: 'active' },
	},
	caret         : true,
	span          : 5,
	name          : 'airline_id',
	subType       : 'select',
	label         : 'Please select airline',
	placeholder   : 'Search airline...',
	commodityType : 'air_freight',
	rules         : { required: 'Air Line Details is Required' },
};
const service_provider = {
	name        : 'service_provider_id',
	type        : 'async-select',
	asyncKey    : 'organizations',
	label       : 'Service Provider',
	span        : 5,
	placeholder : 'Service Provider',
	params      : {
		filters: {
			account_type : 'service_provider',
			status       : 'active',
			kyc_status   : 'verified',
		},
	},
	rules: {
		required: true,
	},
	renderLabel: CustomOptions,
};

const getControls = ({
	service_type = '',
	servicesList = [],
	subsidiaryService = {},
	shipment_data = {},
}) => {
	const service_rendered = (shipment_data?.all_services || []).filter(
		(service) => service?.service_type === service_type,
	);

	let subsidiary_service_rendered = {};

	if (service_type === 'subsidiary_service') {
		subsidiary_service_rendered = (service_rendered || []).find(
			(service) => service?.code === subsidiaryService?.code,
		);
	}

	service_provider.value =		subsidiary_service_rendered?.service_provider?.id
		|| service_rendered?.[GLOBAL_CONSTANTS.zeroth_index]?.service_provider_id
		|| '';
	const CONTROLS = [];

	if (service_type === 'air_freight_service') {
		(servicesList || []).forEach((service) => {
			if (service?.service_type === 'air_freight_service') {
				air_lines.value = service.airline_id || '';
			}
		});
		CONTROLS.push(air_lines);
	}

	CONTROLS.push(service_provider);

	return CONTROLS;
};
export default getControls;
