import getGeoConstants from '@cogoport/globalization/constants/geo';

import checkValidation from '../utils/checkValidation';

const geo = getGeoConstants();

const awbControls = ({
	item,
	setServiceProviderData,
	serviceProviderData,
}) => [
	{
		name        : 'airline_id',
		type        : 'async-select',
		asyncKey    : 'list_operators',
		label       : 'Select Airline',
		placeholder : 'Select Airline...',
		initialCall : true,
		span        : 6,
		rules       : {
			required: true,
		},
	},
	{
		name        : 'airport_id',
		type        : 'async-select',
		asyncKey    : 'list_locations',
		label       : 'Origin Airport',
		placeholder : 'Select Origin Airport',
		span        : 6,
		params      : {
			filters: {
				type: ['airport'],
			},
		},
		rules: {
			required: true,
		},
	},
	{
		name        : 'destination_location_id',
		type        : 'async-select',
		asyncKey    : 'list_locations',
		label       : 'Destination Location',
		placeholder : 'Select Destination Airport',
		span        : 6,
		params      : {
			filters: {
				type: ['airport', 'country'],
			},
		},
		isClearable: true,
	},
	{
		name        : 'importer_exporter_id',
		type        : 'async-select',
		asyncKey    : 'organizations',
		label       : 'Shipper Name',
		placeholder : 'Shipper Name',
		span        : 6,
		params      : {
			branches_data_required : true,
			filters                : { status: 'active', account_type: 'importer_exporter' },
		},
		isClearable: true,
	},
	{
		name        : 'awb_number',
		type        : 'text',
		label       : 'AWB Number',
		placeholder : 'xxx-xxxx-xxxx',
		maxLength   : 13,
		span        : 6,
		rules       : {
			required : true,
			validate : (value) => checkValidation(value),
		},
	},
	{
		name                  : 'procured_date',
		type                  : 'date_picker',
		label                 : 'Procured Date',
		placeholder           : 'Select Date',
		isPreviousDaysAllowed : true,
		value                 : new Date(),
		span                  : 6,
		rules                 : {
			required: true,
		},
	},
	{
		name        : 'booking_agent_id',
		type        : 'async-select',
		asyncKey    : 'partner_users',
		label       : 'Booking Agent (KAM)',
		placeholder : 'Booking Agent',
		valueKey    : 'user_id',
		span        : 6,
		params      : {
			filters: {
				role_ids: geo?.uuid.kam_ids,
			},
		},
		isClearable: true,
	},
	{
		name        : 'service_provider_id',
		type        : 'async-select',
		asyncKey    : 'organizations',
		label       : 'Service Provider',
		span        : 6,
		placeholder : 'Service Provider',
		onChange    : (val, obj) => setServiceProviderData(obj),
		params      : {
			filters: { service_type: 'air_freight' },
		},
		rules: {
			required: true,
		},
	},
	{
		name        : 'procured_by_id',
		type        : 'async-select',
		asyncKey    : 'partner_users',
		label       : 'Procured by Cogoport Agent',
		placeholder : 'Search via name email',
		valueKey    : 'user_id',
		span        : 6,
		params      : {
			filters: {
				partner_id: serviceProviderData?.partner_id || item?.service_provider?.partner_id,
			},
		},
		rules: {
			required: true,
		},
	},
];

export default awbControls;