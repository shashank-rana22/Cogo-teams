import { CustomOptions } from '@cogoport/air-modules';
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
const getServiceProvider = ({ serviceType = '' }) => ({
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
			service      : serviceType === 'subsidiary_service' ? 'air_freight' : serviceType,
		},
	},
	rules: {
		required: true,
	},
	renderLabel: CustomOptions,
});

const SPLIT_SERVICE_TEXT = 2;

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

	const serviceType = service_type?.split('_', SPLIT_SERVICE_TEXT)?.join('_');

	if (service_type === 'subsidiary_service') {
		subsidiary_service_rendered = (service_rendered || []).find(
			(service) => service?.code === subsidiaryService?.code,
		);
	}

	const service_provider = getServiceProvider({ serviceType });
	service_provider.value = subsidiary_service_rendered?.service_provider?.id
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
