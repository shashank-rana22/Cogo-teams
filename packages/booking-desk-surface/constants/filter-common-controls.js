import getGeoConstants from '@cogoport/globalization/constants/geo';

import SHIPMENT_STATES from './shipment-states';

const geo = getGeoConstants();

const filterCommonControls = [
	{
		label   : 'Tags',
		name    : 'tags',
		type    : 'select',
		options : [
			{
				label : 'Cogoverse',
				value : 'cogoverse',
			},
			{
				label : 'Android Admin App',
				value : 'android_admin_app',
			},
			{
				label : 'IOS Admin App',
				value : 'ios_admin_app',
			},
		],
		isClearable : true,
		span        : 6,
	},
	{
		label          : 'Customer/Channel Partner',
		name           : 'importer_exporter_id',
		type           : 'select',
		className      : 'primary md',
		optionsListKey : 'organizations',
		params         : {
			page_limit : 10,
			filters    : {
				account_type : 'importer_exporter',
				kyc_status   : 'verified',
			},
			agent_data_required: false,
		},
		placeholder : 'Select Customer/Channel Partner',
		isClearable : true,
		span        : 6,
	},
	{
		label       : 'Raised Alarm?',
		name        : 'fault_alarms_raised',
		type        : 'select',
		placeholder : 'Select status',
		options     : [
			{
				label : 'YES',
				value : 'active',
			},
		],
		isClearable : true,
		span        : 6,
	},
	{
		label     : 'KAM',
		name      : 'stakeholder_id',
		type      : 'async-select',
		className : 'primary md',
		asyncKey  : 'partner_users',
		valueKey  : 'user_id',
		params    : {
			page_limit : 20,
			filters    : {
				partner_id : geo?.uuid?.parent_entity_id,
				status     : 'active',
			},
		},
		placeholder : 'Select KAM',
		caret       : true,
		span        : 6,
	},
	{
		label       : 'State',
		name        : 'state',
		type        : 'select',
		placeholder : 'Select state',
		options     : SHIPMENT_STATES,
		span        : 6,
	},
	{
		label       : 'Source',
		name        : 'source',
		type        : 'select',
		placeholder : 'Select ',
		options     : [
			{ label: 'Spot Booking', value: 'spot_booking' },
			{ label: 'Upsell', value: 'upsell' },
			{ label: 'Shipment Rollover', value: 'shipment_rollover' },
			{ label: 'Contract Booking', value: 'contract_booking' },
			{ label: 'Flash Booking', value: 'flash_booking' },
			{ label: 'Spot Negotiation', value: 'spot_negotiation' },
			{ label: 'Request Quote Quotation', value: 'request_quote_quotation' },
			{ label: 'Enquiry', value: 'enquiry' },
			{ label: 'Fav Port Pair', value: 'fav_port_pair' },
			{ label: 'Locked Rate', value: 'locked_rate' },
			{ label: 'Booking Party', value: 'booking_party' },
			{ label: 'Offers', value: 'offers' },
			{ label: 'Direct', value: 'direct' },
			{ label: 'Quotation', value: 'quotation' },
			{ label: 'Contract', value: 'contract' },
			{ label: 'Auto Quotation', value: 'auto_quotation' },
			{ label: 'Spot Line Booking', value: 'spot_line_booking' },
			{ label: 'Quick Checkout', value: 'quick_checkout' },
			{ label: 'Consol', value: 'consol' },
			{ label: 'Coload', value: 'coload' },
			{ label: 'Rollover', value: 'rollover' },
		],
		span: 6,
	},
];

export default filterCommonControls;
