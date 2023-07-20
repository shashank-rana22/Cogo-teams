import getGeoConstants from '@cogoport/globalization/constants/geo';

const geo = getGeoConstants();

const controls = [
	{
		name        : 'airline_id',
		type        : 'async-select',
		asyncKey    : 'list_operators',
		label       : 'Select Airline',
		placeholder : 'Select Airline...',
		initialCall : true,
		span        : 6,
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
	},
	{
		name        : 'service_provider_id',
		type        : 'async-select',
		asyncKey    : 'organizations',
		label       : 'Service Provider',
		span        : 6,
		placeholder : 'Service Provider',
		params      : {
			filters: { service_type: 'air_freight' },
		},
	},
	{
		name        : 'procured_by_id',
		type        : 'async-select',
		asyncKey    : 'partner_users',
		label       : 'Procured by Cogoport Agent',
		placeholder : 'Search via name/email',
		valueKey    : 'user_id',
		span        : 6,
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
];
export default controls;
