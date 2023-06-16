import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

const config = {
	heading     : 'Disliked Rates',
	api         : 'list_fcl_freight_rate_feedbacks',
	placement   : 'center',
	type        : 'disliked_rates',
	apiPrefix   : 'list',
	apiSuffix   : 'rate_feedbacks',
	extraParams : {
		customer_details_required : true,
		is_stats_required         : false,
	},
	fields: [
		{
			label : 'Serial Id',
			key   : 'serial_id',
			span  : 1,
		},
		{
			label : 'Customer',
			key   : 'spot_search.importer_exporter.business_name',
			span  : 1.5,
		},
		{
			label     : 'Port pair',
			key       : '',
			pair_type : 'shipment_type',
			func      : 'renderPortPair',
			span      : 1.5,
		},
		{
			label : 'Preferred Price',
			key   : '',
			func  : 'renderPrice',
			span  : 1,
		},
		{
			label : 'Cargo Details',
			key   : '',
			func  : 'renderContainerInfo',
			span  : 2,
		},
		{
			label : 'Remarks',
			key   : 'remarks',
			func  : 'startCase',
			span  : 1.5,
		},
		{
			label : 'Status',
			key   : 'closing_remarks',
			func  : 'renderStatus',
			span  : 1.5,
		},
		{
			label : 'Closing Remarks',
			key   : 'closing_remarks',
			func  : 'startCase',
			span  : 1,
		},
		{
			label  : 'Created At',
			key    : 'created_at',
			render : (item) => {
				const formattedDate = formatDate({
					date       : item.created_at,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
					formatType : 'dateTime',
					separator  : ' | ',
				});
				return <div>{formattedDate}</div>;
			},
			span: 1,
		},
	],
	filterProps: {
		showDateWrapper : true,
		controls        : [
			{
				name    : 'trade_type',
				label   : 'Trade Type',
				type    : 'select',
				span    : 4,
				options : [
					{
						label : 'Import',
						value : 'import',
					},
					{
						label : 'Export',
						value : 'export',
					},
				],
			},
			{
				name           : 'location_id',
				label          : 'Location',
				multiple       : false,
				type           : 'location-select',
				optionsListKey : 'locations',
				params         : { filters: { type: ['seaport', 'country', 'pincode'] } },
				placeholder    : 'Select',
			},
			{
				type           : 'location-select',
				optionsListKey : 'locations',
				params         : { filters: { type: ['seaport'] } },
				caret          : true,
				name           : 'port_id',
				label          : 'Port',
				span           : 4,
				countryType    : 'country',
			},
			{
				name           : 'airport_id',
				label          : 'Airport',
				type           : 'location-select',
				optionsListKey : 'locations',
				defaultOptions : true,
				params         : { filters: { type: ['airport'] } },
				caret          : true,
			},
			{
				label             : 'Origin Airport',
				name              : 'origin_airport_id',
				placeholder       : 'Search via name',
				includedInOptions : false,
				type              : 'location-select',
				optionsListKey    : 'locations',
				grouped           : ['city', 'country'],
				params            : { filters: { type: ['airport', 'country', 'city'] } },
			},
			{
				label             : 'Destination Airport',
				name              : 'destination_airport_id',
				placeholder       : 'Search via name',
				includedInOptions : false,
				type              : 'location-select',
				optionsListKey    : 'locations',
				grouped           : ['city', 'country'],
				params            : { filters: { type: ['airport', 'country', 'city'] } },
			},
			{
				type   : 'location-select',
				params : {
					filters: {
						type: ['seaport'],
					},
				},
				name              : 'origin_port_id',
				label             : 'Origin Port',
				span              : 4,
				isClearable       : true,
				includedInOptions : false,
				optionsListKey    : 'locations',
				grouped           : ['city', 'country'],
				placeholder       : 'Search location...',
			},
			{
				type   : 'location-select',
				params : {
					filters: {
						type: ['seaport'],
					},
				},
				name              : 'destination_port_id',
				label             : 'Destination Port',
				includedInOptions : false,
				span              : 4,
				isClearable       : true,
				optionsListKey    : 'locations',
				grouped           : ['city', 'country'],
				placeholder       : 'Search location...',
			},
			{
				type        : 'location-select',
				isClearable : true,
				params      : {
					filters: {
						type: ['seaport', 'country', 'pincode'],
					},
				},
				caret          : true,
				multiple       : false,
				name           : 'origin_location_id',
				label          : 'Origin Location',
				optionsListKey : 'locations',
				placeholder    : 'Origin..',
				span           : 4,
			},
			{
				type        : 'location-select',
				isClearable : true,
				params      : {
					filters: {
						type: ['seaport', 'country', 'pincode'],
					},
				},
				name           : 'destination_location_id',
				label          : 'Destination Location',
				span           : 4,
				optionsListKey : 'locations',
				placeholder    : 'Destination..',
			},
			{
				type   : 'location-select',
				params : {
					filters: {
						type: ['trade'],
					},
				},
				name           : 'trade_id',
				label          : ' Trade',
				span           : 4,
				isClearable    : true,
				optionsListKey : 'locations',
				placeholder    : 'Search location...',
			},
			{
				type   : 'location-select',
				params : {
					filters: {
						type: ['trade'],
					},
				},
				name           : 'origin_trade_id',
				label          : 'Trade',
				span           : 4,
				isClearable    : true,
				optionsListKey : 'locations',
				placeholder    : 'Search location...',
			},
			{
				type   : 'location-select',
				params : {
					filters: {
						type: ['trade'],
					},
				},
				name           : 'destination_trade_id',
				label          : 'Destination Trade',
				span           : 4,
				isClearable    : true,
				optionsListKey : 'locations',
				placeholder    : 'Search location...',
			},
		],
	},
};

export default config;
